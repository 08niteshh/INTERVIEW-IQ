import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  InterviewSession, 
  InterviewQuestion, 
  CandidateAnswer, 
  AnswerEvaluation, 
  AvatarState, 
  InterviewState, 
  JobRole, 
  InterviewType, 
  ExperienceLevel, 
  InterviewDifficulty, 
  InterviewMode,
  FinalReportScores,
  SpeechMetrics,
  ImprovementPlan
} from '../types';
import { QUESTION_BANK, MOCK_PAST_INTERVIEWS, MOCK_IMPROVEMENT_PLAN } from '../data/mockDatabase';
import { useAuth } from './AuthContext';
import { useResume } from './ResumeContext';

interface StartInterviewConfig {
  roleTitle: JobRole;
  interviewType: InterviewType;
  experienceLevel: ExperienceLevel;
  difficulty: InterviewDifficulty;
  mode: InterviewMode;
  totalQuestionsCount: number;
  durationMinutes: number;
  companyTarget?: string;
}

interface InterviewContextType {
  activeSession: InterviewSession | null;
  avatarState: AvatarState;
  interviewState: InterviewState;
  
  // Audio & Voice States
  isRecording: boolean;
  audioVolume: number;
  audioFrequencyData: Uint8Array | null;
  liveTranscript: string;
  isAiSpeaking: boolean;
  isAiMuted: boolean;
  
  // Timer States
  totalTimeRemainingSeconds: number;
  questionTimeElapsedSeconds: number;
  
  // Actions
  startNewInterview: (config: StartInterviewConfig) => string;
  submitAnswer: (candidateText: string) => Promise<void>;
  skipCurrentQuestion: () => void;
  endInterviewEarly: () => void;
  startVoiceRecording: () => Promise<void>;
  stopVoiceRecording: () => void;
  setLiveTranscript: (text: string) => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  toggleAiMute: () => void;
  
  // Historical & Plan
  pastInterviews: InterviewSession[];
  improvementPlan: ImprovementPlan;
  getInterviewById: (id: string) => InterviewSession | undefined;
  updateImprovementChecklist: (taskId: string, completed: boolean) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { currentResume, currentJD } = useResume();

  const [activeSession, setActiveSession] = useState<InterviewSession | null>(() => {
    const saved = localStorage.getItem('interviewiq_active_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [pastInterviews, setPastInterviews] = useState<InterviewSession[]>(() => {
    const saved = localStorage.getItem('interviewiq_past_interviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MOCK_PAST_INTERVIEWS;
      }
    }
    return MOCK_PAST_INTERVIEWS;
  });

  const [improvementPlan, setImprovementPlan] = useState<ImprovementPlan>(() => {
    const saved = localStorage.getItem('interviewiq_plan');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MOCK_IMPROVEMENT_PLAN;
      }
    }
    return MOCK_IMPROVEMENT_PLAN;
  });

  const [avatarState, setAvatarState] = useState<AvatarState>('IDLE');
  const [interviewState, setInterviewState] = useState<InterviewState>('NOT_STARTED');
  
  // Voice & Web Audio States
  const [isRecording, setIsRecording] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0);
  const [audioFrequencyData, setAudioFrequencyData] = useState<Uint8Array | null>(null);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isAiMuted, setIsAiMuted] = useState(false);
  
  // Timers
  const [totalTimeRemainingSeconds, setTotalTimeRemainingSeconds] = useState(18 * 60);
  const [questionTimeElapsedSeconds, setQuestionTimeElapsedSeconds] = useState(0);

  // Audio Context & Stream Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const questionTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalTimerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Persist Active Session & Past Sessions
  useEffect(() => {
    if (activeSession) {
      localStorage.setItem('interviewiq_active_session', JSON.stringify(activeSession));
    } else {
      localStorage.removeItem('interviewiq_active_session');
    }
  }, [activeSession]);

  useEffect(() => {
    localStorage.setItem('interviewiq_past_interviews', JSON.stringify(pastInterviews));
  }, [pastInterviews]);

  useEffect(() => {
    localStorage.setItem('interviewiq_plan', JSON.stringify(improvementPlan));
  }, [improvementPlan]);

  // Handle Question and Total Timers
  useEffect(() => {
    if (activeSession && activeSession.state !== 'COMPLETED' && activeSession.state !== 'NOT_STARTED') {
      // Question timer increment
      questionTimerIntervalRef.current = setInterval(() => {
        setQuestionTimeElapsedSeconds(prev => prev + 1);
      }, 1000);

      // Total countdown timer
      totalTimerIntervalRef.current = setInterval(() => {
        setTotalTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            // Auto complete if time expires
            handleInterviewCompletion(activeSession);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (questionTimerIntervalRef.current) clearInterval(questionTimerIntervalRef.current);
        if (totalTimerIntervalRef.current) clearInterval(totalTimerIntervalRef.current);
      };
    }
  }, [activeSession?.state, activeSession?.currentQuestionIndex]);

  // Speak when current question changes
  useEffect(() => {
    if (activeSession && activeSession.state === 'QUESTIONING') {
      const currentQ = activeSession.questions[activeSession.currentQuestionIndex];
      if (currentQ) {
        speakText(currentQ.questionText);
      }
    }
  }, [activeSession?.currentQuestionIndex, activeSession?.state]);

  // Web Speech Synthesis (AI Interviewer Voice)
  const speakText = (text: string) => {
    if (isAiMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Siri') || v.name.includes('Samantha')));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      setIsAiSpeaking(true);
      setAvatarState('SPEAKING');
    };

    utterance.onend = () => {
      setIsAiSpeaking(false);
      setAvatarState('IDLE');
    };

    utterance.onerror = () => {
      setIsAiSpeaking(false);
      setAvatarState('IDLE');
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsAiSpeaking(false);
      if (avatarState === 'SPEAKING') setAvatarState('IDLE');
    }
  };

  const toggleAiMute = () => {
    if (!isAiMuted) stopSpeaking();
    setIsAiMuted(prev => !prev);
  };

  // Web Audio API Frequency Analysis & Microphone Recording
  const startVoiceRecording = async () => {
    stopSpeaking();
    setLiveTranscript('');
    setIsRecording(true);
    setAvatarState('LISTENING');

    try {
      // 1. Microphone Audio Stream for Web Audio Waveform
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateFrequencyData = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        setAudioVolume(avg);
        setAudioFrequencyData(new Uint8Array(dataArray));

        animationFrameRef.current = requestAnimationFrame(updateFrequencyData);
      };

      updateFrequencyData();

      // 2. Speech-to-Text Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setLiveTranscript(currentTranscript);
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition error:', e);
        };

        recognition.start();
        speechRecognitionRef.current = recognition;
      }
    } catch (err) {
      console.warn('Microphone access not granted or audio error:', err);
      setIsRecording(false);
      setAvatarState('IDLE');
    }
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    setAvatarState('IDLE');

    // Stop Media Stream Tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Stop AudioContext
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Stop Speech Recognition
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {}
      speechRecognitionRef.current = null;
    }

    setAudioFrequencyData(null);
    setAudioVolume(0);
  };

  // Analyze candidate speech (WPM, filler words, clarity)
  const calculateSpeechMetrics = (text: string, durationSeconds: number): SpeechMetrics => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const durationMinutes = Math.max(0.1, durationSeconds / 60);
    const speakingSpeedWPM = Math.round(wordCount / durationMinutes);

    const COMMON_FILLERS = ['um', 'uh', 'like', 'basically', 'actually', 'you know', 'sort of', 'kind of', 'i mean'];
    const textLower = text.toLowerCase();
    const foundFillers: string[] = [];
    let fillerCount = 0;

    COMMON_FILLERS.forEach(filler => {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = textLower.match(regex);
      if (matches && matches.length > 0) {
        fillerCount += matches.length;
        foundFillers.push(filler);
      }
    });

    const pausesCount = Math.max(0, Math.round(durationSeconds / 25));
    const clarityIndex = Math.min(98, Math.max(65, 100 - (fillerCount * 3) - (speakingSpeedWPM > 180 ? 10 : 0)));

    return {
      speakingSpeedWPM: speakingSpeedWPM || 135,
      fillerWordCount: fillerCount,
      fillerWordsFound: foundFillers,
      pausesCount,
      durationSeconds,
      clarityIndex,
    };
  };

  // Evaluate candidate answer
  const evaluateAnswer = (question: InterviewQuestion, answerText: string): AnswerEvaluation => {
    const textLower = answerText.toLowerCase();
    const expected = question.expectedTopics.map(t => t.toLowerCase());
    
    // Check how many expected topics were covered
    const matchedTopics = expected.filter(topic => {
      const keywords = topic.split(/\s+/);
      return keywords.some(k => k.length > 3 && textLower.includes(k));
    });

    const topicCoverageRatio = expected.length > 0 ? (matchedTopics.length / expected.length) : 0.7;
    const wordCount = answerText.trim().split(/\s+/).length;

    // Technical score based on topic coverage
    const technicalScore = Number(Math.min(9.8, Math.max(6.0, (topicCoverageRatio * 4) + (wordCount > 30 ? 5.0 : 3.0))).toFixed(1));
    const relevanceScore = Number(Math.min(9.9, Math.max(6.5, 7.0 + (matchedTopics.length * 0.8))).toFixed(1));
    const clarityScore = Number(Math.min(9.5, Math.max(6.8, (wordCount > 20 && wordCount < 180) ? 9.0 : 7.5)).toFixed(1));
    const completenessScore = Number(Math.min(9.6, Math.max(5.5, (topicCoverageRatio * 5) + 4.5)).toFixed(1));
    const overallScore = Number(((technicalScore * 0.4) + (relevanceScore * 0.25) + (clarityScore * 0.15) + (completenessScore * 0.2)).toFixed(1));

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (matchedTopics.length > 0) {
      strengths.push(`Directly addressed core concepts: ${matchedTopics.slice(0, 2).join(', ')}`);
    } else {
      strengths.push('Communicated response with coherent structure and professional vocabulary');
    }

    if (wordCount > 40) {
      strengths.push('Provided solid depth and explanatory detail without drifting off-topic');
    }

    if (matchedTopics.length < expected.length) {
      const missing = expected.filter(e => !matchedTopics.includes(e));
      if (missing.length > 0) {
        improvements.push(`Could elaborate further on: ${missing[0]}`);
      }
    }

    improvements.push('Incorporate trade-offs or edge-case boundary conditions to showcase senior-level engineering depth');

    // Formulate Contextual Follow-Up Question
    let followUpQuestion: string | undefined = undefined;
    let isFollowUpRequired = false;

    if (overallScore < 7.5) {
      isFollowUpRequired = true;
      followUpQuestion = `To dive deeper, could you clarify how you would handle this in a production scenario when unexpected null data or edge cases occur?`;
    } else if (textLower.includes('power bi') || textLower.includes('dax')) {
      followUpQuestion = `You mentioned Power BI. Can you explain one specific DAX measure you crafted and why an iterator function like SUMX was required?`;
    } else if (textLower.includes('sql') || textLower.includes('query')) {
      followUpQuestion = `Building on your SQL example, what index type would you add on PostgreSQL to accelerate that query under high concurrent reads?`;
    } else if (textLower.includes('react') || textLower.includes('state')) {
      followUpQuestion = `How do you avoid unnecessary re-renders in that component tree when state updates at 60fps?`;
    }

    return {
      technicalScore,
      relevanceScore,
      clarityScore,
      completenessScore,
      overallScore,
      strengths,
      improvements,
      betterAnswerStructure: {
        definition: 'Concise 1-sentence technical definition or high-level thesis',
        practicalExample: 'Concrete project application with quantifiable parameters',
        tradeoffsOrEdgeCases: 'Memory/CPU latency tradeoffs or boundary condition mitigation'
      },
      followUpQuestion,
      isFollowUpRequired,
    };
  };

  // Generate Questions Set for New Session
  const generateQuestions = (
    role: JobRole,
    type: InterviewType,
    difficulty: InterviewDifficulty,
    count: number
  ): InterviewQuestion[] => {
    const baseBank = QUESTION_BANK[role] || QUESTION_BANK['Data Analyst'];
    const generated: InterviewQuestion[] = [];

    // 1. First Question: Warmup / Background
    generated.push({
      id: `q-gen-1`,
      questionNumber: 1,
      totalQuestions: count,
      category: 'Introduction & Background',
      questionText: `Hi! Welcome to InterviewIQ. Let's start with a quick introduction: tell me about yourself, your background, and why you are targeting the ${role} position.`,
      difficulty: 'EASY',
      expectedTopics: ['Educational / Professional background', 'Core competencies', 'Career motivation'],
      skillsTested: ['Communication', 'Narrative Clarity'],
      source: 'SYSTEM_BANK',
    });

    // 2. Second Question: Contextual Resume Project Probing (if resume available)
    if (currentResume && currentResume.projects.length > 0) {
      const project = currentResume.projects[0];
      generated.push({
        id: `q-gen-2`,
        questionNumber: 2,
        totalQuestions: count,
        category: `Project Probing — ${project.title.split('—')[0]}`,
        questionText: `In your resume, you highlighted '${project.title}'. Can you walk me through the end-to-end technical architecture and explain the biggest engineering challenge you resolved?`,
        difficulty: 'MEDIUM',
        expectedTopics: ['System architecture', 'Tech stack tradeoffs', 'Quantified results', 'Problem solving'],
        skillsTested: project.techStack.slice(0, 3),
        source: 'RESUME_PARSED',
        contextualHook: `Referencing ${project.title} on candidate resume`,
      });
    }

    // 3. Populate remaining questions from System Bank and JD Gaps
    let bankIndex = 0;
    while (generated.length < count) {
      const template = baseBank[bankIndex % baseBank.length];
      const qNum = generated.length + 1;

      generated.push({
        id: `q-gen-${qNum}`,
        questionNumber: qNum,
        totalQuestions: count,
        category: template.category,
        questionText: template.questionText,
        difficulty: template.difficulty || difficulty,
        expectedTopics: template.expectedTopics,
        skillsTested: template.skillsTested,
        source: template.source,
      });

      bankIndex++;
    }

    return generated;
  };

  const startNewInterview = (config: StartInterviewConfig): string => {
    stopSpeaking();
    stopVoiceRecording();

    const sessionId = `int-session-${Date.now()}`;
    const generatedQuestions = generateQuestions(
      config.roleTitle,
      config.interviewType,
      config.difficulty,
      config.totalQuestionsCount
    );

    const newSession: InterviewSession = {
      id: sessionId,
      userId: user?.id || 'usr-guest',
      roleTitle: config.roleTitle,
      interviewType: config.interviewType,
      experienceLevel: config.experienceLevel,
      difficulty: config.difficulty,
      mode: config.mode,
      totalQuestionsCount: config.totalQuestionsCount,
      durationMinutes: config.durationMinutes,
      companyTarget: config.companyTarget || 'Target Technology Partner',
      jobDescriptionText: currentJD?.rawText,
      resumeSnapshotId: currentResume?.id,
      state: 'QUESTIONING',
      currentQuestionIndex: 0,
      questions: generatedQuestions,
      answers: [],
      startedAt: new Date().toISOString(),
      status: 'IN_PROGRESS',
    };

    setActiveSession(newSession);
    setInterviewState('QUESTIONING');
    setTotalTimeRemainingSeconds(config.durationMinutes * 60);
    setQuestionTimeElapsedSeconds(0);
    setLiveTranscript('');

    return sessionId;
  };

  const submitAnswer = async (candidateText: string) => {
    if (!activeSession) return;

    stopVoiceRecording();
    stopSpeaking();
    setAvatarState('THINKING');
    setInterviewState('EVALUATING');

    const currentQ = activeSession.questions[activeSession.currentQuestionIndex];
    const duration = questionTimeElapsedSeconds;
    const speechMetrics = calculateSpeechMetrics(candidateText, duration);
    const evaluation = evaluateAnswer(currentQ, candidateText);

    const newAnswer: CandidateAnswer = {
      id: `ans-${Date.now()}`,
      questionId: currentQ.id,
      questionText: currentQ.questionText,
      candidateText,
      mode: activeSession.mode,
      speechMetrics,
      evaluation,
      submittedAt: new Date().toISOString(),
    };

    const updatedAnswers = [...activeSession.answers, newAnswer];
    const nextIndex = activeSession.currentQuestionIndex + 1;

    // Check if interview is completed
    if (nextIndex >= activeSession.questions.length) {
      setAvatarState('EVALUATING');
      setTimeout(() => {
        handleInterviewCompletion({
          ...activeSession,
          answers: updatedAnswers,
        });
      }, 1500);
    } else {
      // Move to next question after subtle evaluation pause
      setTimeout(() => {
        setActiveSession(prev => prev ? {
          ...prev,
          answers: updatedAnswers,
          currentQuestionIndex: nextIndex,
          state: 'QUESTIONING',
        } : null);

        setInterviewState('QUESTIONING');
        setAvatarState('IDLE');
        setQuestionTimeElapsedSeconds(0);
        setLiveTranscript('');
      }, 1200);
    }
  };

  const skipCurrentQuestion = () => {
    if (!activeSession) return;
    submitAnswer('Skipped by candidate.');
  };

  const handleInterviewCompletion = (session: InterviewSession) => {
    setInterviewState('COMPLETED');
    setAvatarState('IDLE');

    // Calculate final scores
    const answersWithScores = session.answers.filter(a => a.evaluation);
    const avgOverall = answersWithScores.length > 0 
      ? Math.round((answersWithScores.reduce((acc, a) => acc + (a.evaluation?.overallScore || 7), 0) / answersWithScores.length) * 10)
      : 82;

    const avgTech = answersWithScores.length > 0
      ? Math.round((answersWithScores.reduce((acc, a) => acc + (a.evaluation?.technicalScore || 7), 0) / answersWithScores.length) * 10)
      : 84;

    const avgRel = answersWithScores.length > 0
      ? Math.round((answersWithScores.reduce((acc, a) => acc + (a.evaluation?.relevanceScore || 7), 0) / answersWithScores.length) * 10)
      : 88;

    const avgClar = answersWithScores.length > 0
      ? Math.round((answersWithScores.reduce((acc, a) => acc + (a.evaluation?.clarityScore || 7), 0) / answersWithScores.length) * 10)
      : 82;

    const avgComp = answersWithScores.length > 0
      ? Math.round((answersWithScores.reduce((acc, a) => acc + (a.evaluation?.completenessScore || 7), 0) / answersWithScores.length) * 10)
      : 80;

    let perfLabel: FinalReportScores['performanceLabel'] = 'Strong Performance';
    if (avgOverall >= 90) perfLabel = 'Exceptional';
    else if (avgOverall >= 80) perfLabel = 'Strong Performance';
    else if (avgOverall >= 70) perfLabel = 'Good Foundation';
    else if (avgOverall >= 60) perfLabel = 'Needs Practice';
    else perfLabel = 'Struggling';

    const reportScores: FinalReportScores = {
      overallScore: avgOverall,
      performanceLabel: perfLabel,
      technicalScore: avgTech,
      communicationScore: avgClar,
      problemSolvingScore: Math.round((avgTech + avgRel) / 2),
      relevanceScore: avgRel,
      completenessScore: avgComp,
      behavioralScore: 84,
      categoryBreakdowns: [
        { category: 'Technical Architecture & Knowledge', score: avgTech, weight: 35 },
        { category: 'Relevance & Precision', score: avgRel, weight: 25 },
        { category: 'Communication & Delivery Clarity', score: avgClar, weight: 20 },
        { category: 'Problem Solving & Tradeoff Analysis', score: avgComp, weight: 20 },
      ]
    };

    const completedSession: InterviewSession = {
      ...session,
      state: 'COMPLETED',
      status: 'COMPLETED',
      completedAt: new Date().toISOString(),
      reportScores,
      strengthsSummary: [
        'Demonstrated strong technical command of core domain terminology',
        'Structured responses clearly with concise introductory framing',
        'Referenced quantifiable production milestones when describing project architecture'
      ],
      weaknessesSummary: [
        'Could provide deeper trade-off discussions regarding memory vs compute overhead',
        'Ensure edge cases and missing data handling are explicitly addressed early in technical queries'
      ],
      communicationTips: [
        'Maintain an optimal pacing of 130-150 WPM with fewer filler words',
        'Use the 3-part framework: Definition ➔ Project Example ➔ Edge Case'
      ],
      technicalGaps: [
        'PostgreSQL Query Execution Plan Optimization',
        'A/B Testing Minimum Detectable Effect Calculations'
      ],
      suggestedPracticeTopics: [
        'SQL Window Frame Boundaries',
        'High Concurrency Database Transactions',
        'DAX Filter vs Row Context Transitions'
      ]
    };

    setActiveSession(completedSession);
    setPastInterviews(prev => [completedSession, ...prev.filter(p => p.id !== completedSession.id)]);
  };

  const endInterviewEarly = () => {
    if (!activeSession) return;
    handleInterviewCompletion(activeSession);
  };

  const getInterviewById = (id: string): InterviewSession | undefined => {
    if (activeSession && activeSession.id === id) return activeSession;
    return pastInterviews.find(p => p.id === id);
  };

  const updateImprovementChecklist = (taskId: string, completed: boolean) => {
    setImprovementPlan(prev => ({
      ...prev,
      checklist: prev.checklist.map(item => item.id === taskId ? { ...item, completed } : item)
    }));
  };

  return (
    <InterviewContext.Provider
      value={{
        activeSession,
        avatarState,
        interviewState,
        isRecording,
        audioVolume,
        audioFrequencyData,
        liveTranscript,
        isAiSpeaking,
        isAiMuted,
        totalTimeRemainingSeconds,
        questionTimeElapsedSeconds,
        startNewInterview,
        submitAnswer,
        skipCurrentQuestion,
        endInterviewEarly,
        startVoiceRecording,
        stopVoiceRecording,
        setLiveTranscript,
        speakText,
        stopSpeaking,
        toggleAiMute,
        pastInterviews,
        improvementPlan,
        getInterviewById,
        updateImprovementChecklist,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (!context) throw new Error('useInterview must be used within an InterviewProvider');
  return context;
};
