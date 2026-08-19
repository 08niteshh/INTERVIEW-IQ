import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Github, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-white font-display">
                Interview<span className="text-gradient-cyan">IQ</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400">
              AI-Powered Interview Simulation & Career Intelligence Platform. Practice real technical, HR, and behavioral interviews with interactive 3D holograms.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production AI Simulator v2.6</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase font-mono text-[11px] mb-3">Interview Modes</h4>
            <ul className="space-y-2">
              <li><Link to="/interview/new?type=TECHNICAL" className="hover:text-cyan-400">Technical Coding & Architecture</Link></li>
              <li><Link to="/interview/new?type=BEHAVIORAL" className="hover:text-cyan-400">Behavioral STAR Probing</Link></li>
              <li><Link to="/interview/new?type=PROJECT" className="hover:text-cyan-400">Resume Project Deep Dive</Link></li>
              <li><Link to="/interview/new?type=JD_BASED" className="hover:text-cyan-400">Job Description Targeted</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase font-mono text-[11px] mb-3">Career Tools</h4>
            <ul className="space-y-2">
              <li><Link to="/resume" className="hover:text-cyan-400">Resume Entity Parser</Link></li>
              <li><Link to="/job-match" className="hover:text-cyan-400">Resume-JD Skill Gap Matcher</Link></li>
              <li><Link to="/practice" className="hover:text-cyan-400">Targeted Weak-Topic Drills</Link></li>
              <li><Link to="/improvement" className="hover:text-cyan-400">Personalized 4-Week Plan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase font-mono text-[11px] mb-3">Platform Status</h4>
            <div className="p-3 rounded-2xl glass-card border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>3D Neural Voice Engine: Online</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Low Latency Web Audio API with real-time spectrum analysis enabled.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 InterviewIQ Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-cyan-400">Next-Gen Career Intelligence</span>
            <span>•</span>
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
