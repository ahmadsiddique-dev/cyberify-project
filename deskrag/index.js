import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { getEmbeddingsClient } from "./src/embeddings.js";

// Making Queue
const queue = new Queue("data-upload-queue", {
  connection: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },
});

// Oh! come on, you know it
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 250 * 1024 },
});

// Making app now
const app = express();
const PORT = process.env.PORT || 7000;
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
  }),
);

app.get("/", (req, res) => {
  res.send(`Server is up and running..`);
});

app.post(
  "/upload/file",
  upload.single("file"),
  async function (req, res, next) {
    const job = await queue.add("file-ready", {
      filename: req.file.filename,
      destination: req.file.destination,
      path: req.file.path,
    });
    res.json({ message: "File uploaded successfully!", jobId: job.id });
  },
);

// Actually a little useful for Message adn loader on Frontend
app.get("/upload/status/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const job = await queue.getJob(jobId);
  if (!job) {
    return res.status(404).json({ status: "not_found" });
  }
  const state = await job.getState();
  res.json({ status: state });
});

// You also would like your customer to talk to the AI Assistant based on your provided Knowledge
app.get("/chat", async (req, res) => {
  const userQuery = req.query.userQuery;

  const embeddings = getEmbeddingsClient(); // I kept its(Embeddings) Logic separate

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL || "http://localhost:6333",
      collectionName: "pdf-docs",
    },
  );

  const similaritySearchResults = await vectorStore.similaritySearch(userQuery);

  console.log("Similarity search results: ", similaritySearchResults);
  const context = similaritySearchResults
    .map((doc) => doc.pageContent)
    .join("\n\n");
  const prompt = `Use the following context to answer the user query:

Context:
${context}

User Query: ${userQuery}`;

  const response = await fetch(
    "https://api.cloudflare.com/client/v4/accounts/1b90534e12e3ecba51a0e9df46a6a827/ai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({
        model: "@cf/openai/gpt-oss-120b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
      }),
    },
  );
  
  if (!response.ok) {
    return res
      .status(response.status)
      .send({
        error: `Error: ${response.status} ${response.statusText}`,
      });
  }

  const json = await response.json();
  const replyText = json.choices[0].message.content;
  console.log("Reply text: ", replyText);
  res.send({ result: { text: replyText } });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

