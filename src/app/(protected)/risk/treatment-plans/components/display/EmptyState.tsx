// /app/risk/treatment-plans/components/display/EmptyState.tsx
import React from 'react';
import { Shield, Plus, Filter } from 'lucide-react';

interface EmptyStateProps {
  hasFilters?: boolean;
  onCreateNew?: () => void;
  onClearFilters?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  hasFilters = false,
  onCreateNew,
  onClearFilters,
  className = ''
}) => {
  if (hasFilters) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No matching treatment plans</h3>
        <p className="text-gray-600 mb-4">
          No treatment plans match your current search criteria. Try adjusting your filters.
        </p>
        {onClearFilters && (
          <button 
            onClick={onClearFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`text-center py-12 ${className}`}>
      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No treatment plans yet</h3>
      <p className="text-gray-600 mb-4">
        Create your first treatment plan to start managing risk mitigation strategies.
      </p>
      {onCreateNew && (
        <button 
          onClick={onCreateNew}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Treatment Plan
        </button>
      )}
    </div>
  );
};