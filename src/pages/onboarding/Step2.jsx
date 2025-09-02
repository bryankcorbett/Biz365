import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, INDUSTRIES } from '../../constants';

import onboardingService from '../../services/onboardingService';
import OnboardingStepper from '../../components/OnboardingStepper';
import ShinyText from '../../components/ShinyText';

const OnboardingStep2 = () => {
  const [formData, setFormData] = useState({
    industry: '',
    subIndustry: '',
    location: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Get sub-industries for selected industry
  const selectedIndustryData = INDUSTRIES.find(ind => ind.value === formData.industry);
  const subIndustries = selectedIndustryData?.subIndustries || [];

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

    if (!formData.industry.trim()) {
      newErrors.industry = 'Please select your industry';
    }

    if (formData.industry && subIndustries.length > 0 && !formData.subIndustry.trim()) {
      newErrors.subIndustry = 'Please select your sub-industry';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please enter your branch location';
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

    setIsLoading(true);
    
    try {
      await onboardingService.saveIndustryInfo(formData);
      
      showToast('success', SUCCESS_MESSAGES.ONBOARDING_SAVED);
      
      // Navigate to next step
      setTimeout(() => {
        navigate(ROUTES.ONBOARDING.STEP3, { replace: true });
      }, 1000);
    } catch (error) {
      showToast('error', 'Failed to save industry information. Please try again.');
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
          <OnboardingStepper currentStep={2} totalSteps={5} />

          

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Industry Selection */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <label 
                  htmlFor="industry" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                                       className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800"
                  value={formData.industry}
                  onChange={(e) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      industry: e.target.value,
                      subIndustry: '' // Reset sub-industry when industry changes
                    }));
                  }}
                  disabled={isLoading}
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Industry Selection - Shows only when industry is selected */}
              {formData.industry && subIndustries.length > 0 && (
                <div className="space-y-2 animate-fade-in">
                  <label 
                    htmlFor="subIndustry" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Sub-Industry *
                  </label>
                  <select
                    id="subIndustry"
                    name="subIndustry"
                                         className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800"
                    value={formData.subIndustry}
                    onChange={(e) => setFormData(prev => ({ ...prev, subIndustry: e.target.value }))}
                    disabled={isLoading}
                  >
                    <option value="">Select sub-industry</option>
                    {subIndustries.map((subIndustry) => (
                      <option key={subIndustry.value} value={subIndustry.value}>
                        {subIndustry.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Location Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '200ms' }}>
                <label 
                  htmlFor="location" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Branch Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className={`w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500 ${
                    errors.location 
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-900/20' 
                      : 'border-gray-600 focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20'
                  }`}
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your branch location (e.g., Mumbai, Maharashtra)"
                  disabled={isLoading}
                />
                {errors.location && (
                  <p className="text-sm text-red-600 animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Industry Description */}
              {selectedIndustryData && (
                <div className="animate-fade-in bg-amber-50 border border-amber-200 rounded-xl p-4" style={{ animationDelay: '250ms' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{selectedIndustryData.label}</h4>
                      <p className="text-sm text-gray-600">
                        {selectedIndustryData.value === 'retail' && 'Perfect for businesses selling products directly to consumers, from fashion stores to electronics shops.'}
                        {selectedIndustryData.value === 'restaurant' && 'Ideal for food service businesses, from fine dining restaurants to casual cafes and food trucks.'}
                        {selectedIndustryData.value === 'healthcare' && 'Designed for medical practices, clinics, pharmacies, and wellness centers.'}
                        {selectedIndustryData.value === 'services' && 'Great for professional service providers like consultants, lawyers, and real estate agents.'}
                        {selectedIndustryData.value === 'manufacturing' && 'Built for manufacturing businesses across various industries from textiles to electronics.'}
                        {selectedIndustryData.value === 'other' && 'We support businesses across all industries. Let us know more about your specific needs.'}
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
                   onClick={() => navigate(ROUTES.ONBOARDING.STEP1, { replace: true })}
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
                   disabled={isLoading || !formData.industry || (subIndustries.length > 0 && !formData.subIndustry) || !formData.location}
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
                        Continue to Address
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
          <div className="text-center mt-4 animate-fade-in" style={{ animationDelay: '350ms' }}>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Step 2 of 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
