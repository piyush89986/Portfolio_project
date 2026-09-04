import { OpenAI } from "openai";
import { knowledge, buildSystemPrompt } from "../server/knowledge.js";

// Optional in-memory cache for serverless warm instances
const serverlessCache = new Map();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
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

    // 1. Check warm cache
    if (serverlessCache.has(cacheKey)) {
      return res.json({
        response: serverlessCache.get(cacheKey),
        source: "serverless-cache",
      });
    }

    let answerText = "";
    const apiKey = process.env.OPENAI_API_KEY;

    // 2. Call OpenAI if key is present in Vercel Environment Variables
    if (apiKey && apiKey.trim().length > 5) {
      try {
        const openai = new OpenAI({ apiKey: apiKey.trim() });
        const systemPrompt = buildSystemPrompt();

        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: cleanMessage },
          ],
          temperature: 0.4,
          max_tokens: 450,
        });

        answerText = completion.choices[0]?.message?.content?.trim() || "";
      } catch (err) {
        console.error("OpenAI Error on Vercel:", err.message);
      }
    }

    // 3. Fallback to knowledge base if OpenAI is not configured or failed
    if (!answerText) {
      answerText = generateFallbackAnswer(cleanMessage);
    }

    // Cache common query in warm instance
    if (cleanMessage.length < 60) {
      serverlessCache.set(cacheKey, answerText);
    }

    return res.json({
      response: answerText,
      source: apiKey ? "openai-serverless" : "knowledge-engine",
    });
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      fallback: generateFallbackAnswer(req.body?.message || ""),
    });
  }
}

function generateFallbackAnswer(query) {
  const q = (query || "").toLowerCase();

  if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language")) {
    return `### ⚡ Technical Stack & Proficiencies

• **Frontend:** ${knowledge.skills.frontend.join(", ")}
• **Backend:** ${knowledge.skills.backend.join(", ")}
• **Databases:** ${knowledge.skills.databases.join(", ")}
• **Cloud & DevOps:** ${knowledge.skills.devops_cloud.join(", ")}
• **Design & Tools:** ${knowledge.skills.design_tools.join(", ")}

*Piyush specializes in combining high-performance React architectures with Three.js 3D animations and scalable Node.js backends.*`;
  }

  if (q.includes("project") || q.includes("portfolio") || q.includes("github") || q.includes("built")) {
    const list = knowledge.projects
      .map(
        (p, i) =>
          `${i + 1}. **${p.title}** (${p.technologies.slice(0, 3).join(", ")})\n   • ${p.description}\n   • [GitHub Repository](${p.github})`
      )
      .join("\n\n");

    return `### 🚀 Featured Engineering Projects\n\n${list}\n\n*Explore all 40+ repositories on his [GitHub Profile](${knowledge.candidate.github})!*`;
  }

  if (q.includes("experience") || q.includes("work") || q.includes("intern") || q.includes("company")) {
    const expList = knowledge.experience
      .map(
        (exp) =>
          `**${exp.role} @ ${exp.company}** *(${exp.duration})*\n${exp.highlights.map((h) => `• ${h}`).join("\n")}`
      )
      .join("\n\n");

    return `### 💼 Professional Experience & Internships\n\n${expList}`;
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("linkedin")) {
    return `### 📬 Ready to Connect & Hire!

Piyush is available for full-time roles, internships, and freelance projects:

• ✉️ **Direct Email:** [${knowledge.candidate.email}](mailto:${knowledge.candidate.email})
• 💼 **LinkedIn:** [Piyush Singh Tanwar](${knowledge.candidate.linkedin})
• 🐙 **GitHub:** [github.com/piyush89986](${knowledge.candidate.github})
• 🐦 **X (Twitter):** [@piyushsing91395](${knowledge.candidate.twitter})

*You can also send a direct message through the Contact form on the portfolio.*`;
  }

  return `Hello! Ask me anything about Piyush's skills, projects, work experience, or contact details:

• **Technical Skills** — React, Node.js, Three.js, GSAP, MongoDB, Tailwind
• **Featured Projects** — AI Image Enhancer, Jarvis AI, 3D Web Apps
• **Work Experience** — Mindcoders & Shivanski Technologies internships
• **Contact & Socials** — Direct email, LinkedIn, and GitHub links`;
}
