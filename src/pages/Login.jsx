import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, OAUTH_CONFIG, API_CONFIG } from '../constants';
import OrbBackground from '../components/OrbBackground';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  
  // Animation states for elements
  const [showElements, setShowElements] = useState({
    logo: false,
    title: false,
    socialButtons: false,
    separator: false,
    emailInput: false,
    passwordInput: false,
    rememberForgot: false,
    signInButton: false,
    createAccount: false
  });
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, error, clearError, isAuthenticated, user, login } = useAuth();
  const { showToast } = useToast();

  // Get next parameter for redirect after login
  const next = searchParams.get('next');

  // Initialize Google OAuth
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: OAUTH_CONFIG.GOOGLE.CLIENT_ID,
        callback: handleGoogleLogin
      });
    }
  }, []);

  // Start entrance animations
  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, logo: true })), 100));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, title: true })), 200));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, socialButtons: true })), 300));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, separator: true })), 400));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, emailInput: true })), 500));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, passwordInput: true })), 600));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, rememberForgot: true })), 700));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, signInButton: true })), 800));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, createAccount: true })), 900));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Clear auth error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Show toast on error
  useEffect(() => {
    if (error) {
      showToast('error', error);
    }
  }, [error, showToast]);

  // Handle navigation after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.onboardingCompleted) {
        navigate('/dashboard', { replace: true });
      } else {
        if (next && next.startsWith('/onboarding/')) {
          navigate(next, { replace: true });
        } else {
          navigate(ROUTES.ONBOARDING.STEP1, { replace: true });
        }
      }
    }
  }, [isAuthenticated, user, navigate, next]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      if (window.google) {
        window.google.accounts.oauth2.initTokenClient({
          client_id: OAUTH_CONFIG.GOOGLE.CLIENT_ID,
          scope: 'email profile',
          callback: async (response) => {
            try {
              const userInfo = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`);
              const userData = await userInfo.json();
              
              const authResponse = await fetch(`${API_CONFIG.BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: userData.email,
                  name: userData.name,
                  picture: userData.picture,
                  googleId: userData.id,
                }),
              });

              if (authResponse.ok) {
                const result = await authResponse.json();
                showToast('success', 'Successfully logged in with Google!');
                
                if (result.user.onboardingCompleted) {
                  window.location.href = ROUTES.DASHBOARD;
                } else {
                  navigate(ROUTES.ONBOARDING.STEP1);
                }
              } else {
                throw new Error('Google authentication failed');
              }
            } catch (error) {
              console.error('Google login error:', error);
              showToast('error', 'Failed to login with Google. Please try again.');
            } finally {
              setIsGoogleLoading(false);
            }
          },
        }).requestAccessToken();
      } else {
        const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${OAUTH_CONFIG.GOOGLE.CLIENT_ID}&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.GOOGLE.REDIRECT_URI)}&scope=email profile&response_type=code`;
        window.location.href = googleAuthUrl;
      }
    } catch (error) {
      console.error('Google login error:', error);
      showToast('error', 'Failed to login with Google. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  // Handle Apple Login
  const handleAppleLogin = async () => {
    setIsAppleLoading(true);
    try {
      if (window.AppleID) {
        const data = await window.AppleID.auth.signIn();
        
        const authResponse = await fetch(`${API_CONFIG.BASE_URL}/api/auth/apple`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.user?.email || '',
            name: data.user?.name || '',
            appleId: data.user?.id || '',
            identityToken: data.authorization.id_token,
            authorizationCode: data.authorization.code,
          }),
        });

        if (authResponse.ok) {
          const result = await authResponse.json();
          showToast('success', 'Successfully logged in with Apple!');
          
          if (result.user.onboardingCompleted) {
            window.location.href = ROUTES.DASHBOARD;
          } else {
            navigate(ROUTES.ONBOARDING.STEP1);
          }
        } else {
          throw new Error('Apple authentication failed');
        }
      } else {
        const appleAuthUrl = `https://appleid.apple.com/auth/authorize?client_id=${OAUTH_CONFIG.APPLE.CLIENT_ID}&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.APPLE.REDIRECT_URI)}&response_type=code&scope=name email`;
        window.location.href = appleAuthUrl;
      }
    } catch (error) {
      console.error('Apple login error:', error);
      showToast('error', 'Failed to login with Apple. Please try again.');
    } finally {
      setIsAppleLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      console.error('Login failed:', error);
      const msg = error instanceof Error ? error.message : (typeof error === 'string' ? error : 'Something went wrong');
      showToast('error', msg);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-white">
      {/* Dynamic Orb Background - Full Screen */}
      <OrbBackground 
        hue={0}
        hoverIntensity={0.3}
        rotateOnHover={true}
        forceHoverState={false}
        className="fixed inset-0 w-full h-full"
      />

      {/* Circular Login Container - Properly Centered */}
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        {/* Perfect Circle Container - Fixed Size and Positioning */}
        <div className="relative w-[500px] h-[500px] max-w-[90vmin] max-h-[90vmin]">
          {/* Circle Background with Better Readability */}
          <div 
            className="absolute inset-0 rounded-full bg-white/98 backdrop-blur-xl border border-black/10 shadow-2xl"
            style={{
              clipPath: 'circle(50% at 50% 50%)',
            }}
          >
            {/* Content Container - Flexbox Layout for Proper Centering */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              
              {/* Logo - Top */}
              <div className={`mb-4 transition-all duration-700 ease-out ${
                showElements.logo 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : '-translate-y-4 opacity-0 scale-95'
              }`}>
                <img 
                  src="https://ik.imagekit.io/corementorid/black_full_glow_biz365.png?updatedAt=1757074822500" 
                  alt="Biz365 Logo"
                  className="h-12 w-auto"
                />
              </div>

              {/* Welcome Text */}
              <div className={`text-center mb-6 transition-all duration-700 ease-out ${
                showElements.title 
            <div className={`text-center mb-3 transition-all duration-700 ease-out ${
                  : '-translate-y-4 opacity-0'
              }`}>
                <h1 className="text-2xl font-bold text-black mb-1">
                  Welcome Back
              <h1 className="text-xl font-bold text-black mb-1">
                <p className="text-black/60 text-sm">
                  Sign in to continue
              <p className="text-black/60 text-xs">
              </div>

              {/* Social Buttons */}
              <div className={`flex gap-3 mb-4 transition-all duration-700 ease-out ${
                showElements.socialButtons 
            <div className={`flex gap-3 mb-3 transition-all duration-700 ease-out ${
                  : '-translate-y-4 opacity-0 scale-95'
              }`}>
                {/* Google Button */}
                <button 
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading || isAppleLoading}
                  className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-300 shadow-md"
                >
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 hover:scale-110 transition-all duration-300 shadow-md"
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 18 18">
                      <g fill="none" fillRule="evenodd">
                  <svg width="16" height="16" viewBox="0 0 18 18">
                        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"></path>
                        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path>
                        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"></path>
                      </g>
                    </svg>
                  )}
                </button>

                {/* Apple Button */}
                <button 
                  onClick={handleAppleLogin}
                  disabled={isGoogleLoading || isAppleLoading}
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all duration-300 shadow-md"
                >
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all duration-300 shadow-md"
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    </svg>
                  ) : (
                    <svg width="16" height="20" viewBox="0 0 384 512" fill="white">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                  <svg width="12" height="16" viewBox="0 0 384 512" fill="white">
                  )}
                </button>
              </div>

              {/* Separator */}
              <div className={`w-32 mb-4 transition-all duration-700 ease-out ${
                showElements.separator 
            <div className={`w-24 mb-3 transition-all duration-700 ease-out ${
                  : 'translate-y-4 opacity-0'
              }`}>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-xs uppercase tracking-wider text-black/50 font-medium">
                      or
                  <span className="bg-white px-2 text-xs uppercase tracking-wider text-black/50 font-medium">
                  </div>
                </div>
              </div>

              {/* Login Form - Vertical Stack */}
              <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
                
            <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-3">
                <div className={`transition-all duration-700 ease-out ${
                  showElements.emailInput 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}>
                  <label className="block text-black/70 text-sm font-medium mb-2">
                    Email
                <label className="block text-black/70 text-xs font-medium mb-1">
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 text-black placeholder-gray-400 text-sm"
                    placeholder="your@email.com"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 text-black placeholder-gray-400 text-sm"
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className={`transition-all duration-700 ease-out ${
                  showElements.passwordInput 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}>
                  <label className="block text-black/70 text-sm font-medium mb-2">
                    Password
                <label className="block text-black/70 text-xs font-medium mb-1">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 text-black placeholder-gray-400 pr-10 text-sm"
                      placeholder="••••••••"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 text-black placeholder-gray-400 pr-8 text-sm"
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200 p-1"
                    >
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors duration-200 p-1"
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                          <line x1="2" x2="22" y1="2" y2="22"></line>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className={`flex items-center justify-between text-sm transition-all duration-700 ease-out ${
                  showElements.rememberForgot 
              <div className={`flex items-center justify-between text-xs transition-all duration-700 ease-out ${
                    : 'translate-y-4 opacity-0'
                }`}>
                  <label className="flex items-center gap-2 text-black/60">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 bg-white text-black focus:ring-black/20 w-4 h-4" 
                    />
                    className="rounded border-gray-300 bg-white text-black focus:ring-black/20 w-3 h-3" 
                  </label>
                  <span className="text-xs">Remember</span>
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-black/60 hover:text-black hover:underline transition-colors duration-200 text-xs"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <div className={`transition-all duration-700 ease-out ${
                  showElements.signInButton 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-4 opacity-0 scale-95'
                }`}>
                  <button
                    className="w-full h-11 bg-black rounded-lg text-white font-semibold text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg relative overflow-hidden group"
                    type="submit"
                  className="w-full h-9 bg-black rounded-lg text-white font-semibold text-sm hover:bg-gray-800 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg relative overflow-hidden group"
                  >
                    {isLoading && (
                      <div className="absolute inset-0 bg-black rounded-lg">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-lg" />
                      </div>
                    )}
                    <div className="relative flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span className="text-sm">Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </div>
                  </button>
                </div>

              </form>

              {/* Create Account Link - Bottom */}
              <div className={`text-center mt-4 transition-all duration-700 ease-out ${
                showElements.createAccount 
            <div className={`text-center mt-2 transition-all duration-700 ease-out ${
                  : 'translate-y-4 opacity-0'
              }`}>
                <p className="text-black/50 text-xs">
            <div className={`mb-2 transition-all duration-700 ease-out ${
                  <Link 
                    to={ROUTES.SIGNUP}
                    className="text-black/70 hover:text-black hover:underline transition-colors duration-200 font-medium"
                  >
                    Create Account
                  </Link>
                </p>
                className="h-10 w-auto"

            </div>
          </div>

          {/* Perfect Circle Border */}
          <div className="absolute inset-0 rounded-full border border-black/10 shadow-2xl"></div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;