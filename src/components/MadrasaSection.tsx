import React, { useState } from 'react';
import { translations } from '../translations';
import { Language, StudentReport } from '../types';
import { Search, GraduationCap, Calendar, Users, Award, BookOpen, Star, HelpCircle } from 'lucide-react';

interface MadrasaSectionProps {
  lang: Language;
}

const STUDENTS_DATABASE: StudentReport[] = [
  {
    id: 'SAF-101',
    name: 'Yusuf Khan',
    nameUrdu: 'یوسف خان',
    class: 'Advanced Tajweed (Level 2)',
    attendance: '96%',
    progress: 'Excellent memorization of Surah Al-Kahf verses 1-10 with precise Makhraj.',
    progressUrdu: 'سورہ کہف کی آیات ۱ تا ۱۰ کو درست مخرج کے ساتھ حفظ کرنے میں بہترین کارکردگی۔',
    grades: {
      quran: 'A',
      tajweed: 'A-',
      islamicStudies: 'A+'
    },
    teacherFeedback: 'Yusuf is highly attentive in class and assists peers with difficult recitation rules.',
    teacherFeedbackUrdu: 'یوسف کلاس میں بہت توجہ دیتے ہیں اور مشکل قواعد کی تلاوت میں اپنے ساتھیوں کی مدد کرتے ہیں۔'
  },
  {
    id: 'SAF-102',
    name: 'Maryam Al-Farsi',
    nameUrdu: 'مریم الفارسی',
    class: 'Quranic Foundation (Ages 6)',
    attendance: '91%',
    progress: 'Successfully completed the Noorani Qaida and has memorized the last 10 Surahs.',
    progressUrdu: 'نورانی قاعدہ کامیابی سے مکمل کر لیا ہے اور آخری ۱۰ سورتیں حفظ کر لی ہیں۔',
    grades: {
      quran: 'A+',
      tajweed: 'B+',
      islamicStudies: 'A'
    },
    teacherFeedback: 'Maryam demonstrates excellent enthusiasm and a natural, melodious recitation voice.',
    teacherFeedbackUrdu: 'مریم زبردست جوش و خروش اور ایک قدرتی، خوش الحان تلاوت کی آواز کا مظاہرہ کرتی ہیں۔'
  }
];

export default function MadrasaSection({ lang }: MadrasaSectionProps) {
  const t = (key: keyof typeof translations['en']) => translations[lang][key];

  // Search Parent Portal
  const [studentId, setStudentId] = useState('');
  const [activeReport, setActiveReport] = useState<StudentReport | null>(null);
  const [searchError, setSearchError] = useState(false);

  const handleSearchReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(false);
    setActiveReport(null);

    const match = STUDENTS_DATABASE.find(s => s.id.toUpperCase() === studentId.trim().toUpperCase());
    if (match) {
      setActiveReport(match);
    } else {
      setSearchError(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Madrasa Hero Title */}
      <div className="relative rounded-3xl overflow-hidden min-h-[250px] flex items-center p-8 sm:p-12 shadow-md">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD5uECItDKtkR3ibYjBxHJsZyZ-HsrYpoWJH5SSkWONp_n0ckQeVVRX6pAXypETWihAE3P7ql6srhV9orZ5y6JNOzy9x71snf55zNu7QgwwtYjJxQD-Ie1xWFTxjLYtuzzia9sKQxkcGB0v8cJ-TyQnQCcN61c0GMzP4wfowW_LxLcmBnqFvm5ScQWsoFn80jmEMSqr2afpkIDeJXEdeK0h9wBzFm8q2TVlrlbgZn-7zEkI4BRGqdfTA"
          alt="Madrasa Class"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/60 to-transparent"></div>
        <div className="relative z-10 text-white max-w-xl space-y-4">
          <span className="bg-amber-500 text-slate-950 font-sans font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
            {lang === 'ur' ? 'داخلے کھلے ہیں' : 'ADMISSIONS OPEN'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
            {t('madrasaPortal')}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-emerald-100">
            {t('servicesSubtitle')}
          </p>
        </div>
      </div>

      {/* Grid: Parent Portal & Syllabus Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Parent Portal Report Cards Search */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-emerald-600" />
              {t('parentPortal')}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t('parentPortalDesc')}
            </p>
          </div>

          <form onSubmit={handleSearchReport} className="flex gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder={t('placeholderStudentId')}
                className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 font-sans font-semibold px-6 rounded-xl transition-all active:scale-95 text-sm shrink-0"
            >
              {t('searchReport')}
            </button>
          </form>

          {/* Prompt/Tip for mock users */}
          <div className="bg-amber-500/5 rounded-2xl p-4 flex gap-2 text-amber-800 dark:text-amber-400 border border-amber-500/10 text-xs sm:text-sm">
            <HelpCircle className="w-5 h-5 flex-shrink-0 text-amber-500" />
            <p className="font-sans">{t('searchTips')}</p>
          </div>

          {searchError && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-xl text-xs sm:text-sm font-sans">
              ⚠️ {lang === 'ur' ? 'طالب علم کا ریکارڈ نہیں ملا۔ برائے مہربانی آئی ڈی درست درج کریں جیسے SAF-101' : 'Student ID not found. Please double-check the ID or try typing: SAF-101'}
            </div>
          )}

          {/* Active Report Rendering */}
          {activeReport && (
            <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-6 space-y-6 animate-fade-in font-sans">
              <div className="flex justify-between items-start border-b border-emerald-500/10 pb-3">
                <div>
                  <h4 className="font-display text-lg font-bold text-emerald-950 dark:text-emerald-300">
                    {lang === 'ur' ? activeReport.nameUrdu : activeReport.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeReport.class} • ID: {activeReport.id}
                  </p>
                </div>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs px-3 py-1 rounded-full font-semibold">
                  {t('attendance')}: {activeReport.attendance}
                </span>
              </div>

              {/* Progress Summary */}
              <div className="space-y-1">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {t('overallProgress')}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  {lang === 'ur' ? activeReport.progressUrdu : activeReport.progress}
                </p>
              </div>

              {/* Grades Grid */}
              <div className="space-y-2">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {t('academicGrades')}
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-slate-950 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block truncate">{t('quranReading')}</span>
                    <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{activeReport.grades.quran}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block truncate">{lang === 'ur' ? 'تجوید' : t('tajweedRules')}</span>
                    <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{activeReport.grades.tajweed}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block truncate">{lang === 'ur' ? 'دینیات' : 'Ethics'}</span>
                    <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{activeReport.grades.islamicStudies}</span>
                  </div>
                </div>
              </div>

              {/* Teacher Comments */}
              <div className="space-y-1">
                <span className="text-slate-400 block font-bold text-[10px] uppercase">
                  {t('teacherFeedback')}
                </span>
                <p className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-300">
                  &ldquo;{lang === 'ur' ? activeReport.teacherFeedbackUrdu : activeReport.teacherFeedback}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Syllabus paths */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              {t('courseSyllabus')}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('syllabusDesc')}
            </p>
          </div>

          <div className="space-y-4 font-sans text-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-emerald-700 shrink-0">1</div>
              <div>
                <h5 className="font-bold text-emerald-900 dark:text-emerald-400">{t('foundationCourse')}</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('foundationDesc')}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-emerald-700 shrink-0">2</div>
              <div>
                <h5 className="font-bold text-emerald-900 dark:text-emerald-400">{t('advancedTajweed')}</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('advancedTajweedDesc')}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-emerald-700 shrink-0">3</div>
              <div>
                <h5 className="font-bold text-emerald-900 dark:text-emerald-400">{t('adultPath')}</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('adultPathDesc')}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Teachers Directory */}
      <section className="space-y-6">
        <div className="text-center">
          <h3 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400">
            {t('ourEducators')}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {t('educatorsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              name: t('imamName'),
              role: t('imamTitle'),
              bg: 'omar',
              desc: lang === 'ur' ? 'مستند عالم دین، جامعہ ازہر کے گریجویٹ، تجوید اور فقہ کے استاد۔' : 'Graduate of Al-Azhar University, guiding youth and counseling families.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVePpmNU2Yx1S1D0fjGvmlMvx_BiqkXTNjCg4n0PktJQ75ZV5SFnKWiaM3bkzYudSycd_iyztrK_FNo-OhtR2Hg9lW7uJZGMzy_RXcPDocvKc3DwvuKEqad1t_Yc8nxN2ccL0dyNrMSkNtgXA0oIL_lc0e58cUpwSzUzyJTav-CftPRRGvvQbQl70wrR6-uRazX3AjOJMINovG-w11H8YHlLgjcOWZmUNPHdx6wEB3jf6nnG7GF5tjXg'
            },
            {
              name: lang === 'ur' ? 'شیخ حمزہ صدیقی' : 'Sheikh Hamzah Siddiqui',
              role: lang === 'ur' ? 'سینئر قرآنی استاد (حافظ)' : 'Senior Hafidh & Qari',
              bg: 'hamzah',
              desc: lang === 'ur' ? 'قرآن مجید کے حافظ، روایتی مخرج اور تلاوت کے ماہر استاد۔' : 'Certified Qari with an Ijazah in Quran recitation, specializing in kids memorization.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPyjcj_ylo_JpXpfP3heKIVSjRKCxgizyUVsknBD7YxmKhFTcRsotF550grEsGMY7iaOyXtvzKKkeE-phDPF9SY6fyZnmGbNSUnWaQy-AFcfwVByBDW2dJNuOx_pO2xSdl_6suRkt_PQnhKQTUMJNmPNKmjwj7J36YFpD3h3AyG5c8aGz9tFetmiX3Sj0Ra8kuhPh0AKIbUfpBSfR4OsY7ClLmdVLNTFHUNveyMtp9-e2nQo8BNdpRMg'
            },
            {
              name: lang === 'ur' ? 'سسٹر مریم الفاروق' : 'Sister Maryam Al-Farooq',
              role: lang === 'ur' ? 'بچوں کے ابتدائیہ کی معلمہ' : 'Early Childhood Instructor',
              bg: 'maryam',
              desc: lang === 'ur' ? 'بچوں کو کھیل کھیل میں حروف تہجی اور قرآنی سورتیں سکھانے میں مہارت۔' : 'Expert in early-childhood Islamic education, teaching the Arabic alphabet in fun ways.',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUocwDAatuJF9-3AdUcZBdSZwGYNMcA34PhLjc3ohYIKIp2kzBAz9oERHNFDvO25WAOdTglKeE0ErQk1PF5DrIHAjRWijXbx1lCYv8j3XPy4naKkGJ2Uk6cT19JR_yu1rMuFOmuZyj4-jtXuGtOBZme3jefQS2Rk6goxLBSs37XHtc5pfiMck1EVxKzKZX1-9KoTLMA8wOqV2Q_20EQvqRXnIPMKF0ue3gqPkoTvcQXnaYHTkPyMnz0g'
            }
          ].map((teach, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl text-center space-y-4 shadow-sm"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto ring-2 ring-emerald-500/30">
                <img
                  className="w-full h-full object-cover"
                  src={teach.img}
                  alt={teach.name}
                />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-emerald-950 dark:text-emerald-300">{teach.name}</h4>
                <span className="font-sans text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase">{teach.role}</span>
              </div>
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {teach.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
