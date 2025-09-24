// /app/risk/treatment-plans/components/shared/StatusBadge.tsx
import React from 'react';
import { getStatusColor } from '../../utils/helpers';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)} ${className}`}>
      {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
    </span>
  );
};