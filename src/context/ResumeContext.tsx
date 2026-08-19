import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, JobDescriptionData, ResumeJDMatch } from '../types';
import { SAMPLE_RESUME_NITESH, SAMPLE_JOB_DESCRIPTION_DATA_ANALYST } from '../data/mockDatabase';
import { useAuth } from './AuthContext';

interface ResumeContextType {
  currentResume: ResumeData | null;
  currentJD: JobDescriptionData | null;
  currentMatch: ResumeJDMatch | null;
  uploadResumeFile: (file: File) => Promise<ResumeData>;
  uploadResumeText: (text: string, fileName?: string) => ResumeData;
  saveJobDescription: (jobTitle: string, companyName: string, rawText: string) => JobDescriptionData;
  calculateMatchScore: (resume: ResumeData, jd: JobDescriptionData) => ResumeJDMatch;
  setResume: (resume: ResumeData | null) => void;
  setJD: (jd: JobDescriptionData | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [currentResume, setCurrentResume] = useState<ResumeData | null>(() => {
    const saved = localStorage.getItem('interviewiq_resume');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SAMPLE_RESUME_NITESH;
      }
    }
    return SAMPLE_RESUME_NITESH;
  });

  const [currentJD, setCurrentJD] = useState<JobDescriptionData | null>(() => {
    const saved = localStorage.getItem('interviewiq_jd');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return SAMPLE_JOB_DESCRIPTION_DATA_ANALYST;
      }
    }
    return SAMPLE_JOB_DESCRIPTION_DATA_ANALYST;
  });

  const [currentMatch, setCurrentMatch] = useState<ResumeJDMatch | null>(null);

  useEffect(() => {
    if (currentResume) {
      localStorage.setItem('interviewiq_resume', JSON.stringify(currentResume));
    }
    if (currentJD) {
      localStorage.setItem('interviewiq_jd', JSON.stringify(currentJD));
    }
  }, [currentResume, currentJD]);

  // Compute Match Score whenever currentResume or currentJD changes
  useEffect(() => {
    if (currentResume && currentJD) {
      const match = calculateMatchScore(currentResume, currentJD);
      setCurrentMatch(match);
    } else {
      setCurrentMatch(null);
    }
  }, [currentResume, currentJD]);

  const extractSkillsFromText = (text: string): string[] => {
    const KNOWN_SKILLS = [
      'SQL', 'PostgreSQL', 'MySQL', 'Python', 'Power BI', 'DAX Measures', 'Tableau',
      'Pandas', 'NumPy', 'Scikit-Learn', 'Excel Advanced', 'ETL Pipelines', 'Data Modeling',
      'Snowflake', 'BigQuery', 'AWS Redshift', 'dbt', 'A/B Testing', 'Statistics',
      'React', 'TypeScript', 'JavaScript', 'Node.js', 'Next.js', 'FastAPI', 'Docker',
      'Git', 'Three.js', 'Tailwind CSS', 'GraphQL', 'REST APIs', 'Java', 'Spring Boot'
    ];
    const textLower = text.toLowerCase();
    return KNOWN_SKILLS.filter(skill => textLower.includes(skill.toLowerCase()));
  };

  const uploadResumeText = (text: string, fileName: string = 'Uploaded_Resume.pdf'): ResumeData => {
    const extractedSkills = extractSkillsFromText(text);
    const candidateName = user?.name || 'Candidate';
    const email = user?.email || 'candidate@interviewiq.demo';

    const newResume: ResumeData = {
      id: `res-${Date.now()}`,
      userId: user?.id || 'usr-guest',
      fileName,
      candidateName,
      email,
      phone: '+91 98765 00000',
      summary: text.slice(0, 280) + '...',
      education: [
        {
          degree: 'Bachelor of Technology / Science',
          institution: 'Accredited University',
          year: '2024',
        }
      ],
      skills: extractedSkills.length > 0 ? extractedSkills : ['SQL', 'Python', 'Data Analytics', 'Problem Solving'],
      projects: [
        {
          title: 'Spatial AI Analytics Platform',
          techStack: extractedSkills.slice(0, 3),
          description: 'Engineered automated real-time analytics pipeline reducing processing latency by 35% across key business telemetry indicators.',
        },
        {
          title: 'FleetIQ Telematics Hub',
          techStack: ['Python', 'SQL', 'Power BI'],
          description: 'Deployed an executive tracking dashboard analyzing 45,000 daily events to uncover efficiency drivers.',
        }
      ],
      experience: [
        {
          role: user?.targetRole || 'Associate Analyst / Developer',
          company: 'Tech Solutions Labs',
          duration: '2024 - Present',
          highlights: [
            'Architected automated ETL data pipelines and BI analytics reporting workflows.',
            'Collaborated with cross-functional product stakeholders to optimize core system performance metrics.'
          ]
        }
      ],
      certifications: [
        'Certified Data & Software Analytics Professional',
        'Advanced Problem Solving Certification'
      ],
      uploadedAt: new Date().toISOString(),
    };

    setCurrentResume(newResume);
    return newResume;
  };

  const uploadResumeFile = async (file: File): Promise<ResumeData> => {
    // Read text from file
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textContent = (e.target?.result as string) || '';
        const parsed = uploadResumeText(textContent || file.name, file.name);
        resolve(parsed);
      };
      reader.onerror = () => {
        const parsed = uploadResumeText(`Resume for ${file.name}`, file.name);
        resolve(parsed);
      };
      reader.readAsText(file);
    });
  };

  const saveJobDescription = (jobTitle: string, companyName: string, rawText: string): JobDescriptionData => {
    const extractedSkills = extractSkillsFromText(rawText);
    const newJD: JobDescriptionData = {
      id: `jd-${Date.now()}`,
      userId: user?.id || 'usr-guest',
      jobTitle,
      companyName,
      rawText,
      requiredSkills: extractedSkills.slice(0, 6),
      preferredSkills: extractedSkills.slice(6, 10),
      responsibilities: [
        `Deliver high performance architecture and data modeling for ${jobTitle}`,
        'Collaborate with product and engineering leaders on key deliverables',
        'Conduct rigorous testing, query optimization, and performance profiling',
        'Present structured findings and technical documentation to executive stakeholders'
      ],
      experienceRequired: '2-4 Years',
      toolsAndFrameworks: extractedSkills,
      createdAt: new Date().toISOString(),
    };

    setCurrentJD(newJD);
    return newJD;
  };

  const calculateMatchScore = (resume: ResumeData, jd: JobDescriptionData): ResumeJDMatch => {
    const resumeSkillsLower = new Set(resume.skills.map(s => s.toLowerCase()));
    const jdRequiredLower = jd.requiredSkills.map(s => s.toLowerCase());

    const matched = jd.requiredSkills.filter(s => resumeSkillsLower.has(s.toLowerCase()));
    const missing = jd.requiredSkills.filter(s => !resumeSkillsLower.has(s.toLowerCase()));

    const skillsMatchScore = jdRequiredLower.length > 0
      ? Math.round((matched.length / jdRequiredLower.length) * 100)
      : 80;

    const experienceMatchScore = 78;
    const toolsMatchScore = Math.min(100, Math.round(skillsMatchScore * 1.1));
    const overallMatchScore = Math.round((skillsMatchScore * 0.5) + (experienceMatchScore * 0.3) + (toolsMatchScore * 0.2));

    const suggestedQuestions = [
      `In this role, ${jd.companyName} requires proficiency in ${missing[0] || 'advanced data pipelines'}. How have you approached learning or working with similar tools?`,
      `Since you have hands-on experience with ${matched[0] || 'SQL'}, can you describe a time you optimized a query or system that was failing under scale?`,
      `The job description emphasizes cross-functional stakeholder communication. How do you explain complex technical architecture to non-technical business partners?`
    ];

    return {
      id: `match-${Date.now()}`,
      resumeId: resume.id,
      jobId: jd.id,
      overallMatchScore: Math.min(98, Math.max(45, overallMatchScore)),
      skillsMatchScore,
      experienceMatchScore,
      toolsMatchScore,
      matchedSkills: matched.length > 0 ? matched : ['SQL', 'Python', 'Analytics'],
      missingSkills: missing.length > 0 ? missing : ['Snowflake', 'dbt'],
      suggestedInterviewQuestions: suggestedQuestions,
      createdAt: new Date().toISOString(),
    };
  };

  return (
    <ResumeContext.Provider
      value={{
        currentResume,
        currentJD,
        currentMatch,
        uploadResumeFile,
        uploadResumeText,
        saveJobDescription,
        calculateMatchScore,
        setResume: setCurrentResume,
        setJD: setCurrentJD,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
};
