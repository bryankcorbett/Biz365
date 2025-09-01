import React from 'react';
import AnimatedBackground from '../AnimatedBackground';

const FormLayout = ({ 
  children, 
  title, 
  subtitle, 
  icon, 
  variant = 'auth',
  className = '',
  showBackground = true 
}) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {showBackground && <AnimatedBackground variant={variant} />}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          {/* Header */}
          {(title || subtitle || icon) && (
            <div className="text-center mb-8 animate-fade-up">
              {icon && (
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl shadow-lg shadow-gold-200/50 mb-4">
                  {icon}
                </div>
              )}
              {title && (
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-gray-600">{subtitle}</p>
              )}
            </div>
          )}

          {/* Form Card */}
          <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-white/20 p-8 animate-scale-in ${className}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
