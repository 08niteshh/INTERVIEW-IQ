import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Sparkles, 
  Layers, 
  Mic, 
  Target,
  BarChart2,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/ui/Badge';
import { Button3D } from '../components/ui/Button3D';
import { Link } from 'react-router-dom';

const HISTORICAL_TREND_DATA = [
  { session: 'Mock 1 (Jan 18)', overall: 68, technical: 65, communication: 70, relevance: 72, completeness: 64 },
  { session: 'Mock 2 (Jan 28)', overall: 74, technical: 72, communication: 76, relevance: 78, completeness: 70 },
  { session: 'Mock 3 (Feb 05)', overall: 81, technical: 83, communication: 79, relevance: 85, completeness: 78 },
  { session: 'Mock 4 (Feb 12)', overall: 85, technical: 86, communication: 84, relevance: 89, completeness: 82 },
  { session: 'Mock 5 (Feb 16)', overall: 88, technical: 89, communication: 86, relevance: 94, completeness: 84 },
];

const CATEGORY_SCORES = [
  { name: 'SQL & Data Warehousing', score: 88 },
  { name: 'Power BI & DAX Modeling', score: 94 },
  { name: 'Diagnostic Root Cause', score: 90 },
  { name: 'Behavioral STAR Framework', score: 86 },
  { name: 'System Design & Scaling', score: 79 },
];

export const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const { pastInterviews } = useInterview();

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Longitudinal Performance Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Career Intelligence & <span className="text-gradient-cyan">Growth Trajectory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Your overall interview score has improved by <strong className="text-emerald-400">+20 points (+29.4%)</strong> across your last 5 simulated rounds.
          </p>
        </div>

        <Link to="/interview/new">
          <Button3D variant="primary" size="md">
            Simulate Next Mock
          </Button3D>
        </Link>
      </div>

      {/* 4 Performance Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">CURRENT SKILL INDEX</span>
          <p className="text-3xl font-black text-cyan-300 font-display">88 / 100</p>
          <span className="text-[10px] text-emerald-400 font-bold">Top 8% Candidate Cohort</span>
        </div>
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">TECHNICAL GROWTH</span>
          <p className="text-3xl font-black text-purple-300 font-display">+24 pts</p>
          <span className="text-[10px] text-purple-300">From 65 to 89</span>
        </div>
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">AVG SPEAKING CADENCE</span>
          <p className="text-3xl font-black text-white font-display">138 WPM</p>
          <span className="text-[10px] text-cyan-400">Within 130-150 range</span>
        </div>
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">COMPLETION CONSISTENCY</span>
          <p className="text-3xl font-black text-emerald-300 font-display">100%</p>
          <span className="text-[10px] text-emerald-400">5 of 5 finished</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Longitudinal Score Evolution (Col 8) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display">Multi-Session Score Evolution</h3>
            <span className="text-xs font-mono text-cyan-400">5 Sessions Tracked</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HISTORICAL_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="session" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '1rem', fontSize: '12px' }} />
                <Area type="monotone" dataKey="overall" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#scoreGrad2)" name="Overall Score" />
                <Area type="monotone" dataKey="technical" stroke="#a855f7" strokeWidth={2} fillOpacity={0} name="Technical Score" />
                <Area type="monotone" dataKey="communication" stroke="#10b981" strokeWidth={2} fillOpacity={0} name="Communication" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Scores Breakdown (Col 4) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white font-display">Topic Mastery Distribution</h3>
            <p className="text-xs text-slate-400">Current average scores across sub-domains:</p>

            <div className="space-y-3">
              {CATEGORY_SCORES.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                    <span className="font-mono text-cyan-300 font-bold">{cat.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <Link to="/practice">
              <button className="w-full py-2.5 rounded-xl glass-pill hover:bg-white/10 text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5 transition-all">
                <span>Practice Lowest Topic</span>
              </button>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
