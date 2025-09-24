// File: /app/policy-management/view/components/modals/ArchivePolicyModal.tsx

'use client'

import React, { useState } from 'react';
import { XMarkIcon, ArchiveBoxIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { PolicyViewData } from '../../types/policy-view.types';

interface ArchivePolicyModalProps {
  policy: PolicyViewData;
  onClose: () => void;
  onArchive: () => void;
}

export function ArchivePolicyModal({ policy, onClose, onArchive }: ArchivePolicyModalProps) {
  const [reason, setReason] = useState('');
  const [replacementPolicy, setReplacementPolicy] = useState('');
  const [notifyUsers, setNotifyUsers] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmed && reason.trim()) {
      onArchive();
    }
  };

  const isFormValid = confirmed && reason.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <ArchiveBoxIcon className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Archive Policy</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Confirm Archive Action
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  Archiving this policy will make it inactive and move it to the archived policies section. 
                  This action can be reversed by policy administrators.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">{policy.title}</h4>
            <p className="text-sm text-gray-600 mt-1">Version {policy.version}</p>
            <p className="text-sm text-gray-600">Status: {policy.status}</p>
          </div>

          {/* Archive Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason for archiving *
            </label>
            <textarea
              id="reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for archiving this policy..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          {/* Replacement Policy */}
          <div>
            <label htmlFor="replacement" className="block text-sm font-medium text-gray-700 mb-2">
              Replacement Policy (optional)
            </label>
            <input
              type="text"
              id="replacement"
              value={replacementPolicy}
              onChange={(e) => setReplacementPolicy(e.target.value)}
              placeholder="Enter replacement policy ID or name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Notification Option */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={notifyUsers}
                onChange={(e) => setNotifyUsers(e.target.checked)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Notify users who have acknowledged this policy
              </span>
            </label>
          </div>

          {/* Confirmation */}
          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-1"
              />
              <span className="ml-2 text-sm text-gray-700">
                I understand that archiving this policy will make it inactive. This action can be reversed by policy administrators.
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArchiveBoxIcon className="h-4 w-4 mr-2" />
              Archive Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}