import { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Clock, 
  Calendar, 
  Check, 
  Bookmark, 
  RefreshCw 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTripPlan } from '../context/TripPlanContext';
import { haraAI, HARA_PRESETS } from '../services/ai/haraAI';

export default function AiPlannerPage() {
  const { lang, t } = useLanguage();
  const { activePlan, setActivePlan } = useTripPlan();

  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(3);
  const [style, setStyle] = useState('balanced');
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const styles = [
    { id: 'balanced', labelEn: 'Balanced & Relaxed', labelAr: 'متوازن ومريح' },
    { id: 'family', labelEn: 'Family with Kids', labelAr: 'عائلي مع أطفال' },
    { id: 'diving', labelEn: 'Diving & Reefs Focus', labelAr: 'تركيز غوص وبحري' },
    { id: 'romantic', labelEn: 'Couples & Romance', labelAr: 'رومانسي وشهر عسل' },
    { id: 'adventure', labelEn: 'Desert & Thrill', labelAr: 'سفاري ومغامرة' },
  ];

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSavedSuccess(false);

    try {
      const plan = await haraAI.generatePlan({
        prompt: prompt || `${duration} days of ${style} trip in Hurghada`,
        durationDays: duration,
        style
      });
      setActivePlan(plan);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlan = () => {
    setActivePlan(plan);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const plan = activePlan || HARA_PRESETS[0];

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#032733] to-[#07384a] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-extrabold border border-cyan-400/30">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{t('aiEyebrow')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            {lang === 'ar' ? 'صمّم برنامج رحلتك بالذكاء الاصطناعي' : 'Design Your Custom Itinerary with Hara'}
          </h1>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'أدخل رغباتك وميزانيتك، وستقوم هيرا بتوليد جدول يومي دقيق، يتضمن أوقات الانتقال الحقيقية، وأفضل المطاعم والشواطئ.'
              : 'Tell Hara how many days you have and what you love. Get a personalized schedule with realistic travel times, insider spots, and direct reservations.'}
          </p>
        </div>
      </div>

      {/* Generator Controls Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6">
        
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#032733] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#f0644b]" />
                <span>{lang === 'ar' ? 'مدة الإقامة (أيام)' : 'Trip Duration (Days)'}</span>
              </label>
              <div className="flex items-center gap-2">
                {[2, 3, 4, 5, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDuration(num)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      duration === num 
                        ? 'bg-[#032733] text-white shadow-2xs' 
                        : 'bg-[#f5efe5] text-[#07384a] hover:bg-slate-200'
                    }`}
                  >
                    {num} {lang === 'ar' ? 'أيام' : 'd'}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Style Selector */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-[#032733] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#f0644b]" />
                <span>{lang === 'ar' ? 'نمط الرحلة وأجواء السفر' : 'Travel Style & Vibe'}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      style === s.id
                        ? 'bg-[#f0644b] text-white shadow-2xs'
                        : 'bg-[#f5efe5] text-[#07384a] hover:bg-slate-200'
                    }`}
                  >
                    {lang === 'ar' ? s.labelAr : s.labelEn}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Custom Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#032733]">
              {lang === 'ar' ? 'أي تفضيلات أو ملاحظات إضافية؟ (اختياري)' : 'Any special requests or must-dos? (Optional)'}
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={lang === 'ar' ? 'مثال: نفضل الأماكن الهادئة، ونحب المأكولات البحرية، ومحتاجين قارب خاص...' : 'e.g. We love quiet beaches, fresh seafood, and want a private speedboat...'}
                className="w-full bg-[#FAF8F5] text-[#032733] text-sm p-3.5 pe-36 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#f0644b]/30 font-medium"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute end-2 px-6 py-2.5 bg-[#f0644b] hover:bg-[#d94a35] text-white text-xs font-extrabold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{loading ? (lang === 'ar' ? 'جاري التوليد...' : 'Planning...') : (lang === 'ar' ? 'توليد الخطة' : 'Generate Plan')}</span>
              </button>
            </div>
          </div>
        </form>

      </div>

      {/* Generated Itinerary Display */}
      <div className="space-y-6">
        
        {/* Title & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#032733]">
              {lang === 'ar' ? plan.titleAr : plan.titleEn}
            </h2>
            <p className="text-[#5d737a] text-sm">
              {lang === 'ar' ? plan.subtitleAr : plan.subtitleEn}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSavePlan}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                savedSuccess ? 'bg-emerald-600 text-white' : 'bg-[#032733] hover:bg-[#07384a] text-white'
              }`}
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{savedSuccess ? (lang === 'ar' ? 'تم الحفظ!' : 'Plan Saved!') : (lang === 'ar' ? 'حفظ الخطة' : 'Save Itinerary')}</span>
            </button>
          </div>
        </div>

        {/* Days List */}
        <div className="space-y-6">
          {plan.days?.map((day) => (
            <div
              key={day.day}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 space-y-6"
            >
              {/* Day Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#f0644b] text-white flex flex-col items-center justify-center font-extrabold shadow-sm shrink-0">
                  <span className="text-[10px] tracking-wider uppercase">{lang === 'ar' ? 'يوم' : 'Day'}</span>
                  <span className="text-xl font-black">{day.day}</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#032733]">
                    {lang === 'ar' ? day.titleAr : day.titleEn}
                  </h3>
                  <span className="text-xs text-[#5d737a]">
                    {day.stops?.length} {lang === 'ar' ? 'محطات مقترحة' : 'curated stops'}
                  </span>
                </div>
              </div>

              {/* Stops Timeline */}
              <div className="space-y-4 pt-2">
                {day.stops?.map((stop, sIndex) => (
                  <div
                    key={sIndex}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-slate-100 hover:bg-[#ddf4f1]/30 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#f0644b] w-24 shrink-0 pt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{stop.time}</span>
                    </div>

                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-bold text-[#032733] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#29b8b2]" />
                        <span>{stop.place}</span>
                      </h4>
                      <p className="text-xs text-[#5d737a] leading-relaxed">
                        {lang === 'ar' ? stop.noteAr : stop.noteEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
