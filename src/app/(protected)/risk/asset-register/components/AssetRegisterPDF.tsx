'use client'

import React from 'react';
import { Asset } from '@/types/asset';
import { FileDown, X } from 'lucide-react';

export const AssetRegisterPDF: React.FC<{ assets: Asset[]; onClose: () => void }> = ({ assets, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="p-4 bg-slate-100 flex justify-between items-center border-b">
                <h2 className="text-lg font-semibold text-slate-800">Export Preview: Asset Register</h2>
                <div>
                    <button onClick={() => alert("Printing to PDF...")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm">
                        <FileDown size={16} /> Download PDF
                    </button>
                    <button onClick={onClose} className="ml-2 text-slate-500 hover:text-slate-800 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>
            </div>
            <div className="p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-2">Asset Register Report</h1>
                <p className="text-sm text-slate-500 mb-6">Generated on: {new Date().toLocaleDateString()}</p>
                <table className="w-full text-xs border-collapse border border-slate-400">
                    <thead className="bg-slate-200">
                        <tr>
                            {['Asset ID', 'Asset Name', 'Asset Type', 'Owner', 'Asset Value', 'Status'].map(h => (
                                <th key={h} className="border border-slate-300 p-2 text-left font-semibold">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map(asset => (
                            <tr key={asset.id} className="even:bg-slate-50">
                                <td className="border border-slate-300 p-2">{asset.id}</td>
                                <td className="border border-slate-300 p-2">{asset.name}</td>
                                <td className="border border-slate-300 p-2">{asset.assetType}</td>
                                <td className="border border-slate-300 p-2">{asset.owner}</td>
                                <td className="border border-slate-300 p-2">{asset.assetValue}</td>
                                <td className="border border-slate-300 p-2">{asset.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
