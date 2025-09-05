import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, OAUTH_CONFIG, API_CONFIG } from '../constants';
import logoblack from '../assets/logoblack.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  
  // Animation states
  const [showLeftImage, setShowLeftImage] = useState(false);
  const [showLeftText, setShowLeftText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showRightElements, setShowRightElements] = useState({
    logo: false,
    welcomeText: false,
    googleButton: false,
    appleButton: false,
    separator: false,
    emailInput: false,
    passwordInput: false,
    rememberForgot: false,
    signInButton: false,
    createAccount: false
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  // Get next parameter for redirect after login
  const next = searchParams.get('next');

  // Reset animation states and start entrance animations
  useEffect(() => {
    // Reset all animation states
    setShowLeftImage(false);
    setShowLeftText(false);
    setIsExiting(false);
    setShowRightElements({
      logo: false,
      welcomeText: false,
      googleButton: false,
      appleButton: false,
      separator: false,
      emailInput: false,
      passwordInput: false,
      rememberForgot: false,
      signInButton: false,
      createAccount: false
    });

    // Start entrance animations after a brief delay
    const timers = [];
    
    // Left panel image appears first (from left)
    timers.push(setTimeout(() => setShowLeftImage(true), 200));
    
    // Left panel text appears after image (from left)
    timers.push(setTimeout(() => setShowLeftText(true), 600));
    
    // Right panel elements appear one by one (from right)
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, logo: true })), 1000));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, welcomeText: true })), 1200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, googleButton: true })), 1400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, appleButton: true })), 1600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, separator: true })), 1800));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, emailInput: true })), 2000));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, passwordInput: true })), 2200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, rememberForgot: true })), 2400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, signInButton: true })), 2600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, createAccount: true })), 2800));
    
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
        // User completed onboarding - go to external dashboard
        window.location.href = ROUTES.DASHBOARD;
      } else {
        // User needs to complete onboarding
        if (next && next.startsWith('/onboarding/')) {
          navigate(next, { replace: true });
        } else {
          navigate(ROUTES.ONBOARDING.STEP1, { replace: true });
        }
      }
    }
  }, [isAuthenticated, user, navigate, next]);

  // Handle exit animations when navigating to signup
  const handleNavigateToSignup = (e) => {
    e.preventDefault();
    if (isExiting) return; // Prevent multiple clicks during animation
    
    setIsExiting(true);
    
    // Exit animations in reverse order
    const timers = [];
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, createAccount: false })), 0));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, signInButton: false })), 200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, rememberForgot: false })), 400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, passwordInput: false })), 600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, emailInput: false })), 800));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, separator: false })), 1000));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, appleButton: false })), 1200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, googleButton: false })), 1400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, welcomeText: false })), 1600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, logo: false })), 1800));
    
    // Navigate after animations complete
    timers.push(setTimeout(() => {
      navigate(ROUTES.SIGNUP);
    }, 2000));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  };



  // Handle input changes with animation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
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
      // Initialize Google OAuth
      if (window.google) {
        window.google.accounts.oauth2.initTokenClient({
          client_id: OAUTH_CONFIG.GOOGLE.CLIENT_ID,
          scope: 'email profile',
          callback: async (response) => {
            try {
              // Get user info from Google
              const userInfo = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`);
              const userData = await userInfo.json();
              
              // Send to your backend for authentication
              const authResponse = await fetch(`${API_CONFIG.BASE_URL}/auth/google`, {
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
                
                // Redirect based on onboarding status
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
        // Fallback: redirect to Google OAuth
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
      // Initialize Apple Sign-In
      if (window.AppleID) {
        const data = await window.AppleID.auth.signIn();
        
        // Send to your backend for authentication
        const authResponse = await fetch('/api/auth/apple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identityToken: data.authorization.id_token,
            authorizationCode: data.authorization.code,
            user: data.user,
          }),
        });

        if (authResponse.ok) {
          const result = await authResponse.json();
          showToast('success', 'Successfully logged in with Apple!');
          
          // Redirect based on onboarding status
          if (result.user.onboardingCompleted) {
            window.location.href = ROUTES.DASHBOARD;
          } else {
            navigate(ROUTES.ONBOARDING.STEP1);
          }
        } else {
          throw new Error('Apple authentication failed');
        }
      } else {
        // Fallback: redirect to Apple OAuth
        const appleAuthUrl = `https://appleid.apple.com/auth/authorize?client_id=${process.env.REACT_APP_APPLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/apple/callback')}&response_type=code&scope=name email`;
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
      // Redirect to external dashboard instead of using auth flow
      window.location.href = ROUTES.DASHBOARD;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-950">
      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Left Panel - Dark Promotional Section */}
          <section className="hidden lg:flex relative overflow-hidden rounded-3xl bg-gray-900 text-white p-10">
            <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 my-auto space-y-6">
              {/* Image Container */}
              <div className={`mb-4 transition-all duration-1000 ease-out ${
                showLeftImage 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-full opacity-0'
              }`}>
                <img 
                  src="https://cdn.pixabay.com/photo/2021/05/27/02/07/gamestop-6286877_1280.jpg" 
                  alt="Business success illustration" 
                  className="w-full h-72 object-cover rounded-2xl shadow-2xl"
                />
              </div>
      
              {/* Text Content */}
              <div className={`transition-all duration-1000 ease-out ${
                showLeftText 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-full opacity-0'
              }`}>
                <h1 className="text-4xl font-semibold leading-tight">
                  Turn everyday customers into raving fans.
                </h1>
                <p className="text-gray-300 text-lg">
                  BizTag helps you collect, respond, and showcase reviews—without breaking your flow.
                </p>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white"></span>
                    NFC/QR review capture that just works
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white"></span>
                    Auto-routes unhappy customers to private help
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white"></span>
                    One dashboard. All platforms. Zero chaos.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Right Panel - White Login Form */}
          <div>
            <div className="rounded-xl text-card-foreground border-0 shadow-xl bg-white/70 dark:bg-white/5 backdrop-blur-md">
              <div className="p-6 sm:p-8">
                {/* BIZ365 Logo */}
                <div className={`text-center mb-8 transition-all duration-1000 ease-out ${
                  showRightElements.logo 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <img 
                    src={logoblack} 
                    alt="Biz365 Logo"
                    className="h-36 w-auto mx-auto mb-4 object-contain"
                  />
                </div>

                {/* Welcome Text */}
                <div className={`text-center mb-8 transition-all duration-1000 ease-out ${
                  showRightElements.welcomeText 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Let's get started!</h2>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">Access your BizTag dashboard</p>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3 mb-6">
                  {/* Google Button */}
                  <div className={`transition-all duration-1000 ease-out ${
                    showRightElements.googleButton 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <button 
                      onClick={handleGoogleLogin}
                      disabled={isGoogleLoading || isAppleLoading}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-gray-50 hover:border-gray-400 px-4 py-2 w-full h-12 justify-center bg-white border-gray-300 text-black"
                    >
                    <div className="mr-3" aria-hidden="true">
                      {isGoogleLoading ? (
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18">
                          <g fill="none" fillRule="evenodd">
                            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path>
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"></path>
                            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path>
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"></path>
                          </g>
                        </svg>
                      )}
                    </div>
                      {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
                    </button>
                  </div>

                  {/* Apple Button */}
                  <div className={`transition-all duration-1000 ease-out ${
                    showRightElements.appleButton 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <button 
                      onClick={handleAppleLogin}
                      disabled={isGoogleLoading || isAppleLoading}
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 px-4 py-2 w-full h-12 justify-center bg-black text-white"
                    >
                    <div className="mr-3" aria-hidden="true">
                      {isAppleLoading ? (
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg width="16" height="20" viewBox="0 0 384 512" fill="currentColor">
                          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                        </svg>
                      )}
                    </div>
                      {isAppleLoading ? 'Signing in...' : 'Continue with Apple'}
                    </button>
                  </div>
                </div>

                {/* Separator */}
                <div className={`relative mb-6 transition-all duration-1000 ease-out ${
                  showRightElements.separator 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <div className="absolute inset-0 flex items-center">
                    <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white dark:bg-transparent px-3 text-xs uppercase tracking-wider text-gray-500">or use your email</span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div className={`space-y-1.5 transition-all duration-1000 ease-out ${
                    showRightElements.emailInput 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                                     <input
                     type="email"
                        name="email"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-400 hover:shadow-md pl-9 h-11" 
                     id="email"
                        placeholder="you@business.com" 
                     value={formData.email}
                     onChange={handleInputChange}
                     disabled={isLoading}
                   />
                </div>
                {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

                  {/* Password Field */}
                  <div className={`space-y-1.5 transition-all duration-1000 ease-out ${
                    showRightElements.passwordInput 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                                     <input
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-400 hover:shadow-md pl-9 pr-10 h-11" 
                     id="password"
                        placeholder="••••••••" 
                     value={formData.password}
                     onChange={handleInputChange}
                     disabled={isLoading}
                   />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:scale-110 bg-transparent p-1 border-0 shadow-none focus-visible:outline-none focus-visible:ring-0 transition-all duration-200 rounded-sm" 
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off h-4 w-4">
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                            <line x1="2" x2="22" y1="2" y2="22"></line>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-4 w-4">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                </div>
                {errors.password && (
                      <p id="password-error" className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

                  {/* Remember me and Forgot password */}
                  <div className={`flex items-center justify-between text-sm transition-all duration-1000 ease-out ${
                    showRightElements.rememberForgot 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 hover:border-gray-400 hover:scale-110 transition-all duration-200" />
                      <span className="text-gray-600 dark:text-gray-300">Remember me</span>
                    </label>
                    <Link
                      to={ROUTES.FORGOT_PASSWORD}
                      className="appearance-none select-none font-medium text-gray-900 dark:text-gray-100 hover:underline hover:text-gray-700 underline-offset-2 !bg-transparent !p-0 !border-0 !shadow-none !rounded-none focus-visible:!outline-none focus-visible:!ring-0 active:!bg-transparent transition-all duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <div className={`transition-all duration-1000 ease-out ${
                    showRightElements.signInButton 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                                 <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 px-4 py-2 w-full h-11 font-medium" 
                   type="submit"
                   disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

                {/* Create Account Link */}
                <div className={`mt-6 text-center text-sm text-gray-600 dark:text-gray-300 transition-all duration-1000 ease-out ${
                  showRightElements.createAccount 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <p>
                 Don't have an account?{' '}
                <button 
                  onClick={handleNavigateToSignup}
                  disabled={isExiting}
                  className="font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 hover:underline bg-transparent p-0 border-0 shadow-none underline underline-offset-2 focus-visible:outline-none focus-visible:ring-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Create one
                  </button>
                  </p>
                </div>
            </div>
          </div>
          </div>
        </div>

                  {/* Footer */}
          <footer className="mx-auto max-w-6xl mt-10 mb-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 Biz365. All rights reserved. Powered by{' '}
            <a 
              href="https://corementors.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-sm font-medium text-black hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              CoreMentors
            </a>
          </footer>
      </main>
    </div>
  );
};

export default Login;
