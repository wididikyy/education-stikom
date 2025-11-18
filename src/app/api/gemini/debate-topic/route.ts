import { NextResponse } from "next/server";
import { getGeminiClient } from "@/utils/gemini/client";
import { ApiResponse } from "@/lib/types";

export async function GET() {
  try {
    const prompt = `Generate one random interesting debate topic for English learners. 
    The topic should be:
    - Suitable for intermediate to advanced English learners
    - Engaging and thought-provoking
    - Not too controversial or sensitive
    - Can be discussed in 5-10 minutes
    
    Just give the topic, no explanation. Format: "Topic: [your topic here]"`;

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
    console.error("Error generating debate topic:", error);
    
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate topic",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";