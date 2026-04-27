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
  try {
    const ai = getAI();
    const parts = dateString.split(',');
    const requestedYear = parts[parts.length - 1]?.trim() || '';
    
    // We removed the googleSearch tool to avoid quota issues and technical conflicts with responseSchema
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `List major international and national news, scientific milestones, and official observances that occurred EXCLUSIVELY on: ${dateString}.

STRICT ACCURACY RULES:
1. YEAR MATCH: Every event MUST have happened on the exact year: ${requestedYear}.
2. NO HISTORY: Do NOT show events from other years.
3. CONTENT TYPE: Focus on Science & Tech, Politics, Economy, and International Affairs that are important for competitive exams.
4. If no major events are known for this specific day and year, return an empty list [].`,
      config: {
        systemInstruction: "You are a professional GK researcher. You provide factual, year-specific events for the exact date requested. You do not provide history from other years. You use your extensive training data to identify news and milestones for the specific day and year provided.",
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
