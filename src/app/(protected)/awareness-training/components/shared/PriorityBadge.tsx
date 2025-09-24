// /app/awareness-training/components/shared/PriorityBadge.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PRIORITY_LEVELS } from '../../utils/constants';

interface PriorityBadgeProps {
  priority: keyof typeof PRIORITY_LEVELS;
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className = "" }) => {
  const priorityConfig = PRIORITY_LEVELS[priority];
  
  return (
    <Badge className={`${priorityConfig.color} ${className}`}>
      {priorityConfig.label}
    </Badge>
  );
};

export default PriorityBadge;