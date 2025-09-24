// File: /app/risk/risk-register/components/EnhancedStatsCards.tsx

'use client'

import React from 'react';
import { AlertTriangle, Flame, Package, Shield, TrendingUp } from 'lucide-react';
import { RiskStats } from '../types';

interface StatsCardProps {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ReactNode;
    iconBgColor: string;
    valueColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
    title, 
    value, 
    subtitle, 
    icon, 
    iconBgColor, 
    valueColor = 'text-navy' 
}) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>
                    <p className={`text-2xl font-bold mt-1 ${valueColor}`}>{value}</p>
                    <p className="text-xs text-slate-400 mt-2">{subtitle}</p>
                </div>
                <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

interface EnhancedStatsCardsProps {
    stats: RiskStats;
}

export const EnhancedStatsCards: React.FC<EnhancedStatsCardsProps> = ({ stats }) => {
    return (
        <section className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Risks"
                    value={stats.total}
                    subtitle={`↑ 3 this week`}
                    icon={<AlertTriangle className="w-6 h-6 text-navy" />}
                    iconBgColor="bg-navy bg-opacity-10"
                />
                
                <StatsCard
                    title="Critical Risks"
                    value={stats.critical}
                    subtitle="Requires immediate attention"
                    icon={<Flame className="w-6 h-6 text-red-600" />}
                    iconBgColor="bg-red-100"
                    valueColor="text-red-600"
                />
                
                <StatsCard
                    title="Assets at Risk"
                    value={stats.assetsAtRisk}
                    subtitle={`Out of 156 total assets`}
                    icon={<Package className="w-6 h-6 text-yellow-600" />}
                    iconBgColor="bg-yellow-100"
                    valueColor="text-yellow-600"
                />
                
                <StatsCard
                    title="Compliance Score"
                    value={stats.complianceScore}
                    subtitle="ISO 27001 aligned"
                    icon={<Shield className="w-6 h-6 text-teal-600" />}
                    iconBgColor="bg-teal-100"
                    valueColor="text-teal-600"
                />
            </div>
        </section>
    );
};