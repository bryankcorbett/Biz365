import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  icon,
  className = '',
  inputClassName = '',
  labelClassName = '',
  ...props
}, ref) => {
  const baseInputClasses = "w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  const errorInputClasses = error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "";
  const iconInputClasses = icon ? "pl-12" : "";

  return (
    <div className={`space-y-2 ${className}`}>
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
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`${baseInputClasses} ${errorInputClasses} ${iconInputClasses} ${inputClassName}`}
          {...props}
        />
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
});

Input.displayName = 'Input';

export default Input;
