import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Play, 
  ArrowRight, 
  Building, 
  Briefcase, 
  FileText,
  Sliders
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useInterview } from '../context/InterviewContext';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';

export const JobMatchPage: React.FC = () => {
  const { currentResume, currentJD, currentMatch, saveJobDescription } = useResume();
  const { startNewInterview } = useInterview();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState(currentJD?.jobTitle || 'Senior Data Analyst (Growth & Product)');
  const [companyName, setCompanyName] = useState(currentJD?.companyName || 'Nexora Technologies');
  const [rawJDText, setRawJDText] = useState(currentJD?.rawText || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeJD = () => {
    if (!rawJDText.trim()) return;
    setIsAnalyzing(true);
    saveJobDescription(jobTitle, companyName, rawJDText);
    setIsAnalyzing(false);
  };

  const handleLaunchJDMock = () => {
    const sessionId = startNewInterview({
      roleTitle: jobTitle,
      interviewType: 'JD_BASED',
      experienceLevel: '1_3_YEARS',
      difficulty: 'MEDIUM',
      mode: 'VOICE',
      totalQuestionsCount: 5,
      durationMinutes: 18,
      companyTarget: companyName,
    });
    navigate(`/interview/${sessionId}`);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume vs Job Description Match Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Target Job Description <span className="text-gradient-cyan">Skill Gap Analyzer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Compare your active resume against any employer's JD to calculate compatibility scores and generate targeted interview questions.
          </p>
        </div>

        {currentMatch && (
          <Button3D variant="glow" size="md" icon={<Play className="w-4 h-4 fill-white" />} onClick={handleLaunchJDMock}>
            Start JD-Targeted Mock
          </Button3D>
        )}
      </div>

      {/* Input JD & Match Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Job Description (Col 6) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Target Job Description Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase">Target Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full mt-1 px-3.5 py-2.5 rounded-xl glass-input text-xs"
                placeholder="e.g. Senior Data Analyst"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full mt-1 px-3.5 py-2.5 rounded-xl glass-input text-xs"
                placeholder="e.g. Google, Nexora"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase">Paste Job Description Text</label>
            <textarea
              rows={8}
              value={rawJDText}
              onChange={(e) => setRawJDText(e.target.value)}
              placeholder="Paste the full job description, responsibilities, and required qualifications here..."
              className="w-full mt-1 p-3.5 rounded-2xl glass-input text-xs font-mono leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] text-slate-400 font-mono">
              Active Resume: {currentResume?.candidateName}
            </span>
            <Button3D
              variant="primary"
              size="sm"
              loading={isAnalyzing}
              onClick={handleAnalyzeJD}
            >
              Analyze & Calculate Match
            </Button3D>
          </div>
        </div>

        {/* Right: Match Score Card (Col 6) */}
        {currentMatch && (
          <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-cyan-500/20 space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-display">Resume-JD Match Score</h3>
                <Badge variant="cyan" size="sm">Neural Compatibility Index</Badge>
              </div>

              {/* 4 Score Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">OVERALL</span>
                  <p className="text-2xl font-black text-cyan-300 font-display">{currentMatch.overallMatchScore}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">SKILLS</span>
                  <p className="text-2xl font-black text-purple-300 font-display">{currentMatch.skillsMatchScore}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">EXPERIENCE</span>
                  <p className="text-2xl font-black text-emerald-300 font-display">{currentMatch.experienceMatchScore}%</p>
                </div>
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">TOOLS</span>
                  <p className="text-2xl font-black text-amber-300 font-display">{currentMatch.toolsMatchScore}%</p>
                </div>
              </div>

              {/* Matched vs Missing Skills */}
              <div className="space-y-3 pt-2">
                
                {/* Matched */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED MATCHED SKILLS ({currentMatch.matchedSkills.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentMatch.matchedSkills.map((skill, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>SKILL GAPS & UNMATCHED REQUIREMENTS ({currentMatch.missingSkills.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentMatch.missingSkills.map((skill, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono font-bold">
                        ⚠ {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <Button3D variant="primary" size="md" className="w-full" icon={<Play className="w-4 h-4 fill-white" />} onClick={handleLaunchJDMock}>
                Launch Targeted Mock for {companyName}
              </Button3D>
            </div>

          </div>
        )}

      </div>

      {/* Suggested Interview Questions Based on JD Gap */}
      {currentMatch && currentMatch.suggestedInterviewQuestions.length > 0 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold text-white font-display">
              Predicted Interview Questions Based on This JD & Your Resume Gap
            </h3>
          </div>

          <div className="space-y-3">
            {currentMatch.suggestedInterviewQuestions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3 text-xs">
                <span className="w-6 h-6 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold font-mono shrink-0">
                  {idx + 1}
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">"{q}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
