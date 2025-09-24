// File: /app/risk/asset-register/add/components/wizard/DependenciesStep.tsx (UPDATED)
'use client'

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { SmartField } from '../shared/SmartField';

interface DependenciesStepProps {
    formData: {
        linkedProcesses: string;
        linkedSystems: string;
        thirdPartyDependencies: string;
        regulatoryRelevance: string[];
    };
    onFieldChange: (field: string, value: any) => void;
}

// Initial regulatory compliance options
const INITIAL_REGULATORY_OPTIONS = [
    'GDPR (General Data Protection Regulation)',
    'HIPAA (Health Insurance Portability)',
    'PCI DSS (Payment Card Industry)',
    'SOX (Sarbanes-Oxley Act)',
    'ISO 27001 (Information Security)',
    'CCPA (California Consumer Privacy Act)',
    'FERPA (Educational Records Privacy)',
    'GLBA (Gramm-Leach-Bliley Act)',
    'FedRAMP (Federal Risk Authorization)',
    'NIST Cybersecurity Framework'
];

export const DependenciesStep: React.FC<DependenciesStepProps> = ({
    formData,
    onFieldChange
}) => {
    const [regulatoryOptions, setRegulatoryOptions] = useState<string[]>(INITIAL_REGULATORY_OPTIONS);
    const [customRegulatory, setCustomRegulatory] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');

    const handleRegulatoryToggle = (option: string) => {
        const currentRelevance = formData.regulatoryRelevance;
        const newRelevance = currentRelevance.includes(option)
            ? currentRelevance.filter(r => r !== option)
            : [...currentRelevance, option];
        onFieldChange('regulatoryRelevance', newRelevance);
    };

    const handleAddCustomRegulatory = () => {
        const regulatory = customRegulatory.trim();
        if (!regulatory) return;
        
        if (!regulatoryOptions.includes(regulatory)) {
            const newOptions = [...regulatoryOptions, regulatory];
            setRegulatoryOptions(newOptions);
            
            // Auto-select the newly added option
            if (!formData.regulatoryRelevance.includes(regulatory)) {
                onFieldChange('regulatoryRelevance', [...formData.regulatoryRelevance, regulatory]);
            }
        }
        setCustomRegulatory('');
    };

    const handleStartEdit = (index: number, text: string) => {
        setEditingIndex(index);
        setEditingText(text);
    };

    const handleSaveEdit = () => {
        if (editingIndex === null) return;
        
        const oldText = regulatoryOptions[editingIndex];
        const newText = editingText.trim();
        
        if (!newText) return;
        
        // Update the regulatory options list
        const newOptions = [...regulatoryOptions];
        newOptions[editingIndex] = newText;
        setRegulatoryOptions(newOptions);
        
        // Update selected relevance if the old text was selected
        if (formData.regulatoryRelevance.includes(oldText)) {
            const newRelevance = formData.regulatoryRelevance.map(item => 
                item === oldText ? newText : item
            );
            onFieldChange('regulatoryRelevance', newRelevance);
        }
        
        setEditingIndex(null);
        setEditingText('');
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditingText('');
    };

    const handleDeleteRegulatory = (optionToDelete: string, index: number) => {
        // Don't allow deletion of initial regulatory options
        if (INITIAL_REGULATORY_OPTIONS.includes(optionToDelete)) return;
        
        // Remove from options list
        const newOptions = regulatoryOptions.filter((_, i) => i !== index);
        setRegulatoryOptions(newOptions);
        
        // Remove from selected relevance if it was selected
        if (formData.regulatoryRelevance.includes(optionToDelete)) {
            const newRelevance = formData.regulatoryRelevance.filter(item => item !== optionToDelete);
            onFieldChange('regulatoryRelevance', newRelevance);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <SmartField
                    label="Linked Processes"
                    type="text"
                    value={formData.linkedProcesses}
                    onChange={(value) => onFieldChange('linkedProcesses', value)}
                    placeholder="Business processes this asset supports"
                />

                <SmartField
                    label="Linked Systems"
                    type="text"
                    value={formData.linkedSystems}
                    onChange={(value) => onFieldChange('linkedSystems', value)}
                    placeholder="Other assets/systems this depends on"
                />

                <SmartField
                    label="Third-Party Dependencies"
                    type="text"
                    value={formData.thirdPartyDependencies}
                    onChange={(value) => onFieldChange('thirdPartyDependencies', value)}
                    placeholder="External services or dependencies"
                />
            </div>

            {/* Enhanced Regulatory Relevance Section */}
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <label className="block text-sm font-medium text-gray-600 mb-3">
                    Regulatory/Compliance Relevance
                </label>
                
                <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {regulatoryOptions.map((option, index) => (
                            <div key={index} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded">
                                <label className="flex items-center gap-3 cursor-pointer flex-1">
                                    <input
                                        type="checkbox"
                                        checked={formData.regulatoryRelevance.includes(option)}
                                        onChange={() => handleRegulatoryToggle(option)}
                                        className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                    />
                                    {editingIndex === index ? (
                                        <div className="flex items-center gap-2 flex-1">
                                            <input
                                                type="text"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                                                onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                onClick={handleSaveEdit}
                                                className="text-green-600 hover:text-green-800 text-xs"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                className="text-gray-500 hover:text-gray-700 text-xs"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-700 text-sm flex-1">{option}</span>
                                    )}
                                </label>
                                
                                {editingIndex !== index && (
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            type="button"
                                            onClick={() => handleStartEdit(index, option)}
                                            className="text-blue-500 hover:text-blue-700 text-xs px-2 py-1"
                                        >
                                            Edit
                                        </button>
                                        {!INITIAL_REGULATORY_OPTIONS.includes(option) && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteRegulatory(option, index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Custom Regulatory Input */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Add Custom Regulatory/Compliance Requirement
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customRegulatory}
                            onChange={(e) => setCustomRegulatory(e.target.value)}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="e.g., COPPA, SOC 2, Custom Company Policy..."
                            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomRegulatory()}
                        />
                        <button
                            type="button"
                            onClick={handleAddCustomRegulatory}
                            disabled={!customRegulatory.trim()}
                            className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>

                {/* Selected Regulatory Summary */}
                <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Selected Compliance Requirements</h4>
                    {formData.regulatoryRelevance.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {formData.regulatoryRelevance.map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs"
                                >
                                    {item.length > 30 ? `${item.substring(0, 30)}...` : item}
                                    <button
                                        type="button"
                                        onClick={() => handleRegulatoryToggle(item)}
                                        className="text-purple-600 hover:text-purple-800"
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-purple-700 text-sm italic">
                            No regulatory requirements selected. Select applicable compliance frameworks above.
                        </p>
                    )}
                </div>

                {/* Compliance Summary Stats */}
                <div className="mt-4 bg-slate-50 p-3 rounded-lg">
                    <h5 className="font-medium text-slate-900 mb-2">Compliance Summary</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                        <div className="flex justify-between">
                            <span>Total Requirements:</span>
                            <span className="font-semibold">{formData.regulatoryRelevance.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Custom Requirements:</span>
                            <span className="font-semibold">
                                {formData.regulatoryRelevance.filter(item => 
                                    !INITIAL_REGULATORY_OPTIONS.includes(item)
                                ).length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
