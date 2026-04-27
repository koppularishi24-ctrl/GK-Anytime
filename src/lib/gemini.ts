import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getAI() {
  const userKey = typeof window !== 'undefined' ? localStorage.getItem('user_gemini_api_key') : null;
  const apiKey = userKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("No Gemini API key found. Please add one in the Settings page or configuration.");
  }

  // Create a new client if the key changed or if no client exists
  if (!aiClient || (aiClient && (aiClient as any).apiKey !== apiKey)) {
    aiClient = new GoogleGenAI({ apiKey });
  }

  return aiClient;
}

export async function generateDateGK(dateString: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide an exhaustive and comprehensive list of significant events that occurred STRICTLY on the specific date and year: ${dateString}. 

CRITICAL INSTRUCTIONS:
1. FOCUS ONLY ON THE SELECTED YEAR: If I select a date in 1975, show events from 1975. If I select a date in 2026, show events from 2026. 
2. DO NOT provide historical events from different years (e.g., if the year is 2026, don't show 1986 events) unless there is absolutely no news or events for that specific year, in which case you must clearly label them as "Historical Context for this Day".
3. For current/recent dates (like in 2026), include major news, scientific achievements, sports results, and international developments that happened on that exact day.
4. This data is for students preparing for competitive exams like SSC and UPSC. Include Indian and International events across categories like Polity, Economy, Science, Defense, and Crime.`,
      config: {
        systemInstruction: "You are a precise historian and current affairs expert. Your task is to provide events that happened EXACTLY on the day and year requested. Accuracy is paramount. Use your internal knowledge and logic to identify significant occurrences for that specific date. If the date is very recent or in the future, provide scheduled events or major anticipated milestones. For each event, provide a specific category and a concise, factual description.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING, description: "The category of the event (e.g., Indian Polity, International Crime, Science, Sports, etc.)" },
              description: { type: Type.STRING, description: "The description of the event" }
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
      contents: `Generate a 20-question General Knowledge quiz based on real, verified significant events that occurred STRICTLY in ${month} ${year}. 

CRITICAL INSTRUCTIONS:
1. FOCUS ONLY ON THE SELECTED YEAR: If I select ${year}, all questions MUST be about events that happened in ${year}. 
2. DO NOT hallucinate. Only use real events. If the date is in the future (like 2026), focus on scheduled major events, scientific milestones, or international agreements set for that time.
3. The target audience is students preparing for Indian competitive exams like SSC, Banking, and UPSC. Ensure a balanced mix of Indian National Current Affairs, International Affairs, Economy, Science & Tech, Defense, Sports, and Major Legal/Criminal verdicts.
4. Provide clear, concise questions and their corresponding factual answers.`,
      config: {
        systemInstruction: "You are an expert quizmaster for competitive exams. Create 20 challenging, 100% factually accurate open-ended questions and provide their correct answers. You MUST ensure every question pertains to the specific month and year requested.",
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
