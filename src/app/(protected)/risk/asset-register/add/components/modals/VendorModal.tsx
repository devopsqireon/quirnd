// File: /app/risk/asset-register/add/components/modals/VendorModal.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Vendor } from '../../types';

interface VendorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vendor: Vendor) => void;
    vendor?: Vendor | null;
}

export const VendorModal: React.FC<VendorModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    vendor 
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: ''
    });

    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || '',
                email: vendor.email || '',
                phone: vendor.phone || '',
                category: vendor.category || ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                category: ''
            });
        }
    }, [vendor, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: vendor?.id || Date.now().toString(),
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
                        {vendor ? 'Edit Vendor' : 'Add New Vendor'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select category</option>
                            <option value="Software">Software</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Cloud Services">Cloud Services</option>
                            <option value="Networking">Networking</option>
                            <option value="Security">Security</option>
                            <option value="Other">Other</option>
                        </select>
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
                            {vendor ? 'Update' : 'Add'} Vendor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};