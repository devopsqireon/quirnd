// Save as: /app/risk/statement-of-applicability/components/SoASummary.tsx
'use client'

import React, { useMemo } from 'react';
import { 
    Shield, 
    Target, 
    CheckCircle, 
    TrendingUp, 
    Clock,
    AlertTriangle,
    Calendar
} from 'lucide-react';
import { SoAStatus, SummaryMetrics } from '../types';

interface SummaryCardProps {
    icon: React.ElementType;
    title: string;
    count: string | number;
    color: string;
    description?: string;
    trend?: { value: number; direction: 'up' | 'down' | 'stable' };
    onClick?: () => void;
    isClickable?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
    icon: Icon,
    title,
    count,
    color,
    description,
    trend,
    onClick,
    isClickable = false
}) => (
    <div 
        className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 ${
            isClickable ? 'cursor-pointer hover:border-blue-300 hover:scale-105' : ''
        }`}
        onClick={onClick}
    >
        <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')}`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div className="flex-1">
                <p className="text-sm text-slate-500 font-medium">{title}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-800 mt-1">{count}</p>
                    {trend && (
                        <div className={`flex items-center text-xs font-medium ${
                            trend.direction === 'up' ? 'text-green-600' : 
                            trend.direction === 'down' ? 'text-red-600' : 'text-slate-500'
                        }`}>
                            <TrendingUp className={`w-3 h-3 mr-1 ${trend.direction === 'down' ? 'rotate-180' : ''}`} />
                            {Math.abs(trend.value)}%
                        </div>
                    )}
                </div>
                {description && (
                    <p className="text-xs text-slate-400 mt-1">{description}</p>
                )}
            </div>
        </div>
    </div>
);

interface SoASummaryProps {
    soaStatuses: SoAStatus[];
    onFilterChange?: (filter: string, value: string) => void;
    onCardClick?: (filterType: string, filterValue: string) => void;
}

export const SoASummary: React.FC<SoASummaryProps> = ({ 
    soaStatuses, 
    onFilterChange, 
    onCardClick 
}) => {
    const metrics = useMemo((): SummaryMetrics => {
        const applicable = soaStatuses.filter(s => s.isApplicable === true);
        const implemented = applicable.filter(s => s.implementationStatus === 'Implemented');
        const planned = applicable.filter(s => s.implementationStatus === 'Planned');
        const inProgress = applicable.filter(s => s.implementationStatus === 'In Progress');
        const notApplicable = soaStatuses.filter(s => s.isApplicable === false);
        const highPriority = applicable.filter(s => s.priority === 'Critical' || s.priority === 'High');
        
        // Calculate overdue items (planned items past target date)
        const today = new Date();
        const overdue = applicable.filter(s => 
            s.targetDate && new Date(s.targetDate) < today && 
            s.implementationStatus !== 'Implemented'
        );
        
        // Calculate items due for review
        const dueReview = soaStatuses.filter(s => 
            s.nextReview && new Date(s.nextReview) <= new Date(Date.now() + 30*24*60*60*1000)
        );
        
        const progress = applicable.length > 0 ? 
            Math.round((implemented.length / applicable.length) * 100) : 0;
        
        return {
            total: soaStatuses.length,
            applicable: applicable.length,
            implemented: implemented.length,
            planned: planned.length,
            inProgress: inProgress.length,
            notApplicable: notApplicable.length,
            overdue: overdue.length,
            highPriority: highPriority.length,
            progress,
            dueReview: dueReview.length
        };
    }, [soaStatuses]);

    const handleCardClick = (filterType: string, filterValue: string) => {
        if (onCardClick) {
            onCardClick(filterType, filterValue);
        } else if (onFilterChange) {
            onFilterChange(filterType, filterValue);
        }
    };

    return (
        <div className="space-y-6 mb-8">
            {/* Main Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard 
                    icon={Shield} 
                    title="Total Controls" 
                    count={metrics.total} 
                    color="text-slate-600"
                    description="ISO 27001:2022 Annex A"
                />
                <SummaryCard 
                    icon={Target} 
                    title="Applicable Controls" 
                    count={metrics.applicable} 
                    color="text-blue-600"
                    description={`${metrics.notApplicable} not applicable`}
                    onClick={() => handleCardClick('applicability', 'applicable')}
                    isClickable={true}
                />
                <SummaryCard 
                    icon={CheckCircle} 
                    title="Implemented" 
                    count={metrics.implemented} 
                    color="text-green-600"
                    description={`${metrics.inProgress} in progress`}
                    onClick={() => handleCardClick('status', 'Implemented')}
                    isClickable={true}
                />
                <SummaryCard 
                    icon={TrendingUp} 
                    title="Implementation Progress" 
                    count={`${metrics.progress}%`} 
                    color="text-emerald-600"
                    description="Of applicable controls"
                    trend={{ value: 5, direction: 'up' }}
                />
            </div>

            {/* Secondary Metrics - Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 text-center hover:shadow-sm transition-shadow">
                    <div className="text-2xl font-bold text-orange-600">{metrics.planned}</div>
                    <div className="text-xs text-slate-600">Planned</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200 text-center hover:shadow-sm transition-shadow">
                    <div className="text-2xl font-bold text-blue-600">{metrics.inProgress}</div>
                    <div className="text-xs text-slate-600">In Progress</div>
                </div>
                
                <div 
                    className={`bg-white p-4 rounded-lg border border-slate-200 text-center hover:shadow-sm transition-all cursor-pointer ${
                        metrics.overdue > 0 ? 'hover:border-red-300' : ''
                    }`}
                    onClick={() => metrics.overdue > 0 && handleCardClick('overdue', 'true')}
                >
                    <div className={`text-2xl font-bold ${metrics.overdue > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                        {metrics.overdue}
                    </div>
                    <div className="text-xs text-slate-600">Overdue</div>
                </div>
                
                <div 
                    className="bg-white p-4 rounded-lg border border-slate-200 text-center hover:shadow-sm transition-all cursor-pointer hover:border-purple-300"
                    onClick={() => handleCardClick('priority', 'high')}
                >
                    <div className="text-2xl font-bold text-purple-600">{metrics.highPriority}</div>
                    <div className="text-xs text-slate-600">High Priority</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-slate-200 text-center hover:shadow-sm transition-shadow">
                    <div className="text-2xl font-bold text-slate-600">{metrics.notApplicable}</div>
                    <div className="text-xs text-slate-600">Not Applicable</div>
                </div>
                
                <div 
                    className={`bg-white p-4 rounded-lg border border-slate-200 text-center hover:shadow-sm transition-all cursor-pointer ${
                        metrics.dueReview > 0 ? 'hover:border-yellow-300' : ''
                    }`}
                    onClick={() => metrics.dueReview > 0 && handleCardClick('review', 'due')}
                >
                    <div className={`text-2xl font-bold ${metrics.dueReview > 0 ? 'text-yellow-600' : 'text-slate-400'}`}>
                        {metrics.dueReview}
                    </div>
                    <div className="text-xs text-slate-600">Due Review</div>
                </div>
            </div>

            {/* Alert Banners for Urgent Items */}
            {(metrics.overdue > 0 || metrics.dueReview > 0) && (
                <div className="space-y-3">
                    {metrics.overdue > 0 && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                            <div className="flex items-center">
                                <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                                <div>
                                    <h3 className="text-sm font-medium text-red-800">
                                        {metrics.overdue} control{metrics.overdue > 1 ? 's' : ''} overdue for implementation
                                    </h3>
                                    <p className="text-sm text-red-700 mt-1">
                                        Review and update target dates for overdue controls.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {metrics.dueReview > 0 && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 text-yellow-400 mr-2" />
                                <div>
                                    <h3 className="text-sm font-medium text-yellow-800">
                                        {metrics.dueReview} control{metrics.dueReview > 1 ? 's' : ''} due for review
                                    </h3>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        Schedule reviews to ensure controls remain effective.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};