// /app/risk/treatment-plan/[id]/components/shared/LoadingSpinner.tsx
'use client';

import React from 'react';
import { Loader2Icon } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2Icon className={`${sizeClasses[size]} animate-spin text-blue-600 mb-3`} />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};