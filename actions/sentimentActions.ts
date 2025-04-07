"use server";

import { analyzeSentiment } from "../lib/sentimentAnalyzer";
import { EmotionClass } from "../data/poemSentiments";

export async function analyzePoemSentiment(text: string): Promise<{
  emotion: EmotionClass;
  scores: Record<EmotionClass, number>;
}> {
  try {
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      throw new Error("Valid poem text is required");
    }

    return analyzeSentiment(text);
  } catch (error) {
    console.error("Error analyzing poem:", error);
    throw error;
  }
}
