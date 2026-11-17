import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTripPlan } from '../../context/TripPlanContext';
import { PLACES_DATA } from '../../data/placesData';

export default function FeaturedPlaces() {
  const { lang, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useTripPlan();

  const featured = PLACES_DATA.filter(p => p.featured).slice(0, 6);

  return (
    <section className="bg-[#f5efe5] py-10 sm:py-16 lg:py-20 px-3.5 sm:px-8 lg:px-16 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <span className="text-[#f0644b] font-extrabold text-[11px] sm:text-sm tracking-wider uppercase">
              {t('featuredEyebrow')}
            </span>
            <h2 className="text-[#032733] text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]">
              {t('featuredTitle')}
            </h2>
            <p className="text-[#5d737a] text-xs sm:text-base lg:text-lg">
              {t('featuredSubtitle')}
            </p>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-1.5 sm:gap-2 text-[#07384a] font-bold text-xs sm:text-sm hover:text-[#f0644b] transition-colors group pb-1"
          >
            <span>{t('seeAllPlaces')}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3 Places Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {featured.map((place) => {
            const favorited = isFavorite(place.id);
            return (
              <div
                key={place.id}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0px_8px_24px_-6px_rgba(3,39,51,0.1)] flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-100"
              >
                {/* Media Image */}
                <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(place.id);
                    }}
                    className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-md ${
                      favorited 
                        ? 'bg-[#f0644b] text-white' 
                        : 'bg-white/90 text-slate-700 hover:text-[#f0644b]'
                    }`}
                    title="Save to favorites"
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favorited ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between gap-3 sm:gap-4">
                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Tag & Rating */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#ddf4f1] text-[#07384a] text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        {lang === 'ar' ? place.tagAr : place.tagEn}
                      </span>
                      <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-[#032733] font-bold">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                        <span>{place.rating}</span>
                        <span className="text-[#5d737a] font-normal">({place.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Place Name */}
                    <Link to={`/place/${place.id}`}>
                      <h3 className="text-[#032733] text-base sm:text-xl font-extrabold hover:text-[#f0644b] transition-colors leading-tight">
                        {lang === 'ar' ? place.nameAr : place.name}
                      </h3>
                    </Link>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-[#5d737a]">
                      <MapPin className="w-3.5 h-3.5 text-[#29b8b2] shrink-0" />
                      <span className="truncate">{lang === 'ar' ? place.locationAr : place.location}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[#07384a] font-extrabold text-xs sm:text-sm">
                      {lang === 'ar' ? place.priceAr : place.priceEn}
                    </span>
                    <Link
                      to={`/place/${place.id}`}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f5efe5] text-[#032733] flex items-center justify-center hover:bg-[#f0644b] hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
