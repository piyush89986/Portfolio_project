# 🌌 Piyush Singh Tanwar — 3D Developer Portfolio & AI Agent

<div align="center">

![Three.js](https://img.shields.io/badge/Three.js-3D%20Experience-black?style=for-the-badge&logo=three.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)
![OpenAI](https://img.shields.io/badge/OpenAI-AI%20Agent-412991?style=for-the-badge&logo=openai)
![Redis](https://img.shields.io/badge/Redis-Cache%20%26%20Memory-DC382D?style=for-the-badge&logo=redis)

**A high-performance, futuristic 3D developer portfolio featuring interactive Three.js scenes, a full-page galaxy starfield, and an intelligent AI Recruiter Agent powered by Node.js, OpenAI, and Redis.**

[Live Demo](https://piyush89986.github.io/) • [Report Bug](https://github.com/piyush89986/Portfolio_project/issues) • [Request Feature](https://github.com/piyush89986/Portfolio_project/issues)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Client Setup](#1-frontend-setup)
  - [Server Setup](#2-backend-ai-agent-setup)
- [Environment Variables](#-environment-variables)
- [AI Knowledge Base Customization](#-ai-knowledge-base-customization)
- [Deployed Live Projects](#-deployed-live-projects)
- [Contact & Connect](#-contact--connect)
- [License](#-license)

---

## 🌟 Overview

This portfolio serves as a showcase of Piyush's skills as a **Full-Stack Developer, DevOps & Software Engineer**. It bridges aesthetic visual engineering with backend reliability:
- **Immersive 3D Visuals**: Realistic Desktop PC and planetary Earth models built using Three.js and `@react-three/fiber`.
- **Global Galaxy Starfield**: A 3D rotating star particle system that gracefully encompasses the entire application background.
- **Interactive AI Recruiter Agent**: A cyber-themed chat assistant that provides recruiters, engineering managers, and clients instant factual answers about Piyush's skills, work experience, projects, and contact details.

---

## ✨ Key Features

### 1. 🤖 Interactive AI Recruiter Agent
- **Floating Cyber Trigger**: Positioned in the bottom-right corner with a glowing animated ping halo.
- **Glassmorphic Cyber Terminal**: Minimalist header (`🤖 Ask about Piyush`), quick-action suggestion chips, and responsive chat stream.
- **Node.js + OpenAI + Redis Backend**:
  - **OpenAI Integration**: Powered by `gpt-4o-mini` (or configurable model) with strict factual guardrails.
  - **Redis Conversation Memory**: Remembers multi-turn conversation context per visitor session.
  - **Redis Smart Caching**: Caches frequent questions for sub-10ms response times.
  - **Single Knowledge Base File**: Easily edit all resume details in `server/knowledge.js`.
  - **Graceful Fallback**: If Redis or an OpenAI key is missing, it falls back seamlessly to the built-in local knowledge engine without failing.

### 2. 🌌 Global 3D Starfield Galaxy
- Ambient 3D starfield particles generated with `maath/random` and rendered through Three.js.
- Spans continuously across the whole page (Hero, About, Tech, Projects, Testimonials, Contact, and Footer) with zero click-blocking (`pointer-events-none`).

### 3. 🎨 Modern Cyber Glassmorphic Theme
- Curated dark obsidian and slate color palette.
- Translucent frosted glass surfaces with subtle borders and neon glow accents.
- Responsive mobile menu and glassmorphic navbar with backdrop blur.

### 4. 💼 Interactive Portfolio Sections
- **Hero**: 3D Desktop PC setup with orbital camera controls and dynamic lighting.
- **About**: Tilt-interactive service cards on elevated glass pedestals.
- **Skills & Tech**: Modern categorized tech badges with hover glow and label tooltips.
- **Work Experience**: Vertical timeline documenting software developer internships at **Mindcoders** and **Shivanski Technologies**.
- **Projects**: Project cards with live demo links, GitHub source repositories, and detailed popup modals.
- **Contact & Footer**: Direct email messaging via **EmailJS** accompanied by a rotating 3D Earth model.

---

## 🛠 Tech Stack

### Frontend
| Technology | Description |
|---|---|
| **React 18** | Core component library & UI rendering |
| **Three.js** | WebGL 3D graphics rendering |
| **@react-three/fiber** | React declarative wrapper for Three.js |
| **@react-three/drei** | Useful 3D helpers, loaders & camera controls |
| **GSAP & ScrollTrigger** | High-performance scroll-driven animations |
| **Framer Motion** | Physics-based UI transitions and slide-in effects |
| **Tailwind CSS** | Utility-first responsive styling and glassmorphism |
| **Vite** | Next-generation frontend build tooling and local dev server |
| **EmailJS** | Client-side email dispatch for the contact form |

### Backend (AI Agent Service)
| Technology | Description |
|---|---|
| **Node.js & Express** | Lightweight, scalable REST API server |
| **OpenAI SDK** | Powers the generative AI recruiter assistant (`gpt-4o-mini`) |
| **ioredis** | High-performance Redis client for caching and session history |
| **express-rate-limit** | API rate limiting for security and quota protection |
| **dotenv & CORS** | Environment variable management and cross-origin security |

---

## 📁 Project Architecture

```
Portfolio_project/
├── public/
│   ├── desktop_pc/        # 3D GLTF model for Hero computer
│   └── planet/            # 3D GLTF model for Contact Earth
├── server/                # Node.js AI Agent Backend
│   ├── .env               # Server environment variables (OpenAI, Redis)
│   ├── .env.example       # Example server environment template
│   ├── knowledge.js       # ⭐ SINGLE DEDICATED FILE for AI knowledge & instructions
│   ├── package.json       # Backend dependencies
│   └── server.js          # Express server with OpenAI & Redis integration
├── src/
│   ├── assets/            # Project images, company logos, icons
│   ├── components/
│   │   ├── ai/            # AI Agent UI & local knowledge engine
│   │   │   ├── AIAgent.jsx
│   │   │   └── aiKnowledge.js
│   │   ├── canvas/        # Three.js Canvases (Computers, Earth, Stars)
│   │   │   ├── Computers.jsx
│   │   │   ├── Earth.jsx
│   │   │   └── Stars.jsx
│   │   ├── About.jsx      # About & Services section
│   │   ├── Contact.jsx    # Contact form & Earth canvas
│   │   ├── Experience.jsx # Work experience timeline
│   │   ├── Feedbacks.jsx  # Testimonials section
│   │   ├── Footer.jsx     # Social links and copyright
│   │   ├── Hero.jsx       # Hero section banner & 3D computer
│   │   ├── Navbar.jsx     # Navigation bar with glassmorphism
│   │   ├── Tech.jsx       # Technology skills grid
│   │   └── Works.jsx      # Projects showcase & modal viewer
│   ├── constants/         # Content arrays (projects, experiences, links)
│   ├── hoc/               # SectionWrapper higher-order component
│   ├── styles.js          # Reusable typography and padding utility classes
│   ├── App.jsx            # Application root
│   ├── index.css          # Global CSS, gradients, and custom utilities
│   └── main.jsx           # React DOM entry point
├── package.json           # Frontend dependencies
├── tailwind.config.cjs    # Tailwind configuration & custom theme tokens
└── vite.config.js         # Vite configuration & /api proxy to Node backend
```

---

## 🚀 Getting Started

Follow these steps to run the portfolio and the AI backend locally:

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- *(Optional)* **Redis** instance (local or cloud like [Upstash](https://upstash.com/))
- *(Optional)* **OpenAI API Key** ([platform.openai.com](https://platform.openai.com/api-keys))

---

### 1. Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/piyush89986/Portfolio_project.git
   cd Portfolio_project
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Configure Frontend Environment:**
   Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the Frontend Dev Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

### 2. Backend (AI Agent) Setup

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install server dependencies:**
   ```bash
   npm install
   ```

3. **Configure Server Environment:**
   Create a `.env` file in `server/` (based on `server/.env.example`):
   ```env
   PORT=5000
   OPENAI_API_KEY=sk-proj-yourOpenAIKeyHere
   OPENAI_MODEL=gpt-4o-mini
   REDIS_URL=redis://localhost:6379
   ```
   > **Note:** If you don't have an OpenAI key or Redis instance running right away, the server will automatically run in **fallback mode**, answering questions accurately using the local knowledge base without errors!

4. **Start the AI Backend:**
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:5000`.
   - Health check: `http://localhost:5000/api/health`
   - Chat endpoint: `http://localhost:5000/api/chat`

---

## ⚙️ Environment Variables

### Root (`.env`) — Frontend
| Variable | Description |
|---|---|
| `VITE_APP_EMAILJS_SERVICE_ID` | EmailJS Service ID for sending contact emails |
| `VITE_APP_EMAILJS_TEMPLATE_ID` | EmailJS Template ID |
| `VITE_APP_EMAILJS_PUBLIC_KEY` | EmailJS Public Key |

### Server (`server/.env`) — Backend
| Variable | Description | Default |
|---|---|---|
| `PORT` | Port for the Express backend server | `5000` |
| `OPENAI_API_KEY` | OpenAI API Secret Key | *(Optional)* |
| `OPENAI_MODEL` | OpenAI Model Name | `gpt-4o-mini` |
| `REDIS_URL` | Connection URL for Redis caching & memory | `redis://localhost:6379` *(Optional)* |

---

## 🧠 AI Knowledge Base Customization

All knowledge, instructions, and facts used by the AI Agent are located in a **single, organized file**:
👉 **[`server/knowledge.js`](file:///c:/Users/DELL/Desktop/Github/Portfolio_project/server/knowledge.js)**

To update what the AI agent knows about you:
1. Open `server/knowledge.js`.
2. Update the sections:
   - **`systemInstructions`**: Change how the AI responds and behaves.
   - **`candidate`**: Update your email, location, bio, or links.
   - **`skills`**: Add new frameworks, tools, or languages.
   - **`experience`**: Add new internships, jobs, or promotions.
   - **`projects`**: Add new projects with GitHub links.
   - **`faqs`**: Add custom answers for common recruiter questions.
3. Save the file — the server automatically injects your updated information into every response!

---

## 🌐 Deployed Live Projects

Here are some of Piyush's live deployed web applications:

| Project | Live Demo Link |
|---|---|
| **Weather & Location Tracker** | [weathertracker-8zu5.onrender.com](https://weathertracker-8zu5.onrender.com/) |
| **AI Bot 2.0** | [bot2-0-qukr.vercel.app](https://bot2-0-qukr.vercel.app/) |
| **J.A.R.V.I.S Study Assistant** | [jarvis0f.vercel.app](https://jarvis0f.vercel.app/) |
| **Instagram Bot** | [instabotfr.vercel.app](https://instabotfr.vercel.app/) |
| **Interactive Chess Game** | [chess-application-two.vercel.app](https://chess-application-two.vercel.app/) |

---

## 📬 Contact & Connect

- **Full Name:** Piyush Singh Tanwar
- **Email:** [tanwarpiyushsingh31@gmail.com](mailto:tanwarpiyushsingh31@gmail.com)
- **GitHub:** [@piyush89986](https://github.com/piyush89986)
- **LinkedIn:** [Piyush Singh Tanwar](https://www.linkedin.com/in/piyush-singh-tanwar-07a03833b)
- **Twitter / X:** [@piyushsing91395](https://x.com/piyushsing91395)
- **Instagram:** [@piyush___._._](https://www.instagram.com/piyush___._._/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
