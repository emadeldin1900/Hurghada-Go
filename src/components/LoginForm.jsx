import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  User,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { GoogleIcon, AppleIcon } from './SocialIcons';
import { useAuth } from '../context/AuthContext';

const CONTENT = {
  en: {
    secureAccess: 'Secure access',
    welcomeBack: 'WELCOME BACK',
    joinUs: 'START YOUR JOURNEY',
    title: 'Sign in to your Red Sea',
    titleSignUp: 'Create your Red Sea account',
    subtitle: 'Continue planning, saving and discovering the best of Hurghada.',
    subtitleSignUp: 'Join thousands planning their custom Hurghada adventures.',
    nameLabel: 'Full name',
    namePlaceholder: 'Ahmed El-Sayed',
    emailLabel: 'Email address',
    emailPlaceholder: 'someone@example.com',
    passwordLabel: 'Password',
    show: 'Show',
    hide: 'Hide',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signInBtn: 'Sign in',
    signUpBtn: 'Create Account',
    orContinueWith: 'Or continue with',
    google: 'Google',
    apple: 'Apple',
    appleComingSoon: 'Sign in with Apple will be available soon',
    newToBrand: 'New to Go Hurghada?',
    alreadyHaveAccount: 'Already have an account?',
    createAccount: 'Create an account',
    signInHere: 'Sign in here',
    privacyNotice: 'Your details stay private. By continuing, you agree to our Terms and Privacy Policy.',
    copyright: '© 2025 Go Hurghada',
    backToHome: 'Back to website'
  },
  ar: {
    secureAccess: 'دخول آمن ومشفر',
    welcomeBack: 'مرحباً بعودتك',
    joinUs: 'ابدأ رحلتك معنا',
    title: 'تسجيل الدخول إلى حسابك',
    titleSignUp: 'إنشاء حساب جديد في جو غردقة',
    subtitle: 'تابع التخطيط، وحفظ الأماكن واكتشاف أجمل ما في الغردقة.',
    subtitleSignUp: 'انضم لآلاف المسافرين في تنظيم عطلاتهم بالبحر الأحمر.',
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'أحمد السيد',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'someone@example.com',
    passwordLabel: 'كلمة المرور',
    show: 'إظهار',
    hide: 'إخفاء',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    signInBtn: 'تسجيل الدخول',
    signUpBtn: 'إنشاء الحساب',
    orContinueWith: 'أو المتابعة عبر',
    google: 'جوجل',
    apple: 'أبل',
    appleComingSoon: 'تسجيل الدخول عبر Apple سيكون متاحاً قريباً',
    newToBrand: 'جديد في جو غردقة؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    createAccount: 'إنشاء حساب جديد',
    signInHere: 'تسجيل الدخول هنا',
    privacyNotice: 'بياناتك الشخصية بأمان تام. بمتابعتك، فإنك توافق على الشروط وسياسة الخصوصية.',
    copyright: '© 2025 جو غردقة',
    backToHome: 'العودة للموقع الرئيسي'
  }
};

export default function LoginForm({ lang = 'en', onLangChange }) {
  const navigate = useNavigate();
  const { signIn, signUp, signInGoogle } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [appleNotice, setAppleNotice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isRtl = lang === 'ar';
  const t = CONTENT[lang] || CONTENT.en;

  // Handle Email Sign In / Sign Up
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAppleNotice(false);

    try {
      if (isSignUp) {
        await signUp(email, password, name);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/operation-not-allowed') {
        setError(lang === 'ar' 
          ? 'المصادقة بالبريد غير مفعلة في Firebase Console. يرجى تفعيل Email/Password في تبويب Sign-in method.' 
          : 'Email/Password sign-in is not enabled in Firebase Console.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError(lang === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError(lang === 'ar' ? 'البريد الإلكتروني مسجل بالفعل.' : 'Email is already registered.');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    setAppleNotice(false);
    try {
      await signInGoogle();
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError(lang === 'ar' ? 'تم إغلاق نافذة تسجيل الدخول.' : 'Sign-in window was closed.');
      } else {
        setError(err.message || 'Google sign in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#FAF8F5] flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-slate-800">
      
      {/* Top Header */}
      <header className="w-full flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0B2F3D] transition-colors"
        >
          <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          <span>{t.backToHome}</span>
        </Link>

        <div className="bg-slate-200/70 p-0.5 rounded-full flex items-center text-xs font-semibold shadow-2xs">
          <button
            type="button"
            onClick={() => onLangChange('en')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              lang === 'en'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => onLangChange('ar')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              lang === 'ar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            العربية
          </button>
        </div>
      </header>

      {/* Main Form Center */}
      <div className="w-full max-w-[420px] mx-auto my-auto py-8">
        
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCEEEA] text-[#DE543F] text-[11px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-[#DE543F]" />
            {isSignUp ? t.joinUs : t.welcomeBack}
          </span>
        </div>

        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#0B2530] tracking-tight leading-snug">
            {isSignUp ? t.titleSignUp : t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
            {isSignUp ? t.subtitleSignUp : t.subtitle}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* EMAIL / PASSWORD FORM */}
        <form onSubmit={handleSubmitEmail} className="space-y-4">
          
          {isSignUp && (
            <div>
              <label 
                htmlFor="name" 
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {t.nameLabel}
              </label>
              <div className="relative flex items-center">
                <div className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} text-slate-400 pointer-events-none`}>
                  <User className="w-4 h-4 stroke-[1.8]" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className={`w-full ${
                    isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                  } py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2F3D]/20 focus:border-[#0B2F3D] shadow-2xs transition-all`}
                />
              </div>
            </div>
          )}

          <div>
            <label 
              htmlFor="email" 
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              {t.emailLabel}
            </label>
            <div className="relative flex items-center">
              <div className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} text-slate-400 pointer-events-none`}>
                <Mail className="w-4 h-4 stroke-[1.8]" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className={`w-full ${
                  isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
                } py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2F3D]/20 focus:border-[#0B2F3D] shadow-2xs transition-all`}
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              {t.passwordLabel}
            </label>
            <div className="relative flex items-center">
              <div className={`absolute ${isRtl ? 'right-3.5' : 'left-3.5'} text-slate-400 pointer-events-none`}>
                <Lock className="w-4 h-4 stroke-[1.8]" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full ${
                  isRtl ? 'pr-10 pl-20 text-right' : 'pl-10 pr-20 text-left'
                } py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B2F3D]/20 focus:border-[#0B2F3D] shadow-2xs transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${isRtl ? 'left-3' : 'right-3'} text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 px-1.5 py-1 rounded transition-colors cursor-pointer`}
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>{t.hide}</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t.show}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between pt-0.5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0B2F3D] focus:ring-[#0B2F3D] accent-[#0B2F3D] cursor-pointer"
                />
                <span className="text-slate-600 font-medium">{t.rememberMe}</span>
              </label>

              <a 
                href="#forgot-password" 
                className="text-teal-700 hover:text-teal-900 font-medium transition hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert(lang === 'ar' ? 'تم إرسال رابط استعادة كلمة المرور إلى بريدك' : 'Password reset link sent to your email');
                }}
              >
                {t.forgotPassword}
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#0B2F3D] hover:bg-[#08232e] active:scale-[0.99] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? t.signUpBtn : t.signInBtn}</span>
                <ArrowRight className={`w-4 h-4 stroke-[2.2] ${isRtl ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
        </form>

        {/* OAuth Providers Section */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-[#FAF8F5] px-3 text-slate-400 font-medium">
              {t.orContinueWith}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>{t.google}</span>
          </button>

          {/* Apple Button (Icon only) */}
          <button
            type="button"
            onClick={() => {
              setError('');
              setAppleNotice(true);
              setTimeout(() => setAppleNotice(false), 4500);
            }}
            className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer relative group"
            title={t.appleComingSoon}
          >
            <AppleIcon className="w-4 h-4 fill-current text-slate-900" />
            <span>{t.apple}</span>
          </button>
        </div>

        {/* Apple Coming Soon Notice Banner */}
        {appleNotice && (
          <div className="mb-4 p-2.5 bg-slate-100 border border-slate-200/80 rounded-xl text-slate-600 text-xs text-center font-medium transition-all flex items-center justify-center gap-2">
            <AppleIcon className="w-3.5 h-3.5 fill-current text-slate-700" />
            <span>{t.appleComingSoon}</span>
          </div>
        )}

        <div className="text-center text-xs text-slate-500 mb-6">
          <span>{isSignUp ? t.alreadyHaveAccount : t.newToBrand} </span>
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-teal-700 hover:text-teal-900 font-bold hover:underline transition cursor-pointer"
          >
            {isSignUp ? t.signInHere : t.createAccount}
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400 leading-relaxed px-4">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 inline" />
          <span>{t.privacyNotice}</span>
        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="w-full flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-200/60">
        <span>{t.copyright}</span>
        <span className="flex items-center gap-1 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.secureAccess}</span>
        </span>
      </footer>

    </div>
  );
}