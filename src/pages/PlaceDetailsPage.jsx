import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Heart, 
  CalendarDays, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTripPlan } from '../context/TripPlanContext';
import { useAuth } from '../context/AuthContext';
import { PLACES_DATA } from '../data/placesData';
import { bookingsService } from '../services/firebase/placesService';

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const { lang, isRtl } = useLanguage();
  const { isFavorite, toggleFavorite } = useTripPlan();
  const { user } = useAuth();

  const place = PLACES_DATA.find((p) => p.id === id) || PLACES_DATA[0];

  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const favorited = isFavorite(place.id);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!checkIn) {
      alert(lang === 'ar' ? 'يرجى اختيار التاريخ أولاً' : 'Please select a date first');
      return;
    }

    setBookingLoading(true);
    try {
      await bookingsService.createBooking({
        placeId: place.id,
        placeName: place.name,
        date: checkIn,
        guests,
        totalPrice: place.priceValue ? place.priceValue * guests : 1500,
        currency: place.currency || 'EGP',
        userId: user?.uid || 'guest'
      });
      setBookingSuccess(true);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-5 sm:py-8 px-3.5 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      {/* Back Button */}
      <Link
        to="/explore"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#07384a] hover:text-[#f0644b] transition-colors"
      >
        <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
        <span>{lang === 'ar' ? 'العودة إلى الاستكشاف' : 'Back to explore'}</span>
      </Link>

      {/* Main Grid: Details (Col 1-8) & Booking Sidebar (Col 9-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Place Content */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          
          {/* Main Hero Image */}
          <div className="relative h-60 sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md">
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleFavorite(place.id)}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-md ${
                  favorited ? 'bg-[#f0644b] text-white' : 'bg-white/90 text-slate-700 hover:text-[#f0644b]'
                }`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favorited ? 'fill-white' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-3.5 start-3.5 sm:bottom-4 sm:start-4 bg-[#032733]/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20">
              {lang === 'ar' ? place.tagAr : place.tagEn}
            </div>
          </div>

          {/* Place Title & Rating */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#032733] tracking-tight">
                {lang === 'ar' ? place.nameAr : place.name}
              </h1>
              <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-extrabold text-amber-900">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                <span>{place.rating}</span>
                <span className="text-amber-700 font-normal">({place.reviewsCount})</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#5d737a]">
              <MapPin className="w-4 h-4 text-[#29b8b2] shrink-0" />
              <span>{lang === 'ar' ? place.locationAr : place.location}</span>
            </div>
          </div>

          {/* Overview / Description */}
          <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 space-y-3 sm:space-y-4 shadow-2xs">
            <h3 className="text-xl font-bold text-[#032733]">
              {lang === 'ar' ? 'نبذة عن المكان' : 'About this place'}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === 'ar' ? place.descriptionAr : place.description}
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 text-xs text-[#07384a]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'حجز فوري ومؤكد' : 'Instant confirmation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'إلغاء مجاني متاح' : 'Free cancellation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ar' ? 'فريق دعم 24/7' : '24/7 Concierge'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-2xl font-extrabold text-[#032733]">
                  {lang === 'ar' ? place.priceAr : place.priceEn}
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                {lang === 'ar' ? 'أفضل سعر متاح' : 'Best Price Guarantee'}
              </span>
            </div>

            {bookingSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-[#032733] text-base">
                  {lang === 'ar' ? 'تم تأكيد حجزك بنجاح!' : 'Booking Confirmed!'}
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {lang === 'ar' 
                    ? `تم تسجيل حجزك لـ ${place.nameAr} بتاريخ ${checkIn}. تفاصيل الحجز محفوظة في حسابك.`
                    : `Your reservation for ${place.name} on ${checkIn} has been saved.`}
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="w-full py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
                >
                  {lang === 'ar' ? 'حجز موعد آخر' : 'Book another date'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#032733] flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-[#f0644b]" />
                    <span>{lang === 'ar' ? 'تاريخ الحجز / الوصول' : 'Date / Check-in'}</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#f5efe5] text-[#032733] font-medium text-sm p-3 rounded-xl border-none focus:ring-2 focus:ring-[#f0644b]/30"
                  />
                </div>

                {/* Travelers Count */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#032733] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#f0644b]" />
                    <span>{lang === 'ar' ? 'عدد الأفراد' : 'Number of Guests'}</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#f5efe5] text-[#032733] font-medium text-sm p-3 rounded-xl border-none focus:ring-2 focus:ring-[#f0644b]/30"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {lang === 'ar' ? 'أفراد' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-4 rounded-full bg-[#f0644b] hover:bg-[#d94a35] text-white font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  {bookingLoading 
                    ? (lang === 'ar' ? 'جاري التأكيد...' : 'Confirming...') 
                    : (lang === 'ar' ? 'تأكيد الحجز الفوري' : 'Reserve Now')}
                </button>

                <div className="flex flex-col items-center justify-center gap-2 text-xs text-slate-400 text-center pt-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'ar' ? 'دفع آمن ومعتمد بدون أي رسوم خفية' : 'Secure booking · No hidden fees'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span>{lang === 'ar' ? 'طرق الدفع:' : 'Payment:'}</span>
                    <span className="bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/80 font-bold text-slate-700">Visa / MC</span>
                    <span className="bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/80 font-bold text-slate-900 flex items-center gap-0.5">
                       Pay
                    </span>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
