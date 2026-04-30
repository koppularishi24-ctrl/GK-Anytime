import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
let lastApiKey: string | null = null;

export const STORAGE_KEY = 'gk_explorer_gemini_api_key';

export function hasApiKey() {
  if (typeof window === 'undefined') return false;
  const key = localStorage.getItem(STORAGE_KEY);
  return !!key && key.trim().length > 0;
}

function getAI() {
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;

  if (!apiKey) {
    throw new Error("No Gemini API key found. Please add one in the Settings page.");
  }

  // Create a new client if the key changed or if no client exists
  if (!aiClient || apiKey !== lastApiKey) {
    aiClient = new GoogleGenAI({ apiKey });
    lastApiKey = apiKey;
  }

  return aiClient;
}

export async function generateDateGK(dateString: string) {
  const cacheKey = `gk_date_${dateString}`;
  const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const ai = getAI();
    const parts = dateString.split(',');
    const requestedYear = parts[parts.length - 1]?.trim() || '';
    
    // We use googleSearch to provide real-time updates for today's news
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `List major international and national news, scientific milestones, and official observances that occurred EXCLUSIVELY on: ${dateString}.

STRICT ACCURACY RULES:
1. YEAR MATCH: Every event MUST have happened on the exact year: ${requestedYear}.
2. NO HISTORY: Do NOT show events from other years.
3. CONTENT TYPE: Focus on Science & Tech, Politics, Economy, and International Affairs that are important for competitive exams.
4. If no major events are known for this specific day and year, return an empty list [].`,
      config: {
        systemInstruction: "You are a professional GK researcher. You provide factual, year-specific events for the exact date requested. You do not provide history from other years. Use Google Search to find specific news and events for the requested date.",
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["category", "description"]
          }
        }
      }
    });
    
    if (response.text) {
      const data = JSON.parse(response.text);
      if (typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      }
      return data;
    }
    return [];
  } catch (error: any) {
    console.error("Error generating GK content:", error);
    if (error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('429')) {
      throw new Error("Search quota reached. Please wait a few minutes or try another category later.");
    }
    throw error;
  }
}

export async function generateQuiz(month: string, year: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a 20-question General Knowledge quiz based STRICTLY on real news, scientific breakthroughs, and economic developments that occurred in ${month} ${year}. 

QUIZ GENERATION RULES:
1. YEAR MATCH: Every single question MUST be about an event from exactly the year ${year}. 
2. NO GENERAL HISTORY: Only focus on contemporary developments from that specific period.
3. EXAM LEVEL: Questions must be suitable for SSC, UPSC, and Banking exams.
4. If the month is in the future, base questions on officially confirmed schedules (e.g., specific rocket launch dates, international summits already announced).`,
      config: {
        systemInstruction: "You are a specialized quiz master for civil service exams. You provide factual questions based on news from the specific month and year requested. You never use historical data from other years.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING, description: "The factual answer to the question" }
            },
            required: ["question", "answer"]
          }
        }
      }
    });
    
    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
}

export async function generateCategoryNews(category: string, dateString: string) {
  const cacheKey = `gk_category_${category}_${dateString}`;
  const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      localStorage.removeItem(cacheKey);
    }
  }

  try {
    const ai = getAI();
    let categorySpecificPrompt = "";
    
    if (category === "Dark Web Crimes") {
      categorySpecificPrompt = "\nSPECIAL FOCUS: Specifically focus on disturbing and serious reports regarding dark web crimes. This includes chilling accounts of cyber-criminal syndicates, high-profile cases involving serious predators (including pedophiles), and mysterious or serious crimes that involve dangerous criminal psychology. The tone should be serious and investigative.";
    } else if (category === "Horror") {
      categorySpecificPrompt = "\nSPECIAL FOCUS: Provide deeply disturbing and mysterious news or documented facts related to the paranormal. Focus on chilling accounts of ghosts, evil spirits, demonology, and unsettling objects like the Busby Stoop Chair. Include serious, documented supernatural reports and mysterious occurrences that add a sense of real-world horror.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a comprehensive list of news developments and key events specifically for the category: "${category}" that occurred on ${dateString}.${categorySpecificPrompt}

REQUIREMENTS:
1. FOCUS: Only include items related to ${category}.
2. DATE: Events must have happened exactly on ${dateString}.
3. DEPTH: Provide detailed, factual summaries.
4. SOURCE: For each item, you MUST provide a direct, valid URL to the news source reporting this event.
5. If no specific news exists for this category on this day, return an empty list [].`,
      config: {
        systemInstruction: "You are a professional news analyst. Use Google Search to find and extract the latest, specific news developments for the requested category and date. Ensure facts are verified and every news item has a primary source URL.",
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              summary: { type: Type.STRING },
              url: { type: Type.STRING, description: "The direct URL to the news source" }
            },
            required: ["headline", "summary", "url"]
          }
        }
      }
    });
    
    if (response.text) {
      const data = JSON.parse(response.text);
      if (typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      }
      return data;
    }
    return [];
  } catch (error: any) {
    console.error("Error generating category news:", error);
    if (error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('429')) {
      throw new Error("Search quota reached. Please wait a few minutes or try another category later.");
    }
    throw error;
  }
}
