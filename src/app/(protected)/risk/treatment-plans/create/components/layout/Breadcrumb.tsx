// /app/risk/treatment-plans/create/components/layout/Breadcrumb.tsx
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Home className="h-4 w-4" />
      <ChevronRight className="h-4 w-4" />
      <span>Risk Management</span>
      <ChevronRight className="h-4 w-4" />
      <span>Treatment Plans</span>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium">Create New Plan</span>
    </nav>
  );
};
