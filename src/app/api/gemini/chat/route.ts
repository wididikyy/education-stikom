/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/utils/gemini/client";
import { ApiResponse, ChatMessage } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { history, message, systemInstruction } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    if (history && !Array.isArray(history)) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, error: "History must be an array" },
        { status: 400 }
      );
    }

    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction || "You are a helpful English learning assistant.",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    // Convert history to proper format
    const formattedHistory: ChatMessage[] = history?.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content || msg.text }],
    })) || [];

    const chat = model.startChat({
      history: formattedHistory.length > 0 ? formattedHistory : undefined,
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json<ApiResponse<string>>({
      success: true,
      data: text,
    });
  } catch (error) {
    console.error("Error in chat:", error);
    
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Chat failed",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";