// Save as: /app/risk/statement-of-applicability/components/BulkActions.tsx
'use client'

import React, { useState } from 'react';
import { 
    CheckCircle, 
    Users, 
    AlertTriangle, 
    Calendar,
    X,
    Save,
    Trash2
} from 'lucide-react';
import { SoAStatus, BulkUpdateOptions } from '../types';
import { StatusSelector, PrioritySelector } from './StatusComponents';

interface BulkActionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedControls: string[];
    onBulkUpdate: (options: BulkUpdateOptions) => void;
    availableOwners?: string[];
}

export const BulkActionsModal: React.FC<BulkActionsModalProps> = ({
    isOpen,
    onClose,
    selectedControls,
    onBulkUpdate,
    availableOwners = []
}) => {
    const [action, setAction] = useState<string>('');
    const [updateValue, setUpdateValue] = useState<any>('');
    const [comment, setComment] = useState<string>('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let field: keyof SoAStatus;
        let value: any = updateValue;

        switch (action) {
            case 'status':
                field = 'implementationStatus';
                break;
            case 'priority':
                field = 'priority';
                break;
            case 'owner':
                field = 'responsibleOwner';
                break;
            case 'review-date':
                field = 'nextReview';
                break;
            case 'target-date':
                field = 'targetDate';
                break;
            default:
                return;
        }

        onBulkUpdate({
            controlIds: selectedControls,
            field,
            value,
            comment
        });

        // Reset form
        setAction('');
        setUpdateValue('');
        setComment('');
        onClose();
    };

    const renderValueInput = () => {
        switch (action) {
            case 'status':
                return (
                    <StatusSelector
                        value={updateValue}
                        onChange={setUpdateValue}
                        isApplicable={true}
                    />
                );
            case 'priority':
                return (
                    <PrioritySelector
                        value={updateValue}
                        onChange={setUpdateValue}
                    />
                );
            case 'owner':
                return (
                    <select
                        value={updateValue}
                        onChange={(e) => setUpdateValue(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Owner</option>
                        {availableOwners.map(owner => (
                            <option key={owner} value={owner}>{owner}</option>
                        ))}
                    </select>
                );
            case 'review-date':
            case 'target-date':
                return (
                    <input
                        type="date"
                        value={updateValue}
                        onChange={(e) => setUpdateValue(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Bulk Update Controls</h2>
                        <p className="text-sm text-slate-600 mt-1">
                            Update {selectedControls.length} selected control{selectedControls.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Action Selection */}
                    <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-700">
                            Select Action
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                                { value: 'status', label: 'Update Implementation Status', icon: CheckCircle },
                                { value: 'priority', label: 'Set Priority', icon: AlertTriangle },
                                { value: 'owner', label: 'Assign Owner', icon: Users },
                                { value: 'review-date', label: 'Set Review Date', icon: Calendar },
                                { value: 'target-date', label: 'Set Target Date', icon: Calendar }
                            ].map(({ value, label, icon: Icon }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setAction(value)}
                                    className={`p-4 border rounded-lg text-left transition flex items-center gap-3 ${
                                        action === value
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium text-sm">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Value Input */}
                    {action && (
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-700">
                                New Value
                            </label>
                            {renderValueInput()}
                        </div>
                    )}

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-700">
                            Comment (Optional)
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment about this bulk update..."
                            rows={3}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Selected Controls Preview */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-700">
                            Selected Controls
                        </label>
                        <div className="bg-slate-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                            <div className="flex flex-wrap gap-1">
                                {selectedControls.map(controlId => (
                                    <span key={controlId} className="text-xs bg-white px-2 py-1 rounded border">
                                        {controlId}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 hover:text-slate-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!action || !updateValue}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4" />
                            Apply Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Quick Action Buttons Component
interface QuickActionsProps {
    selectedControls: string[];
    onQuickAction: (action: string, controlIds: string[]) => void;
    onShowBulkModal: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
    selectedControls,
    onQuickAction,
    onShowBulkModal
}) => {
    if (selectedControls.length === 0) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800">
                    {selectedControls.length} control{selectedControls.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => onQuickAction('mark-implemented', selectedControls)}
                        className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                    >
                        Mark Implemented
                    </button>
                    <button
                        onClick={() => onQuickAction('mark-planned', selectedControls)}
                        className="px-3 py-1.5 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition"
                    >
                        Mark Planned
                    </button>
                    <button
                        onClick={() => onQuickAction('set-high-priority', selectedControls)}
                        className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                    >
                        High Priority
                    </button>
                    <button
                        onClick={onShowBulkModal}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                    >
                        More Actions...
                    </button>
                    <button
                        onClick={() => onQuickAction('clear-selection', [])}
                        className="px-3 py-1.5 text-slate-600 hover:text-slate-800 text-sm transition"
                    >
                        Clear Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

// Bulk Export Component
interface BulkExportProps {
    selectedControls: string[];
    onExport: (format: string, controlIds: string[]) => void;
}

export const BulkExport: React.FC<BulkExportProps> = ({
    selectedControls,
    onExport
}) => {
    if (selectedControls.length === 0) return null;

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">
                Export {selectedControls.length} selected:
            </span>
            <button
                onClick={() => onExport('csv', selectedControls)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
                CSV
            </button>
            <button
                onClick={() => onExport('excel', selectedControls)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
                Excel
            </button>
            <button
                onClick={() => onExport('pdf', selectedControls)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
                PDF
            </button>
        </div>
    );
};