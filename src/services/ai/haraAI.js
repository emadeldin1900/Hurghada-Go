// Hara AI - Red Sea Concierge & Smart Recommendation Engine
// Powered by Google Gemini AI & Curated Real Hurghada Directory
import { geminiService } from './geminiService';

export const HARA_PRESETS = [
  {
    id: 'kids-3days',
    labelEn: '3 days with kids',
    labelAr: '3 أيام مع العائلة والأطفال',
    titleEn: 'Family Fun & Gentle Waters',
    titleAr: 'مرح عائلي ومياه هادئة',
    subtitleEn: '3 days · Relaxed pace · Shallow beaches & dolphins',
    subtitleAr: '3 أيام · وتيرة مريحة · شواطئ ضحلة ودلافين',
    source: 'preset',
    days: [
      {
        day: 1,
        titleEn: 'Grand Aquarium, Sahl Hasheesh & Sunset Marina',
        titleAr: 'أكواريوم الغردقة والممشى والغروب في المارينا',
        stops: [
          { time: '09:30 AM', place: 'Hurghada Grand Aquarium', placeAr: 'أكواريوم الغردقة الكبير', placeId: 'hurghada-grand-aquarium', noteEn: 'Interactive marine life & underwater tunnel', noteAr: 'نفق مائي وحياة بحرية تفاعلية' },
          { time: '01:30 PM', place: 'Albalcona Restaurant', placeAr: 'مطعم البلكونة', placeId: 'albalcona-restaurant', noteEn: 'Kid-friendly lunch with fresh juices', noteAr: 'غداء عائلي مريح وعصائر طازجة' },
          { time: '05:30 PM', place: 'Hurghada Marina Boulevard', placeAr: 'مارينا الغردقة الجديدة', placeId: 'friends-bar', noteEn: 'Ice cream walk along docked yachts', noteAr: 'جولة مشي وتناول الآيس كريم بين اليخوت' }
        ]
      },
      {
        day: 2,
        titleEn: 'Orange Bay Shallow Beach & Coral Snorkel',
        titleAr: 'يوم شاطئي في خليج أورانج باي وجزيرة الجفتون',
        stops: [
          { time: '08:30 AM', place: 'Orange Bay Island Boat Excursion', placeAr: 'رحلة جزيرة أورانج باي (الجفتون)', placeId: 'orange-bay-island-trip', noteEn: 'Shallow sandbars perfect for non-swimmers and kids', noteAr: 'رمال بيضاء ومياه ضحلة آمنة تماماً للأطفال' },
          { time: '01:00 PM', place: 'Island Buffet & Shaded Cabana', placeAr: 'بوفيه الجزيرة المفتوح', placeId: 'orange-bay-island-trip', noteEn: 'Fresh tropical fruits and lunch on the beach', noteAr: 'استراحة وتناول الغداء في كابانا مظللة' },
          { time: '04:00 PM', place: 'Dolphin House Snorkeling Stop', placeAr: 'وقفة سنوركلينج بمحمية الدلافين', placeId: 'dolphin-watching', noteEn: 'Protected lagoon reef stop', noteAr: 'مشاهدة الدلافين والأسماك الملونة' }
        ]
      },
      {
        day: 3,
        titleEn: 'Semi-Submarine Reefs & Gentle Stargazing',
        titleAr: 'الغواصة شبه المغمورة وعشاء بدوي تحت النجوم',
        stops: [
          { time: '10:00 AM', place: 'Semi-Submarine Cruise', placeAr: 'جولة الغواصة شبه المغمورة', placeId: 'semi-submarine-cruise', noteEn: 'Underwater observation deck without getting wet', noteAr: 'مشاهدة الأسماك والشعاب من النوافذ الزجاجية' },
          { time: '04:00 PM', place: 'Bedouin Dinner & Telescope Stargazing', placeAr: 'عشاء بدوي ورصد النجوم بالتلسكوب', placeId: 'desert-stargazing-dinner', noteEn: 'Camel rides, barbecue & telescope stargazing', noteAr: 'ركوب الجمال وتلسكوب لرصد النجوم والكواكب' }
        ]
      }
    ]
  },
  {
    id: 'reefs-beginners',
    labelEn: 'Best reefs & snorkeling',
    labelAr: 'أفضل الشعاب المرجانية والغوص',
    titleEn: 'Crystal Clear & Safe Reefs',
    titleAr: 'شعاب ساحرة بمياه هادئة للمبتدئين والمحترفين',
    subtitleEn: 'Calm lagoons · High visibility · Shallow plateaus',
    subtitleAr: 'بحيرات هادئة · رؤية ممتازة · مسطحات مرجانية قريبة',
    source: 'preset',
    days: [
      {
        day: 1,
        titleEn: 'Sharm El Naga Protected Coral Bay',
        titleAr: 'محمية خليج شرم النجا الطبيعي',
        stops: [
          { time: '09:00 AM', place: 'Sharm El Naga Coral Bay', placeAr: 'شاطئ شرم النجا الطبيعي', placeId: 'sharm-el-naga-bay', noteEn: 'Protected house reef just 10m from shore', noteAr: 'شعاب مرجانية خلابة تبدأ من حافة الشاطئ مباشرة' },
          { time: '02:00 PM', place: 'Beachside Seafood Lunch', placeAr: 'غداء شاطئي طازج', placeId: 'sharm-el-naga-bay', noteEn: 'Fresh grilled fish overlooking turquoise waters', noteAr: 'سمك مشوي طازج مع إطلالة ساحرة' }
        ]
      },
      {
        day: 2,
        titleEn: 'Full Day Scuba Diving & Dolphin Lagoon',
        titleAr: 'رحلة غوص كاملة في مياه البحر الأحمر',
        stops: [
          { time: '08:30 AM', place: 'Red Sea Scuba Diving Cruise', placeAr: 'يخت الغوص المعتمد PADI', placeId: 'scuba-diving', noteEn: 'Two guided boat dives with certified instructors', noteAr: 'غطستان مع مدربين معتمدين وتوفير كامل المعدات' },
          { time: '01:30 PM', place: 'Shaab El Erg Dolphin Spotting', placeAr: 'شعاب عرق (محمية الدلافين)', placeId: 'dolphin-watching', noteEn: 'Observe wild spinner dolphins in their natural home', noteAr: 'مشاهدة الدلافين الحرة تسبح في بيئتها الطبيعية' }
        ]
      }
    ]
  },
  {
    id: 'romantic-weekend',
    labelEn: 'Romantic weekend getaway',
    labelAr: 'عطلة رومانسية هادئة لشخصين',
    titleEn: 'Secluded Bays & Sunset Dining',
    titleAr: 'خلجان هادئة ويخوت خاصة وعشاء فاخر',
    subtitleEn: '3 days · Sahl Hasheesh & El Gouna · Intimate dining',
    subtitleAr: '3 أيام · الجونة وسهل حشيش · عشاء على ضوء الشموع',
    source: 'preset',
    days: [
      {
        day: 1,
        titleEn: 'Sahl Hasheesh Boardwalk & Italian Dinner',
        titleAr: 'سهل حشيش وعشاء إيطالي فاخر',
        stops: [
          { time: '11:00 AM', place: 'Premier Le Rêve Private Beach', placeAr: 'شاطئ بريمير لو ريف الخاص', placeId: 'premier-le-reve', noteEn: 'Adults-only tranquility and cabana relaxation', noteAr: 'هدوء تام وكابانا شاطئية للأزواج' },
          { time: '07:30 PM', place: 'Bitonto Ristorante', placeAr: 'مطعم بيتنتو الإيطالي', placeId: 'bitonto-ristorante', noteEn: 'Authentic wood-fired pizza and candlelight wine', noteAr: 'بيتزا إيطالية على الحطب وأجواء رومانسية دافئة' }
        ]
      },
      {
        day: 2,
        titleEn: 'El Gouna Lagoons & Sunset Yacht Sail',
        titleAr: 'بحيرات الجونة وإبحار اليخت عند الغروب',
        stops: [
          { time: '02:00 PM', place: 'ZOUNi Beach Club El Gouna', placeAr: 'زوني بيتش كلوب الجونة', placeId: 'zouni-beach-club', noteEn: 'Chic beachside lounge at Mangroovy', noteAr: 'جلسات راقية على شاطئ مانجروفي الجونة' },
          { time: '05:00 PM', place: 'Sunset Yacht Cruise with Snorkeling', placeAr: 'كروز يخت عند الغروب مع السنوركلينج', placeId: 'sunset-yacht-cruise', noteEn: 'Watch the sun dip behind the Red Sea mountains', noteAr: 'إبحار ساحر لمشاهدة غروب الشمس خلف جبال البحر الأحمر' }
        ]
      },
      {
        day: 3,
        titleEn: 'VIP Spa Retreat & Waterfront Nightlife',
        titleAr: 'جلسة سبا ملكية وسهرة على المارينا',
        stops: [
          { time: '11:00 AM', place: 'Cleopatra VIP Spa Package', placeAr: 'باقة كليوباترا VIP للسبا', placeId: 'cleopatra-vip-spa', noteEn: 'Couples massage, Turkish bath and jacuzzi', noteAr: 'مساج استرخائي للزوجين وحمام تركي وجاكوزي' },
          { time: '08:00 PM', place: 'La Cantina Marina Lounge', placeAr: 'لا كانتينا مطعم ولاونج', placeId: 'la-cantina', noteEn: 'Live music, marina views and gourmet cocktails', noteAr: 'موسيقى حية وإطلالة خلابة على اليخوت' }
        ]
      }
    ]
  }
];

export const haraAI = {
  getPresets() {
    return HARA_PRESETS;
  },

  isGeminiEnabled() {
    return geminiService.hasApiKey();
  },

  getGeminiApiKey() {
    return geminiService.getApiKey();
  },

  setGeminiApiKey(key) {
    geminiService.setApiKey(key);
  },

  async testGemini(key) {
    return await geminiService.testConnection(key);
  },

  async askTravelAdvice(question, lang = 'ar') {
    if (geminiService.hasApiKey()) {
      try {
        return await geminiService.askTravelAdvice({ question, lang });
      } catch (err) {
        console.warn('Gemini advice call failed, falling back:', err.message);
      }
    }
    return lang === 'ar'
      ? 'أهلاً بك! الغردقة تتميز بتنوع شواطئها ومواقع الغوص فيها كجزيرة أورانج باي وشرم النجا، بالإضافة للمطاعم المميزة في المارينا وألدو مول.'
      : 'Welcome! Hurghada offers incredible spots like Orange Bay, Sharm El Naga reef, and world-class marina dining.';
  },

  async generatePlan({ prompt = '', presetId = null, durationDays = 3, style = 'balanced', lang = 'ar' }) {
    // 1. If explicit static preset chosen and no custom prompt
    if (presetId && !prompt) {
      const match = HARA_PRESETS.find(p => p.id === presetId);
      if (match) return match;
    }

    // 2. Try Google Gemini API if configured
    if (geminiService.hasApiKey()) {
      try {
        console.log('Generating itinerary with Google Gemini AI...');
        const geminiPlan = await geminiService.generateItinerary({
          prompt: prompt || `${durationDays} days ${style} holiday in Hurghada`,
          durationDays,
          style,
          lang
        });
        if (geminiPlan && geminiPlan.days && geminiPlan.days.length > 0) {
          return {
            ...geminiPlan,
            source: 'gemini'
          };
        }
      } catch (err) {
        console.warn('Gemini live generation notice (using smart fallback):', err.message);
      }
    }

    // 3. Smart Heuristic Local Fallback
    await new Promise(r => setTimeout(r, 600));

    const lower = (prompt || '').toLowerCase();
    if (lower.includes('kid') || lower.includes('طفل') || lower.includes('عائل') || style === 'family') {
      return HARA_PRESETS[0];
    }
    if (lower.includes('reef') || lower.includes('غوص') || lower.includes('مرجان') || lower.includes('شعب') || style === 'diving') {
      return HARA_PRESETS[1];
    }
    if (lower.includes('romantic') || lower.includes('رومانس') || lower.includes('شهر عسل') || lower.includes('زوج') || style === 'romantic') {
      return HARA_PRESETS[2];
    }

    // Dynamic tailored fallback plan using real places from the dataset
    return {
      id: 'custom-' + Date.now(),
      source: 'local-smart',
      labelEn: prompt || 'Personalized Red Sea Itinerary',
      labelAr: prompt || 'برنامجك المخصص للبحر الأحمر',
      titleEn: 'Your Tailored Hurghada Journey',
      titleAr: 'رحلتك الخاصة والمختارة في الغردقة',
      subtitleEn: `${durationDays} days · Optimized for ${style} pace · Handpicked highlights`,
      subtitleAr: `${durationDays} أيام · مخصصة لتفضيلاتك · أفضل التجارب الحصرية`,
      summaryEn: 'A seamless journey combining top Red Sea beaches, island cruises, and vibrant evening waterfront dining.',
      summaryAr: 'برنامج متكامل يجمع بين أرقى الشواطئ، والرحلات البحرية للجزر، وأجمل المطاعم الساحلية.',
      days: [
        {
          day: 1,
          titleEn: 'Coastal Arrival, Beach Club & Marina Sunset',
          titleAr: 'الوصول، استرخاء الشاطئ وغروب المارينا',
          stops: [
            { time: '10:00 AM', place: 'Scandic Private Beach Club', placeAr: 'شاطئ سكانديك ريزورت الخاص', placeId: 'scandic-beach-club', noteEn: 'Unwind at the sandy beach and pool', noteAr: 'استرخاء على الشاطئ والمسبح بعد الوصول' },
            { time: '02:00 PM', place: 'Bitonto Ristorante', placeAr: 'مطعم بيتنتو الإيطالي', placeId: 'bitonto-ristorante', noteEn: 'Authentic wood-fired lunch at ALDAU Mall', noteAr: 'غداء إيطالي فاخر في ألدو فيلدج مول' },
            { time: '06:00 PM', place: 'Che Guevara Marina Lounge', placeAr: 'تشي جيفارا كافيه ومطعم', placeId: 'che-guevara', noteEn: 'Stroll among luxury yachts and sunset drinks', noteAr: 'جولة بين اليخوت الفاخرة ومشروبات الغروب' }
          ]
        },
        {
          day: 2,
          titleEn: 'Orange Bay Cruise & Vibrant Corals',
          titleAr: 'رحلة أورانج باي والسنوركلينج في الجفتون',
          stops: [
            { time: '08:30 AM', place: 'Orange Bay Island Boat Excursion', placeAr: 'رحلة جزيرة أورانج باي (الجفتون)', placeId: 'orange-bay-island-trip', noteEn: 'Turquoise lagoons, sea swings and beach time', noteAr: 'مياه فيروزية مدهشة ومراجيح في قلب البحر' },
            { time: '03:30 PM', place: 'Dolphin House Snorkeling Stop', placeAr: 'محمية دلافين شعاب عرق', placeId: 'dolphin-watching', noteEn: 'Protected lagoon coral observation', noteAr: 'مشاهدة الدلافين والأسماك الملونة' }
          ]
        },
        {
          day: 3,
          titleEn: 'Desert Adventure & Stargazing Bedouin Night',
          titleAr: 'مغامرة البيتش باجي والعشاء البدوي والنجوم',
          stops: [
            { time: '03:00 PM', place: 'Quad Bike ATV Desert Safari', placeAr: 'سفاري بيتش باجي بالصحراء الشرقية', placeId: 'quad-bike-safari', noteEn: 'Exciting dunes ride with mountain backdrop', noteAr: 'قيادة البيتش باجي بين الكثبان الرملية والجبال' },
            { time: '07:00 PM', place: 'Bedouin Dinner & Telescope Stargazing', placeAr: 'عشاء بدوي ورصد النجوم بالتلسكوب', placeId: 'desert-stargazing-dinner', noteEn: 'Open fire barbecue & astronomical viewing', noteAr: 'مشاوي بدوية ورصد الكواكب والمجرات بالتلسكوب' }
          ]
        }
      ]
    };
  }
};
