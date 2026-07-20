import {
  Coordinates,
  CalculationMethod,
  CalculationParameters,
  PrayerTimes,
  Madhab,
  Qibla
} from 'adhan';
import { Language, PrayerKey, PrayerTime, PrayerSettings, PrayerStatus } from './types';

export const SETTINGS_KEY = 'alsafa_prayer_settings';

export const CALCULATION_METHODS = {
  MuslimWorldLeague: 'Muslim World League',
  Egyptian: 'Egyptian General Authority',
  Karachi: 'University of Islamic Sciences, Karachi',
  UmmAlQura: 'Umm Al-Qura, Makkah',
  Dubai: 'Dubai',
  MoonsightingCommittee: 'Moonsighting Committee',
  NorthAmerica: 'ISNA (North America)',
  Kuwait: 'Kuwait',
  Qatar: 'Qatar',
  Singapore: 'Singapore',
  Turkey: 'Turkey'
} as const;

// Masjid's own location, used until the visitor shares theirs.
export const DEFAULT_SETTINGS: PrayerSettings = {
  latitude: 24.8607,
  longitude: 67.0011,
  city: 'Karachi',
  method: 'Karachi',
  madhab: 'hanafi',
  // Minutes between adhan and iqamah, set by the masjid.
  iqamahOffsets: { fajr: 30, dhuhr: 20, asr: 15, maghrib: 5, isha: 15 },
  usingDeviceLocation: false
};

const PRAYER_LABELS: Record<PrayerKey, { en: string; ur: string }> = {
  fajr: { en: 'Fajr', ur: 'فجر' },
  sunrise: { en: 'Shuruq', ur: 'طلوعِ آفتاب' },
  dhuhr: { en: 'Dhuhr', ur: 'ظہر' },
  asr: { en: 'Asr', ur: 'عصر' },
  maghrib: { en: 'Maghrib', ur: 'مغرب' },
  isha: { en: 'Isha', ur: 'عشاء' }
};

export const prayerLabel = (key: PrayerKey, lang: Language) =>
  PRAYER_LABELS[key][lang];

export const loadSettings = (): PrayerSettings => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      // Merge so settings saved by an older build still get new fields.
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch {
    /* fall through to defaults */
  }
  return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: PrayerSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    /* storage unavailable (private mode) — settings stay in memory only */
  }
};

const buildParams = (settings: PrayerSettings): CalculationParameters => {
  const factory =
    CalculationMethod[settings.method as keyof typeof CalculationMethod] ??
    CalculationMethod.MuslimWorldLeague;
  const params = factory();
  params.madhab = settings.madhab === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;
  return params;
};

export const formatTime = (date: Date, lang: Language) =>
  date.toLocaleTimeString(lang === 'ur' ? 'ur-PK' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

/** Prayer times for the given day, calculated from the visitor's coordinates. */
export const computePrayers = (
  settings: PrayerSettings,
  date: Date,
  lang: Language
): PrayerTime[] => {
  const coordinates = new Coordinates(settings.latitude, settings.longitude);
  const times = new PrayerTimes(coordinates, date, buildParams(settings));

  const order: PrayerKey[] = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

  return order.map((key) => {
    const at = times[key];
    const offset = settings.iqamahOffsets[key as keyof PrayerSettings['iqamahOffsets']];
    // Shuruq is not prayed in congregation, so it has no iqamah.
    const iqamahAt =
      key === 'sunrise' || offset === undefined
        ? null
        : new Date(at.getTime() + offset * 60_000);

    return {
      key,
      name: PRAYER_LABELS[key].en,
      urduName: PRAYER_LABELS[key].ur,
      at,
      iqamahAt,
      time: formatTime(at, lang),
      iqamah: iqamahAt ? formatTime(iqamahAt, lang) : '-'
    };
  });
};

const pad = (num: number) => num.toString().padStart(2, '0');

/**
 * Works out which prayer is running right now and how long until the next one.
 * Shuruq is skipped — it marks the end of Fajr's window rather than a prayer.
 */
export const getPrayerStatus = (
  settings: PrayerSettings,
  now: Date,
  lang: Language
): PrayerStatus => {
  const today = computePrayers(settings, now, lang).filter((p) => p.key !== 'sunrise');

  let current = today.filter((p) => p.at <= now).pop() ?? null;
  let next = today.find((p) => p.at > now) ?? null;

  if (!next) {
    // Past Isha — the next prayer is tomorrow's Fajr, recalculated for that date.
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    next = computePrayers(settings, tomorrow, lang)[0];
  }

  if (!current) {
    // Before today's Fajr — we are still inside yesterday's Isha window.
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const prev = computePrayers(settings, yesterday, lang);
    current = prev[prev.length - 1];
  }

  const secondsLeft = Math.max(0, Math.floor((next.at.getTime() - now.getTime()) / 1000));
  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;

  return {
    current,
    next,
    timeLeft: `${pad(h)}:${pad(m)}:${pad(s)}`,
    secondsLeft
  };
};

/** Compass bearing from the visitor's location to the Kaaba, in degrees. */
export const getQiblaDirection = (settings: PrayerSettings) =>
  Qibla(new Coordinates(settings.latitude, settings.longitude));

/** Ask the browser for the visitor's coordinates. Rejects if denied or unsupported. */
export const requestDeviceLocation = (): Promise<{ latitude: number; longitude: number }> =>
  new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => reject(new Error(err.message)),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 5 * 60_000 }
    );
  });
