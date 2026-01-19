import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'text-gray-600 bg-gray-50 border-gray-200',
    success: 'text-green-700 bg-green-50 border-green-200',
    warning: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    danger: 'text-red-700 bg-red-50 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-sm border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
