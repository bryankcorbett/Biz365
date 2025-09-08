import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Corementors } from './screens/Corementors/Corementors';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './components/ToastProvider';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP';
import ForgotPassword from './pages/ForgotPassword';
import OnboardingStep1 from './pages/onboarding/Step1';
import OnboardingStep2 from './pages/onboarding/Step2';
import OnboardingStep3 from './pages/onboarding/Step3';
import ProtectedRoute from './components/ProtectedRoute';
import ApiUnavailableBanner from './components/ApiUnavailableBanner';

// Component to show API unavailable banner when needed
const AppContent = () => {
  const { apiUnavailable } = useAuth();
  
  // Force rebuild marker
  console.log('App rebuilt at:', new Date().toISOString());
  
  return (
    <>
      {apiUnavailable && <ApiUnavailableBanner />}
      <Router>
        <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<Corementors />} />
            
            {/* CoreMentors Page */}
            <Route path="/corementors" element={<Corementors />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Dashboard Route */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Dashboard!</h1>
                    <p className="text-gray-600 mb-4">You are successfully authenticated.</p>
                    <button 
                      onClick={() => window.location.href = 'https://app.biz365.ai'}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      Go to Main Dashboard
                    </button>
                  </div>
                </div>
              </ProtectedRoute>
            } />

            {/* Protected Onboarding Routes */}
            <Route path="/onboarding/step1" element={
              <ProtectedRoute>
                <OnboardingStep1 />
              </ProtectedRoute>
            } />
            <Route path="/onboarding/step2" element={
              <ProtectedRoute>
                <OnboardingStep2 />
              </ProtectedRoute>
            } />
            <Route path="/onboarding/step3" element={
              <ProtectedRoute>
                <OnboardingStep3 />
              </ProtectedRoute>
            } />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </>
    );
  };

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;