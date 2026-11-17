import { useState } from 'react';
import { 
  X, 
  Mail, 
  PhoneCall, 
  CalendarCheck, 
  ShieldAlert, 
  Store, 
  Copy, 
  Check, 
  ExternalLink,
  LifeBuoy
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SupportModal({ isOpen, onClose }) {
  const { lang } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState('');

  if (!isOpen) return null;

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(''), 2500);
  };

  const supportChannels = [
    {
      id: 'bookings',
      icon: CalendarCheck,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      titleEn: 'Bookings & Reservations',
      titleAr: 'تأكيد الحجوزات وتعديل المواعيد',
      descEn: 'For booking inquiries, rescheduling, cancellations, or custom group tours.',
      descAr: 'لمتابعة حجوزات الفنادق والرحلات، تعديل المواعيد، أو ترتيبات الجروبات الخاصة.',
      email: 'bookings@hurghadago.com',
      badgeEn: 'Response within 1-2 hrs',
      badgeAr: 'رد خلال 1-2 ساعة'
    },
    {
      id: 'general',
      icon: LifeBuoy,
      color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
      titleEn: 'Customer & Technical Support',
      titleAr: 'الدعم الفني وخدمة العملاء',
      descEn: 'For account issues, general feedback, website assistance, and travel tips.',
      descAr: 'للمساعدة في الحساب، الاستفسارات العامة، النصائح السياحية والدعم التقني.',
      email: 'support@hurghadago.com',
      badgeEn: '24/7 Available',
      badgeAr: 'متواجدون 24/7'
    },
    {
      id: 'partners',
      icon: Store,
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      titleEn: 'Business & Venue Partnerships',
      titleAr: 'شراكات الأعمال وأصحاب الأنشطة',
      descEn: 'List your hotel, restaurant, diving center, or safari tours on Hurghada Go.',
      descAr: 'لإدراج فندقك، مطعمك، كافيهك، أو رحلاتك البحرية والسفاري على منصة جو غردقة.',
      email: 'partners@hurghadago.com',
      badgeEn: 'Partner Relations',
      badgeAr: 'إدارة الشراكات'
    },
    {
      id: 'emergency',
      icon: ShieldAlert,
      color: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
      titleEn: '24/7 Emergency & Traveler Assistance',
      titleAr: 'طوارئ ومساعدة السائحين 24/7',
      descEn: 'Urgent issues, lost documents, decompression chamber coordinates, or medical support.',
      descAr: 'للحالات الطارئة، فقدان المتعلقات، غرف الضغط العالي للغواصين، والمساعدة الطبية الفورية.',
      email: 'emergency@hurghadago.com',
      badgeEn: 'Immediate Priority',
      badgeAr: 'أولوية قصوى فورية'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#032733]/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#032733] text-white p-5 sm:p-6 flex items-start justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0644b]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-1.5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#ddf4f1] text-[11px] font-bold border border-white/15">
              <Mail className="w-3.5 h-3.5 text-[#29b8b2]" />
              <span>{lang === 'ar' ? 'فريق الدعم الرسمي' : 'Official Support Desk'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {lang === 'ar' ? 'مركز المساعدة وخدمة العملاء' : 'Help & Customer Support Desk'}
            </h3>
            <p className="text-xs sm:text-sm text-white/75 max-w-md">
              {lang === 'ar'
                ? 'يسعدنا تواصلك دائماً! اختر القسم المناسب لإرسال استفسارك وسيتم الرد عليك في أسرع وقت.'
                : 'We are here to help! Reach out directly to our dedicated desks for quick assistance.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer relative z-10 shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Support Channels List */}
          <div className="grid grid-cols-1 gap-3.5">
            {supportChannels.map((ch) => {
              const Icon = ch.icon;
              const isCopied = copiedEmail === ch.email;
              return (
                <div 
                  key={ch.id}
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/90 hover:border-[#29b8b2]/50 transition-all hover:shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${ch.color} shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-[#032733]">
                          {lang === 'ar' ? ch.titleAr : ch.titleEn}
                        </h4>
                        <p className="text-xs text-[#5d737a] mt-0.5 line-clamp-2">
                          {lang === 'ar' ? ch.descAr : ch.descEn}
                        </p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 shrink-0">
                      {lang === 'ar' ? ch.badgeAr : ch.badgeEn}
                    </span>
                  </div>

                  {/* Email & Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
                    <div className="flex items-center gap-2 font-mono font-bold text-[#07384a]">
                      <Mail className="w-4 h-4 text-[#29b8b2]" />
                      <span>{ch.email}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(ch.email)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors font-medium text-[11px] cursor-pointer"
                        title="Copy Email"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`mailto:${ch.email}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#032733] hover:bg-[#f0644b] text-white transition-colors font-bold text-[11px]"
                      >
                        <span>{lang === 'ar' ? 'مراسلة الآن' : 'Send Email'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergency Hotlines Box */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs uppercase tracking-wider">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>{lang === 'ar' ? 'أرقام الطوارئ السريعة بالبحر الأحمر' : 'Quick Emergency Hotlines'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex flex-col">
                <span className="text-slate-500 text-[10px]">{lang === 'ar' ? 'شرطة السياحة' : 'Tourist Police'}</span>
                <a href="tel:126" className="text-rose-700 font-extrabold text-sm hover:underline">126</a>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex flex-col">
                <span className="text-slate-500 text-[10px]">{lang === 'ar' ? 'الإسعاف المصري' : 'Ambulance'}</span>
                <a href="tel:123" className="text-rose-700 font-extrabold text-sm hover:underline">123</a>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-100 flex flex-col">
                <span className="text-slate-500 text-[10px]">{lang === 'ar' ? 'غرفة عمليات المحافظة' : 'Red Sea Hotline'}</span>
                <a href="tel:+20653400000" className="text-rose-700 font-extrabold text-sm hover:underline">+20 65 340 0000</a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>{lang === 'ar' ? 'الغردقة، محافظة البحر الأحمر، مصر' : 'Hurghada, Red Sea, Egypt'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
