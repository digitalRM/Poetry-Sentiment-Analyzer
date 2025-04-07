"use client";

import { useState } from "react";
import Image from "next/image";
import PoemInput from "../components/PoemInput";
import SentimentResult from "../components/SentimentResult";
import { EmotionClass } from "../data/poemSentiments";
import { analyzePoemSentiment } from "../actions/sentimentActions";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    emotion: EmotionClass;
    scores: Record<EmotionClass, number>;
  } | null>(null);

  const handleAnalyze = async (text: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await analyzePoemSentiment(text);
      setAnalysisResult(result);
    } catch (err) {
      setError("An error occurred while analyzing the poem. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4 lg:p-8 font-sans">
      <main className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-4 lg:mt-8">
            <div className="flex items-start justify-between sm:flex-row flex-col gap-4">
              <h1 className="text-2xl font-semibold text-black tracking-tight text-balance">
                Poetry Sentiment Analyzer
              </h1>
            </div>
            <p className="text-sm text-neutral-600">
              This tool uses Natural Language Processing to analyze the
              emotional content of poetry. Upload any poem to identify its
              primary emotional tone across six categories: Anger, Disgust,
              Fear, Joy, Neutral, and Sadness.
            </p>
            <p className="text-sm text-neutral-600">
              Built using advanced NLP techniques including tokenization,
              stopword removal, TF-IDF feature extraction, and emotional
              sentiment analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-neutral-200">
                <div className="">
                  <PoemInput onAnalyze={handleAnalyze} isLoading={loading} />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 rounded-xl border border-red-200 p-4 text-sm text-red-800">
                  <div className="flex items-start">
                    <svg
                      className="h-5 w-5 text-red-400 mr-2 mt-0.5"
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
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl border border-neutral-200">
                <div className="p-5">
                  <h2 className="text-base font-semibold text-black tracking-tight mb-4">
                    Emotions Detected
                  </h2>
                  <div className="space-y-3 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="font-medium text-neutral-800">
                        Anger
                      </span>
                      <span>- Rage, fury, annoyance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="font-medium text-neutral-800">
                        Disgust
                      </span>
                      <span>- Revulsion, distaste</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                      <span className="font-medium text-neutral-800">Fear</span>
                      <span>- Terror, anxiety, worry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="font-medium text-neutral-800">Joy</span>
                      <span>- Happiness, love, contentment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                      <span className="font-medium text-neutral-800">
                        Neutral
                      </span>
                      <span>- Balance, objectivity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="font-medium text-neutral-800">
                        Sadness
                      </span>
                      <span>- Grief, sorrow, melancholy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
                  <div className="flex flex-col items-center justify-center h-64">
                    <div className="h-8 w-8 animate-spin rounded-full border-3 border-neutral-200 border-t-blue-600"></div>
                    <p className="mt-4 text-sm text-neutral-600">
                      Analyzing poem sentiment...
                    </p>
                  </div>
                </div>
              ) : analysisResult ? (
                <SentimentResult
                  emotion={analysisResult.emotion}
                  scores={analysisResult.scores}
                />
              ) : (
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
                  <div className="flex flex-col items-center justify-center h-64">
                    <Image
                      src="/poetry.svg"
                      alt="Poetry illustration"
                      width={180}
                      height={180}
                      className="mx-auto opacity-70"
                    />
                    <p className="mt-6 text-sm text-neutral-600">
                      Enter a poem to see its emotional analysis
                    </p>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
                  <div className="p-5">
                    <h2 className="text-base font-semibold text-neutral-900 mb-4">
                      How It Works
                    </h2>
                    <div className="space-y-3 text-sm text-neutral-600">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                        </div>
                        <p>
                          <span className="font-medium text-neutral-800">
                            Text preprocessing:
                          </span>{" "}
                          Tokenization and stopword removal
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                        </div>
                        <p>
                          <span className="font-medium text-neutral-800">
                            Feature extraction:
                          </span>{" "}
                          TF-IDF vectorization
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                        </div>
                        <p>
                          <span className="font-medium text-neutral-800">
                            Emotion detection:
                          </span>{" "}
                          Analyzed against a trained model
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                        </div>
                        <p>
                          <span className="font-medium text-neutral-800">
                            Scoring:
                          </span>{" "}
                          Each emotion category receives a weighted score
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
