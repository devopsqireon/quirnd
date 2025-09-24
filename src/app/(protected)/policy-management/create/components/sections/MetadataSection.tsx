// File: /app/policy-management/create/components/sections/MetadataSection.tsx

import React, { useState } from 'react';
import { PolicyFormData } from '../../types/policy-create.types';

interface MetadataSectionProps {
    data: PolicyFormData;
    onChange: (updates: Partial<PolicyFormData>) => void;
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({
    data,
    onChange
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            if (!data.tags.includes(tagInput.trim())) {
                onChange({ tags: [...data.tags, tagInput.trim()] });
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        onChange({ tags: data.tags.filter(tag => tag !== tagToRemove) });
    };

    return (
        <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">General Metadata</h3>
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
            </div>
            
            {isExpanded && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select 
                            value={data.category}
                            onChange={(e) => onChange({ category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                        >
                            <option value="">Select category...</option>
                            <option value="Information Security">Information Security</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Operations">Operations</option>
                            <option value="Finance">Finance</option>
                            <option value="Compliance">Compliance</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Owner / Department <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search for owner..."
                                value={data.owner}
                                onChange={(e) => onChange({ owner: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 pr-10 transition-colors"
                            />
                            <i className="fa-solid fa-search absolute right-3 top-3 text-gray-400"></i>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Effective Date</label>
                            <input 
                                type="date" 
                                value={data.effectiveDate}
                                onChange={(e) => onChange({ effectiveDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Review Date</label>
                            <input 
                                type="date" 
                                value={data.reviewDate}
                                onChange={(e) => onChange({ reviewDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Review Frequency</label>
                        <select 
                            value={data.reviewFrequency}
                            onChange={(e) => onChange({ reviewFrequency: e.target.value as PolicyFormData['reviewFrequency'] })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                        >
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Bi-annually">Bi-annually</option>
                            <option value="Annually">Annually</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confidentiality Level</label>
                        <select 
                            value={data.confidentialityLevel}
                            onChange={(e) => onChange({ confidentialityLevel: e.target.value as PolicyFormData['confidentialityLevel'] })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                        >
                            <option value="Public">Public</option>
                            <option value="Internal">Internal</option>
                            <option value="Confidential">Confidential</option>
                            <option value="Restricted">Restricted</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {data.tags.map((tag) => (
                                <span key={tag} className="inline-flex items-center px-2 py-1 bg-qireon-100 text-qireon-700 text-sm rounded-full">
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-1 text-qireon-500 hover:text-qireon-700"
                                    >
                                        <i className="fa-solid fa-times text-xs"></i>
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input 
                            type="text" 
                            placeholder="Add tags..."
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};