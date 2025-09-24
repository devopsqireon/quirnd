// /app/risk/treatment-plans/components/filters/FilterDropdowns.tsx
import React from 'react';
import { FilterState } from '../../types';
import { TREATMENT_CATEGORIES, TREATMENT_PRIORITIES, TREATMENT_STATUSES, DATE_RANGES } from '../../utils/constants';

interface FilterDropdownsProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  className?: string;
}

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, onChange, options, placeholder = 'All' }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const FilterDropdowns: React.FC<FilterDropdownsProps> = ({
  filters,
  onFiltersChange,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 ${className}`}>
      <Dropdown
        label="Category"
        value={filters.category}
        onChange={(value) => onFiltersChange({ category: value })}
        options={TREATMENT_CATEGORIES}
        placeholder="All Categories"
      />

      <Dropdown
        label="Priority"
        value={filters.priority}
        onChange={(value) => onFiltersChange({ priority: value })}
        options={TREATMENT_PRIORITIES}
        placeholder="All Priorities"
      />

      <Dropdown
        label="Status"
        value={filters.status}
        onChange={(value) => onFiltersChange({ status: value })}
        options={TREATMENT_STATUSES}
        placeholder="All Statuses"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
        <input
          type="text"
          placeholder="Filter by owner"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.owner}
          onChange={(e) => onFiltersChange({ owner: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <input
          type="text"
          placeholder="Filter by department"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.department}
          onChange={(e) => onFiltersChange({ department: e.target.value })}
        />
      </div>

      <Dropdown
        label="Date Range"
        value={filters.dateRange}
        onChange={(value) => onFiltersChange({ dateRange: value })}
        options={DATE_RANGES}
        placeholder="All Dates"
      />
    </div>
  );
};