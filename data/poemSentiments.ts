export type EmotionClass =
  | "Anger"
  | "Disgust"
  | "Fear"
  | "Joy"
  | "Neutral"
  | "Sadness";

export interface PoemSentiment {
  id: number;
  text: string;
  emotion: EmotionClass;
}

export const trainingPoems: PoemSentiment[] = [
  {
    id: 1,
    text: "Rage, rage against the dying of the light. Do not go gentle into that good night, Old age should burn and rave at close of day.",
    emotion: "Anger",
  },
  {
    id: 2,
    text: "The putrid smell of rotting flesh, decay surrounds us all. The filth of human vanity, The waste of human toil.",
    emotion: "Disgust",
  },
  {
    id: 3,
    text: "Shadows creep and darkness falls, I tremble as I hear them call. Cold sweat breaks upon my brow, Death is coming for me now.",
    emotion: "Fear",
  },
  {
    id: 4,
    text: "Sunlight dancing on the waves, Laughter fills the summer air. Hearts are light and spirits high, Love surrounds us everywhere.",
    emotion: "Joy",
  },
  {
    id: 5,
    text: "The mountain stands unmoved by time, Observing all that comes to pass. Neither joy nor sorrow stirs its face, It simply is, as all things are.",
    emotion: "Neutral",
  },
  {
    id: 6,
    text: "Tears fall like autumn rain, The heart aches with memories. Gone are the days we shared, Emptiness fills the space you left.",
    emotion: "Sadness",
  },
  {
    id: 7,
    text: "Battle cries echo through the field, Blood boils in my veins. Fury drives my sword arm forward, Vengeance will be mine today.",
    emotion: "Anger",
  },
  {
    id: 8,
    text: "How vile these words that spew from lips, How base these thoughts that fill the mind. The ugliness of human nature, Revolts my very soul.",
    emotion: "Disgust",
  },
  {
    id: 9,
    text: "Creaking floorboards in the night, Eyes watch me from the dark. My heart pounds within my chest, Terror grips me tight.",
    emotion: "Fear",
  },
  {
    id: 10,
    text: "Dancing in the summer rain, My spirit soars like birds in flight. Happiness bubbles from within, Life is a beautiful gift.",
    emotion: "Joy",
  },
  {
    id: 11,
    text: "Clouds pass overhead, Rivers flow down to the sea. Time continues on, Neither good nor bad, just being.",
    emotion: "Neutral",
  },
  {
    id: 12,
    text: "Wilted flowers on your grave, A heart that's broken beyond repair. Loneliness consumes my days, The pain of loss too much to bear.",
    emotion: "Sadness",
  },
];

export const emotionFeatures = {
  Anger: [
    "rage",
    "fury",
    "anger",
    "battle",
    "fight",
    "violent",
    "burn",
    "revenge",
    "hate",
    "destroy",
  ],
  Disgust: [
    "putrid",
    "filth",
    "rot",
    "vile",
    "revolting",
    "ugly",
    "disgust",
    "foul",
    "sick",
    "repulsive",
  ],
  Fear: [
    "fear",
    "terror",
    "dread",
    "horror",
    "afraid",
    "scary",
    "frightening",
    "tremble",
    "panic",
    "dark",
  ],
  Joy: [
    "happy",
    "joy",
    "delight",
    "pleasure",
    "laugh",
    "love",
    "smile",
    "sunshine",
    "dance",
    "beautiful",
  ],
  Neutral: [
    "observe",
    "neutral",
    "plain",
    "simple",
    "calm",
    "steady",
    "balance",
    "still",
    "quiet",
    "passive",
  ],
  Sadness: [
    "sad",
    "grief",
    "sorrow",
    "tears",
    "cry",
    "despair",
    "heartache",
    "pain",
    "loss",
    "lonely",
  ],
};
