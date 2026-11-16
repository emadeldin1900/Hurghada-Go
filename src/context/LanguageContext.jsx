import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const DICTIONARY = {
  en: {
    brandName: 'Go Hurghada',
    brandTagline: 'YOUR GUIDE TO THE RED SEA',
    navExplore: 'Explore',
    navThingsToDo: 'Things to do',
    navStay: 'Stay',
    navEatDrink: 'Eat & drink',
    navTripIdeas: 'Trip ideas',
    navAiPlanner: 'AI Planner',
    navSaved: 'Saved',
    signIn: 'Sign in',
    signOut: 'Sign out',
    signUp: 'Sign up',
    myProfile: 'My Profile',
    heroEyebrow: "EGYPT'S RED SEA COAST",
    heroTitle: 'Your Red Sea story starts here.',
    heroSubtitle: 'Local insight for turquoise reefs, desert horizons, unforgettable tables and the stays worth crossing the sea for.',
    searchTabAll: 'All',
    searchTabHotels: 'Hotels',
    searchTabRestaurants: 'Restaurants',
    searchTabActivities: 'Activities',
    searchTabBeaches: 'Beaches',
    searchTabRentals: 'Rentals',
    searchWhereLabel: 'Where do you want to go?',
    searchWherePlaceholder: 'Search Marina, El Gouna, Sahl Hasheesh…',
    searchWhenLabel: 'When?',
    searchWhenPlaceholder: 'Add dates',
    searchGuestsLabel: 'Travelers',
    searchGuestsPlaceholder: '2 guests',
    categoriesEyebrow: 'FIND YOUR KIND OF HURGHADA',
    categoriesTitle: 'Explore by category',
    categoriesProof: 'Handpicked by locals who live, dive and eat here.',
    featuredEyebrow: 'START WITH THE ICONS',
    featuredTitle: 'Places everyone talks about',
    featuredSubtitle: 'The essential Red Sea stops, selected for first-time wonder and repeat-visit magic.',
    seeAllPlaces: 'See all places',
    aiEyebrow: 'MEET HARA, YOUR AI LOCAL GUIDE',
    aiTitle: 'A better trip, planned in minutes.',
    aiSubtitle: 'Tell Hara your dates, travel style and must-dos. Get a flexible Hurghada itinerary with real travel times, local tips and bookable picks.',
    aiAssuranceFree: 'Free to use',
    aiAssuranceSave: 'Save & edit anytime',
    aiBadge: 'AI trip planner',
    aiOnline: 'Online · Local guide mode',
    aiInputPlaceholder: 'Ask Hara anything (e.g. 3 days with kids, best coral reefs)…',
    aiGenerateBtn: 'Generate Itinerary',
    signaturesEyebrow: 'ONLY IN HURGHADA',
    signaturesTitle: 'Signature Red Sea Experiences',
    signaturesSubtitle: 'World-renowned dives, wild dolphins and protected island sanctuaries.',
    reviewsEyebrow: 'TRUSTED BY TRAVELERS',
    reviewsTitle: 'Real Stories from the Coast',
    partnerEyebrow: 'ARE YOU A LOCAL BUSINESS?',
    partnerTitle: 'List your stay, restaurant or excursion',
    partnerSubtitle: 'Connect with curious travelers looking for authentic Hurghada experiences.',
    partnerBtn: 'Partner with Go Hurghada',
    footerBrandDesc: 'Independent local guidance for better days in Hurghada and across Egypt’s Red Sea coast.',
    footerContactTitle: 'Contact & Location',
    footerQuickLinks: 'Quick Links',
    footerLegalTitle: 'Privacy & Terms',
    footerCopyright: '© 2025 Go Hurghada. All rights reserved.',
    backToTop: 'Back to top'
  },
  ar: {
    brandName: 'جو غردقة',
    brandTagline: 'دليلك السياحي للبحر الأحمر',
    navExplore: 'استكشف',
    navThingsToDo: 'الأنشطة والرحلات',
    navStay: 'الإقامة والفنادق',
    navEatDrink: 'المطاعم والمقاهي',
    navTripIdeas: 'خطط الرحلات',
    navAiPlanner: 'المساعد الذكي هيرا',
    navSaved: 'المحفوظات',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    signUp: 'إنشاء حساب',
    myProfile: 'حسابي',
    heroEyebrow: 'ساحل البحر الأحمر، مصر',
    heroTitle: 'قصة عطلتك في البحر الأحمر تبدأ هنا.',
    heroSubtitle: 'دليل محلي استثنائي لأجمل الشعاب المرجانية، وسحر الصحراء، وأشهى المأكولات، والفنادق التي تستحق السفر لأجلها.',
    searchTabAll: 'الكل',
    searchTabHotels: 'فنادق',
    searchTabRestaurants: 'مطاعم',
    searchTabActivities: 'أنشطة',
    searchTabBeaches: 'شواطئ',
    searchTabRentals: 'تأجير',
    searchWhereLabel: 'إلى أين تريد الذهاب؟',
    searchWherePlaceholder: 'ابحث عن المارينا، الجونة، سهل حشيش…',
    searchWhenLabel: 'التاريخ',
    searchWhenPlaceholder: 'حدد الموعد',
    searchGuestsLabel: 'المسافرون',
    searchGuestsPlaceholder: 'مسافران',
    categoriesEyebrow: 'اختر نوع مغامرتك في الغردقة',
    categoriesTitle: 'استكشف حسب الفئة',
    categoriesProof: 'مختارة بعناية من سكان محليين وخبراء غوص يعيشون هنا.',
    featuredEyebrow: 'ابدأ بالمعالم الأيقونية',
    featuredTitle: 'أماكن يتحدث عنها الجميع',
    featuredSubtitle: 'محطات البحر الأحمر الأساسية، صُممت لتمنحك متعة الزيارة الأولى وسحر العودة الدائمة.',
    seeAllPlaces: 'عرض جميع الأماكن',
    aiEyebrow: 'تعرّف على هيرا، مرشدتك بالذكاء الاصطناعي',
    aiTitle: 'رحلة أفضل، خُططت في دقائق معدودة.',
    aiSubtitle: 'أخبر هيرا بمواعيدك وأسلوب سفرك وتفضيلاتك، وستحصل على برنامج مرن للغردقة بأوقات انتقال حقيقية وترشيحات قابلة للحجز الفوري.',
    aiAssuranceFree: 'مجاني تماماً للاستخدام',
    aiAssuranceSave: 'احفظ وعدّل في أي وقت',
    aiBadge: 'مخطط الرحلات الذكي',
    aiOnline: 'متصل الآن · وضع المرشد المحلي',
    aiInputPlaceholder: 'اسأل هيرا عن أي شيء (مثال: 3 أيام مع العائلة، أفضل أماكن الغوص)…',
    aiGenerateBtn: 'صمّم خطة الرحلة',
    signaturesEyebrow: 'حصرياً في الغردقة',
    signaturesTitle: 'تجارب البحر الأحمر المميزة',
    signaturesSubtitle: 'مواقع غوص عالمية، دلافين طليقة، ومحميات جزر بيئية نادرة.',
    reviewsEyebrow: 'موثوق من المسافرين',
    reviewsTitle: 'تجارب وقصص حقيقية من الساحل',
    partnerEyebrow: 'هل تملك نشاطاً سياحياً محلياً؟',
    partnerTitle: 'أدرج فندقك، مطعمك أو رحلاتك البحرية',
    partnerSubtitle: 'تواصل مع آلاف المسافرين الباحثين عن تجارب حقيقية في الغردقة.',
    partnerBtn: 'انضم كشريك في جو غردقة',
    footerBrandDesc: 'دليل محلي مستقل لأيام أجمل في الغردقة وعلى امتداد ساحل البحر الأحمر المصري.',
    footerContactTitle: 'التواصل والموقع',
    footerQuickLinks: 'روابط سريعة',
    footerLegalTitle: 'الخصوصية والشروط',
    footerCopyright: '© 2025 جو غردقة. جميع الحقوق محفوظة.',
    backToTop: 'إلى الأعلى'
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('gohurghada_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('gohurghada_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return DICTIONARY[lang]?.[key] || DICTIONARY.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRtl: lang === 'ar', t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
