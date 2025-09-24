// File: src/components/feedback/StatusBadge.tsx

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Play, Pause, XCircle } from 'lucide-react';
import { getStatusColor } from '@/utils/feedback';

interface StatusBadgeProps {
  status: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, showIcon = false }: StatusBadgeProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Play;
      case 'planned': return Clock;
      case 'under-review': return Pause;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const Icon = getStatusIcon(status);

  return (
    <Badge className={`${getStatusColor(status)} flex items-center space-x-1`}>
      {showIcon && <Icon className="w-3 h-3" />}
      <span className="capitalize">{status.replace('-', ' ')}</span>
    </Badge>
  );
}