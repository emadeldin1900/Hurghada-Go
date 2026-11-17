import { useState } from 'react';
import { Store, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function PlanAndPartner() {
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20 px-3.5 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
        
        {/* Business Owner Promo (Col 1-7) */}
        <div className="lg:col-span-7 bg-[#032733] rounded-2xl sm:rounded-[32px] p-6 sm:p-12 text-white flex flex-col justify-between space-y-6 sm:space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0644b]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 sm:space-y-4 max-w-lg relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#ddf4f1] text-[11px] sm:text-xs font-bold border border-white/15">
              <Store className="w-3.5 h-3.5 text-[#f0644b]" />
              <span>{t('partnerEyebrow')}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {t('partnerTitle')}
            </h3>

            <p className="text-white/80 text-xs sm:text-base leading-relaxed">
              {t('partnerSubtitle')}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <a
              href="mailto:partners@hurghadago.com"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#f0644b] hover:bg-[#d94a35] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <span>{t('partnerBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:support@hurghadago.com"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              <span>{lang === 'ar' ? 'فريق الدعم: support@hurghadago.com' : 'Support Desk'}</span>
            </a>
          </div>
        </div>

        {/* Newsletter Signup (Col 8-12) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] border border-slate-200/80 rounded-2xl sm:rounded-[32px] p-6 sm:p-10 flex flex-col justify-between space-y-5 sm:space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ddf4f1] text-[#07384a] flex items-center justify-center shadow-2xs">
              <Send className="w-5 h-5 text-[#29b8b2]" />
            </div>

            <h4 className="text-[#032733] text-2xl font-extrabold leading-tight">
              {lang === 'ar' ? 'ابقَ على اطلاع بأسرار البحر الأحمر' : 'Stay ahead of the tides'}
            </h4>

            <p className="text-[#5d737a] text-sm leading-relaxed">
              {lang === 'ar'
                ? 'نشرة أسبوعية خفيفة تضم أفضل الشواطئ غير المزدحمة، وتوقيتات رحلات الدلافين، والعروض الحصرية.'
                : 'A gentle weekly letter with quiet reef spots, seasonal dolphin tides, and newly opened tables.'}
            </p>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'ar' ? 'شكراً لاشتراكك! تفقد بريدك قريباً.' : 'Thank you for subscribing!'}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني...' : 'Enter your email...'}
                  className="w-full bg-white border border-slate-200 text-[#032733] text-sm rounded-full py-3.5 ps-5 pe-14 focus:outline-none focus:ring-2 focus:ring-[#f0644b]/30"
                />
                <button
                  type="submit"
                  className="absolute end-1.5 w-10 h-10 rounded-full bg-[#032733] text-white flex items-center justify-center hover:bg-[#f0644b] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'لا رسائل مزعجة إطلاقاً. يمكنك إلغاء الاشتراك في أي وقت.' : 'No spam. Unsubscribe with one click anytime.'}
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
