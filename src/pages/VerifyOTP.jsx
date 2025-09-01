import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyOTP, isLoading, error, clearError, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  // Get mobile from URL params
  const mobile = searchParams.get('mobile');

  // Format mobile for display
  const formatMobile = (mobile) => {
    if (!mobile) return '';
    return mobile.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2-$3');
  };

  // Animate form on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-slate-900 to-purple-950">
      {/* Hero Section Orb - Full Screen */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}> 
        <div className="orb-container w-full h-full" style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div 
          className={`w-full max-w-md transform transition-all duration-1000 ease-out ${
            isFormVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          {/* Logo */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-32 h-20 mb-4">
              <img 
                className="w-full h-full object-contain" 
                alt="Biz365 Logo" 
                src="https://ik.imagekit.io/corementorid/biz-logo.png?updatedAt=1756561209550" 
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Verify Your Mobile</h1>
            <p className="text-gray-300">
              We've sent a 6-digit code to{' '}
              <span className="font-semibold text-gold-400">{formatMobile(mobile)}</span>
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/50 border border-gray-700/50 p-8 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Input */}
              <div className="space-y-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <label className="text-sm font-semibold text-gray-200 text-center block">
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
                      className={`w-12 h-12 text-center text-lg font-bold bg-gray-800/50 border-2 rounded-xl focus:outline-none transition-all duration-300 text-white placeholder-gray-400 ${
                        errors.otp 
                          ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-900/20' 
                          : 'border-gray-600 focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20'
                      } ${digit ? 'border-gold-400 bg-gold-900/20' : ''}`}
                      disabled={isLoading}
                    />
                  ))}
                </div>

                {errors.otp && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.otp}
                  </p>
                )}

                <p className="text-xs text-gray-400 text-center">
                  Enter the 6-digit code sent to your mobile number
                </p>
              </div>

              {/* Submit Button */}
              <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
                                 <button
                   type="submit"
                   disabled={isLoading || otp.join('').length !== 6}
                   className="w-full bg-gradient-to-b from-gold-400 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-white font-semibold py-4 px-6 rounded-xl shadow-2xl shadow-gold-400/60 hover:shadow-2xl hover:shadow-gold-300/70 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                 >
                  {isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-b from-gold-500 to-gold-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  )}
                  <div className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify & Continue
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

            {/* Resend Section */}
            <div className="mt-8 text-center space-y-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center">
                <div className="flex-1 border-t border-gray-600"></div>
                <span className="px-4 text-sm text-gray-400">Didn't receive the code?</span>
                <div className="flex-1 border-t border-gray-600"></div>
              </div>
              
              {canResend ? (
                <button
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-gold-600 hover:text-gold-700 font-semibold hover:underline transition-colors disabled:opacity-50"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-gray-400">
                  Resend OTP in <span className="font-semibold text-gold-400">{countdown}s</span>
                </p>
              )}
              
              <p className="text-sm">
                <Link 
                  to={ROUTES.SIGNUP}
                  className="text-gold-600 hover:text-gold-700 font-medium hover:underline transition-colors"
                >
                  Change mobile number
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Link 
              to={ROUTES.LOGIN} 
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
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
  );
};

export default VerifyOTP;
