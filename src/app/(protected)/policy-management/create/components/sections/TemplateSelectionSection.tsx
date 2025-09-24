// File: /app/policy-management/create/components/sections/TemplateSelectionSection.tsx

import React, { useState } from 'react';
import { PolicyTemplate } from '../../types/policy-create.types';
import { Sparkles } from 'lucide-react';

interface TemplateSelectionSectionProps {
    onTemplateSelect: (template: PolicyTemplate) => void;
}

const templates: PolicyTemplate[] = [
    {
        id: 'security',
        name: 'Security Policy',
        description: 'Information security management and controls',
        icon: 'fa-solid fa-shield-halved',
        color: 'qireon',
        content: 'Default security policy content...',
        controls: ['A.5.1', 'A.8.1'],
        category: 'Security'
    },
    {
        id: 'hr',
        name: 'HR Policy',
        description: 'Human resources and personnel management',
        icon: 'fa-solid fa-users',
        color: 'green',
        content: 'Default HR policy content...',
        controls: ['A.7.1', 'A.7.2'],
        category: 'HR'
    },
    {
        id: 'operational',
        name: 'Operational Policy',
        description: 'Operations security and management',
        icon: 'fa-solid fa-cog',
        color: 'blue',
        content: 'Default operational policy content...',
        controls: ['A.12.1', 'A.12.6'],
        category: 'Operational'
    }
];

export const TemplateSelectionSection: React.FC<TemplateSelectionSectionProps> = ({
    onTemplateSelect
}) => {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const handleTemplateClick = (template: PolicyTemplate) => {
        setSelectedTemplate(template.id);
        onTemplateSelect(template);
    };

    const handleAIGenerate = () => {
        console.log('Generating policy with AI assistant...');
    };

    return (
        <section className="mb-8 p-6 bg-gradient-to-r from-qireon-50 to-purple-50 rounded-xl border border-qireon-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">AI-Powered Template Selection</h2>
                <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-robot text-qireon-600"></i>
                    <span className="text-sm text-qireon-600 font-medium">ISO Mentor</span>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
                {templates.map((template) => (
                    <div 
                        key={template.id}
                        onClick={() => handleTemplateClick(template)}
                        className={`p-4 bg-white rounded-lg border cursor-pointer transition-all duration-200 ${
                            selectedTemplate === template.id 
                                ? 'border-qireon-500 shadow-md ring-2 ring-qireon-200' 
                                : 'border-gray-200 hover:border-qireon-300 hover:shadow-sm'
                        }`}
                    >
                        <div className="flex items-center mb-2">
                            <i className={`${template.icon} text-${template.color}-600 mr-2`}></i>
                            <h3 className="font-medium text-gray-900">{template.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <div className="flex flex-wrap gap-1">
                            {template.controls.map((control) => (
                                <span 
                                    key={control}
                                    className={`px-2 py-1 bg-${template.color}-100 text-${template.color}-700 text-xs rounded`}
                                >
                                    {control}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={handleAIGenerate}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex"
            >
                <Sparkles />
                Generate Policy with AI Assistant
            </button>
        </section>
    );
};