import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, ArrowRight, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTripPlan } from '../context/TripPlanContext';
import { PLACES_DATA } from '../data/placesData';

export default function SavedPlacesPage() {
  const { lang } = useLanguage();
  const { favorites, toggleFavorite } = useTripPlan();

  const savedList = PLACES_DATA.filter((p) => favorites.includes(p.id));

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#032733] tracking-tight">
          {lang === 'ar' ? 'الأماكن المحفوظة' : 'Saved Places'}
        </h1>
        <p className="text-[#5d737a] text-sm sm:text-base">
          {lang === 'ar'
            ? 'قائمتك الشخصية من الفنادق والمطاعم والشواطئ المفضلة.'
            : 'Your personal collection of favorite stays, tables, and reefs.'}
        </p>
      </div>

      {savedList.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200/80 p-8 max-w-md mx-auto">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#032733]">
            {lang === 'ar' ? 'لا توجد أماكن محفوظة حالياً' : 'No saved places yet'}
          </h3>
          <p className="text-xs text-[#5d737a]">
            {lang === 'ar'
              ? 'اضغط على أيقونة القلب على أي فندق أو رحلة لحفظها هنا والعودة إليها لاحقاً.'
              : 'Click the heart icon on any stay, reef or tour to save it for your trip.'}
          </p>
          <Link
            to="/explore"
            className="inline-block px-6 py-2.5 bg-[#f0644b] text-white rounded-full text-xs font-bold"
          >
            {lang === 'ar' ? 'تصفح الأماكن' : 'Explore Places'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedList.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => toggleFavorite(place.id)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-xs cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#ddf4f1] text-[#07384a] text-xs font-bold px-3 py-1 rounded-full">
                      {lang === 'ar' ? place.tagAr : place.tagEn}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#032733] font-bold">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{place.rating}</span>
                    </div>
                  </div>

                  <Link to={`/place/${place.id}`}>
                    <h3 className="text-xl font-bold text-[#032733] hover:text-[#f0644b] transition-colors">
                      {lang === 'ar' ? place.nameAr : place.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5 text-xs text-[#5d737a]">
                    <MapPin className="w-4 h-4 text-[#29b8b2] shrink-0" />
                    <span>{lang === 'ar' ? place.locationAr : place.location}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-[#07384a]">
                  {lang === 'ar' ? place.priceAr : place.priceEn}
                </span>
                <Link
                  to={`/place/${place.id}`}
                  className="px-4 py-2 bg-[#f5efe5] hover:bg-[#f0644b] text-[#032733] hover:text-white rounded-full text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>{lang === 'ar' ? 'عرض المكان' : 'View'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
