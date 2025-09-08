import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, OAUTH_CONFIG, API_CONFIG } from '../constants';
// Country codes for mobile number - only USA, India, and Canada
const COUNTRY_CODES = [
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' }
];

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    countryCode: '+1',
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Animation states for right panel elements
  const [isExiting, setIsExiting] = useState(false);
  const [showRightElements, setShowRightElements] = useState({
    welcomeText: false,
    googleButton: false,
    appleButton: false,
    separator: false,
    firstNameInput: false,
    lastNameInput: false,
    emailInput: false,
    mobileInput: false,
    passwordInput: false,
    termsCheckbox: false,
    createAccountButton: false,
    signInLink: false
  });
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuth();
  const { showToast } = useToast();

  // Initialize Google OAuth
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: OAUTH_CONFIG.GOOGLE.CLIENT_ID,
        callback: handleGoogleSignup
      });
    }
  }, []);

  // Reset animation states and start entrance animations
  useEffect(() => {
    // Reset all animation states
    setIsExiting(false);
    setShowRightElements({
      welcomeText: false,
      googleButton: false,
      appleButton: false,
      separator: false,
      firstNameInput: false,
      lastNameInput: false,
      emailInput: false,
      mobileInput: false,
      passwordInput: false,
      termsCheckbox: false,
      createAccountButton: false,
      signInLink: false
    });

    // Start entrance animations after a brief delay
    const timers = [];
    
    // Left panel elements appear first (from left)
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, welcomeText: true })), 100));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, firstNameInput: true })), 200));
    
    // Right panel elements appear one by one (from right)
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, googleButton: true })), 300));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, separator: true })), 400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, lastNameInput: true })), 500));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, emailInput: true })), 600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, mobileInput: true })), 700));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, passwordInput: true })), 800));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, termsCheckbox: true })), 900));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, createAccountButton: true })), 1000));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, signInLink: true })), 1100));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Handle exit animations when navigating to login
  const handleNavigateToLogin = (e) => {
    e.preventDefault();
    if (isExiting) return; // Prevent multiple clicks during animation
    
    setIsExiting(true);
    
    // Exit animations in reverse order
    const timers = [];
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, signInLink: false })), 0));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, createAccountButton: false })), 200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, termsCheckbox: false })), 400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, passwordInput: false })), 600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, mobileInput: false })), 800));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, emailInput: false })), 1000));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, lastNameInput: false })), 1200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, separator: false })), 1400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, appleButton: false })), 1600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, googleButton: false })), 1800));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, firstNameInput: false })), 2000));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, welcomeText: false })), 2200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, logo: false })), 2400));
    
    // Navigate after animations complete
    timers.push(setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 2000));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  };

  // Handle exit animations when navigating to verify OTP
  const handleNavigateToVerifyOTP = () => {
    if (isExiting) return; // Prevent multiple clicks during animation
    
    setIsExiting(true);
    
    // Exit animations in reverse order
    const timers = [];
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, signInLink: false })), 0));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, createAccountButton: false })), 200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, termsCheckbox: false })), 400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, passwordInput: false })), 600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, mobileInput: false })), 800));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, emailInput: false })), 1000));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, lastNameInput: false })), 1200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, separator: false })), 1400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, appleButton: false })), 1600));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, googleButton: false })), 1800));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, firstNameInput: false })), 2000));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, welcomeText: false })), 2200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, logo: false })), 2400));
    
    // Navigate after animations complete
    timers.push(setTimeout(() => {
      navigate(`${ROUTES.VERIFY_OTP}?mobile=${encodeURIComponent(formData.mobile)}`, { replace: true });
    }, 2000));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  };

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCountryDropdown && !event.target.closest('.country-dropdown')) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

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

  // Handle successful signup
  useEffect(() => {
    if (signupSuccess && !isLoading && !error) {
      const timer = setTimeout(() => {
        navigate(`${ROUTES.VERIFY_OTP}?mobile=${encodeURIComponent(formData.mobile)}`, { replace: true });
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [signupSuccess, isLoading, error, navigate, formData.mobile]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters long';
    } else if (formData.firstName.trim().length > 25) {
      newErrors.firstName = 'First name must be no more than 25 characters long';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters long';
    } else if (formData.lastName.trim().length > 25) {
      newErrors.lastName = 'Last name must be no more than 25 characters long';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{6,15}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
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
              
              // Send to your backend for signup
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
                showToast('success', 'Successfully signed up with Google!');
                
                // Redirect based on onboarding status
                if (result.user.onboardingCompleted) {
                  window.location.href = ROUTES.DASHBOARD;
                } else {
                  navigate(ROUTES.ONBOARDING.STEP1);
                }
              } else {
                throw new Error('Google signup failed');
              }
            } catch (error) {
              console.error('Google signup error:', error);
              showToast('error', 'Failed to sign up with Google. Please try again.');
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
      console.error('Google signup error:', error);
      showToast('error', 'Failed to sign up with Google. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  // Handle Apple Signup
  const handleAppleSignup = async () => {
    setIsAppleLoading(true);
    try {
      // Initialize Apple Sign-In
      if (window.AppleID) {
        const data = await window.AppleID.auth.signIn();
        
        // Send to your backend for signup
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
          showToast('success', 'Successfully signed up with Apple!');
          
          // Redirect based on onboarding status
          if (result.user.onboardingCompleted) {
            window.location.href = ROUTES.DASHBOARD;
          } else {
            navigate(ROUTES.ONBOARDING.STEP1);
          }
        } else {
          throw new Error('Apple signup failed');
        }
      } else {
        // Fallback: redirect to Apple OAuth
        const appleAuthUrl = `https://appleid.apple.com/auth/authorize?client_id=${OAUTH_CONFIG.APPLE.CLIENT_ID}&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.APPLE.REDIRECT_URI)}&response_type=code&scope=name email`;
        window.location.href = appleAuthUrl;
      }
    } catch (error) {
      console.error('Apple signup error:', error);
      showToast('error', 'Failed to sign up with Apple. Please try again.');
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
      // Combine country code with mobile number and combine names
      const signupData = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        mobile: `${formData.countryCode}${formData.mobile}`
      };
      
      // Remove firstName and lastName from the data sent to backend
      delete signupData.firstName;
      delete signupData.lastName;
      
      await signup(signupData);
      showToast('success', SUCCESS_MESSAGES.SIGNUP_SUCCESS);
      setSignupSuccess(true);
      
      // Start exit animations after successful signup
      handleNavigateToVerifyOTP();
    } catch (error) {
      console.error('Signup failed:', error);
      const msg = error instanceof Error ? error.message : (typeof error === 'string' ? error : 'Signup failed. Please try again.');
      showToast('error', msg);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-950 overflow-hidden">
      {/* Logo in top-left */}
      <div className="absolute top-4 left-4 z-20">
        <img 
          src="https://ik.imagekit.io/corementorid/black_full_glow_biz365.png?updatedAt=1757074822500" 
          alt="Biz365 Logo"
          className="h-12 w-auto"
        />
      </div>

      {/* Center Welcome Text */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
          Join the Revolution!
        </h1>
      </div>

      {/* Main Content */}
      <main className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-4xl grid gap-4 lg:grid-cols-2">
          {/* Left Panel - Dark Promotional Section */}
          <section className="hidden lg:flex relative overflow-hidden rounded-3xl bg-gray-900 text-white p-4 min-h-[200px]">
            <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col justify-center space-y-1">
              {/* Main Text */}
              <div className={`transition-all duration-1000 ease-out ${
                showRightElements.welcomeText 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-full opacity-0'
              }`}>
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-24 mt-0">Be part of something extraordinary</h2>
              </div>
              
              {/* Content */}
              <div className={`transition-all duration-1000 ease-out mb-14 ${
                showRightElements.firstNameInput 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-full opacity-0'
              }`}>
                <h3 className="text-2xl font-semibold leading-tight">
                  Turn everyday customers into raving fans.
                </h3>
                <p className="text-gray-300 text-base">
                  BizTag helps you collect, respond, and showcase reviews—without breaking your flow.
                </p>
                <ul className="space-y-2 text-gray-200">
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

          {/* Right Panel - White Signup Form */}
          <div className="flex items-center">
            <div className="rounded-xl text-card-foreground border-0 shadow-xl bg-white/70 dark:bg-white/5 backdrop-blur-md w-full">
              <div className="p-4 flex flex-col justify-start min-h-[200px]">
                


                {/* Social Signup Buttons */}
                <div className={`flex gap-3 mb-2 transition-all duration-1000 ease-out ${
                  showRightElements.googleButton 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  {/* Google Button */}
                  <button 
                    onClick={handleGoogleSignup}
                    disabled={isGoogleLoading || isAppleLoading}
                    className="flex-1 inline-flex items-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:shadow-md hover:scale-[1.02] hover:bg-gray-50 hover:border-gray-400 px-4 py-2 h-12 justify-center bg-white border-gray-300 text-black"
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
                    {isGoogleLoading ? 'Signing up...' : 'Google'}
                  </button>

                  {/* Apple Button */}
                  <button 
                    onClick={handleAppleSignup}
                    disabled={isGoogleLoading || isAppleLoading}
                    className="flex-1 inline-flex items-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 px-4 py-2 h-12 justify-center bg-black text-white"
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
                    {isAppleLoading ? 'Signing up...' : 'Apple'}
                  </button>
                </div>

                {/* Separator */}
                <div className={`relative mb-2 transition-all duration-1000 ease-out ${
                  showRightElements.separator 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <div className="absolute inset-0 flex items-center">
                    <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500 dark:text-gray-400">OR CREATE WITH EMAIL</span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-1 relative">
                  {/* Name Fields */}
                  <div className={`space-y-1 transition-all duration-1000 ease-out ${
                    showRightElements.firstNameInput 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <div className="flex gap-3">
                      {/* First Name Field */}
                      <div className="flex-1">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <div className="relative">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <input
                            type="text"
                            name="firstName"
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-400 hover:shadow-md pl-9 h-11" 
                            id="firstName"
                            placeholder="First name" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.firstName && (
                          <p className="text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>

                      {/* Last Name Field */}
                      <div className="flex-1">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <div className="relative">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <input
                            type="text"
                            name="lastName"
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-400 hover:shadow-md pl-9 h-11" 
                            id="lastName"
                            placeholder="Last name" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.lastName && (
                          <p className="text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                  </div>

              {/* Email Field */}
                  <div className={`space-y-1 transition-all duration-1000 ease-out ${
                    showRightElements.emailInput 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
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

              {/* Mobile Field */}
                  <div className={`space-y-1 transition-all duration-1000 ease-out ${
                    showRightElements.mobileInput 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <label htmlFor="mobile" className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
                    <div className="flex gap-2 relative">
                      {/* Country Code Dropdown */}
                      <div className="relative country-dropdown z-50">
                        <button
                          ref={dropdownRef}
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center gap-2 px-3 py-2 h-11 bg-white border border-gray-300 rounded-md text-sm shadow-sm transition-all duration-200 hover:border-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        >
                          <span className="text-lg">{COUNTRY_CODES.find(c => c.code === formData.countryCode)?.flag}</span>
                          <span className="text-gray-700">{formData.countryCode}</span>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Mobile Number Input */}
                      <div className="relative flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <input
                          type="tel"
                          name="mobile"
                          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-400 hover:shadow-md pl-9 h-11" 
                          id="mobile"
                          placeholder="Enter your mobile number" 
                          value={formData.mobile}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                      
                      {/* Dropdown Menu - Full Width, Opens Upward */}
                      {showCountryDropdown && (
                        <div 
                          data-country-dropdown
                          className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-[9999] max-h-60 overflow-y-auto"
                        >
                          {COUNTRY_CODES.map((country, index) => (
                            <button
                              key={`${country.code}-${country.country}-${index}`}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, countryCode: country.code }));
                                setShowCountryDropdown(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors"
                            >
                              <span className="text-lg">{country.flag}</span>
                              <span className="text-gray-700">{country.code}</span>
                              <span className="text-gray-500 ml-auto">{country.country}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                {errors.mobile && (
                      <p className="text-sm text-red-600">{errors.mobile}</p>
                )}
              </div>

              {/* Password Field */}
                  <div className={`space-y-1 transition-all duration-1000 ease-out ${
                    showRightElements.passwordInput 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
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
                      <p className="text-sm text-red-600">{errors.password}</p>
                    )}
              </div>

              {/* Terms Checkbox */}
                  <div className={`flex items-center gap-2 text-sm transition-all duration-1000 ease-out ${
                    showRightElements.termsCheckbox 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 hover:border-gray-400 hover:scale-110 transition-all duration-200" 
                  />
                    <span className="text-gray-600 dark:text-gray-300">
                    I agree to the{' '}
                      <Link to="/terms" className="text-gray-900 dark:text-gray-100 hover:underline" target="_blank">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                      <Link to="/privacy" className="text-gray-900 dark:text-gray-100 hover:underline" target="_blank">
                      Privacy Policy
                    </Link>
                  </span>
                  </div>
                {errors.acceptTerms && (
                    <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                  )}

                  {/* Create Account Button */}
                  <div className={`transition-all duration-1000 ease-out ${
                    showRightElements.createAccountButton 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`} tabIndex="0">
                                    <button 
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 px-4 py-2 w-full h-11 font-medium" 
                      type="submit" 
                      disabled={isLoading || isExiting}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>

                {/* Sign In Link */}
                <div className={`mt-2 text-center text-sm text-gray-600 dark:text-gray-300 transition-all duration-1000 ease-out mb-4 ${
                  showRightElements.signInLink 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <p>
                    Already have an account?{' '}
                    <button 
                      onClick={handleNavigateToLogin}
                      disabled={isExiting}
                      className="font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 hover:underline bg-transparent p-0 border-0 shadow-none underline underline-offset-2 focus-visible:outline-none focus-visible:ring-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sign in
                    </button>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-xs text-gray-500 dark:text-gray-400">
        © 2025 Biz365. All rights reserved. Powered by{' '}
        <a 
          href="https://corementors.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs font-medium text-black hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          CoreMentors
        </a>
      </footer>
    </div>
  );
};

export default Signup;
