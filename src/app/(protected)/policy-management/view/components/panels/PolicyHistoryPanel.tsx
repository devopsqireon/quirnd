// File: /app/policy-management/view/components/panels/PolicyHistoryPanel.tsx

'use client'

import React, { useState } from 'react';
import {
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { VersionRecord } from '../../types/policy-view.types';

interface PolicyHistoryPanelProps {
  history: VersionRecord[];
}

export function PolicyHistoryPanel({ history }: PolicyHistoryPanelProps) {
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set());
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleExpanded = (version: string) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(version)) {
      newExpanded.delete(version);
    } else {
      newExpanded.add(version);
    }
    setExpandedVersions(newExpanded);
  };

  const handleVersionSelect = (version: string) => {
    if (selectedVersions.includes(version)) {
      setSelectedVersions(selectedVersions.filter(v => v !== version));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, version]);
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'Major Revision':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Minor Update':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Administrative Change':
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

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Version History</h3>
        <div className="flex items-center space-x-3">
          {selectedVersions.length === 2 && (
            <button
              onClick={() => setShowComparison(true)}
              className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
              Compare Versions
            </button>
          )}
          <span className="text-sm text-gray-500">
            {history.length} version{history.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Selection Instructions */}
      {selectedVersions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            {selectedVersions.length === 1 
              ? 'Select one more version to compare' 
              : `Selected versions: ${selectedVersions.join(', ')}`}
            {selectedVersions.length === 2 && ' - Click "Compare Versions" to see differences'}
          </p>
        </div>
      )}

      {/* Version Timeline */}
      <div className="space-y-4">
        {history.map((version, index) => {
          const isExpanded = expandedVersions.has(version.version);
          const isSelected = selectedVersions.includes(version.version);
          const isLatest = index === 0;

          return (
            <div
              key={version.version}
              className={`border rounded-lg transition-all duration-200 ${
                isSelected 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Version Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleVersionSelect(version.version)}
                      disabled={!isSelected && selectedVersions.length >= 2}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono font-semibold text-gray-900">
                        v{version.version}
                      </span>
                      {isLatest && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Current
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getChangeTypeColor(version.type)}`}>
                        {version.type}
                      </span>
                      {version.approved && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Approved
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View this version"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Download this version"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleExpanded(version.version)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDownIcon className="h-4 w-4" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-4 w-4" />
                    <span>{version.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{formatDate(version.date)}</span>
                  </div>
                </div>

                {/* Quick Summary */}
                <div className="mt-2">
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {version.changes}
                  </p>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <div className="space-y-4">
                    {/* Detailed Changes */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <DocumentTextIcon className="h-4 w-4 mr-2" />
                        Detailed Changes
                      </h4>
                      <div className="bg-white rounded-md p-3 text-sm text-gray-700">
                        {version.changes}
                      </div>
                    </div>

                    {/* Mock change diff */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Modifications</h4>
                      <div className="space-y-2">
                        <div className="bg-green-50 border-l-4 border-green-400 p-2 text-sm">
                          <span className="text-green-800">+ Added new authentication requirements section</span>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-400 p-2 text-sm">
                          <span className="text-red-800">- Removed outdated password complexity rules</span>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-2 text-sm">
                          <span className="text-blue-800">~ Updated compliance references</span>
                        </div>
                      </div>
                    </div>

                    {/* Version Statistics */}
                    <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">12</div>
                        <div className="text-xs text-gray-500">Sections Modified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">8</div>
                        <div className="text-xs text-gray-500">Additions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-red-600">3</div>
                        <div className="text-xs text-gray-500">Deletions</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Version Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Compare Versions: {selectedVersions.join(' vs ')}
              </h3>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Comparison content would go here */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Version {selectedVersions[0]}</h4>
                  <div className="bg-gray-50 rounded-md p-4 text-sm">
                    <p>Version content and changes would be displayed here...</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Version {selectedVersions[1]}</h4>
                  <div className="bg-gray-50 rounded-md p-4 text-sm">
                    <p>Version content and changes would be displayed here...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}