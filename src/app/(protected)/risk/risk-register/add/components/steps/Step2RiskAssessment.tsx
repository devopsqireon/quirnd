// File: /app/risk/risk-register/add/components/steps/Step2RiskAssessment.tsx

'use client'

import React, { useEffect, useState } from 'react';
import { Calculator, AlertTriangle, TrendingUp, Target } from 'lucide-react';
import { AddRiskFormData, ValidationError } from '../../types';

interface Step2RiskAssessmentProps {
    formData: AddRiskFormData;
    onChange: (data: Partial<AddRiskFormData>) => void;
    errors: ValidationError[];
}

const likelihoodLevels = [
    { value: 'Very Low', score: 1, description: 'Rare - may occur only in exceptional circumstances (< 10%)', color: 'bg-green-100 text-green-800' },
    { value: 'Low', score: 2, description: 'Unlikely - could occur at some time (10-30%)', color: 'bg-green-200 text-green-800' },
    { value: 'Medium', score: 3, description: 'Possible - might occur at some time (30-60%)', color: 'bg-yellow-200 text-yellow-800' },
    { value: 'High', score: 4, description: 'Likely - will probably occur in most circumstances (60-80%)', color: 'bg-orange-200 text-orange-800' },
    { value: 'Very High', score: 5, description: 'Almost certain - expected to occur in most circumstances (> 80%)', color: 'bg-red-200 text-red-800' }
];

const impactLevels = [
    { value: 'Very Low', score: 1, description: 'Negligible impact on operations, reputation, or finances', color: 'bg-green-100 text-green-800' },
    { value: 'Low', score: 2, description: 'Minor impact with limited business disruption', color: 'bg-green-200 text-green-800' },
    { value: 'Medium', score: 3, description: 'Moderate impact affecting some business functions', color: 'bg-yellow-200 text-yellow-800' },
    { value: 'High', score: 4, description: 'Major impact with significant business disruption', color: 'bg-orange-200 text-orange-800' },
    { value: 'Very High', score: 5, description: 'Severe impact threatening business viability', color: 'bg-red-200 text-red-800' }
];

export const Step2RiskAssessment: React.FC<Step2RiskAssessmentProps> = ({
    formData,
    onChange,
    errors
}) => {
    const [showMatrix, setShowMatrix] = useState(false);

    // Calculate risk score and level when likelihood or impact changes
    useEffect(() => {
        if (formData.likelihoodScore && formData.impactScore) {
            const riskScore = formData.likelihoodScore * formData.impactScore;
            let riskLevel = 'Low';
            
            if (riskScore >= 20) riskLevel = 'Critical';
            else if (riskScore >= 15) riskLevel = 'High';
            else if (riskScore >= 9) riskLevel = 'High';
            else if (riskScore >= 6) riskLevel = 'Medium';
            
            onChange({
                riskScore,
                riskLevel
            });
        }
    }, [formData.likelihoodScore, formData.impactScore, onChange]);

    const getFieldError = (fieldName: string) => {
        return errors.find(error => error.field === fieldName);
    };

    const handleLikelihoodChange = (likelihood: string, score: number) => {
        onChange({
            likelihood,
            likelihoodScore: score
        });
    };

    const handleImpactChange = (impact: string, score: number) => {
        onChange({
            impact,
            impactScore: score
        });
    };

    const getRiskLevelColor = (level: string) => {
        switch (level) {
            case 'Critical': return 'bg-red-600 text-white';
            case 'High': return 'bg-red-500 text-white';
            case 'Medium': return 'bg-yellow-500 text-white';
            case 'Low': return 'bg-green-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getMatrixCellColor = (l: number, i: number) => {
        const score = l * i;
        if (score >= 20) return 'bg-red-600 text-white';
        if (score >= 15) return 'bg-red-400 text-white';
        if (score >= 9) return 'bg-orange-300 text-slate-800';
        if (score >= 6) return 'bg-yellow-300 text-slate-800';
        return 'bg-green-300 text-slate-800';
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                    <Calculator className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Risk Assessment</h2>
                <p className="text-slate-600">
                    Evaluate the likelihood and potential impact of this risk
                </p>
            </div>

            {/* Current Risk Summary */}
            {formData.riskScore > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-1">Current Risk Assessment</h3>
                            <p className="text-slate-600">Based on your likelihood and impact selections</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-slate-900">{formData.riskScore}</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(formData.riskLevel)}`}>
                                    {formData.riskLevel} Risk
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Score: {formData.likelihoodScore} × {formData.impactScore} = {formData.riskScore}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Likelihood Assessment */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-5 h-5 text-teal-600" />
                        <h3 className="text-lg font-semibold text-slate-900">Likelihood Assessment</h3>
                    </div>
                    
                    <div className="space-y-3">
                        {likelihoodLevels.map((level) => (
                            <label
                                key={level.value}
                                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-teal-300 ${
                                    formData.likelihood === level.value
                                        ? 'border-teal-500 bg-teal-50'
                                        : 'border-slate-200'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="likelihood"
                                    value={level.value}
                                    checked={formData.likelihood === level.value}
                                    onChange={() => handleLikelihoodChange(level.value, level.score)}
                                    className="sr-only"
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-medium text-slate-700">
                                            {level.score}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{level.value}</div>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${level.color}`}>
                                        {level.value}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-2 ml-11">
                                    {level.description}
                                </p>
                            </label>
                        ))}
                    </div>
                    
                    {getFieldError('likelihood') && (
                        <p className="text-sm text-red-600">{getFieldError('likelihood')?.message}</p>
                    )}
                </div>

                {/* Impact Assessment */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Target className="w-5 h-5 text-teal-600" />
                        <h3 className="text-lg font-semibold text-slate-900">Impact Assessment</h3>
                    </div>
                    
                    <div className="space-y-3">
                        {impactLevels.map((level) => (
                            <label
                                key={level.value}
                                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-teal-300 ${
                                    formData.impact === level.value
                                        ? 'border-teal-500 bg-teal-50'
                                        : 'border-slate-200'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="impact"
                                    value={level.value}
                                    checked={formData.impact === level.value}
                                    onChange={() => handleImpactChange(level.value, level.score)}
                                    className="sr-only"
                                />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-medium text-slate-700">
                                            {level.score}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{level.value}</div>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${level.color}`}>
                                        {level.value}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-2 ml-11">
                                    {level.description}
                                </p>
                            </label>
                        ))}
                    </div>
                    
                    {getFieldError('impact') && (
                        <p className="text-sm text-red-600">{getFieldError('impact')?.message}</p>
                    )}
                </div>
            </div>

            {/* Risk Matrix Visualization */}
            <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Risk Assessment Matrix</h3>
                    <button
                        type="button"
                        onClick={() => setShowMatrix(!showMatrix)}
                        className="text-sm font-medium text-teal-600 hover:text-teal-700"
                    >
                        {showMatrix ? 'Hide Matrix' : 'Show Matrix'}
                    </button>
                </div>
                
                {showMatrix && (
                    <div className="overflow-x-auto">
                        <div className="relative">
                            {/* Y-axis label */}
                            <div className="absolute -left-12 top-1/2 transform -rotate-90 -translate-y-1/2 text-sm font-medium text-slate-600">
                                Impact
                            </div>
                            
                            {/* Matrix */}
                            <div className="ml-8">
                                <div className="grid grid-rows-5 gap-1">
                                    {[5, 4, 3, 2, 1].map((impactScore) => (
                                        <div key={`impact-${impactScore}`} className="grid grid-cols-5 gap-1">
                                            <div className="flex items-center justify-end pr-2 text-xs text-slate-600 w-12">
                                                {impactScore === 5 ? 'VH' : 
                                                 impactScore === 4 ? 'H' :
                                                 impactScore === 3 ? 'M' :
                                                 impactScore === 2 ? 'L' : 'VL'}
                                            </div>
                                            {[1, 2, 3, 4, 5].map((likelihoodScore) => {
                                                const cellScore = likelihoodScore * impactScore;
                                                const isSelected = formData.likelihoodScore === likelihoodScore && formData.impactScore === impactScore;
                                                return (
                                                    <div
                                                        key={`cell-${likelihoodScore}-${impactScore}`}
                                                        className={`w-12 h-12 ${getMatrixCellColor(likelihoodScore, impactScore)} 
                                                            flex items-center justify-center text-sm font-bold rounded border-2 transition-all
                                                            ${isSelected ? 'border-slate-800 shadow-lg scale-110' : 'border-transparent'}`}
                                                    >
                                                        {cellScore}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                                
                                {/* X-axis labels */}
                                <div className="grid grid-cols-5 gap-1 mt-2 ml-12">
                                    {['VL', 'L', 'M', 'H', 'VH'].map((label, index) => (
                                        <div key={`likelihood-${index}`} className="text-xs text-center text-slate-600 w-12">
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* X-axis label */}
                            <div className="text-center mt-3 text-sm font-medium text-slate-600">Likelihood</div>
                        </div>
                        
                        {/* Legend */}
                        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-slate-300">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-green-300 rounded"></div>
                                <span className="text-sm text-slate-600">Low (1-8)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                                <span className="text-sm text-slate-600">Medium (9-14)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-orange-300 rounded"></div>
                                <span className="text-sm text-slate-600">High (15-19)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-red-500 rounded"></div>
                                <span className="text-sm text-slate-600">Critical (20-25)</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Assessment Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    Assessment Guidelines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-slate-900 mb-2">Consider for Likelihood:</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Historical frequency of similar events</li>
                            <li>• Current control effectiveness</li>
                            <li>• External threat environment</li>
                            <li>• Organizational vulnerabilities</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-slate-900 mb-2">Consider for Impact:</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Financial losses or costs</li>
                            <li>• Operational disruption</li>
                            <li>• Regulatory penalties</li>
                            <li>• Reputation damage</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );