// File: /app/policy-management/view/components/modals/EditPolicyModal.tsx

'use client'

import React, { useState } from 'react';
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import { PolicyViewData } from '../../types/policy-view.types';

interface EditPolicyModalProps {
  policy: PolicyViewData;
  onClose: () => void;
  onSave: (updatedPolicy: PolicyViewData) => void;
}

export function EditPolicyModal({ policy, onClose, onSave }: EditPolicyModalProps) {
  const [formData, setFormData] = useState({
    title: policy.title,
    description: policy.description,
    category: policy.category,
    confidentialityLevel: policy.confidentialityLevel,
    tags: policy.tags.join(', '),
    reviewFrequency: policy.reviewFrequency
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedPolicy: PolicyViewData = {
      ...policy,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      confidentialityLevel: formData.confidentialityLevel as any,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      reviewFrequency: formData.reviewFrequency as any
    };
    
    onSave(updatedPolicy);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <PencilIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Edit Policy</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Policy Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category and Confidentiality */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Security">Security</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>

            <div>
              <label htmlFor="confidentiality" className="block text-sm font-medium text-gray-700 mb-1">
                Confidentiality Level
              </label>
              <select
                id="confidentiality"
                value={formData.confidentialityLevel}
                onChange={(e) => setFormData({ ...formData, confidentialityLevel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Public">Public</option>
                <option value="Internal">Internal</option>
                <option value="Confidential">Confidential</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>
          </div>

          {/* Review Frequency */}
          <div>
            <label htmlFor="reviewFrequency" className="block text-sm font-medium text-gray-700 mb-1">
              Review Frequency
            </label>
            <select
              id="reviewFrequency"
              value={formData.reviewFrequency}
              onChange={(e) => setFormData({ ...formData, reviewFrequency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Semi-Annually">Semi-Annually</option>
              <option value="Annually">Annually</option>
              <option value="Bi-Annually">Bi-Annually</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Security, Compliance, ISO 27001"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}