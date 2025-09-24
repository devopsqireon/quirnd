// File: /app/policy-management/create/components/modals/ApproverModal.tsx

import React, { useState } from 'react';
import { PolicyApprover } from '../../types/policy-create.types';

interface ApproverModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectApprover: (approver: PolicyApprover) => void;
}

const availableApprovers: PolicyApprover[] = [
    {
        id: '3',
        name: 'Lisa Wang',
        role: 'Compliance Officer',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
        order: 0
    },
    {
        id: '4',
        name: 'David Rodriguez',
        role: 'Legal Counsel',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
        order: 0
    },
    {
        id: '5',
        name: 'Emma Thompson',
        role: 'Risk Manager',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        order: 0
    },
    {
        id: '6',
        name: 'James Wilson',
        role: 'IT Director',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
        order: 0
    }
];

export const ApproverModal: React.FC<ApproverModalProps> = ({
    isOpen,
    onClose,
    onSelectApprover
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    if (!isOpen) return null;

    const filteredApprovers = availableApprovers.filter(approver =>
        approver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        approver.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectApprover = (approver: PolicyApprover) => {
        onSelectApprover(approver);
        setSearchTerm('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Add Approver</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <input 
                                type="text" 
                                placeholder="Search for users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qireon-500 focus:border-qireon-500 transition-colors"
                            />
                        </div>
                        
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {filteredApprovers.map((approver) => (
                                <div key={approver.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                    <div className="flex items-center">
                                        <img 
                                            src={approver.avatar} 
                                            alt={approver.name} 
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">{approver.name}</p>
                                            <p className="text-sm text-gray-600">{approver.role}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleSelectApprover(approver)}
                                        className="text-qireon-600 hover:text-qireon-700 text-sm font-medium transition-colors"
                                    >
                                        Select
                                    </button>
                                </div>
                            ))}
                            
                            {filteredApprovers.length === 0 && (
                                <div className="text-center py-4 text-gray-500">
                                    <i className="fa-solid fa-users text-2xl mb-2"></i>
                                    <p className="text-sm">No users found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};