import React from 'react';
import './button.css';

const Button = ({
  onClick,
  children,
  disabled = false,
  className = '',
}: {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
