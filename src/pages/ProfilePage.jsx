import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Calendar, 
  Heart, 
  CheckCircle2, 
  LogOut 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTripPlan } from '../context/TripPlanContext';
import { bookingsService } from '../services/firebase/placesService';

export default function ProfilePage() {
  const { lang, t } = useLanguage();
  const { user, logout } = useAuth();
  const { favoritesCount } = useTripPlan();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadBookings() {
      try {
        const list = await bookingsService.getUserBookings(user?.uid);
        setBookings(list);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, [user]);

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-10">
      
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start">
          <div className="w-20 h-20 rounded-full bg-[#f0644b] text-white flex items-center justify-center text-3xl font-extrabold shadow-md overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              (user?.displayName?.[0] || user?.email?.[0] || 'U').toUpperCase()
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#032733]">
              {user?.displayName || (lang === 'ar' ? 'مسافر البحر الأحمر' : 'Red Sea Traveler')}
            </h1>
            <p className="text-[#5d737a] text-sm flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-4 h-4 text-[#29b8b2]" />
              <span>{user?.email || user?.phoneNumber || 'traveler@gohurghada.com'}</span>
            </p>
            <span className="inline-block mt-2 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full">
              {lang === 'ar' ? 'حساب نشط ومؤكد' : 'Verified Member'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/saved"
            className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#ddf4f1] text-[#07384a] rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-200"
          >
            <Heart className="w-4 h-4 text-[#f0644b]" />
            <span>{lang === 'ar' ? `المحفوظات (${favoritesCount})` : `Favorites (${favoritesCount})`}</span>
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('signOut')}</span>
          </button>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-[#032733]">
            {lang === 'ar' ? 'حجوزاتي ورحلاتي القادمة' : 'My Reservations & Bookings'}
          </h2>
          <span className="text-xs text-[#5d737a] font-bold">
            {bookings.length} {lang === 'ar' ? 'حجوزات' : 'items'}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center space-y-4 border border-slate-200/80">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#032733]">
              {lang === 'ar' ? 'لا توجد حجوزات نشطة حالياً' : 'No active reservations yet'}
            </h3>
            <p className="text-xs text-[#5d737a] max-w-sm mx-auto">
              {lang === 'ar'
                ? 'استكشف الفنادق والجولات السياحية واحجز موعدك المفضل بكل سهولة.'
                : 'Browse our curated stays and island boat trips to book your next adventure.'}
            </p>
            <Link
              to="/explore"
              className="inline-block px-6 py-2.5 bg-[#f0644b] text-white rounded-full text-xs font-bold"
            >
              {lang === 'ar' ? 'استكشف الوجهات' : 'Explore Stays & Tours'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-[#07384a] bg-[#ddf4f1] px-3 py-1 rounded-full">
                    {booking.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'مؤكد' : 'Confirmed'}</span>
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-extrabold text-[#032733]">
                    {booking.placeName}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[#5d737a]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#f0644b]" />
                      {booking.date}
                    </span>
                    <span>·</span>
                    <span>{booking.guests} {lang === 'ar' ? 'أفراد' : 'Guests'}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                  <span className="text-slate-500">{lang === 'ar' ? 'الإجمالي:' : 'Total:'}</span>
                  <span className="font-extrabold text-base text-[#032733]">
                    {booking.totalPrice?.toLocaleString()} {booking.currency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
