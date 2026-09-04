import { OpenAI } from "openai";
import { buildSystemPrompt } from "../server/knowledge.js";

// Optional in-memory cache for serverless warm instances
const serverlessCache = new Map();

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const cleanMessage = message.trim();
    const cacheKey = `cache:${cleanMessage.toLowerCase()}`;

    // 1. Check warm cache for exact recent query
    if (serverlessCache.has(cacheKey)) {
      return res.json({
        response: serverlessCache.get(cacheKey),
        source: "serverless-cache",
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey.trim().length < 10) {
      return res.status(400).json({
        error:
          "⚠️ OPENAI_API_KEY is not configured in Vercel Environment Variables. Please add your key in Vercel Dashboard -> Settings -> Environment Variables.",
      });
    }

    // 2. Call OpenAI with dynamic candidate knowledge base
    const openai = new OpenAI({ apiKey: apiKey.trim() });
    const systemPrompt = buildSystemPrompt();

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: cleanMessage },
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    const answerText = completion.choices[0]?.message?.content?.trim();

    if (!answerText) {
      return res.status(500).json({
        error: "OpenAI returned an empty response. Please try asking again.",
      });
    }

    // Cache common short queries
    if (cleanMessage.length < 60) {
      serverlessCache.set(cacheKey, answerText);
    }

    return res.json({
      response: answerText,
      source: "openai-serverless",
    });
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error);
    return res.status(500).json({
      error: `AI Error: ${error.message || "Something went wrong on the server."}`,
    });
  }
}
