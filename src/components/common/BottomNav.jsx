import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Sparkles, Heart, User, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTripPlan } from '../../context/TripPlanContext';
import { useAuth } from '../../context/AuthContext';

export default function BottomNav() {
  const { lang } = useLanguage();
  const { favoritesCount } = useTripPlan();
  const { user } = useAuth();

  // Scroll detection to hide on scroll down, show on scroll up
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near the top of the page
      if (currentScrollY < 60) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        // Scrolling down -> hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        // Scrolling up -> show
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      label: lang === 'ar' ? 'المساعد' : 'Planner',
      highlight: true,
    },
    {
      to: '/saved',
      icon: Heart,
      label: lang === 'ar' ? 'المفضلة' : 'Saved',
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
    <div
      aria-label="Mobile Navigation Dock"
      className={`lg:hidden fixed bottom-4 inset-x-3 sm:inset-x-8 z-50 max-w-md mx-auto transition-all duration-300 ease-out select-none ${
        visible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-24 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <nav className="relative bg-[#032733]/92 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.45)] rounded-full px-2 py-1.5 flex items-center justify-around ring-1 ring-white/10">
        
        {/* Subtle animated background glow behind AI button */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none" />

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 active:scale-85 ${
                  isActive
                    ? item.highlight
                      ? 'text-white'
                      : 'text-cyan-300'
                    : 'text-white/60 hover:text-white/90'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active highlight pill background */}
                  {isActive && (
                    <span 
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        item.highlight
                          ? 'bg-gradient-to-r from-[#f0644b] to-[#ff7a63] shadow-[0_4px_16px_rgba(240,100,75,0.5)]'
                          : 'bg-white/15 shadow-inner'
                      }`} 
                    />
                  )}

                  {/* Icon container */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative">
                      <Icon
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isActive 
                            ? 'scale-110 stroke-[2.5]' 
                            : 'stroke-[1.8] hover:scale-105'
                        }`}
                      />

                      {/* Favorites Notification Badge */}
                      {item.badge && (
                        <span className="absolute -top-1 -end-2 min-w-4 h-4 px-1 rounded-full bg-[#f0644b] text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs animate-pulse">
                          {item.badge}
                        </span>
                      )}

                      {/* AI Sparkle pulse */}
                      {item.highlight && !isActive && (
                        <span className="absolute -top-0.5 -end-0.5 w-2 h-2 rounded-full bg-[#f0644b] animate-ping" />
                      )}
                    </div>

                    {/* Compact Label */}
                    <span
                      className={`text-[10px] tracking-tight mt-0.5 transition-all duration-200 ${
                        isActive
                          ? 'font-bold text-white scale-105'
                          : 'font-medium text-white/70'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Active Dot indicator */}
                  {isActive && !item.highlight && (
                    <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
