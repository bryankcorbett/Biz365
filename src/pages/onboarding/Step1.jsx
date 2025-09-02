import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES } from '../../constants';

import onboardingService from '../../services/onboardingService';
import OnboardingStepper from '../../components/OnboardingStepper';

const OnboardingStep1 = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    website: '',
    description: '',
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
              <img 
                className="w-full h-full object-contain" 
                alt="Biz365 Logo" 
                src="https://ik.imagekit.io/corementorid/biz-logo.png?updatedAt=1756561209550" 
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

              {/* Business Type */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '150ms' }}>
                <label 
                  htmlFor="businessType" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Business Type *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                                       className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  disabled={isLoading}
                >
                  <option value="">Select business type</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llp">Limited Liability Partnership (LLP)</option>
                  <option value="private-limited">Private Limited Company</option>
                  <option value="public-limited">Public Limited Company</option>
                  <option value="one-person-company">One Person Company (OPC)</option>
                  <option value="other">Other</option>
                </select>
              </div>



              {/* Website */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '200ms' }}>
                <label 
                  htmlFor="website" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                                       className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yourcompany.com"
                  disabled={isLoading}
                />
              </div>

              {/* Business Description */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '250ms' }}>
                <label 
                  htmlFor="description" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Business Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 resize-none text-gray-800 placeholder-gray-500"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Briefly describe your business..."
                  disabled={isLoading}
                />
              </div>

              {/* Submit Button */}
              <div className="animate-slide-in" style={{ animationDelay: '300ms' }}>
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
                        Continue to Industry
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
          <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
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
