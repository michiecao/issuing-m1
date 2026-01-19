import React, { useState } from 'react';
import { chevronDownUrl } from './icons';

const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  themeColor = '#0085FF',
  className = '',
  icon: Icon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none text-sm ${Icon ? 'pl-9' : ''} ${className}`}
        style={{
          borderColor: isFocused ? themeColor : '#d1d5db',
          boxShadow: isFocused ? `0 0 0 1px ${themeColor}` : 'none',
        }}
        {...props}
      />
    </div>
  );
};

export const Textarea = ({
  value,
  onChange,
  placeholder,
  themeColor = '#0085FF',
  rows = 2,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none text-sm resize-none ${className}`}
      style={{
        borderColor: isFocused ? themeColor : '#d1d5db',
        boxShadow: isFocused ? `0 0 0 1px ${themeColor}` : 'none',
      }}
      {...props}
    />
  );
};

export const Select = ({
  value,
  onChange,
  children,
  themeColor = '#0085FF',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <select
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`pl-3 pr-8 py-2 border rounded-md bg-white text-sm focus:outline-none appearance-none bg-no-repeat ${className}`}
      style={{
        borderColor: isFocused ? themeColor : '#d1d5db',
        boxShadow: isFocused ? `0 0 0 1px ${themeColor}` : 'none',
        backgroundImage: `url("${chevronDownUrl}")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '12px',
      }}
      {...props}
    >
      {children}
    </select>
  );
};

export default Input;
