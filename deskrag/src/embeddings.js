import { Embeddings } from "@langchain/core/embeddings";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

class GoogleEmbeddings extends Embeddings {
  constructor(fields) {
    super(fields ?? {});
    this.modelName = fields?.modelName ?? "gemini-embedding-2";
  }

  async embedDocuments(texts) {
    const response = await ai.models.embedContent({
      model: this.modelName,
      contents: texts,
    });
    return response.embeddings.map((item) => item.values);
  }

  async embedQuery(text) {
    const response = await ai.models.embedContent({
      model: this.modelName,
      contents: text,
    });
    return response.embeddings[0].values;
  }
}

export function getEmbeddingsClient() {
  return new GoogleEmbeddings();
}
