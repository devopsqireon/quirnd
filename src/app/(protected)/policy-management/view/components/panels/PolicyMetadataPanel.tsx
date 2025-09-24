// File: /app/policy-management/view/components/panels/PolicyMetadataPanel.tsx

'use client'

import React from 'react';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ShieldCheckIcon,
  DocumentIcon,
  StarIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { PolicyViewData } from '../../types/policy-view.types';

interface PolicyMetadataPanelProps {
  policy: PolicyViewData;
}

export function PolicyMetadataPanel({ policy }: PolicyMetadataPanelProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderStars = (rating: number, totalRatings: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-4 w-4 text-gray-300" />
            <StarSolidIcon className="h-4 w-4 text-yellow-400 absolute inset-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(
          <StarIcon key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }

    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-500">({totalRatings})</span>
      </div>
    );
  };

  const daysUntilExpiry = getDaysUntilExpiry(policy.expiryDate);

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Download PDF
          </button>
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
            Add Comment
          </button>
          <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            <StarIcon className="h-4 w-4 mr-2" />
            Rate Policy
          </button>
        </div>
      </div>

      {/* Status & Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Status & Alerts</h3>
        
        {/* Expiry Warning */}
        {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-md mb-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Expiring Soon</p>
              <p className="text-xs text-yellow-700">
                This policy expires in {daysUntilExpiry} days
              </p>
            </div>
          </div>
        )}

        {/* Acknowledgment Status */}
        {policy.acknowledgments.required && (
          <div className="p-3 bg-blue-50 rounded-md">
            <p className="text-sm font-medium text-blue-800 mb-1">Acknowledgment Required</p>
            <div className="text-xs text-blue-700">
              <p>{policy.acknowledgments.acknowledged}/{policy.acknowledgments.totalUsers} completed</p>
              <p>Deadline: {formatDate(policy.acknowledgments.deadline)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Policy Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Policy Information</h3>
        <dl className="space-y-3">
          <div>
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Version</dt>
            <dd className="mt-1 text-sm text-gray-900 font-mono">{policy.version}</dd>
          </div>
          
          <div>
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
              <UserIcon className="h-3 w-3 mr-1" />
              Owner
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{policy.owner}</dd>
          </div>

          <div>
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Effective Date
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{formatDate(policy.effectiveDate)}</dd>
          </div>

          <div>
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Expiry Date
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{formatDate(policy.expiryDate)}</dd>
          </div>

          <div>
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" />
              Review Frequency
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{policy.reviewFrequency}</dd>
          </div>

          <div>
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
              <ShieldCheckIcon className="h-3 w-3 mr-1" />
              Confidentiality
            </dt>
            <dd className="mt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {policy.confidentialityLevel}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Policy Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Usage Metrics</h3>
        <dl className="space-y-3">
          <div className="flex items-center justify-between">
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
              <EyeIcon className="h-3 w-3 mr-1" />
              Views
            </dt>
            <dd className="text-sm font-semibold text-gray-900">{policy.metrics.views.toLocaleString()}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center">
              <ArrowDownTrayIcon className="h-3 w-3 mr-1" />
              Downloads
            </dt>
            <dd className="text-sm font-semibold text-gray-900">{policy.metrics.downloads}</dd>
          </div>

          <div>
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Rating</dt>
            <dd className="flex items-center space-x-2">
              {renderStars(policy.metrics.averageRating, policy.metrics.totalRatings)}
              <span className="text-sm font-medium text-gray-900">{policy.metrics.averageRating}</span>
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Viewed</dt>
            <dd className="mt-1 text-sm text-gray-900">{formatDate(policy.metrics.lastViewed)}</dd>
          </div>
        </dl>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {policy.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Document Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Document Stats</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Attachments</dt>
            <dd className="text-gray-900 font-medium">{policy.attachments.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Versions</dt>
            <dd className="text-gray-900 font-medium">{policy.versionHistory.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Approvals</dt>
            <dd className="text-gray-900 font-medium">{policy.approvalHistory.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Related Policies</dt>
            <dd className="text-gray-900 font-medium">{policy.relatedPolicies.length}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}