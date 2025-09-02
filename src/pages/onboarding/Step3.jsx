import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, COUNTRIES, INDIAN_STATES } from '../../constants';

import onboardingService from '../../services/onboardingService';
import OnboardingStepper from '../../components/OnboardingStepper';

const OnboardingStep3 = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    country: 'IN', // Default to India
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Check if India is selected for state dropdown
  const isIndiaSelected = formData.country === 'IN';

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

    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City name must be at least 2 characters';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State/Province is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = isIndiaSelected ? 'Pincode is required' : 'Postal code is required';
    } else if (isIndiaSelected && !/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    } else if (!isIndiaSelected && formData.pincode.length < 3) {
      newErrors.pincode = 'Please enter a valid postal code';
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
      await onboardingService.saveBusinessAddress(formData);
      
      showToast('success', SUCCESS_MESSAGES.ONBOARDING_SAVED);
      
      // Navigate to next step
      setTimeout(() => {
        navigate(ROUTES.ONBOARDING.STEP4, { replace: true });
      }, 1000);
    } catch (error) {
      showToast('error', 'Failed to save address information. Please try again.');
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
          <OnboardingStepper currentStep={3} totalSteps={5} />

          

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Field */}
              <div className="space-y-2 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <label 
                  htmlFor="address" 
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Street Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 resize-none text-gray-800 placeholder-gray-500"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your business address"
                  disabled={isLoading}
                />
              </div>

              {/* City and Country Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in" style={{ animationDelay: '150ms' }}>
                {/* City */}
                <div className="space-y-2">
                  <label 
                    htmlFor="city" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    City *
                  </label>
                                      <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city name"
                      disabled={isLoading}
                    />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label 
                    htmlFor="country" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Country *
                  </label>
                                      <select
                      id="country"
                      name="country"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        country: e.target.value,
                        state: '' // Reset state when country changes
                      }))}
                      disabled={isLoading}
                    >
                    {COUNTRIES.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* State and Pincode Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-in" style={{ animationDelay: '200ms' }}>
                {/* State */}
                <div className="space-y-2">
                  <label 
                    htmlFor="state" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    State/Province *
                  </label>
                  {isIndiaSelected ? (
                    <select
                      id="state"
                      name="state"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      disabled={isLoading}
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state/province"
                      disabled={isLoading}
                    />
                  )}
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                  <label 
                    htmlFor="pincode" 
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l-4 4" />
                    </svg>
                    {isIndiaSelected ? 'Pincode' : 'Postal Code'} *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 text-gray-800 placeholder-gray-500"
                    value={formData.pincode}
                    onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder={isIndiaSelected ? "Enter pincode" : "Enter postal code"}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Location Info Card */}
              {formData.country && (
                <div className="animate-fade-in bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Address Information</h4>
                      <p className="text-sm text-gray-600">
                        {formData.country === 'IN' 
                          ? 'We support GST compliance and local regulations for Indian businesses.'
                          : 'International address detected. We support businesses worldwide with localized features.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

                             {/* Back and Submit Buttons */}
               <div className="flex gap-4 animate-slide-in" style={{ animationDelay: '250ms' }}>
                 {/* Back Button */}
                 <button
                   type="button"
                   onClick={() => navigate(ROUTES.ONBOARDING.STEP2, { replace: true })}
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
                   disabled={isLoading}
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
                        Continue to POS Setup
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
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Step 3 of 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
