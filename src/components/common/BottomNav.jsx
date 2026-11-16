import { NavLink } from 'react-router-dom';
import { Compass, Sparkles, Heart, User, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTripPlan } from '../../context/TripPlanContext';
import { useAuth } from '../../context/AuthContext';

export default function BottomNav() {
  const { lang } = useLanguage();
  const { favoritesCount } = useTripPlan();
  const { user } = useAuth();

  const navItems = [
    {
      to: '/',
      icon: Home,
      label: lang === 'ar' ? 'الرئيسية' : 'Home',
      exact: true,
    },
    {
      to: '/explore',
      icon: Compass,
      label: lang === 'ar' ? 'استكشف' : 'Explore',
    },
    {
      to: '/ai-planner',
      icon: Sparkles,
      label: lang === 'ar' ? 'المساعد الذكي' : 'AI Planner',
      highlight: true,
    },
    {
      to: '/saved',
      icon: Heart,
      label: lang === 'ar' ? 'المحفوظات' : 'Saved',
      badge: favoritesCount > 0 ? favoritesCount : null,
    },
    {
      to: user ? '/profile' : '/auth',
      icon: User,
      label: user 
        ? (lang === 'ar' ? 'حسابي' : 'Profile') 
        : (lang === 'ar' ? 'دخول' : 'Sign In'),
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_24px_rgba(3,39,51,0.08)] px-2 pt-1.5 pb-safe transition-transform duration-200"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)' }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 select-none ${
                  isActive
                    ? item.highlight
                      ? 'text-[#f0644b]'
                      : 'text-[#07384a]'
                    : 'text-slate-400 hover:text-slate-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? item.highlight
                          ? 'bg-[#f0644b]/10 scale-105'
                          : 'bg-[#ddf4f1]/80 scale-105'
                        : ''
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'
                      } ${item.highlight && isActive ? 'text-[#f0644b]' : ''}`}
                    />

                    {/* Notification badge for favorites */}
                    {item.badge && (
                      <span className="absolute -top-1 -end-1 min-w-4 h-4 px-1 rounded-full bg-[#f0644b] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                        {item.badge}
                      </span>
                    )}

                    {/* AI Sparkle glow indicator */}
                    {item.highlight && (
                      <span className="absolute -top-0.5 -end-0.5 w-2 h-2 rounded-full bg-[#f0644b] animate-pulse" />
                    )}
                  </div>

                  <span
                    className={`text-[10px] tracking-tight mt-0.5 transition-all ${
                      isActive
                        ? 'font-extrabold text-[#032733]'
                        : 'font-medium text-slate-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
