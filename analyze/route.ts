import { NextRequest, NextResponse } from "next/server";
import { analyzePoemSentiment } from "@/actions/sentimentActions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Valid poem text is required" },
        { status: 400 }
      );
    }

    const analysis = await analyzePoemSentiment(text);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing poem:", error);
    return NextResponse.json(
      { error: "Failed to analyze poem" },
      { status: 500 }
    );
  }
}
