import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';
const logoImage = "https://ik.imagekit.io/corementorid/logo.png?updatedAt=1756895388200";

// Country codes for mobile number
const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
];

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const inputRefs = useRef([]);
  
  // Animation states for right panel elements
  const [showRightElements, setShowRightElements] = useState({
    welcomeText: false,
    otpInputs: false,
    verifyButton: false,
    resendSection: false,
    changeMobileLink: false,
    backToLoginLink: false
  });
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyOTP, isLoading, error, clearError, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  // Get mobile from URL params
  const mobile = searchParams.get('mobile');

  // Reset animation states and start entrance animations
  useEffect(() => {
    // Reset all animation states
    setShowRightElements({
      welcomeText: false,
      otpInputs: false,
      verifyButton: false,
      resendSection: false,
      changeMobileLink: false,
      backToLoginLink: false
    });

    // Start entrance animations after a brief delay
    const timers = [];
    
    // Right panel elements appear one by one (from right)
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, welcomeText: true })), 100));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, otpInputs: true })), 200));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, verifyButton: true })), 300));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, resendSection: true })), 400));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, changeMobileLink: true })), 500));
    timers.push(setTimeout(() => setShowRightElements(prev => ({ ...prev, backToLoginLink: true })), 600));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Format mobile for display
  const formatMobile = (mobile) => {
    if (!mobile) return '';
    // Extract country code and number
    const match = mobile.match(/^(\+\d{1,4})(\d+)$/);
    if (match) {
      const [, code, number] = match;
      return `${code} ${number}`;
    }
    return mobile;
  };

  // Animate form on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

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

  // Redirect to onboarding after successful OTP verification
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.ONBOARDING.STEP1, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (errors.otp) {
      setErrors({});
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key down for better UX
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (numbers.length === 6) {
      setOtp(numbers.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  // Validate OTP
  const validateOtp = () => {
    const otpString = otp.join('');
    const newErrors = {};

    if (otpString.length !== 6) {
      newErrors.otp = 'Please enter the complete 6-digit OTP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateOtp()) {
      return;
    }

    if (!mobile) {
      showToast('error', 'Mobile number not found. Please try signing up again.');
      return;
    }

    try {
      const otpData = {
        mobile,
        otp: otp.join(''),
      };

      await verifyOTP(otpData);
      showToast('success', SUCCESS_MESSAGES.OTP_VERIFIED);
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (!canResend) return;
    
    setCountdown(60);
    setCanResend(false);
    showToast('info', 'OTP resent successfully!');
  };

  // Redirect if no mobile number
  if (!mobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full mx-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Request</h2>
          <p className="text-gray-600 mb-6">Mobile number not found. Please try signing up again.</p>
          <Link 
            to={ROUTES.SIGNUP}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all duration-200"
          >
            Go to Signup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-950">
      {/* Logo at top center */}
      <div className="flex justify-center pt-6 pb-4">
        <img 
          src="public/logoblack.png" 
          alt="Biz365 Logo" 
          className="h-16 w-auto"
        />
      </div>
      
      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pt-2">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Left Panel - Dark Promotional Section */}
          <section className="hidden lg:flex relative overflow-hidden rounded-3xl bg-gray-900 text-white p-8">
            <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 my-auto space-y-4">
              <h1 className="text-3xl font-semibold leading-tight">
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
          </section>

          {/* Right Panel - White OTP Verification Form */}
          <div>
            <div className="rounded-xl text-card-foreground border-0 shadow-xl bg-white/70 dark:bg-white/5 backdrop-blur-md">
              <div className="p-6 sm:p-8">
                {/* Welcome Text */}
                <div className={`text-center mb-8 transition-all duration-500 ease-out ${
                  showRightElements.welcomeText 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Verify Your Mobile</h2>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    We've sent a 6-digit code to{' '}
                    <span className="font-semibold text-gray-900">{formatMobile(mobile)}</span>
                  </p>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* OTP Input */}
                  <div className={`space-y-4 transition-all duration-500 ease-out ${
                    showRightElements.otpInputs 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center block">
                      Enter Verification Code
                    </label>
                    
                    <div className="flex justify-center gap-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={el => inputRefs.current[index] = el}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className={`w-12 h-12 text-center text-lg font-bold bg-white border-2 rounded-xl focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-500 ${
                            errors.otp 
                              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500' 
                              : 'border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-500'
                          } ${digit ? 'border-gray-500 bg-gray-50' : ''}`}
                          disabled={isLoading}
                        />
                      ))}
                    </div>

                    {errors.otp && (
                      <p className="text-sm text-red-600 text-center">{errors.otp}</p>
                    )}

                    <p className="text-xs text-gray-600 text-center">
                      Enter the 6-digit code sent to your mobile number
                    </p>
                  </div>

                  {/* Verify Button */}
                  <div className={`transition-all duration-500 ease-out ${
                    showRightElements.verifyButton 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-full opacity-0'
                  }`}>
                    <button 
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 px-4 py-2 w-full h-11 font-medium" 
                      type="submit" 
                      disabled={isLoading || otp.join('').length !== 6}
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Continue'}
                    </button>
                  </div>
                </form>

                {/* Resend Section */}
                <div className={`mt-6 text-center space-y-4 transition-all duration-500 ease-out ${
                  showRightElements.resendSection 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <div className="flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-600">Didn't receive the code?</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                  
                  {canResend ? (
                    <button
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Resend OTP in <span className="font-semibold text-gray-900">{countdown}s</span>
                    </p>
                  )}
                </div>

                {/* Change Mobile Link */}
                <div className={`mt-4 text-center transition-all duration-500 ease-out ${
                  showRightElements.changeMobileLink 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <p className="text-sm">
                    <Link 
                      to={ROUTES.SIGNUP}
                      className="text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors"
                    >
                      Change mobile number
                    </Link>
                  </p>
                </div>

                {/* Back to Login */}
                <div className={`mt-6 text-center transition-all duration-500 ease-out ${
                  showRightElements.backToLoginLink 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <Link 
                    to={ROUTES.LOGIN} 
                    className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
      
      {/* Footer at bottom center */}
      <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
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
    </div>
  );
};

export default VerifyOTP;
