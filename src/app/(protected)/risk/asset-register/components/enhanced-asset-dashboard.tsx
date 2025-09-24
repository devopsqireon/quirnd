// Enhanced Asset Dashboard & Analytics
'use client'

import React, { useMemo, useState } from 'react';
import { 
    Database, 
    ShieldAlert, 
    Server, 
    AlertTriangle, 
    TrendingUp, 
    PieChart,
    BarChart3,
    Users,
    Calendar,
    Target,
    Activity,
    Zap,
    Shield,
    Eye,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { Asset } from '@/types/asset';

interface AssetAnalytics {
    total: number;
    byType: Record<string, number>;
    byValue: { high: number; medium: number; low: number };
    byOwner: Record<string, number>;
    byStatus: Record<string, number>;
    riskDistribution: { withRisks: number; withoutRisks: number; criticalRisks: number };
    complianceStatus: { compliant: number; needsReview: number; nonCompliant: number };
    trends: { weeklyGrowth: number; monthlyGrowth: number };
    averageValue: number;
    topRiskyAssets: Asset[];
}

const AnalyticsCard: React.FC<{ 
    icon: React.ElementType; 
    title: string; 
    value: string | number; 
    change?: string;
    color: string;
    subtitle?: string;
    trend?: 'up' | 'down' | 'stable';
    onClick?: () => void;
}> = ({ icon: Icon, title, value, change, color, subtitle, trend, onClick }) => (
    <div 
        className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
    >
        <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-slate-500 font-medium">{title}</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
                    {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
                </div>
            </div>
            {change && (
                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    trend === 'up' ? 'bg-green-100 text-green-700' : 
                    trend === 'down' ? 'bg-red-100 text-red-700' : 
                    'bg-slate-100 text-slate-600'
                }`}>
                    {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {trend === 'down' && <TrendingUp className="w-3 h-3 rotate-180" />}
                    {change}
                </div>
            )}
        </div>
    </div>
);

const AssetTypeDistribution: React.FC<{ distribution: Record<string, number> }> = ({ distribution }) => {
    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500'];
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-slate-600" />
                Asset Distribution by Type
            </h3>
            <div className="space-y-3">
                {Object.entries(distribution).map(([type, count], index) => {
                    const percentage = Math.round((count / total) * 100);
                    return (
                        <div key={type} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                                <span className="text-sm text-slate-700 font-medium">{type}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-24 bg-slate-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${colors[index % colors.length]}`}
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-slate-600 w-12 text-right">{count}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const RiskHeatMap: React.FC<{ assets: Asset[] }> = ({ assets }) => {
    const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);

    const riskData = useMemo(() => {
        const highRisk = assets.filter(a => a.assetValue >= 12);
        const mediumRisk = assets.filter(a => a.assetValue >= 8 && a.assetValue < 12);
        const lowRisk = assets.filter(a => a.assetValue < 8);
        
        return [
            { level: 'Critical', count: highRisk.length, color: 'bg-red-500', assets: highRisk },
            { level: 'High', count: mediumRisk.length, color: 'bg-yellow-500', assets: mediumRisk },
            { level: 'Medium', count: lowRisk.length, color: 'bg-green-500', assets: lowRisk }
        ];
    }, [assets]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-slate-600" />
                Risk Heat Map
            </h3>
            <div className="grid grid-cols-3 gap-4">
                {riskData.map(({ level, count, color, assets: riskAssets }) => (
                    <div 
                        key={level}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedRiskLevel === level 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setSelectedRiskLevel(selectedRiskLevel === level ? null : level)}
                    >
                        <div className="text-center">
                            <div className={`w-8 h-8 rounded-full ${color} mx-auto mb-2`}></div>
                            <div className="text-lg font-bold text-slate-800">{count}</div>
                            <div className="text-xs text-slate-500">{level} Risk</div>
                        </div>
                    </div>
                ))}
            </div>
            
            {selectedRiskLevel && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">{selectedRiskLevel} Risk Assets:</h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                        {riskData.find(r => r.level === selectedRiskLevel)?.assets.slice(0, 5).map(asset => (
                            <div key={asset.id} className="flex justify-between items-center text-sm">
                                <span className="text-slate-700">{asset.name}</span>
                                <span className="text-slate-500 font-mono">{asset.id}</span>
                            </div>
                        ))}
                        {riskData.find(r => r.level === selectedRiskLevel)?.assets.length! > 5 && (
                            <div className="text-xs text-slate-400 text-center pt-2">
                                +{riskData.find(r => r.level === selectedRiskLevel)?.assets.length! - 5} more assets
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const TopAssetOwners: React.FC<{ assets: Asset[] }> = ({ assets }) => {
    const ownerStats = useMemo(() => {
        const ownerCounts = assets.reduce((acc, asset) => {
            acc[asset.owner] = (acc[asset.owner] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(ownerCounts)
            .map(([owner, count]) => ({
                owner,
                count,
                highValueAssets: assets.filter(a => a.owner === owner && a.assetValue >= 12).length,
                totalValue: assets.filter(a => a.owner === owner).reduce((sum, a) => sum + a.assetValue, 0)
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [assets]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-600" />
                Top Asset Owners
            </h3>
            <div className="space-y-3">
                {ownerStats.map((owner, index) => (
                    <div key={owner.owner} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                            </div>
                            <div>
                                <div className="font-medium text-slate-800">{owner.owner}</div>
                                <div className="text-xs text-slate-500">
                                    {owner.highValueAssets > 0 && (
                                        <span className="text-red-600 font-medium">
                                            {owner.highValueAssets} critical assets
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-semibold text-slate-800">{owner.count}</div>
                            <div className="text-xs text-slate-500">assets</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ComplianceOverview: React.FC<{ assets: Asset[] }> = ({ assets }) => {
    const complianceData = useMemo(() => {
        // Mock compliance data - in real app this would come from actual compliance assessments
        const total = assets.length;
        const compliant = Math.floor(total * 0.75);
        const needsReview = Math.floor(total * 0.20);
        const nonCompliant = total - compliant - needsReview;

        return [
            { status: 'Compliant', count: compliant, color: 'text-green-600', bgColor: 'bg-green-100' },
            { status: 'Needs Review', count: needsReview, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
            { status: 'Non-Compliant', count: nonCompliant, color: 'text-red-600', bgColor: 'bg-red-100' }
        ];
    }, [assets]);

    const compliancePercentage = Math.round((complianceData[0].count / assets.length) * 100);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-slate-600" />
                Compliance Overview
            </h3>
            
            <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-600">{compliancePercentage}%</div>
                <div className="text-sm text-slate-500">Overall Compliance Rate</div>
            </div>

            <div className="space-y-3">
                {complianceData.map(({ status, count, color, bgColor }) => (
                    <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${bgColor}`}></div>
                            <span className="text-sm text-slate-700">{status}</span>
                        </div>
                        <span className={`text-sm font-semibold ${color}`}>{count}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-800 font-medium">Next Compliance Review</div>
                <div className="text-sm text-blue-600">Due: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
            </div>
        </div>
    );
};

const RecentActivity: React.FC<{ assets: Asset[] }> = ({ assets }) => {
    const recentActivities = useMemo(() => [
        { id: 1, type: 'added', asset: 'Web Server 03', user: 'John Smith', time: '2 hours ago', icon: Database, color: 'text-green-600' },
        { id: 2, type: 'updated', asset: 'Customer Database', user: 'Sarah Johnson', time: '4 hours ago', icon: Eye, color: 'text-blue-600' },
        { id: 3, type: 'risk_identified', asset: 'Email Server', user: 'Mike Wilson', time: '1 day ago', icon: AlertTriangle, color: 'text-red-600' },
        { id: 4, type: 'compliance_check', asset: 'HR System', user: 'Lisa Chen', time: '2 days ago', icon: Shield, color: 'text-purple-600' },
        { id: 5, type: 'decommissioned', asset: 'Old Backup Server', user: 'Tom Brown', time: '3 days ago', icon: Server, color: 'text-slate-600' }
    ], []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-slate-600" />
                Recent Activity
            </h3>
            <div className="space-y-3">
                {recentActivities.map(activity => {
                    const Icon = activity.icon;
                    return (
                        <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                            <div className={`p-1.5 rounded-full bg-slate-100`}>
                                <Icon className={`w-4 h-4 ${activity.color}`} />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-slate-800">
                                    <span className="font-medium">{activity.asset}</span> was {activity.type.replace('_', ' ')}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                    by {activity.user} • {activity.time}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const EnhancedAssetSummary: React.FC<{ 
    assets: Asset[];
    onCardClick?: (type: string) => void;
}> = ({ assets, onCardClick }) => {
    const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);

    const analytics = useMemo((): AssetAnalytics => {
        const byType = assets.reduce((acc, asset) => {
            acc[asset.assetType] = (acc[asset.assetType] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const byOwner = assets.reduce((acc, asset) => {
            acc[asset.owner] = (acc[asset.owner] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const byStatus = assets.reduce((acc, asset) => {
            acc[asset.status] = (acc[asset.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const withRisks = assets.filter(a => a.associatedRisks && a.associatedRisks.length > 0).length;
        const criticalRisks = assets.filter(a => a.associatedRisks?.some(r => r.status === 'Open' && r.severity === 'High')).length;

        return {
            total: assets.length,
            byType,
            byValue: {
                high: assets.filter(a => a.assetValue >= 12).length,
                medium: assets.filter(a => a.assetValue >= 8 && a.assetValue < 12).length,
                low: assets.filter(a => a.assetValue < 8).length
            },
            byOwner,
            byStatus,
            riskDistribution: {
                withRisks,
                withoutRisks: assets.length - withRisks,
                criticalRisks
            },
            complianceStatus: {
                compliant: Math.floor(assets.length * 0.75),
                needsReview: Math.floor(assets.length * 0.20),
                nonCompliant: Math.floor(assets.length * 0.05)
            },
            trends: {
                weeklyGrowth: 5.2,
                monthlyGrowth: 12.8
            },
            averageValue: Math.round(assets.reduce((sum, a) => sum + a.assetValue, 0) / assets.length * 10) / 10,
            topRiskyAssets: assets
                .filter(a => a.assetValue >= 12)
                .sort((a, b) => b.assetValue - a.assetValue)
                .slice(0, 5)
        };
    }, [assets]);

    return (
        <div className="space-y-6 mb-8">
            {/* Primary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard 
                    icon={Database} 
                    title="Total Assets" 
                    value={analytics.total}
                    change="+5.2%"
                    trend="up"
                    color="text-blue-600"
                    subtitle="Active inventory"
                    onClick={() => onCardClick?.('total')}
                />
                <AnalyticsCard 
                    icon={ShieldAlert} 
                    title="Critical Assets" 
                    value={analytics.byValue.high}
                    change={`${Math.round((analytics.byValue.high / analytics.total) * 100)}%`}
                    color="text-red-600"
                    subtitle="Value ≥12 risk score"
                    onClick={() => onCardClick?.('critical')}
                />
                <AnalyticsCard 
                    icon={AlertTriangle} 
                    title="Assets with Open Risks" 
                    value={analytics.riskDistribution.withRisks}
                    change={`${analytics.riskDistribution.criticalRisks} critical`}
                    color="text-orange-600"
                    subtitle="Requiring attention"
                    onClick={() => onCardClick?.('risks')}
                />
                <AnalyticsCard 
                    icon={TrendingUp} 
                    title="Avg Risk Score" 
                    value={analytics.averageValue}
                    change="+0.3"
                    trend="up"
                    color="text-purple-600"
                    subtitle="Across all assets"
                    onClick={() => onCardClick?.('average')}
                />
            </div>

            {/* Toggle for Detailed Analytics */}
            <div className="flex justify-center">
                <button
                    onClick={() => setShowDetailedAnalytics(!showDetailedAnalytics)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    {showDetailedAnalytics ? (
                        <>
                            <ChevronUp className="w-4 h-4" />
                            Hide Detailed Analytics
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" />
                            Show Detailed Analytics
                        </>
                    )}
                </button>
            </div>

            {/* Detailed Analytics */}
            {showDetailedAnalytics && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AssetTypeDistribution distribution={analytics.byType} />
                    <RiskHeatMap assets={assets} />
                    <TopAssetOwners assets={assets} />
                    <ComplianceOverview assets={assets} />
                    <RecentActivity assets={assets} />
                    
                    {/* Quick Actions Panel */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-slate-600" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                                Generate Risk Report
                            </button>
                            <button className="w-full p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                                Schedule Compliance Review
                            </button>
                            <button className="w-full p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
                                Export Asset Inventory
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export type { AssetAnalytics };
                            