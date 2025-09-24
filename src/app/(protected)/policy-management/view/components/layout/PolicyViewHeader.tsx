// File: /app/policy-management/view/components/layout/PolicyViewHeader.tsx

'use client'

import React from 'react';
import { 
  Pencil, 
  Share, 
  Printer, 
  Archive,
  Bookmark,
  Eye,
  Calendar,
  User,
  Tag,
  ChevronDown
} from 'lucide-react';
import { PolicyViewData } from '../../types/policy-view.types';
import { PolicyStatusBadge } from '../ui/PolicyStatusBadge';

interface PolicyViewHeaderProps {
  policy: PolicyViewData;
  isBookmarked: boolean;
  onEdit: () => void;
  onShare: () => void;
  onPrint: () => void;
  onArchive: () => void;
  onBookmark: () => void;
}

export function PolicyViewHeader({ 
  policy, 
  isBookmarked, 
  onEdit, 
  onShare, 
  onPrint, 
  onArchive, 
  onBookmark 
}: PolicyViewHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          {/* Title and Actions Row */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {policy.title}
                </h1>
                <PolicyStatusBadge status={policy.status} />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  v{policy.version}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 max-w-3xl">
                {policy.description}
              </p>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Owner: {policy.owner}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Effective: {new Date(policy.effectiveDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{policy.metrics.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>{policy.category}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {policy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={onBookmark}
                className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                {isBookmarked ? (
                  <Bookmark fill="currentColor" className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={onPrint}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>

              <button
                onClick={onShare}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </button>

              <button
                onClick={onEdit}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </button>

              {/* More Actions Dropdown */}
              <div className="relative">
                <button
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Dropdown menu would go here */}
                <div className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      onClick={onArchive}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Archive className="h-4 w-4 mr-3" />
                      Archive Policy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning/Alert Messages */}
          {policy.status === 'Expired' && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    This policy has expired on {new Date(policy.expiryDate).toLocaleDateString()}. 
                    Please review and update as needed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {policy.acknowledgments.required && policy.acknowledgments.acknowledged < policy.acknowledgments.totalUsers && (
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Acknowledgment pending: {policy.acknowledgments.acknowledged}/{policy.acknowledgments.totalUsers} users 
                    have acknowledged this policy. Deadline: {new Date(policy.acknowledgments.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}