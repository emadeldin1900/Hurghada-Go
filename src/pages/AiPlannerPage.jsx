import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  RefreshCw, 
  Send, 
  ArrowRight,
  Wallet,
  Star,
  CheckCircle2,
  Trash2,
  User,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { chatAdvisorService } from '../services/ai/chatAdvisorService.js';

export default function AiPlannerPage() {
  const { lang, t, isRtl } = useLanguage();

  const initialChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text: lang === 'ar'
      ? 'يا هلا بيك في الغردقة! أنا "هيرا" (Hara) مستشارك وصديقك السياحي الذكي 🌊\n\nأخبرني:\n• كم ميزانيتك؟ (مثلاً: 1500 ج، 10,000 ج، أو 50 دولار)\n• من معك وكم عدد الأيام؟ (أصحاب، عائلة مع أطفال، أو شهر عسل مع عروستك)\n• ما الذي تبحث عنه؟ (إقامة، مطعم سمك ع البحر، شاطئ رملي، رحلة غوص في الجفتون، أو سفاري بيتش باجي)\n\nوسأقوم بحساب كل تفصيلة في الميزانية وتصميم خطتك الكاملة مع ترشيح الأماكن الحقيقية بالصور والأسعار وروابط الحجز من دليلي الحصري فقط!'
      : 'Welcome to Hurghada! I am "Hara", your intelligent local travel concierge 🌊\n\nTell me:\n• Your budget (e.g. 1500 EGP, 10,000 EGP, or $50)\n• Who is with you & how many days? (friends, family with kids, or honeymoon)\n• What are you looking for? (stay, seafood on the beach, sandy beach, diving trip to Giftun, or desert quad safari)\n\nI will calculate the exact financial math and design your vacation with real places, prices, and instant booking links!',
    places: [],
    timestamp: new Date()
  };

  const [chatMessages, setChatMessages] = useState([initialChatMessage]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToChatBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (chatMessages.length > 1) {
      setTimeout(() => scrollToChatBottom(), 50);
    }
  }, [chatMessages.length, chatLoading]);

  const quickPrompts = [
    {
      ar: 'معايا 1500 جنيه وعايزين ناكل سمك أنا وصاحبي على البحر في مكان شيك 🦐',
      en: '1500 EGP budget for seafood for two by the sea in a nice spot 🦐'
    },
    {
      ar: 'أنا وعروستي في شهر العسل ومعانا 12000 وعايزين نقضي 3 أيام هدوء ورومانسية 💑',
      en: 'Honeymoon for 3 days with 12000 EGP budget for quiet romantic spots 💑'
    },
    {
      ar: 'معايا أسرتي طفلين والمدام ومعانا 10000 وعايزين يومين فندق وشاطئ وألعاب مائية 👨‍👩‍👧‍👦',
      en: 'Family with 2 kids and 10000 EGP for 2 days hotel, beach & water games 👨‍👩‍👧‍👦'
    },
    {
      ar: 'أنا و3 صحابي ومعانا 5000 وعايزين يومين أكشن وبحر وسفاري بيتش باجي 🏎️',
      en: '3 friends with 5000 EGP for 2 days action, beach & quad safari 🏎️'
    },
    {
      ar: 'معايا 300 جنيه وعايز كافيه هادي اشتغل فيه باللابتوب وفيه نت سريع ☕',
      en: '300 EGP for quiet work-friendly cafe with fast Wi-Fi ☕'
    },
    {
      ar: 'معايا 2000 ج وعايز أطلع رحلة غوص وسنوركلينج في جزيرة الجفتون 🤿',
      en: '2000 EGP for diving and snorkeling trip to Giftun Island 🤿'
    }
  ];

  const handleChatSend = async (textToSend) => {
    const query = (textToSend || chatInput).trim();
    if (!query || chatLoading) return;

    setChatInput('');

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    try {
      const response = await chatAdvisorService.askAdvisor({
        query,
        history: chatMessages,
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

      setChatMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: lang === 'ar'
            ? 'عذراً يا غالي، حدث خطأ بسيط أثناء فحص قاعدة البيانات. من فضلك أعد كتابة ميزانيتك وطلبك وسأخدمك بعيوني!'
            : 'Sorry, a temporary issue occurred. Please retype your budget and request!',
          places: [],
          timestamp: new Date()
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([initialChatMessage]);
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#032733] via-[#053242] to-[#07384a] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-extrabold border border-cyan-400/30">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>{t('aiEyebrow')}</span>
            </div>

            {/* Online Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === 'ar' ? 'المساعد متصل وجاهز' : 'Advisor Online'}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {lang === 'ar' ? 'شات هيرا | مستشارك السياحي الذكي في الغردقة' : 'Hara AI Concierge | Your Smart Hurghada Guide'}
          </h1>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {lang === 'ar'
              ? 'تحدث مع هيرا كصديق محلي خبير: اكتب ميزانيتك، عدد الأفراد، وما تحتاجه، وستقوم بحساب التكلفة بالكامل وتنسيق رحلتك مع ترشيح الأماكن الحقيقية بالصور والأسعار وروابط الحجز الفوري.'
              : 'Chat with Hara as your local insider: share your budget and preferences to get a bespoke vacation plan with real places, accurate financial math, and direct reservations.'}
          </p>
        </div>
      </div>

      {/* Main Conversational AI Chat Window */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[720px] animate-fadeIn">
        
        {/* Top Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ar' ? 'الترشيحات تقتصر حصرياً على الأماكن المعتمدة الـ 75 في التطبيق' : 'Recommendations strictly from verified 75 places in app'}</span>
          </div>

          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'بدء محادثة جديدة' : 'New chat'}</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#FAF8F5]/60">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-10 h-10 rounded-2xl bg-[#032733] text-amber-300 flex items-center justify-center shrink-0 shadow-md mt-1">
                  <Sparkles className="w-5 h-5" />
                </div>
              )}

              <div className="max-w-[92%] sm:max-w-[82%] space-y-3">
                {/* Message Bubble */}
                <div
                  className={`p-4 sm:p-5 rounded-3xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#032733] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Recommendation Place Cards */}
                {msg.places && msg.places.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'ar' ? 'الأماكن المرشحة لك من التطبيق:' : 'Verified places matched for you:'}</span>
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

          {chatLoading && (
            <div className="flex gap-3 items-center text-slate-600 text-xs py-3">
              <div className="w-10 h-10 rounded-2xl bg-[#032733] text-amber-300 flex items-center justify-center shrink-0 animate-pulse">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                <RefreshCw className="w-4 h-4 animate-spin text-[#f0644b]" />
                <span className="font-semibold">
                  {lang === 'ar' ? 'هيرا تحسب ميزانيتك وتجهز لك أفضل خطة...' : 'Hara is calculating your budget and matching places...'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions Chips */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider shrink-0 ps-1 flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-[#f0644b]" />
            <span>{lang === 'ar' ? 'أفكار سريعة:' : 'Quick ideas:'}</span>
          </span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleChatSend(lang === 'ar' ? qp.ar : qp.en)}
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
            handleChatSend();
          }}
          className="p-4 bg-white border-t border-slate-200 flex items-center gap-3 shrink-0"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'اكتب ميزانيتك وطلبك (مثال: أنا وصاحبي ومعانا 1500 ج وعايزين ناكل سمك ع البحر)...'
                : 'Enter your budget & details (e.g. 1500 EGP for seafood with a friend)...'
            }
            className="flex-1 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-[#032733] text-sm px-5 py-3 rounded-2xl border border-transparent focus:border-[#f0644b]/50 focus:outline-none focus:ring-2 focus:ring-[#f0644b]/20 transition-all font-medium"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || chatLoading}
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
