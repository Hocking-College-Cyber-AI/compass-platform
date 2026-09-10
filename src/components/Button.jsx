import React from 'react';

const variants = {
  primary: 'bg-compass-700 text-white hover:bg-compass-800 shadow-soft',
  secondary: 'bg-compass-100 text-compass-800 hover:bg-compass-200',
  outline: 'border border-compass-700 text-compass-700 hover:bg-compass-50'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base'
};

const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...props
}) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 hover:-translate-y-0.5 ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
