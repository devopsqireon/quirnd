// /app/risk/treatment-plan/[id]/components/shared/PriorityBadge.tsx
'use client';

import React from 'react';

interface PriorityBadgeProps {
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const baseClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
  
  const priorityConfig = {
    'Low': 'bg-green-100 text-green-800 border border-green-300',
    'Medium': 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    'High': 'bg-orange-100 text-orange-800 border border-orange-300',
    'Critical': 'bg-red-100 text-red-800 border border-red-300'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${baseClasses} ${priorityConfig[priority]}`}>
      {priority}
    </span>
  );
};
