import { EmotionClass } from "../data/poemSentiments";

export function getEmotionColor(emotion: EmotionClass): string {
  const colorMap: Record<EmotionClass, string> = {
    Anger: "red",
    Disgust: "green",
    Fear: "purple",
    Joy: "yellow",
    Neutral: "gray",
    Sadness: "blue",
  };

  return colorMap[emotion] || "gray";
}

export function getEmotionClasses(emotion: EmotionClass): string {
  const classMap: Record<EmotionClass, string> = {
    Anger: "bg-red-50 border-red-200 text-red-800",
    Disgust: "bg-green-50 border-green-200 text-green-800",
    Fear: "bg-purple-50 border-purple-200 text-purple-800",
    Joy: "bg-yellow-50 border-yellow-200 text-yellow-800",
    Neutral: "bg-gray-50 border-gray-200 text-gray-800",
    Sadness: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return classMap[emotion] || "bg-gray-50 border-gray-200 text-gray-800";
}

export function calculatePercentage(
  scores: Record<EmotionClass, number>,
  emotion: EmotionClass
): number {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  if (total === 0) return 0;
  return (scores[emotion] / total) * 100;
}

export function getProgressBarColor(emotion: EmotionClass): string {
  const colorMap: Record<EmotionClass, string> = {
    Anger: "bg-red-500",
    Disgust: "bg-green-500",
    Fear: "bg-purple-500",
    Joy: "bg-yellow-500",
    Neutral: "bg-gray-500",
    Sadness: "bg-blue-500",
  };

  return colorMap[emotion] || "bg-gray-500";
}
