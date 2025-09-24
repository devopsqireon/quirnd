// /app/risk/treatment-plans/utils/hooks/useViewMode.ts
import { useState } from 'react';
import { ViewMode } from '../../types';

export const useViewMode = (initialMode: ViewMode = 'grid') => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  return {
    viewMode,
    setViewMode,
    toggleViewMode
  };
};