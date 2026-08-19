import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  TrendingUp, 
  Dumbbell, 
  ArrowRight, 
  Award,
  Layers,
  Clock
} from 'lucide-react';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';

export const ImprovementPlanPage: React.FC = () => {
  const { improvementPlan, updateImprovementChecklist } = useInterview();
  const { user } = useAuth();

  const completedTasks = improvementPlan.checklist.filter(c => c.completed).length;
  const progressPercent = Math.round((completedTasks / improvementPlan.checklist.length) * 100);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Generated Personalized Study Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            4-Week Career <span className="text-gradient-cyan">Improvement Strategy</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Dynamically synthesized from your past interview weaknesses, missed concepts, and target {user?.targetRole} benchmarks.
          </p>
        </div>

        <Link to="/practice">
          <Button3D variant="glow" size="md" icon={<Dumbbell className="w-4 h-4" />}>
            Launch Practice Drills
          </Button3D>
        </Link>
      </div>

      {/* 4-Week Roadmap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {improvementPlan.weeklyRoadmap.map((week) => (
          <div
            key={week.weekNumber}
            className={`glass-panel p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
              week.weekNumber === 1 ? 'border-cyan-500/40 bg-cyan-950/10' : 'border-white/10'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/15">
                  WEEK {week.weekNumber}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {week.completedSessions}/{week.targetSessions} Drills
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {week.title}
              </h3>

              <p className="text-[11px] text-slate-300 font-medium">
                Focus: <span className="text-cyan-300">{week.focusArea}</span>
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Target Topics:</span>
                <ul className="space-y-1">
                  {week.topics.map((t, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="truncate">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link to="/practice">
                <button className="w-full py-2 rounded-xl glass-pill hover:bg-white/10 text-xs font-bold text-cyan-300 flex items-center justify-center gap-1">
                  <span>Start Week {week.weekNumber} Drills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Action Checklist & Top Weak Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Checklist (Col 7) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">Targeted Action Checklist</h3>
              <p className="text-xs text-slate-400">Track key milestones before your next high-stakes interview</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              {completedTasks}/{improvementPlan.checklist.length} Completed ({progressPercent}%)
            </span>
          </div>

          <div className="space-y-2.5">
            {improvementPlan.checklist.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => updateImprovementChecklist(item.id, !item.completed)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                  item.completed
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300 line-through'
                    : 'glass-card border-white/5 text-white hover:border-cyan-500/30'
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-medium">{item.task}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Priority Drill Topics (Col 5) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Priority Drill Recommendations</span>
            </h3>
            <p className="text-xs text-slate-400">
              Immediate short practice sessions to fix your lowest historical percentiles:
            </p>

            <div className="space-y-3">
              {improvementPlan.topWeakTopics.map((w, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{w.topic}</span>
                    <span className="font-mono text-rose-400 font-bold">{w.currentAverageScore}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{w.recommendedDrills} Practice Drills Needed</span>
                    <Link to="/practice" className="text-cyan-400 hover:underline">
                      Drill →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link to="/interview/new">
              <Button3D variant="primary" size="md" className="w-full">
                Simulate Full Mock to Test Progress
              </Button3D>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
