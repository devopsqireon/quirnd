'use client'

import React, { useMemo } from 'react';
import { Database, ShieldAlert, Server, AlertTriangle } from 'lucide-react';
import { Asset } from '@/types/asset';

const SummaryCard: React.FC<{ icon: React.ElementType; title: string; count: number; color: string }> = ({ icon: Icon, title, count, color }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm flex items-start gap-4 border border-slate-200">
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')}`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-800">{count}</p>
        </div>
    </div>
);

export const AssetSummary: React.FC<{ assets: Asset[] }> = ({ assets }) => {
    const stats = useMemo(() => {
        return {
            total: assets.length,
            highValue: assets.filter(a => a.assetValue >= 10).length,
            needsAttention: assets.filter(a => ['In-Repair', 'Decommissioned'].includes(a.status)).length,
            assetsWithOpenRisks: assets.filter(a => a.associatedRisks?.some(r => r.status === 'Open')).length,
        };
    }, [assets]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <SummaryCard icon={Database} title="Total Assets" count={stats.total} color="text-blue-600" />
            <SummaryCard icon={ShieldAlert} title="High Value Assets" count={stats.highValue} color="text-red-600" />
            <SummaryCard icon={AlertTriangle} title="Assets with Open Risks" count={stats.assetsWithOpenRisks} color="text-orange-600" />
            <SummaryCard icon={Server} title="Needs Attention" count={stats.needsAttention} color="text-yellow-600" />
        </div>
    );
};
