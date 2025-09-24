// File: /app/policy-management/create/components/sections/WorkflowSection.tsx

import React, { useState } from 'react';
import { PolicyFormData, PolicyApprover } from '../../types/policy-create.types';

interface WorkflowSectionProps {
    data: PolicyFormData;
    onChange: (updates: Partial<PolicyFormData>) => void;
    onShowApproverModal: () => void;
}

const mockApprovers: PolicyApprover[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Security Manager',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
        order: 1
    },
    {
        id: '2',
        name: 'Michael Chen',
        role: 'Chief Technology Officer',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        order: 2
    }
];

const suggestedApprovers = [
    {
        id: '3',
        name: 'Lisa Wang',
        role: 'Compliance Officer',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
        order: 3
    }
];

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({
    data,
    onChange,
    onShowApproverModal
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [approvers, setApprovers] = useState(mockApprovers);

    const handleRemoveApprover = (approverId: string) => {
        const updatedApprovers = approvers.filter(approver => approver.id !== approverId);
        setApprovers(updatedApprovers);
        onChange({ approvers: updatedApprovers });
    };

    const handleAddSuggestedApprover = (approver: PolicyApprover) => {
        const newApprover = { ...approver, order: approvers.length + 1 };
        const updatedApprovers = [...approvers, newApprover];
        setApprovers(updatedApprovers);
        onChange({ approvers: updatedApprovers });
    };

    return (
        <section className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Approval Workflow</h3>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Type</label>
                        <div className="flex space-x-3">
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="workflow" 
                                    value="Sequential"
                                    checked={data.workflowType === 'Sequential'}
                                    onChange={(e) => onChange({ workflowType: e.target.value as PolicyFormData['workflowType'] })}
                                    className="mr-2 text-qireon-600 focus:ring-qireon-500"
                                />
                                <span className="text-sm">Sequential</span>
                            </label>
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="workflow" 
                                    value="Parallel"
                                    checked={data.workflowType === 'Parallel'}
                                    onChange={(e) => onChange({ workflowType: e.target.value as PolicyFormData['workflowType'] })}
                                    className="mr-2 text-qireon-600 focus:ring-qireon-500"
                                />
                                <span className="text-sm">Parallel</span>
                            </label>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        {approvers.map((approver) => (
                            <div key={approver.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-qireon-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-qireon-700 font-medium text-sm">{approver.order}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{approver.name}</p>
                                        <p className="text-sm text-gray-600">{approver.role}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleRemoveApprover(approver.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </div>
                        ))}
                        
                        <button 
                            onClick={onShowApproverModal}
                            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:border-qireon-300 hover:text-qireon-600 transition-colors"
                        >
                            <i className="fa-solid fa-plus mr-2"></i>
                            Add approver
                        </button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-3">AI-Suggested Approvers</h4>
                        <div className="space-y-2">
                            {suggestedApprovers.map((approver) => (
                                <div key={approver.id} className="flex items-center justify-between p-2 bg-qireon-50 rounded-lg">
                                    <div className="flex items-center">
                                        <i className="fa-solid fa-robot text-qireon-600 mr-2"></i>
                                        <span className="text-sm text-gray-700">{approver.name} - {approver.role}</span>
                                    </div>
                                    <button 
                                        onClick={() => handleAddSuggestedApprover(approver)}
                                        className="text-qireon-600 text-sm hover:text-qireon-700 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};