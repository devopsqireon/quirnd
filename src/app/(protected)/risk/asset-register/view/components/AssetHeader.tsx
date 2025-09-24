// File: /app/risk/asset-register/view/components/AssetHeader.tsx
'use client'

import React from 'react';
import { ArrowLeft, Edit, Trash2, MoreVertical } from 'lucide-react';
import { Asset } from '../types';

interface AssetHeaderProps {
    asset: Asset;
    onEdit: () => void;
    onDelete: () => void;
    onBack: () => void;
}

export const AssetHeader: React.FC<AssetHeaderProps> = ({ 
    asset, 
    onEdit, 
    onDelete, 
    onBack 
}) => {
    return (
        <div className="mb-6">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mb-4"
            >
                <ArrowLeft size={16} /> Back to Asset Register
            </button>
            
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <p className="text-sm font-semibold text-blue-600">{asset.assetId}</p>
                    <h1 className="text-3xl font-bold text-slate-900">{asset.name}</h1>
                    <p className="text-lg text-slate-600 mt-1">{asset.assetType}</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onEdit}
                        className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                    >
                        <Edit size={16} /> Edit Asset
                    </button>
                    
                    <div className="relative group">
                        <button className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <MoreVertical size={16} />
                        </button>
                        
                        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <button 
                                onClick={onDelete}
                                className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 text-sm w-full text-left rounded-lg"
                            >
                                <Trash2 size={14} /> Delete Asset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};