import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Plus, 
  Trash2, 
  ArrowRight,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';

export const ResumePage: React.FC = () => {
  const { currentResume, uploadResumeText, uploadResumeFile } = useResume();
  const { user } = useAuth();

  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    await uploadResumeFile(file);
    setIsProcessing(false);
  };

  const handleTextParse = () => {
    if (!rawText.trim()) return;
    setIsProcessing(true);
    uploadResumeText(rawText, 'Pasted_Resume_Profile.txt');
    setRawText('');
    setIsProcessing(false);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume Intelligence & Entity Extraction</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Resume Hub for <span className="text-gradient-cyan">{user?.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Upload your latest PDF/DOCX or paste resume text. The AI interviewer will contextualize questions directly from your projects and skills.
          </p>
        </div>

        <Link to="/job-match">
          <Button3D variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Match with Job Description
          </Button3D>
        </Link>
      </div>

      {/* Upload Box & Text Paste Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Drag & Drop File Upload (Col 6) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-cyan-400" />
            <span>Upload Resume Document</span>
          </h3>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) {
                setIsProcessing(true);
                uploadResumeFile(file).then(() => setIsProcessing(false));
              }
            }}
            className={`p-8 rounded-3xl border-2 border-dashed text-center space-y-3 transition-all cursor-pointer ${
              isDragOver ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/15 bg-slate-950/40 hover:border-cyan-500/40'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Drag & drop your resume PDF / DOCX here</p>
              <p className="text-xs text-slate-400">or click below to browse files</p>
            </div>

            <label className="inline-block">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="px-4 py-2 rounded-xl glass-pill hover:bg-white/10 text-xs font-bold text-cyan-300 border border-cyan-500/30 cursor-pointer inline-block">
                Browse Document
              </span>
            </label>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Supports: PDF, DOCX, Plain Text</span>
            <span>Max File Size: 10MB</span>
          </div>
        </div>

        {/* Right: Paste Text Direct Parser (Col 6) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Or Paste Raw Resume Text</span>
            </h3>

            <textarea
              rows={6}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste your resume sections, skills, and projects here for immediate neural entity extraction..."
              className="w-full p-4 rounded-2xl glass-input text-xs leading-relaxed resize-none font-mono"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] text-slate-400">Entities auto-parsed on submit</span>
            <Button3D
              variant="glow"
              size="sm"
              disabled={!rawText.trim() || isProcessing}
              loading={isProcessing}
              onClick={handleTextParse}
            >
              Parse & Save Resume
            </Button3D>
          </div>
        </div>

      </div>

      {/* Parsed Resume Snapshot Viewer */}
      {currentResume && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-wrap gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{currentResume.candidateName}</h2>
                <Badge variant="cyan" size="sm">ACTIVE RESUME SNAPSHOT</Badge>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {currentResume.email} • {currentResume.phone} • File: {currentResume.fileName}
              </p>
            </div>

            <Badge variant="purple" size="md">
              {currentResume.skills.length} Technical Skills Verified
            </Badge>
          </div>

          {/* Candidate Summary */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">PROFESSIONAL SUMMARY</span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentResume.summary}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">EXTRACTED TECHNICAL SKILLS</span>
            <div className="flex flex-wrap gap-2">
              {currentResume.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects Highlight */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-400" />
              <span>KEY PROJECTS (REFERENCED IN AI INTERVIEWS)</span>
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentResume.projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <h4 className="text-xs font-bold text-white truncate">{proj.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
