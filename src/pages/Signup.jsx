import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES } from '../constants';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuth();
  const { showToast } = useToast();

  // Animate form on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be no more than 50 characters long';
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
    } else if (!/^(\+91|91)?[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid Indian mobile number';
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await signup(formData);
      showToast('success', SUCCESS_MESSAGES.SIGNUP_SUCCESS);
      setSignupSuccess(true);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Hero Section Orb - Full Screen */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}> 
        <div className="orb-container w-full h-full" style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      
      {/* Main Content - Inside the Orb */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-8">
        <div 
          className={`w-full max-w-md mx-auto transform transition-all duration-1000 ease-out ${
            isFormVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          {/* Logo */}
          <div className="text-center mb-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-32 h-20 mb-2">
              <img 
                className="w-full h-full object-contain" 
                alt="Biz365 Logo" 
                src="https://ik.imagekit.io/corementorid/biz-logo.png?updatedAt=1756561209550" 
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
            <p className="text-gray-600">Join thousands of businesses using Biz365</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <label 
                  htmlFor="name" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500 ${
                      errors.name 
                        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-900/20' 
                        : 'border-gray-200 focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20'
                    }`}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '150ms' }}>
                <label 
                  htmlFor="email" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500 ${
                      errors.email 
                        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-900/20' 
                        : 'border-gray-200 focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20'
                    }`}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Mobile Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '200ms' }}>
                <label 
                  htmlFor="mobile" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500 ${
                      errors.mobile 
                        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-900/20' 
                        : 'border-gray-200 focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20'
                    }`}
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    disabled={isLoading}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '250ms' }}>
                <label 
                  htmlFor="password" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500 ${
                      errors.password 
                        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-900/20' 
                        : 'border-gray-200 focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20'
                    }`}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="animate-slide-in" style={{ animationDelay: '300ms' }}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-gold-600 hover:text-gold-700 font-medium hover:underline" target="_blank">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-gold-600 hover:text-gold-700 font-medium hover:underline" target="_blank">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center gap-1 mt-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.acceptTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="animate-slide-in" style={{ animationDelay: '350ms' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  {isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  )}
                  <div className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to={ROUTES.LOGIN} 
                  className="text-gold-600 hover:text-gold-700 font-semibold hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
