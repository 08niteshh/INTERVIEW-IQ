export type JobRole =
  | 'Data Analyst'
  | 'Full Stack Developer'
  | 'Frontend Developer'
  | 'Software Developer'
  | 'Business Analyst'
  | 'Data Scientist'
  | 'QA Engineer'
  | string;

export type InterviewType =
  | 'TECHNICAL'
  | 'HR'
  | 'BEHAVIORAL'
  | 'PROJECT'
  | 'RESUME_BASED'
  | 'JD_BASED'
  | 'MIXED';

export type ExperienceLevel =
  | 'FRESHER'
  | '0_1_YEARS'
  | '1_3_YEARS'
  | '3_5_YEARS'
  | '5_PLUS_YEARS';

export type InterviewDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type InterviewMode = 'VOICE' | 'TEXT';

export type InterviewState =
  | 'NOT_STARTED'
  | 'INTRODUCTION'
  | 'QUESTIONING'
  | 'LISTENING'
  | 'THINKING'
  | 'EVALUATING'
  | 'FOLLOW_UP'
  | 'COMPLETED';

export type AvatarState = 'SPEAKING' | 'LISTENING' | 'THINKING' | 'EVALUATING' | 'IDLE';

export interface SpeechMetrics {
  speakingSpeedWPM: number;
  fillerWordCount: number;
  fillerWordsFound: string[];
  pausesCount: number;
  durationSeconds: number;
  clarityIndex: number; // 0 - 100
}

export interface AnswerEvaluation {
  technicalScore: number; // 0 - 10
  relevanceScore: number; // 0 - 10
  clarityScore: number;   // 0 - 10
  completenessScore: number; // 0 - 10
  overallScore: number;   // 0 - 10
  strengths: string[];
  improvements: string[];
  betterAnswerStructure: {
    definition: string;
    practicalExample: string;
    tradeoffsOrEdgeCases: string;
  };
  followUpQuestion?: string;
  isFollowUpRequired?: boolean;
}

export interface CandidateAnswer {
  id: string;
  questionId: string;
  questionText: string;
  candidateText: string;
  mode: InterviewMode;
  speechMetrics?: SpeechMetrics;
  evaluation?: AnswerEvaluation;
  submittedAt: string;
}

export interface InterviewQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  category: string;
  questionText: string;
  difficulty: InterviewDifficulty;
  expectedTopics: string[];
  skillsTested: string[];
  source: 'SYSTEM_BANK' | 'RESUME_PARSED' | 'JD_ANALYZED' | 'ADAPTIVE_FOLLOWUP';
  contextualHook?: string; // e.g. "Since you built FleetIQ with SQL..."
  isFollowUp?: boolean;
  parentQuestionId?: string;
}

export interface CategoryBreakdown {
  category: string;
  score: number; // 0 - 100
  weight: number;
}

export interface FinalReportScores {
  overallScore: number; // 0 - 100
  performanceLabel: 'Exceptional' | 'Strong Performance' | 'Good Foundation' | 'Needs Practice' | 'Struggling';
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  relevanceScore: number;
  completenessScore: number;
  behavioralScore: number;
  categoryBreakdowns: CategoryBreakdown[];
}

export interface InterviewSession {
  id: string;
  userId: string;
  roleTitle: JobRole;
  interviewType: InterviewType;
  experienceLevel: ExperienceLevel;
  difficulty: InterviewDifficulty;
  mode: InterviewMode;
  totalQuestionsCount: number;
  durationMinutes: number;
  companyTarget?: string;
  jobDescriptionText?: string;
  resumeSnapshotId?: string;
  
  // State Tracking
  state: InterviewState;
  currentQuestionIndex: number;
  questions: InterviewQuestion[];
  answers: CandidateAnswer[];
  
  // Final Evaluation
  reportScores?: FinalReportScores;
  strengthsSummary?: string[];
  weaknessesSummary?: string[];
  communicationTips?: string[];
  technicalGaps?: string[];
  suggestedPracticeTopics?: string[];
  
  startedAt: string;
  completedAt?: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
}

export interface ResumeProject {
  title: string;
  techStack: string[];
  description: string;
}

export interface ResumeData {
  id: string;
  userId: string;
  fileName: string;
  candidateName: string;
  email: string;
  phone: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  skills: string[];
  projects: ResumeProject[];
  experience: {
    role: string;
    company: string;
    duration: string;
    highlights: string[];
  }[];
  certifications: string[];
  uploadedAt: string;
}

export interface JobDescriptionData {
  id: string;
  userId: string;
  jobTitle: string;
  companyName: string;
  rawText: string;
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  experienceRequired: string;
  toolsAndFrameworks: string[];
  createdAt: string;
}

export interface ResumeJDMatch {
  id: string;
  resumeId: string;
  jobId: string;
  overallMatchScore: number; // 0 - 100
  skillsMatchScore: number;
  experienceMatchScore: number;
  toolsMatchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestedInterviewQuestions: string[];
  createdAt: string;
}

export interface ImprovementWeeklyGoal {
  weekNumber: number;
  title: string;
  focusArea: string;
  targetSessions: number;
  completedSessions: number;
  topics: string[];
  isCompleted: boolean;
}

export interface ImprovementPlan {
  id: string;
  userId: string;
  roleTarget: string;
  generatedDate: string;
  overallHealthScore: number;
  weeklyRoadmap: ImprovementWeeklyGoal[];
  topWeakTopics: {
    topic: string;
    currentAverageScore: number;
    recommendedDrills: number;
  }[];
  checklist: {
    id: string;
    task: string;
    completed: boolean;
  }[];
}

export interface PracticeQuestion {
  id: string;
  topic: string;
  difficulty: InterviewDifficulty;
  questionText: string;
  hints: string[];
  sampleGoodAnswer: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  targetRole: JobRole;
  experienceLevel: ExperienceLevel;
  totalInterviewsTaken: number;
  averageScore: number;
  practiceHours: number;
  joinedAt: string;
}
