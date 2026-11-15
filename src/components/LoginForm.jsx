import { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  HelpCircle, 
  Sparkles 
} from 'lucide-react';
import { GoogleIcon, AppleIcon } from './SocialIcons';

const CONTENT = {
  en: {
    secureAccess: 'Secure access',
    welcomeBack: 'WELCOME BACK',
    title: 'Sign in to your Red Sea',
    subtitle: 'Continue planning, saving and discovering the best of Hurghada.',
    emailLabel: 'Email address',
    emailPlaceholder: 'someone@example.com',
    passwordLabel: 'Password',
    show: 'Show',
    hide: 'Hide',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signInBtn: 'Sign in',
    orContinueWith: 'Or continue with',
    google: 'Google',
    apple: 'Apple',
    newToBrand: 'New to Go Hurghada?',
    createAccount: 'Create an account',
    privacyNotice: 'Your details stay private. By continuing, you agree to our Terms and Privacy Policy.',
    copyright: '© 2025 Go Hurghada',
    needHelp: 'Need help?',
  },
  ar: {
    secureAccess: 'دخول آمن ومشفر',
    welcomeBack: 'مرحباً بعودتك',
    title: 'تسجيل الدخول إلى حسابك',
    subtitle: 'تابع التخطيط، وحفظ الأماكن واكتشاف أجمل ما في الغردقة.',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'someone@example.com',
    passwordLabel: 'كلمة المرور',
    show: 'إظهار',
    hide: 'إخفاء',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    signInBtn: 'تسجيل الدخول',
    orContinueWith: 'أو المتابعة عبر',
    google: 'جوجل',
    apple: 'أبل',
    newToBrand: 'جديد في جو غردقة؟',
    createAccount: 'إنشاء حساب جديد',
    privacyNotice: 'بياناتك الشخصية بأمان تام. بمتابعتك، فإنك توافق على الشروط وسياسة الخصوصية.',
    copyright: '© 2025 جو غردقة',
    needHelp: 'هل تحتاج مساعدة؟',
  }
};

export default function LoginForm({ lang = 'en', onLangChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isRtl = lang === 'ar';
  const t = CONTENT[lang] || CONTENT.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Auth integration entry point
      console.log('Authenticating:', { email, rememberMe });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    console.log('OAuth provider:', provider);
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#FAF8F5] flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-slate-800">
      <header className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t.secureAccess}</span>
        </div>

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

      <div className="w-full max-w-[420px] mx-auto my-auto py-8">
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCEEEA] text-[#DE543F] text-[11px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-[#DE543F]" />
            {t.welcomeBack}
          </span>
        </div>

        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#0B2530] tracking-tight leading-snug">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              onClick={(e) => e.preventDefault()}
            >
              {t.forgotPassword}
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#0B2F3D] hover:bg-[#08232e] active:scale-[0.99] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{t.signInBtn}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                ) : (
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                )}
              </>
            )}
          </button>
        </form>

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
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>{t.google}</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('apple')}
            className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <AppleIcon className="w-4 h-4" />
            <span>{t.apple}</span>
          </button>
        </div>

        <div className="text-center text-xs text-slate-500 mb-6">
          <span>{t.newToBrand} </span>
          <a 
            href="#create-account" 
            className="text-teal-700 hover:text-teal-900 font-bold hover:underline transition"
            onClick={(e) => e.preventDefault()}
          >
            {t.createAccount}
          </a>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400 leading-relaxed px-4">
          <Lock className="w-3 h-3 text-slate-400 shrink-0 inline" />
          <span>{t.privacyNotice}</span>
        </div>
      </div>

      <footer className="w-full flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-200/50">
        <div>{t.copyright}</div>
        <button 
          type="button"
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t.needHelp}</span>
        </button>
      </footer>
    </div>
  );
}
