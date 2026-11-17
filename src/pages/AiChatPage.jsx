import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Send, 
  MapPin, 
  Star, 
  RefreshCw, 
  ArrowRight, 
  Wallet, 
  Trash2,
  CheckCircle2,
  Bot,
  User,
  ShieldCheck,
  Compass,
  PhoneCall
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { chatAdvisorService } from '../services/ai/chatAdvisorService.js';

export default function AiChatPage() {
  const { lang, isRtl } = useLanguage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const initialMessage = {
    id: 'welcome',
    sender: 'bot',
    text: lang === 'ar'
      ? 'مرحباً بك! أنا "هيرا" (Hara) مستشارك السياحي الذكي في الغردقة والبحر الأحمر 🌊\n\nأخبرني:\n1️⃣ كم ميزانيتك؟ (مثلاً: 1000 جنيه، 3500 ج، أو 50 دولار)\n2️⃣ من معك؟ (لوحدك، عائلة وأطفال، أصحاب، أو عرسان)\n3️⃣ ما الذي تبحث عنه؟ (مطعم سمك على البحر، كافيه رايق للشغل، فندق 5 نجوم بأكوا بارك، شاطئ رملي، رحلة غوص في الجفتون، أو سفاري بيتش باجي)\n\nوسأرشح لك أفضل الأماكن الحقيقية المطابقة تماماً من داخل دليل التطبيق المعتمد فقط!'
      : 'Welcome! I am "Hara", your intelligent travel advisor for Hurghada and the Red Sea 🌊\n\nTell me:\n1️⃣ Your budget (e.g. 1000 EGP, 3500 EGP, or $50)\n2️⃣ Who is with you? (solo, family with kids, friends, couples)\n3️⃣ What are you looking for? (seafood on the beach, work-friendly cafe, 5-star hotel with aqua park, sandy beach, diving trip to Giftun, or desert quad safari)\n\nI will match and recommend the best places strictly from our 75 verified places!',
    places: [],
    timestamp: new Date()
  };

  const [messages, setMessages] = useState([initialMessage]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    setHasGemini(geminiService.hasApiKey());
  }, []);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      setTimeout(() => scrollToBottom(), 50);
    }
  }, [messages.length, loading]);

  const quickPrompts = [
    {
      ar: 'معايا 1500 جنيه ومحتاجين ناكل سي فود أنا وصاحبي على البحر 🦐',
      en: '1500 EGP budget for seafood for two by the sea 🦐'
    },
    {
      ar: 'معايا 4500 ج ومحتاج فندق 5 نجوم عائلي فيه ألعاب مائية للأولاد 🏨',
      en: '4500 EGP for 5-star family resort with aqua park 🏨'
    },
    {
      ar: 'معايا 300 جنيه وعايز كافيه هادي اشتغل فيه باللابتوب ونت سريع ☕',
      en: '300 EGP for quiet work-friendly cafe with fast Wi-Fi ☕'
    },
    {
      ar: 'معايا 500 ج وعايز شاطئ رملي رايق ونظيف في الغردقة 🏖️',
      en: '500 EGP for clean relaxing sandy beach 🏖️'
    },
    {
      ar: 'معايا 2000 ج وعايز رحلة غوص وسنوركلينج في جزيرة الجفتون 🤿',
      en: '2000 EGP for diving and snorkeling trip to Giftun Island 🤿'
    },
    {
      ar: 'معايا 1500 ج ومحتاج سفاري بيتش باجي بالصحراء مع عشا بدوي 🏎️',
      en: '1500 EGP for desert quad safari with bedouin dinner 🏎️'
    }
  ];

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    setInput('');

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
            ? 'عذراً، حدث خطأ أثناء فحص قاعدة البيانات. يرجى إعادة المحاولة مع تحديد الميزانية ونوع المكان!'
            : 'Sorry, an error occurred while searching. Please try again with your budget and request!',
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
    <div className="w-full min-h-[calc(100vh-80px)] py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#032733] via-[#053242] to-[#07384a] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0644b]/20 text-[#f0644b] border border-[#f0644b]/30 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الترشيح الذكي الحصري بالميزانية' : 'Budget-Aware AI Concierge'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {lang === 'ar' ? 'شات هيرا | مستشارك الخاص في الغردقة' : 'Chat with Hara AI Advisor'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'حدد ميزانيتك وما تحتاجه، وستقوم هيرا بفحص الـ 75 مكاناً الحقيقية وترشيح المكان الأنسب لك بالصور والأسعار وروابط الحجز الفوري.'
              : 'Tell Hara your budget and wishes; it scans the 75 verified Hurghada places to find your perfect match with photos and direct booking.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 relative z-10">
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{lang === 'ar' ? 'المساعد متصل وجاهز' : 'Advisor Online'}</span>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col h-[700px]">
        
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'ترشيحات معتمدة من أماكن الغردقة الـ 75 فقط' : 'Strictly verified 75 Hurghada places'}</span>
          </div>

          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'بدء محادثة جديدة' : 'New chat'}</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF8F5]/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-10 h-10 rounded-2xl bg-[#032733] text-amber-300 flex items-center justify-center shrink-0 shadow-md mt-1">
                  <Sparkles className="w-5 h-5" />
                </div>
              )}

              <div className="max-w-[90%] sm:max-w-[80%] space-y-3">
                {/* Bubble Text */}
                <div
                  className={`p-4 sm:p-5 rounded-3xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#032733] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Recommended Place Cards */}
                {msg.places && msg.places.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ar' ? 'الأماكن المرشحة من التطبيق:' : 'Recommended places from app:'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {msg.places.map((place) => (
                        <div
                          key={place.id}
                          className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-[#f0644b] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between gap-3 group"
                        >
                          <div className="flex items-start gap-3.5">
                            <img
                              src={place.image || place.images?.[0]}
                              alt={place.name}
                              className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                              loading="lazy"
                            />

                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#ddf4f1] text-[#07384a]">
                                  {place.category}
                                </span>
                                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                  <span>{place.rating}</span>
                                </div>
                              </div>

                              <h4 className="font-extrabold text-sm text-[#032733] truncate">
                                {lang === 'ar' ? (place.nameAr || place.name) : place.name}
                              </h4>

                              <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
                                <MapPin className="w-3.5 h-3.5 text-[#29b8b2] shrink-0" />
                                <span className="truncate">{lang === 'ar' ? place.areaAr : place.area}</span>
                              </div>

                              <div className="text-xs font-black text-[#f0644b]">
                                {lang === 'ar' ? place.priceAr : place.priceEn}
                              </div>
                            </div>
                          </div>

                          {place.recommendationReason && (
                            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              💡 {place.recommendationReason}
                            </p>
                          )}

                          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                            {place.phone && (
                              <a
                                href={`tel:${place.phone}`}
                                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                              >
                                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                              </a>
                            )}

                            <Link
                              to={`/place/${place.id}`}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#032733] hover:bg-[#f0644b] text-white text-xs font-extrabold transition-all shadow-sm"
                            >
                              <span>{lang === 'ar' ? 'عرض التفاصيل والحجز' : 'View & Book'}</span>
                              <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                            </Link>
                          </div>
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
                <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-slate-600 text-xs py-3">
              <div className="w-10 h-10 rounded-2xl bg-[#032733] text-amber-300 flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                <RefreshCw className="w-4 h-4 animate-spin text-[#f0644b]" />
                <span className="font-semibold">
                  {lang === 'ar' ? 'هيرا تفحص الأماكن الـ 75 وتطابق ميزانيتك...' : 'Scanning 75 places to match budget...'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions Chips */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider shrink-0 ps-1 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-[#f0644b]" />
            <span>{lang === 'ar' ? 'اقتراحات سريعة:' : 'Quick ideas:'}</span>
          </span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(lang === 'ar' ? qp.ar : qp.en)}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white hover:bg-[#032733] hover:text-white text-slate-700 text-xs font-semibold border border-slate-200 transition-all shrink-0 cursor-pointer shadow-2xs"
            >
              {lang === 'ar' ? qp.ar : qp.en}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white border-t border-slate-200 flex items-center gap-3 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'اكتب ميزانيتك وطلبك (مثال: معايا 1500 جنيه ومحتاجين ناكل سمك ع البحر أنا وصاحبي)...'
                : 'Enter your budget & needs (e.g. 1500 EGP for seafood with a friend)...'
            }
            className="flex-1 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-[#032733] text-sm px-5 py-3 rounded-2xl border border-transparent focus:border-[#f0644b]/50 focus:outline-none focus:ring-2 focus:ring-[#f0644b]/20 transition-all font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-6 py-3 rounded-2xl bg-[#032733] hover:bg-[#f0644b] text-white text-sm font-black transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 shadow-md shrink-0"
          >
            <span>{lang === 'ar' ? 'إرسال' : 'Send'}</span>
            <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </form>

      </div>

    </div>
  );
}
