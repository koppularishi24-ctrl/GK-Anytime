import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

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
  if (!aiClient || (aiClient as any).apiKey !== apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }

  return aiClient;
}

export async function generateDateGK(dateString: string) {
  try {
    const ai = getAI();
    const parts = dateString.split(',');
    const requestedYear = parts[parts.length - 1]?.trim() || '';
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find and list major international and national news, scientific milestones, scheduled geopolitical events, and official observances that occur STRICTLY and ONLY on: ${dateString}.

SEARCH REQUIREMENTS:
1. USE GOOGLE SEARCH: Find real, verified events that actually occurred or are strictly scheduled for this specific date AND year: ${requestedYear}.
2. NO HISTORICAL "ON THIS DAY": I do not want events from any year other than ${requestedYear}. If you find a historical fact for a different year, DISCARD IT.
3. FOCUS ON COMPETITIVE EXAM GK: Include developments in Science & Tech, International Relations, Economy, and Polity that a student would find in a current affairs magazine for exactly this day.
4. If no specific news or major scheduled events exist for this precise date and year, return an empty list [].`,
      config: {
        systemInstruction: "You are a professional current affairs researcher. You use Google Search to provide 100% accurate, year-specific data for the requested date. You NEVER provide historical context from other years. You focus on news, scheduled milestones, and scientific developments that happened EXACTLY in the year provided.",
        tools: [{ googleSearch: {} } as any],
        responseMimeType: "application/json",
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
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Error generating GK content:", error);
    throw error;
  }
}

export async function generateQuiz(month: string, year: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for major national and international news, scientific breakthroughs, and economic developments that occurred STRICTLY in ${month} ${year}. 

QUIZ GENERATION RULES:
1. USE GOOGLE SEARCH: Verify events from major news outlets (PIB, Reuters, The Hindu, etc.) for exactly this period.
2. NO HISTORY: Every single question MUST be about an event from ${year}. 
3. EXAM LEVEL: Questions must be suitable for SSC, UPSC, and Banking exams.
4. If the month is in the future, base questions on officially confirmed schedules (e.g., specific rocket launch dates, international summits already announced).`,
      config: {
        systemInstruction: "You are a specialized quiz master for civil service exams. You use Google Search to find real events for the specific month and year requested. You never use historical data from other years. You provide 20 factual questions with accurate answers.",
        tools: [{ googleSearch: {} } as any],
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
