import { EmotionClass } from "../data/poemSentiments";
import {
  getEmotionClasses,
  calculatePercentage,
  getProgressBarColor,
} from "../lib/clientSentimentAnalyzer";

interface SentimentResultProps {
  emotion: EmotionClass;
  scores: Record<EmotionClass, number>;
}

export default function SentimentResult({
  emotion,
  scores,
}: SentimentResultProps) {
  const emotionClasses = getEmotionClasses(emotion);

  const sortedEmotions = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([emotion, score]) => ({
      emotion: emotion as EmotionClass,
      score,
      percentage: calculatePercentage(scores, emotion as EmotionClass),
    }));

  const getEmotionIcon = (emotion: EmotionClass) => {
    switch (emotion) {
      case "Anger":
        return (
          <svg
            className="h-5 w-5 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        );
      case "Disgust":
        return (
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
            />
          </svg>
        );
      case "Fear":
        return (
          <svg
            className="h-5 w-5 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "Joy":
        return (
          <svg
            className="h-5 w-5 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "Neutral":
        return (
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "Sadness":
        return (
          <svg
            className="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 text-black">
      <div className="p-5">
        <h2 className="text-base font-semibold text-black tracking-tight mb-4">
          Analysis Results
        </h2>

        <div
          className={`flex items-center justify-between p-4 rounded-lg border mb-6 ${getEmotionBgClass(
            emotion
          )}`}
        >
          <div className="flex items-center gap-3">
            {getEmotionIcon(emotion)}
            <h3 className="text-base font-medium text-black tracking-tight">
              Primary Emotion:{" "}
              <span className={getEmotionTextClass(emotion)}>{emotion}</span>
            </h3>
          </div>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-white text-neutral-700">
            {calculatePercentage(scores, emotion).toFixed(1)}%
          </span>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-neutral-800 tracking-tight">
            Emotion Breakdown
          </h4>

          {sortedEmotions.map(({ emotion, percentage }) => (
            <div key={emotion} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {getEmotionIcon(emotion)}
                  <span className="font-medium">{emotion}</span>
                </div>
                <span className="text-neutral-500">
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressBarColorClass(
                    emotion
                  )}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getEmotionBgClass(emotion: EmotionClass): string {
  const bgClassMap: Record<EmotionClass, string> = {
    Anger: "bg-red-50 border-red-100",
    Disgust: "bg-green-50 border-green-100",
    Fear: "bg-purple-50 border-purple-100",
    Joy: "bg-yellow-50 border-yellow-100",
    Neutral: "bg-gray-50 border-gray-100",
    Sadness: "bg-blue-50 border-blue-100",
  };

  return bgClassMap[emotion] || "bg-gray-50 border-gray-100";
}

function getEmotionTextClass(emotion: EmotionClass): string {
  const textClassMap: Record<EmotionClass, string> = {
    Anger: "text-red-600",
    Disgust: "text-green-600",
    Fear: "text-purple-600",
    Joy: "text-yellow-600",
    Neutral: "text-gray-600",
    Sadness: "text-blue-600",
  };

  return textClassMap[emotion] || "text-gray-600";
}

function getProgressBarColorClass(emotion: EmotionClass): string {
  const colorClassMap: Record<EmotionClass, string> = {
    Anger: "bg-red-500",
    Disgust: "bg-green-500",
    Fear: "bg-purple-500",
    Joy: "bg-yellow-500",
    Neutral: "bg-gray-500",
    Sadness: "bg-blue-500",
  };

  return colorClassMap[emotion] || "bg-gray-500";
}
