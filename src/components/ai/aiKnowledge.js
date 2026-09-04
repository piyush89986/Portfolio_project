// Knowledge base and smart conversational engine for Piyush's AI Recruiter Agent

export const PIYUSH_PROFILE = {
  name: "Piyush Singh Tanwar",
  role: "Full-Stack Developer, DevOps & Software Engineer",
  email: "tanwarpiyushsingh31@gmail.com",
  github: "https://github.com/piyush89986",
  linkedin: "https://www.linkedin.com/in/piyush-singh-tanwar-07a03833b",
  twitter: "https://x.com/piyushsing91395",
  instagram: "https://www.instagram.com/piyush___._._/",
  summary:
    "Passionate Full-Stack and DevOps developer specializing in building high-performance modern web applications, interactive 3D experiences with Three.js & GSAP, and scalable full-stack software with the MERN stack and cloud integrations.",
  
  skills: {
    frontend: ["React.js", "JavaScript (ES6+)", "Three.js", "GSAP", "Framer Motion", "Tailwind CSS", "Redux Toolkit", "Material UI", "HTML5", "CSS3"],
    backend: ["Node.js", "Express.js", "REST APIs", "Python", "Authentication", "Socket.io"],
    databases: ["MongoDB", "MySQL"],
    devops_cloud: ["AWS", "Git", "GitHub Actions", "Docker / Container concepts", "CI/CD basics"],
    tools: ["Vite", "Figma", "Postman", "VS Code"]
  },

  experience: [
    {
      title: "MERN-Stack Developer Intern",
      company: "Mindcoders",
      period: "Oct 2025 - Jan 2025",
      points: [
        "Developed and maintained full-stack web applications using MongoDB, Express, React, and Node.js.",
        "Collaborated with cross-functional teams to engineer high-quality, responsive user interfaces.",
        "Ensured cross-browser compatibility and optimized front-end performance.",
        "Participated in agile code reviews and continuous integration workflows."
      ]
    },
    {
      title: "Software Developer Intern",
      company: "Shivanski Technologies LLP",
      period: "Jun 2026 - Aug 2025",
      points: [
        "Contributed to real-world software feature development and client requirements.",
        "Troubleshot technical bottlenecks and optimized system responsiveness.",
        "Strengthened version control, testing workflows, and team collaboration practices."
      ]
    }
  ],

  projects: [
    {
      name: "AI Image Enhancer",
      tech: "React, Tailwind CSS, Axios, AI Image API",
      description: "A web application that allows users to upload and dramatically enhance the resolution and quality of images instantly via an AI enhancement API.",
      github: "https://github.com/piyush89986/AI-IMAGE-INHANCER"
    },
    {
      name: "J.A.R.V.I.S Study Assistant",
      tech: "React, Vite, OpenAI API, Python",
      description: "An AI study assistant tailored for B.Tech engineering students with an interactive voice/text interface.",
      github: "https://github.com/piyush89986/jarvis0f"
    },
    {
      name: "GTA / Deadpool Style 3D Experience",
      tech: "React, GSAP, Three.js, Tailwind CSS",
      description: "A cinematic interactive landing page featuring parallax animations, text reveals, and 3D interactions.",
      github: "https://github.com/piyush89986/Gta-style-landing-page"
    },
    {
      name: "Real-Time Chat Application",
      tech: "React, Node.js, Socket.io, MongoDB",
      description: "Fast, reliable instant messaging platform with secure user authentication and instant message delivery.",
      github: "https://github.com/piyush89986/chatapp-Frontend"
    },
    {
      name: "Weather & Location Tracker",
      tech: "React, Redux Toolkit, Leaflet.js",
      description: "Interactive real-time mapping and meteorological tracking application with live coordinates.",
      github: "https://github.com/piyush89986/Weather-Tracker"
    },
    {
      name: "Interactive Chess Application",
      tech: "React, Node.js, MongoDB",
      description: "Web chess game with full move validation, check/checkmate detection, and smooth responsive UI.",
      github: "https://github.com/piyush89986/chess-application"
    }
  ]
};

export const RECRUITER_PROMPT_CHIPS = [
  { id: "skills", label: "⚡ Tech Stack & Skills", query: "What are your core technical skills and tools?" },
  { id: "projects", label: "🚀 Top Projects & Code", query: "Can you showcase your best projects and GitHub repos?" },
  { id: "experience", label: "💼 Work Experience", query: "Tell me about your work experience and internships." },
  { id: "hire", label: "📬 How to Hire & Contact", query: "How can I contact Piyush for job opportunities?" },
  { id: "strengths", label: "🎯 Key Strengths", query: "Why should we hire Piyush? What sets him apart?" }
];

export function generateAIResponse(input) {
  const query = (input || "").toLowerCase().trim();

  // Skills and Tech Stack query
  if (
    query.includes("skill") ||
    query.includes("stack") ||
    query.includes("tech") ||
    query.includes("languages") ||
    query.includes("framework") ||
    query.includes("frontend") ||
    query.includes("backend")
  ) {
    return `### ⚡ Piyush's Core Technical Stack

**Frontend & Interactive 3D:**
• **React.js & JavaScript (ES6+)** — Component architecture, state management, custom hooks
• **Three.js & React Three Fiber** — 3D scene rendering, GLTF models, shaders
• **GSAP & Framer Motion** — Fluid micro-animations, scroll-driven timelines
• **Tailwind CSS & Material UI** — Responsive modern styling & design systems

**Backend & Cloud:**
• **Node.js & Express.js** — RESTful APIs, middleware, server-side logic
• **MongoDB & MySQL** — Schema modeling, aggregation, query optimization
• **AWS & Git** — Cloud deployment, CI/CD workflows, collaborative version control

*Would you like to know about his projects built with these technologies?*`;
  }

  // Projects query
  if (
    query.includes("project") ||
    query.includes("portfolio") ||
    query.includes("github") ||
    query.includes("built") ||
    query.includes("code") ||
    query.includes("repo")
  ) {
    return `### 🚀 Featured Engineering Projects

Here are some of Piyush's standout projects:

1. **AI Image Enhancer**
   • *Tech:* React, Tailwind CSS, Image Enhancement API
   • Real-time image upscaling and quality enhancement.
   • [View Repository](${PIYUSH_PROFILE.projects[0].github})

2. **J.A.R.V.I.S Assistant**
   • *Tech:* React, OpenAI API, Python, Vite
   • AI study assistant designed specifically for B.Tech engineering curriculum.
   • [View Repository](${PIYUSH_PROFILE.projects[1].github})

3. **Cinematic 3D Landing Page (GTA/Deadpool)**
   • *Tech:* Three.js, React, GSAP, Parallax
   • High-impact interactive animations with responsive mouse tracking.
   • [View Repository](${PIYUSH_PROFILE.projects[2].github})

4. **Real-time Chat App**
   • *Tech:* MERN Stack, Socket.io
   • Full-stack messaging platform with instant communication.
   • [View Repository](${PIYUSH_PROFILE.projects[3].github})

*You can view all 40+ repositories on his [GitHub Profile](${PIYUSH_PROFILE.github})!*`;
  }

  // Experience & Internships query
  if (
    query.includes("experience") ||
    query.includes("work") ||
    query.includes("company") ||
    query.includes("intern") ||
    query.includes("mindcoder") ||
    query.includes("shivanski") ||
    query.includes("history")
  ) {
    return `### 💼 Professional Experience

**1. MERN-Stack Developer Intern @ Mindcoders**
*(Oct 2025 – Jan 2025)*
• Engineered full-stack modules using MongoDB, Express, React, and Node.js.
• Collaborated closely with UI/UX designers and team leads to deploy clean responsive pages.
• Ensured cross-browser performance and participated in structured code reviews.

**2. Software Developer Intern @ Shivanski Technologies LLP**
*(Jun 2026 – Aug 2025)*
• Developed features for client-facing software applications.
• Debugged system errors, profiled performance, and optimized application runtime.
• Practiced modern version control workflows and agile development sprints.`;
  }

  // Contact / Hire query
  if (
    query.includes("contact") ||
    query.includes("hire") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("linkedin") ||
    query.includes("interview") ||
    query.includes("available") ||
    query.includes("call")
  ) {
    return `### 📬 Ready to Connect & Hire Piyush!

Piyush is open to full-time roles, internships, and freelance software engineering opportunities:

• ✉️ **Direct Email:** [${PIYUSH_PROFILE.email}](mailto:${PIYUSH_PROFILE.email})
• 💼 **LinkedIn:** [Piyush Singh Tanwar](${PIYUSH_PROFILE.linkedin})
• 🐙 **GitHub:** [github.com/piyush89986](${PIYUSH_PROFILE.github})
• 🐦 **X (Twitter):** [@piyushsing91395](${PIYUSH_PROFILE.twitter})

*You can also scroll directly to the **Contact Section** at the bottom of the page to send him an instant message!*`;
  }

  // Strengths / Why Hire
  if (
    query.includes("why") ||
    query.includes("strength") ||
    query.includes("value") ||
    query.includes("hire him") ||
    query.includes("about")
  ) {
    return `### 🎯 Why Piyush is a Strong Addition to Your Team

• **End-to-End Capability:** Comfortably bridges the gap between frontend aesthetics (Three.js, GSAP, React) and backend reliability (Node.js, Express, MongoDB).
• **Creative Problem Solver:** Builds real tools—from AI image enhancers to real-time chat engines and interactive 3D worlds.
• **Fast Learner & Team Player:** Hands-on experience working in cross-functional agile teams during his internships.
• **DevOps & Clean Code Mindset:** Values version control, modular component structure, and deployment readiness.

*Feel free to click any suggestion below or ask about specific projects!*`;
  }

  // Default friendly response
  return `Hello! Ask me anything about Piyush's skills, projects, work experience, or contact details:

• **Technical Skills** — React, Node.js, Three.js, GSAP, MongoDB, Tailwind
• **Featured Projects** — AI Image Enhancer, Jarvis AI, 3D Web Apps
• **Work Experience** — Mindcoders & Shivanski Technologies internships
• **Contact & Socials** — Direct email, LinkedIn, and GitHub links

*Try clicking one of the quick chips below or asking a specific question!*`;
}
