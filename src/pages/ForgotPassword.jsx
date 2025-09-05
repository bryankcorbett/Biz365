import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';
import logoblack from '../assets/logoblack.png';

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

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Phone input, 2: OTP verification
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: '',
    countryCode: '+1'
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
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
      <main className="px-4 sm:px-6 lg:px-8 pt-2 mt-10">
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

          {/* Right Panel - White Forgot Password Form */}
          <div>
            <div className="rounded-xl text-card-foreground border-0 shadow-xl bg-white/70 dark:bg-white/5 backdrop-blur-md">
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-8">
<<<<<<< HEAD
                  <img 
                    src={logoblack} 
                    alt="Biz365 Logo" 
                    className="h-36 w-auto mx-auto mb-4 object-contain"
                  />
=======
>>>>>>> 829a901c98cb2cfb484a40ff47a2c67fb4a89f3f
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
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
                  <form onSubmit={handlePhoneSubmit} className="space-y-6">
                    {/* Mobile Number Field */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
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
                            <div className="country-dropdown absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
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
                  </form>
                ) : (
                  <form onSubmit={handleOTPSubmit} className="space-y-6">
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
                  </form>
                )}

                {/* Footer Links */}
                <div className="mt-6 space-y-3 text-center">
                  <Link 
                    to={ROUTES.LOGIN} 
                    className="text-sm text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors"
                  >
                    Back to Login
                  </Link>
                  
                  <div className="flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">or</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link 
                      to={ROUTES.SIGNUP} 
                      className="text-gray-900 dark:text-gray-100 hover:underline font-medium transition-colors"
                    >
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mx-auto max-w-6xl mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
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

export default ForgotPassword;
