import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { AIAvatar3D } from './AIAvatar3D';
import { AvatarState } from '../../types';

interface InterviewRoom3DProps {
  avatarState: AvatarState;
  audioVolume?: number;
  className?: string;
}

export const InterviewRoom3D: React.FC<InterviewRoom3DProps> = ({
  avatarState,
  audioVolume = 0,
  className = 'w-full h-full min-h-[380px]',
}) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-cyan-950/20 ${className}`}>
      
      {/* 3D Canvas */}
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
        
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
        <spotLight position={[0, 5, 5]} intensity={1.5} angle={0.6} penumbra={1} color="#38bdf8" />

        {/* Ambient Space Elements */}
        <Stars radius={50} depth={30} count={1200} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          <AIAvatar3D state={avatarState} audioVolume={audioVolume} />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 2.3} autoRotate={avatarState === 'IDLE'} autoRotateSpeed={0.5} />
      </Canvas>

      {/* Cyber HUD Overlay Labels */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10 pointer-events-none">
        <div className={`w-2.5 h-2.5 rounded-full ${
          avatarState === 'SPEAKING' ? 'bg-cyan-400 animate-ping' :
          avatarState === 'LISTENING' ? 'bg-sky-400 animate-pulse' :
          avatarState === 'THINKING' ? 'bg-purple-400 animate-spin' :
          avatarState === 'EVALUATING' ? 'bg-emerald-400 animate-pulse' :
          'bg-slate-400'
        }`} />
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-md">
          {avatarState === 'SPEAKING' ? 'AI Interviewer • Speaking' :
           avatarState === 'LISTENING' ? 'AI Interviewer • Listening to Candidate' :
           avatarState === 'THINKING' ? 'AI Neural Engine • Analyzing Response' :
           avatarState === 'EVALUATING' ? 'AI Evaluation • Scoring Metrics' :
           'AI Interviewer • Standby'}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
        <div className="text-[9px] font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-slate-950/80 border border-cyan-500/20 backdrop-blur-sm">
          NEURAL_MODEL_v2.6 // LATENCY: 24ms
        </div>
      </div>

    </div>
  );
};
