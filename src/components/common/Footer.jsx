import { useState } from 'react';
import { Waves, Mail, MapPin, ArrowUp, PhoneCall, CalendarCheck, LifeBuoy, Store, HelpCircle } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '../SocialIcons';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import SupportModal from './SupportModal';

export default function Footer() {
  const { lang, setLang, t } = useLanguage();
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#032733] text-white pt-10 sm:pt-16 lg:pt-20 pb-24 lg:pb-10 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/15">
          
          {/* Brand & Contacts (Col 1-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-full bg-[#f0644b] flex items-center justify-center text-white shadow-md">
                <Waves className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-tight leading-tight">
                  {t('brandName')}
                </span>
                <span className="text-[#ddf4f1] text-[9px] font-bold tracking-widest uppercase">
                  {t('brandTagline')}
                </span>
              </div>
            </Link>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              {t('footerBrandDesc')}
            </p>

            {/* Official Support Emails */}
            <div className="space-y-2.5 text-xs text-white/90">
              <div className="flex items-center gap-2.5">
                <LifeBuoy className="w-4 h-4 text-[#29b8b2] shrink-0" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-white/60">{lang === 'ar' ? 'الدعم العام:' : 'Support:'}</span>
                  <a href="mailto:support@hurghadago.com" className="hover:text-cyan-300 font-medium underline underline-offset-2">
                    support@hurghadago.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-4 h-4 text-[#29b8b2] shrink-0" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-white/60">{lang === 'ar' ? 'الحجوزات:' : 'Bookings:'}</span>
                  <a href="mailto:bookings@hurghadago.com" className="hover:text-cyan-300 font-medium underline underline-offset-2">
                    bookings@hurghadago.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-[#29b8b2] shrink-0" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-white/60">{lang === 'ar' ? 'الشراكات:' : 'Partners:'}</span>
                  <a href="mailto:partners@hurghadago.com" className="hover:text-cyan-300 font-medium underline underline-offset-2">
                    partners@hurghadago.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-white/70">
                <MapPin className="w-4 h-4 text-[#29b8b2] shrink-0" />
                <span>{lang === 'ar' ? 'الغردقة، ساحل البحر الأحمر، مصر' : 'Hurghada, Red Sea Governorate, Egypt'}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#f0644b] hover:border-[#f0644b] transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#f0644b] hover:border-[#f0644b] transition-all">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#f0644b] hover:border-[#f0644b] transition-all">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[#29b8b2] text-xs font-extrabold uppercase tracking-wider">
              {lang === 'ar' ? 'استكشف الفئات' : 'Categories'}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link to="/explore?cat=hotels" className="hover:text-white transition-colors">{lang === 'ar' ? 'فنادق ومنتجعات فاخرة' : 'Hotels & Resorts'}</Link></li>
              <li><Link to="/explore?cat=restaurants" className="hover:text-white transition-colors">{lang === 'ar' ? 'مطاعم وكافيهات' : 'Restaurants & Cafes'}</Link></li>
              <li><Link to="/explore?cat=chalets" className="hover:text-white transition-colors">{lang === 'ar' ? 'شاليهات وإقامات' : 'Chalets & Stays'}</Link></li>
              <li><Link to="/explore?cat=beaches" className="hover:text-white transition-colors">{lang === 'ar' ? 'شواطئ ونوادي شاطئية' : 'Beaches & Clubs'}</Link></li>
              <li><Link to="/explore?cat=diving" className="hover:text-white transition-colors">{lang === 'ar' ? 'غوص وسنوركلينج' : 'Dive & Snorkel'}</Link></li>
              <li><Link to="/explore?cat=safari" className="hover:text-white transition-colors">{lang === 'ar' ? 'سفاري الصحراء' : 'Desert Safaris'}</Link></li>
            </ul>
          </div>

          {/* Destinations (Col 7-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#29b8b2] text-xs font-extrabold uppercase tracking-wider">
              {lang === 'ar' ? 'أبرز مناطق الغردقة' : 'Top Areas'}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link to="/explore?dest=El+Gouna" className="hover:text-white transition-colors">{lang === 'ar' ? 'الجونة وبحيرات أبو تيج' : 'El Gouna'}</Link></li>
              <li><Link to="/explore?dest=Sahl+Hasheesh" className="hover:text-white transition-colors">{lang === 'ar' ? 'سهل حشيش والكورنيش' : 'Sahl Hasheesh'}</Link></li>
              <li><Link to="/explore?dest=Makadi+Bay" className="hover:text-white transition-colors">{lang === 'ar' ? 'خليج مكادي' : 'Makadi Bay'}</Link></li>
              <li><Link to="/explore?dest=Somabay" className="hover:text-white transition-colors">{lang === 'ar' ? 'شبه جزيرة سوما باي' : 'Soma Bay'}</Link></li>
              <li><Link to="/explore?dest=Marina" className="hover:text-white transition-colors">{lang === 'ar' ? 'مارينا الغردقة الجديدة' : 'Hurghada Marina'}</Link></li>
              <li><Link to="/explore?dest=El+Kawthar" className="hover:text-white transition-colors">{lang === 'ar' ? 'حي الكوثر والممشى' : 'El Kawthar & Mamsha'}</Link></li>
            </ul>
          </div>

          {/* Emergency & Support (Col 9-12) */}
          <div className="lg:col-span-3 space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-rose-300">
              <PhoneCall className="w-4 h-4" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider">
                {lang === 'ar' ? 'طوارئ ودعم السائحين' : '24/7 Traveler Help'}
              </h4>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              {lang === 'ar' 
                ? 'شرطة السياحة: 126 | الإسعاف: 123. مستشفى الغردقة العام وغرف الضغط العالي للغواصين متاحة 24/7.' 
                : 'Tourist Police: 126 | Ambulance: 123. Dive decompression chambers & emergency response 24/7.'}
            </p>

            {/* Direct Emergency Email Link */}
            <div className="pt-1">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                <span className="text-rose-300 block text-[11px] font-bold">
                  {lang === 'ar' ? 'بريد الطوارئ المباشر:' : 'Direct Emergency Email:'}
                </span>
                <a 
                  href="mailto:emergency@hurghadago.com" 
                  className="text-white hover:text-rose-200 font-mono font-bold hover:underline"
                >
                  emergency@hurghadago.com
                </a>
              </div>
            </div>

            {/* Open Support Desk Button */}
            <button
              type="button"
              onClick={() => setSupportModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#29b8b2]/20 hover:bg-[#29b8b2]/30 text-[#ddf4f1] border border-[#29b8b2]/40 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#29b8b2]" />
              <span>{lang === 'ar' ? 'فتح مركز المساعدة والدعم' : 'Open Support Desk'}</span>
            </button>

            {/* Language Pill Switcher */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-[#f0644b] text-white shadow-xs' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('ar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'ar' ? 'bg-[#f0644b] text-white shadow-xs' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>{t('footerCopyright')}</p>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSupportModalOpen(true)} 
              className="hover:underline cursor-pointer text-white/80"
            >
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </button>
            <a href="#privacy" className="hover:underline">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#terms" className="hover:underline">{lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <span>{t('backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Support Modal */}
      <SupportModal 
        isOpen={supportModalOpen} 
        onClose={() => setSupportModalOpen(false)} 
      />
    </footer>
  );
}
