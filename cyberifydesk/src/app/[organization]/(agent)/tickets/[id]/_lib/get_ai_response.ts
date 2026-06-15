"use server"

// TODO: I know this is not best way but this was the only way right not in my mind later on I will fix it. Optmise me!
import dbConnect from "@/lib/dbConnection"
import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

export async function getAiResponse(messages: any[], ticketTitle: string) {
  await dbConnect()

  if (messages.length === 0) {
    return "No conversation history available to generate insights."
  }

  const conversationHistory = messages
    .map((msg) => {
      const role =
        msg.senderType === "agent"
          ? "Agent"
          : msg.senderType === "user"
            ? "User"
            : "System"
      return `${role}: ${msg.message}`
    })
    .join("\n")

  const prompt = `You are an AI assistant helping a customer support agent.
Based on the ticket title and the conversation history below, generate a professional, helpful, and concise draft response for the agent to send to the user. Do not add any greeting, signature, or surrounding markdown code blocks - just return the raw message body.

Ticket Title: ${ticketTitle}

Conversation History:
${conversationHistory}

Draft Response:`

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  })

  const { text } = await generateText({
    model: google("gemini-3-flash-preview"),
    prompt: prompt,
  })

  return text.trim()
}
