import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  // Variant styles
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg shadow-black/5',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20',
    gold: 'bg-gradient-to-br from-gold-50 to-gold-100/50 border border-gold-200',
    success: 'bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200',
    warning: 'bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200',
    error: 'bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200',
  };

  // Padding styles
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const baseClasses = 'rounded-xl transition-all duration-300';
  const variantClasses = variants[variant] || variants.default;
  const paddingClasses = paddings[padding] || paddings.md;
  const hoverClasses = hover ? 'hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 cursor-pointer' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${paddingClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Card sub-components
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
