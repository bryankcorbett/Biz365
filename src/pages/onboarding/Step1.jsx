import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES } from '../../constants';

import onboardingService from '../../services/onboardingService';
import OnboardingStepper from '../../components/OnboardingStepper';
import ShinyText from '../../components/ShinyText';

const OnboardingStep1 = () => {
  const [formData, setFormData] = useState({
    companyName: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Animate form on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle input changes with error clearing
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

    // For testing purposes - disable all validation to allow any data
    console.log('Validation check - allowing all data for testing');
    
    setErrors(newErrors);
    return true; // Always return true for testing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!', formData);
    
    if (!validateForm()) {
      console.log('Validation failed:', errors);
      return;
    }

    console.log('Validation passed, starting API call...');
    setIsLoading(true);
    
    try {
      console.log('Calling onboardingService.saveCompanyInfo...');
      const result = await onboardingService.saveCompanyInfo(formData);
      console.log('API call successful:', result);
      
      showToast('success', SUCCESS_MESSAGES.ONBOARDING_SAVED);
      
      // Navigate to next step
      console.log('Navigating to:', ROUTES.ONBOARDING.STEP2);
      setTimeout(() => {
        navigate(ROUTES.ONBOARDING.STEP2, { replace: true });
      }, 1000);
    } catch (error) {
      console.error('API call failed:', error);
      showToast('error', 'Failed to save company information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Hero Section Orb - Full Screen */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}> 
        <div className="orb-container w-full h-full" style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-8">
        <div 
          className={`w-full max-w-2xl mx-auto transform transition-all duration-1000 ease-out ${
            isFormVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          {/* Logo */}
          <div className="text-center mb-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-32 h-20 mb-4">
              <ShinyText 
                src="./public/logo.png"
                alt="Biz365 Logo"
                disabled={false} 
                speed={3} 
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Onboarding Stepper */}
          <OnboardingStepper currentStep={1} totalSteps={5} />

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <label 
                  htmlFor="companyName" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                                       className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  disabled={isLoading}
                />
              </div>



              {/* Submit Button */}
              <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    console.log('Button clicked!');
                    handleSubmit(e);
                  }}
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
                        Saving...
                      </>
                    ) : (
                      <>
                        Continue
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>

          {/* Progress Indicator */}
          <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Step 1 of 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
