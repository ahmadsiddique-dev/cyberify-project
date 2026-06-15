import express from "express";
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { getEmbeddingsClient } from "./src/embeddings.js";
import { GoogleGenAI } from "@google/genai";

const queue = new Queue("data-upload-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const ai = new GoogleGenAI({
  apikey: process.env.GEMINI_API_KEY
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 7000;
app.use(cors());

app.get("/", (req, res) => {
  res.send(`Server is up and running`);
});

app.post("/upload/file", upload.single("file"), function (req, res, next) {

  queue.add("file-ready", {
    filename: req.file.filename,
    destination: req.file.destination,
    path: req.file.path,
  });
  res.send("File uploaded successfully!");
});

app.get("/chat", async (req, res) => {
  const userQuery = req.query.userQuery;

  const embeddings = getEmbeddingsClient();

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333",
      collectionName: "pdf-docs",
    },
  );

  const similaritySearchResults = await vectorStore.similaritySearch(userQuery);

  const result = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: similaritySearchResults,
  });

  res.send({ result });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
