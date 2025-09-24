// File: /app/policy-management/create/components/sections/VersionControlSection.tsx

import React from 'react';
import { PolicyFormData } from '../../types/policy-create.types';

interface VersionControlSectionProps {
    data: PolicyFormData;
    onChange: (updates: Partial<PolicyFormData>) => void;
}

export const VersionControlSection: React.FC<VersionControlSectionProps> = ({
    data,
    onChange
}) => {
    return (
        <section className="mb-8">
            <div className="border border-gray-300 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Version Control & Change Management</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Change Summary <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                            placeholder="Describe the changes made in this version..."
                            value={data.changeSummary}
                            onChange={(e) => onChange({ changeSummary: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 h-24 resize-none transition-colors"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Change Type</label>
                            <select 
                                value={data.changeType}
                                onChange={(e) => onChange({ changeType: e.target.value as PolicyFormData['changeType'] })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                            >
                                <option value="Minor Update">Minor Update</option>
                                <option value="Major Revision">Major Revision</option>
                                <option value="Emergency Change">Emergency Change</option>
                                <option value="Scheduled Review">Scheduled Review</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Impact Level</label>
                            <select 
                                value={data.impactLevel}
                                onChange={(e) => onChange({ impactLevel: e.target.value as PolicyFormData['impactLevel'] })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};