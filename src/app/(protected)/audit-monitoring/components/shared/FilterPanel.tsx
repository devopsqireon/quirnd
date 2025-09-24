// /app/(protected)/audit-monitoring/components/shared/FilterPanel.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  key: string;
  label: string;
  value: string;
  count?: number;
}

interface FilterPanelProps {
  filters: FilterOption[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (key: string, value: string) => {
    const currentFilters = activeFilters[key] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(f => f !== value)
      : [...currentFilters, value];
    
    onFilterChange({
      ...activeFilters,
      [key]: newFilters
    });
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              {activeFilterCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              )}
            </div>
            
            {Object.entries(
              filters.reduce((acc, filter) => {
                if (!acc[filter.key]) acc[filter.key] = [];
                acc[filter.key].push(filter);
                return acc;
              }, {} as Record<string, FilterOption[]>)
            ).map(([key, options]) => (
              <div key={key} className="space-y-2">
                <h5 className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h5>
                <div className="space-y-1">
                  {options.map(option => (
                    <label 
                      key={option.value} 
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={(activeFilters[key] || []).includes(option.value)}
                        onChange={() => toggleFilter(key, option.value)}
                        className="rounded border-slate-300"
                      />
                      <span className="text-sm">{option.label}</span>
                      {option.count !== undefined && (
                        <span className="text-xs text-slate-500">
                          ({option.count})
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {Object.entries(activeFilters).map(([key, values]) =>
            values.map(value => (
              <Badge 
                key={`${key}-${value}`} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                {value}
                <button
                  onClick={() => toggleFilter(key, value)}
                  className="ml-1 hover:bg-slate-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))
          )}
        </div>
      )}
    </div>
  );
};