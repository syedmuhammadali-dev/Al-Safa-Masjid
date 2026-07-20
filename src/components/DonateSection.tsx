import React, { useState } from 'react';
import { translations } from '../translations';
import { Language } from '../types';
import { showAlert } from '../swal';
import { Heart, Landmark, Construction, ShieldCheck } from 'lucide-react';

interface DonateSectionProps {
  lang: Language;
}

export default function DonateSection({ lang }: DonateSectionProps) {
  const t = (key: keyof typeof translations['en']) => translations[lang][key];

  // Donation State
  const [frequency, setFrequency] = useState<'oneTime' | 'monthly' | 'weekly'>('oneTime');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedFund, setSelectedFund] = useState('general');

  // No payment gateway is wired up yet, so submitting just informs the donor
  // instead of pretending to charge a card.
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalAmount = selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount;
    if (isNaN(finalAmount) || finalAmount <= 0) {
      showAlert({
        icon: 'warning',
        title: lang === 'ur' ? 'غلط رقم' : 'Invalid Amount',
        text: lang === 'ur' ? 'برائے مہربانی درست رقم درج کریں۔' : 'Please select or enter a valid donation amount.',
      });
      return;
    }

    showAlert({
      icon: 'info',
      title: lang === 'ur' ? 'جلد آرہا ہے' : 'Coming Soon',
      text:
        lang === 'ur'
          ? 'آن لائن ادائیگی کا نظام ابھی زیرِ تعمیر ہے۔ فی الحال کوئی رقم منتقل نہیں ہوئی۔ براہِ کرم عطیہ کے لیے مسجد سے براہِ راست رابطہ کریں۔'
          : "Real payment integration is coming soon — no money has been charged. Please contact the masjid directly to donate for now.",
    });
  };

  const getFundLabel = (fundKey: string) => {
    switch (fundKey) {
      case 'general': return t('fundGeneral');
      case 'expansion': return t('fundExpansion');
      case 'madrasa': return t('fundMadrasa');
      case 'needy': return t('fundNeedy');
      case 'zakat': return t('fundZakat');
      default: return fundKey;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Intro & Hadith banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-emerald-400">
          {t('donationPortal')}
        </h2>
        <div className="bg-amber-500/5 border border-amber-500/15 p-6 rounded-3xl">
          <p className="font-sans text-sm sm:text-base italic text-emerald-800 dark:text-emerald-300 leading-relaxed">
            &ldquo;{t('donationSubtitle')}&rdquo;
          </p>
        </div>
      </div>

        {/* Donation Checkout Flow (payment gateway not yet integrated) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Fund Configuration Column */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
            
            {/* Frequency Selection */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t('donationType')}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'oneTime', label: t('oneTime') },
                  { id: 'monthly', label: t('monthly') },
                  { id: 'weekly', label: t('weekly') }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFrequency(item.id as any)}
                    className={`py-3 px-4 rounded-xl font-sans text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      frequency === item.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm dark:bg-emerald-500'
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Amount Select Grid */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t('selectAmount')}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[1000, 5000, 10000, 25000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-4 rounded-xl font-display text-lg font-bold border transition-all cursor-pointer ${
                      selectedAmount === amt
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm dark:bg-emerald-500'
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    Rs {amt.toLocaleString(lang === 'ur' ? 'ur-PK' : 'en-US')}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedAmount('custom')}
                  className={`py-4 rounded-xl font-sans text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    selectedAmount === 'custom'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm dark:bg-emerald-500'
                      : 'bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                  }`}
                >
                  {t('customAmount')}
                </button>
              </div>

              {/* Custom amount text input (English/Urdu placeholded) */}
              {selectedAmount === 'custom' && (
                <div className="relative mt-3 animate-fade-in">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs</span>
                  <input
                    type="number"
                    required
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder={t('placeholderCustomAmount')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>

            {/* Fund Selector */}
            <div className="space-y-3">
              <h4 className="font-sans font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t('selectFund')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'general', label: t('fundGeneral'), icon: Landmark },
                  { id: 'expansion', label: t('fundExpansion'), icon: Landmark },
                  { id: 'madrasa', label: t('fundMadrasa'), icon: Heart },
                  { id: 'needy', label: t('fundNeedy'), icon: Heart },
                  { id: 'zakat', label: t('fundZakat'), icon: ShieldCheck }
                ].map((fund) => (
                  <button
                    key={fund.id}
                    onClick={() => setSelectedFund(fund.id)}
                    className={`p-4 rounded-xl font-sans text-xs sm:text-sm font-semibold border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      selectedFund === fund.id
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    <fund.icon className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="truncate">{fund.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Payment Column — no gateway wired up yet, so this is clearly marked
              as a placeholder rather than a working checkout. */}
          <div className="lg:col-span-5 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center gap-3 border-b border-emerald-900 pb-4">
              <Construction className="w-6 h-6 text-amber-300" />
              <div>
                <h4 className="font-display text-lg font-bold">
                  {lang === 'ur' ? 'ادائیگی کا نظام' : 'Payment System'}
                </h4>
                <p className="font-sans text-[10px] text-amber-300 uppercase tracking-widest font-semibold">
                  {lang === 'ur' ? 'جلد آرہا ہے' : 'Coming Soon'}
                </p>
              </div>
            </div>

            <p className="font-sans text-sm text-emerald-100 leading-relaxed">
              {lang === 'ur'
                ? 'ہم ابھی تک ایک محفوظ آن لائن ادائیگی کا نظام نہیں لگا پائے۔ کوئی کارڈ کی تفصیلات یہاں نہ درج کریں۔ نیچے بٹن دبا کر آپ اپنی منتخب کردہ رقم اور فنڈ کا خلاصہ دیکھ سکتے ہیں، اور مسجد سے براہِ راست رابطہ کرنے کی ہدایت ملے گی۔'
                : "We haven't connected a real payment gateway yet, so there's nowhere to safely enter card details. Tap below to confirm your selection — you'll get instructions to donate directly with the masjid instead."}
            </p>

            <form onSubmit={handleDonateSubmit} className="space-y-4">
              <div className="bg-white/5 border border-emerald-800 rounded-xl p-4 space-y-2 font-sans text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-300">{lang === 'ur' ? 'منتخب رقم' : 'Selected amount'}</span>
                  <span className="font-bold">
                    Rs{' '}
                    {(selectedAmount === 'custom'
                      ? parseFloat(customAmount) || 0
                      : selectedAmount
                    ).toLocaleString(lang === 'ur' ? 'ur-PK' : 'en-US')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300">{lang === 'ur' ? 'فنڈ' : 'Fund'}</span>
                  <span className="font-semibold truncate ml-4">{getFundLabel(selectedFund)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-3.5 rounded-xl font-sans font-bold transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>{lang === 'ur' ? 'خلاصہ دیکھیں' : 'Continue'}</span>
              </button>
            </form>
          </div>

        </div>

    </div>
  );
}
