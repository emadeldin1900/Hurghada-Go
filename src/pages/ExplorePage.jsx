import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Star, 
  MapPin, 
  Heart, 
  ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTripPlan } from '../context/TripPlanContext';
import { PLACES_DATA, CATEGORIES_DATA } from '../data/placesData';

export default function ExplorePage() {
  const { lang } = useLanguage();
  const { isFavorite, toggleFavorite } = useTripPlan();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';
  const searchDestination = searchParams.get('dest') || '';

  const [localQuery, setLocalQuery] = useState(searchQuery);

  const categories = [
    { id: 'all', nameEn: 'All Categories', nameAr: 'جميع التصنيفات' },
    ...CATEGORIES_DATA.map(c => ({ id: c.slug, nameEn: c.nameEn, nameAr: c.nameAr }))
  ];

  const filteredPlaces = useMemo(() => {
    return PLACES_DATA.filter((place) => {
      const matchCat = activeCategory === 'all' || place.category.toLowerCase() === activeCategory.toLowerCase();
      const matchQuery = !localQuery || 
        place.name.toLowerCase().includes(localQuery.toLowerCase()) ||
        place.nameAr.includes(localQuery) ||
        place.description.toLowerCase().includes(localQuery.toLowerCase()) ||
        place.descriptionAr.includes(localQuery);
      const matchDest = !searchDestination ||
        place.location.toLowerCase().includes(searchDestination.toLowerCase()) ||
        place.locationAr.includes(searchDestination);

      return matchCat && matchQuery && matchDest;
    });
  }, [activeCategory, localQuery, searchDestination]);

  const handleCategoryChange = (slug) => {
    const next = new URLSearchParams(searchParams);
    if (slug === 'all') {
      next.delete('cat');
    } else {
      next.set('cat', slug);
    }
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (localQuery) {
      next.set('q', localQuery);
    } else {
      next.delete('q');
    }
    setSearchParams(next);
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#032733] tracking-tight">
          {lang === 'ar' ? 'استكشف معالم وتجارب الغردقة' : 'Explore Hurghada & Red Sea'}
        </h1>
        <p className="text-[#5d737a] text-base sm:text-lg">
          {lang === 'ar'
            ? 'تصفح أفضل الفنادق، ومواقع الغوص العالمية، والمطاعم والأنشطة المختارة بعناية.'
            : 'Browse verified hotels, premier dive reefs, authentic dining, and desert adventures.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute start-4" />
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث بالاسم أو المكان أو النشاط...' : 'Search by name, vibe, or keyword...'}
            className="w-full bg-[#FAF8F5] text-[#032733] text-sm rounded-2xl py-3.5 ps-12 pe-28 focus:outline-none focus:ring-2 focus:ring-[#f0644b]/30 font-medium"
          />
          <button
            type="submit"
            className="absolute end-2 px-5 py-2 bg-[#032733] hover:bg-[#f0644b] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'بحث' : 'Search'}
          </button>
        </form>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active 
                    ? 'bg-[#032733] text-white shadow-xs' 
                    : 'bg-[#f5efe5] text-[#07384a] hover:bg-slate-200/80'
                }`}
              >
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </button>
            );
          })}
        </div>

      </div>

      {/* Active Filter Indicators */}
      {(searchDestination || activeCategory !== 'all' || searchQuery) && (
        <div className="flex items-center gap-2 text-xs text-[#5d737a] flex-wrap">
          <span className="font-bold">{lang === 'ar' ? 'التصفية النشطة:' : 'Active filters:'}</span>
          {activeCategory !== 'all' && (
            <span className="bg-[#ddf4f1] text-[#07384a] px-3 py-1 rounded-full font-semibold">
              Category: {activeCategory}
            </span>
          )}
          {searchDestination && (
            <span className="bg-[#ddf4f1] text-[#07384a] px-3 py-1 rounded-full font-semibold">
              Location: {searchDestination}
            </span>
          )}
          {searchQuery && (
            <span className="bg-[#ddf4f1] text-[#07384a] px-3 py-1 rounded-full font-semibold">
              Query: "{searchQuery}"
            </span>
          )}
          <button
            onClick={() => setSearchParams({})}
            className="text-rose-500 hover:underline font-bold ms-2 cursor-pointer"
          >
            {lang === 'ar' ? 'إعادة ضبط' : 'Clear all'}
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-bold text-[#5d737a]">
        <span>
          {lang === 'ar' 
            ? `تم العثور على ${filteredPlaces.length} مكان` 
            : `Showing ${filteredPlaces.length} places`}
        </span>
      </div>

      {/* Places Grid */}
      {filteredPlaces.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200/80 p-8">
          <p className="text-[#032733] text-lg font-bold">
            {lang === 'ar' ? 'لم يتم العثور على نتائج مطابقة' : 'No places found matching your criteria.'}
          </p>
          <p className="text-[#5d737a] text-sm">
            {lang === 'ar' ? 'جرّب البحث بكلمة أخرى أو تصفح كل التصنيفات.' : 'Try adjusting your search terms or clearing your category filters.'}
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="px-6 py-2.5 bg-[#f0644b] text-white rounded-full text-xs font-bold cursor-pointer"
          >
            {lang === 'ar' ? 'عرض كل الأماكن' : 'View all places'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPlaces.map((place) => {
            const favorited = isFavorite(place.id);
            return (
              <div
                key={place.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-200/70 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Media */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => toggleFavorite(place.id)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-md ${
                      favorited 
                        ? 'bg-[#f0644b] text-white' 
                        : 'bg-white/90 text-slate-700 hover:text-[#f0644b]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorited ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#ddf4f1] text-[#07384a] text-xs font-bold px-3 py-1 rounded-full">
                        {lang === 'ar' ? place.tagAr : place.tagEn}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-[#032733] font-bold">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{place.rating}</span>
                        <span className="text-[#5d737a] font-normal">({place.reviewsCount})</span>
                      </div>
                    </div>

                    <Link to={`/place/${place.id}`}>
                      <h3 className="text-[#032733] text-xl font-extrabold hover:text-[#f0644b] transition-colors leading-tight">
                        {lang === 'ar' ? place.nameAr : place.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs text-[#5d737a]">
                      <MapPin className="w-4 h-4 text-[#29b8b2] shrink-0" />
                      <span className="truncate">{lang === 'ar' ? place.locationAr : place.location}</span>
                    </div>

                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                      {lang === 'ar' ? place.descriptionAr : place.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[#07384a] font-extrabold text-sm">
                      {lang === 'ar' ? place.priceAr : place.priceEn}
                    </span>
                    <Link
                      to={`/place/${place.id}`}
                      className="px-4 py-2 rounded-full bg-[#f5efe5] hover:bg-[#f0644b] text-[#032733] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <span>{lang === 'ar' ? 'التفاصيل والحجز' : 'Details & Book'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
