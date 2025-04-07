import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { Readable } from "stream";
import { EmotionClass } from "../data/poemSentiments";

export interface PoemData {
  id: number;
  text: string;
  emotion: EmotionClass;
}

interface CsvRow {
  emotion: string;
  text: string;
  [key: string]: string;
}

export async function loadPoemDataset(
  csvFilePath: string
): Promise<PoemData[]> {
  try {
    const fileContent = fs.readFileSync(csvFilePath, "utf8");
    const results: PoemData[] = [];
    const readableStream = Readable.from([fileContent]);
    return new Promise((resolve, reject) => {
      readableStream
        .pipe(csvParser())
        .on("data", (data: CsvRow) => {
          if (data.emotion && data.text) {
            const emotion = validateEmotion(data.emotion);
            if (emotion) {
              results.push({
                id: results.length + 1,
                text: data.text,
                emotion: emotion,
              });
            }
          }
        })
        .on("end", () => {
          console.log(`Loaded ${results.length} poems from the dataset`);
          resolve(results);
        })
        .on("error", (error: Error) => {
          reject(error);
        });
    });
  } catch (error) {
    console.error("Error loading dataset:", error);
    throw error;
  }
}

function validateEmotion(emotion: string): EmotionClass | null {
  const normalizedEmotion = emotion.trim().toLowerCase();

  if (normalizedEmotion.includes("anger")) return "Anger";
  if (normalizedEmotion.includes("disgust")) return "Disgust";
  if (normalizedEmotion.includes("fear")) return "Fear";
  if (normalizedEmotion.includes("joy") || normalizedEmotion.includes("happy"))
    return "Joy";
  if (normalizedEmotion.includes("neutral")) return "Neutral";
  if (normalizedEmotion.includes("sad")) return "Sadness";

  return null;
}
