import React, { useState } from 'react';
import { translations } from '../translations';
import { Language } from '../types';
import { Heart, CreditCard, CheckCircle2, ShieldCheck, Landmark, Receipt, Download, X } from 'lucide-react';

interface DonateSectionProps {
  lang: Language;
}

export default function DonateSection({ lang }: DonateSectionProps) {
  const t = (key: keyof typeof translations['en']) => translations[lang][key];

  // Donation State
  const [frequency, setFrequency] = useState<'oneTime' | 'monthly' | 'weekly'>('oneTime');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedFund, setSelectedFund] = useState('general');

  // Payment Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Success Receipt State
  const [receipt, setReceipt] = useState<{
    id: string;
    amount: number;
    fund: string;
    frequency: string;
    date: string;
    taxId: string;
  } | null>(null);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) return;

    const finalAmount = selectedAmount === 'custom' ? parseFloat(customAmount) : selectedAmount;
    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert(lang === 'ur' ? 'برائے مہربانی درست رقم درج کریں۔' : 'Please select or enter a valid donation amount.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setReceipt({
        id: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: finalAmount,
        fund: selectedFund,
        frequency: frequency,
        date: new Date().toLocaleDateString(lang === 'ur' ? 'ur-PK' : 'en-US'),
        taxId: 'TAX-94-3019283'
      });
    }, 1500);
  };

  const closeReceipt = () => {
    setReceipt(null);
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setCustomAmount('');
    setSelectedAmount(50);
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

      {receipt ? (
        /* Animated Beautiful Secure Donation Receipt */
        <div className="bg-white dark:bg-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-xl max-w-xl mx-auto text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-emerald-950 dark:text-emerald-400">
              {t('donationSuccess')}
            </h3>
            <p className="font-sans text-sm text-slate-600 dark:text-slate-300 px-4">
              {t('donationSuccessDesc')}
            </p>
          </div>

          {/* Secure Receipt layout */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-950 p-6 space-y-4 text-left font-sans text-xs sm:text-sm">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest text-xs flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-amber-500" />
                {lang === 'ur' ? 'رسید' : 'Transaction Receipt'}
              </span>
              <span className="font-mono text-slate-400">{receipt.id}</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'ur' ? 'رقم' : 'Donation Amount'}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 text-lg">
                  ${receipt.amount.toFixed(2)} USD
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'ur' ? 'عطیہ کی قسم' : 'Frequency'}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {receipt.frequency === 'oneTime' ? t('oneTime') : receipt.frequency === 'monthly' ? t('monthly') : t('weekly')}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'ur' ? 'پروجیکٹ' : 'Fund / Project'}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 line-clamp-1">
                  {getFundLabel(receipt.fund)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'ur' ? 'تاریخ' : 'Date'}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{receipt.date}</span>
              </div>

              <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-3">
                <span className="text-slate-400">{t('taxDeductible')}</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{receipt.taxId}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                alert(lang === 'ur' ? 'رسید پی ڈی ایف ڈاؤن لوڈ سمیولیٹ کی گئی ہے!' : 'Receipt PDF Download simulated!');
              }}
              className="flex-grow bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>{t('downloadReceipt')}</span>
            </button>
            <button
              onClick={closeReceipt}
              className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-sans font-semibold py-3 px-6 rounded-xl transition-all"
            >
              {lang === 'ur' ? 'بند کریں' : 'Close'}
            </button>
          </div>
        </div>
      ) : (
        /* Regular Donation Checkout Flow */
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
                {[10, 50, 100, 250].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-4 rounded-xl font-display text-lg font-bold border transition-all cursor-pointer ${
                      selectedAmount === amt
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm dark:bg-emerald-500'
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    ${amt}
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    required
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder={t('placeholderCustomAmount')}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-sm py-3 pl-8 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

          {/* Secure Payment Column */}
          <div className="lg:col-span-5 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 border-b border-emerald-900 pb-4">
              <CreditCard className="w-6 h-6 text-amber-300" />
              <div>
                <h4 className="font-display text-lg font-bold">
                  {t('paymentDetails')}
                </h4>
                <p className="font-sans text-[10px] text-emerald-300 uppercase tracking-widest font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {lang === 'ur' ? 'محفوظ ۲۵۶ بٹ ایس ایس ایل انکرپشن' : 'SECURE 256-BIT SSL CHECKOUT'}
                </p>
              </div>
            </div>

            <form onSubmit={handleDonateSubmit} className="space-y-4">
              <div>
                <label className="block font-sans font-semibold text-[10px] uppercase tracking-wider mb-2 text-emerald-200">
                  {t('cardholderName')}
                </label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder={t('placeholderCardName')}
                  className="w-full bg-white/5 border border-emerald-800 focus:border-amber-300 text-sm py-3 px-4 rounded-xl text-white placeholder-emerald-600/60 focus:outline-none focus:ring-1 focus:ring-amber-300"
                />
              </div>

              <div>
                <label className="block font-sans font-semibold text-[10px] uppercase tracking-wider mb-2 text-emerald-200">
                  {t('cardNumber')}
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder={t('placeholderCardNum')}
                  className="w-full bg-white/5 border border-emerald-800 focus:border-amber-300 text-sm py-3 px-4 rounded-xl text-white placeholder-emerald-600/60 focus:outline-none focus:ring-1 focus:ring-amber-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans font-semibold text-[10px] uppercase tracking-wider mb-2 text-emerald-200">
                    {t('expiryDate')}
                  </label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder={t('placeholderExpiry')}
                    className="w-full bg-white/5 border border-emerald-800 focus:border-amber-300 text-sm py-3 px-4 rounded-xl text-white placeholder-emerald-600/60 focus:outline-none focus:ring-1 focus:ring-amber-300 text-center"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-[10px] uppercase tracking-wider mb-2 text-emerald-200">
                    {t('cvv')}
                  </label>
                  <input
                    type="password"
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder={t('placeholderCvv')}
                    className="w-full bg-white/5 border border-emerald-800 focus:border-amber-300 text-sm py-3 px-4 rounded-xl text-white placeholder-emerald-600/60 focus:outline-none focus:ring-1 focus:ring-amber-300 text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 py-3.5 rounded-xl font-sans font-bold transition-all active:scale-95 shadow-lg mt-4 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>{isProcessing ? t('submitting') : t('processDonation')}</span>
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
