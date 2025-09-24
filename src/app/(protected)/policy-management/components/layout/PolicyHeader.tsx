// Save as: /app/policy-management/components/layout/PolicyHeader.tsx
'use client'

import React from 'react';
import { Upload, Download, Plus } from 'lucide-react';

export const PolicyHeader: React.FC = () => {
    const handleImportPolicies = () => {
        // Handle import functionality
        console.log('Import policies clicked');
    };

    const handleExportLibrary = () => {
        // Handle export functionality
        console.log('Export library clicked');
    };

    const handleNewPolicy = () => {
        // Handle new policy creation
        console.log('New policy clicked');
    };

    return (
        <header className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Policy Library</h1>
                <p className="text-slate-600 mt-1 max-w-2xl">
                    Manage ISMS policies: create, approve, publish and track employee acknowledgement. 
                    Mapped to Annex A controls.
                </p>
            </div>
            <div className="flex items-center space-x-3">
                <button 
                    onClick={handleImportPolicies}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                >
                    <Upload size={16} />
                    Import Policies
                </button>
                <button 
                    onClick={handleExportLibrary}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                >
                    <Download size={16} />
                    Export Library
                </button>
                <button 
                    onClick={handleNewPolicy}
                    className="px-4 py-2 text-sm font-semibold text-white bg-slate-800 rounded-lg shadow-sm hover:bg-slate-700 transition-colors duration-200 flex items-center gap-2"
                >
                    <Plus size={16} />
                    New Policy
                </button>
            </div>
        </header>
    );
};