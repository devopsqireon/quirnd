// File: /app/risk/risk-register/view/[id]/components/tabs/OverviewTab.tsx

import { useState } from 'react';
import { 
    AlertTriangle, 
    Shield, 
    Calendar, 
    User, 
    Building, 
    Clock, 
    TrendingUp,
    Target,
    Users,
    Tag,
    Activity,
    ChevronRight,
    ExternalLink,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

interface Risk {
    id: string;
    title: string;
    description: string;
    category: string;
    status?: 'Open' | 'In Progress' | 'Under Review' | 'Closed';
    priority?: 'Critical' | 'High' | 'Medium' | 'Low';
    likelihood?: number;
    impact?: number | { financial: number; operational: number; reputational: number };
    riskScore?: number;
    riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low';
    owner?: string;
    assignee?: string;
    businessUnit?: string;
    department?: string;
    dateIdentified?: string;
    dateCreated?: string;
    dueDate?: string;
    lastReviewed?: string;
    nextReview?: string;
    progress?: number;
    tags?: string[];
    controls?: Control[];
    assets?: Asset[];
    impact_analysis?: {
        financial?: { level?: string; description?: string; amount?: string };
        operational?: { level?: string; description?: string };
        reputational?: { level?: string; description?: string };
        regulatory?: { level?: string; description?: string };
    };
    // Legacy properties
    likelihoodScore?: number;
    impactScore?: number;
}

interface Control {
    id: string;
    name: string;
    type: 'Preventive' | 'Detective' | 'Corrective';
    effectiveness: 'High' | 'Medium' | 'Low';
    status: 'Active' | 'Inactive' | 'Planned';
    owner: string;
    testDate: string;
    nextTest: string;
}

interface Asset {
    id: string;
    name: string;
    type: string;
    criticality: 'Critical' | 'High' | 'Medium' | 'Low';
    owner: string;
}

interface OverviewTabProps {
    risk: Risk;
    metrics?: {
        financial?: any;
        operational?: any;
        reputational?: any;
        recentActivity?: Array<{
            action: string;
            user: string;
            date: string;
        }>;
        [key: string]: any;
    };
}

const getRiskLevelColor = (level: string | undefined) => {
    if (!level) return 'text-slate-600 bg-slate-50 border-slate-200';
    switch (level.toLowerCase()) {
        case 'critical': return 'text-red-600 bg-red-50 border-red-200';
        case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
        case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'low': return 'text-green-600 bg-green-50 border-green-200';
        default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
};

const getStatusColor = (status: string | undefined) => {
    if (!status) return 'text-slate-600 bg-slate-50 border-slate-200';
    switch (status) {
        case 'Open': return 'text-red-600 bg-red-50 border-red-200';
        case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
        case 'Under Review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'Closed': return 'text-green-600 bg-green-50 border-green-200';
        default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
};

const getImpactColor = (level: string | undefined) => {
    if (!level) return 'bg-slate-400';
    switch (level.toLowerCase()) {
        case 'critical': return 'bg-red-500';
        case 'high': return 'bg-orange-500';
        case 'medium': return 'bg-yellow-500';
        case 'low': return 'bg-green-500';
        default: return 'bg-slate-400';
    }
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
};

// Helper function to get impact score as number
const getImpactScore = (impact: number | { financial: number; operational: number; reputational: number } | undefined): number => {
    if (typeof impact === 'number') {
        return impact;
    }
    if (typeof impact === 'object' && impact !== null) {
        // Take the highest impact score from the object
        return Math.max(impact.financial || 0, impact.operational || 0, impact.reputational || 0);
    }
    return 0;
};

export function OverviewTab({ risk, metrics }: OverviewTabProps) {
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

    // Safe access to controls and assets with fallback to empty arrays
    const controls = risk.controls || [];
    const assets = risk.assets || [];

    // Get impact score safely
    const impactScore = getImpactScore(risk.impact);

    // Debug check to ensure risk is properly defined
    if (!risk || typeof risk !== 'object') {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">Invalid Risk Data</h3>
                    <p className="text-slate-600">The risk data is not properly formatted.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Risk Assessment Summary */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <h3 className="text-lg font-semibold text-slate-900 mb-6">Risk Assessment</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                {/* Likelihood */}
                                <div className="text-center">
                                    <div className="text-sm font-medium text-slate-600 mb-2">Likelihood</div>
                                    <div className="relative">
                                        <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-200 flex items-center justify-center">
                                            <span className="text-xl font-bold text-slate-900">
                                                {risk.likelihood || risk.likelihoodScore || 0}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-500 mt-2">Scale 1-5</div>
                                    </div>
                                </div>
                                
                                {/* Impact */}
                                <div className="text-center">
                                    <div className="text-sm font-medium text-slate-600 mb-2">Impact</div>
                                    <div className="relative">
                                        <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-200 flex items-center justify-center">
                                            <span className="text-xl font-bold text-slate-900">
                                                {risk.impactScore || impactScore || 0}
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-500 mt-2">Scale 1-5</div>
                                    </div>
                                </div>
                                
                                {/* Risk Score */}
                                <div className="text-center">
                                    <div className="text-sm font-medium text-slate-600 mb-2">Risk Score</div>
                                    <div className="relative">
                                        <div className={`w-16 h-16 mx-auto rounded-full border-4 flex items-center justify-center ${getRiskLevelColor(risk.riskLevel)}`}>
                                            <span className="text-xl font-bold">{risk.riskScore || 0}</span>
                                        </div>
                                        <div className={`text-xs font-medium mt-2 ${risk.riskLevel === 'Critical' ? 'text-red-600' : risk.riskLevel === 'High' ? 'text-orange-600' : risk.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                                            {risk.riskLevel || 'Unknown'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Risk Level Indicator */}
                            <div className="flex items-center justify-center">
                                <div className={`px-6 py-3 rounded-full border ${getRiskLevelColor(risk.riskLevel)}`}>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        <span className="font-semibold">{risk.riskLevel || 'Unknown'} Risk Level</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Impact Analysis */}
                        {risk.impact_analysis && typeof risk.impact_analysis === 'object' && (
                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-6">Impact Analysis</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Financial Impact */}
                                    {risk.impact_analysis.financial && typeof risk.impact_analysis.financial === 'object' && (
                                        <div className="p-4 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className={`w-3 h-3 rounded-full ${getImpactColor(risk.impact_analysis.financial.level)}`}></div>
                                                <h4 className="font-medium text-slate-900">Financial Impact</h4>
                                                <span className={`px-2 py-1 text-xs rounded-full border ${getRiskLevelColor(risk.impact_analysis.financial.level)}`}>
                                                    {risk.impact_analysis.financial.level || 'Unknown'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 mb-2">
                                                {risk.impact_analysis.financial.description || 'No description available'}
                                            </p>
                                            {risk.impact_analysis.financial.amount && (
                                                <div className="text-sm font-medium text-slate-900">
                                                    Estimated Impact: {risk.impact_analysis.financial.amount}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    {/* Operational Impact */}
                                    {risk.impact_analysis.operational && typeof risk.impact_analysis.operational === 'object' && (
                                        <div className="p-4 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className={`w-3 h-3 rounded-full ${getImpactColor(risk.impact_analysis.operational.level)}`}></div>
                                                <h4 className="font-medium text-slate-900">Operational Impact</h4>
                                                <span className={`px-2 py-1 text-xs rounded-full border ${getRiskLevelColor(risk.impact_analysis.operational.level)}`}>
                                                    {risk.impact_analysis.operational.level || 'Unknown'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600">
                                                {risk.impact_analysis.operational.description || 'No description available'}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {/* Reputational Impact */}
                                    {risk.impact_analysis.reputational && typeof risk.impact_analysis.reputational === 'object' && (
                                        <div className="p-4 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className={`w-3 h-3 rounded-full ${getImpactColor(risk.impact_analysis.reputational.level)}`}></div>
                                                <h4 className="font-medium text-slate-900">Reputational Impact</h4>
                                                <span className={`px-2 py-1 text-xs rounded-full border ${getRiskLevelColor(risk.impact_analysis.reputational.level)}`}>
                                                    {risk.impact_analysis.reputational.level || 'Unknown'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600">
                                                {risk.impact_analysis.reputational.description || 'No description available'}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {/* Regulatory Impact */}
                                    {risk.impact_analysis.regulatory && typeof risk.impact_analysis.regulatory === 'object' && (
                                        <div className="p-4 bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className={`w-3 h-3 rounded-full ${getImpactColor(risk.impact_analysis.regulatory.level)}`}></div>
                                                <h4 className="font-medium text-slate-900">Regulatory Impact</h4>
                                                <span className={`px-2 py-1 text-xs rounded-full border ${getRiskLevelColor(risk.impact_analysis.regulatory.level)}`}>
                                                    {risk.impact_analysis.regulatory.level || 'Unknown'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600">
                                                {risk.impact_analysis.regulatory.description || 'No description available'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Associated Assets */}
                        {assets.length > 0 && (
                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-6">Associated Assets</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {assets.map((asset) => (
                                        <div 
                                            key={asset.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                                selectedAsset === asset.id 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                            onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-slate-900 truncate">{asset.name}</h4>
                                                <span className={`px-2 py-1 text-xs rounded-full border ${getRiskLevelColor(asset.criticality)}`}>
                                                    {asset.criticality}
                                                </span>
                                            </div>
                                            <div className="text-sm text-slate-600 mb-2">{asset.type}</div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <User className="w-3 h-3" />
                                                <span>{asset.owner}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-blue-600 mt-2">
                                                <ExternalLink className="w-3 h-3" />
                                                <span>View Asset Details</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="space-y-6">
                        {/* Risk Details */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4">Risk Details</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Status</div>
                                    <span className={`inline-flex px-2 py-1 text-xs rounded-full border ${getStatusColor(risk.status)}`}>
                                        {risk.status || 'Unknown'}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Priority</div>
                                    <span className={`inline-flex px-2 py-1 text-xs rounded-full border ${getRiskLevelColor(risk.priority)}`}>
                                        {risk.priority || 'Unknown'}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Category</div>
                                    <div className="text-sm text-slate-600">{risk.category || 'Not specified'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Assignment & Ownership */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Assignment & Ownership
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Risk Owner</div>
                                    <div className="text-sm text-slate-900">{risk.owner || 'Not assigned'}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Assigned To</div>
                                    <div className="text-sm text-slate-900">{risk.assignee || 'Not assigned'}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Business Unit</div>
                                    <div className="text-sm text-slate-600">{risk.businessUnit || 'Not specified'}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Department</div>
                                    <div className="text-sm text-slate-600">{risk.department || 'Not specified'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Timeline
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Date Identified</div>
                                    <div className="text-sm text-slate-600">
                                        {risk.dateIdentified ? formatDate(risk.dateIdentified) : 'Not specified'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Due Date</div>
                                    <div className={`text-sm ${risk.dueDate && isOverdue(risk.dueDate) ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                                        {risk.dueDate ? formatDate(risk.dueDate) : 'Not specified'}
                                        {risk.dueDate && isOverdue(risk.dueDate) && (
                                            <span className="ml-1 text-xs">(Overdue)</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Last Reviewed</div>
                                    <div className="text-sm text-slate-600">
                                        {risk.lastReviewed ? formatDate(risk.lastReviewed) : 'Not reviewed'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Next Review</div>
                                    <div className="text-sm text-slate-600">
                                        {risk.nextReview ? formatDate(risk.nextReview) : 'Not scheduled'}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Progress */}
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-700">Progress</span>
                                    <span className="text-sm text-slate-600">{risk.progress || 0}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all"
                                        style={{ width: `${risk.progress || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Controls Summary */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Controls ({controls.length})
                            </h3>
                            {controls.length > 0 ? (
                                <div className="space-y-3">
                                    {controls.slice(0, 3).map((control) => (
                                        <div key={control.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-slate-900 truncate">{control.name}</div>
                                                <div className="text-xs text-slate-500">{control.type}</div>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full border ${getRiskLevelColor(control.effectiveness)}`}>
                                                {control.effectiveness}
                                            </span>
                                        </div>
                                    ))}
                                    {controls.length > 3 && (
                                        <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                                            View all {controls.length} controls →
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-sm text-slate-500">No controls added yet</div>
                            )}
                        </div>

                        {/* Tags */}
                        {risk.tags && risk.tags.length > 0 && (
                            <div className="bg-white rounded-lg border border-slate-200 p-4">
                                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {risk.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key Metrics */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Key Metrics
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-600">Active Controls</span>
                                    <span className="text-sm font-medium text-slate-900">
                                        {controls.filter(c => c.status === 'Active').length}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-600">Linked Assets</span>
                                    <span className="text-sm font-medium text-slate-900">{assets.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-600">Days Open</span>
                                    <span className="text-sm font-medium text-slate-900">
                                        {risk.dateCreated 
                                            ? Math.ceil((new Date().getTime() - new Date(risk.dateCreated).getTime()) / (1000 * 60 * 60 * 24))
                                            : 0
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Recent Activity
                            </h3>
                            <div className="space-y-3">
                                {metrics?.recentActivity && Array.isArray(metrics.recentActivity) ? (
                                    metrics.recentActivity.slice(0, 3).map((activity: any, index: number) => (
                                        <div key={index} className="text-sm">
                                            <div className="font-medium text-slate-900">
                                                {activity.action || activity.title || 'Unknown action'}
                                            </div>
                                            <div className="text-slate-500">{activity.user || 'Unknown user'}</div>
                                            <div className="text-xs text-slate-400">
                                                {activity.date ? formatDate(activity.date) : 
                                                 activity.timestamp ? formatDate(activity.timestamp) : 'Unknown date'}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="text-sm">
                                            <div className="font-medium text-slate-900">Risk assessment updated</div>
                                            <div className="text-slate-500">Sarah Johnson</div>
                                            <div className="text-xs text-slate-400">2 days ago</div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium text-slate-900">Control effectiveness reviewed</div>
                                            <div className="text-slate-500">Michael Chen</div>
                                            <div className="text-xs text-slate-400">5 days ago</div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium text-slate-900">Status changed to In Progress</div>
                                            <div className="text-slate-500">Emily Davis</div>
                                            <div className="text-xs text-slate-400">1 week ago</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}