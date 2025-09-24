// File: /app/policy-management/create/components/sections/ControlsSection.tsx

import React, { useState } from 'react';
import { PolicyControl } from '../../types/policy-create.types';

interface ControlsSectionProps {
    selectedControls: PolicyControl[];
    onChange: (controls: PolicyControl[]) => void;
}

const mockControls: PolicyControl[] = [
    {
        id: '1',
        code: 'A.5.1.1',
        title: 'Information security policies',
        description: 'Management direction for information security',
        clause: 'Clause 5.1',
        priority: 'High',
        selected: true
    },
    {
        id: '2',
        code: 'A.5.1.2',
        title: 'Review of information security policies',
        description: 'Information security policy review',
        clause: 'Clause 5.2',
        priority: 'Medium',
        selected: true
    },
    {
        id: '3',
        code: 'A.7.2.1',
        title: 'Management responsibilities',
        description: 'Competence requirements',
        clause: 'Clause 7.2',
        priority: 'Low',
        selected: false
    }
];

export const ControlsSection: React.FC<ControlsSectionProps> = ({
    selectedControls,
    onChange
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [controls, setControls] = useState(mockControls);

    const filteredControls = controls.filter(control =>
        control.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        control.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleControlToggle = (controlId: string) => {
        const updatedControls = controls.map(control =>
            control.id === controlId
                ? { ...control, selected: !control.selected }
                : control
        );
        setControls(updatedControls);
        onChange(updatedControls.filter(control => control.selected));
    };

    const getPriorityColor = (priority: PolicyControl['priority']) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Related SoA Controls</h3>
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
                        <input 
                            type="text" 
                            placeholder="Search Annex A controls..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                        />
                    </div>
                    
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {filteredControls.map((control) => (
                            <div key={control.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={control.selected}
                                    onChange={() => handleControlToggle(control.id)}
                                    className="mt-1 rounded border-gray-300 text-qireon-600 focus:ring-qireon-500"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-gray-900">{control.code}</span>
                                        <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(control.priority)}`}>
                                            {control.priority}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{control.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{control.clause} - {control.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button className="w-full text-qireon-600 hover:text-qireon-700 text-sm font-medium transition-colors">
                        + Add more controls
                    </button>
                </div>
            )}
        </section>
    );
};