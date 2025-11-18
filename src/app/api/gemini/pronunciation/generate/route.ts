import { NextResponse } from "next/server";
import { getGeminiClient } from "@/utils/gemini/client";
import { ApiResponse } from "@/lib/types";

export async function GET() {
  try {
    const prompt = `Generate a short English text (2-3 sentences) for pronunciation practice.
    The text should:
    - Include common English words that are often mispronounced
    - Be interesting and meaningful
    - Include a mix of different sounds and phonemes
    - Be suitable for intermediate learners
    
    Just give the text, no explanation or title.`;

    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json<ApiResponse<string>>({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error generating pronunciation text:", error);
    
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate text",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";