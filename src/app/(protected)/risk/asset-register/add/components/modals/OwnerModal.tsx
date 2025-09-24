// File: /app/risk/asset-register/add/components/modals/OwnerModal.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Owner } from '../../types';
import { DEPARTMENTS } from '../../utils/constants';

interface OwnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (owner: Owner) => void;
    owner?: Owner | null;
}

export const OwnerModal: React.FC<OwnerModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    owner 
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        role: ''
    });

    useEffect(() => {
        if (owner) {
            setFormData({
                name: owner.name || '',
                email: owner.email || '',
                department: owner.department || '',
                role: owner.role || ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                department: '',
                role: ''
            });
        }
    }, [owner, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: owner?.id || Date.now().toString(),
            ...formData
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">
                        {owner ? 'Edit Asset Owner' : 'Add New Asset Owner'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="user@company.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Department *
                        </label>
                        <select
                            value={formData.department}
                            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Select department</option>
                            {DEPARTMENTS.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Role/Title
                        </label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="e.g., Senior Engineer, Manager"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {owner ? 'Update' : 'Add'} Owner
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};