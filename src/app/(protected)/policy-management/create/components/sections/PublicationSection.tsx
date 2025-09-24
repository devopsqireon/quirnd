// File: /app/policy-management/create/components/sections/PublicationSection.tsx

import React, { useState } from 'react';
import { PolicyFormData } from '../../types/policy-create.types';

interface PublicationSectionProps {
    data: PolicyFormData;
    onChange: (updates: Partial<PolicyFormData>) => void;
}

export const PublicationSection: React.FC<PublicationSectionProps> = ({
    data,
    onChange
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Publication Settings</h3>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Publication Status</label>
                        <select 
                            value={data.publicationStatus}
                            onChange={(e) => onChange({ publicationStatus: e.target.value as PolicyFormData['publicationStatus'] })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                        >
                            <option value="Draft">Draft</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Approved">Approved</option>
                            <option value="Published">Published</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id="notify" 
                            checked={data.notifyOnPublication}
                            onChange={(e) => onChange({ notifyOnPublication: e.target.checked })}
                            className="rounded border-gray-300 text-qireon-600 focus:ring-qireon-500"
                        />
                        <label htmlFor="notify" className="text-sm text-gray-700">
                            Send notification upon publication
                        </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id="archive" 
                            checked={data.archivePrevious}
                            onChange={(e) => onChange({ archivePrevious: e.target.checked })}
                            className="rounded border-gray-300 text-qireon-600 focus:ring-qireon-500"
                        />
                        <label htmlFor="archive" className="text-sm text-gray-700">
                            Archive previous version automatically
                        </label>
                    </div>
                </div>
            )}
        </section>
    );
};