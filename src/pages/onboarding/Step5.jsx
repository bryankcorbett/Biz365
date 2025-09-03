import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../components/ToastProvider';
import { ROUTES, SUCCESS_MESSAGES } from '../../constants';

import onboardingService from '../../services/onboardingService';
import TargetCursor from '../../components/TargetCursor';
import OnboardingStepper from '../../components/OnboardingStepper';
import ShinyText from '../../components/ShinyText';

const Step5 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    businessAims: [],
    otherAim: ''
  });

  // Business aims options
  const businessAimsOptions = [
    {
      id: 'increase-sales',
      label: 'Increase Sales & Revenue',
      description: 'Boost your business growth and profitability',
      icon: '📈'
    },
    {
      id: 'improve-efficiency',
      label: 'Improve Operational Efficiency',
      description: 'Streamline processes and reduce manual work',
      icon: '⚡'
    },
    {
      id: 'better-customer-service',
      label: 'Enhance Customer Experience',
      description: 'Provide better service and build customer loyalty',
      icon: '😊'
    },
    {
      id: 'inventory-management',
      label: 'Better Inventory Control',
      description: 'Track stock levels and prevent stockouts',
      icon: '📦'
    },
    {
      id: 'financial-tracking',
      label: 'Improve Financial Tracking',
      description: 'Better insights into profits, expenses, and cash flow',
      icon: '💰'
    },
    {
      id: 'multi-location',
      label: 'Manage Multiple Locations',
      description: 'Centralized control across all your business locations',
      icon: '🏢'
    },
    {
      id: 'compliance',
      label: 'Ensure GST Compliance',
      description: 'Stay compliant with tax regulations and reporting',
      icon: '📋'
    },
    {
      id: 'data-insights',
      label: 'Get Business Insights',
      description: 'Make data-driven decisions with analytics',
      icon: '📊'
    }
  ];

  // Animate form on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle aim selection
  const handleAimToggle = (aimId) => {
    // If already selected, just remove it
    if (formData.businessAims.includes(aimId)) {
      setFormData(prev => ({
        ...prev,
        businessAims: prev.businessAims.filter(id => id !== aimId)
      }));
    } else {
      // If selecting new aim, add glass breaking animation
      setFormData(prev => ({
        ...prev,
        businessAims: [...prev.businessAims, aimId]
      }));
      
      // Trigger glass breaking animation
      triggerGlassBreakingAnimation(aimId);
    }
    
    // Clear errors when user makes selection
    if (errors.businessAims) {
      setErrors(prev => ({ ...prev, businessAims: '' }));
    }
  };

  // Bullet hole animation function
  const triggerGlassBreakingAnimation = (aimId) => {
    const aimElement = document.querySelector(`[data-aim-id="${aimId}"]`);
    if (!aimElement) return;
    
    const rect = aimElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create central impact hole
    const impactHole = document.createElement('div');
    impactHole.style.cssText = `
      position: fixed;
      left: ${centerX - 20}px;
      top: ${centerY - 20}px;
      width: 40px;
      height: 40px;
      background: radial-gradient(circle, 
        rgba(0, 0, 0, 0.8) 0%, 
        rgba(0, 0, 0, 0.6) 30%, 
        rgba(0, 0, 0, 0.3) 60%, 
        transparent 100%
      );
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(impactHole);
    
    // Animate the impact hole
    let holeOpacity = 1;
    
    const animateHole = () => {
      if (holeOpacity <= 0) {
        impactHole.remove();
        return;
      }
      
      holeOpacity -= 0.02;
      impactHole.style.opacity = holeOpacity;
      
      requestAnimationFrame(animateHole);
    };
    
    requestAnimationFrame(animateHole);
    
    // Create subtle bullet impact flash
    const bulletFlash = document.createElement('div');
    bulletFlash.style.cssText = `
      position: fixed;
      left: ${centerX - 15}px;
      top: ${centerY - 15}px;
      width: 30px;
      height: 30px;
      background: radial-gradient(circle, 
        rgba(255, 215, 0, 0.8) 0%, 
        rgba(255, 215, 0, 0.4) 50%, 
        transparent 100%
      );
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
    `;
    
    document.body.appendChild(bulletFlash);
    
    // Animate bullet flash
    let flashScale = 0;
    let flashOpacity = 1;
    
    const animateFlash = () => {
      if (flashOpacity <= 0) {
        bulletFlash.remove();
        return;
      }
      
      flashScale += 0.2;
      flashOpacity -= 0.1;
      
      bulletFlash.style.transform = `scale(${flashScale})`;
      bulletFlash.style.opacity = flashOpacity;
      
      requestAnimationFrame(animateFlash);
    };
    
    requestAnimationFrame(animateFlash);
    
    // Realistic glass breaking sound effect
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Glass crack sound (high frequency)
      const crackOscillator = audioContext.createOscillator();
      const crackGain = audioContext.createGain();
      crackOscillator.connect(crackGain);
      crackGain.connect(audioContext.destination);
      
      crackOscillator.frequency.setValueAtTime(2000, audioContext.currentTime);
      crackOscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
      crackGain.gain.setValueAtTime(0.06, audioContext.currentTime);
      crackGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      // Glass shatter sound (mid frequency)
      const shatterOscillator = audioContext.createOscillator();
      const shatterGain = audioContext.createGain();
      shatterOscillator.connect(shatterGain);
      shatterGain.connect(audioContext.destination);
      
      shatterOscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
      shatterOscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.3);
      shatterGain.gain.setValueAtTime(0.04, audioContext.currentTime);
      shatterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      // Impact thud (low frequency)
      const thudOscillator = audioContext.createOscillator();
      const thudGain = audioContext.createGain();
      thudOscillator.connect(thudGain);
      thudGain.connect(audioContext.destination);
      
      thudOscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      thudOscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
      thudGain.gain.setValueAtTime(0.03, audioContext.currentTime);
      thudGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      crackOscillator.start(audioContext.currentTime);
      crackOscillator.stop(audioContext.currentTime + 0.1);
      shatterOscillator.start(audioContext.currentTime);
      shatterOscillator.stop(audioContext.currentTime + 0.3);
      thudOscillator.start(audioContext.currentTime);
      thudOscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      // Fallback for browsers that don't support AudioContext
    }
    
    // Add subtle screen shake effect for realism
    const screenShake = () => {
      const body = document.body;
      const originalTransform = body.style.transform;
      
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const shakeX = (Math.random() - 0.5) * 2;
          const shakeY = (Math.random() - 0.5) * 2;
          body.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
        }, i * 15);
      }
      
      setTimeout(() => {
        body.style.transform = originalTransform;
      }, 90);
    };
    
    screenShake();
  };

  // Handle input changes
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

    if (formData.businessAims.length === 0) {
      newErrors.businessAims = 'Please select at least one business aim';
    }

    if (formData.businessAims.includes('other') && !formData.otherAim.trim()) {
      newErrors.otherAim = 'Please specify your other business aim';
    } else if (formData.businessAims.includes('other') && formData.otherAim.trim().length < 3) {
      newErrors.otherAim = 'Please provide a more detailed description (at least 3 characters)';
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
      await onboardingService.saveBusinessAims(formData);
      await onboardingService.completeOnboarding();
      
      showToast('success', '🎉 Onboarding completed successfully! Welcome to Biz365!');
      
      // Redirect to external dashboard
      setTimeout(() => {
        window.location.href = ROUTES.DASHBOARD;
      }, 1500);
    } catch (error) {
      showToast('error', 'Failed to complete onboarding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Custom Target Cursor for Step 5 */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        targetSelector=".cursor-target"
      />
      
      {/* Bullet hole animation styles */}
      <style jsx>{`
        @keyframes bulletFlash {
          0% { opacity: 1; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2); }
        }
        
        .bullet-impact {
          animation: bulletFlash 0.3s ease-out forwards;
        }
      `}</style>
      {/* Hero Section Orb - Full Screen */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}> 
        <div className="orb-container w-full h-full" style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-8">
        <div className="w-full max-w-4xl mx-auto">
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
          <OnboardingStepper currentStep={5} totalSteps={5} />

          

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-5 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Aims Selection */}
              <div className="space-y-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  What are your main business objectives? (Select all that apply)
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessAimsOptions.map((aim, index) => (
                                         <div
                       key={aim.id}
                       data-aim-id={aim.id}
                       className={`relative cursor-pointer transition-all duration-300 animate-fade-in cursor-target`}
                       style={{ animationDelay: `${150 + index * 50}ms` }}
                       onClick={() => handleAimToggle(aim.id)}
                     >
                                             <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                         formData.businessAims.includes(aim.id)
                           ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-200/50 relative overflow-hidden'
                           : 'border-gray-200 bg-gray-50 hover:border-amber-300 hover:bg-amber-50/50'
                       }`}>
                         {/* Bullet hole effect when selected */}
                         {formData.businessAims.includes(aim.id) && (
                           <div className="absolute top-2 right-2 w-3 h-3 bg-gray-800 rounded-full border-2 border-amber-400 shadow-inner">
                             <div className="w-1 h-1 bg-amber-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                           </div>
                         )}
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                            formData.businessAims.includes(aim.id)
                              ? 'border-amber-500 bg-amber-500'
                              : 'border-gray-300'
                          }`}>
                            {formData.businessAims.includes(aim.id) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{aim.icon}</span>
                              <h3 className="font-semibold text-gray-800">{aim.label}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{aim.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {errors.businessAims && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.businessAims}
                  </p>
                )}
              </div>

              {/* Other Aim Input */}
              {formData.businessAims.includes('other') && (
                <div className="space-y-2 animate-slide-in" style={{ animationDelay: '200ms' }}>
                                     <label htmlFor="otherAim" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Please specify your other business aim
                  </label>
                                     <textarea
                     id="otherAim"
                     name="otherAim"
                     rows={3}
                     className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-900/20 transition-all duration-300 resize-none text-gray-800 placeholder-gray-500 cursor-target"
                     value={formData.otherAim}
                     onChange={handleInputChange}
                     placeholder="Describe your specific business objective..."
                     disabled={isLoading}
                   />
                  {errors.otherAim && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.otherAim}
                    </p>
                  )}
                </div>
              )}

              {/* Selected Aims Summary */}
              {formData.businessAims.length > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Your Selected Goals ({formData.businessAims.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.businessAims.map(aimId => {
                      const aim = businessAimsOptions.find(a => a.id === aimId);
                      return aim ? (
                        <span
                          key={aimId}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-gray-800 text-sm rounded-full border border-amber-300"
                        >
                          <span>{aim.icon}</span>
                          {aim.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

                             {/* Back and Submit Buttons */}
               <div className="flex gap-4 animate-slide-in" style={{ animationDelay: '300ms' }}>
                 {/* Back Button */}
                 <button
                   type="button"
                   onClick={() => navigate(ROUTES.ONBOARDING.STEP4, { replace: true })}
                                       className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group cursor-target"
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
                   disabled={isLoading || formData.businessAims.length === 0}
                                       className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group cursor-target"
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
                        Completing Onboarding...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Complete Onboarding & Get Started
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
              <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Step 5 of 5 - Final Step</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;