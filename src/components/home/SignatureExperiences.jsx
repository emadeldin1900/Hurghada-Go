import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SIGNATURE_EXPERIENCES } from '../../data/placesData';

export default function SignatureExperiences() {
  const { lang, t } = useLanguage();

  return (
    <section className="bg-white py-20 px-4 sm:px-8 lg:px-16 border-b border-slate-100">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <span className="text-[#f0644b] font-extrabold text-xs sm:text-sm tracking-wider uppercase">
            {t('signaturesEyebrow')}
          </span>
          <h2 className="text-[#032733] text-3xl sm:text-5xl font-extrabold tracking-tight">
            {t('signaturesTitle')}
          </h2>
          <p className="text-[#5d737a] text-base sm:text-lg">
            {t('signaturesSubtitle')}
          </p>
        </div>

        {/* 3 Experiences Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SIGNATURE_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="bg-[#f5efe5]/60 rounded-3xl overflow-hidden border border-[#e9ddcb]/50 flex flex-col justify-between group hover:shadow-xl hover:border-[#f0644b]/30 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 start-4 bg-[#032733]/80 backdrop-blur-md text-cyan-300 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                    {lang === 'ar' ? exp.badgeAr : exp.badgeEn}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <h3 className="text-[#032733] text-xl font-extrabold leading-tight">
                    {lang === 'ar' ? exp.titleAr : exp.titleEn}
                  </h3>
                  <p className="text-[#5d737a] text-sm leading-relaxed">
                    {lang === 'ar' ? exp.descAr : exp.descEn}
                  </p>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-200/60 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-[#07384a] font-bold">
                  <Clock className="w-4 h-4 text-[#29b8b2]" />
                  <span>{lang === 'ar' ? exp.durationAr : exp.durationEn}</span>
                </div>

                <Link
                  to={`/explore?q=${encodeURIComponent(exp.titleEn)}`}
                  className="px-4 py-2 rounded-full bg-white text-[#032733] font-bold text-xs hover:bg-[#f0644b] hover:text-white transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <span>{lang === 'ar' ? 'استكشف التجربة' : 'Explore'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
