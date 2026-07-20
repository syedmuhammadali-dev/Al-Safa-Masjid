export type Language = 'en' | 'ur';

export type PrayerKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerTime {
  key: PrayerKey;
  name: string;
  urduName: string;
  /** Adhan time as an absolute instant, used for countdowns and comparisons. */
  at: Date;
  /** Iqamah instant, or null for Shuruq which has no congregation. */
  iqamahAt: Date | null;
  /** Localised display strings derived from `at` / `iqamahAt`. */
  time: string;
  iqamah: string;
}

export interface PrayerSettings {
  latitude: number;
  longitude: number;
  city: string;
  method: string;
  madhab: 'hanafi' | 'shafi';
  iqamahOffsets: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
  };
  usingDeviceLocation: boolean;
}

export interface PrayerStatus {
  current: PrayerTime;
  next: PrayerTime;
  /** HH:MM:SS until the next adhan. */
  timeLeft: string;
  secondsLeft: number;
}

export interface DailyTracker {
  [date: string]: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
    tahajjud: boolean;
  };
}

export interface CommunityEvent {
  id: string;
  title: string;
  titleUrdu: string;
  category: 'lecture' | 'workshop' | 'ramadan' | 'youth' | 'sisters';
  date: string;
  dateUrdu: string;
  time: string;
  timeUrdu: string;
  location: string;
  locationUrdu: string;
  description: string;
  descriptionUrdu: string;
  imgUrl: string;
}

export interface ServiceBooking {
  id: string;
  type: 'madrasa' | 'counseling' | 'youth';
  date: string;
  status: 'confirmed' | 'pending';
  details: any;
}

export interface StudentReport {
  id: string;
  name: string;
  nameUrdu: string;
  class: string;
  attendance: string;
  progress: string;
  progressUrdu: string;
  grades: {
    quran: string;
    tajweed: string;
    islamicStudies: string;
  };
  teacherFeedback: string;
  teacherFeedbackUrdu: string;
}
