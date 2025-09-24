// File: /app/risk/risk-register/components/RiskHeatmapSection.tsx

'use client'

import React, { useState } from 'react';
import { Plus, CheckSquare, FileText, BarChart3, Info, Activity } from 'lucide-react';
import { HeatmapCell, ActivityItem } from '../types';

interface RiskHeatmapSectionProps {
    heatmapData: HeatmapCell[][];
    recentActivity: ActivityItem[];
}

const HeatmapGrid: React.FC<{ data: HeatmapCell[][], onCellClick: (cell: HeatmapCell) => void }> = ({ 
    data, 
    onCellClick 
}) => {
    const getCellColor = (likelihood: number, impact: number, count: number) => {
        const riskScore = likelihood * impact;
        if (count === 0) return 'bg-gray-100 hover:bg-gray-200';
        if (riskScore >= 20) return 'bg-red-500 hover:bg-red-600 text-white';
        if (riskScore >= 15) return 'bg-red-300 hover:bg-red-400';
        if (riskScore >= 9) return 'bg-orange-200 hover:bg-orange-300';
        if (riskScore >= 6) return 'bg-yellow-200 hover:bg-yellow-300';
        return 'bg-green-200 hover:bg-green-300';
    };

    const impactLabels = ['VH', 'H', 'M', 'L', 'VL'];
    const likelihoodLabels = ['VL', 'L', 'M', 'H', 'VH'];

    return (
        <div className="relative max-w-sm mx-auto">
            {/* Y-axis label */}
            <div className="absolute -left-8 top-1/2 transform -rotate-90 -translate-y-1/2 text-xs font-medium text-slate-500">
                Impact
            </div>
            
            {/* Heatmap Grid */}
            <div className="grid grid-rows-5 gap-0.5 ml-6">
                {data.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="grid grid-cols-5 gap-0.5">
                        <div className="flex items-center justify-end pr-2 text-xs text-slate-500 w-6">
                            {impactLabels[4 - rowIndex]}
                        </div>
                        {row.map((cell, colIndex) => (
                            <div
                                key={`cell-${rowIndex}-${colIndex}`}
                                className={`w-8 h-8 ${getCellColor(cell.likelihood, cell.impact, cell.count)} cursor-pointer rounded border flex items-center justify-center text-xs font-medium transition-colors`}
                                onClick={() => onCellClick(cell)}
                                title={`${cell.count} risks - Impact: ${impactLabels[4 - rowIndex]}, Likelihood: ${likelihoodLabels[colIndex]}`}
                            >
                                {cell.count}
                            </div>
                        ))}
                    </div>
                ))}
                
                {/* X-axis labels */}
                <div className="grid grid-cols-5 gap-0.5 mt-1">
                    <div className="w-6"></div>
                    {likelihoodLabels.map((label, index) => (
                        <div key={`x-label-${index}`} className="text-xs text-center text-slate-500 w-8">
                            {label}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* X-axis label */}
            <div className="text-center mt-2 text-xs font-medium text-slate-500">Likelihood</div>
        </div>
    );
};

const QuickActionsPanel: React.FC<{ recentActivity: ActivityItem[] }> = ({ recentActivity }) => {
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'risk_updated': return <CheckSquare className="w-2 h-2" />;
            case 'risk_created': return <Plus className="w-2 h-2" />;
            case 'risk_closed': return <CheckSquare className="w-2 h-2" />;
            case 'review_due': return <Activity className="w-2 h-2" />;
            default: return <Info className="w-2 h-2" />;
        }
    };

    const getActivityColor = (severity: string) => {
        switch (severity) {
            case 'success': return 'bg-green-500';
            case 'warning': return 'bg-yellow-500';
            case 'error': return 'bg-red-500';
            default: return 'bg-blue-500';
        }
    };

    const formatTimeAgo = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        return `${Math.floor(diffInHours / 24)} days ago`;
    };

    return (
        <>
            <h4 className="font-medium text-navy mb-4">Quick Actions</h4>
            
            <div className="space-y-3">
                <button className="w-full p-3 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors text-left">
                    <div className="flex items-center">
                        <Plus className="w-4 h-4 text-teal-600 mr-2" />
                        <div>
                            <p className="font-medium text-navy text-sm">Add New Risk</p>
                            <p className="text-xs text-slate-500">Create and assess new risk</p>
                        </div>
                    </div>
                </button>
                
                <button className="w-full p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors text-left">
                    <div className="flex items-center">
                        <CheckSquare className="w-4 h-4 text-yellow-600 mr-2" />
                        <div>
                            <p className="font-medium text-navy text-sm">Bulk Actions</p>
                            <p className="text-xs text-slate-500">Manage multiple risks</p>
                        </div>
                    </div>
                </button>
                
                <button className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
                    <div className="flex items-center">
                        <FileText className="w-4 h-4 text-blue-600 mr-2" />
                        <div>
                            <p className="font-medium text-navy text-sm">Import Risks</p>
                            <p className="text-xs text-slate-500">From CSV or Excel</p>
                        </div>
                    </div>
                </button>
                
                <button className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
                    <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 text-purple-600 mr-2" />
                        <div>
                            <p className="font-medium text-navy text-sm">Risk Analytics</p>
                            <p className="text-xs text-slate-500">Detailed insights</p>
                        </div>
                    </div>
                </button>
            </div>
            
            {/* Recent Activity */}
            <div className="mt-6 pt-4 border-t border-slate-200">
                <h5 className="font-medium text-navy mb-3 text-sm">Recent Activity</h5>
                <div className="space-y-2">
                    {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-2">
                            <div className={`w-2 h-2 ${getActivityColor(activity.severity)} rounded-full mt-1.5 flex-shrink-0`}>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-slate-700 leading-relaxed">{activity.message}</p>
                                <p className="text-xs text-slate-500">{formatTimeAgo(activity.timestamp)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

// This component now returns the RIGHT COLUMN content only
// The left column content will be handled in the main layout
export const RiskHeatmapSection: React.FC<RiskHeatmapSectionProps> = ({ 
    heatmapData, 
    recentActivity 
}) => {
    const [selectedCell, setSelectedCell] = useState<HeatmapCell | null>(null);

    const handleCellClick = (cell: HeatmapCell) => {
        setSelectedCell(cell);
        console.log('Heatmap cell clicked:', cell);
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 h-fit">
            {/* Risk Heatmap */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-navy">Risk Heatmap</h3>
                    <button className="text-teal-600 hover:text-teal-700">
                        <Info className="w-4 h-4" />
                    </button>
                </div>
                
                <HeatmapGrid data={heatmapData} onCellClick={handleCellClick} />
                
                {/* Legend */}
                <div className="flex items-center justify-center space-x-3 mt-4 pt-3 border-t border-slate-200">
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-green-200 rounded"></div>
                        <span className="text-xs text-slate-500">Low</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                        <span className="text-xs text-slate-500">Medium</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-orange-200 rounded"></div>
                        <span className="text-xs text-slate-500">High</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded"></div>
                        <span className="text-xs text-slate-500">Critical</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
                <QuickActionsPanel recentActivity={recentActivity} />
            </div>
        </div>
    );
};