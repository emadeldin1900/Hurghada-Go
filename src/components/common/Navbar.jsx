import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Globe, Heart, User, LogOut, Sparkles, LifeBuoy } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useTripPlan } from '../../context/TripPlanContext';
import SupportModal from './SupportModal';

export default function Navbar({ transparent = false }) {
  const { lang, toggleLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const { favoritesCount } = useTripPlan();
  const location = useLocation();
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const navLinks = [
    { label: t('navExplore'), path: '/explore' },
    { label: lang === 'ar' ? 'فنادق وإقامات' : 'Hotels & Stays', path: '/explore?cat=hotels' },
    { label: lang === 'ar' ? 'مطاعم ومقاهي' : 'Eat & Drink', path: '/explore?cat=restaurants' },
    { label: lang === 'ar' ? 'شواطئ ونوادي' : 'Beaches & Clubs', path: '/explore?cat=beaches' },
    { label: t('navThingsToDo'), path: '/explore?cat=activities' },
    { label: lang === 'ar' ? 'مساعد هيرا الذكي' : 'Hara AI Concierge', path: '/chat', highlight: true },
  ];

  return (
    <>
      <header className={`w-full transition-colors z-40 ${transparent ? 'absolute top-0 left-0 right-0' : 'bg-[#032733] border-b border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f0644b] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
              <Waves className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-tight">
                {t('brandName')}
              </span>
              <span className="text-[#ddf4f1] text-[8px] sm:text-[9px] font-bold tracking-widest uppercase">
                {t('brandTagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-white/90">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-white flex items-center gap-1.5 ${
                  link.chatPill
                    ? 'text-amber-300 font-bold bg-[#f0644b]/25 px-3 py-1 rounded-full border border-amber-400/40 hover:bg-[#f0644b]/35 shadow-2xs'
                    : link.highlight 
                      ? 'text-cyan-300 font-semibold bg-white/10 px-3 py-1 rounded-full border border-cyan-400/30' 
                      : location.pathname === link.path ? 'text-white font-bold' : 'text-white/80'
                }`}
              >
                {link.chatPill && <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />}
                {link.highlight && !link.chatPill && <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Support Desk Trigger */}
            <button
              type="button"
              onClick={() => setSupportModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-white text-xs font-bold bg-[#29b8b2]/20 hover:bg-[#29b8b2]/35 border border-[#29b8b2]/40 transition-all cursor-pointer"
              title={lang === 'ar' ? 'فريق الدعم والمساعدة' : 'Help & Support Desk'}
            >
              <LifeBuoy className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'الدعم' : 'Support'}</span>
            </button>

            {/* Language Selector */}
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-white text-xs font-bold bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/10"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-white" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Saved Favorites */}
            <Link
              to="/saved"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
              title={t('navSaved')}
            >
              <Heart className="w-4 h-4 text-white" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f0644b] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Auth Button / Profile */}
            {user ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
                >
                  <User className="w-4 h-4 text-[#ddf4f1]" />
                  <span className="max-w-[70px] sm:max-w-[100px] truncate">{user.displayName || user.email}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 sm:p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title={t('signOut')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-white/90 text-[#032733] text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                {t('signIn')}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Support Desk Modal */}
      <SupportModal 
        isOpen={supportModalOpen} 
        onClose={() => setSupportModalOpen(false)} 
      />
    </>
  );
}
