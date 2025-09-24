'use client'

import React from 'react';
import { Plus, Upload, Link as LinkIcon, AlertTriangle, Trash2, RotateCcw } from 'lucide-react';

export const WelcomeBanner: React.FC = () => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
        <div className="flex">
            <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
                <h3 className="text-lg font-semibold text-blue-800">Step 1: Build Your Asset Register</h3>
                <div className="mt-2 text-sm text-blue-700">
                    <p>A complete asset inventory is the foundation of your risk assessment. You can't protect what you don't know you have. Start by adding your assets below.</p>
                </div>
            </div>
        </div>
    </div>
);

export const EmptyState: React.FC<{ onAddManually: () => void; onImport: () => void; onSync: () => void; }> = ({ onAddManually, onImport, onSync }) => (
    <div className="text-center bg-white p-12 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Welcome to your Asset Register</h2>
        <p className="mt-2 text-slate-600">An accurate inventory is the foundation of your information security.</p>
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <button onClick={onAddManually} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                <Plus size={20} /> Add Asset Manually
            </button>
            <button onClick={onImport} className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200">
                <Upload size={20} /> Import from Excel/CSV
            </button>
            <button onClick={onSync} className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200">
                <LinkIcon size={20} /> Sync from Applications
            </button>
        </div>
    </div>
);

export const TrashView: React.FC<{
    deletedAssets: any[];
    onRestore: (id: string) => void;
    onPermanentDelete: (asset: any) => void;
    onClose: () => void;
}> = ({ deletedAssets, onRestore, onPermanentDelete, onClose }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Deleted Assets</h2>
            <button onClick={onClose} className="text-sm font-semibold text-blue-600 hover:underline">Back to Asset Register</button>
        </div>
        {deletedAssets.length === 0 ? (
            <p className="text-slate-500 text-center py-8">The trash is empty.</p>
        ) : (
            <table className="w-full text-sm">
                <thead className="bg-slate-50">
                    <tr>
                        {['Asset ID', 'Asset Name', 'Owner', 'Actions'].map(h => <th key={h} className="p-3 text-left font-semibold text-slate-600">{h}</th>)}
                    </tr>
                </thead>
                 <tbody>
                    {deletedAssets.map(asset => (
                        <tr key={asset.id} className="border-b border-slate-200">
                            <td className="p-3 font-mono text-xs text-slate-500">{asset.id}</td>
                            <td className="p-3 font-semibold text-slate-800">{asset.name}</td>
                            <td className="p-3 text-slate-600">{asset.owner}</td>
                            <td className="p-3">
                                <div className="flex gap-4">
                                    <button onClick={() => onRestore(asset.id)} className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-800">
                                        <RotateCcw size={14} /> Restore
                                    </button>
                                    <button onClick={() => onPermanentDelete(asset)} className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-800">
                                        <Trash2 size={14} /> Delete Permanently
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);
