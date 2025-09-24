// File: /app/risk/risk-register/add/components/steps/Step4Ownership.tsx

'use client'

import React, { useState } from 'react';
import { Users, Search, Plus, X, Mail, Building, UserCheck } from 'lucide-react';
import { AddRiskFormData, ValidationError } from '../../types';

interface Step4OwnershipProps {
    formData: AddRiskFormData;
    onChange: (data: Partial<AddRiskFormData>) => void;
    errors: ValidationError[];
}

const mockUsers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'IT Security', role: 'Security Manager' },
    { id: '2', name: 'Mike Chen', email: 'mike.chen@company.com', department: 'IT Operations', role: 'Operations Manager' },
    { id: '3', name: 'Lisa Rodriguez', email: 'lisa.rodriguez@company.com', department: 'Risk Management', role: 'Risk Analyst' },
    { id: '4', name: 'David Kim', email: 'david.kim@company.com', department: 'Legal', role: 'Compliance Officer' },
    { id: '5', name: 'Emma Davis', email: 'emma.davis@company.com', department: 'Finance', role: 'Financial Controller' },
    { id: '6', name: 'Robert Taylor', email: 'robert.taylor@company.com', department: 'Human Resources', role: 'HR Manager' }
];

const departments = [
    'IT Security',
    'IT Operations', 
    'Risk Management',
    'Legal',
    'Finance',
    'Human Resources',
    'Operations',
    'Marketing',
    'Sales'
];

export const Step4Ownership: React.FC<Step4OwnershipProps> = ({
    formData,
    onChange,
    errors
}) => {
    const [userSearch, setUserSearch] = useState('');
    const [showUserSearch, setShowUserSearch] = useState(false);
    const [searchType, setSearchType] = useState<'owner' | 'assignee' | 'reviewer'>('owner');

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.department.toLowerCase().includes(userSearch.toLowerCase())
    );

    const getFieldError = (fieldName: string) => {
        return errors.find(error => error.field === fieldName);
    };

    const selectUser = (user: typeof mockUsers[0], type: 'owner' | 'assignee' | 'reviewer') => {
        if (type === 'owner') {
            onChange({
                owner: user.name,
                ownerEmail: user.email,
                department: user.department
            });
        } else if (type === 'assignee') {
            onChange({
                assignee: user.name,
                assigneeEmail: user.email
            });
        } else if (type === 'reviewer') {
            const isAlreadyReviewer = formData.reviewers.includes(user.name);
            if (!isAlreadyReviewer) {
                onChange({
                    reviewers: [...formData.reviewers, user.name]
                });
            }
        }
        setShowUserSearch(false);
        setUserSearch('');
    };

    const removeReviewer = (reviewerName: string) => {
        onChange({
            reviewers: formData.reviewers.filter(r => r !== reviewerName)
        });
    };

    const openUserSearch = (type: 'owner' | 'assignee' | 'reviewer') => {
        setSearchType(type);
        setShowUserSearch(true);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                    <Users className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Ownership & Responsibility</h2>
                <p className="text-slate-600">
                    Assign responsibility and accountability for this risk
                </p>
            </div>

            {/* User Search Modal */}
            {showUserSearch && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900">
                                Select {searchType === 'owner' ? 'Risk Owner' : searchType === 'assignee' ? 'Assignee' : 'Reviewer'}
                            </h3>
                            <button
                                onClick={() => setShowUserSearch(false)}
                                className="p-2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search users by name, email, or department..."
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>

                        <div className="space-y-2">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => selectUser(user, searchType)}
                                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-teal-300 cursor-pointer transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                            <Users className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{user.name}</div>
                                            <div className="text-sm text-slate-500">{user.email}</div>
                                            <div className="text-sm text-slate-500">{user.department} • {user.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Risk Owner */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Risk Owner *
                        </label>
                        <p className="text-sm text-slate-500 mb-3">
                            Person accountable for managing and monitoring this risk
                        </p>
                        
                        {formData.owner ? (
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                            <UserCheck className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{formData.owner}</div>
                                            <div className="text-sm text-slate-500 flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                {formData.ownerEmail}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => openUserSearch('owner')}
                                        className="text-sm font-medium text-teal-600 hover:text-teal-700"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => openUserSearch('owner')}
                                className={`w-full p-4 border-2 border-dashed rounded-lg text-center hover:border-teal-300 hover:bg-teal-50 transition-all ${
                                    getFieldError('owner') ? 'border-red-300' : 'border-slate-300'
                                }`}
                            >
                                <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-slate-600">Click to select risk owner</p>
                            </button>
                        )}
                        {getFieldError('owner') && (
                            <p className="mt-1 text-sm text-red-600">{getFieldError('owner')?.message}</p>
                        )}
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Department *
                        </label>
                        <select
                            value={formData.department}
                            onChange={(e) => onChange({ department: e.target.value })}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                                getFieldError('department') ? 'border-red-300' : 'border-slate-300'
                            }`}
                        >
                            <option value="">Select department</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                        {getFieldError('department') && (
                            <p className="mt-1 text-sm text-red-600">{getFieldError('department')?.message}</p>
                        )}
                    </div>

                    {/* Risk Assignee */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Risk Assignee
                        </label>
                        <p className="text-sm text-slate-500 mb-3">
                            Person responsible for implementing risk mitigation actions
                        </p>
                        
                        {formData.assignee ? (
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                            <UserCheck className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{formData.assignee}</div>
                                            <div className="text-sm text-slate-500 flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                {formData.assigneeEmail}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => openUserSearch('assignee')}
                                        className="text-sm font-medium text-teal-600 hover:text-teal-700"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => openUserSearch('assignee')}
                                className="w-full p-4 border-2 border-dashed border-slate-300 rounded-lg text-center hover:border-teal-300 hover:bg-teal-50 transition-all"
                            >
                                <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                <p className="text-slate-600">Click to select assignee (optional)</p>
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Risk Reviewers */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-slate-700">
                                Risk Reviewers
                            </label>
                            <button
                                type="button"
                                onClick={() => openUserSearch('reviewer')}
                                className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
                            >
                                <Plus className="w-4 h-4" />
                                Add Reviewer
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">
                            People who will review and approve risk assessments
                        </p>

                        <div className="space-y-2">
                            {formData.reviewers.map((reviewer, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                                            <Users className="w-4 h-4 text-slate-600" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-900">{reviewer}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeReviewer(reviewer)}
                                        className="p-1 text-slate-400 hover:text-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            
                            {formData.reviewers.length === 0 && (
                                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                                    <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>No reviewers assigned</p>
                                    <p className="text-sm">Click "Add Reviewer" to assign reviewers</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ownership Summary */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                            <Building className="w-5 h-5 text-blue-600" />
                            Ownership Summary
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Risk Owner:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.owner || 'Not assigned'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Department:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.department || 'Not specified'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Assignee:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.assignee || 'Not assigned'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Reviewers:</span>
                                <span className="font-medium text-slate-900">
                                    {formData.reviewers.length || '0'}
                                </span>
                            </div>
                        </div>
                        
                        {(!formData.owner || !formData.department) && (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    Risk owner and department are required for proper accountability.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Responsibility Guidelines */}
                    <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-2">Responsibility Guidelines</h4>
                        <div className="space-y-2 text-sm text-slate-600">
                            <div><strong>Risk Owner:</strong> Accountable for risk management strategy and decisions</div>
                            <div><strong>Assignee:</strong> Responsible for implementing mitigation actions</div>
                            <div><strong>Reviewers:</strong> Provide oversight and approval for risk assessments</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};