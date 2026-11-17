// Hurghada Go - Hara AI Concierge Chat Advisor Service
// Strictly recommends places from verified PLACES_DATA (75 places) based on budget & desires
import { PLACES_DATA } from '../../data/placesData.js';
import { geminiService } from './geminiService.js';

// Arabic number mapping for text budgets
const ARABIC_NUMBER_WORDS = {
  'الف': 1000,
  'ألف': 1000,
  'الفين': 2000,
  'ألفين': 2000,
  'ثلاثة الاف': 3000,
  'ثلاث الاف': 3000,
  '٣ الاف': 3000,
  'خمس الاف': 5000,
  'خمسمية': 500,
  'خمسمائة': 500,
  'ستمية': 600,
  'سبعمية': 700,
  'تمنمية': 800,
  'تسعمية': 900,
  'ميتين': 200,
  'مائتين': 200,
  'مية': 100,
  'مائة': 100,
};

// Normalize Arabic text for keyword matching
function normalizeText(txt = '') {
  return txt
    .toLowerCase()
    .replace(/[إأآا]/g, 'ا')
    .replace(/[ة]/g, 'ه')
    .replace(/[ى]/g, 'ي')
    .replace(/[٠-٩]/g, d => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])
    .trim();
}

// Extract budget amount in EGP
export function extractBudget(query = '') {
  const norm = normalizeText(query);
  
  // 1. Direct USD matching ($50, 100 usd, 50 دولار)
  const usdMatch = norm.match(/(\d+)\s*(\$|usd|دولار)/i) || norm.match(/(\$)\s*(\d+)/i);
  if (usdMatch) {
    const val = parseInt(usdMatch[1] || usdMatch[2], 10);
    if (!isNaN(val) && val > 0) {
      return { amount: val * 50, originalAmount: val, currency: 'USD', raw: `${val} $` };
    }
  }

  // 2. Direct number with EGP / ج / جنيه
  const egpMatch = norm.match(/(\d+)\s*(ج|جم|جنيه|egp|le)/i) || norm.match(/(معايا|ميزانيتي|ميزانية|بحدود|في حدود|حدود)\s*(\d+)/i);
  if (egpMatch) {
    const val = parseInt(egpMatch[1] || egpMatch[2], 10);
    if (!isNaN(val) && val > 0) {
      return { amount: val, originalAmount: val, currency: 'EGP', raw: `${val} ج.م` };
    }
  }

  // 3. Word-based Arabic budgets
  for (const [word, val] of Object.entries(ARABIC_NUMBER_WORDS)) {
    if (norm.includes(word)) {
      return { amount: val, originalAmount: val, currency: 'EGP', raw: `${val} ج.م` };
    }
  }

  // 4. Any standalone number >= 100
  const anyNumMatch = norm.match(/\b(\d{3,6})\b/);
  if (anyNumMatch) {
    const val = parseInt(anyNumMatch[1], 10);
    return { amount: val, originalAmount: val, currency: 'EGP', raw: `${val} ج.م` };
  }

  return null;
}

// Detect category intent from query with smart priority handling
export function detectCategory(query = '') {
  const norm = normalizeText(query);

  // 1. Safari / Quad (must catch "بيتش باجي" before beach!)
  if (/سفاري|بيتش باجي|باجي|دراجات رمليه|صحراء|بدوي|جمال|عشاء بدوي|quad/i.test(norm)) {
    return 'safari';
  }

  // 2. Hotels & Resorts (takes priority over aqua park if user asks for "فندق فيه اكوا بارك")
  if (/فندق|منتجع|ريزورت|اوتيل|غرفه|نبيت|سويت|ريزورتس|اقامه|نجوم/i.test(norm)) {
    return 'hotels';
  }

  // 3. Chalets & Stays
  if (/شاليه|فيلا|شقه|استوديو|كمبوند|لاجون/i.test(norm)) {
    return 'chalets';
  }

  // 4. Food & Dining / Cafes (must catch "ناكل سمك على البحر" as food, not beach!)
  if (/مطعم|كافيه|قهوه|اكل|ناكل|نتغدى|نتعشى|نفطر|فطور|غدا|عشا|سمك|سي فود|جمبري|فسفور|بيتزا|برجر|سوشي|شيشه|حلا|حلو|باستا|ايطالي|مشويات/i.test(norm)) {
    return 'restaurants';
  }

  // 5. Diving & Marine Excursions
  if (/غوص|غطس|سنوركلينج|رحله بحريه|يخت|جفتون|شعاب|جزيره|سفينه/i.test(norm)) {
    return 'diving';
  }

  // 6. Aqua Parks & Activities
  if (/اكوا بارك|ملاهي مائيه|غواصه|سندباد|متحف|انشطه|العاب مائيه/i.test(norm)) {
    return 'activities';
  }

  // 7. Beaches & Beach Clubs
  if (/شاطئ|شواطئ|بلاج|بيتش|تان|نزول البحر|مسبح|حمام سباحه|بحر/i.test(norm)) {
    return 'beaches';
  }

  return null;
}

// Local AI Matcher: Strictly filters and scores from PLACES_DATA
export function matchPlacesLocally(query = '', lang = 'ar') {
  const norm = normalizeText(query);
  const budgetInfo = extractBudget(query);
  const detectedCategory = detectCategory(query);

  // 0. Check for unrealistic budget for stays
  if ((detectedCategory === 'hotels' || detectedCategory === 'chalets') && budgetInfo && budgetInfo.amount < 1500) {
    const apology = lang === 'ar'
      ? `أهلاً بك يا صديقي! 🌊\n\nللأسف لا يتوفر لدينا حالياً في دليلنا المعتمد مكان إقامة (فندق أو شاليه) بهذه الميزانية (${budgetInfo.raw})؛ حيث تبدأ أسعار الشاليهات من 1,500 ج.م والفنادق الفاخرة من 2,600 ج.م لليلة.\n\nونعدك بالعمل على إضافة خيارات ونزل اقتصادية تناسب هذا الطلب في التحديثات القادمة بإذن الله! ✨\n\nوفي الوقت الحالي، يمكنك استغلال هذه الميزانية للاستمتاع بأجمل شواطئ وكافيهات الغردقة المرشحة بالأسفل:`
      : `Hello! 🌊\n\nUnfortunately, we currently do not have stays matching this budget (${budgetInfo.raw}). Stays start from 1,500 EGP/night.\n\nWe promise to add more budget-friendly options in upcoming updates! ✨\n\nIn the meantime, consider these great beaches & cafes within your budget:`;
    
    const altPlaces = PLACES_DATA.filter(p => p.category === 'beaches' || p.category === 'restaurants').slice(0, 3);
    return {
      message: apology,
      places: altPlaces,
      source: 'local-ai',
      budgetInfo,
      detectedCategory
    };
  }

  // Scoring function
  const scored = PLACES_DATA.map(place => {
    let score = 0;
    const reasons = [];

    const placeNorm = normalizeText(`${place.name} ${place.nameAr} ${place.description} ${place.descriptionAr} ${place.area} ${place.areaAr} ${(place.tags || []).join(' ')}`);

    // 1. Category match
    if (detectedCategory) {
      if (place.category === detectedCategory) {
        score += 80;
        reasons.push(lang === 'ar' ? 'يتطابق مع الفئة المطلوبة' : 'Matches requested category');
      } else {
        score -= 30;
      }
    }

    // 2. Budget match
    if (budgetInfo) {
      const budget = budgetInfo.amount;
      const placePrice = place.priceValue || 500;

      if (placePrice <= budget) {
        // Fits within budget!
        score += 50;
        const diffPercent = (budget - placePrice) / budget;
        if (diffPercent < 0.4) score += 20; // Very close to budget sweetspot
        reasons.push(lang === 'ar' ? `يناسب ميزانيتك (${place.priceAr})` : `Fits budget (${place.priceEn})`);
      } else if (placePrice <= budget * 1.25) {
        // Slightly above budget (close alternative)
        score += 20;
        reasons.push(lang === 'ar' ? `أعلى قليلاً من ميزانيتك ولكن يستحق (${place.priceAr})` : `Slightly above budget (${place.priceEn})`);
      } else {
        score -= 40; // Too expensive
      }
    }

    // 3. Keyword / Vibe matching
    const keywordWeights = [
      { regex: /سمك|سي فود|جمبري|seafood|fish/i, tag: 'seafood', points: 40, ar: 'مأكولات بحرية طازجة' },
      { regex: /ايطالي|بيتزا|باستا|pizza|pasta|italian/i, tag: 'italian', points: 35, ar: 'بيتزا وباستا إيطالية' },
      { regex: /كافيه|قهوه|لابتوب|شغل|مذاكره|نت|واي فاي|coffee|work/i, tag: 'coffee', points: 35, ar: 'أجواء قهوة وعمل رايقة' },
      { regex: /عائل|اطفال|اولاد|family|kids/i, tag: 'family', points: 30, ar: 'مناسب جداً للعائلات والأطفال' },
      { regex: /رومانس|كوبل|عرسان|شهر عسل|زوجت|خطيبت|هدوء|romantic/i, tag: 'romantic', points: 30, ar: 'أجواء رومانسية وهادئة' },
      { regex: /اصحاب|شباب|شله|سهرة|موسيقى|party|nightlife/i, tag: 'party', points: 25, ar: 'سهرة شبابية وأجواء حيوية' },
      { regex: /بحر|شاطئ رملي|فيو|اطلاله|marina|beach/i, tag: 'beachfront', points: 25, ar: 'إطلالة بحرية مباشرة' },
      { regex: /مارينا|اليخوت/i, tag: 'marina', points: 25, ar: 'في مارينا الغردقة' },
      { regex: /الكوثر/i, tag: 'kawthar', points: 25, ar: 'في منطقة الكوثر' },
      { regex: /الممشى|الداو/i, tag: 'mamsha', points: 25, ar: 'على الممشى السياحي' },
      { regex: /الجونه/i, tag: 'gouna', points: 30, ar: 'في الجونة' },
      { regex: /سهل حشيش/i, tag: 'sahl', points: 30, ar: 'في سهل حشيش' },
      { regex: /اكوا بارك|العاب مائيه/i, tag: 'aqua', points: 35, ar: 'يحتوي على ألعاب مائية وأكوا بارك' },
      { regex: /جفتون|شعاب مرجانيه|غوص/i, tag: 'diving', points: 35, ar: 'رحلات بحرية وشعاب مرجانية خلابة' },
      { regex: /بيتش باجي|سفاري/i, tag: 'safari', points: 35, ar: 'مغامرات بيتش باجي وصحراء' },
    ];

    keywordWeights.forEach(kw => {
      if (kw.regex.test(norm)) {
        if (kw.regex.test(placeNorm)) {
          score += kw.points;
          reasons.push(kw.ar);
        }
      }
    });

    // 4. Rating factor
    score += (place.rating || 4.5) * 4;

    return {
      place,
      score,
      reasons: [...new Set(reasons)].slice(0, 3)
    };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  // Take top 1 to 3
  const topMatches = scored.slice(0, 3).map(s => ({
    ...s.place,
    recommendationReason: s.reasons.join(' · ') || (lang === 'ar' ? 'من أفضل الأماكن تقييماً في الغردقة' : 'Top rated in Hurghada')
  }));

  // Build conversational response
  let replyText = '';
  const first = topMatches[0];

  if (lang === 'ar') {
    if (budgetInfo && detectedCategory) {
      replyText = `بناءً على ميزانيتك (${budgetInfo.raw}) وما تبحث عنه، قمت بفحص دليل الغردقة واخترت لك أفضل مكان متاح ومطابق تماماً:\n\n✨ **${first.nameAr}** في منطقة (${first.areaAr}) بسعر **${first.priceAr}** فقط.\n${first.recommendationReason}.\n\nإليك كروت الأماكن المرشحة من التطبيق لتصفح الصور والأسعار والتفاصيل فوراً:`;
    } else if (budgetInfo) {
      replyText = `وجدت لك أفضل الأماكن في الغردقة التي تناسب ميزانيتك (${budgetInfo.raw}) تماماً:\n\n✨ نرشح لك بالدرجة الأولى **${first.nameAr}** بسعر **${first.priceAr}**.\n${first.recommendationReason}.\n\nيمكنك الاطلاع على تفاصيل الأماكن وحجزها مباشرة بالأسفل:`;
    } else if (detectedCategory) {
      replyText = `بناءً على رغبتك، اخترت لك أفضل ترشيحات من داخل التطبيق:\n\n✨ **${first.nameAr}** (${first.areaAr}) بتقييم ⭐ ${first.rating}.\n${first.recommendationReason}.\n\nتصفح الكروت بالأسفل لمعرفة الأسعار والموقع الدقيق:`;
    } else {
      replyText = `أهلاً بك! لقد قمت بتحليل طلبك واخترت لك أفضل الأماكن المتطابقة من قاعدة بيانات الغردقة:\n\n✨ **${first.nameAr}** في ${first.areaAr}.\n${first.recommendationReason}.`;
    }
  } else {
    replyText = `Based on your request ${budgetInfo ? `and budget of ${budgetInfo.raw}` : ''}, here are the best matched venues exclusively from Hurghada Go:\n\n✨ **${first.name}** in ${first.area} (${first.priceEn}).\n${first.recommendationReason}.`;
  }

  return {
    message: replyText,
    places: topMatches,
    source: 'local-ai',
    budgetInfo,
    detectedCategory
  };
}

// Full Chat Service: tries Gemini first (with strict 75-places grounding), falls back to local AI
export const chatAdvisorService = {
  async askAdvisor({ query = '', history = [], lang = 'ar' }) {
    if (!query.trim()) {
      return {
        message: lang === 'ar' ? 'تفضل بكتابة ميزانيتك وما تحتاجه وسأرشح لك أفضل مكان فوراً!' : 'Please share your budget and what you are looking for!',
        places: [],
        source: 'local-ai'
      };
    }

    // 1. If Gemini API is configured, try calling it with strict grounding
    if (geminiService.hasApiKey()) {
      try {
        const placesSummary = PLACES_DATA.map(p => ({
          id: p.id,
          name: p.name,
          nameAr: p.nameAr,
          category: p.category,
          area: p.area,
          priceEgp: p.priceValue,
          priceText: p.priceEn,
          tags: p.tags?.slice(0, 4)
        }));

        const systemPrompt = `You are "Hara" (هيرا), the smart, vibrant, and beloved local travel concierge and insider friend for Hurghada Go (الغردقة جو).
You are NOT a boring mechanical bot. You speak like a genuine, warm, highly intelligent Egyptian friend who knows every corner of Hurghada like the back of their hand.

YOUR VERIFIED HURGHADA DIRECTORY (75 PLACES ONLY):
${JSON.stringify(placesSummary)}

PERSONA & INTERACTION RULES:
1. TALK LIKE A REAL, WITTY, WARM HUMAN:
   - Speak naturally with polite, warm Egyptian charm (e.g., "يا هلا بيك يا صديقي!", "منور الغردقة مقدماً!", "ألف مبروك يا عريسنا!", "يا مرحب بيك وبالأسرة الكريمة!").
   - Tailor your tone specifically to who is with the user:
     * Friends/Youth (أصحاب / شباب): Energetic, exciting, recommending buzzing spots, seafood feasts, quad desert safaris, and nightlife at the Marina.
     * Couples/Honeymoon (عرسان / زوجتي / رومانسي): Sophisticated, romantic, peaceful, recommending sunset beachfront dinners, tranquil boutique chalets, and quiet beaches.
     * Families with Kids (عائلة / أطفال): Reassuring, caring about child safety, shallow sandy beaches, aqua parks, and spacious comfortable resorts.
     * Solo/Work (لوحدي / لابتوب): Chill, focused, practical recommendations for cafes with great coffee, sea breezes, and fast Wi-Fi.

2. MATH & BUDGET ADVICE (كأنك بتحسب لصاحبك بالقرش):
   - If they specify money and nights/days:
     * Break down the math clearly (الإقامة + البحر والأنشطة + الأكل والشرب).
     * Show them how the budget covers them and celebrate the remaining buffer ("وهيفضل معاك في جيبك حوالي 700 جنيه دلع نفسك بيهم!").
   - If their budget is tight, teach them local smart budgeting tricks without being dismissive.

3. INSIDER SECRETS & PRO-TIPS (أسرار من ابن البلد):
   - Include 1 or 2 authentic local insider tips in your reply (e.g. best time for sunset, avoiding peak crowds, early morning boat departures).

4. STRICT ADHERENCE TO THE 75 PLACES:
   - Recommend places ONLY from the provided 75 places list.
   - For every venue you mention, you MUST include its exact ID in the "placeIds" array.

5. HONESTY ON OUT-OF-SCOPE OR IMPOSSIBLE REQUESTS:
   - If someone asks for something not in our directory (or an impossible budget like 100 EGP for a luxury hotel week):
     Respond warmly and politely: "للأسف يا غالي لا يتوفر لدينا حالياً في دليلنا مكان مطابق تماماً لهذا الطلب أو بهالميزانية في الغردقة، ونعدك بالعمل على إضافة أماكن وتجارب تناسب هذا الطلب في التحديثات القادمة! ✨"
     Then suggest the closest realistic alternative from the 75 places.

6. ENGAGING FOLLOW-UP:
   - End with a welcoming, open-ended question inviting them to tweak the plan or ask for more (e.g. "إيه رأيك في الترشيحات دي؟ تحب نعدل أي حاجة؟ أنا معاك خطوة بخطوة!").

OUTPUT FORMAT:
Return ONLY a valid JSON object matching:
{
  "message": "The personalized, warm, human-like formatted Arabic or English message",
  "placeIds": ["place-id-1", "place-id-2"]
}`;

        const payload = {
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUSER REQUEST: "${query}"` }] }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        };

        const candidateModels = ['gemini-3-flash-preview', 'gemini-flash-lite-latest', 'gemini-flash-latest'];
        let data = null;

        for (const model of candidateModels) {
          try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiService.getApiKey()}`;
            const res = await fetch(url, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'x-goog-api-key': geminiService.getApiKey()
              },
              body: JSON.stringify(payload)
            });

            if (res.ok) {
              data = await res.json();
              break;
            }
          } catch (e) {
            // try next model
          }
        }

        if (data) {
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            const resolvedPlaces = (parsed.placeIds || [])
              .map(id => PLACES_DATA.find(p => p.id === id))
              .filter(Boolean);

            if (parsed.message) {
              return {
                message: parsed.message,
                places: resolvedPlaces,
                source: 'gemini'
              };
            }
          }
        }
      } catch (err) {
        console.warn('Gemini chat advisor fallback:', err?.message || err);
      }
    }

    // 2. Intelligent Local Heuristics Engine Fallback
    return matchPlacesLocally(query, lang);
  }
};
