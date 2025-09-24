// File: /app/risk/asset-register/add/components/wizard/RiskSecurityStep.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { SmartField } from '../shared/SmartField';

interface RiskSecurityStepProps {
    formData: {
        assetType: string;
        knownVulnerabilities: string[];
        riskNotes: string;
    };
    onFieldChange: (field: string, value: any) => void;
}

// Risk data based on asset type
const RISKS_DATA: { [key: string]: string[] } = {
    'Software': [
        'Risk of exploitation due to unpatched vulnerabilities.',
        'Risk of license non-compliance.',
        'Risk of data breaches through application flaws.',
        'Risk of malware injection.',
        'Risk of unauthorized access through weak authentication.'
    ],
    'Hardware': [
        'Risk of physical theft or damage.',
        'Risk of hardware failure.',
        'Risk of unauthorized access to hardware.',
        'Risk of environmental damage (fire, flood).',
        'Risk of end-of-life support issues.'
    ],
    'Information': [
        'Risk of unauthorized data disclosure (data breach).',
        'Risk of data loss or corruption.',
        'Risk of non-compliance with data protection regulations.',
        'Risk of data classification errors.',
        'Risk of insider threat access.'
    ],
    'People': [
        'Risk of insider threat (malicious or accidental).',
        'Risk of social engineering attacks.',
        'Risk of knowledge loss when employee leaves.',
        'Risk of inadequate security training.',
        'Risk of privilege escalation.'
    ],
    'Services': [
        'Risk of service unavailability due to provider outage.',
        'Risk of data breach from a third-party service.',
        'Risk of vendor lock-in.',
        'Risk of SLA violations.',
        'Risk of supply chain attacks.'
    ],
    'Facilities': [
        'Risk of physical security breaches.',
        'Risk of environmental hazards (fire, flood, earthquake).',
        'Risk of power outages.',
        'Risk of unauthorized physical access.',
        'Risk of infrastructure failure.'
    ],
    'Intangible': [
        'Risk of intellectual property theft.',
        'Risk of reputation damage.',
        'Risk of regulatory compliance violations.',
        'Risk of contract disputes.',
        'Risk of brand dilution.'
    ]
};

export const RiskSecurityStep: React.FC<RiskSecurityStepProps> = ({
    formData,
    onFieldChange
}) => {
    const [customRisk, setCustomRisk] = useState('');
    const [suggestedRisks, setSuggestedRisks] = useState<string[]>([]);

    // Update suggested risks when asset type changes
    useEffect(() => {
        const risks = RISKS_DATA[formData.assetType] || [];
        setSuggestedRisks(risks);
        
        // Auto-select suggested risks if none are selected yet
        if (formData.knownVulnerabilities.length === 0 && risks.length > 0) {
            onFieldChange('knownVulnerabilities', risks);
        }
    }, [formData.assetType, formData.knownVulnerabilities.length, onFieldChange]);

    const handleRiskToggle = (risk: string) => {
        const currentRisks = formData.knownVulnerabilities;
        const newRisks = currentRisks.includes(risk)
            ? currentRisks.filter(r => r !== risk)
            : [...currentRisks, risk];
        onFieldChange('knownVulnerabilities', newRisks);
    };

    const handleAddCustomRisk = () => {
        const riskToAdd = customRisk.trim();
        if (!riskToAdd) return;
        
        if (!formData.knownVulnerabilities.includes(riskToAdd)) {
            onFieldChange('knownVulnerabilities', [...formData.knownVulnerabilities, riskToAdd]);
        }
        setCustomRisk('');
    };

    return (
        <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-amber-900 mb-2">Risk Assessment</h4>
                <p className="text-amber-800 text-sm">
                    Identify potential threats and vulnerabilities associated with this asset. 
                    Suggestions are provided based on the asset type selected.
                </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-medium text-gray-600 mb-3">
                    Known Threats / Vulnerabilities
                </label>
                
                {suggestedRisks.length > 0 ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mb-4">
                        {suggestedRisks.map((risk, index) => (
                            <label 
                                key={index} 
                                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.knownVulnerabilities.includes(risk)}
                                    onChange={() => handleRiskToggle(risk)}
                                    className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-gray-600 text-sm">{risk}</span>
                            </label>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                        <p className="text-sm text-blue-800 italic">
                            {formData.assetType 
                                ? `No predefined risks for "${formData.assetType}". You can add custom risks below.`
                                : 'Select an asset type to see suggested vulnerabilities.'
                            }
                        </p>
                    </div>
                )}

                {/* Custom Risk Input */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Add Custom Risk/Vulnerability
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customRisk}
                            onChange={(e) => setCustomRisk(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe a specific risk or vulnerability..."
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomRisk()}
                        />
                        <button
                            type="button"
                            onClick={handleAddCustomRisk}
                            disabled={!customRisk.trim()}
                            className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>

                {/* Selected Custom Risks */}
                {formData.knownVulnerabilities.filter(risk => !suggestedRisks.includes(risk)).length > 0 && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Custom Risks Added:
                        </label>
                        <div className="space-y-1">
                            {formData.knownVulnerabilities
                                .filter(risk => !suggestedRisks.includes(risk))
                                .map((risk, index) => (
                                    <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                                        <span className="text-sm text-blue-800">{risk}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRiskToggle(risk)}
                                            className="text-blue-600 hover:text-red-600 text-xs"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            <SmartField
                label="Risk Notes"
                type="textarea"
                value={formData.riskNotes}
                onChange={(value) => onFieldChange('riskNotes', value)}
                placeholder="Additional risk considerations, mitigation strategies, or context..."
                suggestion="Include specific mitigation measures, risk likelihood, impact assessment, or monitoring procedures"
            />

            {/* Risk Summary */}
            <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">Risk Summary</h4>
                <div className="text-sm text-slate-600">
                    <div className="flex justify-between items-center">
                        <span>Total Identified Risks:</span>
                        <span className="font-semibold">{formData.knownVulnerabilities.length}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span>Suggested Risks Selected:</span>
                        <span className="font-semibold">
                            {formData.knownVulnerabilities.filter(risk => suggestedRisks.includes(risk)).length}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span>Custom Risks Added:</span>
                        <span className="font-semibold">
                            {formData.knownVulnerabilities.filter(risk => !suggestedRisks.includes(risk)).length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};