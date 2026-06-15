import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { executeWithRetry } from "./utils.js";

export function getEmbeddingsClient() {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-embedding-2",
  });

  const originalEmbedDocuments = embeddings.embedDocuments.bind(embeddings);
  const originalEmbedQuery = embeddings.embedQuery.bind(embeddings);

  embeddings.embedDocuments = async (texts) => {
    return executeWithRetry(
      () => originalEmbedDocuments(texts),
      (vectors) => vectors && vectors.length === texts.length && !vectors.some(v => !v || v.length === 0)
    );
  };

  embeddings.embedQuery = async (text) => {
    return executeWithRetry(
      () => originalEmbedQuery(text),
      (vector) => vector && vector.length > 0
    );
  };

  return embeddings;
}
