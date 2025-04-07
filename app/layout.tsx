import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poetry Sentiment Analysis",
  description:
    "Analyze the emotional content of poetry using machine learning. Detect six emotions: Anger, Disgust, Fear, Joy, Neutral, and Sadness.",
  keywords: [
    "poetry",
    "sentiment analysis",
    "machine learning",
    "emotion detection",
    "NLP",
    "TensorFlow.js",
  ],
  openGraph: {
    title: "Poetry Sentiment Analysis",
    description:
      "Analyze the emotional content of poetry using machine learning. Detect six emotions: Anger, Disgust, Fear, Joy, Neutral, and Sadness.",
    type: "website",
    locale: "en_US",
    siteName: "Poetry Sentiment Analysis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poetry Sentiment Analysis",
    description:
      "Analyze the emotional content of poetry using machine learning. Detect six emotions: Anger, Disgust, Fear, Joy, Neutral, and Sadness.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
