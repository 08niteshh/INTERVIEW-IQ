import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, JobRole, ExperienceLevel } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, targetRole: JobRole, experienceLevel: ExperienceLevel) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('interviewiq_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('interviewiq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('interviewiq_user');
    }
  }, [user]);

  const loginWithCredentials = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const loggedInUser: User = {
      id: `usr-${Date.now()}`,
      name: cleanName || 'Candidate',
      email: email,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`,
      targetRole: 'Data Analyst',
      experienceLevel: '1_3_YEARS',
      totalInterviewsTaken: 0,
      averageScore: 0,
      practiceHours: 0,
      joinedAt: new Date().toISOString(),
    };
    setUser(loggedInUser);
    return { success: true };
  };

  const register = async (
    name: string, 
    email: string, 
    targetRole: JobRole, 
    experienceLevel: ExperienceLevel
  ): Promise<{ success: boolean; error?: string }> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`,
      targetRole,
      experienceLevel,
      totalInterviewsTaken: 0,
      averageScore: 0,
      practiceHours: 0,
      joinedAt: new Date().toISOString(),
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithCredentials,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
