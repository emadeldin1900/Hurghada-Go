// Hurghada Go - Curated Places, Categories and Experiences Data
// Aligned with Figma Customer Design System & Registry

export const CATEGORIES_DATA = [
  {
    id: 'diving',
    nameEn: 'Dive & snorkel',
    nameAr: 'غوص وسنوركلينج',
    countEn: '84 experiences',
    countAr: '84 تجربة',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    slug: 'diving'
  },
  {
    id: 'islands',
    nameEn: 'Island escapes',
    nameAr: 'رحلات الجزر',
    countEn: '12 islands',
    countAr: '12 جزيرة',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    slug: 'islands'
  },
  {
    id: 'safari',
    nameEn: 'Desert adventures',
    nameAr: 'مغامرات السفاري',
    countEn: '36 tours',
    countAr: '36 جولة',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    slug: 'safari'
  },
  {
    id: 'hotels',
    nameEn: 'Hotels & resorts',
    nameAr: 'فنادق ومنتجعات',
    countEn: '146 stays',
    countAr: '146 إقامة',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    slug: 'hotels'
  },
  {
    id: 'restaurants',
    nameEn: 'Eat & drink',
    nameAr: 'مطاعم ومقاهي',
    countEn: '220 places',
    countAr: '220 مكاناً',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    slug: 'restaurants'
  },
  {
    id: 'nightlife',
    nameEn: 'Nightlife & Lounges',
    nameAr: 'سهرات وأمسيات',
    countEn: '48 spots',
    countAr: '48 وجهة',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
    slug: 'nightlife'
  }
];

export const PLACES_DATA = [
  {
    id: 'orange-bay',
    name: 'Orange Bay',
    nameAr: 'أورانج باي',
    category: 'islands',
    tagEn: 'Island favorite',
    tagAr: 'الأكثر شعبية في الجزر',
    rating: 4.8,
    reviewsCount: '2.4k',
    location: 'Giftun Islands · 35 min by boat',
    locationAr: 'جزر الجفتون · 35 دقيقة بالقارب',
    priceEn: 'Day trips from EGP 1,650',
    priceAr: 'رحلات يومية تبدأ من 1,650 ج.م',
    priceValue: 1650,
    currency: 'EGP',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    description: 'A slice of the Caribbean in the Red Sea. Shallow turquoise waters, wooden swings in the sea, plush beanbags, and panoramic island views.',
    descriptionAr: 'قطعة من الكاريبي في قلب البحر الأحمر. مياه فيروزية ضحلة، مراجيح خشبية داخل المياه، وأجواء استرخاء لا تُنسى.',
    featured: true,
    tags: ['Island', 'Beach', 'Snorkeling', 'Family']
  },
  {
    id: 'hurghada-marina',
    name: 'Hurghada Marina',
    nameAr: 'مارينا الغردقة الجديدة',
    category: 'restaurants',
    tagEn: 'Best at sunset',
    tagAr: 'الأجمل عند الغروب',
    rating: 4.7,
    reviewsCount: '5.1k',
    location: 'Sekalla · Central Hurghada',
    locationAr: 'السقالة · وسط الغردقة',
    priceEn: 'Free to explore',
    priceAr: 'دخول مجاني للتنزه',
    priceValue: 0,
    currency: 'EGP',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    description: 'The premier promenade in Hurghada. Hundreds of luxury yachts, waterfront dining, open-air cafes, international cuisine and vibrant sunset views.',
    descriptionAr: 'الممشى السياحي الأول في الغردقة، يضم مئات اليخوت الفاخرة والمطاعم والمقاهي العالمية المطلة على البحر مباشرة.',
    featured: true,
    tags: ['Promenade', 'Dining', 'Yachts', 'Nightlife']
  },
  {
    id: 'sahl-hasheesh-boardwalk',
    name: 'Sahl Hasheesh Boardwalk',
    nameAr: 'ممشى سهل حشيش والكورنيش',
    category: 'beaches',
    tagEn: 'Top rated',
    tagAr: 'أعلى تقييم',
    rating: 4.9,
    reviewsCount: '3.8k',
    location: 'Sahl Hasheesh Bay · 18 km South',
    locationAr: 'خليج سهل حشيش · 18 كم جنوباً',
    priceEn: 'Free promenade access',
    priceAr: 'ممشى مجاني وإطلالة خلابة',
    priceValue: 0,
    currency: 'EGP',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80',
    description: '12-kilometer seaside promenade framed by palm trees, oriental arches, illuminated fountains and the Sunken City reef right off the pier.',
    descriptionAr: 'كورنيش بطول 12 كيلومتراً تحيط به أشجار النخيل والنافورات المضيئة والمدينة الغارقة التي يمكن رؤيتها والسباحة فيها.',
    featured: true,
    tags: ['Beach', 'Sunset', 'Cycling', 'Luxury']
  },
  {
    id: 'steigenberger-aldau',
    name: 'Steigenberger ALDAU Beach Hotel',
    nameAr: 'فندق شتايجنبرجر ألدو بيتش',
    category: 'hotels',
    tagEn: 'Luxury stay',
    tagAr: 'إقامة فاخرة 5 نجوم',
    rating: 4.9,
    reviewsCount: '4.2k',
    location: 'Yussif Afifi Road · Hurghada',
    locationAr: 'طريق يوسف عفيفي · الغردقة',
    priceEn: 'From EGP 7,500 / night',
    priceAr: 'تبدأ من 7,500 ج.م / ليلة',
    priceValue: 7500,
    currency: 'EGP',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    description: 'A 5-star haven of luxury. Lazy river, massive private sandy beach, championship 9-hole golf course, Thalasso spa and gourmet restaurants.',
    descriptionAr: 'منتجع 5 نجوم راقٍ بنهر هادئ (Lazy River)، شاطئ خاص ممتد، ملاعب جولف، ومطاعم استثنائية.',
    featured: true,
    tags: ['Hotels', 'Resort', 'Spa', 'Beach']
  },
  {
    id: 'star-fish-restaurant',
    name: 'Star Fish Restaurant',
    nameAr: 'مطعم ستار فيش للأسماك',
    category: 'restaurants',
    tagEn: 'Local icon',
    tagAr: 'أيقونة المأكولات البحرية',
    rating: 4.6,
    reviewsCount: '6.5k',
    location: 'Sheraton Road · Sekalla',
    locationAr: 'شارع الشيراتون · السقالة',
    priceEn: 'Avg. EGP 450 per person',
    priceAr: 'متوسط 450 ج.م للفرد',
    priceValue: 450,
    currency: 'EGP',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
    description: 'The most famous seafood institution in Hurghada since 1990. Choose your fresh catch on ice—lobster, shrimp, calamari, red sea grouper—cooked to your taste.',
    descriptionAr: 'أشهر مطعم مأكولات بحرية في الغردقة منذ عام 1990. اختر صيدك الطازج بنفسك ليُطهى حسب طلبك.',
    featured: true,
    tags: ['Seafood', 'Local Dining', 'Fresh Fish']
  },
  {
    id: 'desert-safari-sunset',
    name: 'Quad Bike ATV Desert Safari',
    nameAr: 'سفاري البيتش باجي والعشاء البدوي',
    category: 'safari',
    tagEn: 'Top adventure',
    tagAr: 'المغامرة الأكثر طلباً',
    rating: 4.9,
    reviewsCount: '3.1k',
    location: 'Eastern Desert · Hotel Pickup',
    locationAr: 'الصحراء الشرقية · يشمل التوصيل',
    priceEn: 'From EGP 950 / person',
    priceAr: 'تبدأ من 950 ج.م للفرد',
    priceValue: 950,
    currency: 'EGP',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    description: 'Thrilling quad bike ride through golden sand dunes, camel ride, traditional Bedouin barbecue dinner with folklore show and telescope stargazing.',
    descriptionAr: 'جولة مثيرة بدراجات الدفع الرباعي وسط الكثبان الرملية، وركوب الجمال، وعشاء بدوي مشوي مع رصد للنجوم بالتلسكوب.',
    featured: true,
    tags: ['Safari', 'Adventure', 'Bedouin', 'Sunset']
  }
];

export const SIGNATURE_EXPERIENCES = [
  {
    id: 'thistlegorm',
    titleEn: 'SS Thistlegorm World-Class Wreck Dive',
    titleAr: 'غوص حطام سفينة ثيستلغورم العالمية',
    badgeEn: 'Ranked Top 10 World Wreck',
    badgeAr: 'ضمن أفضل 10 مواقع غوص عالمياً',
    descEn: 'WWII locomotive, motorbikes and ammunition preserved in 30-meter crystal waters.',
    descAr: 'قاطرات وشاحنات حربية من الحرب العالمية الثانية محفوظة في قاع البحر على عمق 30 متراً.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    durationEn: 'Full Day · 2 Dives',
    durationAr: 'يوم كامل · غطستان'
  },
  {
    id: 'dolphin-house',
    titleEn: 'Shaab El Erg Dolphin Sanctuary',
    titleAr: 'محمية دلافين شعاب عرق (الدولفين هاوس)',
    badgeEn: 'Wild Spinner Dolphins',
    badgeAr: 'دلافين حرة تسبح معك في بيئتها',
    descEn: 'Swim safely alongside friendly pods of wild dolphins in their natural horseshoe reef sanctuary.',
    descAr: 'السباحة بأمان بجوار أسراب الدلافين الدوارة الحرة في بيئتها الطبيعية الهادئة.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80',
    durationEn: '8 Hours · Lunch Included',
    durationAr: '8 ساعات · يشمل الغداء'
  },
  {
    id: 'mahmya-island',
    titleEn: 'Mahmya Eco Island Retreat',
    titleAr: 'ملاذ جزيرة محمية البيئي الفاخر',
    badgeEn: 'Eco-Certified Beach',
    badgeAr: 'شاطئ بيئي معتمد',
    descEn: 'Untouched white sand beach, vibrant shallow corals, organic Italian-Mediterranean lunch, open sea lounge.',
    descAr: 'رمال بيضاء نقية، مأكولات بحرية وبيتزا إيطالية طازجة، وتجربة استرخاء فاخرة بعيداً عن الصخب.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    durationEn: 'Full Day · VIP Access',
    durationAr: 'يوم كامل · دخول VIP'
  }
];

export const TRAVELER_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    origin: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop',
    rating: 5,
    titleEn: 'Hara planned the best 4 days of my life',
    titleAr: 'هيرا نظمت لي أجمل 4 أيام في حياتي',
    commentEn: 'We were overwhelmed by options until we used the AI assistant. Orange Bay and the sunset safari were booked seamlessly with zero hassle.',
    commentAr: 'كنا محتارين بين الخيارات حتى جربنا المساعد الذكي. حجزنا أورانج باي وسفاري الغروب بكل سهولة ودون أي وسيط.',
    date: 'November 2024'
  },
  {
    id: 'rev-2',
    author: 'أحمد وريم المهدي',
    origin: 'الرياض، السعودية',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop',
    rating: 5,
    titleEn: 'Perfect Arabic support and accurate prices',
    titleAr: 'تجربة عربية استثنائية وأسعار دقيقة جداً',
    commentEn: 'Everything was transparent. The recommendations for Sahl Hasheesh restaurants and quiet reefs were 10/10.',
    commentAr: 'التطبيق مريح جداً، والترشيحات لمطاعم سهل حشيش والشواطئ الهادئة كانت ممتازة ومطابقة للواقع بنسبة 100%.',
    date: 'أكتوبر 2024'
  },
  {
    id: 'rev-3',
    author: 'Markus Weber',
    origin: 'Munich, Germany',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop',
    rating: 5,
    titleEn: 'Real insider advice, not generic tourist traps',
    titleAr: 'نصائح حقيقية من أهل البلد وتفادي فخاخ السياح',
    commentEn: 'The dive center recommendations saved us money and gave us access to pristine reef spots away from mass tour boats.',
    commentAr: 'ترشيحات مراكز الغوص وفرت علينا مبالغ كبيرة وأخذتنا لأماكن شعاب مرجانية نقية وبعيدة عن زحام المراكب الكبيرة.',
    date: 'نوفمبر 2024'
  }
];
