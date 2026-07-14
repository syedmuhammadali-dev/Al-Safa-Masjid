import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { Language } from './types';
import { Sun, Moon, Globe, Heart, Menu, X, Landmark, ArrowUp } from 'lucide-react';

// Import modular sections
import HomeSection from './components/HomeSection';
import PrayerSection from './components/PrayerSection';
import ServicesSection from './components/ServicesSection';
import EventsSection from './components/EventsSection';
import MadrasaSection from './components/MadrasaSection';
import DonateSection from './components/DonateSection';

export default function App() {
  // Navigation Routing Tab State
  const [activeTab, setActiveTab] = useState<string>('home');

  // i18n Translation Language State
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('alsafa_language');
      return (saved === 'ur' ? 'ur' : 'en') as Language;
    } catch {
      return 'en';
    }
  });

  // Dark Theme Theme Toggle State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('alsafa_theme');
      if (saved) return saved === 'dark';
      return true; // Default to eye-safe serene dark mode!
    } catch {
      return true;
    }
  });

  // Mobile navigation drawer state
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Scroll to top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Newsletter email state
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('alsafa_language', lang);
  }, [lang]);

  // Sync dark mode class with documentElement and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('alsafa_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Handle scroll detection for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = (key: keyof typeof translations['en']) => translations[lang][key];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setNewsSuccess(true);
    setNewsEmail('');
    setTimeout(() => setNewsSuccess(false), 5000);
  };

  // Switch tabs safely and close mobile drawers
  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-background dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 ${
        lang === 'ur' ? 'font-serif' : 'font-sans'
      }`}
    >
      {/* Navigation Top Bar */}
      <header className="sticky top-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-900/50 transition-all duration-300">
        <div className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-7xl mx-auto">
          {/* Logo Brand Title */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 bg-emerald-600 dark:bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:rotate-6 transition-transform">
              🕌
            </div>
            <span className="font-display text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-400">
              {t('appName')}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { id: 'home', label: t('home') },
              { id: 'prayerTimes', label: t('prayerTimes') },
              { id: 'services', label: t('services') },
              { id: 'events', label: t('events') },
              { id: 'madrasa', label: t('madrasa') }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Utility buttons */}
          <div className="flex items-center gap-2">
            {/* Language switch */}
            <button
              onClick={() => setLang((prev) => (prev === 'en' ? 'ur' : 'en'))}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1.5 font-sans font-bold text-xs cursor-pointer"
              title="Change Language / زبان تبدیل کریں"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{lang === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Dark mode switch */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-800" />}
            </button>

            {/* Quick Donate button */}
            <button
              onClick={() => navigateTo('donate')}
              className="hidden sm:flex bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 px-5 py-2 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all shadow-md items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{t('donate')}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 md:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-64 max-w-[80vw] h-full bg-white dark:bg-slate-900 p-6 flex flex-col justify-between space-y-6 shadow-2xl relative animate-slide-in">
            {/* Close Mobile Trigger */}
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-8 pt-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center text-white text-base font-bold">
                  🕌
                </div>
                <span className="font-display text-lg font-bold text-emerald-950 dark:text-emerald-400">
                  {t('appName')}
                </span>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-2 font-sans">
                {[
                  { id: 'home', label: t('home') },
                  { id: 'prayerTimes', label: t('prayerTimes') },
                  { id: 'services', label: t('services') },
                  { id: 'events', label: t('events') },
                  { id: 'madrasa', label: t('madrasa') },
                  { id: 'donate', label: t('donate') }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => navigateTo(tab.id)}
                      className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500 text-white dark:bg-emerald-600'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Footer branding info */}
            <p className="font-sans text-[10px] text-slate-400 text-center leading-relaxed">
              {t('tagline')}
            </p>
          </div>
        </div>
      )}

      {/* Main Core Application Content Window */}
      <main className="min-h-[70vh]">
        {activeTab === 'home' && <HomeSection lang={lang} onNavigate={navigateTo} />}
        {activeTab === 'prayerTimes' && <PrayerSection lang={lang} />}
        {activeTab === 'services' && <ServicesSection lang={lang} />}
        {activeTab === 'events' && <EventsSection lang={lang} />}
        {activeTab === 'madrasa' && <MadrasaSection lang={lang} />}
        {activeTab === 'donate' && <DonateSection lang={lang} />}
      </main>

      {/* Bottom Footer Section */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-16 px-4 border-t border-slate-800 dark:border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 dark:bg-emerald-500 rounded-lg flex items-center justify-center text-white text-base font-bold">
                🕌
              </div>
              <span className="font-display text-xl font-bold text-white">
                {t('appName')}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Col 2: Quick navigation */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-300 mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              <li>
                <button onClick={() => navigateTo('prayerTimes')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {t('prayerTimes')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {t('madrasaAcademy')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('events')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {t('upcomingEvents')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('donate')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {t('donateNow')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal stuff */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-300 mb-4">
              {t('legal')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  {t('privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  {t('termsOfService')}
                </a>
              </li>
              <li>
                <button onClick={() => navigateTo('home')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  {lang === 'ur' ? 'ہم سے رابطہ کریں' : 'Contact Us'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-amber-300 mb-4">
              {t('newsletter')}
            </h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              {t('newsletterDesc')}
            </p>

            {newsSuccess ? (
              <div className="bg-emerald-950/50 text-emerald-400 border border-emerald-900 p-3 rounded-xl text-xs font-semibold animate-fade-in">
                {t('newsSuccess')}
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder={lang === 'ur' ? 'آپ کا ای میل' : 'Your email address'}
                  className="flex-grow bg-slate-800 text-slate-100 text-xs py-2 px-3 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  {lang === 'ur' ? 'شامل ہوں' : 'Join'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500 font-sans">
          <p>{t('copyright')}</p>
        </div>
      </footer>

      {/* Floating Scroll back to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
