// File: /app/risk/risk-register/add/components/steps/Step1BasicInfo.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { AlertTriangle, BookOpen, Lightbulb, Search } from 'lucide-react';
import { AddRiskFormData, RiskTemplate, ValidationError } from '../../types';

interface Step1BasicInfoProps {
    formData: AddRiskFormData;
    onChange: (data: Partial<AddRiskFormData>) => void;
    errors: ValidationError[];
}

const riskTemplates: RiskTemplate[] = [
    {
        id: 'data-breach',
        title: 'Data Breach',
        description: 'Unauthorized access to sensitive customer or business data',
        category: 'Information Security',
        commonControls: ['A.9.1', 'A.9.2', 'A.13.1'],
        typicalLikelihood: 'Medium',
        typicalImpact: 'High',
        mitigationSuggestions: ['Implement access controls', 'Data encryption', 'Regular security audits']
    },
    {
        id: 'system-failure',
        title: 'System/Infrastructure Failure',
        description: 'Critical system outage affecting business operations',
        category: 'Operational',
        commonControls: ['A.12.1', 'A.12.3', 'A.17.1'],
        typicalLikelihood: 'Low',
        typicalImpact: 'High',
        mitigationSuggestions: ['Implement redundancy', 'Regular maintenance', 'Disaster recovery planning']
    },
    {
        id: 'compliance-violation',
        title: 'Regulatory Compliance Violation',
        description: 'Non-compliance with legal or regulatory requirements',
        category: 'Legal/Compliance',
        commonControls: ['A.18.1', 'A.18.2'],
        typicalLikelihood: 'Medium',
        typicalImpact: 'High',
        mitigationSuggestions: ['Regular compliance reviews', 'Staff training', 'Legal consultation']
    },
    {
        id: 'vendor-risk',
        title: 'Third-Party/Vendor Risk',
        description: 'Risks arising from third-party service providers or suppliers',
        category: 'Supplier Risk',
        commonControls: ['A.15.1', 'A.15.2'],
        typicalLikelihood: 'Medium',
        typicalImpact: 'Medium',
        mitigationSuggestions: ['Vendor assessments', 'Contract management', 'Regular monitoring']
    }
];

const riskCategories = [
    'Information Security',
    'Operational',
    'Financial',
    'Legal/Compliance',
    'Supplier Risk',
    'Strategic'
];

const riskTypes = [
    'Internal Risk',
    'External Risk',
    'Technical Risk',
    'Business Process Risk',
    'Regulatory Risk',
    'Environmental Risk'
];

export const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({
    formData,
    onChange,
    errors
}) => {
    const [showTemplates, setShowTemplates] = useState(false);
    const [filteredTemplates, setFilteredTemplates] = useState(riskTemplates);
    const [templateSearch, setTemplateSearch] = useState('');

    useEffect(() => {
        if (templateSearch) {
            setFilteredTemplates(
                riskTemplates.filter(template =>
                    template.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
                    template.description.toLowerCase().includes(templateSearch.toLowerCase()) ||
                    template.category.toLowerCase().includes(templateSearch.toLowerCase())
                )
            );
        } else {
            setFilteredTemplates(riskTemplates);
        }
    }, [templateSearch]);

    const getFieldError = (fieldName: string) => {
        return errors.find(error => error.field === fieldName);
    };

    const handleTemplateSelect = (template: RiskTemplate) => {
        onChange({
            title: template.title,
            description: template.description,
            category: template.category,
            riskType: 'Business Process Risk' // Default
        });
        setShowTemplates(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                    <BookOpen className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Basic Risk Information</h2>
                <p className="text-slate-600">
                    Provide fundamental details about the risk you want to register
                </p>
            </div>

            {/* Template Selection */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-slate-900">Quick Start with Templates</h3>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        {showTemplates ? 'Hide Templates' : 'Browse Templates'}
                    </button>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">
                    Save time by starting with a common risk template, then customize as needed.
                </p>

                {showTemplates && (
                    <div className="space-y-4">
                        {/* Template Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search risk templates..."
                                value={templateSearch}
                                onChange={(e) => setTemplateSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                            />
                        </div>

                        {/* Template Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredTemplates.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => handleTemplateSelect(template)}
                                    className="p-4 bg-white border border-slate-200 rounded-lg hover:border-teal-300 hover:shadow-sm cursor-pointer transition-all"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-medium text-slate-900">{template.title}</h4>
                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                            {template.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>Likelihood: {template.typicalLikelihood}</span>
                                        <span>Impact: {template.typicalImpact}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredTemplates.length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No templates found matching your search.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Risk Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Risk Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => onChange({ title: e.target.value })}
                            placeholder="e.g., Unauthorized access to customer database"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                getFieldError('title') ? 'border-red-300' : 'border-slate-300'
                            }`}
                        />
                        {getFieldError('title') && (
                            <p className="mt-1 text-sm text-red-600">{getFieldError('title')?.message}</p>
                        )}
                    </div>

                    {/* Risk Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Risk Category *
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => onChange({ category: e.target.value })}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                getFieldError('category') ? 'border-red-300' : 'border-slate-300'
                            }`}
                        >
                            <option value="">Select a category</option>
                            {riskCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {getFieldError('category') && (
                            <p className="mt-1 text-sm text-red-600">{getFieldError('category')?.message}</p>
                        )}
                    </div>

                    {/* Risk Type */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Risk Type *
                        </label>
                        <select
                            value={formData.riskType}
                            onChange={(e) => onChange({ riskType: e.target.value })}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                getFieldError('riskType') ? 'border-red-300' : 'border-slate-300'
                            }`}
                        >
                            <option value="">Select risk type</option>
                            {riskTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {getFieldError('riskType') && (
                            <p className="mt-1 text-sm text-red-600">{getFieldError('riskType')?.message}</p>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Risk Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Risk Description *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => onChange({ description: e.target.value })}
                            placeholder="Describe the risk scenario, potential causes, and consequences..."
                            rows={6}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none ${
                                getFieldError('description') ? 'border-red-300' : 'border-slate-300'
                            }`}
                        />
                        {getFieldError('description') && (
                            <p className="mt-1 text-sm text-red-600">{getFieldError('description')?.message}</p>
                        )}
                        <div className="mt-2 text-xs text-slate-500">
                            {formData.description.length}/500 characters
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-2">Writing a Good Risk Description</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Be specific about what could go wrong</li>
                            <li>• Include potential causes or triggers</li>
                            <li>• Describe the impact on business operations</li>
                            <li>• Use clear, non-technical language</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};