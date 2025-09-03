import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, COUNTRIES, INDIAN_STATES } from '../../constants';

import onboardingService from '../../services/onboardingService';
import OnboardingStepper from '../../components/OnboardingStepper';
import ShinyText from '../../components/ShinyText';

const OnboardingStep2 = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    country: 'IN', // Default to India
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // Animation states for form elements
  const [showElements, setShowElements] = useState({
    logo: false,
    stepper: false,
    address: false,
    city: false,
    state: false,
    country: false,
    pincode: false,
    submitButton: false,
    progressIndicator: false
  });
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Check if India is selected for state dropdown
  const isIndiaSelected = formData.country === 'IN';

  // Reset animation states and start entrance animations
  useEffect(() => {
    // Reset all animation states
    setIsExiting(false);
    setShowElements({
      logo: false,
      stepper: false,
      address: false,
      city: false,
      state: false,
      country: false,
      pincode: false,
      submitButton: false,
      progressIndicator: false
    });

    // Start entrance animations after a brief delay
    const timers = [];
    
    // Elements appear one by one (from right)
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, logo: true })), 200));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, stepper: true })), 400));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, address: true })), 600));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, city: true })), 800));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, state: true })), 1000));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, country: true })), 1200));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, pincode: true })), 1400));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, submitButton: true })), 1600));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, progressIndicator: true })), 1800));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
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

  // Handle exit animations when navigating to next step
  const handleNavigateToNextStep = () => {
    if (isExiting) return; // Prevent multiple clicks during animation
    
    setIsExiting(true);
    
    // Exit animations in reverse order
    const timers = [];
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, progressIndicator: false })), 0));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, submitButton: false })), 200));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, pincode: false })), 400));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, country: false })), 600));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, state: false })), 800));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, city: false })), 1000));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, address: false })), 1200));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, stepper: false })), 1400));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, logo: false })), 1600));
    
    // Navigate after animations complete
    timers.push(setTimeout(() => {
      navigate(ROUTES.ONBOARDING.STEP3, { replace: true });
    }, 1800));
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
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
      
      // Start exit animations after successful save
      handleNavigateToNextStep();
    } catch (error) {
      showToast('error', 'Failed to save address information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
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
          <div className={`text-center mb-6 transition-all duration-1000 ease-out ${
            showElements.logo 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}>
            <div className="inline-flex items-center justify-center w-32 h-32 mb-4">
              <ShinyText 
                src="../../public/logo.png"
                alt="Biz365 Logo"
                disabled={false} 
                speed={3} 
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Onboarding Stepper */}
          <div className={`transition-all duration-1000 ease-out ${
            showElements.stepper 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}>
            <OnboardingStepper currentStep={2} totalSteps={3} />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 border-2 border-black p-6 animate-scale-in hover:shadow-3xl hover:shadow-black/30 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Field */}
              <div className={`space-y-2 transition-all duration-1000 ease-out ${
                showElements.address 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-full opacity-0'
              }`}>
                <label 
                  htmlFor="address" 
                  className="text-sm font-bold text-black flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Street Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 resize-none text-black placeholder-gray-500 hover:bg-gray-50 hover:border-gray-800"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your business address"
                  disabled={isLoading}
                />
                {errors.address && (
                  <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.address}
                  </p>
                )}
              </div>

              {/* City and Country Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div className={`space-y-2 transition-all duration-1000 ease-out ${
                  showElements.city 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <label 
                    htmlFor="city" 
                    className="text-sm font-bold text-black flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 text-black placeholder-gray-500 hover:bg-gray-50 hover:border-gray-800"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Enter city name"
                    disabled={isLoading}
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div className={`space-y-2 transition-all duration-1000 ease-out ${
                  showElements.country 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <label 
                    htmlFor="country" 
                    className="text-sm font-bold text-black flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 text-black hover:bg-gray-50 hover:border-gray-800"
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
                  {errors.country && (
                    <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              {/* State and Pincode Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* State */}
                <div className={`space-y-2 transition-all duration-1000 ease-out ${
                  showElements.state 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <label 
                    htmlFor="state" 
                    className="text-sm font-bold text-black flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    State/Province *
                  </label>
                  {isIndiaSelected ? (
                    <select
                      id="state"
                      name="state"
                      className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 text-black hover:bg-gray-50 hover:border-gray-800"
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
                      className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 text-black placeholder-gray-500 hover:bg-gray-50 hover:border-gray-800"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state/province"
                      disabled={isLoading}
                    />
                  )}
                  {errors.state && (
                    <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div className={`space-y-2 transition-all duration-1000 ease-out ${
                  showElements.pincode 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <label 
                    htmlFor="pincode" 
                    className="text-sm font-bold text-black flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l-4 4" />
                    </svg>
                    {isIndiaSelected ? 'Pincode' : 'Postal Code'} *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 text-black placeholder-gray-500 hover:bg-gray-50 hover:border-gray-800"
                    value={formData.pincode}
                    onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                    placeholder={isIndiaSelected ? "Enter pincode" : "Enter postal code"}
                    disabled={isLoading}
                  />
                  {errors.pincode && (
                    <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

             

              {/* Back and Submit Buttons */}
              <div className={`flex gap-4 transition-all duration-1000 ease-out ${
                showElements.submitButton 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-full opacity-0'
              }`}>
                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.ONBOARDING.STEP1, { replace: true })}
                  className="flex-1 bg-white hover:bg-gray-100 text-black font-bold py-4 px-6 rounded-xl border-2 border-black hover:border-gray-800 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
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
                  disabled={isLoading || isExiting}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  {isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black">
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
                        Continue to Business Goals
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
          <div className={`text-center mt-6 transition-all duration-1000 ease-out ${
            showElements.progressIndicator 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Step 2 of 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;