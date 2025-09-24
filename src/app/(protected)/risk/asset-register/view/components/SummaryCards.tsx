// File: /app/risk/asset-register/view/components/SummaryCards.tsx
'use client'

import React, { useMemo } from 'react';
import { User, BarChart2, CheckCircle, Shield, Calendar, MapPin } from 'lucide-react';
import { Asset } from '../types';

interface SummaryCardsProps {
    asset: Asset;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ asset }) => {
    const overallCriticality = useMemo(() => 
        asset.confidentiality + asset.integrity + asset.availability, 
        [asset.confidentiality, asset.integrity, asset.availability]
    );
    
    const getCriticalityColor = (value: number) => {
        if (value >= 12) return 'bg-red-100 text-red-800 border-red-200';
        if (value >= 9) return 'bg-orange-100 text-orange-800 border-orange-200';
        if (value >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'retired': return 'bg-gray-100 text-gray-800';
            case 'archived': return 'bg-blue-100 text-blue-800';
            case 'disposed': return 'bg-red-100 text-red-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Owner Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                    <User className="text-blue-600" size={20} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Asset Owner</p>
                    <p className="text-lg font-semibold text-slate-800 mt-1">{asset.owner}</p>
                    <p className="text-xs text-slate-500">{asset.department}</p>
                </div>
            </div>

            {/* Criticality Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                    <BarChart2 className="text-orange-600" size={20} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Risk Score (C+I+A)</p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getCriticalityColor(overallCriticality)}`}>
                        {overallCriticality}/15 ({asset.confidentiality}+{asset.integrity}+{asset.availability})
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{asset.classification}</p>
                </div>
            </div>

            {/* Status Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="text-green-600" size={20} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Current Status</p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getStatusColor(asset.status)}`}>
                        {asset.status}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{asset.approvalStatus}</p>
                </div>
            </div>

            {/* Location Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                    <MapPin className="text-purple-600" size={20} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Location</p>
                    <p className="text-lg font-semibold text-slate-800 mt-1">{asset.physicalLocation || 'Not specified'}</p>
                    <p className="text-xs text-slate-500">{asset.hostingType}</p>
                </div>
            </div>

            {/* Compliance Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                    <Shield className="text-indigo-600" size={20} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Compliance</p>
                    <p className="text-lg font-semibold text-slate-800 mt-1">
                        {asset.regulatoryRelevance?.length || 0} Requirements
                    </p>
                    <p className="text-xs text-slate-500">
                        {asset.complianceItems?.filter(item => item.checked).length || 0} items checked
                    </p>
                </div>
            </div>

            {/* Lifecycle Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-teal-100 p-3 rounded-full">
                    <Calendar className="text-teal-600" size={20} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Acquired</p>
                    <p className="text-lg font-semibold text-slate-800 mt-1">
                        {asset.acquisitionDate ? new Date(asset.acquisitionDate).toLocaleDateString() : 'Not specified'}
                    </p>
                    <p className="text-xs text-slate-500">{asset.expectedLifetime || 'Lifetime not specified'}</p>
                </div>
            </div>
        </div>
    );
};