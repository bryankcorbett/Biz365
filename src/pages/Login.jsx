import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, OAUTH_CONFIG, API_CONFIG } from '../constants';
import { HeroSection } from '../screens/Corementors/sections/HeroSection/HeroSection';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  
  // Animation states
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
    <div className="min-h-screen relative overflow-hidden bg-orbai-templateframerwebsitewild-sand">
      {/* Hero Section Orb Background - Full Screen */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
        <HeroSection
          hoverIntensity={0.3}
          rotateOnHover={true}
          hue={220}
          forceHoverState={false}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className={`text-center mb-8 transition-all duration-500 ease-out ${
            showElements.logo 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}>
            <img 
              src="https://ik.imagekit.io/corementorid/black_full_glow_biz365.png?updatedAt=1757074822500" 
              alt="Biz365 Logo"
              className="h-16 w-auto mx-auto mb-4"
            />
          </div>

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-white/20 p-8">
            {/* Title */}
            <div className={`text-center mb-8 transition-all duration-500 ease-out ${
              showElements.title 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-3xl tracking-[-0.5px] leading-tight mb-2">
                Welcome Back
              </h1>
              <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base opacity-80">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className={`flex gap-3 mb-6 transition-all duration-500 ease-out ${
              showElements.socialButtons 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}>
              {/* Google Button */}
              <button 
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || isAppleLoading}
                className="flex-1 inline-flex items-center justify-center gap-2 pt-[11px] pb-3 px-6 h-auto bg-orbai-templateframerwebsitewild-sand rounded-[10px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border border-neutral-100 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="mr-2" aria-hidden="true">
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
                <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-sm tracking-[0] leading-[22.4px]">
                  {isGoogleLoading ? 'Signing in...' : 'Google'}
                </span>
              </button>

              {/* Apple Button */}
              <button 
                onClick={handleAppleLogin}
                disabled={isGoogleLoading || isAppleLoading}
                className="flex-1 inline-flex items-center justify-center gap-2 pt-[11px] pb-3 px-6 h-auto bg-wwwsightfulcomblack rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.5px_#00000026,0px_13.65px_13.65px_-2.92px_#00000042,0px_6.87px_6.87px_-2.33px_#0000004c,0px_3.62px_3.62px_-1.75px_#00000054,0px_1.81px_1.81px_-1.17px_#00000057,0px_0.71px_0.71px_-0.58px_#00000059,0px_10px_18px_-3.75px_#3d3d3d40,0px_2.29px_4.12px_-2.5px_#3d3d3da3] hover:bg-wwwsightfulcomblack/90 transition-all duration-300 hover:scale-105"
              >
                <div className="mr-2" aria-hidden="true">
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
                <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomwhite text-sm tracking-[0] leading-[22.4px]">
                  {isAppleLoading ? 'Signing in...' : 'Apple'}
                </span>
              </button>
            </div>

            {/* Separator */}
            <div className={`relative mb-6 transition-all duration-500 ease-out ${
              showElements.separator 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs uppercase tracking-wider text-gray-500 [font-family:'Inter',Helvetica] font-medium">
                  or use your email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className={`space-y-2 transition-all duration-500 ease-out ${
                showElements.emailInput 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}>
                <label className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-sm leading-none flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-300 text-black placeholder-gray-500 hover:bg-white hover:border-gray-300 [font-family:'Inter',Helvetica]"
                  placeholder="you@business.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className={`space-y-2 transition-all duration-500 ease-out ${
                showElements.passwordInput 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}>
                <label className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-sm leading-none flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-300 text-black placeholder-gray-500 hover:bg-white hover:border-gray-300 pr-12 [font-family:'Inter',Helvetica]"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
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
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me and Forgot password */}
              <div className={`flex items-center justify-between text-sm transition-all duration-500 ease-out ${
                showElements.rememberForgot 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-black focus:ring-black hover:border-gray-400 transition-all duration-200" 
                  />
                  <span className="text-gray-600 [font-family:'Inter',Helvetica] font-normal">Remember me</span>
                </label>
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack hover:underline hover:text-gray-700 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <div className={`transition-all duration-500 ease-out ${
                showElements.signInButton 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}>
                <button
                  className="w-full inline-flex items-center justify-center gap-2 pt-[11px] pb-3 px-6 h-auto bg-wwwsightfulcomblack rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.5px_#00000026,0px_13.65px_13.65px_-2.92px_#00000042,0px_6.87px_6.87px_-2.33px_#0000004c,0px_3.62px_3.62px_-1.75px_#00000054,0px_1.81px_1.81px_-1.17px_#00000057,0px_0.71px_0.71px_-0.58px_#00000059,0px_10px_18px_-3.75px_#3d3d3d40,0px_2.29px_4.12px_-2.5px_#3d3d3da3] hover:bg-wwwsightfulcomblack/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomwhite text-sm tracking-[0] leading-[22.4px]">
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </span>
                </button>
              </div>
            </form>

            {/* Create Account Link */}
            <div className={`mt-6 text-center transition-all duration-500 ease-out ${
              showElements.createAccount 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}>
              <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-sm opacity-80">
                Don't have an account?{' '}
                <Link 
                  to={ROUTES.SIGNUP}
                  className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack hover:underline hover:text-gray-700 transition-colors duration-200"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 [font-family:'Inter',Helvetica] font-normal">
              © 2025 Biz365. All rights reserved. Powered by{' '}
              <a 
                href="https://corementors.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black hover:underline transition-colors duration-200"
              >
                CoreMentors
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;