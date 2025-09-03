import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const OnboardingStepper = ({ currentStep, totalSteps = 3, customTitle, customDescription }) => {
  const navigate = useNavigate();

  // Handle step navigation
  const handleStepClick = (stepNumber) => {
    // Only allow navigation to completed steps or the current step
    if (stepNumber <= currentStep) {
      const routeMap = {
        1: ROUTES.ONBOARDING.STEP1,
        2: ROUTES.ONBOARDING.STEP2,
        3: ROUTES.ONBOARDING.STEP3,
      };
      
      const targetRoute = routeMap[stepNumber];
      if (targetRoute) {
        navigate(targetRoute);
      }
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <React.Fragment key={stepNumber}>
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => handleStepClick(stepNumber)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-black shadow-lg shadow-black/30 border-2 border-gray-800'
                        : isCompleted
                        ? 'bg-black shadow-lg shadow-black/30 border-2 border-gray-800 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-black/40'
                        : 'bg-white border-2 border-black'
                    } ${stepNumber <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {isCompleted ? (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`text-sm font-bold ${
                        isActive ? 'text-white' : 'text-black'
                      }`}>
                        {stepNumber}
                      </span>
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <span 
                    onClick={() => handleStepClick(stepNumber)}
                    className={`text-xs mt-2 font-bold transition-colors duration-200 ${
                      isActive 
                        ? 'text-black' 
                        : isCompleted 
                        ? 'text-black hover:text-gray-700 cursor-pointer' 
                        : 'text-gray-400'
                    } ${stepNumber <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    Step {stepNumber}
                  </span>
                </div>
                
                {/* Connector Line */}
                {stepNumber < totalSteps && (
                  <div className={`w-16 h-0.5 transition-all duration-300 ${
                    isCompleted ? 'bg-black' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Current Step Title */}
      <div className="text-center mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          {customTitle || getStepTitle(currentStep)}
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          {customDescription || getStepDescription(currentStep)}
        </p>
      </div>
    </div>
  );
};

// Helper function to get step titles
const getStepTitle = (step) => {
  switch (step) {
    case 1:
      return 'Company & Industry Information';
    case 2:
      return 'Business Address Details';
    case 3:
      return 'Business Goals & Objectives';
    default:
      return 'Onboarding';
  }
};

// Helper function to get step descriptions
const getStepDescription = (step) => {
  switch (step) {
    case 1:
      return 'Tell us about your company and industry';
    case 2:
      return 'Provide your business address information';
    case 3:
      return 'Choose your business objectives';
    default:
      return 'Complete your setup';
  }
};

export default OnboardingStepper;