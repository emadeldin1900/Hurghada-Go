import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TRAVELER_REVIEWS } from '../../data/placesData';

export default function TravelerReviews() {
  const { lang, t } = useLanguage();

  return (
    <section className="bg-[#FAF8F5] py-10 sm:py-16 lg:py-20 px-3.5 sm:px-8 lg:px-16 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="space-y-1.5 sm:space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-[#f0644b] font-extrabold text-[11px] sm:text-sm tracking-wider uppercase">
            {t('reviewsEyebrow')}
          </span>
          <h2 className="text-[#032733] text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t('reviewsTitle')}
          </h2>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {TRAVELER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs border border-slate-100 flex flex-col justify-between space-y-4 sm:space-y-5 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#ddf4f1] rotate-180" />
                </div>

                {/* Review Text */}
                <h4 className="text-[#032733] font-bold text-base leading-snug">
                  "{lang === 'ar' ? rev.titleAr : rev.titleEn}"
                </h4>
                <p className="text-[#5d737a] text-sm leading-relaxed">
                  {lang === 'ar' ? rev.commentAr : rev.commentEn}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h5 className="text-[#032733] font-bold text-sm leading-tight">{rev.author}</h5>
                  <p className="text-[#5d737a] text-xs">{rev.origin} · {rev.date}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
