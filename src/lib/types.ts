// Chat history type compatible with Gemini
export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Pronunciation Analysis Result
export interface PronunciationAnalysis {
  score: number;
  mispronounced: string[];
  errors: string[];
  tips: string[];
  feedback: string;
  rawResponse: string;
}

// Grammar Analysis Result
export interface GrammarAnalysis {
  score: number;
  errors: { error: string; correction: string }[];
  suggestions: string[];
  vocabularyFeedback: string;
  encouragement: string;
  rawResponse: string;
}