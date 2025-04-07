import natural from "natural";
import {
  EmotionClass,
  trainingPoems,
  emotionFeatures,
} from "../data/poemSentiments";

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

const TfIdf = natural.TfIdf;

const stopwords = [
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "me",
  "more",
  "most",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "should",
  "so",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "with",
  "would",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
];

export function preprocessText(text: string): string[] {
  const lowercased = text.toLowerCase();

  const tokens = tokenizer.tokenize(lowercased) || [];

  return tokens
    .filter(
      (token) =>
        token.length > 2 && !/[^a-z]/g.test(token) && !stopwords.includes(token)
    )
    .map((token) => stemmer.stem(token));
}

export function buildTfIdfModel() {
  const tfidf = new TfIdf();

  trainingPoems.forEach((poem) => {
    const processedText = preprocessText(poem.text).join(" ");
    tfidf.addDocument(processedText);
  });

  return tfidf;
}

const tfidfModel = buildTfIdfModel();

export function analyzeSentiment(text: string): {
  emotion: EmotionClass;
  scores: Record<EmotionClass, number>;
} {
  const processedTokens = preprocessText(text);

  const scores: Record<EmotionClass, number> = {
    Anger: 0,
    Disgust: 0,
    Fear: 0,
    Joy: 0,
    Neutral: 0,
    Sadness: 0,
  };

  processedTokens.forEach((token) => {
    Object.entries(emotionFeatures).forEach(([emotion, features]) => {
      const stemmedFeatures = features.map((feature) => stemmer.stem(feature));

      if (stemmedFeatures.includes(token)) {
        scores[emotion as EmotionClass] += 1;
      }
    });
  });

  processedTokens.forEach((token) => {
    trainingPoems.forEach((poem, docIndex) => {
      const tokenImportance = tfidfModel.tfidf(token, docIndex);
      if (tokenImportance > 0) {
        scores[poem.emotion] += tokenImportance * 0.5;
      }
    });
  });

  let maxEmotion: EmotionClass = "Neutral";
  let maxScore = 0;

  Object.entries(scores).forEach(([emotion, score]) => {
    if (score > maxScore) {
      maxScore = score;
      maxEmotion = emotion as EmotionClass;
    }
  });

  if (maxScore === 0) {
    maxEmotion = "Neutral";
  }

  return {
    emotion: maxEmotion,
    scores,
  };
}

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
