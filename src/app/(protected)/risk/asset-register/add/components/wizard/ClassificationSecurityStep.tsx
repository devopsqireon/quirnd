// File: /app/risk/asset-register/add/components/wizard/ClassificationSecurityStep.tsx
'use client'

import React, { useMemo } from 'react';
import { SmartField } from '../shared/SmartField';
import { CLASSIFICATIONS } from '../../utils/constants';

interface ClassificationSecurityStepProps {
    formData: {
        classification: string;
        confidentiality: number;
        integrity: number;
        availability: number;
    };
    onFieldChange: (field: string, value: any) => void;
}

export const ClassificationSecurityStep: React.FC<ClassificationSecurityStepProps> = ({
    formData,
    onFieldChange
}) => {
    const overallCriticality = useMemo(() => {
        const total = formData.confidentiality + formData.integrity + formData.availability;
        if (total >= 12) return 'High';
        if (total >= 6) return 'Medium';
        return 'Low';
    }, [formData.confidentiality, formData.integrity, formData.availability]);

    return (
        <div className="space-y-6">
            <SmartField
                label="Information Classification"
                type="select"
                value={formData.classification}
                onChange={(value) => onFieldChange('classification', value)}
                options={CLASSIFICATIONS}
                required
            />

            <div>
                <h3 className="font-medium text-slate-900 mb-4">Risk Assessment (CIA Triad)</h3>
                <div className="grid grid-cols-3 gap-4">
                    {(['confidentiality', 'integrity', 'availability'] as const).map(field => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-slate-700 mb-2 capitalize">
                                {field}
                            </label>
                            <select
                                value={formData[field]}
                                onChange={(e) => onFieldChange(field, parseInt(e.target.value))}
                                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                            >
                                {[0, 1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>
                                        {num} - {num === 0 ? 'Not Applicable' : 
                                              num === 1 ? 'Very Low' :
                                              num === 2 ? 'Low' :
                                              num === 3 ? 'Moderate' :
                                              num === 4 ? 'High' : 'Very High'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Overall Risk Score:</span>
                        <span className={`px-3 py-1 text-sm font-bold rounded-full ${
                            overallCriticality === 'High' ? 'bg-red-100 text-red-800' :
                            overallCriticality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                            {formData.confidentiality + formData.integrity + formData.availability} - {overallCriticality}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};