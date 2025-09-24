// /app/awareness-training/components/shared/StatusBadge.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { ASSIGNMENT_STATUS } from '../../utils/constants';

interface StatusBadgeProps {
  status: keyof typeof ASSIGNMENT_STATUS;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const statusConfig = ASSIGNMENT_STATUS[status];
  
  const IconComponent = {
    Clock,
    AlertCircle,
    CheckCircle,
    XCircle
  }[statusConfig.icon] || Clock;

  return (
    <Badge className={`flex items-center gap-1 ${statusConfig.color} ${className}`}>
      <IconComponent className="w-3 h-3" />
      {statusConfig.label}
    </Badge>
  );
};

export default StatusBadge;