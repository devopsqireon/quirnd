// File: /app/risk/risk-register/components/ComplianceIntegrationSection.tsx

'use client'

import React from 'react';
import { Shield, FileText, ExternalLink, TrendingUp, AlertTriangle, Package, Users } from 'lucide-react';
import { AssetRiskSummary, ComplianceControl } from '../types';

interface ComplianceIntegrationSectionProps {
    assetRiskSummaries: AssetRiskSummary[];
    complianceControls: ComplianceControl[];
    overallComplianceScore: number;
}

const AssetRiskCard: React.FC<{ asset: AssetRiskSummary }> = ({ asset }) => {
    const getAssetIcon = (type: string) => {
        switch (type) {
            case 'database': return <Package className="w-5 h-5 text-blue-600" />;
            case 'server': return <Package className="w-5 h-5 text-green-600" />;
            case 'vendor': return <Users className="w-5 h-5 text-purple-600" />;
            default: return <Package className="w-5 h-5 text-slate-600" />;
        }
    };

    const getClassificationColor = (classification: string) => {
        switch (classification) {
            case 'Critical': return 'bg-red-100 text-red-800';
            case 'High': return 'bg-yellow-100 text-yellow-800';
            case 'Medium': return 'bg-blue-100 text-blue-800';
            case 'Low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRiskScoreColor = (score: number) => {
        if (score >= 20) return 'bg-red-500 text-white';
        if (score >= 15) return 'bg-orange-400 text-white';
        if (score >= 9) return 'bg-yellow-400 text-white';
        return 'bg-green-400 text-white';
    };

    return (
        <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                        {getAssetIcon(asset.type)}
                    </div>
                    <div>
                        <h4 className="font-medium text-slate-900">{asset.name}</h4>
                        <p className="text-sm text-slate-500">{asset.id}</p>
                    </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getClassificationColor(asset.classification)}`}>
                    {asset.classification}
                </span>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Associated Risks:</span>
                    <span className="font-medium text-slate-900">{asset.associatedRisks}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Highest Risk Score:</span>
                    <span className={`px-2 py-1 text-xs rounded ${getRiskScoreColor(asset.highestRiskScore)}`}>
                        {asset.highestRiskScore}
                    </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Last Assessment:</span>
                    <span className="text-slate-900">{asset.lastAssessment}</span>
                </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-1.5 bg-teal-50 text-teal-700 rounded text-sm hover:bg-teal-100 transition-colors">
                        View Risks
                    </button>
                    <button className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded text-sm hover:bg-slate-50 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ComplianceControlCard: React.FC<{ control: ComplianceControl }> = ({ control }) => {
    const getComplianceColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-green-500';
        if (percentage >= 75) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Compliant': return 'text-green-600';
            case 'Partial': return 'text-yellow-600';
            case 'Non-Compliant': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-900">{control.name}</h4>
                <span className="text-sm text-teal-600 font-medium">{control.id}</span>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Linked Risks:</span>
                    <span className="font-medium text-slate-900">{control.linkedRisks}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Critical:</span>
                    <span className={control.criticalRisks > 0 ? "text-red-600 font-medium" : "text-slate-900"}>
                        {control.criticalRisks}
                    </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                    <div 
                        className={`h-2 rounded-full ${getComplianceColor(control.compliancePercentage)}`} 
                        style={{ width: `${control.compliancePercentage}%` }}
                    />
                </div>
                <p className={`text-xs text-center mt-1 ${getStatusColor(control.status)}`}>
                    {control.compliancePercentage}% Compliant
                </p>
            </div>
        </div>
    );
};

export const ComplianceIntegrationSection: React.FC<ComplianceIntegrationSectionProps> = ({
    assetRiskSummaries,
    complianceControls,
    overallComplianceScore
}) => {
    return (
        <>
            {/* Asset-Risk Integration Panel */}
            <section className="px-8 py-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-navy">Asset-Risk Integration</h3>
                            <p className="text-slate-500 mt-1">View risks associated with critical assets</p>
                        </div>
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                            View Asset Register
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assetRiskSummaries.map((asset) => (
                            <AssetRiskCard key={asset.id} asset={asset} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ISO 27001 Compliance Dashboard */}
            <section className="px-8 py-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-navy">ISO 27001 Compliance Overview</h3>
                            <p className="text-slate-500 mt-1">Risk alignment with Annex A controls</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-teal-600">{overallComplianceScore}%</p>
                                <p className="text-xs text-slate-500">Compliance Score</p>
                            </div>
                            <button className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors text-sm">
                                Generate Report
                            </button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {complianceControls.map((control) => (
                            <ComplianceControlCard key={control.id} control={control} />
                        ))}
                    </div>
                    
                    {/* Detailed Control Mapping */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <h4 className="font-medium text-navy mb-4">Most Critical Control Gaps</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-900">A.9.2 - User Access Management</p>
                                    <p className="text-sm text-slate-500">2 critical risks require immediate attention</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">Critical</span>
                                    <button className="text-teal-600 hover:text-teal-700">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div>
                                    <p className="font-medium text-slate-900">A.15.1 - Information Security in Supplier Relationships</p>
                                    <p className="text-sm text-slate-500">3 high risks need review and treatment planning</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded">High</span>
                                    <button className="text-teal-600 hover:text-teal-700">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};