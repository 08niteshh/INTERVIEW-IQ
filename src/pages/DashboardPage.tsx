import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Award, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Target, 
  ArrowUpRight, 
  Layers, 
  Sparkles,
  Dumbbell,
  Mic
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useInterview } from '../context/InterviewContext';
import { useResume } from '../context/ResumeContext';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';

const PROGRESS_CHART_DATA = [
  { attempt: 'Mock 1', score: 68, technical: 65, communication: 70 },
  { attempt: 'Mock 2', score: 74, technical: 72, communication: 76 },
  { attempt: 'Mock 3', score: 81, technical: 83, communication: 79 },
  { attempt: 'Mock 4', score: 88, technical: 89, communication: 86 },
];

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { pastInterviews, improvementPlan, activeSession } = useInterview();
  const { currentResume, currentMatch } = useResume();

  const lastInterview = pastInterviews[0];
  const lastScore = lastInterview?.reportScores?.overallScore || user?.averageScore || 88;
  const bestScore = Math.max(92, ...pastInterviews.map(i => i.reportScores?.overallScore || 0));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* 1. TOP WELCOME & HERO BANNER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-cyan-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Career Intelligence Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white font-display">
            Welcome back, <span className="text-gradient-cyan">{user?.name}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Target Track: <span className="text-cyan-400 font-bold">{user?.targetRole}</span> • Experience: {user?.experienceLevel?.replace('_', '-')} • Ready for your next interview simulation?
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 flex-wrap">
          {activeSession && activeSession.state !== 'COMPLETED' ? (
            <Link to={`/interview/${activeSession.id}`}>
              <Button3D variant="glow" size="md" icon={<Play className="w-4 h-4 fill-white" />}>
                Resume Active Interview
              </Button3D>
            </Link>
          ) : (
            <Link to="/interview/new">
              <Button3D variant="primary" size="md" icon={<Play className="w-4 h-4 fill-white" />}>
                Start Mock Interview
              </Button3D>
            </Link>
          )}

          <Link to="/practice">
            <Button3D variant="secondary" size="md" icon={<Dumbbell className="w-4 h-4 text-cyan-400" />}>
              Practice Weak Drills
            </Button3D>
          </Link>
        </div>
      </div>

      {/* 2. 4 CORE KPI METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">LAST SCORE</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-display">{lastScore} <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
          <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14 pts from initial mock
          </span>
        </div>

        {/* KPI 2 */}
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">BEST SCORE</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-purple-300 font-display">{bestScore} <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
          <span className="text-[10px] text-purple-300 font-mono">Top 5% Candidate Cohort</span>
        </div>

        {/* KPI 3 */}
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">INTERVIEWS TAKEN</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-display">{pastInterviews.length}</p>
          <span className="text-[10px] text-emerald-400 font-bold">5 Complete Evaluations</span>
        </div>

        {/* KPI 4 */}
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">PRACTICE TIME</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-300 font-display">{user?.practiceHours || 14.5} <span className="text-xs text-slate-400 font-normal">hrs</span></p>
          <span className="text-[10px] text-slate-400">Audio Speech: 4.2 hrs</span>
        </div>

      </div>

      {/* 3. PERFORMANCE CHART & RESUME-JD QUICK MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Longitudinal Score Velocity Chart (Col 8) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Performance Score Progression</h3>
              <p className="text-xs text-slate-400">Technical depth and communication clarity trajectory over past mocks</p>
            </div>
            <Link to="/analytics" className="text-xs font-mono text-cyan-400 hover:underline font-bold flex items-center gap-1">
              <span>Deep Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PROGRESS_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="attempt" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '1rem', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreGrad)" name="Overall Score" />
                <Area type="monotone" dataKey="technical" stroke="#a855f7" strokeWidth={2} fillOpacity={0} name="Technical Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resume & Match Card (Col 4) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-display">Target JD Match</h3>
              <Badge variant="cyan" size="sm">Active Profile</Badge>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center space-y-1">
              <p className="text-3xl font-black text-cyan-300 font-display">
                {currentMatch?.overallMatchScore || 78}%
              </p>
              <p className="text-xs text-slate-300 font-medium">Resume vs Senior Data Analyst</p>
              <p className="text-[10px] text-cyan-400 font-mono">Matched: SQL, Python, Power BI</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Active Resume:</span>
                <span className="font-mono text-slate-200 truncate max-w-[140px]">{currentResume?.fileName || 'Resume.pdf'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Identified Skills:</span>
                <span className="font-mono text-cyan-300 font-bold">{currentResume?.skills.length || 12} Verified</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center gap-2">
            <Link to="/job-match" className="flex-1">
              <button className="w-full py-2.5 rounded-xl glass-pill hover:bg-white/10 text-xs font-bold text-cyan-300 flex items-center justify-center gap-1.5 transition-all">
                <Target className="w-3.5 h-3.5" />
                <span>Inspect Skill Gap</span>
              </button>
            </Link>
            <Link to="/resume">
              <button className="p-2.5 rounded-xl glass-pill hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                <FileText className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

      </div>

      {/* 4. WEAK TOPICS & RECENT INTERVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Weak Topic Detection (Col 5) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-base font-bold text-white font-display">Targeted Weak Topics</h3>
            </div>
            <Link to="/practice" className="text-xs text-cyan-400 hover:underline font-mono">
              Drill Mode →
            </Link>
          </div>

          <p className="text-xs text-slate-400">
            Calculated from past interview questions where technical completeness was under 65%:
          </p>

          <div className="space-y-3">
            {improvementPlan.topWeakTopics.map((topic, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-white">{topic.topic}</p>
                  <p className="text-[10px] text-rose-300 font-mono">Avg Score: {topic.currentAverageScore}% • {topic.recommendedDrills} Drills Recommended</p>
                </div>
                <Link to="/practice">
                  <Button3D variant="secondary" size="sm">
                    Practice
                  </Button3D>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Completed Interviews List (Col 7) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display">Recent Completed Simulations</h3>
            <Link to="/history" className="text-xs text-cyan-400 hover:underline font-mono">
              View All ({pastInterviews.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {pastInterviews.slice(0, 3).map((intSession) => (
              <div key={intSession.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-sm">{intSession.roleTitle}</p>
                    <Badge variant="purple" size="sm">{intSession.interviewType}</Badge>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {new Date(intSession.startedAt).toLocaleDateString()} • {intSession.answers.length} Questions Answered • {intSession.durationMinutes}m
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-black text-cyan-300 font-display">
                      {intSession.reportScores?.overallScore || 88}
                    </p>
                    <p className="text-[9px] text-slate-400 uppercase font-mono">
                      {intSession.reportScores?.performanceLabel || 'Strong'}
                    </p>
                  </div>

                  <Link to={`/results/${intSession.id}`}>
                    <button className="px-3 py-1.5 rounded-xl glass-pill hover:bg-white/10 text-xs font-bold text-white transition-all flex items-center gap-1">
                      <span>Report</span>
                      <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
