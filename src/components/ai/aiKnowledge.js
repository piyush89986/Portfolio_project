// Knowledge base and smart conversational engine for Piyush's AI Recruiter Agent

export const PIYUSH_PROFILE = {
  name: "Piyush Singh Tanwar",
  role: "Full-Stack Developer, DevOps & Software Engineer",
  email: [`piyush27082006@gmail.com` `tanwarpiyushsingh31@gmail.com`],
  resume: "https://drive.google.com/file/d/1JNDUwo1Tu0stzwYIa8wYti_jmC24MzPo/view?usp=drive_link",
  github: "https://github.com/piyush89986",
  linkedin: "https://www.linkedin.com/in/piyush-singh-tanwar-07a03833b",
  twitter: "https://x.com/piyushsing91395",
  instagram: "https://www.instagram.com/piyush.singh.tanwar",
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
