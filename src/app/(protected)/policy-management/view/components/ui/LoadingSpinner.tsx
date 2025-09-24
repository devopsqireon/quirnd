// File: /app/policy-management/view/components/ui/LoadingSpinner.tsx

'use client'

import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'md':
        return 'h-8 w-8';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-8 w-8';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${getSizeClasses(size)}`}></div>
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}