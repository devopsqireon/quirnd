// /app/(protected)/audit-monitoring/components/shared/StatusBadge.tsx
"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getSeverityColor, getStatusColor, getPriorityColor } from '../../utils';

interface StatusBadgeProps {
  status: string;
  type?: 'status' | 'severity' | 'priority';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'status',
  className = ''
}) => {
  const getColorClass = () => {
    switch (type) {
      case 'severity':
        return getSeverityColor(status);
      case 'priority':
        return getPriorityColor(status);
      default:
        return getStatusColor(status);
    }
  };

  return (
    <Badge 
      className={cn(getColorClass(), 'capitalize', className)}
      variant="outline"
    >
      {status.replace('-', ' ')}
    </Badge>
  );
};