# InterviewIQ — AI-Powered Interview Simulation & Career Intelligence Platform

live demo = interview-iq-ashy.vercel.app

[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL_3D-black?logo=three.js)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **"Practice Interviews. Build Confidence. Get Hired."**  
> A futuristic 2026 flagship AI career coaching platform simulating realistic, adaptive job interviews with interactive 3D holographic presence, real-time voice spectrum analysis, resume entity extraction, and multi-dimensional evaluation intelligence.

---

## 🌟 Key Highlights & Core Features

### 1. 🪐 3D Holographic AI Interviewer
- **Interactive WebGL Simulation**: High-fidelity Three.js and React Three Fiber (`@react-three/fiber`, `@react-three/drei`) avatar with glowing cybernetic orbitals and particle field physics.
- **Dynamic Reactive States**:
  - `SPEAKING`: Cyan and electric blue frequency resonance.
  - `LISTENING`: Deep neon cyan pulse with contracting energy rings responding to voice volume.
  - `THINKING`: Purple neural particle sweeps and data node orbiters.
  - `EVALUATING`: Emerald scanning matrix telemetry.

---

### 2. 🎙️ Real-Time Voice & Web Audio Waveform
- **Live Frequency Spectrum**: Powered by `AudioContext` and `AnalyserNode` connected to your microphone.
- **Speech-to-Text & TTS**: Continuous speech recognition transcript stream with Web Speech Synthesis voice narration (mute/pause/replay controls).
- **Candidate Speech Telemetry**: Measures speaking speed (WPM), detects filler words ("um", "like", "basically"), and measures speech clarity.

---

### 3. 🧠 Adaptive Follow-Up Questioning Engine
- **Contextual Probing**: Analyzes candidate answers and extracts project claims from the resume to generate deep technical follow-ups.
- **Adaptive Difficulty**: Escalates question complexity on strong answers (Score > 85) and probes fundamental foundations if the candidate struggles.

---

### 4. 📄 Resume Entity Parser & JD Gap Matcher
- **Resume Analysis**: Parses skills, project architectures (e.g. FleetIQ, SmartCart), education, and certifications.
- **Resume vs JD Comparison Matrix**: Calculates Overall Match %, Skill Match %, Experience Match %, and identifies missing requirements with customized interview questions.

---

### 5. 📊 Multi-Dimensional Performance Reports & 4-Week Plan
- **Detailed Evaluation Radar**: Technical Depth, Relevance, Problem Solving, Clarity, Completeness, Behavioral STAR.
- **Answer-by-Answer Critique**: What you did well, what to improve, and optimal 3-part answer templates.
- **4-Week Study Roadmap**: Weekly study goals, priority drill recommendations, and milestone checklists.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite 6, React Router DOM 7
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Audio & Speech**: Web Audio API (AnalyserNode), Web Speech Recognition, Web Speech Synthesis
- **Styling & UI**: Tailwind CSS v4, Glassmorphism design tokens, Lucide React
- **Data Visualization & Effects**: Recharts, Canvas Confetti

---

## 🚀 Quick Start & Local Setup

```bash
# 1. Clone repository
git clone https://github.com/<YOUR_GITHUB_USERNAME>/interviewiq.git
cd interviewiq

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:3001
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🔑 1-Click Demo Personas

| Persona | Track Role | Target Employer | Focus Areas |
| :--- | :--- | :--- | :--- |
| **Nitesh Yadav** | Data Analyst | Nexora Technologies | SQL Window Functions, Power BI DAX, IoT FleetIQ Analytics |
| **Alex Vance** | Full Stack Developer | High-Growth Tech | React 18 Concurrent Rendering, PostgreSQL Concurrency |
| **Priya Sharma** | Frontend Developer | Modern SaaS | JavaScript Event Loop, Core Web Vitals, CSS Grid |

---

## 📂 Project Directory Structure

```
interviewiq/
├── src/
│   ├── components/
│   │   ├── 3d/                 # Hologram Avatar, Canvas, Ambient HUD
│   │   ├── interview/          # Audio Waveform, Transcript, Question Cards
│   │   ├── layout/             # Navbar, Footer, Mobile Menu
│   │   └── ui/                 # Button3D, Badges, Modals
│   ├── context/
│   │   ├── AuthContext.tsx     # Session management & demo accounts
│   │   ├── ResumeContext.tsx   # PDF parser & JD matching engine
│   │   └── InterviewContext.tsx# State machine, Web Audio, AI evaluations
│   ├── data/                   # Question banks, sample resumes, mock sessions
│   ├── pages/
│   │   ├── LandingPage.tsx     # 3D Hero, Features, Demo launch
│   │   ├── DashboardPage.tsx   # Command center & progression charts
│   │   ├── InterviewStudioPage.tsx # 3D AI Interview Room
│   │   ├── ResultsPage.tsx     # Comprehensive score reports & radars
│   │   ├── ResumePage.tsx      # Resume upload & parsed entity hub
│   │   ├── JobMatchPage.tsx    # Resume vs JD Skill Gap analyzer
│   │   ├── ImprovementPlanPage.tsx # 4-week study roadmap
│   │   ├── PracticePage.tsx    # Instant weak area drill simulator
│   │   ├── AnalyticsPage.tsx   # Longitudinal progression metrics
│   │   └── HistoryPage.tsx     # Historical sessions archive
│   ├── types/                  # TypeScript Domain Models & Schemas
│   ├── App.tsx                 # Route declarations & provider tree
│   ├── main.tsx                # Entrypoint
│   └── index.css               # Spatial Glass Design System & Tailwind v4
├── package.json
└── vite.config.ts
```

---

## 📄 License
MIT License © 2026 InterviewIQ Labs
