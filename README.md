# Poetry Sentiment Analyzer

A web application that analyzes the emotional content of poetry using Natural Language Processing (NLP) techniques.

## Features

- **Sentiment Analysis**: Analyze poems to detect six emotional categories (Anger, Disgust, Fear, Joy, Neutral, Sadness)
- **Visualization**: View the breakdown of different emotions detected in the text
- **NLP Processing**: Uses tokenization, stemming, and TF-IDF for text analysis
- **User-Friendly Interface**: Simple UI for entering poems and viewing results

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- TailwindCSS for styling
- Natural.js for NLP functionality
- TF-IDF for feature extraction

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/`: Next.js app directory
  - `components/`: UI components
  - `data/`: Sample training data for sentiment analysis
  - `lib/`: Sentiment analysis algorithms
  - `api/`: API routes for poem analysis

## How It Works

The sentiment analyzer uses a combination of techniques to determine the emotional content of poetry:

1. **Preprocessing**: The text is tokenized, stopwords are removed, and tokens are stemmed.
2. **Feature Extraction**: TF-IDF is used to identify important words in the text.
3. **Classification**: The preprocessed text is compared against feature words for each emotion.
4. **Scoring**: Scores are calculated for each emotional category, and the dominant emotion is identified.

## Extending the Application

To improve the sentiment analysis model:

1. Increase the training dataset size with more examples of each emotion
2. Implement more sophisticated ML models (e.g., neural networks)
3. Add additional features like n-grams or word embeddings
4. Integrate with external NLP APIs for more robust analysis

## License

MIT
