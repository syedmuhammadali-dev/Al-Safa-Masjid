import React, { useState } from 'react';
import { translations } from '../translations';
import { Language, CommunityEvent } from '../types';
import { Search, Calendar, Clock, MapPin, CheckCircle2, Ticket, Sparkles, X } from 'lucide-react';

interface EventsSectionProps {
  lang: Language;
}

const STATIC_EVENTS: CommunityEvent[] = [
  {
    id: 'ev-1',
    title: 'Sacred Texts in Modern Times',
    titleUrdu: 'جدید دور میں مقدس نصوص کی رہنمائی',
    category: 'lecture',
    date: 'March 12, 2026',
    dateUrdu: '۱۲ مارچ ۲۰۲۶ء',
    time: '07:00 PM',
    timeUrdu: 'شام ۷:۰۰ بجے',
    location: 'Main Hall, Al-Safa',
    locationUrdu: 'مین ہال، الصفا',
    description: 'Join Dr. Yusuf for an enlightening discourse on applying classical Prophetic wisdom to complex contemporary challenges.',
    descriptionUrdu: 'جدید دور کے پیچیدہ اور ابھرتے ہوئے چیلنجوں پر کلاسیکی نبوی حکمت کے اطلاق کے بارے میں ڈاکٹر یوسف کے معلوماتی خطاب میں شامل ہوں۔',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPyjcj_ylo_JpXpfP3heKIVSjRKCxgizyUVsknBD7YxmKhFTcRsotF550grEsGMY7iaOyXtvzKKkeE-phDPF9SY6fyZnmGbNSUnWaQy-AFcfwVByBDW2dJNuOx_pO2xSdl_6suRkt_PQnhKQTUMJNmPNKmjwj7J36YFpD3h3AyG5c8aGz9tFetmiX3Sj0Ra8kuhPh0AKIbUfpBSfR4OsY7ClLmdVLNTFHUNveyMtp9-e2nQo8BNdpRMg'
  },
  {
    id: 'ev-2',
    title: 'Ramadan Preparation Clinic',
    titleUrdu: 'رمضان المبارک کی تیاری کا کلینک',
    category: 'ramadan',
    date: 'March 25, 2026',
    dateUrdu: '۲۵ مارچ ۲۰۲۶ء',
    time: '05:30 PM',
    timeUrdu: 'شام ۵:۳۰ بجے',
    location: 'Library Lounge, Al-Safa',
    locationUrdu: 'لائبریری لاؤنج، الصفا',
    description: 'A comprehensive workshop offering spiritual, health, and nutritional guidance to maximize blessings during the holy month.',
    descriptionUrdu: 'مبارک مہینے کے دوران روحانی، صحت اور غذائی رہنمائی فراہم کرنے والی ایک جامع اور عملی ورکشاپ۔',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUocwDAatuJF9-3AdUcZBdSZwGYNMcA34PhLjc3ohYIKIp2kzBAz9oERHNFDvO25WAOdTglKeE0ErQk1PF5DrIHAjRWijXbx1lCYv8j3XPy4naKkGJ2Uk6cT19JR_yu1rMuFOmuZyj4-jtXuGtOBZme3jefQS2Rk6goxLBSs37XHtc5pfiMck1EVxKzKZX1-9KoTLMA8wOqV2Q_20EQvqRXnIPMKF0ue3gqPkoTvcQXnaYHTkPyMnz0g'
  },
  {
    id: 'ev-3',
    title: 'Youth Leadership & Ethics Forum',
    titleUrdu: 'نوجوانوں کی قیادت اور اخلاقیات کا فورم',
    category: 'youth',
    date: 'April 05, 2026',
    dateUrdu: '۵ اپریل ۲۰۲۶ء',
    time: '02:00 PM',
    timeUrdu: 'دوپہر ۲:۰۰ بجے',
    location: 'Youth Hub',
    locationUrdu: 'یوتھ ہب، الصفا مسجد',
    description: 'Empowering young minds with ethical decision-making skills and practical community leadership experience.',
    descriptionUrdu: 'نوجوانوں کو اخلاقی فیصلہ سازی کی مہارتوں اور کمیونٹی قیادت کے عملی تجربے سے بااختیار بنانا۔',
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD5uECItDKtkR3ibYjBxHJsZyZ-HsrYpoWJH5SSkWONp_n0ckQeVVRX6pAXypETWihAE3P7ql6srhV9orZ5y6JNOzy9x71snf55zNu7QgwwtYjJxQD-Ie1xWFTxjLYtuzzia9sKQxkcGB0v8cJ-TyQnQCcN61c0GMzP4wfowW_LxLcmBnqFvm5ScQWsoFn80jmEMSqr2afpkIDeJXEdeK0h9wBzFm8q2TVlrlbgZn-7zEkI4BRGqdfTA'
  }
];

export default function EventsSection({ lang }: EventsSectionProps) {
  const t = (key: keyof typeof translations['en']) => translations[lang][key];

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'lecture' | 'workshop' | 'ramadan' | 'youth' | 'sisters'>('all');

  // RSVP Modal States
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [rsvpTicket, setRsvpTicket] = useState<{ id: string; event: CommunityEvent; name: string; email: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter Logic
  const filteredEvents = STATIC_EVENTS.filter((ev) => {
    const titleMatches = (lang === 'ur' ? ev.titleUrdu : ev.title)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatches = activeCategory === 'all' || ev.category === activeCategory;
    return titleMatches && categoryMatches;
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail || !selectedEvent) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRsvpTicket({
        id: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
        event: selectedEvent,
        name: attendeeName,
        email: attendeeEmail
      });
      // Save registration locally
      const saved = localStorage.getItem('alsafa_rsvps');
      const rsvps = saved ? JSON.parse(saved) : [];
      rsvps.push({ eventId: selectedEvent.id, email: attendeeEmail, name: attendeeName });
      localStorage.setItem('alsafa_rsvps', JSON.stringify(rsvps));
    }, 1000);
  };

  const closeRsvpFlow = () => {
    setSelectedEvent(null);
    setAttendeeName('');
    setAttendeeEmail('');
    setRsvpTicket(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-emerald-400">
            {t('upcomingEvents')}
          </h2>
          <p className="font-sans text-sm text-slate-500 dark:text-slate-400">
            {t('eventsSubtitle')}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Category Filters */}
        <div className="lg:col-span-8 flex flex-wrap gap-2">
          {[
            { id: 'all', label: t('all') },
            { id: 'lecture', label: t('lectures') },
            { id: 'workshop', label: t('workshops') },
            { id: 'ramadan', label: t('ramadan') },
            { id: 'youth', label: t('youthCat') }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input with Placeholder */}
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('placeholderSearch')}
            className="w-full bg-slate-50 dark:bg-slate-900 py-2.5 pl-10 pr-4 text-sm rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Events Listing Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-20 text-slate-400 font-sans">
          {lang === 'ur' ? 'کوئی تقریب نہیں ملی۔' : 'No upcoming events found matching your filter.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={ev.imgUrl}
                    alt={ev.title}
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white font-sans font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    {t(ev.category as any)}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-display text-xl font-bold text-emerald-950 dark:text-emerald-300 leading-tight">
                    {lang === 'ur' ? ev.titleUrdu : ev.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {lang === 'ur' ? ev.descriptionUrdu : ev.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 font-sans text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ur' ? ev.dateUrdu : ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ur' ? ev.timeUrdu : ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ur' ? ev.locationUrdu : ev.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedEvent(ev)}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:hover:bg-emerald-950 dark:text-emerald-300 font-sans font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{t('rsvpBtn')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RSVP Modal Dialog with Virtual Ticket Generation */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative border border-emerald-500/10 dark:border-emerald-500/20 shadow-2xl space-y-6">
            
            <button
              onClick={closeRsvpFlow}
              className="absolute right-4 top-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpTicket ? (
              /* Beautiful Virtual Entry Ticket Screen */
              <div className="space-y-6 animate-fade-in text-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400">
                    {t('rsvpSuccess')}
                  </h4>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
                    {t('rsvpMessage')}
                  </p>
                </div>

                {/* Virtual Ticket Pass Design */}
                <div className="border-2 border-dashed border-emerald-500/30 rounded-2xl bg-emerald-500/5 p-6 space-y-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="font-sans text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                        {t('yourTicket')}
                      </span>
                      <h5 className="font-display text-base font-bold text-emerald-950 dark:text-emerald-300 line-clamp-1">
                        {lang === 'ur' ? rsvpTicket.event.titleUrdu : rsvpTicket.event.title}
                      </h5>
                    </div>
                    <span className="font-mono text-xs text-slate-400">{rsvpTicket.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-sans text-xs text-slate-600 dark:text-slate-400">
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[9px]">{lang === 'ur' ? 'نام' : 'Guest'}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{rsvpTicket.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[9px]">{lang === 'ur' ? 'ای میل' : 'Email'}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{rsvpTicket.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-sans text-xs text-slate-600 dark:text-slate-400 pt-2">
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[9px]">{lang === 'ur' ? 'تاریخ' : 'Date'}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {lang === 'ur' ? rsvpTicket.event.dateUrdu : rsvpTicket.event.date}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase font-bold text-[9px]">{lang === 'ur' ? 'مقام' : 'Location'}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {lang === 'ur' ? rsvpTicket.event.locationUrdu : rsvpTicket.event.location}
                      </span>
                    </div>
                  </div>

                  {/* Mock Barcode */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-1.5">
                    <div className="h-10 w-full bg-slate-900/10 dark:bg-white/10 rounded flex items-center justify-around overflow-hidden px-4 opacity-75">
                      {Array.from({ length: 42 }).map((_, bIdx) => (
                        <div
                          key={bIdx}
                          className="bg-slate-800 dark:bg-slate-200 h-8"
                          style={{ width: `${(bIdx % 3 === 0 ? 3 : bIdx % 4 === 0 ? 1 : 2)}px` }}
                        ></div>
                      ))}
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-slate-400">
                      *ALSAFA-EVENT-ADMIT*
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      alert(lang === 'ur' ? 'ٹکٹ پی ڈی ایف ڈاؤن لوڈ سمیولیٹ کیا گیا ہے!' : 'Ticket PDF Download simulated!');
                    }}
                    className="flex-grow bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-semibold py-3 rounded-xl transition-all"
                  >
                    {lang === 'ur' ? 'ٹکٹ ڈاؤن لوڈ کریں' : 'Download PDF Ticket'}
                  </button>
                  <button
                    onClick={closeRsvpFlow}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-sans font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            ) : (
              /* RSVP Entry Form */
              <div className="space-y-4 animate-fade-in">
                <div>
                  <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-sans font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {t(selectedEvent.category as any)}
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-400 mt-2">
                    {lang === 'ur' ? 'تقریب رجسٹریشن' : 'RSVP for Event'}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {lang === 'ur' ? selectedEvent.titleUrdu : selectedEvent.title}
                  </p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {lang === 'ur' ? 'آپ کا پورا نام' : 'Your Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      placeholder={t('placeholderFirst') + ' ' + t('placeholderLast')}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t('emailAddress')}
                    </label>
                    <input
                      type="email"
                      required
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      placeholder={t('placeholderEmail')}
                      className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-grow bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? t('submitting') : t('rsvpBtn')}
                    </button>
                    <button
                      type="button"
                      onClick={closeRsvpFlow}
                      className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-sans font-semibold py-3 px-5 rounded-xl transition-all"
                    >
                      {lang === 'ur' ? 'منسوخ کریں' : 'Cancel'}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
