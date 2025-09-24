// File: /app/policy-management/view/components/panels/PolicyDetailsPanel.tsx

'use client'

import React from 'react';
import {
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { PolicyViewData } from '../../types/policy-view.types';

interface PolicyDetailsPanelProps {
  policy: PolicyViewData;
}

export function PolicyDetailsPanel({ policy }: PolicyDetailsPanelProps) {
  const getConfidentialityColor = (level: string) => {
    switch (level) {
      case 'Public':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'Internal':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Confidential':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Restricted':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isOverdue = (reviewDate: string) => {
    const review = new Date(reviewDate);
    const today = new Date();
    return review < today;
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Basic Information
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-1">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Policy ID
            </dt>
            <dd className="text-sm text-gray-900 font-mono">{policy.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-1">
              <UserIcon className="h-4 w-4 mr-2" />
              Policy Owner
            </dt>
            <dd className="text-sm text-gray-900">{policy.owner}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-1">
              <BuildingOfficeIcon className="h-4 w-4 mr-2" />
              Department
            </dt>
            <dd className="text-sm text-gray-900">{policy.department}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Category
            </dt>
            <dd>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {policy.category}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-1">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Confidentiality Level
            </dt>
            <dd>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getConfidentialityColor(policy.confidentialityLevel)}`}>
                {policy.confidentialityLevel}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Version
            </dt>
            <dd className="text-sm text-gray-900 font-mono">{policy.version}</dd>
          </div>
        </dl>
      </section>

      {/* Dates and Timeline */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Dates & Timeline
        </h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-1">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Effective Date
            </dt>
            <dd className="text-sm text-gray-900">{formatDate(policy.effectiveDate)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-1">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Expiry Date
            </dt>
            <dd className="flex items-center space-x-2">
              <span className="text-sm text-gray-900">{formatDate(policy.expiryDate)}</span>
              {isExpiringSoon(policy.expiryDate) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Expiring Soon
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 flex items-center mb-1">
              <ClockIcon className="h-4 w-4 mr-2" />
              Next Review Date
            </dt>
            <dd className="flex items-center space-x-2">
              <span className="text-sm text-gray-900">{formatDate(policy.reviewDate)}</span>
              {isOverdue(policy.reviewDate) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Overdue
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Review Frequency
            </dt>
            <dd className="text-sm text-gray-900">{policy.reviewFrequency}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Created Date
            </dt>
            <dd className="text-sm text-gray-900">{formatDate(policy.createdDate)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">
              Last Modified
            </dt>
            <dd className="text-sm text-gray-900">
              {formatDate(policy.lastModifiedDate)}
              <span className="text-xs text-gray-500 block">by {policy.lastModifiedBy}</span>
            </dd>
          </div>
        </dl>
      </section>

      {/* Scope and Applicability */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Scope & Applicability
        </h3>
        <div className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 mb-2">Applies To</dt>
            <div className="flex flex-wrap gap-2">
              {policy.appliesTo?.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {policy.exceptions && policy.exceptions.length > 0 && (
            <div>
              <dt className="text-sm font-medium text-gray-500 mb-2">Exceptions</dt>
              <ul className="space-y-1">
                {policy.exceptions.map((exception, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {exception}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {policy.geographicScope && policy.geographicScope.length > 0 && (
            <div>
              <dt className="text-sm font-medium text-gray-500 mb-2">Geographic Scope</dt>
              <div className="flex flex-wrap gap-2">
                {policy.geographicScope.map((location, index) => (
                  <span
                    key={index}
                    className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Acknowledgments */}
      {policy.acknowledgments?.required && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Acknowledgment Status
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">
                {policy.acknowledgments.acknowledged} of {policy.acknowledgments.totalUsers} users
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(policy.acknowledgments.acknowledged / policy.acknowledgments.totalUsers) * 100}%` 
                }}
              ></div>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-medium text-gray-500">Deadline</dt>
                <dd className="text-gray-900">{formatDate(policy.acknowledgments.deadline)}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Reminders Sent</dt>
                <dd className="text-gray-900">{policy.acknowledgments.remindersSent}</dd>
              </div>
            </dl>
          </div>
        </section>
      )}

      {/* Related Policies */}
      {policy.relatedPolicies && policy.relatedPolicies.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Related Policies
          </h3>
          <div className="space-y-3">
            {policy.relatedPolicies.map((relatedPolicy) => (
              <div
                key={relatedPolicy.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {relatedPolicy.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Relationship: {relatedPolicy.relationship}
                  </p>
                </div>
                <button className="ml-3 p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Compliance Information */}
      {policy.complianceRequirements && policy.complianceRequirements.length > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Compliance Requirements
          </h3>
          <div className="space-y-2">
            {policy.complianceRequirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{requirement}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Policy Metrics */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Policy Metrics
        </h3>
        <dl className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-blue-700">Total Views</dt>
            <dd className="text-2xl font-semibold text-blue-900">
              {policy.metrics?.views?.toLocaleString() || '0'}
            </dd>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-green-700">Downloads</dt>
            <dd className="text-2xl font-semibold text-green-900">
              {policy.metrics?.downloads || 0}
            </dd>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-purple-700">Average Rating</dt>
            <dd className="text-2xl font-semibold text-purple-900">
              {policy.metrics?.averageRating || 0}/5
              <span className="text-sm font-normal text-purple-600 ml-1">
                ({policy.metrics?.totalRatings || 0} ratings)
              </span>
            </dd>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <dt className="text-sm font-medium text-gray-700">Last Viewed</dt>
            <dd className="text-2xl font-semibold text-gray-900">
              {policy.metrics?.lastViewed ? formatDate(policy.metrics.lastViewed) : 'Never'}
            </dd>
          </div>
        </dl>
      </section>

      {/* Risk Information */}
      {policy.riskLevel && (
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Risk Assessment
          </h3>
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500 mb-2">Risk Level</dt>
              <dd>
                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                  policy.riskLevel === 'High' 
                    ? 'bg-red-100 text-red-800'
                    : policy.riskLevel === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {policy.riskLevel} Risk
                </span>
              </dd>
            </div>
            {policy.riskMitigationNotes && (
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-2">Risk Mitigation Notes</dt>
                <dd className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {policy.riskMitigationNotes}
                </dd>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Description */}
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Description
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 leading-relaxed">
            {policy.description || 'No description available.'}
          </p>
        </div>
      </section>
    </div>
  );
}