import React, { useState } from 'react';
import { translations } from '../translations';
import { Language } from '../types';
import { Heart, Calendar, MapPin, Mail, BookOpen, Users, Sparkles, Clock, Phone, ChevronRight } from 'lucide-react';

interface HomeSectionProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export default function HomeSection({ lang, onNavigate }: HomeSectionProps) {
  const t = (key: keyof typeof translations['en']) => translations[lang][key];

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Imam Modal state
  const [showImamModal, setShowImamModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-20 pb-20 animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden rounded-b-[2rem] sm:rounded-b-[4rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUocwDAatuJF9-3AdUcZBdSZwGYNMcA34PhLjc3ohYIKIp2kzBAz9oERHNFDvO25WAOdTglKeE0ErQk1PF5DrIHAjRWijXbx1lCYv8j3XPy4naKkGJ2Uk6cT19JR_yu1rMuFOmuZyj4-jtXuGtOBZme3jefQS2Rk6goxLBSs37XHtc5pfiMck1EVxKzKZX1-9KoTLMA8wOqV2Q_20EQvqRXnIPMKF0ue3gqPkoTvcQXnaYHTkPyMnz0g"
            alt="Al-Safa Mosque"
            className="w-full h-full object-cover brightness-50 contrast-105 transition-all duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-slate-950 via-primary/30 to-black/40"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <span className="font-sans font-semibold text-sm sm:text-base text-amber-300 dark:text-amber-200 tracking-[0.2em] uppercase block drop-shadow-md">
            {t('bismillah')}
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-white font-bold leading-tight drop-shadow-lg tracking-tight">
            {t('heroTitle')}
          </h1>
          <p className="font-sans text-base sm:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {t('heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={() => onNavigate('donate')}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 px-8 py-3.5 rounded-full font-sans font-semibold transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{t('donateNow')}</span>
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={() => onNavigate('prayerTimes')}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md px-8 py-3.5 rounded-full font-sans font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{t('viewPrayerTimes')}</span>
              <Clock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Prayer Times Bar */}
      <div className="relative -mt-24 z-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 shadow-xl border border-emerald-500/10 dark:border-emerald-500/20">
          {[
            { key: 'fajr', name: t('fajr'), time: '05:15 AM' },
            { key: 'dhuhr', name: t('dhuhr'), time: '01:10 PM' },
            { key: 'asr', name: t('asr'), time: '04:45 PM' },
            { key: 'maghrib', name: t('maghrib'), time: '08:10 PM', highlight: true },
            { key: 'isha', name: t('isha'), time: '09:30 PM' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('prayerTimes')}
              className={`text-center p-4 rounded-2xl transition-all cursor-pointer ${
                item.highlight
                  ? 'bg-emerald-500/10 dark:bg-emerald-500/20 ring-2 ring-emerald-500/50 scale-105 relative'
                  : 'hover:bg-emerald-500/5 dark:hover:bg-slate-800'
              }`}
            >
              {item.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-sans font-bold text-[10px] uppercase px-3 py-0.5 rounded-full tracking-wider shadow">
                  {t('nextPrayer')}
                </div>
              )}
              <span className="font-sans font-medium text-xs sm:text-sm text-slate-500 dark:text-slate-400 block mb-1">
                {item.name}
              </span>
              <span className={`font-display text-lg sm:text-xl font-bold ${
                item.highlight ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'
              }`}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Jummah & Community Highlights */}
      <section className="px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-emerald-50/50 dark:bg-slate-900/50 p-8 rounded-3xl flex flex-col justify-between border-t-4 border-amber-500 shadow-sm">
          <div>
            <Calendar className="text-amber-500 w-10 h-10 mb-6" />
            <h2 className="font-display text-2xl font-semibold text-emerald-950 dark:text-emerald-400 mb-3">
              {t('jummahTimes')}
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
              {t('jummahDesc')}
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="font-sans text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
                  {t('firstKhutbah')}
                </span>
                <span className="font-display text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  01:15 PM
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
                  {t('secondKhutbah')}
                </span>
                <span className="font-display text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  02:15 PM
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('prayerTimes')}
            className="mt-8 text-emerald-600 dark:text-emerald-400 font-sans font-semibold text-sm flex items-center gap-1 hover:translate-x-1 transition-transform self-start"
          >
            <span>{t('prayerSchedule')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group min-h-[300px] shadow-sm">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPyjcj_ylo_JpXpfP3heKIVSjRKCxgizyUVsknBD7YxmKhFTcRsotF550grEsGMY7iaOyXtvzKKkeE-phDPF9SY6fyZnmGbNSUnWaQy-AFcfwVByBDW2dJNuOx_pO2xSdl_6suRkt_PQnhKQTUMJNmPNKmjwj7J36YFpD3h3AyG5c8aGz9tFetmiX3Sj0Ra8kuhPh0AKIbUfpBSfR4OsY7ClLmdVLNTFHUNveyMtp9-e2nQo8BNdpRMg"
            alt="Community Gathering"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-2">
              {t('vibrantComm')}
            </h3>
            <p className="font-sans text-sm sm:text-base text-slate-200 max-w-xl">
              {t('loungeDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* About & Imam Section */}
      <section className="bg-emerald-50/20 dark:bg-slate-900/30 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-emerald-400">
              {t('aboutTitle')}
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('aboutDesc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h4 className="font-display text-lg font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  {t('mission')}
                </h4>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-400">
                  {t('missionDesc')}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-lg font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  {t('vision')}
                </h4>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-400">
                  {t('visionDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-emerald-500/10 dark:border-emerald-500/20 relative">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-amber-300/50 flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVePpmNU2Yx1S1D0fjGvmlMvx_BiqkXTNjCg4n0PktJQ75ZV5SFnKWiaM3bkzYudSycd_iyztrK_FNo-OhtR2Hg9lW7uJZGMzy_RXcPDocvKc3DwvuKEqad1t_Yc8nxN2ccL0dyNrMSkNtgXA0oIL_lc0e58cUpwSzUzyJTav-CftPRRGvvQbQl70wrR6-uRazX3AjOJMINovG-w11H8YHlLgjcOWZmUNPHdx6wEB3jf6nnG7GF5tjXg"
                  alt="Imam Omar Al-Farooq"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-emerald-950 dark:text-emerald-400">
                  {t('imamName')}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider">
                  {t('imamTitle')}
                </p>
              </div>
            </div>
            <blockquote className="font-sans text-base italic text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              &ldquo;{t('imamQuote')}&rdquo;
            </blockquote>
            <button
              onClick={() => setShowImamModal(true)}
              className="font-sans font-semibold text-sm text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              {t('readMessage')}
            </button>
          </div>
        </div>
      </section>

      {/* Quick Services Links */}
      <section className="px-4 max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-emerald-950 dark:text-emerald-400 mb-2">
            {t('ourServices')}
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: t('madrasaAcademy'),
              desc: t('madrasaDesc'),
              action: t('enrollNow'),
              icon: BookOpen,
              tab: 'services'
            },
            {
              title: t('faithCounseling'),
              desc: t('counselingDesc'),
              action: t('bookSession'),
              icon: Sparkles,
              tab: 'services'
            },
            {
              title: t('youthHub'),
              desc: t('youthDesc'),
              action: t('explorePrograms'),
              icon: Users,
              tab: 'services'
            }
          ].map((srv, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-emerald-500/5 dark:border-emerald-500/10 shadow-sm hover:shadow-md hover:border-emerald-500/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                  <srv.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-emerald-950 dark:text-emerald-300 mb-3">
                  {srv.title}
                </h3>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {srv.desc}
                </p>
              </div>
              <button
                onClick={() => onNavigate(srv.tab)}
                className="text-emerald-600 dark:text-emerald-400 font-sans font-semibold text-sm flex items-center gap-1 group"
              >
                <span>{srv.action}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Reach Out / Contact Form Section */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="bg-emerald-950 dark:bg-slate-900 rounded-[2.5rem] text-white p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {t('reachOut')}
            </h2>
            <p className="font-sans text-slate-300 leading-relaxed text-sm sm:text-base">
              {t('reachOutDesc')}
            </p>

            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-2xl text-amber-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans font-semibold text-sm text-amber-300">
                    {t('location')}
                  </h5>
                  <p className="font-sans text-sm text-slate-200">
                    123 Islamic Center Way, Springfield, IL 62704
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-2xl text-amber-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-sans font-semibold text-sm text-amber-300">
                    {t('emailUs')}
                  </h5>
                  <p className="font-sans text-sm text-slate-200">
                    info@alsafamasjid.org
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 text-slate-800 dark:text-slate-100 shadow-xl">
            {isSuccess ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-display text-xl font-bold text-emerald-900 dark:text-emerald-400">
                  {lang === 'ur' ? 'پیغام موصول ہوا!' : 'Message Received!'}
                </h4>
                <p className="font-sans text-slate-600 dark:text-slate-300 text-sm">
                  {t('msgSuccess')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t('firstName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={t('placeholderFirst')}
                      className="w-full bg-slate-50 focus:bg-white dark:bg-slate-900/60 dark:focus:bg-slate-900 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t('lastName')}
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={t('placeholderLast')}
                      className="w-full bg-slate-50 focus:bg-white dark:bg-slate-900/60 dark:focus:bg-slate-900 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('placeholderEmail')}
                    className="w-full bg-slate-50 focus:bg-white dark:bg-slate-900/60 dark:focus:bg-slate-900 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('placeholderMessage')}
                    className="w-full bg-slate-50 focus:bg-white dark:bg-slate-900/60 dark:focus:bg-slate-900 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 py-3 rounded-xl font-sans font-semibold transition-colors shadow-md active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? t('submitting') : t('sendMessage')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Imam Message Modal */}
      {showImamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-emerald-500/10 dark:border-emerald-500/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-amber-300">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVePpmNU2Yx1S1D0fjGvmlMvx_BiqkXTNjCg4n0PktJQ75ZV5SFnKWiaM3bkzYudSycd_iyztrK_FNo-OhtR2Hg9lW7uJZGMzy_RXcPDocvKc3DwvuKEqad1t_Yc8nxN2ccL0dyNrMSkNtgXA0oIL_lc0e58cUpwSzUzyJTav-CftPRRGvvQbQl70wrR6-uRazX3AjOJMINovG-w11H8YHlLgjcOWZmUNPHdx6wEB3jf6nnG7GF5tjXg"
                  alt="Imam Omar"
                />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-emerald-950 dark:text-emerald-400">
                  {t('imamName')}
                </h4>
                <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
                  {t('imamTitle')}
                </p>
              </div>
            </div>

            <div className="space-y-4 font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed overflow-y-auto max-h-[300px]">
              <p>
                {lang === 'ur'
                  ? 'الصفا مسجد میں ہم اپنے پیارے مرکز میں آپ کو خوش آمدید کہتے ہیں۔ ہمارا عزم ہے کہ ہم ایک ایسا ماحول فراہم کریں جہاں ہر شخص بغیر کسی خوف اور جھجھک کے علم اور روحانیت حاصل کر سکے۔'
                  : 'Welcome to Al-Safa Masjid. Our mission is to foster a spiritual and educational sanctuary where everyone can connect with the Divine and serve their fellow human beings.'}
              </p>
              <p>
                {lang === 'ur'
                  ? 'ہم صرف روزانہ پانچ وقت کی نمازوں کے لیے جمع نہیں ہوتے، بلکہ ہم بچوں کی تربیت، دینی مشورے، اور غریبوں کی مدد کے لیے بھی مسلسل سرگرمِ عمل ہیں۔'
                  : 'We do not gather merely for five daily prayers, but also for nurturing our youth, supporting family needs, providing secure counsel, and standing by those who are facing hardship.'}
              </p>
              <p>
                {lang === 'ur'
                  ? 'اللہ تعالیٰ ہماری ان عاجزانہ کوششوں کو قبول فرمائے اور ہمارے گھروں کو سکون و برکت سے نوازے۔ آمین۔'
                  : 'May Allah SWT bless our community, guide our steps, and grant us sincerity in everything we do. Ameen.'}
              </p>
            </div>

            <button
              onClick={() => setShowImamModal(false)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-sans font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
