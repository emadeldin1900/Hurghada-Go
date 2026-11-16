// Hara AI - Red Sea Concierge & Smart Recommendation Engine
// Provides itinerary planning, travel advice, and contextual recommendations for Hurghada & Red Sea

export const HARA_PRESETS = [
  {
    id: 'kids-3days',
    labelEn: '3 days with kids',
    labelAr: '3 أيام مع العائلة والأطفال',
    titleEn: 'Family Fun & Gentle Waters',
    titleAr: 'مرح عائلي ومياه هادئة',
    subtitleEn: '3 days · Relaxed pace · Shallow beaches & dolphins',
    subtitleAr: '3 أيام · وتيرة مريحة · شواطئ ضحلة ودلافين',
    days: [
      {
        day: 1,
        titleEn: 'Old Town, Grand Aquarium & Sunset Marina',
        titleAr: 'أكواريوم الغردقة والممشى والغروب في المارينا',
        stops: [
          { time: '09:30 AM', place: 'Hurghada Grand Aquarium', noteEn: 'Interactive marine life & underwater tunnel', noteAr: 'نفق مائي وحياة بحرية تفاعلية' },
          { time: '01:00 PM', place: 'Marina Boulevard Lunch', noteEn: 'Kid-friendly seaside lunch at The Lodge', noteAr: 'غداء مطل على اليخوت' },
          { time: '04:30 PM', place: 'Sahl Hasheesh Boardwalk Walk', noteEn: 'Rent family quad cycles along the coast', noteAr: 'تأجير دراجات عائلية على الكورنيش' }
        ]
      },
      {
        day: 2,
        titleEn: 'Orange Bay Shallow Beach & Coral Snorkel',
        titleAr: 'يوم شاطئي في خليج أورانج باي وجزيرة الجفتون',
        stops: [
          { time: '08:30 AM', place: 'Boat Departure to Orange Bay', noteEn: 'Shallow sandbars perfect for non-swimmers', noteAr: 'رمال بيضاء ومياه ضحلة آمنة تماماً' },
          { time: '12:30 PM', place: 'Island Buffet & Shaded Cabana', noteEn: 'Fresh tropical fruits and lunch', noteAr: 'استراحة وتناول الغداء في كابانا مظللة' },
          { time: '03:00 PM', place: 'Dolphin House Snorkeling', noteEn: 'Protected lagoon reef stop', noteAr: 'مشاهدة الدلافين والأسماك الملونة' }
        ]
      },
      {
        day: 3,
        titleEn: 'Submarine Safari & Stargazing Dinner',
        titleAr: 'غواصة السندباد وعشاء بدوي تحت النجوم',
        stops: [
          { time: '10:00 AM', place: 'Sinbad Submarine Dive', noteEn: 'Go 22m deep without getting wet', noteAr: 'الغوص لعمق 22 متراً دون بلل' },
          { time: '04:00 PM', place: 'Gentle Desert Quad & Bedouin Camp', noteEn: 'Camel rides, bread making & telescope stargazing', noteAr: 'ركوب الجمال وتلسكوب لرصد النجوم' }
        ]
      }
    ]
  },
  {
    id: 'reefs-beginners',
    labelEn: 'Best reefs for beginners',
    labelAr: 'أفضل الشعاب المرجانية للمبتدئين',
    titleEn: 'Crystal Clear & Safe Reefs',
    titleAr: 'شعاب ساحرة بمياه هادئة للمبتدئين',
    subtitleEn: 'Calm lagoons · High visibility · Shallow plateaus',
    subtitleAr: 'بحيرات هادئة · رؤية ممتازة · مسطحات مرجانية قريبة',
    days: [
      {
        day: 1,
        titleEn: 'Mahmya Eco-Beach House',
        titleAr: 'محمية وجزيرة الجفتون البيئية',
        stops: [
          { time: '09:00 AM', place: 'Mahmya Marine Sanctuary', noteEn: 'Protected reef just 20m from shore', noteAr: 'شعاب مرجانية تبعد 20 متراً فقط عن الشاطئ' },
          { time: '02:00 PM', place: 'Guided Snorkel Tour', noteEn: 'Local marine biologist guide with safety float', noteAr: 'جولة استكشافية برفقة مرشد بحري متخصص' }
        ]
      },
      {
        day: 2,
        titleEn: 'Shaab El Erg & Dolphin Lagoon',
        titleAr: 'شعاب عرق وبحيرة الدلافين',
        stops: [
          { time: '08:00 AM', place: 'North Reefs Boat Cruise', noteEn: 'Sheltered horseshoe-shaped reef', noteAr: 'شعاب مرجانية محمية من الأمواج' },
          { time: '01:30 PM', place: 'Anemone City & Clownfish Haven', noteEn: 'Super easy 2-meter depth observation', noteAr: 'مشاهدة أسماك النيمو على عمق مترين فقط' }
        ]
      }
    ]
  },
  {
    id: 'romantic-weekend',
    labelEn: 'A romantic long weekend',
    labelAr: 'عطلة رومانسية هادئة',
    titleEn: 'Secluded Bays & Sunset Yacht',
    titleAr: 'خلجان هادئة ويخوت خاصة عند الغروب',
    subtitleEn: '3 days · Sahl Hasheesh & El Gouna · Intimate dining',
    subtitleAr: '3 أيام · الجونة وسهل حشيش · عشاء على ضوء الشموع',
    days: [
      {
        day: 1,
        titleEn: 'Sahl Hasheesh Sunken City & Spa',
        titleAr: 'المدينة الغارقة في سهل حشيش والسبا',
        stops: [
          { time: '10:00 AM', place: 'Sunken City Bay Snorkeling', noteEn: 'Ancient underwater columns and calm waters', noteAr: 'أعمدة كلاسيكية ساحرة تحت الماء' },
          { time: '06:30 PM', place: 'Piazza Candlelight Dinner', noteEn: 'Overlooking illuminated dancing fountains', noteAr: 'عشاء رومانسي بجانب النافورة المضاءة' }
        ]
      },
      {
        day: 2,
        titleEn: 'Private Sunset Catamaran in El Gouna',
        titleAr: 'كاتاماران خاص عند الغروب في الجونة',
        stops: [
          { time: '02:00 PM', place: 'El Gouna Lagoon & Marina Walk', noteEn: 'Boutiques, artisan gelato & art galleries', noteAr: 'جولة بين بحيرات الجونة والمارينا' },
          { time: '05:00 PM', place: 'Sunset Sail with Canapés', noteEn: 'Watch the sun dip behind the Red Sea mountains', noteAr: 'إبحار خاص لمشاهدة غروب الشمس خلف الجبال' }
        ]
      },
      {
        day: 3,
        titleEn: 'Private Beach Cabana & Seafood Feast',
        titleAr: 'كابانا شاطئية خاصة ووليمة مأكولات بحرية',
        stops: [
          { time: '11:00 AM', place: 'Old Palace Beach Club', noteEn: 'Plush daybed and turquoise infinity reef', noteAr: 'استرخاء في كابانا شاطئية فاخرة' },
          { time: '07:30 PM', place: 'Star Fish Luxury Seafood', noteEn: 'Fresh Red Sea Lobster & local Catch of the Day', noteAr: 'أشهى مأكولات بحرية طازجة من صيد اليوم' }
        ]
      }
    ]
  }
];

export const haraAI = {
  getPresets() {
    return HARA_PRESETS;
  },

  async generatePlan({ prompt = '', presetId = null, durationDays = 3, style = 'balanced' }) {
    await new Promise(r => setTimeout(r, 800));

    if (presetId) {
      const match = HARA_PRESETS.find(p => p.id === presetId);
      if (match) return match;
    }

    // Keyword heuristics for instant responses
    const lower = prompt.toLowerCase();
    if (lower.includes('kid') || lower.includes('طفل') || lower.includes('عائل')) {
      return HARA_PRESETS[0];
    }
    if (lower.includes('reef') || lower.includes('غوص') || lower.includes('مرجان') || lower.includes('شعب')) {
      return HARA_PRESETS[1];
    }
    if (lower.includes('romantic') || lower.includes('رومانس') || lower.includes('شهر عسل') || lower.includes('زوج')) {
      return HARA_PRESETS[2];
    }

    // Default dynamic plan
    return {
      id: 'custom-' + Date.now(),
      labelEn: prompt || 'Personalized Red Sea Itinerary',
      labelAr: prompt || 'برنامجك المخصص للبحر الأحمر',
      titleEn: 'Your Tailored Hurghada Journey',
      titleAr: 'رحلتك الخاصة والمختارة في الغردقة',
      subtitleEn: `${durationDays} days · Optimized for ${style} pace · Handpicked highlights`,
      subtitleAr: `${durationDays} أيام · مخصصة لتفضيلاتك · أفضل التجارب الحصرية`,
      days: [
        {
          day: 1,
          titleEn: 'Coastal Introduction & Marina Magic',
          titleAr: 'الوصول، استكشاف الساحل والمارينا',
          stops: [
            { time: '10:00 AM', place: 'Arrival & Beach Relaxation', noteEn: 'Unwind at Sahl Hasheesh bay', noteAr: 'استرخاء على شاطئ سهل حشيش' },
            { time: '02:00 PM', place: 'Fresh Catch Lunch', noteEn: 'Local Red Sea specialties', noteAr: 'غداء مأكولات بحرية طازجة' },
            { time: '06:00 PM', place: 'Hurghada Marina Sunset', noteEn: 'Stroll among yachts & cozy cafes', noteAr: 'جولة بين اليخوت وأجمل المقاهي' }
          ]
        },
        {
          day: 2,
          titleEn: 'Island Waters & Coral Gardens',
          titleAr: 'يوم الجزر والسباحة مع الأسماك الملونة',
          stops: [
            { time: '08:30 AM', place: 'Giftun Island Speedboat', noteEn: 'Turquoise lagoons & vibrant corals', noteAr: 'قارب سريع إلى جزر الجفتون الخلابة' },
            { time: '03:00 PM', place: 'Dolphin Spotting & Snorkel', noteEn: 'Calm water protected reef', noteAr: 'مشاهدة الدلافين والسباحة في الشعاب' }
          ]
        },
        {
          day: 3,
          titleEn: 'Desert Horizons & Bedouin Nights',
          titleAr: 'سحر الصحراء والعشاء البدوي',
          stops: [
            { time: '03:30 PM', place: 'Sunset Desert Safari by ATV', noteEn: 'Golden hour mountain views', noteAr: 'رحلة بيتش باجي بين سلاسل الجبال' },
            { time: '07:30 PM', place: 'Bedouin Dinner & Stargazing', noteEn: 'Traditional barbecue & open telescope', noteAr: 'عشاء بدوي تقليدي ورصد النجوم' }
          ]
        }
      ]
    };
  }
};
