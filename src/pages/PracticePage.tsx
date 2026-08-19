import React, { useState } from 'react';
import { 
  Dumbbell, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  Award, 
  Code, 
  Layers,
  Check
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../data/mockDatabase';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';
import { PracticeQuestion } from '../types';

export const PracticePage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('SQL Window Functions');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('HARD');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const activeQuestion = PRACTICE_QUESTIONS[currentQuestionIndex % PRACTICE_QUESTIONS.length];

  const handleEvaluate = () => {
    if (!candidateAnswer.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setEvaluationResult({
        score: 8.8,
        strengths: [
          'Correct syntax usage for DENSE_RANK window partition frame',
          'Properly structured CTE wrapper with clean alias naming'
        ],
        improvements: [
          'Could explicitly handle edge cases where departments have fewer than 2 distinct salary tiers'
        ]
      });
      setIsEvaluating(false);
    }, 800);
  };

  const handleNextDrill = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setCandidateAnswer('');
    setShowHints(false);
    setEvaluationResult(null);
  };

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="purple" size="md">TARGETED WEAK AREA DRILLS</Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Instant AI <span className="text-gradient-purple">Practice Simulator</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Practice individual technical questions with instantaneous neural feedback and optimal solution references.
        </p>
      </div>

      {/* Topic Filter Selector */}
      <div className="glass-panel p-4 rounded-3xl border border-white/10 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {[
          'SQL Window Functions',
          'A/B Testing & Statistics',
          'Power BI / DAX',
          'System Architecture',
          'JavaScript Closures & Event Loop'
        ].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setSelectedTopic(t);
              setCandidateAnswer('');
              setEvaluationResult(null);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTopic === t
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Main Practice Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
        
        {/* Question Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" size="md">{activeQuestion.topic}</Badge>
            <Badge variant="rose" size="sm">{activeQuestion.difficulty}</Badge>
          </div>

          <button
            onClick={() => setShowHints(prev => !prev)}
            className="px-3 py-1.5 rounded-xl glass-pill hover:bg-white/10 text-xs font-bold text-cyan-300 flex items-center gap-1.5 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHints ? 'Hide Hints' : 'Reveal Hints'}</span>
          </button>
        </div>

        {/* Question Text */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
          <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
            "{activeQuestion.questionText}"
          </p>
        </div>

        {/* Hints Box (if toggled) */}
        {showHints && (
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2 text-xs text-cyan-200">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Architectural Hints:</span>
            </p>
            <ul className="space-y-1 list-disc list-inside text-slate-300">
              {activeQuestion.hints.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Candidate Answer Box */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-slate-400 font-bold">Your Response / SQL Query:</label>
          <textarea
            rows={5}
            value={candidateAnswer}
            onChange={(e) => setCandidateAnswer(e.target.value)}
            placeholder="Type your solution, code block, or conceptual explanation here..."
            className="w-full p-4 rounded-2xl glass-input text-xs sm:text-sm font-mono leading-relaxed resize-none"
          />
        </div>

        {/* Submit & Evaluate Button */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <span className="text-[10px] font-mono text-slate-400">
            {candidateAnswer.trim().split(/\s+/).filter(Boolean).length} Words Typed
          </span>

          <div className="flex items-center gap-3">
            <Button3D
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
              loading={isEvaluating}
              disabled={!candidateAnswer.trim()}
              onClick={handleEvaluate}
            >
              Evaluate Response
            </Button3D>
          </div>
        </div>

        {/* Instant Evaluation Critique Result */}
        {evaluationResult && (
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-purple-500/30 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Instant AI Evaluation</h3>
              </div>
              <p className="text-2xl font-black text-cyan-300 font-display">
                {evaluationResult.score} <span className="text-xs text-slate-400 font-normal">/ 10</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> STRENGTHS:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  {evaluationResult.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                <span className="font-bold text-purple-300 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5" /> KEY IMPROVEMENT:
                </span>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  {evaluationResult.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Optimal Sample Solution */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-cyan-300 font-mono">OPTIMAL REFERENCE SOLUTION:</span>
              <pre className="p-3 rounded-xl bg-black/60 border border-white/5 text-slate-200 font-mono text-[11px] overflow-x-auto">
                {activeQuestion.sampleGoodAnswer}
              </pre>
            </div>

            <div className="text-right pt-2">
              <Button3D variant="glow" size="sm" onClick={handleNextDrill}>
                Next Practice Drill →
              </Button3D>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
