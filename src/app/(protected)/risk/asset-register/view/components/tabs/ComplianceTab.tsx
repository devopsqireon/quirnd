// File: /app/risk/asset-register/view/components/tabs/ComplianceTab.tsx
'use client'

import React from 'react';
import { CheckCircle, XCircle, FileText, Shield } from 'lucide-react';
import { Asset } from '../../types';

interface ComplianceTabProps {
    asset: Asset;
}

export const ComplianceTab: React.FC<ComplianceTabProps> = ({ asset }) => {
    const completedItems = asset.complianceItems?.filter(item => item.checked) || [];
    const totalItems = asset.complianceItems?.length || 0;
    const compliancePercentage = totalItems > 0 ? Math.round((completedItems.length / totalItems) * 100) : 0;

    return (
        <div className="py-6 space-y-8">
            {/* Compliance Overview */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg font-semibold text-slate-700">Compliance Overview</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{compliancePercentage}%</div>
                            <div className="text-sm text-slate-600">Compliance Rate</div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{completedItems.length}</div>
                            <div className="text-sm text-slate-600">Items Completed</div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{totalItems - completedItems.length}</div>
                            <div className="text-sm text-slate-600">Items Pending</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compliance Items */}
            <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Compliance Checklist</h3>
                
                {asset.complianceItems && asset.complianceItems.length > 0 ? (
                    <div className="space-y-3">
                        {asset.complianceItems.map(item => (
                            <div key={item.id} className={`flex items-center gap-3 p-4 rounded-lg border ${
                                item.checked 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-gray-50 border-gray-200'
                            }`}>
                                {item.checked ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                                <span className={`text-sm font-medium ${
                                    item.checked ? 'text-green-800' : 'text-gray-700'
                                }`}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 text-sm">No compliance items defined for this asset.</p>
                    </div>
                )}
            </div>

            {/* Regulatory Requirements */}
            <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Regulatory Requirements</h3>
                
                {asset.regulatoryRelevance && asset.regulatoryRelevance.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {asset.regulatoryRelevance.map((requirement, index) => (
                            <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-purple-600" />
                                    <span className="font-medium text-purple-800">{requirement}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">No specific regulatory requirements identified.</p>
                    </div>
                )}
            </div>

            {/* Audit References */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-slate-700">Audit References</h3>
                </div>
                
                {asset.auditReference ? (
                    <div className="space-y-3">
                        {asset.auditReference.split(',').map((reference, index) => (
                            <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <code className="font-medium text-blue-800 bg-blue-100 px-2 py-1 rounded">
                                        {reference.trim()}
                                    </code>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-600 text-sm">No audit references available for this asset.</p>
                    </div>
                )}
            </div>
        </div>
    );
};