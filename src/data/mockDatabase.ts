import { 
  User, 
  ResumeData, 
  JobDescriptionData, 
  InterviewSession, 
  InterviewQuestion, 
  ImprovementPlan,
  PracticeQuestion
} from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'usr-nitesh',
    name: 'Nitesh Yadav',
    email: 'nitesh@interviewiq.demo',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    targetRole: 'Data Analyst',
    experienceLevel: '1_3_YEARS',
    totalInterviewsTaken: 5,
    averageScore: 81.4,
    practiceHours: 14.5,
    joinedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'usr-alex',
    name: 'Alex Vance',
    email: 'alex@interviewiq.demo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    targetRole: 'Full Stack Developer',
    experienceLevel: '3_5_YEARS',
    totalInterviewsTaken: 8,
    averageScore: 86.0,
    practiceHours: 22.0,
    joinedAt: '2025-11-20T10:00:00Z',
  },
  {
    id: 'usr-priya',
    name: 'Priya Sharma',
    email: 'priya@interviewiq.demo',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    targetRole: 'Frontend Developer',
    experienceLevel: '0_1_YEARS',
    totalInterviewsTaken: 3,
    averageScore: 74.2,
    practiceHours: 8.0,
    joinedAt: '2026-02-01T10:00:00Z',
  }
];

export const SAMPLE_RESUME_NITESH: ResumeData = {
  id: 'res-nitesh-1',
  userId: 'usr-nitesh',
  fileName: 'Nitesh_Yadav_Data_Analyst_Resume.pdf',
  candidateName: 'Nitesh Yadav',
  email: 'nitesh@interviewiq.demo',
  phone: '+91 98765 43210',
  summary: 'Data Analyst with 2 years of experience crafting SQL ETL pipelines, interactive Power BI executive dashboards, and predictive Python models for supply chain optimization.',
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Visvesvaraya Technological University',
      year: '2024',
    }
  ],
  skills: [
    'SQL', 'PostgreSQL', 'Python', 'Power BI', 'DAX Measures', 'Pandas', 'NumPy', 
    'Tableau', 'Data Modeling', 'ETL Pipelines', 'Excel Advanced', 'Statistical Analysis'
  ],
  projects: [
    {
      title: 'FleetIQ — Real-Time IoT Fleet Telematics & Analytics',
      techStack: ['Python', 'PostgreSQL', 'FastAPI', 'Power BI', 'TimescaleDB'],
      description: 'Engineered a streaming analytics warehouse processing 45,000 daily telemetry events, identifying anomalous engine temperature spikes and cutting fleet fuel waste by 18%.',
    },
    {
      title: 'SmartCart — Multi-Vendor Spatial Marketplace Analytics',
      techStack: ['SQL', 'React', 'Three.js', 'Python', 'Recharts'],
      description: 'Built customer conversion propensity cohorts, modeled seller payout settlement ledgers with 99.98% financial audit accuracy, and visualized product catalog CTRs.',
    },
    {
      title: 'IPL Match Winning Probability Predictor',
      techStack: ['Python', 'Scikit-Learn', 'Streamlit', 'Pandas'],
      description: 'Trained a Random Forest classifier on 15 years of ball-by-ball IPL match telemetry, achieving 82% in-game winning probability prediction accuracy.',
    }
  ],
  experience: [
    {
      role: 'Associate Data Analyst',
      company: 'Quantum Analytics Labs',
      duration: 'Aug 2024 - Present',
      highlights: [
        'Automated 12 weekly client business review reporting workflows using Python and PostgreSQL stored procedures.',
        'Developed 8 custom Power BI dashboards with complex DAX measures for executive leadership.',
        'Performed RFM customer segmentation on 200,000+ customer records to identify high-value churn risk.'
      ]
    }
  ],
  certifications: [
    'Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
    'Google Advanced Data Analytics Professional Certificate',
    'PostgreSQL Database Administration Certified'
  ],
  uploadedAt: '2026-02-10T14:30:00Z',
};

export const SAMPLE_JOB_DESCRIPTION_DATA_ANALYST: JobDescriptionData = {
  id: 'jd-da-google',
  userId: 'usr-nitesh',
  jobTitle: 'Senior Data Analyst (Growth & Product)',
  companyName: 'Nexora Technologies',
  rawText: `We are looking for a Data Analyst to join our Growth Engineering team. 
Responsibilities:
- Write advanced SQL queries and build dbt data models in Snowflake / PostgreSQL.
- Partner with product managers to define tracking events, calculate LTV/CAC, and conduct rigorous A/B test experiments.
- Build executive-ready Tableau / Power BI dashboards with real-time KPI alerting.
- Perform exploratory statistical analysis using Python (Pandas/NumPy) to uncover user retention drivers.

Required Qualifications:
- 2+ years of experience in data analytics or business intelligence.
- Strong proficiency in SQL (window functions, CTEs, query plan optimization).
- Hands-on experience building production BI dashboards (Power BI / Tableau).
- Experience with Python for data manipulation and statistical testing.
- Strong communication and stakeholder presentation abilities.

Preferred:
- Experience with cloud data warehouses (Snowflake / AWS Redshift / BigQuery).
- Understanding of dbt and modern data stack ETL tools.`,
  requiredSkills: ['SQL', 'Window Functions', 'Python', 'Power BI', 'Tableau', 'A/B Testing', 'Data Modeling', 'ETL'],
  preferredSkills: ['Snowflake', 'dbt', 'BigQuery', 'LTV/CAC Analysis', 'Statistics'],
  responsibilities: [
    'Write advanced SQL queries and build data models',
    'Calculate unit economics and A/B test sample power',
    'Design automated executive KPI dashboards',
    'Identify user churn vectors using Python'
  ],
  experienceRequired: '2-4 Years',
  toolsAndFrameworks: ['SQL', 'Python', 'Power BI', 'Tableau', 'Snowflake', 'dbt'],
  createdAt: '2026-02-12T11:00:00Z',
};

export const QUESTION_BANK: Record<string, Omit<InterviewQuestion, 'id' | 'questionNumber' | 'totalQuestions'>[]> = {
  'Data Analyst': [
    {
      category: 'Technical — SQL',
      questionText: 'Can you explain the difference between WHERE and HAVING clauses in SQL, and when you would use a Window function over a GROUP BY aggregation?',
      difficulty: 'MEDIUM',
      expectedTopics: ['Filtering before vs after aggregation', 'Row-level grouping', 'OVER() clause', 'PARTITION BY', 'Preserving individual rows'],
      skillsTested: ['SQL', 'Window Functions', 'Aggregations'],
      source: 'SYSTEM_BANK',
    },
    {
      category: 'Technical — SQL & Modeling',
      questionText: 'How would you write a query to calculate the 7-day rolling average revenue and find the top 3 spending customers per region without collapsing the original rows?',
      difficulty: 'HARD',
      expectedTopics: ['AVG() OVER(PARTITION BY ORDER BY ROWS BETWEEN)', 'DENSE_RANK()', 'CTE / Subquery filtering'],
      skillsTested: ['SQL', 'Window Functions', 'Data Modeling'],
      source: 'SYSTEM_BANK',
    },
    {
      category: 'Technical — Business Intelligence',
      questionText: 'In Power BI, what is the fundamental difference between a Calculated Column and a DAX Measure in terms of compute context and memory consumption?',
      difficulty: 'MEDIUM',
      expectedTopics: ['Row Context vs Filter Context', 'Storage in VertiPaq engine', 'RAM utilization', 'Dynamic evaluation on user interaction'],
      skillsTested: ['Power BI', 'DAX Measures', 'BI Architecture'],
      source: 'SYSTEM_BANK',
    },
    {
      category: 'Analytics & Product Strategy',
      questionText: 'Suppose our monthly active user retention suddenly drops by 14% week-over-week. Walk me through your step-by-step diagnostic framework to isolate the root cause.',
      difficulty: 'HARD',
      expectedTopics: ['Data pipeline sanity check', 'Cohort segmentation', 'Device / OS / Browser breakdowns', 'App release version changes', 'Funnel drop-off step'],
      skillsTested: ['Diagnostic Analytics', 'Root Cause Analysis', 'Product Sense'],
      source: 'SYSTEM_BANK',
    },
    {
      category: 'Behavioral & Stakeholder Management',
      questionText: 'Tell me about a situation where your data findings directly contradicted the intuition or belief of a senior stakeholder. How did you present your analysis and resolve the conflict?',
      difficulty: 'MEDIUM',
      expectedTopics: ['STAR method', 'Objective data visualization', 'Empathy with business goals', 'Sensitivity testing', 'Constructive consensus'],
      skillsTested: ['Communication', 'Stakeholder Management', 'STAR Framework'],
      source: 'SYSTEM_BANK',
    },
  ],
  'Full Stack Developer': [
    {
      category: 'Technical — System Architecture',
      questionText: 'How do you design a resilient multi-tier web application that handles sudden 10x traffic spikes while preventing database connection pool exhaustion?',
      difficulty: 'HARD',
      expectedTopics: ['Horizontal auto-scaling', 'Redis caching layers', 'Database read replicas', 'Connection poolers like PgBouncer', 'Queue-based asynchronous workers'],
      skillsTested: ['System Design', 'PostgreSQL', 'Redis', 'Microservices'],
      source: 'SYSTEM_BANK',
    },
    {
      category: 'Technical — React & Performance',
      questionText: 'Can you explain the React 18 Concurrent Rendering model, how the Fiber tree reconciler works under the hood, and how useTransition helps prevent UI blocking?',
      difficulty: 'HARD',
      expectedTopics: ['Fiber node structure', 'Time-slicing', 'Interruptible rendering', 'useTransition vs useDeferredValue', 'Batching updates'],
      skillsTested: ['React 18', 'Frontend Architecture', 'JavaScript'],
      source: 'SYSTEM_BANK',
    },
    {
      category: 'Technical — Database & Backend',
      questionText: 'When designing a relational database schema for financial transactions, how do you ensure idempotency and prevent double-spending under concurrent API requests?',
      difficulty: 'HARD',
      expectedTopics: ['ACID transactions', 'Row-level locking (SELECT FOR UPDATE)', 'Unique constraint on idempotency key', 'Distributed locks with Redis'],
      skillsTested: ['Database Transactions', 'API Design', 'Backend Engineering'],
      source: 'SYSTEM_BANK',
    },
  ],
  'Frontend Developer': [
    {
      category: 'Technical — Core JavaScript',
      questionText: 'Explain how the JavaScript Event Loop handles microtasks (Promises, queueMicrotask) vs macrotasks (setTimeout, requestAnimationFrame, I/O) with execution order examples.',
      difficulty: 'MEDIUM',
      expectedTopics: ['Call Stack', 'Microtask Queue', 'Task Queue', 'Event Loop tick lifecycle', 'Starvation risks'],
      skillsTested: ['JavaScript', 'Browser Architecture'],
      source: 'SYSTEM_BANK',
    },
    {
      category: 'Technical — Web Performance',
      questionText: 'What strategies and browser profiling tools do you use to diagnose and fix poor Core Web Vitals, specifically Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)?',
      difficulty: 'MEDIUM',
      expectedTopics: ['LCP preloading', 'Font display swap', 'Image aspect ratio placeholders', 'Code splitting', 'Chrome DevTools Performance tab'],
      skillsTested: ['Web Performance', 'Core Web Vitals', 'CSS Layouts'],
      source: 'SYSTEM_BANK',
    }
  ]
};

export const MOCK_PAST_INTERVIEWS: InterviewSession[] = [
  {
    id: 'int-session-101',
    userId: 'usr-nitesh',
    roleTitle: 'Data Analyst',
    interviewType: 'MIXED',
    experienceLevel: '1_3_YEARS',
    difficulty: 'MEDIUM',
    mode: 'VOICE',
    totalQuestionsCount: 5,
    durationMinutes: 18,
    companyTarget: 'Nexora Technologies',
    state: 'COMPLETED',
    currentQuestionIndex: 4,
    startedAt: '2026-02-16T14:00:00Z',
    completedAt: '2026-02-16T14:18:22Z',
    status: 'COMPLETED',
    questions: [
      {
        id: 'q-101-1',
        questionNumber: 1,
        totalQuestions: 5,
        category: 'Introduction & Background',
        questionText: 'Tell me about yourself, your educational background, and what motivated you to pursue a career in Data Analytics.',
        difficulty: 'EASY',
        expectedTopics: ['Background', 'Projects summary', 'Passion for analytics'],
        skillsTested: ['Communication', 'Clarity'],
        source: 'SYSTEM_BANK',
      },
      {
        id: 'q-101-2',
        questionNumber: 2,
        totalQuestions: 5,
        category: 'Project Probing — FleetIQ',
        questionText: 'In your resume, you highlighted building FleetIQ with PostgreSQL and Power BI. Can you explain how you structured your telemetry data schema to handle 45k daily IoT events efficiently?',
        difficulty: 'MEDIUM',
        expectedTopics: ['Time-series partitioning', 'Indexing strategy', 'Aggregation rollups', 'Power BI DirectQuery vs Import'],
        skillsTested: ['PostgreSQL', 'Data Architecture', 'IoT Analytics'],
        source: 'RESUME_PARSED',
        contextualHook: 'Referencing FleetIQ on candidate resume',
      },
      {
        id: 'q-101-3',
        questionNumber: 3,
        totalQuestions: 5,
        category: 'Technical — SQL Window Functions',
        questionText: 'You mentioned using SQL heavily. How would you calculate a running total of daily active users and compare current week revenue against the same week last month?',
        difficulty: 'HARD',
        expectedTopics: ['SUM() OVER (ORDER BY ROWS UNBOUNDED PRECEDING)', 'LAG() with 4-week offset', 'DATE_TRUNC'],
        skillsTested: ['SQL', 'Window Functions'],
        source: 'SYSTEM_BANK',
      },
      {
        id: 'q-101-4',
        questionNumber: 4,
        totalQuestions: 5,
        category: 'Technical — DAX Context',
        questionText: 'Can you explain the difference between CALCULATE and FILTER in DAX, and how context transition occurs when referencing measures inside an iterator function like SUMX?',
        difficulty: 'HARD',
        expectedTopics: ['Filter Context modification', 'Row Context transition', 'Performance overhead', 'CALCULATETABLE'],
        skillsTested: ['Power BI', 'DAX Measures'],
        source: 'SYSTEM_BANK',
      },
      {
        id: 'q-101-5',
        questionNumber: 5,
        totalQuestions: 5,
        category: 'Behavioral — Stakeholder Conflict',
        questionText: 'Tell me about a time when a product manager wanted to ship a feature despite your A/B test showing a statistically significant drop in conversion. How did you handle that conversation?',
        difficulty: 'MEDIUM',
        expectedTopics: ['STAR method', 'Statistical significance p-values', 'Long-term customer impact', 'Collaborative alternative proposals'],
        skillsTested: ['A/B Testing', 'Stakeholder Management', 'STAR Framework'],
        source: 'SYSTEM_BANK',
      }
    ],
    answers: [
      {
        id: 'ans-101-1',
        questionId: 'q-101-1',
        questionText: 'Tell me about yourself, your educational background, and what motivated you to pursue a career in Data Analytics.',
        candidateText: 'I am a Computer Science graduate passionate about turning complex datasets into strategic business decisions. Over the last two years, I have focused on building end-to-end data analytics solutions—from writing high-performance SQL ETL queries in PostgreSQL to deploying executive Power BI dashboards. In my recent role at Quantum Analytics, I automated reporting pipelines that saved 15 hours weekly and engineered projects like FleetIQ and SmartCart.',
        mode: 'VOICE',
        submittedAt: '2026-02-16T14:03:15Z',
        speechMetrics: {
          speakingSpeedWPM: 138,
          fillerWordCount: 3,
          fillerWordsFound: ['um', 'like'],
          pausesCount: 2,
          durationSeconds: 65,
          clarityIndex: 92,
        },
        evaluation: {
          technicalScore: 8.8,
          relevanceScore: 9.5,
          clarityScore: 9.0,
          completenessScore: 8.5,
          overallScore: 8.9,
          strengths: ['Crisp narrative arc', 'Quantified achievements', 'Directly tied background to target role'],
          improvements: ['Could mention specific business metrics impacted in earlier internships'],
          betterAnswerStructure: {
            definition: 'Present role & core technical expertise',
            practicalExample: '1-2 high impact career milestones with hard metrics',
            tradeoffsOrEdgeCases: 'Why this specific company & role is the logical next step'
          }
        }
      },
      {
        id: 'ans-101-2',
        questionId: 'q-101-2',
        questionText: 'In your resume, you highlighted building FleetIQ with PostgreSQL and Power BI. Can you explain how you structured your telemetry data schema to handle 45k daily IoT events efficiently?',
        candidateText: 'In FleetIQ, we received high-frequency GPS and engine telemetry. To handle this without table locking, I implemented time-based table partitioning on the timestamp column. We indexed composite keys (vehicle_id, event_timestamp) and created materialized views refreshed every hour for hourly averages. In Power BI, we used Composite Mode—importing dimensions like Driver and Vehicle, while keeping the heavy telemetry fact table in DirectQuery mode.',
        mode: 'VOICE',
        submittedAt: '2026-02-16T14:07:40Z',
        speechMetrics: {
          speakingSpeedWPM: 142,
          fillerWordCount: 2,
          fillerWordsFound: ['you know'],
          pausesCount: 1,
          durationSeconds: 78,
          clarityIndex: 94,
        },
        evaluation: {
          technicalScore: 9.2,
          relevanceScore: 9.6,
          clarityScore: 9.0,
          completenessScore: 9.0,
          overallScore: 9.2,
          strengths: ['Accurate architectural knowledge of partitioning', 'Smart usage of Composite model in Power BI', 'Good understanding of indexing tradeoffs'],
          improvements: ['Could mention how telemetry data archival / vacuuming was scheduled'],
          betterAnswerStructure: {
            definition: 'Schema architecture (Star schema vs Time-series partitioning)',
            practicalExample: 'Indexing strategies & Materialized aggregation views',
            tradeoffsOrEdgeCases: 'DirectQuery latency tradeoffs vs Import mode refresh limits'
          }
        }
      },
      {
        id: 'ans-101-3',
        questionId: 'q-101-3',
        questionText: 'You mentioned using SQL heavily. How would you calculate a running total of daily active users and compare current week revenue against the same week last month?',
        candidateText: 'For running totals, I use SUM(active_users) OVER (ORDER BY activity_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). For week-over-week or month-over-month comparisons, I aggregate revenue by week using DATE_TRUNC, and then use the LAG() window function with an offset of 4 to fetch the revenue value from 4 weeks prior within the same CTE.',
        mode: 'VOICE',
        submittedAt: '2026-02-16T14:11:10Z',
        speechMetrics: {
          speakingSpeedWPM: 130,
          fillerWordCount: 4,
          fillerWordsFound: ['basically', 'um'],
          pausesCount: 3,
          durationSeconds: 62,
          clarityIndex: 88,
        },
        evaluation: {
          technicalScore: 8.5,
          relevanceScore: 9.0,
          clarityScore: 8.2,
          completenessScore: 8.0,
          overallScore: 8.4,
          strengths: ['Correct window frame specification', 'Understood LAG offset parameterization'],
          improvements: ['Be sure to mention handling edge cases where a week might have zero sales (calendar spine table)'],
          betterAnswerStructure: {
            definition: 'Window function syntax & Frame specification',
            practicalExample: 'CTE structure with DATE_TRUNC and LAG(revenue, 4)',
            tradeoffsOrEdgeCases: 'Handling missing date gaps using a calendar table join'
          }
        }
      },
      {
        id: 'ans-101-4',
        questionId: 'q-101-4',
        questionText: 'Can you explain the difference between CALCULATE and FILTER in DAX, and how context transition occurs when referencing measures inside an iterator function like SUMX?',
        candidateText: 'CALCULATE is the only DAX function that can alter or override filter context. FILTER is an iterator function that returns a table filtered row-by-row. When you use a measure inside SUMX, CALCULATE is implicitly invoked around the measure, converting the current row context into an equivalent filter context. This is known as context transition.',
        mode: 'VOICE',
        submittedAt: '2026-02-16T14:14:55Z',
        speechMetrics: {
          speakingSpeedWPM: 140,
          fillerWordCount: 1,
          fillerWordsFound: ['ah'],
          pausesCount: 1,
          durationSeconds: 55,
          clarityIndex: 95,
        },
        evaluation: {
          technicalScore: 9.4,
          relevanceScore: 9.8,
          clarityScore: 9.5,
          completenessScore: 9.0,
          overallScore: 9.4,
          strengths: ['Flawless explanation of Context Transition', 'Accurately articulated VertiPaq filter context mechanics'],
          improvements: ['Could mention performance anti-pattern of wrapping full tables in FILTER(All(Table))'],
          betterAnswerStructure: {
            definition: 'CALCULATE filter modifier vs FILTER table iterator',
            practicalExample: 'Step-by-step trace of row context turning to filter context in SUMX',
            tradeoffsOrEdgeCases: 'Memory and CPU cost of scanning large cardinalities with FILTER'
          }
        }
      },
      {
        id: 'ans-101-5',
        questionId: 'q-101-5',
        questionText: 'Tell me about a time when a product manager wanted to ship a feature despite your A/B test showing a statistically significant drop in conversion. How did you handle that conversation?',
        candidateText: 'During a checkout redesign A/B test, conversion dropped by 3.2% with a p-value under 0.01. The PM was eager to release because of marketing deadlines. Instead of just saying no, I scheduled a sync and visualized the projected annual revenue loss of $180k if shipped. Then I segmented the data and found the drop was isolated exclusively to mobile users due to an overlapping sticky CTA button. We fixed the mobile CSS bug, re-tested for 5 days, and conversion increased by 4.1%.',
        mode: 'VOICE',
        submittedAt: '2026-02-16T14:18:00Z',
        speechMetrics: {
          speakingSpeedWPM: 135,
          fillerWordCount: 2,
          fillerWordsFound: ['like'],
          pausesCount: 2,
          durationSeconds: 70,
          clarityIndex: 96,
        },
        evaluation: {
          technicalScore: 9.0,
          relevanceScore: 9.7,
          clarityScore: 9.4,
          completenessScore: 9.2,
          overallScore: 9.3,
          strengths: ['Superb STAR storytelling', 'Business empathy instead of friction', 'Data-driven segmentation led to actionable solution'],
          improvements: ['Mention sample size and minimum detectable effect (MDE) calculation up front'],
          betterAnswerStructure: {
            definition: 'Situation & Conflict (A/B test p-value vs PM launch goal)',
            practicalExample: 'Action taken (Revenue impact modeling & device cohort segmentation)',
            tradeoffsOrEdgeCases: 'Final resolution & positive business outcome'
          }
        }
      }
    ],
    reportScores: {
      overallScore: 88,
      performanceLabel: 'Strong Performance',
      technicalScore: 89,
      communicationScore: 86,
      problemSolvingScore: 92,
      relevanceScore: 94,
      completenessScore: 84,
      behavioralScore: 88,
      categoryBreakdowns: [
        { category: 'SQL & Database Architecture', score: 88, weight: 30 },
        { category: 'Power BI & DAX Modeling', score: 94, weight: 25 },
        { category: 'Diagnostic & Product Analytics', score: 90, weight: 25 },
        { category: 'Communication & STAR Storytelling', score: 86, weight: 20 },
      ]
    },
    strengthsSummary: [
      'Exceptional grasp of Power BI DAX context transition and memory mechanics',
      'Clear, quantified STAR behavioral storytelling with high business empathy',
      'Strong architectural rationale for database partitioning and indexing strategies',
      'Smooth, professional speaking cadence averaging 137 WPM with low filler word ratio'
    ],
    weaknessesSummary: [
      'Did not explicitly articulate calendar spine tables when discussing date gap aggregations',
      'Could provide deeper discussion on database vacuuming and archival lifecycle policies'
    ],
    communicationTips: [
      'Maintain your structured 3-part answer format (Definition ➔ Example ➔ Tradeoff)',
      'Your average pace of 137 WPM is in the ideal 130-150 WPM confidence zone'
    ],
    technicalGaps: [
      'SQL Window Frame boundary syntax edge cases (RANGE vs ROWS)',
      'A/B test statistical power calculation and sample size estimation'
    ],
    suggestedPracticeTopics: [
      'Advanced SQL Window Functions',
      'A/B Testing Statistical Power & MDE',
      'Data Warehousing Snowflake / Redshift Star Schemas'
    ]
  }
];

export const MOCK_IMPROVEMENT_PLAN: ImprovementPlan = {
  id: 'plan-nitesh-1',
  userId: 'usr-nitesh',
  roleTarget: 'Data Analyst & Growth Analytics',
  generatedDate: '2026-02-17T09:00:00Z',
  overallHealthScore: 82,
  weeklyRoadmap: [
    {
      weekNumber: 1,
      title: 'Advanced SQL Window Functions & Frame Optimization',
      focusArea: 'SQL Mastery',
      targetSessions: 5,
      completedSessions: 4,
      topics: ['ROWS BETWEEN vs RANGE', 'Dense Rank Partitioning', 'Cumulative Sum with Gaps', 'LEAD / LAG Multi-Offsets'],
      isCompleted: false,
    },
    {
      weekNumber: 2,
      title: 'A/B Testing, Sample Power & Statistical Significance',
      focusArea: 'Experimentation & Hypothesis Testing',
      targetSessions: 4,
      completedSessions: 2,
      topics: ['p-values and Type I/II errors', 'Sample Power & MDE Sizing', 'Novelty Effect Detection', 'Variance Reduction (CUPED)'],
      isCompleted: false,
    },
    {
      weekNumber: 3,
      title: 'Data Warehousing & Dimensional Star Schema Modeling',
      focusArea: 'Data Engineering Fundamentals',
      targetSessions: 4,
      completedSessions: 1,
      topics: ['SCD Type 1 vs Type 2', 'Snowflake vs Redshift Cluster Keys', 'dbt Incremental Models', 'Data Lineage & QA'],
      isCompleted: false,
    },
    {
      weekNumber: 4,
      title: 'Executive Presentation & System Architecture Mocks',
      focusArea: 'Full Simulation Mocks',
      targetSessions: 3,
      completedSessions: 0,
      topics: ['Live 3D AI Mock Interviews', 'Executive Stakeholder Decks', 'Cross-Functional Tradeoff Scenarios'],
      isCompleted: false,
    }
  ],
  topWeakTopics: [
    { topic: 'SQL Window Frame Boundaries (ROWS vs RANGE)', currentAverageScore: 58, recommendedDrills: 8 },
    { topic: 'A/B Testing Power & Sample Size Calculation', currentAverageScore: 62, recommendedDrills: 6 },
    { topic: 'dbt Incremental Materializations', currentAverageScore: 65, recommendedDrills: 5 },
  ],
  checklist: [
    { id: 'chk-1', task: 'Complete 3 drills on SQL Running Total edge cases', completed: true },
    { id: 'chk-2', task: 'Practice 2 STAR behavioral stories on stakeholder disagreements', completed: true },
    { id: 'chk-3', task: 'Master DAX CALCULATE context transition with matrix tables', completed: true },
    { id: 'chk-4', task: 'Simulate 1 Full-Length 20-minute Voice AI Mock Interview', completed: false },
    { id: 'chk-5', task: 'Review A/B test sample size formulas before next interview', completed: false }
  ]
};

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'pq-1',
    topic: 'SQL Window Functions',
    difficulty: 'HARD',
    questionText: 'Given an employee salary table, write a SQL query to return the second highest salary in each department without using subqueries in the WHERE clause.',
    hints: [
      'Use DENSE_RANK() OVER(PARTITION BY department_id ORDER BY salary DESC)',
      'Wrap the ranked result in a CTE and filter where rank = 2',
      'DENSE_RANK ensures handling ties cleanly unlike ROW_NUMBER'
    ],
    sampleGoodAnswer: `WITH RankedSalaries AS (
  SELECT 
    department_id,
    employee_id,
    salary,
    DENSE_RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) as rank_num
  FROM employees
)
SELECT department_id, employee_id, salary
FROM RankedSalaries
WHERE rank_num = 2;`
  },
  {
    id: 'pq-2',
    topic: 'A/B Testing & Statistics',
    difficulty: 'MEDIUM',
    questionText: 'How do you determine if your A/B test has run for long enough, and why is peeking at the p-value daily and stopping early dangerous?',
    hints: [
      'Early peeking inflates Type I false positive error rates significantly',
      'A test must run for the pre-calculated sample size and full business cycle (e.g., 2 weeks)',
      'Account for day-of-week seasonality (weekend vs weekday buying behavior)'
    ],
    sampleGoodAnswer: 'Stopping an A/B test early upon seeing p < 0.05 is the "peeking problem" which inflates false positive risk from 5% up to 30%+. You must pre-calculate required sample size using baseline conversion, MDE, alpha (0.05), and beta (0.80 power), and run the experiment for complete business cycles to capture weekly seasonality.'
  },
  {
    id: 'pq-3',
    topic: 'Power BI / DAX',
    difficulty: 'HARD',
    questionText: 'What is the performance implication of using FILTER(ALL(Sales), Sales[Amount] > 1000) versus KEEPFILTERS or standard CALCULATE predicate filtering?',
    hints: [
      'FILTER(ALL(Sales)) clears existing table filters and forces an in-memory row-by-row iteration over the whole table',
      'Standard CALCULATE boolean predicates internally translate to FILTER(ALL(Sales[Amount])) column-only scans, which is far faster in the VertiPaq column store'
    ],
    sampleGoodAnswer: 'FILTER(ALL(Sales), ...) forces the VertiPaq engine to materialize and scan the entire table across all columns, defeating columnar compression. Standard CALCULATE(..., Sales[Amount] > 1000) only scans the single Amount column in memory, delivering 10x-50x faster query execution.'
  }
];
