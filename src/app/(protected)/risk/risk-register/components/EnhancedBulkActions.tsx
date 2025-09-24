// File: /app/risk/risk-register/components/EnhancedBulkActions.tsx

'use client'

import React from 'react';
import { UserCheck, Settings, Link, Download, Trash2 } from 'lucide-react';

interface EnhancedBulkActionsProps {
    selectedCount: number;
    totalCount: number;
    isAllSelected: boolean;
    onSelectAll: () => void;
    onAssignOwner: () => void;
    onChangeStatus: () => void;
    onLinkControl: () => void;
    onExportSelected: () => void;
    onDeleteSelected: () => void;
}

export const EnhancedBulkActions: React.FC<EnhancedBulkActionsProps> = ({
    selectedCount,
    totalCount,
    isAllSelected,
    onSelectAll,
    onAssignOwner,
    onChangeStatus,
    onLinkControl,
    onExportSelected,
    onDeleteSelected
}) => {
    if (selectedCount === 0) return null;

    return (
        <section className="px-8 py-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={isAllSelected}
                            onChange={onSelectAll}
                            className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                        />
                        <span className="ml-2 text-sm text-slate-700">
                            Select All ({totalCount})
                        </span>
                    </label>
                    <span className="text-sm text-slate-500">
                        {selectedCount} risks selected
                    </span>
                </div>
                
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={onAssignOwner}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center gap-2"
                    >
                        <UserCheck className="w-4 h-4" />
                        Assign Owner
                    </button>
                    <button 
                        onClick={onChangeStatus}
                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm flex items-center gap-2"
                    >
                        <Settings className="w-4 h-4" />
                        Change Status
                    </button>
                    <button 
                        onClick={onLinkControl}
                        className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm flex items-center gap-2"
                    >
                        <Link className="w-4 h-4" />
                        Link Control
                    </button>
                    <button 
                        onClick={onExportSelected}
                        className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export Selected
                    </button>
                    <button 
                        onClick={onDeleteSelected}
                        className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>
            </div>
        </section>
    );
};