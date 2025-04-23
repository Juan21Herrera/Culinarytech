import React from 'react';
import clsx from 'clsx';

export const Button = ({ children, className = '', variant = 'solid', ...props }) => {
  const base = 'transition duration-200 font-medium focus:outline-none';
  const variants = {
    solid: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-gray-400 text-white hover:bg-gray-800',
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
