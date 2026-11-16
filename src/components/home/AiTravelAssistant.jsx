import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  Map as MapIcon, 
  ChevronRight, 
  Send, 
  ArrowUpRight 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTripPlan } from '../../context/TripPlanContext';
import { haraAI, HARA_PRESETS } from '../../services/ai/haraAI';

export default function AiTravelAssistant() {
  const { lang, t } = useLanguage();
  const { activePlan, setActivePlan } = useTripPlan();

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(activePlan?.id || 'kids-3days');

  const handleSelectPreset = async (preset) => {
    setSelectedPresetId(preset.id);
    setLoading(true);
    try {
      const plan = await haraAI.generatePlan({ presetId: preset.id });
      setActivePlan(plan);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    setLoading(true);
    try {
      const plan = await haraAI.generatePlan({ prompt: inputPrompt });
      setActivePlan(plan);
      setSelectedPresetId('custom');
      setInputPrompt('');
    } finally {
      setLoading(false);
    }
  };

  const currentPlan = activePlan || HARA_PRESETS[0];

  return (
    <section className="bg-[#ddf4f1] py-10 sm:py-16 lg:py-20 px-3.5 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* Left Column: Assistant Copy & Prompt Chips */}
        <div className="w-full lg:w-5/12 space-y-4 sm:space-y-6">
          
          {/* Assistant Label */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#f0644b] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[#d94a35] font-extrabold text-[11px] sm:text-sm tracking-wider uppercase">
              {t('aiEyebrow')}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-[#032733] text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12]">
            {t('aiTitle')}
          </h2>

          {/* Subtitle */}
          <p className="text-[#5d737a] text-xs sm:text-base lg:text-lg leading-relaxed">
            {t('aiSubtitle')}
          </p>

          {/* Suggested Prompts Tags */}
          <div className="space-y-2 pt-1 sm:pt-2">
            <p className="text-[11px] sm:text-xs font-bold text-[#07384a] uppercase tracking-wider">
              {lang === 'ar' ? 'جرّب الضغط على الأفكار الشائعة:' : 'Try popular trip styles:'}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {HARA_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedPresetId === preset.id
                      ? 'bg-[#07384a] text-white shadow-sm'
                      : 'bg-white hover:bg-white/80 text-[#07384a] border border-[#07384a]/10'
                  }`}
                >
                  {lang === 'ar' ? preset.labelAr : preset.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Assurances */}
          <div className="flex items-center gap-4 sm:gap-6 pt-1 sm:pt-2 text-xs font-semibold text-[#07384a]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{t('aiAssuranceFree')}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{t('aiAssuranceSave')}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Itinerary Preview Card */}
        <div className="w-full lg:w-7/12">
          <div className="bg-white rounded-2xl sm:rounded-[32px] p-4 sm:p-8 shadow-[0px_16px_40px_-10px_rgba(3,39,51,0.2)] border border-white/80 space-y-4 sm:space-y-5 transition-all">
            
            {/* Header: Assistant Identity */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#f0644b] border-2 border-white flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                  H
                </div>
                <div>
                  <h4 className="text-[#032733] font-extrabold text-base leading-tight">Hara</h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#5d737a]">
                    <span className="w-2 h-2 rounded-full bg-[#16835a] animate-pulse" />
                    <span>{t('aiOnline')}</span>
                  </div>
                </div>
              </div>

              <span className="bg-[#ddf4f1] text-[#07384a] text-xs font-bold px-3 py-1.5 rounded-full">
                {t('aiBadge')}
              </span>
            </div>

            {/* Assistant message balloon */}
            <div className="bg-[#f5efe5] p-4 rounded-2xl rounded-tl-sm text-[#032733] text-sm leading-relaxed">
              {lang === 'ar'
                ? 'لقد وازنت بين أوقات البحر والشعاب المرجانية، والمذاق المحلي وسحر الصحراء. إليك هذا البرنامج المريح المخصص لك:'
                : "I’ve balanced reef time, local flavor and a little desert magic. Here’s a relaxed custom plan for you:"}
            </div>

            {/* Itinerary Preview Container */}
            <div className="border border-[#e5eceb] rounded-2xl p-5 space-y-4">
              
              {/* Itinerary Title Row */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#032733] text-lg font-bold">
                    {lang === 'ar' ? currentPlan.titleAr : currentPlan.titleEn}
                  </h3>
                  <p className="text-[#5d737a] text-xs">
                    {lang === 'ar' ? currentPlan.subtitleAr : currentPlan.subtitleEn}
                  </p>
                </div>

                <div className="w-12 h-10 rounded-xl bg-[#ddf4f1] flex items-center justify-center text-[#07384a]">
                  <MapIcon className="w-5 h-5 text-[#29b8b2]" />
                </div>
              </div>

              {/* Day items */}
              <div className="space-y-3">
                {currentPlan.days?.map((day) => (
                  <div
                    key={day.day}
                    className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50/70 hover:bg-[#ddf4f1]/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#f0644b] text-white flex flex-col items-center justify-center text-[10px] font-extrabold shrink-0 shadow-2xs">
                      <span>{lang === 'ar' ? 'يوم' : 'Day'}</span>
                      <span className="text-sm font-black">{day.day}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#032733] text-sm font-bold truncate">
                        {lang === 'ar' ? day.titleAr : day.titleEn}
                      </h4>
                      <p className="text-[#5d737a] text-xs mt-0.5 line-clamp-1">
                        {day.stops?.map(s => s.place).join(' · ')}
                      </p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                  </div>
                ))}
              </div>

            </div>

            {/* Interactive Chat / Ask Hara form */}
            <form onSubmit={handleCustomSubmit} className="relative flex items-center">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={t('aiInputPlaceholder')}
                className="w-full bg-[#f5efe5] text-[#032733] text-xs sm:text-sm rounded-full py-3 sm:py-3.5 ps-5 pe-24 focus:outline-none focus:ring-2 focus:ring-[#f0644b]/30 placeholder:text-slate-400 font-medium"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute end-1.5 px-4 py-2 bg-[#f0644b] hover:bg-[#d94a35] text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? '...' : (lang === 'ar' ? 'اطلب' : 'Plan')}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Link to Full AI Planner */}
            <div className="pt-1 flex items-center justify-between text-xs font-bold text-[#07384a]">
              <span>{lang === 'ar' ? 'هل تريد تخصيص الميزانية والفندق بالكامل؟' : 'Want to customize budget & hotel choices?'}</span>
              <Link
                to="/ai-planner"
                className="flex items-center gap-1 text-[#f0644b] hover:underline"
              >
                <span>{lang === 'ar' ? 'فتح المساعد الشامل' : 'Open Full Planner'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
