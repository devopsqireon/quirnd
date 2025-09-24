// /app/risk/treatment-plan/[id]/components/shared/TreatmentStatusBadge.tsx
'use client';

import React from 'react';

interface TreatmentStatusBadgeProps {
  status: 'Draft' | 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled';
  size?: 'sm' | 'md';
}

export const TreatmentStatusBadge: React.FC<TreatmentStatusBadgeProps> = ({ status, size = 'md' }) => {
  const baseClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
  
  const statusConfig = {
    'Draft': 'bg-gray-100 text-gray-800 border border-gray-300',
    'In Progress': 'bg-blue-100 text-blue-800 border border-blue-300',
    'Completed': 'bg-green-100 text-green-800 border border-green-300',
    'On Hold': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    'Cancelled': 'bg-red-100 text-red-800 border border-red-300'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${baseClasses} ${statusConfig[status]}`}>
      {status}
    </span>
  );
};