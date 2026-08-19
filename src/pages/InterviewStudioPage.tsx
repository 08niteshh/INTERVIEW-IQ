import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Send, 
  SkipForward, 
  Square, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Clock, 
  Award, 
  Target, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  FileText,
  Building,
  HelpCircle
} from 'lucide-react';
import { useInterview } from '../context/InterviewContext';
import { InterviewRoom3D } from '../components/3d/InterviewRoom3D';
import { AudioWaveform } from '../components/interview/AudioWaveform';
import { Button3D } from '../components/ui/Button3D';
import { Badge } from '../components/ui/Badge';

export const InterviewStudioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    activeSession,
    avatarState,
    interviewState,
    isRecording,
    audioVolume,
    audioFrequencyData,
    liveTranscript,
    setLiveTranscript,
    isAiSpeaking,
    isAiMuted,
    totalTimeRemainingSeconds,
    questionTimeElapsedSeconds,
    submitAnswer,
    skipCurrentQuestion,
    endInterviewEarly,
    startVoiceRecording,
    stopVoiceRecording,
    speakText,
    stopSpeaking,
    toggleAiMute,
  } = useInterview();

  const [textAnswer, setTextAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If no active session, redirect to setup
  useEffect(() => {
    if (!activeSession) {
      navigate('/interview/new');
    }
  }, [activeSession, navigate]);

  // When interview completes, navigate to results page
  useEffect(() => {
    if (activeSession?.state === 'COMPLETED') {
      navigate(`/results/${activeSession.id}`);
    }
  }, [activeSession?.state, activeSession?.id, navigate]);

  // Sync liveTranscript to text input
  useEffect(() => {
    if (liveTranscript) {
      setTextAnswer(liveTranscript);
    }
  }, [liveTranscript]);

  if (!activeSession) return null;

  const currentQ = activeSession.questions[activeSession.currentQuestionIndex] || activeSession.questions[0];
  const progressPercent = Math.round(((activeSession.currentQuestionIndex + 1) / activeSession.totalQuestionsCount) * 100);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinalSubmit = async () => {
    const finalAnswer = textAnswer.trim();
    if (!finalAnswer) return;

    setIsSubmitting(true);
    if (isRecording) stopVoiceRecording();
    await submitAnswer(finalAnswer);
    setTextAnswer('');
    setLiveTranscript('');
    setIsSubmitting(false);
  };

  return (
    <div className="pt-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Status & Telemetry Bar */}
      <div className="glass-panel px-6 py-3.5 rounded-2xl border border-white/10 flex items-center justify-between gap-4 flex-wrap text-xs">
        
        {/* Left: Role & Target Info */}
        <div className="flex items-center gap-3">
          <Badge variant="cyan" size="md">
            {activeSession.roleTitle}
          </Badge>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline flex items-center gap-1.5 font-medium">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            {activeSession.companyTarget || 'Target Technology Partner'}
          </span>
          <Badge variant="purple" size="sm">
            {activeSession.interviewType}
          </Badge>
        </div>

        {/* Center: Dual Timers */}
        <div className="flex items-center gap-4 font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Total:</span>
            <span className={`font-bold ${totalTimeRemainingSeconds < 180 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'}`}>
              {formatTimer(totalTimeRemainingSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Question:</span>
            <span className="font-bold text-purple-300">
              {formatTimer(questionTimeElapsedSeconds)}
            </span>
          </div>
        </div>

        {/* Right: End Session Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={endInterviewEarly}
            className="px-3 py-1.5 rounded-xl glass-pill hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 font-bold transition-all text-xs"
          >
            End Interview
          </button>
        </div>

      </div>

      {/* Main Studio Grid: 3D AI Interviewer on Left, Info & Question on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Center: 3D Holographic AI Interviewer Studio (Col 7) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="relative flex-1 min-h-[400px]">
            <InterviewRoom3D
              avatarState={avatarState}
              audioVolume={audioVolume}
              className="w-full h-full min-h-[400px]"
            />

            {/* In-Canvas Floating Audio State Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-auto z-20">
              
              {/* Web Audio Waveform */}
              <div className="flex-1 max-w-[280px]">
                <AudioWaveform
                  isRecording={isRecording}
                  frequencyData={audioFrequencyData}
                  audioVolume={audioVolume}
                />
              </div>

              {/* Speech Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(currentQ.questionText)}
                  title="Replay Question Audio"
                  className="p-2.5 rounded-2xl glass-panel hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-all border border-white/10"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleAiMute}
                  title={isAiMuted ? 'Unmute AI' : 'Mute AI'}
                  className="p-2.5 rounded-2xl glass-panel hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-all border border-white/10"
                >
                  {isAiMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Question Details & Instructions (Col 5) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Question Counter Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                  QUESTION {currentQ.questionNumber} OF {currentQ.totalQuestions}
                </span>
                <div className="w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <Badge variant={currentQ.difficulty === 'HARD' ? 'rose' : currentQ.difficulty === 'MEDIUM' ? 'cyan' : 'emerald'} size="sm">
                {currentQ.difficulty}
              </Badge>
            </div>

            {/* Question Category */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{currentQ.category}</span>
            </div>

            {/* Contextual Hook (e.g. from resume) */}
            {currentQ.contextualHook && (
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{currentQ.contextualHook}</span>
              </div>
            )}

            {/* Question Text */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                "{currentQ.questionText}"
              </p>
            </div>

            {/* Expected Concepts / Hints */}
            <div className="space-y-2">
              <p className="text-[11px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Key Competencies Assessed:</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentQ.expectedTopics.slice(0, 3).map((topic, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 text-slate-300 border border-white/5">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* AI Neural Tip */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-[11px] leading-tight">
              Structure your response: <strong className="text-white">Definition ➔ Real-world Example ➔ Trade-off/Edge Case</strong>.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Answer Input & Voice Recording Panel */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold">
              Your Answer {activeSession.mode === 'VOICE' ? '(Speech / Microphone)' : '(Text Input)'}:
            </span>
            {isRecording && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono animate-pulse border border-rose-500/30">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                RECORDING LIVE
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            {textAnswer.trim().split(/\s+/).filter(Boolean).length} Words Typed / Transcribed
          </div>
        </div>

        {/* Text / Live Transcript Area */}
        <textarea
          rows={4}
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          placeholder={
            isRecording
              ? 'Listening to your voice... live speech-to-text transcript will appear here in real-time.'
              : activeSession.mode === 'VOICE'
              ? 'Click "Start Voice Answer" below to speak using your microphone, or type your answer directly here...'
              : 'Type your detailed structured answer here (e.g. definition, practical examples, architecture tradeoffs)...'
          }
          className="w-full p-4 rounded-2xl glass-input text-sm leading-relaxed resize-none font-sans"
        />

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
          
          <div className="flex items-center gap-3">
            {activeSession.mode === 'VOICE' && (
              <>
                {!isRecording ? (
                  <Button3D
                    variant="glow"
                    size="md"
                    icon={<Mic className="w-4 h-4 text-cyan-200" />}
                    onClick={startVoiceRecording}
                  >
                    Start Voice Answer
                  </Button3D>
                ) : (
                  <Button3D
                    variant="danger"
                    size="md"
                    icon={<Square className="w-4 h-4 fill-white" />}
                    onClick={stopVoiceRecording}
                  >
                    Stop Recording
                  </Button3D>
                )}
              </>
            )}

            <button
              onClick={skipCurrentQuestion}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-2xl glass-pill hover:bg-white/10 text-xs font-bold text-slate-400 hover:text-white transition-all flex items-center gap-1.5"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span>Skip Question</span>
            </button>
          </div>

          <div>
            <Button3D
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
              loading={isSubmitting || interviewState === 'EVALUATING'}
              disabled={!textAnswer.trim() || isSubmitting}
              onClick={handleFinalSubmit}
            >
              {activeSession.currentQuestionIndex + 1 === activeSession.totalQuestionsCount
                ? 'Submit & Generate Final Report'
                : 'Submit Answer →'}
            </Button3D>
          </div>

        </div>

      </div>

    </div>
  );
};
