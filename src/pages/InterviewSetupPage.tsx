import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  Play, 
  Mic, 
  Type, 
  Layers, 
  Target, 
  Award, 
  Clock, 
  Briefcase, 
  Sliders, 
  Building,
  ShieldCheck
} from 'lucide-react';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';
import { JobRole, InterviewType, ExperienceLevel, InterviewDifficulty, InterviewMode } from '../types';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';

export const InterviewSetupPage: React.FC = () => {
  const { startNewInterview } = useInterview();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialType = (searchParams.get('type') as InterviewType) || 'MIXED';

  const [roleTitle, setRoleTitle] = useState<JobRole>(user?.targetRole || 'Data Analyst');
  const [customRole, setCustomRole] = useState('');
  const [interviewType, setInterviewType] = useState<InterviewType>(initialType);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(user?.experienceLevel || '1_3_YEARS');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('MEDIUM');
  const [mode, setMode] = useState<InterviewMode>('VOICE');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [durationMinutes, setDurationMinutes] = useState<number>(18);
  const [companyTarget, setCompanyTarget] = useState<string>('Nexora Technologies');

  const handleStart = () => {
    const finalRole = roleTitle === 'Custom Role' ? (customRole || 'Software Engineer') : roleTitle;
    const sessionId = startNewInterview({
      roleTitle: finalRole,
      interviewType,
      experienceLevel,
      difficulty,
      mode,
      totalQuestionsCount: questionCount,
      durationMinutes,
      companyTarget,
    });

    navigate(`/interview/${sessionId}`);
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <Badge variant="cyan" size="md">SIMULATION CONFIGURATOR</Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Configure Your <span className="text-gradient-cyan">AI Interview Session</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Tailor question categories, resume probing depth, voice mode, and adaptive difficulty.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
        
        {/* 1. Target Job Role */}
        <div className="space-y-3">
          <label className="block text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>1. Select Target Job Role</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              'Data Analyst',
              'Full Stack Developer',
              'Frontend Developer',
              'Software Developer',
              'Business Analyst',
              'Data Scientist',
              'QA Engineer',
              'Custom Role'
            ].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleTitle(role)}
                className={`p-3 rounded-2xl text-xs font-bold transition-all text-center ${
                  roleTitle === role
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'glass-card text-slate-400 hover:text-white border-white/5'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {roleTitle === 'Custom Role' && (
            <input
              type="text"
              placeholder="e.g. Cloud Solutions Architect / Mobile React Native Dev"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-2xl glass-input text-xs"
            />
          )}
        </div>

        {/* 2. Interview Track Type */}
        <div className="space-y-3">
          <label className="block text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-purple-400" />
            <span>2. Interview Type</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'MIXED', label: 'Mixed Round (HR + Tech)', desc: 'Comprehensive real-world blend' },
              { id: 'TECHNICAL', label: 'Technical Depth', desc: 'Coding, SQL, and system design' },
              { id: 'BEHAVIORAL', label: 'Behavioral STAR', desc: 'Situational conflict & culture' },
              { id: 'PROJECT', label: 'Resume Project Probing', desc: 'Deep dive into your past claims' },
              { id: 'RESUME_BASED', label: 'Resume Verification', desc: 'Tailored to your skills list' },
              { id: 'JD_BASED', label: 'Job Description Match', desc: 'Targeted to company requirements' },
              { id: 'HR', label: 'HR & Screening', desc: 'Motivation, salary, background' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setInterviewType(t.id as InterviewType)}
                className={`p-3 rounded-2xl text-left space-y-1 transition-all ${
                  interviewType === t.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-md shadow-purple-500/10'
                    : 'glass-card text-slate-400 hover:text-white border-white/5'
                }`}
              >
                <p className="text-xs font-bold text-white">{t.label}</p>
                <p className="text-[10px] text-slate-400">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Experience & Difficulty Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Experience Level */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
              3. Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
              className="w-full px-4 py-3 rounded-2xl glass-input text-xs font-medium"
            >
              <option value="FRESHER">Fresher / Graduate (0 years)</option>
              <option value="0_1_YEARS">Entry Level (0–1 years)</option>
              <option value="1_3_YEARS">Junior / Mid (1–3 years)</option>
              <option value="3_5_YEARS">Senior (3–5 years)</option>
              <option value="5_PLUS_YEARS">Lead / Staff (5+ years)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
              4. Starting Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['EASY', 'MEDIUM', 'HARD'] as InterviewDifficulty[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-3 rounded-2xl text-xs font-bold transition-all text-center ${
                    difficulty === d
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'glass-card text-slate-400 hover:text-white border-white/5'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 4. Mode (Voice vs Text) & Question Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Interaction Mode */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
              5. Input Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('VOICE')}
                className={`p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  mode === 'VOICE'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'glass-card text-slate-400 hover:text-white border-white/5'
                }`}
              >
                <Mic className="w-4 h-4 text-cyan-400" />
                <span>Voice (Speech + Mic)</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('TEXT')}
                className={`p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  mode === 'TEXT'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'glass-card text-slate-400 hover:text-white border-white/5'
                }`}
              >
                <Type className="w-4 h-4 text-purple-400" />
                <span>Text (Keyboard Input)</span>
              </button>
            </div>
          </div>

          {/* Number of Questions */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
              6. Questions & Target Time
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { count: 5, mins: 15 },
                { count: 10, mins: 30 },
                { count: 15, mins: 45 },
                { count: 20, mins: 60 }
              ].map((opt) => (
                <button
                  key={opt.count}
                  type="button"
                  onClick={() => {
                    setQuestionCount(opt.count);
                    setDurationMinutes(opt.mins);
                  }}
                  className={`py-3 rounded-2xl text-center transition-all ${
                    questionCount === opt.count
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'glass-card text-slate-400 hover:text-white border-white/5'
                  }`}
                >
                  <p className="text-xs font-bold text-white">{opt.count} Qs</p>
                  <p className="text-[10px] text-slate-400 font-mono">{opt.mins}m</p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 5. Target Company (Optional) */}
        <div className="space-y-3">
          <label className="block text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>7. Target Employer / Company Name (Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Nexora Technologies, Google, Amazon, Flipkart, Tech Startup"
            value={companyTarget}
            onChange={(e) => setCompanyTarget(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl glass-input text-xs"
          />
        </div>

        {/* Launch Button */}
        <div className="pt-4 border-t border-white/10 text-center space-y-3">
          <Button3D
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-12"
            icon={<Play className="w-5 h-5 fill-white" />}
            onClick={handleStart}
          >
            ENTER 3D INTERVIEW STUDIO
          </Button3D>
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Voice Speech Synthesis & Web Audio Waveform will initialize automatically
          </p>
        </div>

      </div>

    </div>
  );
};
