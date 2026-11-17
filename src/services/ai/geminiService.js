// Google Gemini API Integration for Hurghada Go & Hara AI Concierge
import { PLACES_DATA } from '../../data/placesData.js';

const STORAGE_KEY = 'hurghada_gemini_api_key';

// Resilient list of models to try in order
const CANDIDATE_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3-flash-preview',
  'gemini-flash-latest'
];

// Build a concise knowledge index of real Hurghada places for Gemini context
function getPlacesContextIndex() {
  return PLACES_DATA.map(p => 
    `• ID: ${p.id} | Name: ${p.name} (${p.nameAr}) | Cat: ${p.category} | Area: ${p.area} | Rating: ${p.rating} | Price: ${p.priceEn} | Tags: ${p.tags?.slice(0, 3).join(', ')}`
  ).join('\n');
}

// Resilient helper to fetch from Gemini trying candidate models
async function callGeminiModels(key, payload) {
  let lastError = null;

  for (const model of CANDIDATE_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': key
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        return { data, model };
      } else {
        const errJson = await res.json().catch(() => ({}));
        lastError = new Error(errJson?.error?.message || `Model ${model} returned HTTP ${res.status}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini candidate models failed');
}

export const geminiService = {
  getApiKey() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored.trim().length > 0) return stored.trim();
    }
    const envKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || (typeof process !== 'undefined' && process.env?.VITE_GEMINI_API_KEY) || '';
    return envKey.trim();
  },

  setApiKey(key) {
    if (typeof window !== 'undefined') {
      if (key && key.trim()) {
        localStorage.setItem(STORAGE_KEY, key.trim());
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },

  hasApiKey() {
    return Boolean(this.getApiKey());
  },

  async testConnection(testKey = null) {
    const key = testKey || this.getApiKey();
    if (!key) throw new Error('No API key provided');

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: 'Respond with exactly: {"status": "ok", "message": "Gemini connection successful"}' }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    };

    const { data } = await callGeminiModels(key, payload);
    return data;
  },

  async generateItinerary({ prompt = '', durationDays = 3, style = 'balanced', lang = 'ar' }) {
    const key = this.getApiKey();
    if (!key) {
      throw new Error('Gemini API key is not configured');
    }

    const placesContext = getPlacesContextIndex();

    const systemPrompt = `You are "Hara" (هيرا), the premier local travel concierge for Hurghada and Egypt's Red Sea coast.
Your goal is to design a realistic, perfectly paced, high-quality ${durationDays}-day vacation itinerary for Hurghada.
Trip style: "${style}". User prompt / special wishes: "${prompt}".

CRITICAL INSTRUCTIONS:
1. Always prioritize matching and suggesting REAL places from the verified Hurghada directory provided below.
2. For each stop, you must specify the exact matching "placeId" from the directory whenever available.
3. Provide realistic timings (morning boat trips, afternoon relaxation/cafe, sunset walks at Marina/Sahl Hasheesh, evening dinners).
4. Provide both English and Arabic texts for all titles, descriptions, and notes.
5. Return ONLY a valid JSON object matching the exact schema below, without any markdown formatting or backticks.

VERIFIED HURGHADA PLACES DIRECTORY:
${placesContext}

JSON SCHEMA:
{
  "id": "gemini-${Date.now()}",
  "source": "gemini",
  "labelEn": "Short itinerary label (3-5 words)",
  "labelAr": "عنوان موجز للبرنامج (3-5 كلمات)",
  "titleEn": "Engaging Itinerary Title in English",
  "titleAr": "عنوان جذاب للرحلة بالعربية",
  "subtitleEn": "${durationDays} Days · Highlights & Timing in English",
  "subtitleAr": "${durationDays} أيام · أبرز الأنشطة والمواعيد بالعربية",
  "summaryEn": "Engaging 2-3 sentence overview highlighting why this itinerary fits the traveler.",
  "summaryAr": "ملخص جذاب في 2-3 جمل يوضح ميزات البرنامج ومناسبته للمسافر.",
  "days": [
    {
      "day": 1,
      "titleEn": "Day Theme in English",
      "titleAr": "عنوان اليوم بالعربية",
      "stops": [
        {
          "time": "09:00 AM",
          "place": "Official Venue Name from Directory",
          "placeAr": "اسم المكان بالعربية من الدليل",
          "placeId": "matching-place-id-from-directory",
          "noteEn": "Local insider tip or activity highlights",
          "noteAr": "نصيحة محلية أو ما ستفعله هنا بالعربية"
        }
      ]
    }
  ]
}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
        topP: 0.95
      }
    };

    const { data } = await callGeminiModels(key, payload);
    const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) throw new Error('Empty response received from Gemini');

    return JSON.parse(textOutput);
  },

  async askTravelAdvice({ question = '', lang = 'ar' }) {
    const key = this.getApiKey();
    if (!key) throw new Error('Gemini API key is not configured');

    const placesContext = getPlacesContextIndex();

    const promptText = `You are "Hara" (هيرا), the friendly AI travel expert for Hurghada and the Red Sea.
Answer the following traveler's question with local insider knowledge, recommending specific places from our verified list below whenever relevant.

Question: "${question}"
Language preferred for response: ${lang === 'ar' ? 'Arabic' : 'English'}.

VERIFIED DIRECTORY:
${placesContext}

Provide a helpful, friendly, and well-structured answer. If you recommend specific venues from our list, mention them clearly with their area.`;

    const payload = {
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      generationConfig: { temperature: 0.7, topP: 0.9 }
    };

    const { data } = await callGeminiModels(key, payload);
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
};
