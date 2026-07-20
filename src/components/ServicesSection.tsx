import React, { useState } from 'react';
import { translations } from '../translations';
import { Language, ServiceBooking } from '../types';
import { BookOpen, Sparkles, Users, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
}

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const t = (key: keyof typeof translations['en']) => translations[lang][key];

  // Active form section
  const [activeForm, setActiveForm] = useState<'none' | 'madrasa' | 'counseling' | 'youth'>('none');

  // Madrasa form state
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [selectedPathway, setSelectedPathway] = useState('foundation');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [madrasaSubmitted, setMadrasaSubmitted] = useState(false);

  // Counseling form state
  const [counselingName, setCounselingName] = useState('');
  const [counselingEmail, setCounselingEmail] = useState('');
  const [counselingTopic, setCounselingTopic] = useState('personal');
  const [counselingAdvisor, setCounselingAdvisor] = useState('omar');
  const [counselingSlot, setCounselingSlot] = useState('monday_pm');
  const [counselingSubmitted, setCounselingSubmitted] = useState(false);

  // Youth form state
  const [youthName, setYouthName] = useState('');
  const [youthEmail, setYouthEmail] = useState('');
  const [youthAge, setYouthAge] = useState('');
  const [youthActivity, setYouthActivity] = useState('futsal');
  const [youthSubmitted, setYouthSubmitted] = useState(false);

  // Handlers
  const handleMadrasaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !parentName || !studentAge || !parentPhone) return;
    setMadrasaSubmitted(true);
  };

  const handleCounselingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselingName || !counselingEmail) return;
    setCounselingSubmitted(true);
  };

  const handleYouthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youthName || !youthEmail || !youthAge) return;
    setYouthSubmitted(true);
  };

  const resetFormStates = () => {
    setActiveForm('none');
    setMadrasaSubmitted(false);
    setCounselingSubmitted(false);
    setYouthSubmitted(false);
    // clear fields
    setStudentName('');
    setParentName('');
    setStudentAge('');
    setParentPhone('');
    setAdditionalNotes('');
    setCounselingName('');
    setCounselingEmail('');
    setYouthName('');
    setYouthEmail('');
    setYouthAge('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Services Introduction */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-emerald-400">
          {t('ourServices')}
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {t('servicesSubtitle')}
        </p>
      </div>

      {/* Services Selection Grid (if no form is active) */}
      {activeForm === 'none' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Madrasa Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-emerald-950 dark:text-emerald-300">
                {t('madrasaAcademy')}
              </h3>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('madrasaDesc')}
              </p>
            </div>
            <button
              onClick={() => setActiveForm('madrasa')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-sans font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>{t('enrollNow')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Counseling Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-emerald-950 dark:text-emerald-300">
                {t('faithCounseling')}
              </h3>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('counselingDesc')}
              </p>
            </div>
            <button
              onClick={() => setActiveForm('counseling')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-sans font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>{t('bookSession')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Youth Hub Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-teal-50 dark:bg-teal-950/40 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-emerald-950 dark:text-emerald-300">
                {t('youthHub')}
              </h3>
              <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('youthDesc')}
              </p>
            </div>
            <button
              onClick={() => setActiveForm('youth')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-sans font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>{t('explorePrograms')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Madrasa Enrollment Form */}
      {activeForm === 'madrasa' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8 max-w-3xl mx-auto">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              {t('madrasaPortal')}
            </h3>
            <button
              onClick={resetFormStates}
              className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {lang === 'ur' ? 'پیچھے جائیں' : 'Go Back'}
            </button>
          </div>

          {madrasaSubmitted ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400">
                {t('enrollSuccess')}
              </h4>
              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {t('enrollSuccessDesc')}
              </p>
              <button
                onClick={resetFormStates}
                className="mt-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-2.5 px-6 rounded-xl font-sans font-semibold text-sm transition-colors"
              >
                {lang === 'ur' ? 'دوسری درخواست جمع کریں' : 'Enroll Another Student'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleMadrasaSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'طالب علم کا نام' : 'Student Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder={t('placeholderStudent')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'والد/والدہ کا نام' : 'Parent/Guardian Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder={t('placeholderFirst') + ' ' + t('placeholderLast')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'عمر' : 'Student Age'}
                  </label>
                  <input
                    type="number"
                    required
                    value={studentAge}
                    onChange={(e) => setStudentAge(e.target.value)}
                    placeholder={t('placeholderAge')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'فون نمبر' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder={t('placeholderPhone')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {lang === 'ur' ? 'مطلوبہ کورس' : 'Syllabus Pathway'}
                </label>
                <select
                  value={selectedPathway}
                  onChange={(e) => setSelectedPathway(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                >
                  <option value="foundation">{t('foundationCourse')}</option>
                  <option value="advanced">{t('advancedTajweed')}</option>
                  <option value="leadership">{t('adultPath')}</option>
                </select>
              </div>

              <div>
                <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                  {lang === 'ur' ? 'اضافی معلومات / نوٹس' : 'Additional Notes / Health Requirements'}
                </label>
                <textarea
                  rows={3}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder={t('placeholderNotes')}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 py-3.5 rounded-xl font-sans font-semibold transition-all active:scale-95 shadow"
              >
                {lang === 'ur' ? 'درخواست جمع کریں' : 'Submit Enrollment Application'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Counseling Booking Form */}
      {activeForm === 'counseling' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8 max-w-3xl mx-auto">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              {t('bookCounseling')}
            </h3>
            <button
              onClick={resetFormStates}
              className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {lang === 'ur' ? 'پیچھے جائیں' : 'Go Back'}
            </button>
          </div>

          <div className="bg-emerald-500/5 rounded-2xl p-4 flex gap-3 text-emerald-800 dark:text-emerald-300 border border-emerald-500/10 text-xs sm:text-sm">
            <Lock className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <p className="font-sans">{t('counselingPrivacy')}</p>
          </div>

          {counselingSubmitted ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400">
                {t('bookingSuccess')}
              </h4>
              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {t('bookingSuccessDesc')}
              </p>
              <button
                onClick={resetFormStates}
                className="mt-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-2.5 px-6 rounded-xl font-sans font-semibold text-sm transition-colors"
              >
                {lang === 'ur' ? 'ایک اور بکنگ کریں' : 'Book Another Session'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleCounselingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'آپ کا نام' : 'Your Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={counselingName}
                    onChange={(e) => setCounselingName(e.target.value)}
                    placeholder={t('placeholderFirst') + ' ' + t('placeholderLast')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    required
                    value={counselingEmail}
                    onChange={(e) => setCounselingEmail(e.target.value)}
                    placeholder={t('placeholderEmail')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t('selectTopic')}
                  </label>
                  <select
                    value={counselingTopic}
                    onChange={(e) => setCounselingTopic(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  >
                    <option value="personal">{t('topicPersonal')}</option>
                    <option value="family">{t('topicFamily')}</option>
                    <option value="youth">{t('topicYouth')}</option>
                    <option value="grief">{t('topicGrief')}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t('selectCounselor')}
                  </label>
                  <select
                    value={counselingAdvisor}
                    onChange={(e) => setCounselingAdvisor(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  >
                    <option value="omar">{t('imamName')}</option>
                    <option value="amina">{lang === 'ur' ? 'سسٹر آمنہ رشید (ماہر نفسیات)' : 'Sister Amina (Family Counselor)'}</option>
                    <option value="bilal">{lang === 'ur' ? 'برادر بلال شاہ (یوتھ گائیڈ)' : 'Brother Bilal (Youth Advisor)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t('selectTimeSlot')}
                  </label>
                  <select
                    value={counselingSlot}
                    onChange={(e) => setCounselingSlot(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  >
                    <option value="monday_pm">{lang === 'ur' ? 'پیر - شام ۵ بجے' : 'Monday - 5:00 PM'}</option>
                    <option value="wednesday_am">{lang === 'ur' ? 'بدھ - صبح ۱۰ بجے' : 'Wednesday - 10:00 AM'}</option>
                    <option value="friday_pm">{lang === 'ur' ? 'جمعہ - شام ۴:۳۰ بجے' : 'Friday - 4:30 PM'}</option>
                    <option value="saturday_pm">{lang === 'ur' ? 'ہفتہ - دوپہر ۲ بجے' : 'Saturday - 2:00 PM'}</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-3.5 rounded-xl font-sans font-bold transition-all active:scale-95 shadow"
              >
                {lang === 'ur' ? 'سیشن بک کریں' : 'Confirm Counselor Booking'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Youth Hub Form */}
      {activeForm === 'youth' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 sm:p-10 shadow-lg space-y-8 max-w-3xl mx-auto">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-600" />
              {lang === 'ur' ? 'یوتھ پروگرام رجسٹریشن' : 'Youth Program Sign-Up'}
            </h3>
            <button
              onClick={resetFormStates}
              className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {lang === 'ur' ? 'پیچھے جائیں' : 'Go Back'}
            </button>
          </div>

          {youthSubmitted ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400">
                {lang === 'ur' ? 'رجسٹریشن کامیاب!' : 'Youth Registration Complete!'}
              </h4>
              <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {lang === 'ur' 
                  ? 'شکریہ! ہم نے آپ کی معلومات حاصل کر لی ہیں۔ جلد ہی یوتھ کوآرڈینیٹر آپ سے واٹس ایپ گروپ لنکس اور پروگرام شیڈول کے ساتھ رابطہ کرے گا۔'
                  : 'Awesome! We have received your program signup. The Youth Coordinator will reach out with calendar dates, schedule times, and messaging groups.'}
              </p>
              <button
                onClick={resetFormStates}
                className="mt-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-2.5 px-6 rounded-xl font-sans font-semibold text-sm transition-colors"
              >
                {lang === 'ur' ? 'مزید سرگرمیوں میں سائن اپ کریں' : 'Sign Up for Other Activities'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleYouthSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'نام' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={youthName}
                    onChange={(e) => setYouthName(e.target.value)}
                    placeholder={t('placeholderFirst') + ' ' + t('placeholderLast')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    required
                    value={youthEmail}
                    onChange={(e) => setYouthEmail(e.target.value)}
                    placeholder={t('placeholderEmail')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'عمر' : 'Your Age'}
                  </label>
                  <input
                    type="number"
                    required
                    value={youthAge}
                    onChange={(e) => setYouthAge(e.target.value)}
                    placeholder="e.g., 16"
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {lang === 'ur' ? 'سرگرمی منتخب کریں' : 'Choose Activity'}
                  </label>
                  <select
                    value={youthActivity}
                    onChange={(e) => setYouthActivity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                  >
                    <option value="futsal">{lang === 'ur' ? 'مسجد فوتسال لیگ' : 'Masjid Futsal League'}</option>
                    <option value="basketball">{lang === 'ur' ? 'ہفتہ وار باسکٹ بال کلب' : 'Weekly Basketball Club'}</option>
                    <option value="leadership">{lang === 'ur' ? 'مسلم لیڈرشپ ڈویلپمنٹ فورم' : 'Muslim Leadership Forum'}</option>
                    <option value="mentorship">{lang === 'ur' ? 'یوتھ پیئر مینٹرشپ پروگرام' : 'Youth Peer Mentorship Circle'}</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3.5 rounded-xl font-sans font-semibold transition-all active:scale-95 shadow"
              >
                {lang === 'ur' ? 'کمیونٹی سرگرمی میں شامل ہوں' : 'Register for Youth Activity'}
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
}
