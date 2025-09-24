// Save as: /app/policy-management/components/cards/OverviewCards.tsx
'use client'

import React, { useMemo } from 'react';
import { Policy, PolicySummaryData } from '../../types/policy.types';

interface OverviewCardsProps {
    policies: Policy[];
}

interface SummaryCardProps {
    title: string;
    value: string;
    trend: string;
    trendColor: string;
    series: number[];
    icon?: React.ReactNode;
}

// Custom CSS-based chart component
const MiniChart: React.FC<{ series: number[] }> = ({ series }) => {
    const max = Math.max(...series);
    const min = Math.min(...series);
    const range = max - min;
    
    return (
        <div className="flex items-end justify-between h-full space-x-1">
            {series.map((value, index) => {
                const height = range > 0 ? ((value - min) / range) * 100 : 50;
                return (
                    <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-teal-500 to-teal-400 rounded-sm opacity-80 hover:opacity-100 transition-all duration-300"
                        style={{
                            height: `${Math.max(height, 10)}%`,
                            animationDelay: `${index * 100}ms`,
                            animation: 'slideUp 0.6s ease-out forwards'
                        }}
                    />
                );
            })}
            <style jsx>{`
                @keyframes slideUp {
                    from {
                        height: 0%;
                        opacity: 0;
                    }
                    to {
                        opacity: 0.8;
                    }
                }
            `}</style>
        </div>
    );
};

const SummaryCard: React.FC<SummaryCardProps> = ({ 
    title, 
    value, 
    trend, 
    trendColor, 
    series, 
    icon 
}) => {

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                {icon && <div className="text-slate-400">{icon}</div>}
            </div>
            <div className="flex items-end justify-between mt-2 mb-4">
                <span className="text-3xl font-bold text-slate-800">{value}</span>
                <span className={`text-sm font-semibold ${trendColor}`}>{trend}</span>
            </div>
            <div className="h-16">
                <MiniChart series={series} />
            </div>
        </div>
    );
};

export const OverviewCards: React.FC<OverviewCardsProps> = ({ policies }) => {
    const summaryData: PolicySummaryData = useMemo(() => {
        const totalPolicies = policies.length;
        const drafts = policies.filter(p => p.status === 'Draft').length;
        const pendingApprovals = policies.filter(p => p.status === 'Under Review').length;
        const published = policies.filter(p => p.status === 'Published').length;
        
        // Calculate average acknowledgement percentage
        const publishedPolicies = policies.filter(p => p.status === 'Published');
        const acknowledgedPercentage = publishedPolicies.length > 0 
            ? Math.round(publishedPolicies.reduce((sum, p) => sum + p.acknowledgement, 0) / publishedPolicies.length)
            : 0;

        return {
            totalPolicies,
            drafts,
            pendingApprovals,
            published,
            acknowledgedPercentage,
            trends: {
                totalPolicies: '+2 this month',
                drafts: 'In progress',
                pendingApprovals: 'Awaiting',
                published: 'Active',
                acknowledgedPercentage: '+1.5%'
            },
            series: {
                totalPolicies: [90, 95, 100, 105, 110, 115, 120, 124],
                drafts: [12, 10, 14, 13, 15, 11, 9, 8],
                pendingApprovals: [2, 3, 1, 4, 3, 5, 4, 3],
                published: [80, 82, 88, 90, 95, 100, 105, 113],
                acknowledgedPercentage: [85, 86, 88, 87, 90, 91, 90.5, acknowledgedPercentage]
            }
        };
    }, [policies]);

    const cards = [
        {
            title: 'Total Policies',
            value: summaryData.totalPolicies.toString(),
            trend: summaryData.trends.totalPolicies,
            trendColor: 'text-green-500',
            series: summaryData.series.totalPolicies
        },
        {
            title: 'Drafts',
            value: summaryData.drafts.toString(),
            trend: summaryData.trends.drafts,
            trendColor: 'text-gray-500',
            series: summaryData.series.drafts
        },
        {
            title: 'Pending Approvals',
            value: summaryData.pendingApprovals.toString(),
            trend: summaryData.trends.pendingApprovals,
            trendColor: 'text-orange-500',
            series: summaryData.series.pendingApprovals
        },
        {
            title: 'Published',
            value: summaryData.published.toString(),
            trend: summaryData.trends.published,
            trendColor: 'text-gray-500',
            series: summaryData.series.published
        },
        {
            title: '% Acknowledged',
            value: `${summaryData.acknowledgedPercentage}%`,
            trend: summaryData.trends.acknowledgedPercentage,
            trendColor: 'text-green-500',
            series: summaryData.series.acknowledgedPercentage
        }
    ];

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
            {cards.map((card, index) => (
                <SummaryCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    trend={card.trend}
                    trendColor={card.trendColor}
                    series={card.series}
                />
            ))}
        </section>
    );
};