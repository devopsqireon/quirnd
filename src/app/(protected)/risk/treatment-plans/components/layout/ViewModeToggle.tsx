// /app/risk/treatment-plans/components/layout/ViewModeToggle.tsx
import React from 'react';
import { BarChart3, FileText } from 'lucide-react';
import { ViewMode } from '../../types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
  className?: string;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
  totalCount,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Treatment Plans ({totalCount})
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-md transition-colors ${
            viewMode === 'grid' 
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Card View"
        >
          <BarChart3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-md transition-colors ${
            viewMode === 'list' 
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
          title="Table View"
        >
          <FileText className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};