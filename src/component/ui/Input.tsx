import React from 'react';

// Define the props for the Input component by extending the standard HTML input attributes
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // Combine the default styles with any additional classes passed in via props
        className={`w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

// Set a display name for easier debugging
Input.displayName = 'Input';

export { Input };
