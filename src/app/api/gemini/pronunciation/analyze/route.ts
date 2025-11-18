import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/utils/gemini/client";
import { ApiResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
    try {
        const { originalText, audioBase64 } = await request.json();

        if (!originalText || !audioBase64) {
            return NextResponse.json<ApiResponse<null>>(
                { success: false, error: "originalText and audioBase64 are required" },
                { status: 400 }
            );
        }

        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
        });

        const prompt = `You are an English pronunciation teacher. 
        
The student was supposed to read this text:
"${originalText}"

Please analyze their pronunciation and provide:
1. Overall pronunciation score (0-100)
2. Specific words that were mispronounced
3. Common pronunciation errors detected
4. Tips for improvement
5. Encouragement and positive feedback

Be constructive and encouraging in your feedback.`;

        const result = await model.generateContent([
            { text: prompt },
            {
                inlineData: {
                    mimeType: "audio/mp3",
                    data: audioBase64,
                },
            },
        ]);

        const response = result.response;
        const text = response.text();

        return NextResponse.json<ApiResponse<string>>({
            success: true,
            data: text,
        });
    } catch (error) {
        console.error("Error analyzing pronunciation:", error);

        return NextResponse.json<ApiResponse<null>>(
            {
                success: false,
                error: error instanceof Error ? error.message : "Analysis failed",
            },
            { status: 500 }
        );
    }
}

export const dynamic = "force-dynamic";