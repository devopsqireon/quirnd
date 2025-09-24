// File: /app/policy-management/create/components/sections/PolicyTitleSection.tsx

import React from 'react';
import { PolicyFormData } from '../../types/policy-create.types';

interface PolicyTitleSectionProps {
    data: PolicyFormData;
    onChange: (updates: Partial<PolicyFormData>) => void;
}

export const PolicyTitleSection: React.FC<PolicyTitleSectionProps> = ({
    data,
    onChange
}) => {
    return (
        <section className="mb-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Policy</h1>
                <p className="text-gray-600">Design comprehensive policies with integrated governance and compliance controls</p>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Policy Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter policy title..." 
                        value={data.title}
                        onChange={(e) => onChange({ title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Policy ID</label>
                        <input 
                            type="text" 
                            value={data.id} 
                            disabled 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
                        <input 
                            type="text" 
                            value={data.version} 
                            disabled 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};