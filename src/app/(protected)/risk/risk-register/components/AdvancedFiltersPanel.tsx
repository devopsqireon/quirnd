// File: /app/risk/risk-register/components/AdvancedFiltersPanel.tsx

'use client'

import React, { useState } from 'react';
import { Search, X, Filter, RotateCcw, Calendar, AlertTriangle, Building, Users } from 'lucide-react';
import { RiskFilters } from '../types';

interface AdvancedFiltersPanelProps {
    filters: RiskFilters;
    onFilterChange: (filters: RiskFilters) => void;
    activeFilters: string[];
    onClearAllFilters: () => void;
    resultsCount: number;
    totalCount: number;
}

export const AdvancedFiltersPanel: React.FC<AdvancedFiltersPanelProps> = ({
    filters,
    onFilterChange,
    activeFilters,
    onClearAllFilters,
    resultsCount,
    totalCount
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterChange = (key: keyof RiskFilters, value: string) => {
        onFilterChange({
            ...filters,
            [key]: value
        });
    };

    const removeActiveFilter = (filterKey: string) => {
        const filterMap: Record<string, { key: keyof RiskFilters; value: string }> = {
            'Category: Information Security': { key: 'category', value: '' },
            'Category: Operational': { key: 'category', value: '' },
            'Category: Legal/Compliance': { key: 'category', value: '' },
            'Category: Supplier Risk': { key: 'category', value: '' },
            'Category: Financial': { key: 'category', value: '' },
            'Category: Strategic': { key: 'category', value: '' },
            'Status: Open': { key: 'status', value: '' },
            'Status: Under Treatment': { key: 'status', value: '' },
            'Status: Accepted': { key: 'status', value: '' },
            'Status: Mitigated': { key: 'status', value: '' },
            'Status: Closed': { key: 'status', value: '' },
            'Risk Score: low': { key: 'riskScore', value: '' },
            'Risk Score: medium': { key: 'riskScore', value: '' },
            'Risk Score: high': { key: 'riskScore', value: '' },
            'Risk Score: critical': { key: 'riskScore', value: '' },
            'Asset: server': { key: 'associatedAsset', value: '' },
            'Asset: database': { key: 'associatedAsset', value: '' },
            'Asset: application': { key: 'associatedAsset', value: '' },
            'Asset: network': { key: 'associatedAsset', value: '' },
            'Asset: vendor': { key: 'associatedAsset', value: '' },
            'Asset: policy': { key: 'associatedAsset', value: '' },
        };
        
        const mapping = filterMap[filterKey];
        if (mapping) {
            handleFilterChange(mapping.key, mapping.value);
        }
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    const quickFilterButtons = [
        { label: 'Critical Risks', key: 'riskScore', value: 'critical', color: 'bg-red-100 text-red-800 border-red-200' },
        { label: 'Overdue Reviews', key: 'reviewDue', value: 'overdue', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        { label: 'Open Status', key: 'status', value: 'Open', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        { label: 'Under Treatment', key: 'status', value: 'Under Treatment', color: 'bg-blue-100 text-blue-800 border-blue-200' }
    ];

    return (
        <section className="px-8 py-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                {/* Header Section */}
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-navy/10 rounded-lg">
                                <Filter className="w-5 h-5 text-navy" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-navy">Filters & Search</h3>
                                <p className="text-sm text-slate-500">Refine your risk register view</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="px-3 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                {isExpanded ? 'Less Filters' : 'More Filters'}
                            </button>
                            {hasActiveFilters && (
                                <button 
                                    onClick={onClearAllFilters}
                                    className="px-3 py-2 text-sm font-medium text-red-600 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Quick Filter Buttons */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-slate-600 font-medium">Quick filters:</span>
                        {quickFilterButtons.map((button) => (
                            <button
                                key={button.label}
                                onClick={() => handleFilterChange(button.key as keyof RiskFilters, 
                                    filters[button.key as keyof RiskFilters] === button.value ? '' : button.value)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                                    filters[button.key as keyof RiskFilters] === button.value 
                                        ? button.color 
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Search */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search by risk title, description, ID, or tags..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                        />
                        {filters.search && (
                            <button
                                onClick={() => handleFilterChange('search', '')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Expanded Filters Section */}
                {isExpanded && (
                    <div className="p-6 border-b border-slate-200 bg-slate-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {/* Associated Asset Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <Building className="w-4 h-4" />
                                    Associated Asset
                                </label>
                                <select 
                                    value={filters.associatedAsset}
                                    onChange={(e) => handleFilterChange('associatedAsset', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                >
                                    <option value="">All Asset Types</option>
                                    <option value="server">Servers</option>
                                    <option value="database">Databases</option>
                                    <option value="application">Applications</option>
                                    <option value="network">Network Equipment</option>
                                    <option value="vendor">Vendors/Third Parties</option>
                                    <option value="policy">Policies & Procedures</option>
                                    <option value="user">User Groups</option>
                                </select>
                            </div>
                            
                            {/* Risk Category Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <AlertTriangle className="w-4 h-4" />
                                    Risk Category
                                </label>
                                <select 
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                >
                                    <option value="">All Categories</option>
                                    <option value="Information Security">Information Security</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Legal/Compliance">Legal/Compliance</option>
                                    <option value="Supplier Risk">Supplier Risk</option>
                                    <option value="Financial">Financial</option>
                                    <option value="Strategic">Strategic</option>
                                </select>
                            </div>
                            
                            {/* Risk Score Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <AlertTriangle className="w-4 h-4" />
                                    Risk Score Range
                                </label>
                                <select 
                                    value={filters.riskScore}
                                    onChange={(e) => handleFilterChange('riskScore', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                >
                                    <option value="">All Risk Scores</option>
                                    <option value="low">Low Risk (1-5)</option>
                                    <option value="medium">Medium Risk (6-15)</option>
                                    <option value="high">High Risk (16-20)</option>
                                    <option value="critical">Critical Risk (21-25)</option>
                                </select>
                            </div>
                            
                            {/* Risk Owner Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <Users className="w-4 h-4" />
                                    Risk Owner
                                </label>
                                <select 
                                    value={filters.owner}
                                    onChange={(e) => handleFilterChange('owner', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                >
                                    <option value="">All Risk Owners</option>
                                    <option value="Sarah Johnson">Sarah Johnson</option>
                                    <option value="Mike Chen">Mike Chen</option>
                                    <option value="Lisa Rodriguez">Lisa Rodriguez</option>
                                    <option value="David Kim">David Kim</option>
                                    <option value="Jennifer Williams">Jennifer Williams</option>
                                    <option value="Robert Brown">Robert Brown</option>
                                </select>
                            </div>
                            
                            {/* Status Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <div className="w-4 h-4 border-2 border-slate-400 rounded"></div>
                                    Risk Status
                                </label>
                                <select 
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Open">Open</option>
                                    <option value="Under Treatment">Under Treatment</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Mitigated">Mitigated</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                            
                            {/* Annex A Control Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <div className="w-4 h-4 bg-purple-200 rounded"></div>
                                    ISO 27001 Control
                                </label>
                                <select 
                                    value={filters.annexAControl}
                                    onChange={(e) => handleFilterChange('annexAControl', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                >
                                    <option value="">All Annex A Controls</option>
                                    <option value="a5">A.5 Information Security Policies</option>
                                    <option value="a6">A.6 Organization of Information Security</option>
                                    <option value="a7">A.7 Human Resource Security</option>
                                    <option value="a8">A.8 Asset Management</option>
                                    <option value="a9">A.9 Access Control</option>
                                    <option value="a10">A.10 Cryptography</option>
                                    <option value="a11">A.11 Physical and Environmental Security</option>
                                    <option value="a12">A.12 Operations Security</option>
                                    <option value="a13">A.13 Communications Security</option>
                                    <option value="a14">A.14 System Acquisition, Development and Maintenance</option>
                                    <option value="a15">A.15 Supplier Relationships</option>
                                    <option value="a16">A.16 Information Security Incident Management</option>
                                    <option value="a17">A.17 Business Continuity Management</option>
                                    <option value="a18">A.18 Compliance</option>
                                </select>
                            </div>
                            
                            {/* Review Date Filter */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <Calendar className="w-4 h-4" />
                                    Review Due
                                </label>
                                <select 
                                    value={filters.reviewDue}
                                    onChange={(e) => handleFilterChange('reviewDue', e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                >
                                    <option value="">Any Review Date</option>
                                    <option value="overdue">Overdue Reviews</option>
                                    <option value="week">Due This Week</option>
                                    <option value="month">Due This Month</option>
                                    <option value="quarter">Due This Quarter</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results and Active Filters Footer */}
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                <span className="text-sm font-medium text-slate-700">
                                    Showing {resultsCount.toLocaleString()} of {totalCount.toLocaleString()} risks
                                </span>
                            </div>
                            
                            {activeFilters.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-slate-500">Active filters:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {activeFilters.slice(0, 3).map((filter, index) => (
                                            <span 
                                                key={index}
                                                className="inline-flex items-center gap-1 px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full border border-teal-200"
                                            >
                                                {filter}
                                                <button 
                                                    onClick={() => removeActiveFilter(filter)}
                                                    className="hover:text-teal-900 ml-1"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                        {activeFilters.length > 3 && (
                                            <span className="text-xs text-slate-500 py-1">
                                                +{activeFilters.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {resultsCount === 0 && hasActiveFilters && (
                                <div className="flex items-center gap-2 text-sm text-amber-600">
                                    <AlertTriangle className="w-4 h-4" />
                                    No risks match your current filters
                                </div>
                            )}
                            <button 
                                className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors text-sm font-medium"
                                onClick={() => console.log('Apply advanced filters')}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    {/* Filter Statistics */}
                    {hasActiveFilters && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div>
                                    <div className="text-lg font-semibold text-red-600">
                                        {Math.floor(resultsCount * 0.1)}
                                    </div>
                                    <div className="text-xs text-slate-500">Critical</div>
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-orange-600">
                                        {Math.floor(resultsCount * 0.25)}
                                    </div>
                                    <div className="text-xs text-slate-500">High Risk</div>
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-yellow-600">
                                        {Math.floor(resultsCount * 0.15)}
                                    </div>
                                    <div className="text-xs text-slate-500">Overdue</div>
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-blue-600">
                                        {Math.floor(resultsCount * 0.4)}
                                    </div>
                                    <div className="text-xs text-slate-500">Under Treatment</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};