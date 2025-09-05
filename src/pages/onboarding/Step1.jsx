import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES, INDUSTRIES } from '../../constants';

import onboardingService from '../../services/onboardingService';
import OnboardingStepper from '../../components/OnboardingStepper';
import ShinyText from '../../components/ShinyText';
import Counter from '../../components/Counter';
import AnimatedRadioButton from '../../components/AnimatedRadioButton';
import AnimatedDropdown from '../../components/AnimatedDropdown';

const OnboardingStep1 = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    subIndustry: '',
    numberOfBranches: 0,
  });
  const [errors, setErrors] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // Animation states for form elements
  const [showElements, setShowElements] = useState({
    logo: false,
    stepper: false,
    companyName: false,
    industry: false,
    subIndustry: false,
    numberOfBranches: false,
    submitButton: false,
    progressIndicator: false
  });
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();

  // Function to get username from signed-in user
  const getUsername = () => {
    if (user && user.name) {
      // Extract first name from full name
      const firstName = user.name.split(' ')[0];
      return firstName;
    }
    return 'there'; // Fallback if no user or name
  };

  // Debug: Log user data to console
  useEffect(() => {
    console.log('Step 1 - User data:', user);
    console.log('Step 1 - Username:', getUsername());
  }, [user]);

  // Get the personalized title
  const getPersonalizedTitle = () => {
    const username = getUsername();
    return `Hi ${username}, what is your business called?`;
  };

  // Get sub-industries for selected industry
  const selectedIndustryData = INDUSTRIES.find(ind => ind.value === formData.industry);
  const subIndustries = selectedIndustryData?.subIndustries || [];

  // Reset animation states and start entrance animations
  useEffect(() => {
    // Reset all animation states
    setIsExiting(false);
    setShowElements({
      logo: false,
      stepper: false,
      companyName: false,
      industry: false,
      subIndustry: false,
      numberOfBranches: false,
      submitButton: false,
      progressIndicator: false
    });

    // Start entrance animations after a brief delay
    const timers = [];
    
    // Elements appear one by one (from right)
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, logo: true })), 100));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, stepper: true })), 200));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, companyName: true })), 300));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, industry: true })), 400));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, subIndustry: true })), 500));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, numberOfBranches: true })), 600));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, submitButton: true })), 700));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, progressIndicator: true })), 800));
    
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

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }

    if (!formData.industry.trim()) {
      newErrors.industry = 'Please select your industry';
    }

    if (formData.industry && subIndustries.length > 0 && !formData.subIndustry.trim()) {
      newErrors.subIndustry = 'Please select your sub-industry';
    }

    if (formData.numberOfBranches < 1) {
      newErrors.numberOfBranches = 'Please select at least 1 branch';
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
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, submitButton: false })), 50));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, numberOfBranches: false })), 100));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, subIndustry: false })), 150));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, industry: false })), 200));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, companyName: false })), 250));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, stepper: false })), 300));
    timers.push(setTimeout(() => setShowElements(prev => ({ ...prev, logo: false })), 350));
    
    // Navigate after animations complete
    timers.push(setTimeout(() => {
      navigate(ROUTES.ONBOARDING.STEP2, { replace: true });
    }, 400));
    
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
      // Save both company info and industry info
      await onboardingService.saveCompanyInfo({ companyName: formData.companyName });
      await onboardingService.saveIndustryInfo({
        industry: formData.industry,
        subIndustry: formData.subIndustry,
        location: formData.location
      });
      
      showToast('success', SUCCESS_MESSAGES.ONBOARDING_SAVED);
      
      // Start exit animations after successful save
      handleNavigateToNextStep();
    } catch (error) {
      showToast('error', 'Failed to save information. Please try again.');
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
          className={`w-full max-w-2xl mx-auto transform transition-all duration-500 ease-out ${
            isFormVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          {/* Logo */}
          <div className={`text-center mb-6 transition-all duration-500 ease-out ${
            showElements.logo 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}>
            <div className="inline-flex items-center justify-center w-32 h-32 mb-4">
              <ShinyText 
                src="https://ik.imagekit.io/corementorid/logo.png?updatedAt=1756895388200"
                alt="Biz365 Logo"
                disabled={false} 
                speed={3} 
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Onboarding Stepper */}
          <div className={`transition-all duration-500 ease-out ${
            showElements.stepper 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}>
            <OnboardingStepper 
              currentStep={1} 
              totalSteps={3} 
              customTitle={getPersonalizedTitle()}
              customDescription="Tell us about your Business and industry"
            />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 border-2 border-black p-6 animate-scale-in hover:shadow-3xl hover:shadow-black/30 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div className={`space-y-2 transition-all duration-500 ease-out ${
                showElements.companyName 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-full opacity-0'
              }`}>
                <label 
                  htmlFor="companyName" 
                  className="text-sm font-bold text-black flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Business Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 text-black placeholder-gray-500 hover:bg-gray-50 hover:border-gray-800"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your Business name"
                  disabled={isLoading}
                />
                {errors.companyName && (
                  <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Industry Selection */}
              <div className={`space-y-4 transition-all duration-500 ease-out ${
                showElements.industry 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-full opacity-0'
              }`}>
                <label className="text-sm font-bold text-black flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Industry *
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Row 1: Food & Beverage, Beauty & Wellness */}
                  <AnimatedRadioButton
                    className={`relative flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 group hover:scale-[1.02] ${
                      formData.industry === 'food-beverage'
                        ? 'border-black bg-black text-white shadow-lg shadow-black/30'
                        : 'border-black bg-white text-black hover:bg-gray-100 hover:border-gray-800'
                    }`}
                    particleCount={12}
                    glowColor="255, 255, 255"
                    enableTilt={true}
                    clickEffect={true}
                    enableMagnetism={true}
                    enableBorderGlow={true}
                    enableParticles={true}
                    spotlightRadius={250}
                  >
                    <label className="w-full h-full flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="industry"
                        value="food-beverage"
                        checked={formData.industry === 'food-beverage'}
                        onChange={(e) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            industry: e.target.value,
                            subIndustry: ''
                          }));
                        }}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                        formData.industry === 'food-beverage'
                          ? 'border-white bg-white'
                          : 'border-black group-hover:border-gray-800'
                      }`}>
                        {formData.industry === 'food-beverage' && (
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          formData.industry === 'food-beverage'
                            ? 'bg-white text-black'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm">Food & Beverage</span>
                      </div>
                    </label>
                  </AnimatedRadioButton>

                  <AnimatedRadioButton
                    className={`relative flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 group hover:scale-[1.02] ${
                      formData.industry === 'beauty-wellness'
                        ? 'border-black bg-black text-white shadow-lg shadow-black/30'
                        : 'border-black bg-white text-black hover:bg-gray-100 hover:border-gray-800'
                    }`}
                    particleCount={12}
                    glowColor="255, 255, 255"
                    enableTilt={true}
                    clickEffect={true}
                    enableMagnetism={true}
                    enableBorderGlow={true}
                    enableParticles={true}
                    spotlightRadius={250}
                  >
                    <label className="w-full h-full flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="industry"
                        value="beauty-wellness"
                        checked={formData.industry === 'beauty-wellness'}
                        onChange={(e) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            industry: e.target.value,
                            subIndustry: ''
                          }));
                        }}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                        formData.industry === 'beauty-wellness'
                          ? 'border-white bg-white'
                          : 'border-black group-hover:border-gray-800'
                      }`}>
                        {formData.industry === 'beauty-wellness' && (
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          formData.industry === 'beauty-wellness'
                            ? 'bg-white text-black'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm">Beauty & Wellness</span>
                      </div>
                    </label>
                  </AnimatedRadioButton>

                  {/* Row 2: Retail, Service Industry */}
                  <AnimatedRadioButton
                    className={`relative flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 group hover:scale-[1.02] ${
                      formData.industry === 'retail'
                        ? 'border-black bg-black text-white shadow-lg shadow-black/30'
                        : 'border-black bg-white text-black hover:bg-gray-100 hover:border-gray-800'
                    }`}
                    particleCount={12}
                    glowColor="255, 255, 255"
                    enableTilt={true}
                    clickEffect={true}
                    enableMagnetism={true}
                    enableBorderGlow={true}
                    enableParticles={true}
                    spotlightRadius={250}
                  >
                    <label className="w-full h-full flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="industry"
                        value="retail"
                        checked={formData.industry === 'retail'}
                        onChange={(e) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            industry: e.target.value,
                            subIndustry: ''
                          }));
                        }}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                        formData.industry === 'retail'
                          ? 'border-white bg-white'
                          : 'border-black group-hover:border-gray-800'
                      }`}>
                        {formData.industry === 'retail' && (
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          formData.industry === 'retail'
                            ? 'bg-white text-black'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm">Retail</span>
                      </div>
                    </label>
                  </AnimatedRadioButton>

                  <AnimatedRadioButton
                    className={`relative flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 group hover:scale-[1.02] ${
                      formData.industry === 'service-industry'
                        ? 'border-black bg-black text-white shadow-lg shadow-black/30'
                        : 'border-black bg-white text-black hover:bg-gray-100 hover:border-gray-800'
                    }`}
                    particleCount={12}
                    glowColor="255, 255, 255"
                    enableTilt={true}
                    clickEffect={true}
                    enableMagnetism={true}
                    enableBorderGlow={true}
                    enableParticles={true}
                    spotlightRadius={250}
                  >
                    <label className="w-full h-full flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="industry"
                        value="service-industry"
                        checked={formData.industry === 'service-industry'}
                        onChange={(e) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            industry: e.target.value,
                            subIndustry: ''
                          }));
                        }}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                        formData.industry === 'service-industry'
                          ? 'border-white bg-white'
                          : 'border-black group-hover:border-gray-800'
                      }`}>
                        {formData.industry === 'service-industry' && (
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          formData.industry === 'service-industry'
                            ? 'bg-white text-black'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm">Service Industry</span>
                      </div>
                    </label>
                  </AnimatedRadioButton>

                  {/* Row 3: Other (spans 2 columns) */}
                  <AnimatedRadioButton
                    className={`relative flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 group hover:scale-[1.02] col-span-2 ${
                      formData.industry === 'other'
                        ? 'border-black bg-black text-white shadow-lg shadow-black/30'
                        : 'border-black bg-white text-black hover:bg-gray-100 hover:border-gray-800'
                    }`}
                    particleCount={16}
                    glowColor="255, 255, 255"
                    enableTilt={true}
                    clickEffect={true}
                    enableMagnetism={true}
                    enableBorderGlow={true}
                    enableParticles={true}
                    spotlightRadius={300}
                  >
                    <label className="w-full h-full flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="industry"
                        value="other"
                        checked={formData.industry === 'other'}
                        onChange={(e) => {
                          setFormData(prev => ({ 
                            ...prev, 
                            industry: e.target.value,
                            subIndustry: ''
                          }));
                        }}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-200 ${
                        formData.industry === 'other'
                          ? 'border-white bg-white'
                          : 'border-black group-hover:border-gray-800'
                      }`}>
                        {formData.industry === 'other' && (
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          formData.industry === 'other'
                            ? 'bg-white text-black'
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm">Other</span>
                      </div>
                    </label>
                  </AnimatedRadioButton>
                </div>
                
                {errors.industry && (
                  <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.industry}
                  </p>
                )}
              </div>

              {/* Sub-Industry Selection - Shows only when industry is selected */}
              {formData.industry && subIndustries.length > 0 && (
                <div className={`space-y-2 transition-all duration-500 ease-out ${
                  showElements.subIndustry 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-full opacity-0'
                }`}>
                  <label 
                    htmlFor="subIndustry" 
                    className="text-sm font-bold text-black flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Sub-Industry *
                  </label>
                  
                  {/* Show dropdown for industries with predefined sub-industries */}
                  {formData.industry !== 'other' && (
                    <AnimatedDropdown
                      options={subIndustries}
                      value={formData.subIndustry}
                      onChange={(e) => setFormData(prev => ({ ...prev, subIndustry: e.target.value }))}
                      placeholder="Select sub-industry"
                      disabled={isLoading}
                      showGradients={true}
                      enableArrowNavigation={true}
                      displayScrollbar={false}
                      dropdownDirection="up"
                    />
                  )}
                  
                  {/* Show text input for "Other" industry */}
                  {formData.industry === 'other' && (
                    <input
                      type="text"
                      id="subIndustry"
                      name="subIndustry"
                      placeholder="Please specify your industry"
                      className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black/20 transition-all duration-300 text-black hover:bg-gray-50 hover:border-gray-800 placeholder-gray-500"
                      value={formData.subIndustry}
                      onChange={(e) => setFormData(prev => ({ ...prev, subIndustry: e.target.value }))}
                      disabled={isLoading}
                    />
                  )}
                  
                  {errors.subIndustry && (
                    <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.subIndustry}
                    </p>
                  )}
                </div>
              )}

              {/* Number of Branches Field */}
              <div className={`space-y-2 transition-all duration-500 ease-out ${
                showElements.numberOfBranches 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-full opacity-0'
              }`}>
                <label 
                  htmlFor="numberOfBranches" 
                  className="text-sm font-bold text-black flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Number of Branches *
                </label>
                <div className="w-full px-4 py-2 bg-white border-2 border-black rounded-xl focus-within:ring-4 focus-within:ring-black/20 transition-all duration-300 hover:bg-gray-50 hover:border-gray-800 flex items-center justify-center">
                  <Counter  
                    value={formData.numberOfBranches}
                    fontSize={32}
                    textColor="black"
                    fontWeight={700}
                    onIncrement={() => {
                      if (formData.numberOfBranches < 999) {
                        setFormData(prev => ({ ...prev, numberOfBranches: prev.numberOfBranches + 1 }));
                      }
                    }}
                    onDecrement={() => {
                      if (formData.numberOfBranches > 0) {
                        setFormData(prev => ({ ...prev, numberOfBranches: prev.numberOfBranches - 1 }));
                      }
                    }}
                    min={0}
                    max={999}
                  />
                </div>
                {errors.numberOfBranches && (
                  <p className="text-red-600 text-sm animate-fade-in flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.numberOfBranches}
                  </p>
                )}
              </div>

              {/* Industry Description */}
              

              {/* Submit Button */}
              <div className={`transition-all duration-500 ease-out ${
                showElements.submitButton 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-full opacity-0'
              }`}>
                <button
                  type="submit"
                  disabled={isLoading || isExiting}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
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
                        Continue to Business Details
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
          <div className={`text-center mt-6 transition-all duration-500 ease-out ${
            showElements.progressIndicator 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-full opacity-0'
          }`}>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Step 1 of 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1; 