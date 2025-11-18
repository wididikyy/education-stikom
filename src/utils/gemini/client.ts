import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI client
export function createGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  
  return new GoogleGenerativeAI(apiKey);
}

// Singleton instance
let geminiInstance: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!geminiInstance) {
    geminiInstance = createGeminiClient();
  }
  return geminiInstance;
}