// /app/risk/treatment-plan/[id]/components/shared/ErrorDisplay.tsx
'use client';

import React from 'react';
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';

interface ErrorDisplayProps {
  error: string;
  showRetry?: boolean;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, showRetry = true }) => {
  const { refreshData } = useTreatmentDetails();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 rounded-full p-3 mb-4">
        <AlertTriangleIcon className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 text-center mb-4 max-w-md">{error}</p>
      {showRetry && (
        <button
          onClick={refreshData}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCwIcon className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};