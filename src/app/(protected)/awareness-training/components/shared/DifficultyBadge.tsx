// /app/awareness-training/components/shared/DifficultyBadge.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DIFFICULTY_LEVELS } from '../../utils/constants';

interface DifficultyBadgeProps {
  difficulty: keyof typeof DIFFICULTY_LEVELS;
  className?: string;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className = "" }) => {
  const difficultyConfig = DIFFICULTY_LEVELS[difficulty];
  
  return (
    <Badge className={`${difficultyConfig.color} ${className}`} title={difficultyConfig.description}>
      {difficultyConfig.label}
    </Badge>
  );
};

export default DifficultyBadge;