// File: /app/policy-management/view/components/panels/PolicyApprovalPanel.tsx

'use client'

import React, { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { ApprovalRecord } from '../../types/policy-view.types';

interface PolicyApprovalPanelProps {
  approvals: ApprovalRecord[];
}

export function PolicyApprovalPanel({ approvals }: PolicyApprovalPanelProps) {
  const [expandedApprovals, setExpandedApprovals] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedApprovals);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedApprovals(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'Delegated':
        return <UserIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Delegated':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const approvedCount = approvals.filter(a => a.status === 'Approved').length;
  const pendingCount = approvals.filter(a => a.status === 'Pending').length;
  const rejectedCount = approvals.filter(a => a.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">Approved</p>
              <p className="text-2xl font-semibold text-green-600">{approvedCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-900">Pending</p>
              <p className="text-2xl font-semibold text-yellow-600">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-900">Rejected</p>
              <p className="text-2xl font-semibold text-red-600">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-medium text-gray-900">Approval Timeline</h4>
          <p className="text-sm text-gray-500 mt-1">
            {approvals.length} approver{approvals.length !== 1 ? 's' : ''} in workflow
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {approvals.map((approval, index) => {
            const isExpanded = expandedApprovals.has(approval.id);
            const hasComments = approval.comments && approval.comments.length > 0;

            return (
              <div key={approval.id} className="px-6 py-4">
                <div className="flex items-start space-x-3">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(approval.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <p className="text-sm font-medium text-gray-900">
                          {approval.approver}
                        </p>
                        <span className="text-sm text-gray-500">
                          {approval.role}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(approval.status)}`}>
                          {approval.status}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {formatDate(approval.date)}
                        </span>
                        {hasComments && (
                          <button
                            onClick={() => toggleExpanded(approval.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDownIcon className="h-4 w-4" />
                            ) : (
                              <ChevronRightIcon className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Comments Preview */}
                    {hasComments && (
                      <div className="mt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                          <span className="truncate">
                            {isExpanded ? '' : approval.comments}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Expanded Comments */}
                    {isExpanded && hasComments && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Comments:</h5>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {approval.comments}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Line */}
                {index < approvals.length - 1 && (
                  <div className="ml-2.5 mt-4 mb-0">
                    <div className="h-6 w-0.5 bg-gray-200"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
