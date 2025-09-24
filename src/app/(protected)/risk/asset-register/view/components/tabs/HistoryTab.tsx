// File: /app/risk/asset-register/view/components/tabs/HistoryTab.tsx
'use client'

import React from 'react';
import { Clock, User, Edit, Plus } from 'lucide-react';
import { Asset } from '../../types';

interface HistoryTabProps {
    asset: Asset;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ asset }) => {
    const getActionIcon = (action: string) => {
        if (action.toLowerCase().includes('created')) return <Plus className="w-4 h-4 text-green-600" />;
        if (action.toLowerCase().includes('updated') || action.toLowerCase().includes('modified')) return <Edit className="w-4 h-4 text-blue-600" />;
        return <Clock className="w-4 h-4 text-gray-600" />;
    };

    const getActionColor = (action: string) => {
        if (action.toLowerCase().includes('created')) return 'bg-green-50 border-green-200';
        if (action.toLowerCase().includes('updated') || action.toLowerCase().includes('modified')) return 'bg-blue-50 border-blue-200';
        return 'bg-gray-50 border-gray-200';
    };

    return (
        <div className="py-6">
            <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-slate-500" />
                <h3 className="text-lg font-semibold text-slate-700">Asset History</h3>
            </div>

            {asset.history && asset.history.length > 0 ? (
                <div className="space-y-4">
                    {asset.history.map((item, index) => (
                        <div key={index} className={`border rounded-lg p-4 ${getActionColor(item.action)}`}>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    {getActionIcon(item.action)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <User className="w-4 h-4 text-slate-500" />
                                            <span className="font-medium text-slate-800">{item.user}</span>
                                        </div>
                                        <time className="text-sm text-slate-500">
                                            {new Date(item.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </time>
                                    </div>
                                    <p className="text-sm text-slate-700 mt-1">{item.action}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No history records available for this asset.</p>
                </div>
            )}
        </div>
    );
};

// Helper functions for risk status colors
const getRiskStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'open': return 'bg-red-100 text-red-800';
        case 'mitigated': return 'bg-green-100 text-green-800';
        case 'in progress': return 'bg-yellow-100 text-yellow-800';
        case 'closed': return 'bg-gray-100 text-gray-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const getCiaLabel = (value: number): string => {
    switch (value) {
        case 0: return 'Not Applicable';
        case 1: return 'Very Low';
        case 2: return 'Low';
        case 3: return 'Moderate';
        case 4: return 'High';
        case 5: return 'Very High';
        default: return 'Unknown';
    }
};