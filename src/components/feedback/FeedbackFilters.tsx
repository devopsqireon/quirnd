// File: src/components/feedback/FeedbackFilters.tsx

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { FeedbackFilters as FeedbackFiltersType } from '@/types/feedback';
import { FEEDBACK_CONFIG } from '@/config/feedback';

interface FeedbackFiltersProps {
  filters: FeedbackFiltersType;
  onFiltersChange: (filters: Partial<FeedbackFiltersType>) => void;
  onClearFilters: () => void;
}

export function FeedbackFilters({ filters, onFiltersChange, onClearFilters }: FeedbackFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== 'all' && value !== 'newest'
  );

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search feedback..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          className="pl-10"
        />
      </div>
      
      <Select value={filters.category || 'all'} onValueChange={(value) => onFiltersChange({ category: value === 'all' ? undefined : value })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {FEEDBACK_CONFIG.categories.map(category => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.status || 'all'} onValueChange={(value) => onFiltersChange({ status: value === 'all' ? undefined : value })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {FEEDBACK_CONFIG.statuses.map(status => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.priority || 'all'} onValueChange={(value) => onFiltersChange({ priority: value === 'all' ? undefined : value })}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          {FEEDBACK_CONFIG.priorities.map(priority => (
            <SelectItem key={priority.value} value={priority.value}>
              {priority.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.sortBy} onValueChange={(value) => onFiltersChange({ sortBy: value as any })}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="most-voted">Most Voted</SelectItem>
          <SelectItem value="most-commented">Most Commented</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          <X className="w-4 h-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  );
}