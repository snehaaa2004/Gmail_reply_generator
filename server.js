// ============================================
// server.js — The Backend (Brain of your app)
// This talks to Claude AI and keeps your API
// key safe from the public.
// ============================================

// Load secret keys from .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
const PORT = 3000;

// Allow the frontend to talk to this server
app.use(cors());
app.use(express.json());

// Serve the frontend HTML file
app.use(express.static("public"));

// Connect to Claude AI using your API key
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// FREE ALTERNATIVE: Use Hugging Face Inference API (completely free!)
// Uncomment below and comment out the Anthropic code above
/*
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Get free key at huggingface.co
async function generateWithHuggingFace(prompt) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
    {
      headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  const result = await response.json();
  return result[0]?.generated_text || "Sorry, I couldn't generate a reply.";
}
*/

// Alternative: Use OpenAI (also paid but has free tier for new users)
// const { OpenAI } = require('openai');
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// -----------------------------------------------
// This is the main endpoint — when the user
// clicks "Generate Reply", the frontend sends
// the email here and we return an AI reply.
// -----------------------------------------------
app.post("/generate-reply", async (req, res) => {
  const { emailContent, tone, senderName, context } = req.body;

  // Basic validation
  if (!emailContent || emailContent.trim() === "") {
    return res.status(400).json({ error: "Email content is required." });
  }

  // Build a prompt that tells Claude exactly what to do
  const prompt = `
You are an expert email writer. Your job is to write a reply to the email below.

ORIGINAL EMAIL:
"""
${emailContent}
"""

INSTRUCTIONS:
- Write a reply in a "${tone || "professional"}" tone
- ${senderName ? `The sender's name is: ${senderName}` : "Detect the sender's name from the email if possible"}
- ${context ? `Additional context from the user: ${context}` : ""}
- Keep the reply natural, concise, and appropriate for the tone
- Do NOT add placeholder text like [your name] — write a complete, ready-to-send reply
- Start directly with the greeting (e.g., Hi John,)
- End with an appropriate sign-off

Tone guide:
- Professional: formal, respectful, business-like
- Casual: friendly, relaxed, conversational
- Friendly: warm, personable, approachable
- Formal: very structured, no contractions, corporate
- Enthusiastic: energetic, positive, excited

Write only the email reply, nothing else.
`;

  try {
    console.log(`Generating ${tone} reply...`);

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract the text from Claude's response
    const reply = message.content[0].text;

    console.log("Reply generated successfully!");

    // Send the reply back to the frontend
    res.json({ reply });
  } catch (error) {
    console.error("Error calling Claude API:", error.message);

    if (error.status === 401) {
      res.status(401).json({
        error:
          "Invalid API key. Please check your .env file and make sure your Anthropic API key is correct.",
      });
    } else if (error.status === 429) {
      res.status(429).json({
        error: "Too many requests. Please wait a moment and try again.",
      });
    } else {
      res.status(500).json({
        error: "Something went wrong. Please try again.",
      });
    }
  }
});

// Health check — open http://localhost:3000/health to see if server is running
app.get("/health", (req, res) => {
  res.json({ status: "Server is running!", port: PORT });
});

// Start the server
app.listen(PORT, () => {
  console.log("========================================");
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📧 Gmail Reply Generator is ready!`);
  console.log("========================================");
});
