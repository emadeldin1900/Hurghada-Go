import { Waves, Mail, MapPin, ArrowUp, PhoneCall } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '../SocialIcons';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { lang, setLang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#032733] text-white pt-16 sm:pt-20 pb-10 border-t border-white/10 select-none">
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

            <div className="space-y-2.5 text-xs text-white/90">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#29b8b2]" />
                <a href="mailto:hello@gohurghada.com" className="hover:underline">
                  hello@gohurghada.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#29b8b2]" />
                <span>Hurghada, Red Sea Governorate, Egypt</span>
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
              {lang === 'ar' ? 'استكشف' : 'Explore'}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link to="/explore?cat=diving" className="hover:text-white transition-colors">{lang === 'ar' ? 'الغوص والسنوركلينج' : 'Dive & snorkel'}</Link></li>
              <li><Link to="/explore?cat=islands" className="hover:text-white transition-colors">{lang === 'ar' ? 'الشواطئ والجزر' : 'Beaches & islands'}</Link></li>
              <li><Link to="/explore?cat=hotels" className="hover:text-white transition-colors">{lang === 'ar' ? 'فنادق ومنتجعات' : 'Hotels & resorts'}</Link></li>
              <li><Link to="/explore?cat=restaurants" className="hover:text-white transition-colors">{lang === 'ar' ? 'مطاعم ومأكولات' : 'Restaurants & dining'}</Link></li>
              <li><Link to="/explore?cat=safari" className="hover:text-white transition-colors">{lang === 'ar' ? 'سفاري الصحراء' : 'Desert safaris'}</Link></li>
            </ul>
          </div>

          {/* Destinations (Col 7-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#29b8b2] text-xs font-extrabold uppercase tracking-wider">
              {lang === 'ar' ? 'أبرز الوجهات' : 'Top Destinations'}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link to="/explore?dest=El+Gouna" className="hover:text-white transition-colors">{lang === 'ar' ? 'الجونة (البندقية المصرية)' : 'El Gouna'}</Link></li>
              <li><Link to="/explore?dest=Sahl+Hasheesh" className="hover:text-white transition-colors">{lang === 'ar' ? 'سهل حشيش والكورنيش' : 'Sahl Hasheesh'}</Link></li>
              <li><Link to="/explore?dest=Makadi+Bay" className="hover:text-white transition-colors">{lang === 'ar' ? 'خليج مكادي' : 'Makadi Bay'}</Link></li>
              <li><Link to="/explore?dest=Giftun+Islands" className="hover:text-white transition-colors">{lang === 'ar' ? 'جزر الجفتون وأورانج باي' : 'Giftun Islands'}</Link></li>
              <li><Link to="/explore?dest=Marina" className="hover:text-white transition-colors">{lang === 'ar' ? 'المارينا الجديدة' : 'Hurghada Marina'}</Link></li>
            </ul>
          </div>

          {/* Emergency & Support (Col 9-12) */}
          <div className="lg:col-span-3 space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-rose-300">
              <PhoneCall className="w-4 h-4" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider">
                {lang === 'ar' ? 'مساعدة الطوارئ والسياحة' : 'Traveler Support'}
              </h4>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              {lang === 'ar' 
                ? 'شرطة السياحة: 126 | الإسعاف: 123. مستشفى الغردقة العام ومراكز الضغط العالي متوفرة 24/7.' 
                : 'Tourist Police: 126 | Ambulance: 123. Hyperbaric dive decompression chambers on 24/7 standby.'}
            </p>

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
            <a href="#privacy" className="hover:underline">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            <a href="#terms" className="hover:underline">{lang === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}</a>
            <a href="#cookies" className="hover:underline">{lang === 'ar' ? 'ملفات تعريف الارتباط' : 'Cookies'}</a>
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
    </footer>
  );
}
