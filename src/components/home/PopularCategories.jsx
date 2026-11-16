import { Link } from 'react-router-dom';
import { BadgeCheck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CATEGORIES_DATA } from '../../data/placesData';

export default function PopularCategories() {
  const { lang, t } = useLanguage();

  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
        
        {/* Section Intro Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[#f0644b] font-extrabold text-[11px] sm:text-sm tracking-wider uppercase">
              {t('categoriesEyebrow')}
            </span>
            <h2 className="text-[#032733] text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t('categoriesTitle')}
            </h2>
          </div>

          {/* Local Proof Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 bg-[#ddf4f1]/60 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border border-[#ddf4f1]">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ddf4f1] flex items-center justify-center text-[#07384a] shrink-0">
              <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
            </div>
            <p className="text-[#5d737a] text-xs sm:text-sm font-medium max-w-xs leading-snug">
              {t('categoriesProof')}
            </p>
          </div>
        </div>

        {/* 6 Category Cards: Swipeable on mobile, Grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              to={`/explore?cat=${cat.slug}`}
              className="group relative w-36 sm:w-auto h-44 sm:h-52 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-end p-3.5 sm:p-4 shrink-0 sm:shrink snap-start transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-lg"
            >
              {/* Image */}
              <img 
                src={cat.image} 
                alt={cat.nameEn} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Scrim Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#032733]/90 via-[#032733]/40 to-transparent" />

              {/* Card Details */}
              <div className="relative z-10 flex items-end justify-between gap-1.5">
                <div className="overflow-hidden">
                  <h3 className="text-white font-bold text-xs sm:text-base leading-tight truncate">
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </h3>
                  <span className="text-white/80 text-[10px] sm:text-xs">
                    {lang === 'ar' ? cat.countAr : cat.countEn}
                  </span>
                </div>

                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 text-[#032733] flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-110 group-hover:bg-[#f0644b] group-hover:text-white">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
