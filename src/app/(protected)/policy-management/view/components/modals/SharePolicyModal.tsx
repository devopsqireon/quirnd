// File: /app/policy-management/view/components/modals/SharePolicyModal.tsx

'use client'

import React, { useState } from 'react';
import { XMarkIcon, ShareIcon, UserIcon, UserGroupIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { PolicyViewData, SharePermission } from '../../types/policy-view.types';

interface SharePolicyModalProps {
  policy: PolicyViewData;
  onClose: () => void;
}

export function SharePolicyModal({ policy, onClose }: SharePolicyModalProps) {
  const [shareUrl] = useState(`${window.location.origin}/policy-management/view/${policy.id}`);
  const [permissions, setPermissions] = useState<SharePermission[]>([
    { type: 'user', identifier: 'sarah.johnson@company.com', name: 'Sarah Johnson', permission: 'edit' },
    { type: 'group', identifier: 'security-team', name: 'Security Team', permission: 'view' }
  ]);
  const [newShare, setNewShare] = useState({ email: '', permission: 'view' as SharePermission['permission'] });
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleAddShare = () => {
    if (newShare.email.trim()) {
      const permission: SharePermission = {
        type: 'user',
        identifier: newShare.email,
        name: newShare.email.split('@')[0],
        permission: newShare.permission
      };
      setPermissions([...permissions, permission]);
      setNewShare({ email: '', permission: 'view' });
    }
  };

  const handleRemoveShare = (identifier: string) => {
    setPermissions(permissions.filter(p => p.identifier !== identifier));
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'edit':
        return 'text-green-700 bg-green-100';
      case 'comment':
        return 'text-yellow-700 bg-yellow-100';
      case 'view':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <ShareIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Share Policy</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Policy Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">{policy.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
          </div>

          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share Link
            </label>
            <div className="flex">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm bg-gray-50 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ClipboardIcon className="h-4 w-4 mr-1" />
                {linkCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Add People */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add People
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={newShare.email}
                onChange={(e) => setNewShare({ ...newShare, email: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <select
                value={newShare.permission}
                onChange={(e) => setNewShare({ ...newShare, permission: e.target.value as SharePermission['permission'] })}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="view">View</option>
                <option value="comment">Comment</option>
                <option value="edit">Edit</option>
              </select>
              <button
                onClick={handleAddShare}
                disabled={!newShare.email.trim()}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>

          {/* Current Permissions */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">People with access</h4>
            <div className="space-y-2">
              {permissions.map((permission) => (
                <div key={permission.identifier} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center space-x-3">
                    {permission.type === 'user' ? (
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <UserGroupIcon className="h-5 w-5 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                      <p className="text-xs text-gray-500">{permission.identifier}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPermissionColor(permission.permission)}`}>
                      {permission.permission}
                    </span>
                    <button
                      onClick={() => handleRemoveShare(permission.identifier)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
