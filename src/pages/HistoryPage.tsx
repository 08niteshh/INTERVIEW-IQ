import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  History, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Award, 
  Clock, 
  Building, 
  Target, 
  Play 
} from 'lucide-react';
import { useInterview } from '../context/InterviewContext';
import { Badge } from '../components/ui/Badge';
import { Button3D } from '../components/ui/Button3D';

export const HistoryPage: React.FC = () => {
  const { pastInterviews } = useInterview();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const filtered = pastInterviews.filter(item => {
    const matchesSearch = item.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.companyTarget && item.companyTarget.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'ALL' || item.interviewType === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interview Sessions Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Simulation <span className="text-gradient-cyan">History & Reports</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Review detailed question transcripts, AI score evaluations, and communication metrics from all past attempts.
          </p>
        </div>

        <Link to="/interview/new">
          <Button3D variant="primary" size="md" icon={<Play className="w-4 h-4 fill-white" />}>
            Start New Simulation
          </Button3D>
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-panel p-4 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role or company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          {['ALL', 'MIXED', 'TECHNICAL', 'BEHAVIORAL', 'PROJECT', 'JD_BASED'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* List of Past Interviews */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center space-y-3">
            <p className="text-sm font-bold text-white">No interview sessions matched your query</p>
            <p className="text-xs text-slate-400">Try changing your search keywords or filter tab.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-cyan-500/30 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-white">{item.roleTitle}</h3>
                  <Badge variant="purple" size="sm">{item.interviewType}</Badge>
                  <Badge variant="cyan" size="sm">{item.mode}</Badge>
                  {item.difficulty && (
                    <Badge variant={item.difficulty === 'HARD' ? 'rose' : 'neutral'} size="sm">
                      {item.difficulty}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap font-mono">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {item.companyTarget || 'Tech Standard'}
                  </span>
                  <span>•</span>
                  <span>Date: {new Date(item.startedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{item.answers.length} Questions Completed</span>
                  <span>•</span>
                  <span>Duration: {item.durationMinutes}m</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-3xl font-black text-cyan-300 font-display">
                    {item.reportScores?.overallScore || 88} <span className="text-xs text-slate-500 font-normal">/ 100</span>
                  </p>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    ★ {item.reportScores?.performanceLabel || 'Strong Performance'}
                  </span>
                </div>

                <Link to={`/results/${item.id}`}>
                  <Button3D variant="secondary" size="sm" icon={<ArrowUpRight className="w-4 h-4" />}>
                    View Evaluation
                  </Button3D>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
