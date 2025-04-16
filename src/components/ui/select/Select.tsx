import React from 'react';

import './select.css';

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  value,
  placeholder,
  label,
}) => {
  return (
    <>
      {label && <label className="label">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
