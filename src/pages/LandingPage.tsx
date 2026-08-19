import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Play, 
  Mic, 
  Cpu, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Zap, 
  Target,
  Award,
  Layers,
  Activity
} from 'lucide-react';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';
import { InterviewRoom3D } from '../components/3d/InterviewRoom3D';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {

  return (
    <div className="pt-24 pb-20 space-y-24">
      
      {/* 1. CINEMATIC HERO SECTION WITH 3D AI INTERVIEWER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vision & CTAs (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Next-Gen AI Interview Simulation Engine 2.6</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.1]">
              Practice Interviews. <br />
              <span className="text-gradient-cyan">Build Confidence.</span> <br />
              Get Hired.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              InterviewIQ simulates realistic AI interviews and gives you actionable feedback on every answer. Experience adaptive follow-up questions, 3D holographic presence, and real-time voice speech analysis.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap pt-2">
              <Link to="/interview/new">
                <Button3D variant="primary" size="lg" icon={<Play className="w-5 h-5 fill-white" />}>
                  START MOCK INTERVIEW
                </Button3D>
              </Link>

              <Link to="/dashboard">
                <Button3D
                  variant="secondary"
                  size="lg"
                  icon={<Zap className="w-5 h-5 text-cyan-400" />}
                >
                  EXPLORE DASHBOARD
                </Button3D>
              </Link>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl font-black text-white font-display">94.8%</p>
                <p className="text-xs text-slate-400">Offer Conversion Rate</p>
              </div>
              <div>
                <p className="text-2xl font-black text-cyan-400 font-display">12,000+</p>
                <p className="text-xs text-slate-400">Simulated Interviews</p>
              </div>
              <div>
                <p className="text-2xl font-black text-purple-400 font-display">24ms</p>
                <p className="text-xs text-slate-400">AI Adaptive Latency</p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic AI Interviewer Studio (Col 5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Ambient Glow Aura */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-2xl pointer-events-none" />
              
              <div className="relative">
                <InterviewRoom3D avatarState="SPEAKING" audioVolume={45} className="w-full h-[440px]" />
                
                {/* Floating Holographic Telemetry Badge */}
                <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-3 backdrop-blur-xl">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Voice & Speech Analysis</p>
                    <p className="text-[10px] text-cyan-300 font-mono">138 WPM • 95% Clarity Score</p>
                  </div>
                </div>

                {/* Floating Adaptive Difficulty Badge */}
                <div className="absolute -top-4 -right-4 glass-panel px-3.5 py-2 rounded-2xl border border-white/15 shadow-2xl flex items-center gap-2 backdrop-blur-xl">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-emerald-300 font-bold">Adaptive Follow-Up: ON</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 4-STEP AI INTERVIEW LIFECYCLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="purple" size="md">ENGINEERED FOR SERIOUS CANDIDATES</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            How InterviewIQ Simulates a Real Interviewer
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Unlike static question lists or chatbots, InterviewIQ actively evaluates your answers, digs into your resume claims, and challenges you with contextual follow-up questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 font-black font-display text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Upload Resume & Target JD</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts projects, tools, and technical experience. Calculates a Resume-JD Match Score and identifies your exact skill gaps.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-400 font-black font-display text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Enter 3D AI Interview Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sit in front of a holographic AI avatar. Answer questions via voice or text with a real-time Web Audio API waveform.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center text-purple-400 font-black font-display text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Adaptive Follow-Up Probing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The AI listens, detects incomplete points or strong answers, and escalates difficulty with intelligent follow-up inquiries.
            </p>
          </div>

          {/* Step 4 */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 font-black font-display text-lg">
              04
            </div>
            <h3 className="text-lg font-bold text-white">Comprehensive Score & Plan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive a structured evaluation breakdown (Technical, Relevance, Clarity, Completeness) and a personalized 4-week study plan.
            </p>
          </div>

        </div>
      </section>

      {/* 3. ROLES SUPPORTED SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/30 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <Badge variant="cyan" size="md">MULTI-DOMAIN SPECIALIZATION</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Tailored Interview Tracks for Every Tech Role
            </h2>
            <p className="text-sm text-slate-300">
              Practice specialized question banks engineered with industry hiring managers:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {[
                'Data Analyst',
                'Full Stack Developer',
                'Frontend Developer',
                'Software Developer',
                'Business Analyst',
                'Data Scientist',
                'QA & Automation',
                'System Architecture',
                'Custom User Role'
              ].map((role, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-semibold">{role}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Link to="/interview/new">
                <Button3D variant="primary" size="md">
                  Configure Your Target Role →
                </Button3D>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="glass-panel-glow p-10 sm:p-16 rounded-3xl border border-cyan-500/30 max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display">
            Ready to Ace Your Next Real Interview?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Simulate high-stakes technical and behavioral rounds today with zero risk and 100% actionable feedback.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/interview/new">
              <Button3D variant="primary" size="lg" icon={<Play className="w-5 h-5 fill-white" />}>
                START MOCK INTERVIEW NOW
              </Button3D>
            </Link>
            <Link to="/dashboard">
              <Button3D variant="secondary" size="lg">
                View Performance Dashboard
              </Button3D>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
