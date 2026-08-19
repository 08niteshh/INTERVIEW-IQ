import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Briefcase, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { JobRole, ExperienceLevel } from '../types';
import { Button3D } from '../components/ui/Button3D';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState<JobRole>('Data Analyst');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('1_3_YEARS');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(name, email, targetRole, experienceLevel);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 space-y-6 shadow-2xl">
        
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Create Candidate Profile</span>
          </div>
          <h2 className="text-2xl font-black text-white font-display">Join InterviewIQ</h2>
          <p className="text-xs text-slate-400">Initialize your AI career simulation profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400">Full Name</label>
            <div className="relative mt-1">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nitesh Yadav"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400">Email Address</label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400">Target Role Track</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value as JobRole)}
              className="w-full mt-1 px-3.5 py-2.5 rounded-xl glass-input text-xs"
            >
              <option value="Data Analyst">Data Analyst</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="QA Engineer">QA Engineer</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
              className="w-full mt-1 px-3.5 py-2.5 rounded-xl glass-input text-xs"
            >
              <option value="FRESHER">Fresher / Graduate (0 yrs)</option>
              <option value="0_1_YEARS">0–1 Years</option>
              <option value="1_3_YEARS">1–3 Years</option>
              <option value="3_5_YEARS">3–5 Years</option>
              <option value="5_PLUS_YEARS">5+ Years</option>
            </select>
          </div>

          <Button3D
            variant="primary"
            size="md"
            type="submit"
            className="w-full"
            loading={loading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Create Profile & Start
          </Button3D>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:underline font-bold">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
};
