// File: /app/policy-management/create/components/sections/RiskSection.tsx

import React, { useState } from 'react';
import { PolicyRisk } from '../../types/policy-create.types';

interface RiskSectionProps {
    linkedRisks: PolicyRisk[];
    onChange: (risks: PolicyRisk[]) => void;
}

const mockRisks: PolicyRisk[] = [
    {
        id: '1',
        title: 'Data Breach Risk',
        riskId: 'R-2024-003',
        level: 'High'
    },
    {
        id: '2',
        title: 'Compliance Violation',
        riskId: 'R-2024-007',
        level: 'Medium'
    }
];

export const RiskSection: React.FC<RiskSectionProps> = ({
    linkedRisks,
    onChange
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [risks] = useState(mockRisks);

    const getLevelColor = (level: PolicyRisk['level']) => {
        switch (level) {
            case 'High': return 'border-red-200 bg-red-50';
            case 'Medium': return 'border-yellow-200 bg-yellow-50';
            case 'Low': return 'border-green-200 bg-green-50';
            default: return 'border-gray-200 bg-gray-50';
        }
    };

    const getLevelBadgeColor = (level: PolicyRisk['level']) => {
        switch (level) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Linked Risks</h3>
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
            </div>
            
            {isExpanded && (
                <div className="space-y-3">
                    {risks.map((risk) => (
                        <div key={risk.id} className={`flex items-center justify-between p-3 border rounded-lg ${getLevelColor(risk.level)}`}>
                            <div>
                                <p className="font-medium text-gray-900">{risk.title}</p>
                                <p className="text-sm text-gray-600">Risk ID: {risk.riskId}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded ${getLevelBadgeColor(risk.level)}`}>
                                {risk.level}
                            </span>
                        </div>
                    ))}
                    
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:border-qireon-300 hover:text-qireon-600 transition-colors">
                        <i className="fa-solid fa-plus mr-2"></i>
                        Link additional risks
                    </button>
                </div>
            )}
        </section>
    );
};