// File: /app/policy-management/create/components/sections/AcknowledgmentSection.tsx

import React, { useState } from 'react';
import { PolicyFormData } from '../../types/policy-create.types';

interface AcknowledgmentSectionProps {
    data: PolicyFormData;
    onChange: (updates: Partial<PolicyFormData>) => void;
}

export const AcknowledgmentSection: React.FC<AcknowledgmentSectionProps> = ({
    data,
    onChange
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggleAcknowledgment = (enabled: boolean) => {
        onChange({ 
            requireAcknowledgment: enabled,
            acknowledgmentDeadline: enabled ? data.acknowledgmentDeadline : '',
            reminderFrequency: enabled ? data.reminderFrequency : 'Weekly',
            requireTraining: enabled ? data.requireTraining : false
        });
    };

    return (
        <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Employee Acknowledgment</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={data.requireAcknowledgment}
                        onChange={(e) => handleToggleAcknowledgment(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-qireon-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-qireon-600"></div>
                </label>
            </div>
            
            {data.requireAcknowledgment && isExpanded && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Who must acknowledge</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors">
                            <option>All employees</option>
                            <option>Specific departments</option>
                            <option>Role-based groups</option>
                            <option>Custom selection</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Acknowledgment deadline</label>
                        <input 
                            type="date" 
                            value={data.acknowledgmentDeadline}
                            onChange={(e) => onChange({ acknowledgmentDeadline: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reminder frequency</label>
                        <select 
                            value={data.reminderFrequency}
                            onChange={(e) => onChange({ reminderFrequency: e.target.value as PolicyFormData['reminderFrequency'] })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                        >
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Bi-weekly">Bi-weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id="training" 
                            checked={data.requireTraining}
                            onChange={(e) => onChange({ requireTraining: e.target.checked })}
                            className="rounded border-gray-300 text-qireon-600 focus:ring-qireon-500"
                        />
                        <label htmlFor="training" className="text-sm text-gray-700">
                            Require completion of related training
                        </label>
                    </div>
                </div>
            )}
        </section>
    );
};