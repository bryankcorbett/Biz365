import React from 'react';

const RadioGroup = ({
  options = [],
  value,
  onChange,
  name,
  label,
  error,
  required = false,
  icon,
  className = '',
  labelClassName = '',
  orientation = 'vertical',
  variant = 'default'
}) => {
  const handleChange = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  const baseClasses = 'space-y-3';
  const horizontalClasses = orientation === 'horizontal' ? 'flex flex-wrap gap-4' : '';
  const variantClasses = variant === 'card' ? 'space-y-4' : '';

  return (
    <div className={`${baseClasses} ${horizontalClasses} ${variantClasses} ${className}`}>
      {label && (
        <label className={`text-sm font-semibold text-gray-700 flex items-center gap-2 ${labelClassName}`}>
          {icon && (
            <span className="text-gold-500">
              {icon}
            </span>
          )}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className={`${orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-3'}`}>
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const optionId = `${name}-${index}`;

          if (variant === 'card') {
            return (
              <div
                key={option.value}
                className={`relative cursor-pointer transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => handleChange(option.value)}
              >
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-gold-400 bg-gold-50/50 shadow-lg shadow-gold-200/30'
                    : 'border-gray-200 bg-white/50 hover:border-gold-300 hover:bg-gold-50/30'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'border-gold-500 bg-gold-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {option.icon && <span className="text-lg">{option.icon}</span>}
                        <h3 className="font-semibold text-gray-900">{option.label}</h3>
                      </div>
                      {option.description && (
                        <p className="text-sm text-gray-600">{option.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => handleChange(option.value)}
                className="w-4 h-4 text-gold-600 border-gray-300 focus:ring-gold-500 focus:ring-2"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">{option.label}</span>
                {option.description && (
                  <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;
