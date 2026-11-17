import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Trash2, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { geminiService } from '../../services/ai/geminiService';

export default function GeminiConfigModal({ isOpen, onClose, onKeyUpdated }) {
  const { lang } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(geminiService.getApiKey());
      setTestStatus(null);
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestStatus({
        type: 'error',
        message: lang === 'ar' ? 'يرجى إدخال مفتاح API أولاً' : 'Please enter an API key first'
      });
      return;
    }

    setTesting(true);
    setTestStatus(null);

    try {
      await geminiService.testConnection(apiKey.trim());
      setTestStatus({
        type: 'success',
        message: lang === 'ar' 
          ? 'تم التحقق من المفتاح بنجاح! الاتصال مباشر مع Google Gemini.' 
          : 'Connection successful! Verified live with Google Gemini.'
      });
    } catch (err) {
      setTestStatus({
        type: 'error',
        message: err.message || (lang === 'ar' ? 'فشل الاتصال بالمفتاح' : 'Connection failed')
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    geminiService.setApiKey(apiKey.trim());
    setSaveSuccess(true);
    if (onKeyUpdated) onKeyUpdated(apiKey.trim());
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    geminiService.setApiKey('');
    setApiKey('');
    setTestStatus(null);
    if (onKeyUpdated) onKeyUpdated('');
  };

  const isConfigured = Boolean(apiKey.trim());

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#032733]/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#032733] to-[#07384a] text-white p-5 sm:p-6 flex items-start justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-1.5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-[11px] font-bold border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Google Gemini AI</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {lang === 'ar' ? 'ربط مفتاح Gemini API Key' : 'Connect Gemini API Key'}
            </h3>
            <p className="text-xs text-white/75">
              {lang === 'ar'
                ? 'اربط مفتاحك المجاني من جوجل لتفعيل الترشيحات الحية وتوليد البرامج السياحية الذكية.'
                : 'Connect your free Google AI key to enable live smart itineraries and instant answers.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer relative z-10 shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Status Indicator */}
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold ${
            isConfigured 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>
                {isConfigured 
                  ? (lang === 'ar' ? 'حالة الربط: جاهز للعمل مع Gemini 2.5' : 'Status: Connected to Gemini 2.5')
                  : (lang === 'ar' ? 'حالة الربط: غير مربوط (يعمل بالوضع المحلي)' : 'Status: Not connected (Using Local fallback)')}
              </span>
            </div>
            <span className={`w-2.5 h-2.5 rounded-full ${isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
          </div>

          {/* Key Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#032733] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#f0644b]" />
                <span>{lang === 'ar' ? 'مفتاح Google Gemini API Key' : 'Gemini API Key'}</span>
              </span>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="text-[11px] text-[#29b8b2] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>{lang === 'ar' ? 'احصل على مفتاح مجاني' : 'Get free key'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>

            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-[#FAF8F5] text-[#032733] font-mono text-xs sm:text-sm p-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#f0644b]/30"
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'ar' 
                ? 'يمكنك حفظه هنا مباشرة (يُحفظ بأمان في متصفحك)، أو وضعه في ملف .env تحت اسم VITE_GEMINI_API_KEY.' 
                : 'Stored securely in your local browser or configure VITE_GEMINI_API_KEY in your .env file.'}
            </p>
          </div>

          {/* Test Status Alert */}
          {testStatus && (
            <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
              testStatus.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {testStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="font-medium">{testStatus.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors cursor-pointer text-xs"
                title={lang === 'ar' ? 'حذف المفتاح' : 'Clear Key'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2 ms-auto">
              <button
                type="button"
                disabled={testing || !apiKey.trim()}
                onClick={handleTest}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-cyan-600" />}
                <span>{testing ? (lang === 'ar' ? 'جاري الفحص...' : 'Testing...') : (lang === 'ar' ? 'اختبار المفتاح' : 'Test Key')}</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saveSuccess}
                className="px-5 py-2.5 rounded-xl bg-[#f0644b] hover:bg-[#d94a35] text-white text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'تم الحفظ!' : 'Saved!'}</span>
                  </>
                ) : (
                  <span>{lang === 'ar' ? 'حفظ وتفعيل' : 'Save & Activate'}</span>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
