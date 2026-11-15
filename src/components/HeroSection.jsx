import { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Hotel, 
  UtensilsCrossed, 
  Umbrella, 
  Waves, 
  Sparkles, 
  Car 
} from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

const CONTENT = {
  en: {
    brand: 'GO HURGHADA',
    brandSubtitle: 'YOUR GUIDE TO THE RED SEA',
    location: 'HURGHADA, EGYPT',
    eyebrow: '— THE RED SEA, YOUR WAY',
    headline: 'Discover more than a destination.',
    description: 'Find trusted hotels, local restaurants, sun-lit beaches, world-famed diving and desert safari trips—then shape it all into a personal visit plan.',
    categories: [
      { id: 'hotels', label: 'Hotels', icon: Hotel },
      { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
      { id: 'beaches', label: 'Beaches', icon: Umbrella },
      { id: 'diving', label: 'Diving', icon: Waves },
      { id: 'safari', label: 'Safari trips', icon: Car },
    ],
    planTitle: 'A trip plan created around you',
    planSubtitle: 'Save places, compare days and build your personalized visit plan.',
    claimBtn: '+ Claim',
  },
  ar: {
    brand: 'جو غردقة',
    brandSubtitle: 'دليلك السياحي الشامل للبحر الأحمر',
    location: 'الغردقة، مصر',
    eyebrow: '— البحر الأحمر، على طريقتك الخاصة',
    headline: 'اكتشف ما هو أكثر من مجرد وجهة سفر.',
    description: 'اعثر على أفضل الفنادق، والمطاعم المحلية، والشواطئ الساحرة، ورحلات الغوص العالمية وسفاري الصحراء—وصمّم خطة رحلتك الشخصية بكل سهولة.',
    categories: [
      { id: 'hotels', label: 'فنادق', icon: Hotel },
      { id: 'restaurants', label: 'مطاعم', icon: UtensilsCrossed },
      { id: 'beaches', label: 'شواطئ', icon: Umbrella },
      { id: 'diving', label: 'غوص', icon: Waves },
      { id: 'safari', label: 'سفاري', icon: Car },
    ],
    planTitle: 'خطة رحلة مصممة خصيصاً لك',
    planSubtitle: 'احفظ أماكنك المفضلة، ونظّم أيامك، وابنِ برنامج زيارتك المخصص.',
    claimBtn: '+ ابدأ الآن',
  }
};

export default function HeroSection({ lang = 'en' }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const t = CONTENT[lang] || CONTENT.en;

  return (
    <div className="relative w-full h-full min-h-[560px] lg:min-h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-10 select-none">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hurghada Red Sea coastline" 
          className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/35 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />
      </div>

      <header className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105">
            <Compass className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-white text-sm font-extrabold tracking-wider leading-tight drop-shadow-xs">
              {t.brand}
            </h1>
            <p className="text-white/80 text-[9px] font-semibold tracking-widest uppercase drop-shadow-xs">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
          <span>{t.location}</span>
        </div>
      </header>

      <div className="relative z-10 mt-auto pt-16 flex flex-col gap-5">
        <div className="space-y-2.5 max-w-xl">
          <div className="inline-flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider drop-shadow-xs">
            <span>{t.eyebrow}</span>
          </div>

          <h2 className="text-white text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-[1.15] tracking-tight drop-shadow-md">
            {t.headline}
          </h2>

          <p className="text-white/85 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed max-w-lg drop-shadow-xs">
            {t.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {t.categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className={`group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-white text-slate-900 border-white shadow-md' 
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/25 hover:border-white/40 shadow-xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-700' : 'text-white/90 group-hover:scale-110'} transition-transform`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-2 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-white/50 flex items-center justify-between gap-3 text-slate-900 transition-transform duration-300 hover:translate-y-[-2px]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-orange-100/90 text-orange-600 flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="truncate">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {t.planTitle}
              </h3>
              <p className="text-[11px] text-slate-500 truncate">
                {t.planSubtitle}
              </p>
            </div>
          </div>

          <button 
            type="button"
            className="shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
          >
            {t.claimBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
