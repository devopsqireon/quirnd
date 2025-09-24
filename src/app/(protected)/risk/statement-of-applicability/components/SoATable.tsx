// Save as: /app/risk/statement-of-applicability/components/SoATable.tsx
'use client'

import React, { useState, useMemo, useCallback } from 'react';
import {
    ChevronRight,
    ChevronDown,
    Edit3,
    Eye,
    Calendar,
    User,
    Link as LinkIcon,
    FileText,
    AlertTriangle,
    CheckSquare,
    Square,
    MoreHorizontal,
    History,
    ExternalLink
} from 'lucide-react';
import { AnnexAControl } from '@/constants/annex-a-controls';
import { SoAStatus, SoAFilters } from '../types';
import { StatusBadge, PrioritySelector, StatusSelector, ApplicabilityToggle } from './StatusComponents';

interface SoATableProps {
    controls: AnnexAControl[];
    soaStatuses: SoAStatus[];
    onStatusChange: (controlId: string, field: keyof SoAStatus, value: any) => void;
    searchTerm: string;
    filters: SoAFilters;
    onBulkAction?: (action: string, controlIds: string[]) => void;
    showBulkActions?: boolean;
}

interface ExpandedDetailsProps {
    control: AnnexAControl;
    status: SoAStatus;
    onStatusChange: (controlId: string, field: keyof SoAStatus, value: any) => void;
}

const ExpandedDetails: React.FC<ExpandedDetailsProps> = ({ control, status, onStatusChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(status);

    const handleSave = () => {
        Object.entries(editedData).forEach(([key, value]) => {
            if (value !== status[key as keyof SoAStatus]) {
                onStatusChange(control.id, key as keyof SoAStatus, value);
            }
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedData(status);
        setIsEditing(false);
    };

    return (
        <td colSpan={9} className="p-0">
            <div className="bg-slate-50 border-t border-slate-200">
                <div className="p-6">
                    {/* Header with Edit Toggle */}
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-lg text-slate-900">
                            Control Details: {control.id}
                        </h4>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 transition"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Control Description */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700">
                                    Annex A Description
                                </label>
                                <div className="text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-200">
                                    {control.description}
                                </div>
                            </div>

                            {/* Implementation Status Controls */}
                            {isEditing && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border border-slate-200">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Applicability</label>
                                        <ApplicabilityToggle
                                            value={editedData.isApplicable}
                                            onChange={(value) => setEditedData(prev => ({ ...prev, isApplicable: value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Status</label>
                                        <StatusSelector
                                            value={editedData.implementationStatus}
                                            onChange={(value) => setEditedData(prev => ({ ...prev, implementationStatus: value }))}
                                            isApplicable={editedData.isApplicable}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Priority</label>
                                        <PrioritySelector
                                            value={editedData.priority}
                                            onChange={(value) => setEditedData(prev => ({ ...prev, priority: value }))}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Justification */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700">
                                    Justification
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={editedData.justification || ''}
                                        onChange={(e) => setEditedData(prev => ({ ...prev, justification: e.target.value }))}
                                        placeholder={editedData.isApplicable ? "Justification for inclusion..." : "Justification for exclusion..."}
                                        rows={4}
                                        className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                ) : (
                                    <div className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200 min-h-[80px]">
                                        {status.justification || (
                                            <span className="text-slate-400 italic">No justification provided</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Evidence & Documentation */}
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-slate-700">
                                    Evidence & Risk Mapping
                                </label>
                                <div className="space-y-3">
                                    {/* Document Links */}
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-slate-200">
                                            <FileText className="text-blue-500 w-5 h-5" />
                                            <span className="text-blue-600 hover:underline flex-grow cursor-pointer text-sm">
                                                Security_Policy_v3.2.pdf
                                            </span>
                                            <button className="text-slate-400 hover:text-slate-600">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-slate-200">
                                            <FileText className="text-green-500 w-5 h-5" />
                                            <span className="text-green-600 hover:underline flex-grow cursor-pointer text-sm">
                                                Implementation_Checklist.xlsx
                                            </span>
                                            <button className="text-slate-400 hover:text-slate-600">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Risk Links */}
                                    <div className="flex flex-wrap gap-2">
                                        {status.evidence.split(',').filter(Boolean).map((riskId, index) => (
                                            <button
                                                key={index}
                                                className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-1 rounded-full hover:bg-blue-200 transition"
                                            >
                                                <LinkIcon className="w-3 h-3" />
                                                {riskId.trim()}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Add Evidence Button */}
                                    {isEditing && (
                                        <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition">
                                            <FileText className="w-4 h-4" />
                                            Add Evidence Document
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Implementation Dates */}
                            {isEditing && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700">
                                            Target Implementation Date
                                        </label>
                                        <input
                                            type="date"
                                            value={editedData.targetDate || ''}
                                            onChange={(e) => setEditedData(prev => ({ ...prev, targetDate: e.target.value }))}
                                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700">
                                            Next Review Date
                                        </label>
                                        <input
                                            type="date"
                                            value={editedData.nextReview || ''}
                                            onChange={(e) => setEditedData(prev => ({ ...prev, nextReview: e.target.value }))}
                                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Ownership */}
                            <div>
                                <h5 className="font-semibold text-sm mb-3 text-slate-700 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Ownership
                                </h5>
                                <div className="space-y-2">
                                    <div>
                                        <label className="text-xs text-slate-500">Primary Owner</label>
                                        <p className="text-sm text-slate-700 font-medium">
                                            {status.responsibleOwner || 'Not assigned'}
                                        </p>
                                    </div>
                                    {status.backupOwner && (
                                        <div>
                                            <label className="text-xs text-slate-500">Backup Owner</label>
                                            <p className="text-sm text-slate-700">{status.backupOwner}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dates */}
                            <div>
                                <h5 className="font-semibold text-sm mb-3 text-slate-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Key Dates
                                </h5>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Last Review:</span>
                                        <span className="text-slate-700">{status.lastReview || 'Never'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Next Review:</span>
                                        <span className={`${
                                            status.nextReview && new Date(status.nextReview) < new Date() 
                                                ? 'text-red-600 font-medium' 
                                                : 'text-slate-700'
                                        }`}>
                                            {status.nextReview || 'Not scheduled'}
                                        </span>
                                    </div>
                                    {status.targetDate && (
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Target Date:</span>
                                            <span className={`${
                                                new Date(status.targetDate) < new Date() && status.implementationStatus !== 'Implemented'
                                                    ? 'text-red-600 font-medium' 
                                                    : 'text-slate-700'
                                            }`}>
                                                {status.targetDate}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Linked Assets */}
                            <div>
                                <h5 className="font-semibold text-sm mb-2 text-slate-700">Linked Assets</h5>
                                {status.linkedAssets?.length ? (
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        {status.linkedAssets.map((asset, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                                {asset}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-slate-400">No linked assets</p>
                                )}
                            </div>
                            
                            {/* Treatment Actions */}
                            <div>
                                <h5 className="font-semibold text-sm mb-2 text-slate-700">Treatment Actions</h5>
                                {status.treatmentActions?.length ? (
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        {status.treatmentActions.map((action, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                                {action}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-slate-400">No treatment actions</p>
                                )}
                            </div>
                            
                            {/* Status History */}
                            <div>
                                <h5 className="font-semibold text-sm mb-2 text-slate-700 flex items-center gap-2">
                                    <History className="w-4 h-4" />
                                    Status History
                                </h5>
                                <div className="text-xs text-slate-500 space-y-2 max-h-32 overflow-y-auto">
                                    {status.statusHistory?.length ? (
                                        status.statusHistory.map((entry, index) => (
                                            <div key={index} className="border-l-2 border-slate-200 pl-2">
                                                <div className="font-medium text-slate-700">{entry.date}</div>
                                                <div>{entry.status} by {entry.user}</div>
                                                {entry.comment && (
                                                    <div className="text-slate-400 italic">{entry.comment}</div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400">No status changes recorded</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    );
};

export const SoATable: React.FC<SoATableProps> = ({
    controls,
    soaStatuses,
    onStatusChange,
    searchTerm,
    filters,
    onBulkAction,
    showBulkActions = false
}) => {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [sortConfig, setSortConfig] = useState<{
        field: string;
        direction: 'asc' | 'desc';
    }>({ field: 'id', direction: 'asc' });

    const toggleExpansion = useCallback((controlId: string) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(controlId)) {
                newSet.delete(controlId);
            } else {
                newSet.add(controlId);
            }
            return newSet;
        });
    }, []);

    const toggleRowSelection = useCallback((controlId: string) => {
        setSelectedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(controlId)) {
                newSet.delete(controlId);
            } else {
                newSet.add(controlId);
            }
            return newSet;
        });
    }, []);

    const selectAllRows = useCallback(() => {
        const allControlIds = filteredControls.map(control => control.id);
        setSelectedRows(new Set(allControlIds));
    }, []);

    const deselectAllRows = useCallback(() => {
        setSelectedRows(new Set());
    }, []);

    const filteredAndSortedControls = useMemo(() => {
        let filtered = controls.filter(control => {
            const status = soaStatuses.find(s => s.controlId === control.id);
            if (!status) return false;

            // Search filter
            if (searchTerm && !(
                control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                control.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                status.evidence.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (status.responsibleOwner && status.responsibleOwner.toLowerCase().includes(searchTerm.toLowerCase()))
            )) return false;

            // Category filter
            if (filters.category && !control.id.startsWith(filters.category)) return false;

            // Implementation status filter
            if (filters.implementationStatus && status.implementationStatus !== filters.implementationStatus) return false;

            // Priority filter
            if (filters.priority && status.priority !== filters.priority) return false;

            // Owner filter
            if (filters.owner && status.responsibleOwner !== filters.owner) return false;

            // Applicability filter
            if (filters.applicability) {
                if (filters.applicability === 'applicable' && status.isApplicable !== true) return false;
                if (filters.applicability === 'not-applicable' && status.isApplicable !== false) return false;
                if (filters.applicability === 'tbd' && status.isApplicable !== null) return false;
            }

            return true;
        });

        // Sort the filtered results
        filtered.sort((a, b) => {
            const statusA = soaStatuses.find(s => s.controlId === a.id);
            const statusB = soaStatuses.find(s => s.controlId === b.id);

            let valueA: any, valueB: any;

            switch (sortConfig.field) {
                case 'id':
                    valueA = a.id;
                    valueB = b.id;
                    break;
                case 'status':
                    valueA = statusA?.implementationStatus || 'ZZZ';
                    valueB = statusB?.implementationStatus || 'ZZZ';
                    break;
                case 'priority':
                    const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
                    valueA = statusA?.priority ? priorityOrder[statusA.priority] ?? 99 : 99;
                    valueB = statusB?.priority ? priorityOrder[statusB.priority] ?? 99 : 99;
                    break;
                case 'owner':
                    valueA = statusA?.responsibleOwner || 'ZZZ';
                    valueB = statusB?.responsibleOwner || 'ZZZ';
                    break;
                case 'lastReview':
                    valueA = statusA?.lastReview || '1900-01-01';
                    valueB = statusB?.lastReview || '1900-01-01';
                    break;
                default:
                    valueA = a.id;
                    valueB = b.id;
            }

            if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [controls, soaStatuses, searchTerm, filters, sortConfig]);

    const filteredControls = filteredAndSortedControls;

    const handleSort = (field: string) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getSortIcon = (field: string) => {
        if (sortConfig.field !== field) {
            return <ChevronDown className="w-4 h-4 text-slate-400" />;
        }
        return sortConfig.direction === 'asc' ? 
            <ChevronDown className="w-4 h-4 text-slate-600 rotate-180" /> :
            <ChevronDown className="w-4 h-4 text-slate-600" />;
    };

    const handleBulkAction = (action: string) => {
        if (onBulkAction && selectedRows.size > 0) {
            onBulkAction(action, Array.from(selectedRows));
            setSelectedRows(new Set());
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Bulk Actions Bar */}
            {showBulkActions && selectedRows.size > 0 && (
                <div className="bg-blue-50 border-b border-blue-200 p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-800">
                            {selectedRows.size} control{selectedRows.size !== 1 ? 's' : ''} selected
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleBulkAction('mark-implemented')}
                                className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                            >
                                Mark Implemented
                            </button>
                            <button
                                onClick={() => handleBulkAction('assign-owner')}
                                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                            >
                                Assign Owner
                            </button>
                            <button
                                onClick={() => handleBulkAction('set-priority')}
                                className="px-3 py-1.5 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition"
                            >
                                Set Priority
                            </button>
                            <button
                                onClick={deselectAllRows}
                                className="px-3 py-1.5 text-slate-600 hover:text-slate-800 text-sm transition"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-600 sticky top-0">
                        <tr>
                            {showBulkActions && (
                                <th scope="col" className="px-4 py-4 w-12">
                                    <button
                                        onClick={selectedRows.size === filteredControls.length ? deselectAllRows : selectAllRows}
                                        className="text-slate-500 hover:text-slate-700"
                                    >
                                        {selectedRows.size === filteredControls.length ? (
                                            <CheckSquare className="w-4 h-4" />
                                        ) : (
                                            <Square className="w-4 h-4" />
                                        )}
                                    </button>
                                </th>
                            )}
                            <th scope="col" className="px-6 py-4 w-8"></th>
                            <th 
                                scope="col" 
                                className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition"
                                onClick={() => handleSort('id')}
                            >
                                <div className="flex items-center gap-1">
                                    Control Ref
                                    {getSortIcon('id')}
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-4">Control Title</th>
                            <th scope="col" className="px-6 py-4">Linked Risk(s)</th>
                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition"
                                     onClick={() => handleSort('status')}>
                                    Status
                                    {getSortIcon('status')}
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition"
                                     onClick={() => handleSort('priority')}>
                                    Priority
                                    {getSortIcon('priority')}
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition"
                                     onClick={() => handleSort('owner')}>
                                    Owner
                                    {getSortIcon('owner')}
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-4">
                                <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-100 transition"
                                     onClick={() => handleSort('lastReview')}>
                                    Last Review
                                    {getSortIcon('lastReview')}
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-4 w-16">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredControls.map(control => {
                            const status = soaStatuses.find(s => s.controlId === control.id);
                            if (!status) return null;

                            const isExpanded = expandedRows.has(control.id);
                            const isSelected = selectedRows.has(control.id);
                            const evidenceLinks = status.evidence.split(',').filter(Boolean);
                            
                            // Check if overdue
                            const isOverdue = status.targetDate && 
                                new Date(status.targetDate) < new Date() && 
                                status.implementationStatus !== 'Implemented';

                            return (
                                <React.Fragment key={control.id}>
                                    <tr className={`border-b border-slate-200 hover:bg-slate-50 transition ${
                                        isSelected ? 'bg-blue-50' : ''
                                    } ${isOverdue ? 'bg-red-50' : ''}`}>
                                        {showBulkActions && (
                                            <td className="px-4 py-4">
                                                <button
                                                    onClick={() => toggleRowSelection(control.id)}
                                                    className="text-slate-500 hover:text-slate-700"
                                                >
                                                    {isSelected ? (
                                                        <CheckSquare className="w-4 h-4" />
                                                    ) : (
                                                        <Square className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </td>
                                        )}
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleExpansion(control.id)}
                                                className="text-slate-600 hover:text-slate-900 transition"
                                            >
                                                {isExpanded ? (
                                                    <ChevronDown className="w-4 h-4" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 font-mono font-semibold text-slate-900">
                                            <div className="group relative">
                                                <div className="flex items-center gap-2">
                                                    {control.id}
                                                    {isOverdue && (
                                                        <AlertTriangle className="w-4 h-4 text-red-500" title="Overdue" />
                                                    )}
                                                </div>
                                                <div className="invisible group-hover:visible absolute z-10 w-64 p-3 mt-1 text-xs bg-slate-900 text-white rounded-lg shadow-lg -left-4">
                                                    {control.description}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-800 max-w-xs">
                                            <div className="truncate">{control.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {evidenceLinks.slice(0, 3).map((riskId, index) => (
                                                    <span key={index} className="text-blue-600 hover:underline cursor-pointer text-xs bg-blue-50 px-2 py-1 rounded">
                                                        {riskId.trim()}
                                                    </span>
                                                ))}
                                                {evidenceLinks.length > 3 && (
                                                    <span className="text-slate-400 text-xs">
                                                        +{evidenceLinks.length - 3} more
                                                    </span>
                                                )}
                                                {evidenceLinks.length === 0 && (
                                                    <span className="text-slate-400 text-xs">N/A</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge 
                                                status={status.isApplicable === false ? 'Not Applicable' : status.implementationStatus} 
                                                isApplicable={status.isApplicable}
                                                priority={status.priority}
                                                showPriority={false}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {status.priority && (
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    status.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                                                    status.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                                                    status.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {status.priority}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-600">
                                            <div className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {status.responsibleOwner || 'Not assigned'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {status.lastReview || 'Never'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => toggleExpansion(control.id)}
                                                    className="p-1 text-slate-400 hover:text-slate-600 transition"
                                                    title="View details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="p-1 text-slate-400 hover:text-slate-600 transition"
                                                    title="More actions"
                                                >
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    {isExpanded && (
                                        <tr>
                                            <ExpandedDetails 
                                                control={control}
                                                status={status}
                                                onStatusChange={onStatusChange}
                                            />
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-slate-200 bg-slate-50">
                <span className="text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-900">1-{filteredControls.length}</span> of{' '}
                    <span className="font-semibold text-slate-900">{filteredControls.length}</span> controls
                </span>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 text-sm text-slate-500 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    <button className="px-3 py-2 text-sm text-white bg-blue-600 border border-blue-600 rounded-lg">
                        1
                    </button>
                    <button className="px-3 py-2 text-sm text-slate-500 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
                                        