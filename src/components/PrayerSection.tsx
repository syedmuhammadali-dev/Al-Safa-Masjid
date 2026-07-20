import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Language, DailyTracker, PrayerTime } from '../types';
import { Clock, Compass, CheckCircle2, Sun, Moon } from 'lucide-react';

interface PrayerSectionProps {
  lang: Language;
}

const BASE_PRAYERS: PrayerTime[] = [
  { name: 'Fajr', urduName: 'فجر', time: '05:15 AM', iqamah: '05:45 AM' },
  { name: 'Shuruq', urduName: 'طلوعِ آفتاب', time: '06:38 AM', iqamah: '-' },
  { name: 'Dhuhr', urduName: 'ظہر', time: '01:10 PM', iqamah: '01:30 PM' },
  { name: 'Asr', urduName: 'عصر', time: '04:45 PM', iqamah: '05:00 PM' },
  { name: 'Maghrib', urduName: 'مغرب', time: '08:10 PM', iqamah: '08:15 PM' },
  { name: 'Isha', urduName: 'عشاء', time: '09:30 PM', iqamah: '09:45 PM' }
];

export default function PrayerSection({ lang }: PrayerSectionProps) {
  const t = (key: keyof typeof translations['en']) => translations[lang][key];

  // Tracker State
  const todayStr = new Date().toISOString().split('T')[0];
  const [tracker, setTracker] = useState<DailyTracker>(() => {
    try {
      const saved = localStorage.getItem('alsafa_prayer_tracker');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Countdown State
  const [timeLeftStr, setTimeLeftStr] = useState('02:44:12');
  const [nextPrayerName, setNextPrayerName] = useState('Maghrib');

  // Compass rotation simulator
  const [compassHeading, setCompassHeading] = useState(0);
  const qiblaAngle = 51.2; // Qibla direction for Springfield IL: 51.2 degrees

  // Update localStorage when tracker updates
  useEffect(() => {
    localStorage.setItem('alsafa_prayer_tracker', JSON.stringify(tracker));
  }, [tracker]);

  // Handle checking/unchecking prayers
  const togglePrayer = (prayerKey: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud') => {
    setTracker((prev) => {
      const currentDay = prev[todayStr] || {
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false,
        tahajjud: false
      };
      return {
        ...prev,
        [todayStr]: {
          ...currentDay,
          [prayerKey]: !currentDay[prayerKey]
        }
      };
    });
  };

  // Helper: check if today's standard 5 prayers are completed
  const todayStatus = tracker[todayStr] || {
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    tahajjud: false
  };

  const isTodayFullyPrayed =
    todayStatus.fajr &&
    todayStatus.dhuhr &&
    todayStatus.asr &&
    todayStatus.maghrib &&
    todayStatus.isha;

  // Simple countdown timer & Simulated Compass Heading cycle
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate simulator gently
      setCompassHeading((prev) => (prev + 3) % 360);

      // Countdown simulation - count down seconds dynamically
      const now = new Date();
      const s = 59 - now.getSeconds();
      const m = 59 - now.getMinutes();
      // Mock countdown target
      const h = (20 - now.getHours() + 24) % 24;

      const pad = (num: number) => num.toString().padStart(2, '0');
      setTimeLeftStr(`${pad(h)}:${pad(m)}:${pad(s)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Compute stats for last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const isQiblaAligned = Math.abs(compassHeading - qiblaAngle) < 10;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Dynamic Header & Countdown */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-3xl p-8 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        <div className="lg:col-span-7 space-y-4">
          <span className="bg-amber-500/20 text-amber-300 font-sans font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full">
            {t('nextPrayer')}: {lang === 'ur' ? 'مغرب' : 'Maghrib'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
            {lang === 'ur' ? 'اگلی نماز میں وقت باقی ہے' : 'Time remaining until Maghrib'}
          </h2>
          <p className="font-sans text-sm text-emerald-200/90 leading-relaxed">
            {lang === 'ur' 
              ? 'نماز قائم کریں، بے شک نماز ایمان والوں پر مقررہ وقتوں پر فرض کی گئی ہے۔'
              : '"Verily, prayer is enjoined on the believers at fixed hours." (Quran 4:103)'}
          </p>
        </div>
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
          <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/20 text-center w-full max-w-sm">
            <span className="font-sans text-amber-300 font-bold tracking-widest text-xs uppercase block mb-2">
              {lang === 'ur' ? 'الٹی گنتی' : 'COUNTDOWN'}
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-bold tracking-wider text-white">
              {timeLeftStr}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Prayer Schedule & Qibla Finder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Full Prayer Schedule Table */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/5 dark:border-emerald-500/10 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400">
                {t('prayerSchedule')}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Springfield, IL • {new Date().toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-US')}
              </p>
            </div>
            <span className="font-sans text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 py-1.5 px-3 rounded-full font-semibold">
              Adhan vs {t('iqamah')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-sans text-xs uppercase tracking-wider">
                  <th className="py-3 font-semibold">{lang === 'ur' ? 'نماز' : 'Prayer'}</th>
                  <th className="py-3 font-semibold">{lang === 'ur' ? 'اذان' : 'Adhan'}</th>
                  <th className="py-3 font-semibold">{lang === 'ur' ? 'اقامت' : 'Iqamah'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50 font-sans text-sm sm:text-base">
                {BASE_PRAYERS.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 font-semibold text-emerald-950 dark:text-emerald-300">
                      {lang === 'ur' ? p.urduName : p.name}
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-300">{p.time}</td>
                    <td className="py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {p.iqamah}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-500/5 rounded-2xl p-4 flex gap-3 text-amber-800 dark:text-amber-300 border border-amber-500/10 text-xs sm:text-sm">
            <Clock className="w-5 h-5 flex-shrink-0 text-amber-500" />
            <p className="font-sans">
              {lang === 'ur'
                ? 'جمعہ کی نماز کا پہلا خطبہ 1:15 بجے اور دوسرا خطبہ 2:15 بجے ہوگا'
                : 'Jummah khutbahs are held weekly at 1:15 PM and 2:15 PM. Please arrive 15 minutes early.'}
            </p>
          </div>
        </div>

        {/* Qibla Finder Compass */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/5 dark:border-emerald-500/10 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <Compass className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              {t('qiblaCompassTitle')}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('qiblaCompassDesc')}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-6">
            {/* Visual Compass */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-50 dark:bg-slate-950/40 shadow-inner">
              {/* Compass markings */}
              <span className="absolute top-2 font-mono font-bold text-xs text-red-500">{t('north')}</span>
              <span className="absolute right-2 font-mono font-bold text-xs text-slate-400">{t('east')}</span>
              <span className="absolute bottom-2 font-mono font-bold text-xs text-slate-400">{t('south')}</span>
              <span className="absolute left-2 font-mono font-bold text-xs text-slate-400">{t('west')}</span>

              {/* Kaaba Angle Marker (Locked at 51.2 degrees) */}
              <div 
                className="absolute w-1 h-full pointer-events-none"
                style={{ transform: `rotate(${qiblaAngle}deg)` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-950 shadow">
                  🕋
                </div>
              </div>

              {/* Dial (Compass Arrow rotates simulating user phone movement) */}
              <div
                className="absolute w-36 h-36 border border-emerald-500/20 rounded-full transition-transform duration-500"
                style={{ transform: `rotate(${-compassHeading}deg)` }}
              >
                {/* Simulated heading arrow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-b from-emerald-600 to-transparent rounded-full"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white dark:border-slate-900 shadow"></div>
              </div>

              {/* Central status ring */}
              <div className={`absolute w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                isQiblaAligned 
                  ? 'bg-amber-400 border-amber-500 scale-110 text-slate-950 font-bold' 
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-300 text-xs'
              }`}>
                {isQiblaAligned ? '51° 🕋' : `${Math.round(compassHeading)}°`}
              </div>
            </div>

            {isQiblaAligned && (
              <div className="mt-4 text-emerald-600 dark:text-emerald-400 font-sans font-semibold text-xs sm:text-sm animate-pulse">
                ★ {lang === 'ur' ? 'قبلہ کی سمت درست ہے!' : 'Aligned with Qibla!'}
              </div>
            )}
          </div>

          <p className="font-sans text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 text-center italic">
            {t('alignArrow')}
          </p>
        </div>

      </div>

      {/* Daily Prayer Tracker Section */}
      <div className="bg-emerald-500/5 dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/10 dark:border-emerald-500/20 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400">
              {t('prayerTrackerTitle')}
            </h3>
            <p className="font-sans text-sm text-slate-600 dark:text-slate-400">
              {t('prayerTrackerDesc')}
            </p>
          </div>
          {isTodayFullyPrayed && (
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {t('trackerSuccess')}
            </span>
          )}
        </div>

        {/* The Toggle Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud'] as const).map((pKey) => {
            const isCompleted = todayStatus[pKey];
            const pName = pKey === 'tahajjud' ? t('tahajjud') : BASE_PRAYERS.find(p => p.name.toLowerCase() === pKey)?.name || pKey;
            const pUrName = pKey === 'tahajjud' ? t('tahajjud') : BASE_PRAYERS.find(p => p.name.toLowerCase() === pKey)?.urduName || pKey;

            return (
              <button
                key={pKey}
                onClick={() => togglePrayer(pKey)}
                className={`p-5 rounded-2xl border text-center transition-all flex flex-col justify-between items-center gap-3 cursor-pointer select-none active:scale-95 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md dark:bg-emerald-500'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                  {pKey === 'fajr' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </div>
                <div>
                  <span className="font-sans font-bold text-sm sm:text-base block">
                    {lang === 'ur' ? pUrName : pName}
                  </span>
                  <span className={`font-sans text-[10px] sm:text-xs ${isCompleted ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {isCompleted ? t('markedCompleted') : t('markedMissed')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Weekly Stats */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h4 className="font-display text-lg font-semibold text-emerald-950 dark:text-emerald-300">
            {t('weeklySummary')}
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {last7Days.map((day) => {
              const dObj = tracker[day] || {};
              const count = Object.values(dObj).filter(Boolean).length;
              const dateLabel = new Date(day).toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en', { weekday: 'short' });
              return (
                <div key={day} className="text-center space-y-2">
                  <div className="h-16 bg-slate-100 dark:bg-slate-950 rounded-lg flex flex-col justify-end overflow-hidden border border-slate-200/50 dark:border-slate-800">
                    <div
                      className="bg-emerald-500 w-full transition-all duration-500"
                      style={{ height: `${(count / 6) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-sans text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block truncate">
                    {dateLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
