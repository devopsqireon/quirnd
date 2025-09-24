// src/app/tasks-controls/components/FilterPanel.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

import { FilterPanelProps } from '../types';
import { CONTROL_CATEGORIES, DUE_DATE_RANGES, FILTER_LABELS } from '../constants';

export default function FilterPanel({ filters, onFiltersChange, uniqueOwners, type = 'task' }: FilterPanelProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    if (type === 'task') {
      onFiltersChange({
        status: '',
        owner: '',
        priority: '',
        linkedItemType: '',
        dueDateRange: ''
      });
    } else {
      onFiltersChange({
        status: '',
        owner: '',
        category: '',
        dueDateRange: ''
      });
    }
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Status
          </Label>
          <Select 
            value={filters.status || ''} 
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              {type === 'task' ? (
                <>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="Implemented">Implemented</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Planned">Planned</SelectItem>
                  <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Owner Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Owner
          </Label>
          <Select 
            value={filters.owner || ''} 
            onValueChange={(value) => handleFilterChange('owner', value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All owners" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All owners</SelectItem>
              {uniqueOwners.map(owner => (
                <SelectItem key={owner} value={owner}>{owner}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Conditional filters based on type */}
        {type === 'task' ? (
          <>
            {/* Priority Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Priority
              </Label>
              <Select 
                value={(filters as any).priority || ''} 
                onValueChange={(value) => handleFilterChange('priority', value)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All priorities</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Linked Item Type Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Linked Type
              </Label>
              <Select 
                value={(filters as any).linkedItemType || ''} 
                onValueChange={(value) => handleFilterChange('linkedItemType', value)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All types</SelectItem>
                  <SelectItem value="Risk">Risk</SelectItem>
                  <SelectItem value="Policy">Policy</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Control">Control</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          /* Category Filter for Controls */
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Category
            </Label>
            <Select 
              value={(filters as any).category || ''} 
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {CONTROL_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Due Date Range Filter */}
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Due Date
          </Label>
          <Select 
            value={filters.dueDateRange || ''} 
            onValueChange={(value) => handleFilterChange('dueDateRange', value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All dates" />
            </SelectTrigger>
            <SelectContent>
              {DUE_DATE_RANGES.map(range => (
                <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              
              const filterLabel = FILTER_LABELS[key as keyof typeof FILTER_LABELS] || key;

              return (
                <div
                  key={key}
                  className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  <span className="mr-1">{filterLabel}:</span>
                  <span className="font-semibold">{value}</span>
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}