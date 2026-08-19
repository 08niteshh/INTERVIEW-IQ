import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, JobRole, ExperienceLevel } from '../types';
import { DEMO_USERS } from '../data/mockDatabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemoUser: (role: 'DATA_ANALYST' | 'FULL_STACK' | 'FRONTEND') => void;
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
        return DEMO_USERS[0];
      }
    }
    return DEMO_USERS[0]; // Default to Nitesh Yadav (Data Analyst demo persona)
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('interviewiq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('interviewiq_user');
    }
  }, [user]);

  const loginWithCredentials = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const found = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      return { success: true };
    }
    // Create new account if not demo
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email: email,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`,
      targetRole: 'Data Analyst',
      experienceLevel: '1_3_YEARS',
      totalInterviewsTaken: 0,
      averageScore: 0,
      practiceHours: 0,
      joinedAt: new Date().toISOString(),
    };
    setUser(newUser);
    return { success: true };
  };

  const loginAsDemoUser = (role: 'DATA_ANALYST' | 'FULL_STACK' | 'FRONTEND') => {
    if (role === 'DATA_ANALYST') setUser(DEMO_USERS[0]);
    else if (role === 'FULL_STACK') setUser(DEMO_USERS[1]);
    else setUser(DEMO_USERS[2]);
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
        loginAsDemoUser,
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
