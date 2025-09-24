// /app/risk/treatment-plans/components/filters/FiltersPanel.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { FilterState } from '../../types';
import { SearchBar } from './SearchBar';
import { FilterDropdowns } from './FilterDropdowns';

interface FiltersPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  resultsCount: number;
  className?: string;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  resultsCount,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900">Filters & Search</h3>
            <span className="text-sm text-gray-500">
              {resultsCount} result{resultsCount !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Expand
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <SearchBar
          value={filters.search}
          onChange={(value) => onFiltersChange({ search: value })}
          className="mb-4"
        />

        {isExpanded && (
          <FilterDropdowns
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        )}
      </div>
    </div>
  );
};