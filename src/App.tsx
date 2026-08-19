import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { InterviewProvider } from './context/InterviewContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { InterviewSetupPage } from './pages/InterviewSetupPage';
import { InterviewStudioPage } from './pages/InterviewStudioPage';
import { ResultsPage } from './pages/ResultsPage';
import { ResumePage } from './pages/ResumePage';
import { JobMatchPage } from './pages/JobMatchPage';
import { ImprovementPlanPage } from './pages/ImprovementPlanPage';
import { PracticePage } from './pages/PracticePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HistoryPage } from './pages/HistoryPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <InterviewProvider>
            <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
              
              {/* Top Navigation */}
              <Navbar />

              {/* Main Content Area */}
              <main className="flex-1">
                <Routes>
                  {/* Public Landing & Auth */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Core Platform Hubs */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/resume" element={<ResumePage />} />
                  <Route path="/job-match" element={<JobMatchPage />} />

                  {/* Interview Lifecycle */}
                  <Route path="/interview/new" element={<InterviewSetupPage />} />
                  <Route path="/interview/:id" element={<InterviewStudioPage />} />
                  <Route path="/results/:id" element={<ResultsPage />} />

                  {/* Career Growth, Drills & Analytics */}
                  <Route path="/improvement" element={<ImprovementPlanPage />} />
                  <Route path="/practice" element={<PracticePage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/history" element={<HistoryPage />} />

                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />

            </div>
          </InterviewProvider>
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
