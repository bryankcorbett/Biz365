import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, POS_USAGE_OPTIONS } from '../../constants';

import onboardingService from '../../services/onboardingService';
import OnboardingStepper from '../../components/OnboardingStepper';

const OnboardingStep4 = () => {
  const [formData, setFormData] = useState({
    posUsage: '',
    currentSoftware: '',
    specificNeeds: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Check if user wants to use current software or Biz365
  const showSoftwareField = formData.posUsage === 'already-using';
  const showNeedsField = formData.posUsage === 'want-biz365';

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

    if (!formData.posUsage.trim()) {
      newErrors.posUsage = 'Please select your POS/billing situation';
    }

    if (showSoftwareField && !formData.currentSoftware.trim()) {
      newErrors.currentSoftware = 'Please specify which software you are currently using';
    } else if (showSoftwareField && formData.currentSoftware.trim().length < 2) {
      newErrors.currentSoftware = 'Software name must be at least 2 characters';
    }

    // Note: specificNeeds is optional even when shown

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await onboardingService.savePOSInfo(formData);
      
      showToast('success', SUCCESS_MESSAGES.ONBOARDING_SAVED);
      
      // Navigate to final step
      setTimeout(() => {
        navigate(ROUTES.ONBOARDING.STEP5, { replace: true });
      }, 1000);
    } catch (error) {
      showToast('error', 'Failed to save POS information. Please try again.');
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
          <OnboardingStepper currentStep={4} totalSteps={5} />

          

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* POS Usage Selection */}
              <div className="space-y-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <label className="text-sm font-semibold text-gray-200 flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  What's your current POS/billing situation? *
                </label>
                
                <div className="grid gap-3">
                  {POS_USAGE_OPTIONS.map((option, index) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${
                        formData.posUsage === option.value
                          ? 'border-amber-400 bg-amber-50 shadow-sm'
                          : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="posUsage"
                        value={option.value}
                        checked={formData.posUsage === option.value}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          posUsage: e.target.value,
                          currentSoftware: '', // Reset when changing
                          specificNeeds: ''    // Reset when changing
                        }))}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                        formData.posUsage === option.value
                          ? 'border-amber-500 bg-amber-500'
                          : 'border-gray-300 group-hover:border-amber-400'
                      }`}>
                        {formData.posUsage === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            formData.posUsage === option.value
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-amber-50 group-hover:text-amber-600'
                          }`}>
                            {option.value === 'already-using' && (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {option.value === 'want-biz365' && (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            )}
                            {option.value === 'not-sure' && (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          <span className="font-medium text-gray-800">{option.label}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Current Software Field - Shows when "already-using" is selected */}
              {showSoftwareField && (
                <div className="space-y-2 animate-fade-in">
                  <label 
                    htmlFor="currentSoftware" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Which software are you currently using? *
                  </label>
                  <input
                    type="text"
                    id="currentSoftware"
                    name="currentSoftware"
                                         className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                    value={formData.currentSoftware}
                    onChange={handleInputChange}
                    placeholder="e.g., Square, Toast, Shopify POS, or custom software"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    This helps us understand how to integrate with your existing setup
                  </p>
                </div>
              )}

              {/* Specific Needs Field - Shows when "want-biz365" is selected */}
              {showNeedsField && (
                <div className="space-y-2 animate-fade-in">
                  <label 
                    htmlFor="specificNeeds" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    What specific features do you need most?
                  </label>
                  <textarea
                    id="specificNeeds"
                    name="specificNeeds"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 resize-none text-gray-800 placeholder-gray-500"
                    value={formData.specificNeeds}
                    onChange={handleInputChange}
                    placeholder="e.g., inventory management, customer loyalty, GST billing, multi-location support, offline mode..."
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Tell us about your specific requirements so we can tailor Biz365 to your needs
                  </p>
                </div>
              )}

              {/* Info Card Based on Selection */}
              {formData.posUsage && (
                <div className="animate-fade-in bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {formData.posUsage === 'already-using' && 'Integration Support'}
                        {formData.posUsage === 'want-biz365' && 'Biz365 POS Features'}
                        {formData.posUsage === 'not-sure' && 'We\'ll Help You Decide'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formData.posUsage === 'already-using' && 'We offer seamless integration with most popular POS systems. Our team will help you migrate your data and set up smooth workflows.'}
                        {formData.posUsage === 'want-biz365' && 'Biz365 POS includes inventory management, GST billing, customer management, analytics, offline mode, and multi-device sync. Perfect for modern businesses.'}
                        {formData.posUsage === 'not-sure' && 'No worries! Our experts will analyze your business needs and recommend the best solution. We offer free consultation to help you choose.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

                             {/* Back and Submit Buttons */}
               <div className="flex gap-4 animate-slide-in" style={{ animationDelay: '300ms' }}>
                 {/* Back Button */}
                 <button
                   type="button"
                   onClick={() => navigate(ROUTES.ONBOARDING.STEP3, { replace: true })}
                                       className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                 >
                   <div className="relative flex items-center justify-center gap-2">
                     <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                     Back
                   </div>
                 </button>
                 
                 {/* Submit Button */}
                 <button
                   type="submit"
                   disabled={isLoading || !formData.posUsage}
                                       className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
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
                        Continue to Final Step
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
              <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Step 4 of 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep4;
