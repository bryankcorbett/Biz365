import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';

// Country codes for mobile number - only USA, India, and Canada
const COUNTRY_CODES = [
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' }
];

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Phone input, 2: OTP verification
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: '',
    countryCode: '+1'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Animate form on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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

  // Handle input changes with animation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate phone number
  const validatePhoneNumber = () => {
    const newErrors = {};
    const phoneRegex = /^\d{6,15}$/;

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate OTP
  const validateOTP = () => {
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle phone number submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePhoneNumber()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOtpSent(true);
      setStep(2);
      setCountdown(60);
      showToast('success', 'OTP sent to your mobile number');
    } catch (error) {
      showToast('error', ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateOTP()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast('success', 'Phone number verified! Redirecting to login...');
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 2000);
    } catch (error) {
      showToast('error', ERROR_MESSAGES.INVALID_OTP);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCountdown(60);
      showToast('success', 'OTP resent to your mobile number');
    } catch (error) {
      showToast('error', ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 15) {
      return cleaned;
    }
    return cleaned.slice(0, 15);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-950 overflow-hidden">
     

      {/* Center Welcome Text */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
          Reset Password
        </h1>
      </div>
      
      {/* Main Content */}
      <main className="h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full max-w-6xl grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Dark Promotional Section */}
          <section className="hidden lg:flex relative overflow-hidden rounded-3xl bg-gray-900 text-white p-1 min-h-[350px] mt-8">
            <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col justify-center space-y-1">
              <h1 className="text-4xl font-semibold leading-tight mb-4 px-4">
                Turn everyday customers into raving fans.
              </h1>
              <p className="text-gray-300 text-lg px-4">
                BizTag helps you collect, respond, and showcase reviews—without breaking your flow.
              </p>
              <ul className="space-y-3 text-gray-200 px-4">
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

          {/* Right Panel - White Forgot Password Form */}
          <div className="flex items-center">
            <div className="rounded-xl text-card-foreground border-0 shadow-xl bg-white/70 dark:bg-white/5 backdrop-blur-md w-full">
              <div className="p-1 flex flex-col justify-start min-h-[350px]">
                {/* Header */}
                <div className="text-center mb-2">
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 mt-4">
                    {step === 1 ? 'Reset Password' : 'Verify OTP'}
                  </h2>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    {step === 1 
                      ? 'Enter your mobile number to receive OTP' 
                      : `OTP sent to ${formData.countryCode} ${formData.phoneNumber}`
                    }
                  </p>
                </div>

                {/* Form */}
                {step === 1 ? (
                  <form onSubmit={handlePhoneSubmit} className="space-y-2">
                    {/* Mobile Number Field */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-4">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Mobile Number
                      </label>
                      <div className="relative">
                        {/* Country Code Dropdown */}
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                          <button
                            type="button"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                            className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            <span className="text-lg">
                              {COUNTRY_CODES.find(c => c.code === formData.countryCode)?.flag}
                            </span>
                            <span>{formData.countryCode}</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {showCountryDropdown && (
                            <div className="country-dropdown absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
                              {COUNTRY_CODES.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, countryCode: country.code }));
                                    setShowCountryDropdown(false);
                                  }}
                                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                >
                                  <span className="text-lg">{country.flag}</span>
                                  <span>{country.code}</span>
                                  <span className="text-gray-500">{country.country}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <input
                          type="tel"
                          name="phoneNumber"
                          className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-400 hover:shadow-md pl-20 h-11 ${
                            errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : ''
                          }`}
                          value={formData.phoneNumber}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            handleInputChange({ target: { name: 'phoneNumber', value: formatted } });
                          }}
                          placeholder="Enter your mobile number"
                          disabled={isLoading}
                          maxLength={15}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                      )}
                    </div>

                    {/* Send OTP Button */}
                    <div>
                      <button 
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 px-4 py-2 w-full h-11 font-medium" 
                        type="submit" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center justify-center gap-4 px-4 mt-4">
                      <Link 
                        to={ROUTES.LOGIN} 
                        className="text-sm text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors"
                      >
                        Back to Login
                      </Link>
                      <span className="text-gray-400">|</span>
                      <Link 
                        to={ROUTES.SIGNUP} 
                        className="text-sm text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors"
                      >
                        Sign up for free
                      </Link>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleOTPSubmit} className="space-y-2">
                    {/* OTP Field */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        name="otp"
                        className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-lg shadow-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent hover:border-gray-400 hover:shadow-md text-center tracking-widest h-11 ${
                          errors.otp ? 'border-red-500 focus:ring-red-500' : ''
                        }`}
                        value={formData.otp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                          handleInputChange({ target: { name: 'otp', value } });
                        }}
                        placeholder="000000"
                        disabled={isLoading}
                        maxLength={6}
                      />
                      {errors.otp && (
                        <p className="text-sm text-red-600">{errors.otp}</p>
                      )}
                    </div>

                    {/* Resend OTP */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={countdown > 0 || isLoading}
                        className="text-sm text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                      </button>
                    </div>

                    {/* Verify OTP Button */}
                    <div>
                      <button 
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-black text-white shadow-lg hover:shadow-xl hover:scale-[1.02] hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 px-4 py-2 w-full h-11 font-medium" 
                        type="submit" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                      </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <Link 
                        to={ROUTES.LOGIN} 
                        className="text-sm text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors"
                      >
                        Back to Login
                      </Link>
                      <span className="text-gray-400">|</span>
                      <Link 
                        to={ROUTES.SIGNUP} 
                        className="text-sm text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors"
                      >
                        Sign up for free
                      </Link>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Outside main container, positioned at bottom center */}
      <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <div className="mt-2">
            © 2025 Biz365. All rights reserved. Powered by{' '}
            <a 
              href="https://corementors.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs font-medium text-black hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              CoreMentors
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;
