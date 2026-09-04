import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import Redis from "ioredis";
import rateLimit from "express-rate-limit";
import { knowledge, buildSystemPrompt } from "./knowledge.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Comprehensive CORS configuration
const allowedOrigins = [
  "https://portfolio-project-nu-ashen.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Allow all for portfolio public API
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());


// Apply rate limiting: max 40 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// ---------------------------------------------------------------------------
// REDIS CONNECTION & FALLBACK IN-MEMORY CACHE
// ---------------------------------------------------------------------------
let redisClient = null;
let isRedisConnected = false;
const inMemoryCache = new Map();
const inMemorySessions = new Map();

try {
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  redisClient = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    retryStrategy(times) {
      if (times > 3) {
        return null; // Stop retrying after 3 attempts and fall back to memory
      }
      return Math.min(times * 200, 1000);
    },
    connectTimeout: 2000,
    enableOfflineQueue: false,
  });

  redisClient.on("connect", () => {
    isRedisConnected = true;
    console.log("✅ [Redis] Connected successfully to:", redisUrl);
  });

  redisClient.on("error", (err) => {
    isRedisConnected = false;
    // Suppress repeated stack traces when Redis is not running locally
    console.warn("⚠️  [Redis] Offline or not reachable. Operating with in-memory fallback.");
  });
} catch (error) {
  isRedisConnected = false;
  console.warn("⚠️  [Redis] Initialization skipped. Using in-memory store.");
}

// Redis Helper: Get Cached Response
async function getCache(key) {
  if (isRedisConnected && redisClient) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return inMemoryCache.get(key) || null;
    }
  }
  return inMemoryCache.get(key) || null;
}

// Redis Helper: Set Cached Response
async function setCache(key, value, ttlSeconds = 86400) {
  if (isRedisConnected && redisClient) {
    try {
      await redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
      return;
    } catch {
      // Fallback
    }
  }
  inMemoryCache.set(key, value);
}

// Redis Helper: Get Session Chat History
async function getSessionHistory(sessionId) {
  const key = `session:${sessionId}:history`;
  if (isRedisConnected && redisClient) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return inMemorySessions.get(sessionId) || [];
    }
  }
  return inMemorySessions.get(sessionId) || [];
}

// Redis Helper: Save Session Chat History (1 hour TTL)
async function saveSessionHistory(sessionId, history) {
  const key = `session:${sessionId}:history`;
  const trimmed = history.slice(-6); // Keep last 6 conversational turns
  if (isRedisConnected && redisClient) {
    try {
      await redisClient.set(key, JSON.stringify(trimmed), "EX", 3600);
      return;
    } catch {
      // Fallback
    }
  }
  inMemorySessions.set(sessionId, trimmed);
}

// ---------------------------------------------------------------------------
// OPENAI CLIENT CONFIGURATION
// ---------------------------------------------------------------------------
const apiKey = process.env.OPENAI_API_KEY;
let openai = null;

if (apiKey && apiKey.trim().length > 5) {
  openai = new OpenAI({ apiKey: apiKey.trim() });
  console.log("✅ [OpenAI] API client initialized with model:", process.env.OPENAI_MODEL || "gpt-4o-mini");
} else {
  console.warn("ℹ️  [OpenAI] OPENAI_API_KEY not set in server/.env. Using built-in factual knowledge engine.");
}

// ---------------------------------------------------------------------------
// API ROUTES
// ---------------------------------------------------------------------------

/**
 * Health check endpoint
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    openaiConfigured: Boolean(openai),
    openaiModel: process.env.OPENAI_MODEL || "gpt-4o-mini",
    redisConnected: isRedisConnected,
    candidate: knowledge.candidate.fullName,
    projectsCount: knowledge.projects.length,
    skillsCount: Object.values(knowledge.skills).flat().length,
  });
});

/**
 * Chat endpoint for AI Recruiter Agent
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { message, sessionId = "default-session" } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const cleanMessage = message.trim();
    const cacheKey = `cache:query:${cleanMessage.toLowerCase()}`;

    // 1. Check Redis Cache for fast instant answer
    const cachedResponse = await getCache(cacheKey);
    if (cachedResponse) {
      return res.json({
        response: cachedResponse,
        source: "redis-cache",
      });
    }

    // 2. Retrieve session history for multi-turn conversation memory
    const history = await getSessionHistory(sessionId);

    let answerText = "";

    // 3. Call OpenAI if API key is provided
    if (openai) {
      try {
        const systemPrompt = buildSystemPrompt();

        const messages = [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: cleanMessage },
        ];

        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages,
          temperature: 0.5,
          max_tokens: 500,
        });

        answerText = completion.choices[0]?.message?.content?.trim() || "";
      } catch (openAiError) {
        console.error("OpenAI Error:", openAiError.message);
        return res.status(500).json({
          error: `OpenAI Error: ${openAiError.message}`,
        });
      }
    } else {
      return res.status(400).json({
        error: "OPENAI_API_KEY is not set in server/.env. Please configure your key.",
      });
    }

    if (!answerText) {
      return res.status(500).json({ error: "OpenAI returned an empty response." });
    }

    // 4. Update session history in Redis / memory
    history.push({ role: "user", content: cleanMessage });
    history.push({ role: "assistant", content: answerText });
    await saveSessionHistory(sessionId, history);

    // 5. Cache frequently asked queries in Redis for 24h
    if (cleanMessage.length < 60) {
      await setCache(cacheKey, answerText, 86400);
    }

    return res.json({
      response: answerText,
      source: "openai",
    });
  } catch (err) {
    console.error("Server Error in /api/chat:", err);
    res.status(500).json({
      error: err.message || "An error occurred while generating the response.",
    });
  }
});

// ---------------------------------------------------------------------------
// START SERVER
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`
🚀 ===================================================
   Piyush's Portfolio AI Agent Backend Server
   Running on: http://localhost:${PORT}
   API Health: http://localhost:${PORT}/api/health
   Knowledge Base: server/knowledge.js loaded
===================================================
  `);
});
