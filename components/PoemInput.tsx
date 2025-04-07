import { BookText } from "lucide-react";
import { useState } from "react";

interface PoemInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function PoemInput({ onAnalyze, isLoading }: PoemInputProps) {
  const [poemText, setPoemText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (poemText.trim().length > 0) {
      onAnalyze(poemText);
    }
  };

  const handleSampleClick = (sample: string) => {
    setPoemText(sample);
  };

  const samplePoems = [
    {
      name: "Joy",
      text: "Sunshine fills my heart with light,\nBirds sing sweetly in the trees,\nHappiness flows through every vein,\nLife is beautiful and free.",
    },
    {
      name: "Sadness",
      text: "Tears stream down like winter rain,\nMemories fade to shades of gray,\nThe world feels empty, cold, and bleak,\nLight has gone from my days.",
    },
    {
      name: "Anger",
      text: "Fury burns through my veins,\nInjustice fuels the raging fire,\nI will not stand for this betrayal,\nVengeance is my sole desire.",
    },
  ];

  return (
    <div className="bg-white rounded-xl">
      <div className="p-5 pb-0">
        <h2 className="text-base font-semibold mb-4 text-black tracking-tight">
          Enter Poem to Analyze
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 px-5">
          <textarea
            value={poemText}
            onChange={(e) => setPoemText(e.target.value)}
            className="w-full p-3 border border-neutral-200 rounded-lg text-sm text-neutral-800 min-h-[150px] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
            placeholder="Enter a poem to analyze its emotional content..."
          />
        </div>

        <div className="bg-neutral-50 rounded-b-xl border-t border-neutral-200 p-5">
          <div className="flex flex-wrap gap-1 items-center mb-4 text-xs">
            <span className="text-neutral-500">Try a sample:</span>
            {samplePoems.map((sample) => (
              <button
                key={sample.name}
                type="button"
                onClick={() => handleSampleClick(sample.text)}
                className="text-blue-600 hover:text-blue-800 bg-blue-100 px-2 py-1 rounded-full transition-colors cursor-pointer"
              >
                {sample.name}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || poemText.trim().length === 0}
            className="w-full flex items-center justify-center gap-2 bg-[#0166FF] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed text-sm font-medium cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                Analyze Poem
                <BookText className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
