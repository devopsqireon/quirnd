// /app/risk/treatment-plan/[id]/components/views/ActivityView.tsx
'use client';

import React, { useState } from 'react';
import { 
  ActivityIcon, 
  UserIcon, 
  ClockIcon, 
  FileTextIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  UploadIcon,
  EditIcon
} from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';

export const ActivityView: React.FC = () => {
  const { treatmentDetails } = useTreatmentDetails();
  const [filterType, setFilterType] = useState<string>('all');

  if (!treatmentDetails) return null;

  const { activityLog } = treatmentDetails;

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'status_change': return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'comment_added': return <MessageSquareIcon className="w-5 h-5 text-blue-600" />;
      case 'document_uploaded': return <UploadIcon className="w-5 h-5 text-purple-600" />;
      case 'progress_updated': return <ActivityIcon className="w-5 h-5 text-orange-600" />;
      case 'assignment_changed': return <UserIcon className="w-5 h-5 text-indigo-600" />;
      case 'edit': return <EditIcon className="w-5 h-5 text-gray-600" />;
      default: return <ClockIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredActivity = activityLog.filter(activity => 
    filterType === 'all' || activity.action === filterType
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Activity Log</h2>
          <p className="text-gray-600 text-sm">Track all changes and updates to this treatment plan</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="all">All Activities</option>
          <option value="status_change">Status Changes</option>
          <option value="comment_added">Comments</option>
          <option value="document_uploaded">Document Uploads</option>
          <option value="progress_updated">Progress Updates</option>
          <option value="assignment_changed">Assignment Changes</option>
          <option value="edit">Edits</option>
        </select>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-6">
            {filteredActivity.map((activity, index) => (
              <div key={activity.id} className="relative">
                {index < filteredActivity.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-12 bg-gray-200"></div>
                )}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg">
                    {getActivityIcon(activity.action)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <UserIcon className="w-3 h-3" />
                        {activity.performedBy}
                      </span>
                      <span>•</span>
                      <span className="capitalize">{activity.entityType}</span>
                      {activity.entityId && (
                        <>
                          <span>•</span>
                          <span className="text-xs text-gray-500">ID: {activity.entityId.slice(-8)}</span>
                        </>
                      )}
                    </div>
                    
                    {/* Show change details if available */}
                    {(activity.previousValue || activity.newValue) && (
                      <div className="bg-gray-50 rounded-md p-3 mt-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {activity.previousValue && (
                            <div>
                              <span className="font-medium text-gray-700">Previous:</span>
                              <div className="text-gray-600 mt-1">
                                {typeof activity.previousValue === 'object' 
                                  ? JSON.stringify(activity.previousValue, null, 2)
                                  : String(activity.previousValue)}
                              </div>
                            </div>
                          )}
                          {activity.newValue && (
                            <div>
                              <span className="font-medium text-gray-700">New:</span>
                              <div className="text-gray-600 mt-1">
                                {typeof activity.newValue === 'object' 
                                  ? JSON.stringify(activity.newValue, null, 2)
                                  : String(activity.newValue)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredActivity.length === 0 && (
            <div className="text-center py-8">
              <ActivityIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activity found</h3>
              <p className="text-gray-600">
                {filterType !== 'all' 
                  ? 'Try changing the filter to see more activity.'
                  : 'Activity will appear here as changes are made to this treatment plan.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
