// /app/risk/treatment-plan/[id]/components/layout/TreatmentDetailsLayout.tsx
'use client';

import React from 'react';
import { TreatmentDetailsBreadcrumb } from './TreatmentDetailsBreadcrumb';
import { TreatmentDetailsHeader } from './TreatmentDetailsHeader';
import { TreatmentDetailsNavigation } from './TreatmentDetailsNavigation';

interface TreatmentDetailsLayoutProps {
  children: React.ReactNode;
}

export const TreatmentDetailsLayout: React.FC<TreatmentDetailsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TreatmentDetailsBreadcrumb />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TreatmentDetailsHeader />
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TreatmentDetailsNavigation />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
};