// /app/awareness-training/components/shared/CategoryBadge.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TRAINING_CATEGORIES } from '../../utils/constants';

interface CategoryBadgeProps {
  category: keyof typeof TRAINING_CATEGORIES;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = "" }) => {
  const categoryConfig = TRAINING_CATEGORIES[category];
  
  return (
    <Badge className={`${categoryConfig.color} ${className}`}>
      <span className="mr-1">{categoryConfig.icon}</span>
      {categoryConfig.label}
    </Badge>
  );
};

export default CategoryBadge;