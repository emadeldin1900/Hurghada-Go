import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MessageCircle, 
  X, 
  Send, 
  MapPin, 
  Star, 
  Tag, 
  RefreshCw, 
  ArrowRight, 
  Bot, 
  User, 
  Wallet, 
  Maximize2, 
  Minimize2,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { chatAdvisorService } from '../../services/ai/chatAdvisorService.js';
import { geminiService } from '../../services/ai/geminiService.js';

export default function FloatingAiChat() {
  const { lang, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasGemini, setHasGemini] = useState(false);

  const initialMessage = {
    id: 'welcome',
    sender: 'bot',
    text: lang === 'ar'
      ? 'أهلاً بك! أنا هيرا (Hara) مرشدك السياحي الذكي في الغردقة 🌊\n\nاكتب لي ميزانيتك (مثلاً: معايا 1500 جنيه) ومن معك وما الذي تحتاجه (مثلاً: مطعم سمك ع البحر، فندق عائلي بأكوا بارك، كافيه هادي، شاطئ رملي، رحلة غوص أو سفاري)، وسأرشح لك أفضل الأماكن المطابقة من دليلي الحصري فقط!'
      : 'Hello! I am Hara, your smart Hurghada concierge 🌊\n\nTell me your budget (e.g. 1500 EGP or $50), who is with you, and what you need (e.g. seafood on the beach, family resort with aqua park, quiet cafe, sandy beach, diving or safari), and I will recommend the perfect verified places for you!',
    places: [],
    timestamp: new Date()
  };

  const [messages, setMessages] = useState([initialMessage]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    setHasGemini(geminiService.hasApiKey());
  }, [isOpen]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isOpen && messages.length > 1) {
      // Small timeout to allow DOM to finish rendering content before internal scroll
      setTimeout(() => scrollToBottom(), 50);
    }
  }, [messages.length, loading, isOpen]);

  const quickPrompts = [
    {
      ar: 'معايا 1500 جنيه ومحتاجين ناكل سي فود أنا وصاحبي 🦐',
      en: '1500 EGP budget for seafood for two 🦐'
    },
    {
      ar: 'معايا 4000 ج ومحتاج فندق عائلي فيه ألعاب مائية للأولاد 🏨',
      en: '4000 EGP for family resort with aqua park 🏨'
    },
    {
      ar: 'معايا 300 جنيه وعايز كافيه هادي اشتغل فيه باللابتوب ☕',
      en: '300 EGP for quiet work-friendly cafe ☕'
    },
    {
      ar: 'معايا 500 ج وعايز شاطئ رملي رايق ونظيف 🏖️',
      en: '500 EGP for clean relaxing sandy beach 🏖️'
    },
    {
      ar: 'معايا 2000 ج ومحتاج رحلة غوص وسنوركلينج في الجفتون 🤿',
      en: '2000 EGP for diving trip at Giftun Island 🤿'
    },
    {
      ar: 'معايا 1500 ج ومحتاج سفاري بيتش باجي بالصحراء 🏎️',
      en: '1500 EGP for desert quad safari 🏎️'
    }
  ];

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    setInput('');

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await chatAdvisorService.askAdvisor({
        query,
        history: messages,
        lang
      });

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.message,
        places: response.places || [],
        source: response.source,
        budgetInfo: response.budgetInfo,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: lang === 'ar'
            ? 'عذراً، حدث خطأ أثناء فحص الأماكن. يرجى كتابة ميزانيتك ونوع المكان مرة أخرى!'
            : 'Sorry, something went wrong. Please try specifying your budget and place type again!',
          places: [],
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([initialMessage]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className={`fixed bottom-20 lg:bottom-6 ${isRtl ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-50`}>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Chat"
            className="group relative flex items-center gap-3 px-4 sm:px-5 py-3.5 rounded-full bg-gradient-to-r from-[#032733] via-[#053242] to-[#f0644b] text-white shadow-2xl hover:shadow-[#f0644b]/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#29b8b2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#29b8b2]"></span>
              </span>
            </div>
            
            <div className="flex flex-col text-start">
              <span className="text-xs sm:text-sm font-black tracking-wide flex items-center gap-1.5">
                <span>{lang === 'ar' ? 'هيرا | شات الترشيح الذكي' : 'Hara AI Concierge'}</span>
              </span>
              <span className="text-[10px] text-slate-200/90 font-medium">
                {lang === 'ar' ? 'قل ميزانيتك وطلبك ونرشحلك فوراً' : 'Tell budget & get instant match'}
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window / Drawer */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? 'inset-2 sm:inset-6 md:inset-10'
              : `bottom-4 inset-x-3 sm:inset-x-auto ${isRtl ? 'sm:left-6' : 'sm:right-6'} sm:w-[460px] h-[650px] max-h-[88vh]`
          } bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#032733] via-[#053242] to-[#07384a] p-4 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f0644b] to-amber-400 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#032733] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-white">
                    {lang === 'ar' ? 'هيرا (Hara) | مساعد الغردقة الذكي' : 'Hara AI Local Advisor'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{lang === 'ar' ? 'متصل الآن' : 'Online'}</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {lang === 'ar' ? 'ترشيحات حصرية من الـ 75 مكاناً المعتمدة بالتطبيق' : 'Strictly verified Hurghada places'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <button
                onClick={handleClear}
                title={lang === 'ar' ? 'مسح المحادثة' : 'Clear Chat'}
                className="p-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize' : 'Maximize'}
                className="hidden sm:block p-1.5 rounded-xl hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF8F5]/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-[#032733] text-amber-300 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-3`}>
                  {/* Bubble */}
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#032733] text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommendation Place Cards (if any) */}
                  {msg.places && msg.places.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {lang === 'ar' ? 'أماكن مطابقة من داخل البرنامج:' : 'Verified places from app:'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {msg.places.map((place) => (
                          <div
                            key={place.id}
                            className="bg-white rounded-2xl p-3 border border-slate-200 hover:border-[#f0644b]/50 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                          >
                            <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                              <img
                                src={place.image || place.images?.[0]}
                                alt={place.name}
                                className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                                loading="lazy"
                              />

                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#ddf4f1] text-[#07384a]">
                                    {place.category}
                                  </span>
                                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    <span>{place.rating}</span>
                                  </div>
                                </div>

                                <h4 className="font-bold text-xs sm:text-sm text-[#032733] truncate">
                                  {lang === 'ar' ? (place.nameAr || place.name) : place.name}
                                </h4>

                                <div className="flex items-center gap-2 text-[11px] text-slate-500 truncate">
                                  <span className="flex items-center gap-1 truncate">
                                    <MapPin className="w-3 h-3 text-[#29b8b2] shrink-0" />
                                    <span>{lang === 'ar' ? place.areaAr : place.area}</span>
                                  </span>
                                  <span>•</span>
                                  <span className="font-bold text-[#f0644b] shrink-0">
                                    {lang === 'ar' ? place.priceAr : place.priceEn}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* View Place Details Button */}
                            <Link
                              to={`/place/${place.id}`}
                              onClick={() => {
                                if (!isExpanded) setIsOpen(false);
                              }}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#032733] hover:bg-[#f0644b] text-white text-xs font-bold transition-all shadow-sm shrink-0"
                            >
                              <span>{lang === 'ar' ? 'عرض وحجز' : 'View & Book'}</span>
                              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-slate-500 text-xs py-2">
                <div className="w-8 h-8 rounded-xl bg-[#032733] text-amber-300 flex items-center justify-center shrink-0 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#f0644b]" />
                  <span>
                    {lang === 'ar' ? 'هيرا تفحص الأماكن الـ 75 وتطابق ميزانيتك...' : 'Checking 75 places against budget...'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider shrink-0 ps-1 flex items-center gap-1">
              <Wallet className="w-3 h-3 text-[#f0644b]" />
              <span>{lang === 'ar' ? 'اقتراحات سريعة:' : 'Quick ideas:'}</span>
            </span>
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(lang === 'ar' ? qp.ar : qp.en)}
                className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-white hover:bg-[#032733] hover:text-white text-slate-700 text-[11px] font-semibold border border-slate-200 transition-all shrink-0 cursor-pointer shadow-2xs"
              >
                {lang === 'ar' ? qp.ar : qp.en}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'اكتب ميزانيتك وطلبك (مثلاً: معايا 1000 ج ومحتاج مطعم سمك)...'
                  : 'Type your budget and request (e.g. 1500 EGP for seafood)...'
              }
              className="flex-1 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-[#032733] text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-transparent focus:border-[#f0644b]/50 focus:outline-none focus:ring-2 focus:ring-[#f0644b]/20 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-2xl bg-[#032733] hover:bg-[#f0644b] text-white text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
            >
              <span>{lang === 'ar' ? 'إرسال' : 'Send'}</span>
              <Send className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
