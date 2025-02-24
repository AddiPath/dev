import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Emergency } from './components/Emergency';
import { Footer } from './components/Footer';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Forum } from './components/Forum/Forum';
import { Contact } from './components/Contact';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';
import { AddisonsInfo } from './components/AddisonsInfo';
import { MembershipComparison } from './components/Membership/MembershipComparison';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ForumProvider } from './context/ForumContext';
import { PersistenceProvider } from './context/PersistenceContext';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider } from './context/ContentContext';
import { AuthCallback } from './components/Auth/AuthCallback';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && isAdmin ? <>{children}</> : <Navigate to="/" />;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <ForumProvider>
            <PersistenceProvider>
              <Router>
                <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white">
                  <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                  <main>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/signup" element={<SignupForm />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/addisons-info" element={<AddisonsInfo />} />
                      <Route path="/membership" element={<MembershipComparison />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="/forum" element={
                        <PrivateRoute>
                          <Forum />
                        </PrivateRoute>
                      } />
                      <Route path="/dashboard/*" element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      } />
                      <Route path="/admin/*" element={
                        <AdminRoute>
                          <AdminDashboard />
                        </AdminRoute>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </PersistenceProvider>
          </ForumProvider>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Emergency />
    </div>
  );
}