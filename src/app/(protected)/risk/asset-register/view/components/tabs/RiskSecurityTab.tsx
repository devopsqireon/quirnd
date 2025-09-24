// File: /app/risk/asset-register/view/components/tabs/RiskSecurityTab.tsx (FIXED)
'use client'

import React from 'react';
import { AlertTriangle, Shield, ExternalLink } from 'lucide-react';
import { Asset } from '../../types';

interface RiskSecurityTabProps {
    asset: Asset;
}

// Helper functions - moved to the top of the file
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

export const RiskSecurityTab: React.FC<RiskSecurityTabProps> = ({ asset }) => {
    return (
        <div className="py-6 space-y-8">
            {/* Associated Risks Section */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    <h3 className="text-lg font-semibold text-slate-700">Associated Risks</h3>
                </div>
                
                {asset.associatedRisks && asset.associatedRisks.length > 0 ? (
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-3 text-left font-semibold text-slate-600">Risk ID</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">Title</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">Status</th>
                                    <th className="p-3 text-left font-semibold text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {asset.associatedRisks.map((risk, index) => (
                                    <tr key={index} className="border-b border-slate-200 last:border-b-0">
                                        <td className="p-3">
                                            <code className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                {risk.riskId}
                                            </code>
                                        </td>
                                        <td className="p-3 text-slate-700">{risk.title}</td>
                                        <td className="p-3">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskStatusColor(risk.status)}`}>
                                                {risk.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                                                View Details <ExternalLink size={12} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 text-sm">No associated risks identified for this asset.</p>
                    </div>
                )}
            </div>

            {/* Known Vulnerabilities Section */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-orange-500" />
                    <h3 className="text-lg font-semibold text-slate-700">Known Vulnerabilities</h3>
                </div>
                
                {asset.knownVulnerabilities && asset.knownVulnerabilities.length > 0 ? (
                    <div className="space-y-3">
                        {asset.knownVulnerabilities.map((vulnerability, index) => (
                            <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-amber-800">{vulnerability}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 text-sm">No known vulnerabilities identified.</p>
                    </div>
                )}
            </div>

            {/* Risk Assessment Summary */}
            <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Risk Assessment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{asset.confidentiality}</div>
                            <div className="text-sm text-slate-600">Confidentiality</div>
                            <div className="text-xs text-slate-500 mt-1">{getCiaLabel(asset.confidentiality)}</div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{asset.integrity}</div>
                            <div className="text-sm text-slate-600">Integrity</div>
                            <div className="text-xs text-slate-500 mt-1">{getCiaLabel(asset.integrity)}</div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{asset.availability}</div>
                            <div className="text-sm text-slate-600">Availability</div>
                            <div className="text-xs text-slate-500 mt-1">{getCiaLabel(asset.availability)}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Notes */}
            {asset.riskNotes && (
                <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Risk Notes & Mitigation</h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{asset.riskNotes}</p>
                    </div>
                </div>
            )}
        </div>
    );
};