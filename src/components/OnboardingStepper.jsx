import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const OnboardingStepper = ({ currentStep, totalSteps = 5 }) => {
  const navigate = useNavigate();

  // Handle step navigation
  const handleStepClick = (stepNumber) => {
    // Only allow navigation to completed steps or the current step
    if (stepNumber <= currentStep) {
      const routeMap = {
        1: ROUTES.ONBOARDING.STEP1,
        2: ROUTES.ONBOARDING.STEP2,
        3: ROUTES.ONBOARDING.STEP3,
        4: ROUTES.ONBOARDING.STEP4,
        5: ROUTES.ONBOARDING.STEP5,
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
                        ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30 border-2 border-purple-400'
                        : isCompleted
                        ? 'bg-gradient-to-br from-gold-500 to-gold-600 shadow-lg shadow-gold-500/30 border-2 border-gold-400 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-gold-500/40'
                        : 'bg-gray-700 border-2 border-gray-600'
                    } ${stepNumber <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {isCompleted ? (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`text-sm font-semibold ${
                        isActive ? 'text-white' : 'text-gray-300'
                      }`}>
                        {stepNumber}
                      </span>
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <span 
                    onClick={() => handleStepClick(stepNumber)}
                    className={`text-xs mt-2 font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-purple-300' 
                        : isCompleted 
                        ? 'text-gold-300 hover:text-gold-200 cursor-pointer' 
                        : 'text-gray-400'
                    } ${stepNumber <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    Step {stepNumber}
                  </span>
                </div>
                
                {/* Connector Line */}
                {stepNumber < totalSteps && (
                  <div className={`w-16 h-0.5 transition-all duration-300 ${
                    isCompleted ? 'bg-gradient-to-r from-gold-500 to-gold-600' : 'bg-gray-600'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* Current Step Title */}
      <div className="text-center mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
          {getStepTitle(currentStep)}
        </h2>
        <p className="text-blue-700 text-sm md:text-base">
          {getStepDescription(currentStep)}
        </p>
      </div>
    </div>
  );
};

// Helper function to get step titles
const getStepTitle = (step) => {
  switch (step) {
    case 1:
      return 'Company Information';
    case 2:
      return 'Industry & Location';
    case 3:
      return 'Business Details';
    case 4:
      return 'POS & Requirements';
    case 5:
      return 'Business Goals';
    default:
      return 'Onboarding';
  }
};

// Helper function to get step descriptions
const getStepDescription = (step) => {
  switch (step) {
    case 1:
      return 'Enter your company name';
    case 2:
      return 'Select your industry and location';
    case 3:
      return 'Provide additional business details';
    case 4:
      return 'Tell us about your POS needs';
    case 5:
      return 'Choose your business objectives';
    default:
      return 'Complete your setup';
  }
};

export default OnboardingStepper;
