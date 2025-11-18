import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/utils/gemini/client";
import { ApiResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
    try {
        const { prompt } = await request.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json<ApiResponse<null>>(
                { success: false, error: "Prompt is required and must be a string" },
                { status: 400 }
            );
        }

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
        console.error("Error generating text:", error);

        return NextResponse.json<ApiResponse<null>>(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to generate text",
            },
            { status: 500 }
        );
    }
}

// Optional: Add rate limiting
export const runtime = "edge"; // or "nodejs"
export const dynamic = "force-dynamic";