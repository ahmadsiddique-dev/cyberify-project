import { Embeddings } from "@langchain/core/embeddings";
import "dotenv/config";

class OpenRouterEmbeddings extends Embeddings {
  constructor(fields) {
    super(fields ?? {});
    this.apiKey = process.env.CLOUDFLARE_API_TOKEN;
    this.modelName = "@cf/baai/bge-large-en-v1.5";
  }

  async embedDocuments(texts) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNTID}/ai/v1/embeddings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.modelName,
          input: texts,
          max_tokens: 2000,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText}`,
      );
    }
    const json = await response.json();
    if (!json.data) {
      throw new Error("No data returned");
    }
    return json.data
      .sort((a, b) => a.index - b.index)
      .map((item) => item.embedding);
  }

  async embedQuery(text) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNTID}/ai/v1/embeddings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.modelName,
          input: text,
          max_tokens: 2000,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`ERROOOR: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    if (!json.data || json.data.length === 0) {
      throw new Error("No data returned");
    }
    return json.data[0].embedding;
  }
}

export function getEmbeddingsClient() {
  return new OpenRouterEmbeddings();
}
