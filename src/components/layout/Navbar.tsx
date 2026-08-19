import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Play, 
  FileText, 
  Target, 
  TrendingUp, 
  History, 
  Dumbbell, 
  Calendar, 
  Menu, 
  X, 
  User as UserIcon, 
  ChevronDown, 
  LogOut, 
  Volume2, 
  VolumeX,
  Layers,
  Cpu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInterview } from '../../context/InterviewContext';
import { Button3D } from '../ui/Button3D';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { activeSession, isAiMuted, toggleAiMute } = useInterview();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: <Layers className="w-4 h-4" /> },
    { label: 'Start Mock', path: '/interview/new', icon: <Play className="w-4 h-4" /> },
    { label: 'Resume Hub', path: '/resume', icon: <FileText className="w-4 h-4" /> },
    { label: 'JD Match', path: '/job-match', icon: <Target className="w-4 h-4" /> },
    { label: 'Practice Drills', path: '/practice', icon: <Dumbbell className="w-4 h-4" /> },
    { label: 'Analytics', path: '/analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Improvement Plan', path: '/improvement', icon: <Calendar className="w-4 h-4" /> },
    { label: 'History', path: '/history', icon: <History className="w-4 h-4" /> },
  ];

  const isActivePath = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white font-display flex items-center gap-1">
              Interview<span className="text-gradient-cyan">IQ</span>
            </span>
            <span className="text-[9px] font-mono text-cyan-400/80 block -mt-1 tracking-wider uppercase">
              AI Interview Simulation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            const active = isActivePath(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Active Interview Shortcut */}
          {activeSession && activeSession.state !== 'COMPLETED' && (
            <Link to={`/interview/${activeSession.id}`} className="hidden sm:block">
              <Badge variant="cyan" size="md" icon={<div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}>
                Live Room Active
              </Badge>
            </Link>
          )}

          {/* AI Audio Mute Toggle */}
          <button
            onClick={toggleAiMute}
            title={isAiMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            className="p-2 rounded-xl glass-pill hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            {isAiMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* User Profile / Auth State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 p-1.5 rounded-2xl glass-pill hover:bg-white/10 border border-white/10 transition-all text-xs"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-7 h-7 rounded-xl object-cover border border-cyan-400/40"
                />
                <div className="text-left hidden md:block">
                  <p className="font-bold text-white leading-tight truncate max-w-[100px]">{user.name}</p>
                  <p className="text-[10px] text-cyan-400/80 font-mono leading-tight">{user.targetRole}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown Menu (Cleaned - No hardcoded names) */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel p-2 shadow-2xl border border-white/15 z-50 text-xs space-y-2">
                  <div className="p-2 border-b border-white/10">
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Badge variant="purple" size="sm">{user.targetRole}</Badge>
                      <Badge variant="cyan" size="sm">{user.experienceLevel?.replace('_', '-')}</Badge>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full text-left px-2 py-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-2"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/resume"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full text-left px-2 py-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      <span>Resume Hub</span>
                    </Link>
                    <Link
                      to="/improvement"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full text-left px-2 py-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Improvement Plan</span>
                    </Link>
                  </div>

                  <div className="border-t border-white/10 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-xl hover:bg-rose-500/20 text-rose-300 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <Button3D variant="primary" size="sm">
                  Get Started
                </Button3D>
              </Link>
            </div>
          )}

          {/* Quick CTA */}
          <Link to="/interview/new" className="hidden sm:block">
            <Button3D variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
              Start AI Mock
            </Button3D>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2 rounded-xl glass-pill text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                isActivePath(item.path)
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10">
            <Link to="/interview/new" onClick={() => setMobileMenuOpen(false)}>
              <Button3D variant="primary" size="md" className="w-full">
                Start Mock Interview
              </Button3D>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
