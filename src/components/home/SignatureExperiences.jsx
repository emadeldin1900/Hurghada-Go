import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SIGNATURE_EXPERIENCES } from '../../data/placesData';

export default function SignatureExperiences() {
  const { lang, t } = useLanguage();

  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20 px-3.5 sm:px-8 lg:px-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="space-y-2 sm:space-y-3 text-center max-w-3xl mx-auto">
          <span className="text-[#f0644b] font-extrabold text-[11px] sm:text-sm tracking-wider uppercase">
            {t('signaturesEyebrow')}
          </span>
          <h2 className="text-[#032733] text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {t('signaturesTitle')}
          </h2>
          <p className="text-[#5d737a] text-xs sm:text-base lg:text-lg">
            {t('signaturesSubtitle')}
          </p>
        </div>

        {/* 3 Experiences Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {SIGNATURE_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#f5efe5]/60 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e9ddcb]/50 flex flex-col justify-between group hover:shadow-xl hover:border-[#f0644b]/30 transition-all duration-300"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 start-3.5 sm:top-4 sm:start-4 bg-[#032733]/85 backdrop-blur-md text-cyan-300 text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1 rounded-full border border-white/20">
                    {lang === 'ar' ? exp.badgeAr : exp.badgeEn}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <h3 className="text-[#032733] text-base sm:text-xl font-extrabold leading-tight">
                    {lang === 'ar' ? exp.titleAr : exp.titleEn}
                  </h3>
                  <p className="text-[#5d737a] text-xs sm:text-sm leading-relaxed">
                    {lang === 'ar' ? exp.descAr : exp.descEn}
                  </p>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-2 flex items-center justify-between border-t border-slate-200/60 mt-2 sm:mt-4">
                <div className="flex items-center gap-1.5 text-xs text-[#07384a] font-bold">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#29b8b2]" />
                  <span>{lang === 'ar' ? exp.durationAr : exp.durationEn}</span>
                </div>

                <Link
                  to={`/explore?q=${encodeURIComponent(exp.titleEn)}`}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-[#032733] font-bold text-xs hover:bg-[#f0644b] hover:text-white transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>{lang === 'ar' ? 'استكشف' : 'Explore'}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
