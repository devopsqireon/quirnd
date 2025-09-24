// /app/risk/treatment-plans/components/shared/CategoryBadge.tsx
import React from 'react';
import { getCategoryColor } from '../../utils/helpers';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)} ${className}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
};