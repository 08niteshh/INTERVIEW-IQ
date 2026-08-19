import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Cpu, 
  Sparkles, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';
import { InterviewRoom3D } from '../components/3d/InterviewRoom3D';

export const LoginPage: React.FC = () => {
  const { loginWithCredentials, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('nitesh@interviewiq.demo');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await loginWithCredentials(email, password);
    setLoading(false);
    navigate('/dashboard');
  };

  const handleDemo = (role: 'DATA_ANALYST' | 'FULL_STACK' | 'FRONTEND') => {
    loginAsDemoUser(role);
    navigate('/dashboard');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: 3D Hologram Preview (Col 6) */}
        <div className="hidden lg:block lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>InterviewIQ Neural Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
              Welcome to the <br />
              <span className="text-gradient-cyan">AI Interview Studio</span>
            </h1>
            <p className="text-xs text-slate-400">
              Step into an immersive 3D simulation room engineered to sharpen your technical narrative and behavioral communication.
            </p>
          </div>

          <div className="relative">
            <InterviewRoom3D avatarState="THINKING" className="w-full h-[320px]" />
          </div>
        </div>

        {/* Right Side: Glassmorphism Login Card (Col 6) */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 space-y-6 shadow-2xl">
          
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white font-display">Sign In to InterviewIQ</h2>
            <p className="text-xs text-slate-400">Enter your credentials or use 1-click instant demo personas.</p>
          </div>

          {/* 1-Click Demo Logins Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>1-CLICK INSTANT DEMO ACCOUNTS</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo('DATA_ANALYST')}
                className="p-2.5 rounded-xl glass-card hover:bg-cyan-500/10 border border-cyan-500/20 text-left transition-all"
              >
                <p className="text-xs font-bold text-cyan-300">Nitesh Y.</p>
                <p className="text-[9px] text-slate-400 font-mono truncate">Data Analyst</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemo('FULL_STACK')}
                className="p-2.5 rounded-xl glass-card hover:bg-purple-500/10 border border-purple-500/20 text-left transition-all"
              >
                <p className="text-xs font-bold text-purple-300">Alex V.</p>
                <p className="text-[9px] text-slate-400 font-mono truncate">Full Stack Dev</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemo('FRONTEND')}
                className="p-2.5 rounded-xl glass-card hover:bg-emerald-500/10 border border-emerald-500/20 text-left transition-all"
              >
                <p className="text-xs font-bold text-emerald-300">Priya S.</p>
                <p className="text-[9px] text-slate-400 font-mono truncate">Frontend Dev</p>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-slate-950 px-3 text-[10px] font-mono text-slate-500 uppercase absolute">Or credentials</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-slate-400">Email Address</label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-slate-400">Password</label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button3D
              variant="primary"
              size="md"
              type="submit"
              className="w-full"
              loading={loading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Dashboard
            </Button3D>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:underline font-bold">
              Register New Profile
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
