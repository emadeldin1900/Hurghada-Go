import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Heart, 
  CalendarDays, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck,
  Phone,
  Clock,
  Mail,
  HelpCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTripPlan } from '../context/TripPlanContext';
import { useAuth } from '../context/AuthContext';
import { PLACES_DATA } from '../data/placesData';
import { bookingsService } from '../services/firebase/placesService';
import SupportModal from '../components/common/SupportModal';

export default function PlaceDetailsPage() {
  const { id } = useParams();
  const { lang, isRtl } = useLanguage();
  const { isFavorite, toggleFavorite } = useTripPlan();
  const { user } = useAuth();

  const place = PLACES_DATA.find((p) => p.id === id) || PLACES_DATA[0];

  const [activeImage, setActiveImage] = useState(place?.image || '');
  const [checkIn, setCheckIn] = useState('');
  const [guests, setGuests] = useState(2);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  useEffect(() => {
    if (place) {
      setActiveImage(place.image);
      window.scrollTo(0, 0);
    }
  }, [place, id]);

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

  const cleanPhone = place.phone ? place.phone.replace(/[^0-9+]/g, '') : '+20653400000';

  return (
    <div className="w-full min-h-screen py-5 sm:py-8 px-3.5 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#07384a] hover:text-[#f0644b] transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{lang === 'ar' ? 'العودة إلى الاستكشاف' : 'Back to explore'}</span>
        </Link>

        {/* Quick Concierge Support Button */}
        <button
          type="button"
          onClick={() => setSupportModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-bold transition-all border border-cyan-200 cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
          <span>{lang === 'ar' ? 'مساعدة الحجز والاستفسارات' : 'Booking Inquiries'}</span>
        </button>
      </div>

      {/* Main Grid: Details (Col 1-8) & Booking Sidebar (Col 9-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Place Content */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          
          {/* Main Media Gallery Section */}
          <div className="space-y-3">
            {/* Primary Hero Image */}
            <div className="relative h-64 sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-slate-100">
              <img
                src={activeImage || place.image}
                alt={place.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleFavorite(place.id)}
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-md ${
                    favorited ? 'bg-[#f0644b] text-white' : 'bg-white/90 text-slate-700 hover:text-[#f0644b]'
                  }`}
                  title="Favorite"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${favorited ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Tag / Category Badge */}
              <div className="absolute bottom-3.5 start-3.5 sm:bottom-4 sm:start-4 bg-[#032733]/85 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#29b8b2]" />
                <span>{lang === 'ar' ? place.tagAr : place.tagEn}</span>
              </div>
            </div>

            {/* Thumbnail Gallery Strip (Real Photos) */}
            {place.images && place.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {place.images.map((imgUrl, idx) => {
                  const isSelected = activeImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative h-20 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all cursor-pointer group ${
                        isSelected 
                          ? 'border-[#f0644b] ring-2 ring-[#f0644b]/30 scale-[1.02]' 
                          : 'border-transparent opacity-75 hover:opacity-100 hover:border-slate-300'
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${place.name} - photo ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#f0644b]/15 pointer-events-none" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Place Title, Rating & Sub-badge */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#032733] tracking-tight">
                {lang === 'ar' ? place.nameAr : place.name}
              </h1>
              <div className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-extrabold text-amber-900 shadow-2xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{place.rating}</span>
                <span className="text-amber-700 font-normal">({place.reviewsCount} {lang === 'ar' ? 'تقييم' : 'reviews'})</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#5d737a]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#29b8b2] shrink-0" />
                <span>{lang === 'ar' ? place.locationAr : place.location}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-semibold text-xs">
                {place.subCategory || place.category}
              </span>
            </div>
          </div>

          {/* Overview / Description */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 space-y-4 shadow-2xs">
            <h3 className="text-xl font-bold text-[#032733]">
              {lang === 'ar' ? 'نبذة عن المكان والتجربة' : 'About this place'}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {lang === 'ar' ? place.descriptionAr : place.description}
            </p>

            {/* Tags Badges */}
            {place.tags && place.tags.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {place.tags.map((t, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-full bg-[#f5efe5] text-[#07384a] text-xs font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 text-xs text-[#07384a]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'حجز فوري ومؤكد' : 'Instant confirmation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'إلغاء مجاني متاح' : 'Free cancellation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'ar' ? 'دعم كونسيرج 24/7' : '24/7 Concierge'}</span>
              </div>
            </div>
          </div>

          {/* Venue Details & Practical Info Card */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 space-y-4 shadow-2xs">
            <h3 className="text-lg font-bold text-[#032733] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#f0644b]" />
              <span>{lang === 'ar' ? 'معلومات التواصل وساعات العمل' : 'Venue Information & Contact'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Phone */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 font-bold block">
                    {lang === 'ar' ? 'رقم الهاتف المباشر' : 'Direct Phone / WhatsApp'}
                  </span>
                  <a 
                    href={`tel:${cleanPhone}`} 
                    className="font-mono font-bold text-[#032733] hover:text-[#f0644b] hover:underline"
                  >
                    {place.phone || '+20 65 340 0000'}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 font-bold block">
                    {lang === 'ar' ? 'مواعيد العمل / تسجيل الوصول' : 'Opening Hours / Check-in'}
                  </span>
                  <span className="font-bold text-[#032733]">
                    {lang === 'ar' ? place.openingHoursAr : place.openingHours}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2 p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 font-bold block">
                    {lang === 'ar' ? 'العنوان التفصيلي' : 'Address'}
                  </span>
                  <span className="font-medium text-[#032733]">
                    {lang === 'ar' ? place.addressAr : place.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Booking Widget & Direct Concierge Support */}
        <div className="lg:col-span-4 sticky top-24 space-y-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#032733] block">
                  {lang === 'ar' ? place.priceAr : place.priceEn}
                </span>
                <span className="text-[11px] text-[#5d737a]">
                  {lang === 'ar' ? 'متوسط السعر التقريبي شامل الخدمة' : 'Verified average pricing'}
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
                {lang === 'ar' ? 'سعر مضمون' : 'Best Guarantee'}
              </span>
            </div>

            {bookingSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-extrabold text-[#032733] text-base">
                  {lang === 'ar' ? 'تم تأكيد طلب حجزك بنجاح!' : 'Booking Request Confirmed!'}
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {lang === 'ar' 
                    ? `تم حفظ حجزك لـ ${place.nameAr} بتاريخ ${checkIn}. أرسلنا إشعاراً لفريق الحجوزات، ويمكنك متابعته عبر bookings@hurghadago.com.`
                    : `Your reservation for ${place.name} on ${checkIn} has been recorded. Our team will contact you from bookings@hurghadago.com.`}
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
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
                    className="w-full bg-[#f5efe5] text-[#032733] font-medium text-sm p-3 rounded-xl border-none focus:ring-2 focus:ring-[#f0644b]/30 cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 15].map((num) => (
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
                    <span className="bg-white/80 px-2 py-0.5 rounded-md border border-slate-200/80 font-bold text-slate-900">
                      InstaPay / Cash
                    </span>
                  </div>
                </div>
              </form>
            )}

          </div>

          {/* Dedicated Support Card */}
          <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-slate-200/90 space-y-3">
            <div className="flex items-center gap-2.5 text-[#032733]">
              <div className="w-8 h-8 rounded-full bg-[#29b8b2]/20 flex items-center justify-center text-[#07384a]">
                <Mail className="w-4 h-4 text-[#29b8b2]" />
              </div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider">
                {lang === 'ar' ? 'تحتاج مساعدة خاصة في الحجز؟' : 'Need Booking Help?'}
              </h4>
            </div>

            <p className="text-xs text-[#5d737a] leading-relaxed">
              {lang === 'ar'
                ? 'فريق كونسيرج جو غردقة متواجد لتأكيد الحجوزات الكبيرة وترتيبات النقل والمجموعات:'
                : 'Our concierge desk can assist with custom schedules, VIP yacht charters, and group bookings:'}
            </p>

            <div className="space-y-1.5 text-xs font-medium">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500">{lang === 'ar' ? 'إيميل الحجوزات:' : 'Bookings:'}</span>
                <a href="mailto:bookings@hurghadago.com" className="font-bold text-[#07384a] hover:text-[#f0644b] font-mono">
                  bookings@hurghadago.com
                </a>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                <span className="text-slate-500">{lang === 'ar' ? 'الدعم العام:' : 'Support:'}</span>
                <a href="mailto:support@hurghadago.com" className="font-bold text-[#07384a] hover:text-[#f0644b] font-mono">
                  support@hurghadago.com
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSupportModalOpen(true)}
              className="w-full py-2 rounded-xl bg-white hover:bg-slate-100 text-[#032733] border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'عرض جميع وسائل الدعم والطوارئ' : 'All Support Channels'}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          </div>

        </div>

      </div>

      {/* Support Desk Modal */}
      <SupportModal 
        isOpen={supportModalOpen} 
        onClose={() => setSupportModalOpen(false)} 
      />

    </div>
  );
}
