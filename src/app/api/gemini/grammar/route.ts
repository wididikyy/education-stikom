import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/utils/gemini/client";
import { ApiResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
    try {
        const { userMessage, context } = await request.json();

        if (!userMessage || typeof userMessage !== "string") {
            return NextResponse.json<ApiResponse<null>>(
                { success: false, error: "userMessage is required" },
                { status: 400 }
            );
        }

        const prompt = `You are an English grammar teacher. 
    
${context ? `Context: ${context}\n\n` : ""}Student's message: "${userMessage}"

Please analyze the grammar and provide:
1. Grammar score (0-100)
2. Grammatical errors (if any) with corrections
3. Suggestions for better sentence structure
4. Vocabulary usage feedback
5. Brief encouragement

Format your response clearly with sections.`;

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
        console.error("Error analyzing grammar:", error);

        return NextResponse.json<ApiResponse<null>>(
            {
                success: false,
                error: error instanceof Error ? error.message : "Grammar analysis failed",
            },
            { status: 500 }
        );
    }
}

export const dynamic = "force-dynamic";