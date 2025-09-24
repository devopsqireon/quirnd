// File: /app/risk/asset-register/edit/components/EditHeader.tsx
'use client'

import React from 'react';
import { ArrowLeft, Save, RotateCcw, Eye, History } from 'lucide-react';

interface EditHeaderProps {
    assetName: string;
    assetId: string;
    hasChanges: boolean;
    onBack: () => void;
    onSave: () => void;
    onReset: () => void;
    onViewAsset: () => void;
    onViewHistory: () => void;
}

export const EditHeader: React.FC<EditHeaderProps> = ({
    assetName,
    assetId,
    hasChanges,
    onBack,
    onSave,
    onReset,
    onViewAsset,
    onViewHistory
}) => {
    return (
        <div className="mb-6">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mb-4"
            >
                <ArrowLeft size={16} /> Back to Asset Register
            </button>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-slate-900">Edit Asset</h1>
                        {hasChanges && (
                            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                                Unsaved Changes
                            </span>
                        )}
                    </div>
                    <p className="text-lg text-slate-600">{assetName}</p>
                    <p className="text-sm text-slate-500">{assetId}</p>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                    <button 
                        onClick={onViewAsset}
                        className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <Eye size={16} /> View Asset
                    </button>
                    
                    <button 
                        onClick={onViewHistory}
                        className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <History size={16} /> History
                    </button>
                    
                    <button 
                        onClick={onReset}
                        disabled={!hasChanges}
                        className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RotateCcw size={16} /> Reset Changes
                    </button>
                    
                    <button 
                        onClick={onSave}
                        disabled={!hasChanges}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={16} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};