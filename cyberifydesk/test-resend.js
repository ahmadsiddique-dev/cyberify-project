import fs from "fs"
import path from "path"
import { Resend } from "resend"

const loadEnv = () => {
  const envPaths = [
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), ".env")
  ]
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8")
      for (const line of content.split("\n")) {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith("#")) {
          const eqIdx = trimmed.indexOf("=")
          if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim()
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, "")
            process.env[key] = val
          }
        }
      }
      break
    }
  }
}

loadEnv()

const apiKey = process.env.RESEND_API_KEY
if (!apiKey) {
  console.error("Error: RESEND_API_KEY is not defined in env variables.")
  process.exit(1)
}

const resend = new Resend(apiKey)

console.log("Sending test email to delivered@resend.dev...")
const { data, error } = await resend.emails.send({
  from: "Cyberify Desk <onboarding@resend.dev>",
  to: ["delivered@resend.dev"],
  subject: "Resend Connection Test",
  html: "<h3>Success!</h3><p>Your Resend API integration is working correctly.</p>"
})

if (error) {
  console.error("Connection Test Failed:", error.message)
} else {
  console.log("Connection Test Succeeded!")
  console.log("Email ID:", data.id)
}
