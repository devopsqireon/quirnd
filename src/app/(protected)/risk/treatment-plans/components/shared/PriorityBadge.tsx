// /app/risk/treatment-plans/components/shared/PriorityBadge.tsx
import React from 'react';
import { getPriorityColor } from '../../utils/helpers';

interface PriorityBadgeProps {
  priority: string;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className = '' }) => {
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(priority)} ${className}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};