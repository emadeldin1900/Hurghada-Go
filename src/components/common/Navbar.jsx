import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Globe, Heart, User, LogOut, Sparkles, Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useTripPlan } from '../../context/TripPlanContext';

export default function Navbar({ transparent = false }) {
  const { lang, toggleLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const { favoritesCount } = useTripPlan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t('navExplore'), path: '/explore' },
    { label: t('navThingsToDo'), path: '/explore?cat=activities' },
    { label: t('navStay'), path: '/explore?cat=hotels' },
    { label: t('navEatDrink'), path: '/explore?cat=restaurants' },
    { label: t('navAiPlanner'), path: '/ai-planner', highlight: true },
  ];

  return (
    <header className={`w-full transition-colors z-50 ${transparent ? 'absolute top-0 left-0 right-0' : 'bg-[#032733] border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#f0644b] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-extrabold text-xl tracking-tight leading-tight">
              {t('brandName')}
            </span>
            <span className="text-[#ddf4f1] text-[9px] font-bold tracking-widest uppercase">
              {t('brandTagline')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors hover:text-white flex items-center gap-1.5 ${
                link.highlight 
                  ? 'text-cyan-300 font-semibold bg-white/10 px-3 py-1 rounded-full border border-cyan-400/30' 
                  : location.pathname === link.path ? 'text-white font-bold' : 'text-white/80'
              }`}
            >
              {link.highlight && <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Selector */}
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold bg-white/10 hover:bg-white/20 transition-all cursor-pointer border border-white/10"
            title="Toggle Language"
          >
            <Globe className="w-4 h-4 text-white" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Saved Favorites */}
          <Link
            to="/saved"
            className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
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
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
              >
                <User className="w-4 h-4 text-[#ddf4f1]" />
                <span className="max-w-[100px] truncate">{user.displayName || user.email}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                title={t('signOut')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-white/90 text-[#032733] text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              {t('signIn')}
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            className="p-2 text-white bg-white/10 rounded-full text-xs font-bold"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#032733] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-white py-2 text-base font-semibold flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.highlight && <Sparkles className="w-4 h-4 text-cyan-300" />}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-white text-sm"
            >
              <Heart className="w-4 h-4 text-[#f0644b]" />
              <span>{t('navSaved')} ({favoritesCount})</span>
            </Link>
            {user ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="text-xs text-rose-300 font-bold"
              >
                {t('signOut')}
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-white text-[#032733] rounded-full text-xs font-bold"
              >
                {t('signIn')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
