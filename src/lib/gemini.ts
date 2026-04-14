import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateDateGK(dateString: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide an exhaustive and comprehensive list of events that happened on ${dateString}. This data is for students preparing for competitive exams like SSC and UPSC, so it must be highly relevant for General Knowledge (GK). Include a strong focus on both Indian National events and International events. Include a wide variety of categories such as: Indian History & Polity, International Relations, Economic & Financial, Science & Space Technology, Defense & Military, High-Profile Crimes & Scandals (e.g., major arrests, court verdicts, international criminal cases like Jeffrey Epstein, financial frauds), Sports, Important Births & Deaths, and Arts & Culture.`,
      config: {
        systemInstruction: "You are an expert historian and GK educator for competitive exams. Provide a massive, comprehensive list of factual, significant events for the requested date (aim for 20-30+ events). Prioritize events important for Indian and Global General Knowledge. Explicitly include major historical milestones, government acts, treaties, scientific discoveries, and major criminal/legal incidents. For each event, provide a short, specific category name (e.g., 'Indian Polity', 'International Crime', 'Science & Tech') and a concise, factual description.",
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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a 20-question General Knowledge quiz based on real, verified significant events that happened in ${month} ${year}. The target audience is students preparing for Indian competitive exams like SSC, Banking, and UPSC. Ensure a balanced mix of Indian National Current Affairs, International Affairs, Economy, Science & Tech, Defense, Sports, and Major Legal/Criminal verdicts.

CRITICAL INSTRUCTIONS:
1. DO NOT hallucinate. Only use real, historically accurate events that actually occurred in ${month} ${year}.
2. Provide clear, concise questions and their corresponding factual answers.`,
      config: {
        systemInstruction: "You are an expert quizmaster for competitive exams. Create 20 challenging, 100% factually accurate open-ended questions and provide their correct answers.",
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
