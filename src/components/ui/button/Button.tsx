import React from 'react';
import './button.css';

const Button = ({
  onClick,
  children,
  disabled = false,
  className = '',
  variant = 'default',
}: {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: 'ghost' | 'default' | 'outline';
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
