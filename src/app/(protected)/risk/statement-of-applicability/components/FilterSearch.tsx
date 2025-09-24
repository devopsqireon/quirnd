// Save as: /app/risk/statement-of-applicability/components/FilterSearch.tsx
'use client'

import React, { useState, useCallback } from 'react';
import { 
    Search, 
    Filter, 
    X, 
    ChevronDown,
    Users,
    Tag,
    Calendar,
    AlertCircle
} from 'lucide-react';
import { SoAFilters } from '../types';

interface FilterSearchProps {
    filters: SoAFilters;
    onFiltersChange: (filters: SoAFilters) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    availableOwners?: string[];
    availableTags?: string[];
    totalResults?: number;
    showAdvancedFilters?: boolean;
}

export const FilterSearch: React.FC<FilterSearchProps> = ({
    filters,
    onFiltersChange,
    searchTerm,
    onSearchChange,
    availableOwners = [],
    availableTags = [],
    totalResults,
    showAdvancedFilters = false
}) => {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(showAdvancedFilters);
    const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);

    const handleFilterChange = useCallback((field: keyof SoAFilters, value: string | string[]) => {
        onFiltersChange({
            ...filters,
            [field]: value
        });
    }, [filters, onFiltersChange]);

    const clearAllFilters = () => {
        onFiltersChange({
            category: '',
            implementationStatus: '',
            riskLevel: '',
            priority: '',
            owner: '',
            applicability: '',
            tags: []
        });
        setSelectedTags([]);
        onSearchChange('');
    };

    const activeFiltersCount = Object.values(filters).filter(value => 
        Array.isArray(value) ? value.length > 0 : value !== ''
    ).length + (searchTerm ? 1 : 0);

    const handleTagToggle = (tag: string) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];
        
        setSelectedTags(newTags);
        handleFilterChange('tags', newTags);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 sticky top-0 z-20">
            {/* Main Search and Filter Bar */}
            <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Search Input */}
                    <div className="relative col-span-12 lg:col-span-5">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by control ID, name, owner, evidence..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Quick Filters */}
                    <div className="col-span-12 lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-3">
                        <select 
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                        >
                            <option value="">All Categories</option>
                            <option value="A.5">A.5 Info Security Policies</option>
                            <option value="A.6">A.6 Organization</option>
                            <option value="A.7">A.7 Human Resources</option>
                            <option value="A.8">A.8 Asset Management</option>
                            <option value="A.9">A.9 Access Control</option>
                            <option value="A.10">A.10 Cryptography</option>
                            <option value="A.11">A.11 Physical Security</option>
                            <option value="A.12">A.12 Operations Security</option>
                            <option value="A.13">A.13 Communications</option>
                            <option value="A.14">A.14 System Development</option>
                        </select>
                        
                        <select 
                            value={filters.implementationStatus}
                            onChange={(e) => handleFilterChange('implementationStatus', e.target.value)}
                            className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                        >
                            <option value="">All Statuses</option>
                            <option value="Implemented">Implemented</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Planned">Planned</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Not Implemented">Not Implemented</option>
                        </select>
                        
                        <select 
                            value={filters.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                        >
                            <option value="">All Priorities</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    {/* Filter Controls */}
                    <div className="col-span-12 lg:col-span-2 flex gap-2">
                        <button 
                            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                            className={`flex-1 flex items-center justify-center gap-2 p-2.5 border rounded-lg text-sm font-medium transition-colors ${
                                isAdvancedOpen 
                                    ? 'bg-blue-600 text-white border-blue-600' 
                                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            }`}
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                            {activeFiltersCount > 0 && (
                                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                                    isAdvancedOpen ? 'bg-blue-700' : 'bg-blue-600 text-white'
                                }`}>
                                    {activeFiltersCount}
                                </span>
                            )}
                        </button>
                        
                        {activeFiltersCount > 0 && (
                            <button 
                                onClick={clearAllFilters}
                                className="px-3 py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium"
                                title="Clear all filters"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                {totalResults !== undefined && (
                    <div className="mt-3 text-sm text-slate-500">
                        {totalResults} control{totalResults !== 1 ? 's' : ''} found
                        {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount !== 1 ? 's' : ''} active)`}
                    </div>
                )}
            </div>

            {/* Advanced Filters Panel */}
            {isAdvancedOpen && (
                <div className="border-t border-slate-200 p-4 bg-slate-50">
                    <div className="space-y-4">
                        {/* First Row - Applicability and Owner */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Applicability
                                </label>
                                <select 
                                    value={filters.applicability}
                                    onChange={(e) => handleFilterChange('applicability', e.target.value)}
                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                                >
                                    <option value="">All</option>
                                    <option value="applicable">Applicable</option>
                                    <option value="not-applicable">Not Applicable</option>
                                    <option value="tbd">To Be Determined</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    Responsible Owner
                                </label>
                                <select 
                                    value={filters.owner}
                                    onChange={(e) => handleFilterChange('owner', e.target.value)}
                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                                >
                                    <option value="">All Owners</option>
                                    {availableOwners.map(owner => (
                                        <option key={owner} value={owner}>{owner}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Risk Level
                                </label>
                                <select 
                                    value={filters.riskLevel}
                                    onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                                >
                                    <option value="">All Risk Levels</option>
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Tags Section */}
                        {availableTags.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <Tag className="w-4 h-4 inline mr-1" />
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagToggle(tag)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                                selectedTags.includes(tag)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Filter Shortcuts */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Quick Filters
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: 'Overdue Items', filter: 'overdue', icon: AlertTriangle },
                                    { label: 'High Priority', filter: 'high-priority', icon: AlertCircle },
                                    { label: 'Due for Review', filter: 'review-due', icon: Calendar },
                                    { label: 'No Owner Assigned', filter: 'no-owner', icon: Users }
                                ].map(({ label, filter, icon: Icon }) => (
                                    <button
                                        key={filter}
                                        onClick={() => {
                                            // Handle quick filter logic here
                                            console.log(`Quick filter: ${filter}`);
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
                <div className="border-t border-slate-200 p-4 bg-blue-50">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-blue-800">Active Filters:</span>
                        
                        {searchTerm && (
                            <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                Search: "{searchTerm}"
                                <button 
                                    onClick={() => onSearchChange('')}
                                    className="ml-1.5 hover:text-blue-600"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        
                        {Object.entries(filters).map(([key, value]) => {
                            if (!value || (Array.isArray(value) && value.length === 0)) return null;
                            
                            const displayValue = Array.isArray(value) ? value.join(', ') : value;
                            const filterLabel = key.charAt(0).toUpperCase() + key.slice(1);
                            
                            return (
                                <span 
                                    key={key}
                                    className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                >
                                    {filterLabel}: {displayValue}
                                    <button 
                                        onClick={() => handleFilterChange(key as keyof SoAFilters, Array.isArray(value) ? [] : '')}
                                        className="ml-1.5 hover:text-blue-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};