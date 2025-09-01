import React from 'react';

const Stepper = ({
  currentStep = 1,
  totalSteps = 5,
  variant = 'dots',
  className = '',
  showLabels = false,
  labels = [],
  size = 'md'
}) => {
  // Size variants
  const sizes = {
    sm: {
      dot: 'w-2 h-2',
      line: 'h-0.5',
      text: 'text-xs'
    },
    md: {
      dot: 'w-3 h-3',
      line: 'h-1',
      text: 'text-sm'
    },
    lg: {
      dot: 'w-4 h-4',
      line: 'h-1.5',
      text: 'text-base'
    }
  };

  const currentSize = sizes[size] || sizes.md;

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`${currentSize.dot} rounded-full transition-all duration-300 ${
                  isCompleted || isCurrent
                    ? 'bg-gold-500 shadow-lg shadow-gold-200/50'
                    : 'bg-gray-300'
                } ${isCurrent ? 'animate-pulse-subtle' : ''}`}
              />
              {index < totalSteps - 1 && (
                <div
                  className={`w-4 ${currentSize.line} mx-1 transition-all duration-300 ${
                    isCompleted ? 'bg-gold-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'numbered') {
    return (
      <div className={`flex items-center justify-center gap-4 ${className}`}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gold-500 text-white shadow-lg shadow-gold-200/50'
                    : isCurrent
                    ? 'bg-gold-100 text-gold-600 border-2 border-gold-500'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                } ${currentSize.text} font-semibold`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              
              {showLabels && labels[index] && (
                <span className={`ml-2 ${currentSize.text} font-medium ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {labels[index]}
                </span>
              )}
              
              {index < totalSteps - 1 && (
                <div
                  className={`w-8 ${currentSize.line} mx-2 transition-all duration-300 ${
                    isCompleted ? 'bg-gold-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === 'progress') {
    const progressPercentage = (currentStep / totalSteps) * 100;
    
    return (
      <div className={`w-full ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`${currentSize.text} font-medium text-gray-700`}>
            Step {currentStep} of {totalSteps}
          </span>
          <span className={`${currentSize.text} text-gray-500`}>
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-gold-500 to-gold-600 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {showLabels && labels[currentStep - 1] && (
          <p className={`mt-2 ${currentSize.text} text-gray-600 text-center`}>
            {labels[currentStep - 1]}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default Stepper;
