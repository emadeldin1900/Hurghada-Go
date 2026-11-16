import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  BedDouble, 
  Utensils, 
  Waves, 
  Umbrella, 
  Car, 
  MapPin, 
  CalendarDays, 
  Users 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import heroBg from '../../assets/hero-bg.jpg';

export default function DestinationHero() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');

  const tabs = [
    { id: 'all', label: t('searchTabAll'), icon: Search },
    { id: 'hotels', label: t('searchTabHotels'), icon: BedDouble },
    { id: 'restaurants', label: t('searchTabRestaurants'), icon: Utensils },
    { id: 'activities', label: t('searchTabActivities'), icon: Waves },
    { id: 'beaches', label: t('searchTabBeaches'), icon: Umbrella },
    { id: 'safari', label: t('searchTabRentals'), icon: Car },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab !== 'all') params.set('cat', activeTab);
    if (destination) params.set('q', destination);
    if (guests) params.set('guests', guests);
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <div className="relative w-full min-h-[560px] sm:min-h-[640px] lg:min-h-[760px] bg-[#032733] flex flex-col justify-between pt-20 sm:pt-28 pb-8 sm:pb-20 lg:pb-24 px-3.5 sm:px-8 lg:px-16 overflow-hidden">
      
      {/* Background Hero Image & Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src={heroBg} 
          alt="Hurghada Red Sea" 
          className="w-full h-full object-cover object-center scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#032733]/90 via-[#032733]/55 to-[#032733]/85" />
      </div>

      {/* Hero Copy (Top/Middle) */}
      <div className="relative z-10 max-w-4xl space-y-3 sm:space-y-4 pt-3 sm:pt-10">
        
        {/* Cue / Eyebrow */}
        <div className="inline-flex items-center gap-2.5">
          <div className="w-8 h-[2.5px] bg-[#f0644b] rounded-full" />
          <span className="text-white font-extrabold text-[11px] sm:text-sm tracking-wider uppercase drop-shadow-sm">
            {t('heroEyebrow')}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-white text-3xl sm:text-5xl lg:text-[68px] font-extrabold leading-[1.1] tracking-tight drop-shadow-md">
          {t('heroTitle')}
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-xs sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-sm line-clamp-3 sm:line-clamp-none">
          {t('heroSubtitle')}
        </p>
      </div>

      {/* Discovery Search Box */}
      <div className="relative z-20 mt-6 sm:mt-10 w-full max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-[0px_16px_40px_-10px_rgba(3,39,51,0.3)] border border-slate-100">
        
        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer snap-start ${
                  isActive 
                    ? 'bg-[#ddf4f1] text-[#07384a] shadow-2xs' 
                    : 'text-[#5d737a] hover:bg-slate-100 hover:text-[#032733]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-[#07384a]' : 'text-[#5d737a]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Fields Row */}
        <form 
          onSubmit={handleSearch}
          className="mt-2 bg-[#f5efe5]/90 rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 flex flex-col lg:flex-row items-stretch lg:items-center gap-1.5 sm:gap-2"
        >
          {/* Destination */}
          <div className="flex-1 flex items-center gap-2.5 px-3 py-2 sm:py-2.5 bg-white/70 lg:bg-transparent rounded-lg sm:rounded-xl transition-colors focus-within:bg-white">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0644b] shrink-0" />
            <div className="flex flex-col flex-1 text-start">
              <label className="text-[10px] sm:text-[11px] font-extrabold text-[#032733] uppercase tracking-wider">
                {t('searchWhereLabel')}
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={t('searchWherePlaceholder')}
                className="bg-transparent border-none text-[#032733] text-xs sm:text-sm font-medium placeholder:text-[#5d737a] focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="hidden lg:block w-px h-9 bg-[#e9ddcb]" />

          {/* Date */}
          <div className="w-full lg:w-60 flex items-center gap-2.5 px-3 py-2 sm:py-2.5 bg-white/70 lg:bg-transparent rounded-lg sm:rounded-xl transition-colors focus-within:bg-white">
            <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0644b] shrink-0" />
            <div className="flex flex-col flex-1 text-start">
              <label className="text-[10px] sm:text-[11px] font-extrabold text-[#032733] uppercase tracking-wider">
                {t('searchWhenLabel')}
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder={t('searchWhenPlaceholder')}
                className="bg-transparent border-none text-[#032733] text-xs sm:text-sm font-medium placeholder:text-[#5d737a] focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="hidden lg:block w-px h-9 bg-[#e9ddcb]" />

          {/* Guests */}
          <div className="w-full lg:w-48 flex items-center gap-2.5 px-3 py-2 sm:py-2.5 bg-white/70 lg:bg-transparent rounded-lg sm:rounded-xl transition-colors focus-within:bg-white">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0644b] shrink-0" />
            <div className="flex flex-col flex-1 text-start">
              <label className="text-[10px] sm:text-[11px] font-extrabold text-[#032733] uppercase tracking-wider">
                {t('searchGuestsLabel')}
              </label>
              <input
                type="text"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder={t('searchGuestsPlaceholder')}
                className="bg-transparent border-none text-[#032733] text-xs sm:text-sm font-medium placeholder:text-[#5d737a] focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full lg:w-16 h-11 sm:h-12 lg:h-14 rounded-xl bg-[#f0644b] hover:bg-[#d94a35] text-white flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer shrink-0 gap-2 font-bold text-xs sm:text-sm"
            title="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            <span className="lg:hidden">{lang === 'ar' ? 'بحث في الغردقة' : 'Search Hurghada'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
