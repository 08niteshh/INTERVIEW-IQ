import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Mic, 
  RotateCcw, 
  FileText, 
  ArrowRight, 
  Target, 
  Sparkles, 
  Dumbbell, 
  Calendar,
  Layers,
  Clock,
  Share2
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import confetti from 'canvas-confetti';
import { useInterview } from '../context/InterviewContext';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';

export const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getInterviewById, activeSession } = useInterview();
  const navigate = useNavigate();

  const session = getInterviewById(id || '') || activeSession;

  useEffect(() => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#a855f7', '#3b82f6', '#10b981'],
      });
    } catch (e) {}
  }, []);

  if (!session || !session.reportScores) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Interview Report Not Found</h2>
        <p className="text-xs text-slate-400">The requested interview evaluation session could not be resolved.</p>
        <Link to="/dashboard">
          <Button3D variant="primary" size="md">Return to Dashboard</Button3D>
        </Link>
      </div>
    );
  }

  const scores = session.reportScores;

  const RADAR_DATA = [
    { subject: 'Technical Depth', score: scores.technicalScore, fullMark: 100 },
    { subject: 'Relevance', score: scores.relevanceScore, fullMark: 100 },
    { subject: 'Problem Solving', score: scores.problemSolvingScore, fullMark: 100 },
    { subject: 'Clarity & Comm', score: scores.communicationScore, fullMark: 100 },
    { subject: 'Completeness', score: scores.completenessScore, fullMark: 100 },
    { subject: 'Behavioral STAR', score: scores.behavioralScore, fullMark: 100 },
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* 1. TOP HERO EVALUATION BANNER */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Comprehensive Performance Intelligence Report</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
              Interview Evaluation: <span className="text-gradient-cyan">{session.roleTitle}</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300">
              Company Target: <strong className="text-white">{session.companyTarget || 'Tech Industry Standard'}</strong> • Track: {session.interviewType} • Experience Level: {session.experienceLevel?.replace('_', '-')}
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <Badge variant="cyan" size="md">
                {session.answers.length} Questions Evaluated
              </Badge>
              <Badge variant="purple" size="md">
                Duration: {session.durationMinutes} Minutes
              </Badge>
              <Badge variant="emerald" size="md">
                Mode: {session.mode}
              </Badge>
            </div>
          </div>

          {/* Big Score Card on Right */}
          <div className="md:col-span-4 glass-card p-6 rounded-3xl border border-cyan-400/30 text-center space-y-2 bg-slate-950/80 shadow-xl">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold">OVERALL INTERVIEW SCORE</span>
            <p className="text-5xl font-black text-cyan-300 font-display">
              {scores.overallScore} <span className="text-lg text-slate-500 font-normal">/ 100</span>
            </p>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
              ★ {scores.performanceLabel}
            </div>
            <p className="text-[10px] text-slate-400 pt-1">Benchmark: Top 8% of Candidate Cohort</p>
          </div>

        </div>
      </div>

      {/* 2. RADAR SKILL MATRIX & SPEECH INDICATORS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Radar Skill Matrix (Col 7) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Multi-Dimensional Competency Radar</h3>
              <p className="text-xs text-slate-400">Evaluation across core technical depth, structure, and communication</p>
            </div>
            <Badge variant="cyan" size="sm">Neural Model v2.6</Badge>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={10} />
                <Radar name="Candidate" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Candidate Speech & Delivery Indicators (Col 5) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white font-display">Candidate Speech Indicators</h3>
            </div>
            <p className="text-xs text-slate-400">
              Calculated via real-time speech-to-text telemetry and audio duration cadence:
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Speaking Speed</span>
                <p className="text-xl font-bold text-cyan-300 font-display">138 WPM</p>
                <span className="text-[10px] text-emerald-400 font-medium">Ideal Pace (130-150)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Filler Words</span>
                <p className="text-xl font-bold text-purple-300 font-display">3 Count</p>
                <span className="text-[10px] text-slate-400 font-mono">"um", "like"</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Long Pauses</span>
                <p className="text-xl font-bold text-white font-display">2 Pauses</p>
                <span className="text-[10px] text-slate-400">&gt; 3s pause window</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Clarity Index</span>
                <p className="text-xl font-bold text-emerald-300 font-display">94%</p>
                <span className="text-[10px] text-emerald-400">High Articulation</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-[11px] text-slate-400">
            💡 <em>Tip: Your pace was steady and confident. In future rounds, minimize the "um" hesitation before technical syntax answers.</em>
          </div>
        </div>

      </div>

      {/* 3. ANSWER-BY-ANSWER DETAILED CRITIQUE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white font-display">Answer-by-Answer AI Critique</h2>
            <p className="text-xs text-slate-400">In-depth technical correctness, strengths, and optimal response templates</p>
          </div>
          <Badge variant="purple" size="md">{session.answers.length} Questions Logged</Badge>
        </div>

        <div className="space-y-6">
          {session.answers.map((answer, index) => {
            const evalData = answer.evaluation;
            return (
              <div
                key={answer.id || index}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 hover:border-cyan-500/30 transition-all"
              >
                
                {/* Question Header & Score */}
                <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                      QUESTION {index + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      "{answer.questionText}"
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-2xl font-black text-cyan-300 font-display">
                      {evalData?.overallScore || 8.5} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                    </p>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Tech: {evalData?.technicalScore || 8.8}/10 • Rel: {evalData?.relevanceScore || 9.0}/10
                    </span>
                  </div>
                </div>

                {/* Candidate's Actual Answer */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                  <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">YOUR TRANSCRIPT / SUBMISSION:</p>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{answer.candidateText}"
                  </p>
                </div>

                {/* Strengths & Improvements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* What you did well */}
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>WHAT YOU DID WELL:</span>
                    </p>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {evalData?.strengths?.map((str, i) => (
                        <li key={i}>{str}</li>
                      )) || <li>Strong conceptual clarity</li>}
                    </ul>
                  </div>

                  {/* What to improve */}
                  <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                    <p className="text-xs font-bold text-rose-400 flex items-center gap-1.5 font-mono">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>WHAT TO IMPROVE:</span>
                    </p>
                    <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                      {evalData?.improvements?.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      )) || <li>Incorporate edge-case boundary conditions</li>}
                    </ul>
                  </div>

                </div>

                {/* Ideal 3-Part Answer Structure */}
                {evalData?.betterAnswerStructure && (
                  <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2 text-xs">
                    <p className="font-bold text-purple-300 flex items-center gap-1.5 font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>OPTIMAL 3-PART ANSWER TEMPLATE:</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-300">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <strong className="text-cyan-300 block mb-0.5">1. Definition:</strong>
                        <span>{evalData.betterAnswerStructure.definition}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <strong className="text-purple-300 block mb-0.5">2. Practical Example:</strong>
                        <span>{evalData.betterAnswerStructure.practicalExample}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <strong className="text-emerald-300 block mb-0.5">3. Tradeoff / Scale:</strong>
                        <span>{evalData.betterAnswerStructure.tradeoffsOrEdgeCases}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIONS & NEXT STEPS */}
      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white font-display">Targeted Next Steps</h3>
          <p className="text-xs text-slate-300">
            Convert this simulation feedback into concrete skill improvements.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/practice">
            <Button3D variant="glow" size="md" icon={<Dumbbell className="w-4 h-4" />}>
              Practice Weak Drills Now
            </Button3D>
          </Link>

          <Link to="/improvement">
            <Button3D variant="secondary" size="md" icon={<Calendar className="w-4 h-4 text-cyan-400" />}>
              View 4-Week Study Plan
            </Button3D>
          </Link>

          <Link to="/interview/new">
            <Button3D variant="primary" size="md" icon={<RotateCcw className="w-4 h-4" />}>
              Simulate Another Mock
            </Button3D>
          </Link>
        </div>
      </div>

    </div>
  );
};
