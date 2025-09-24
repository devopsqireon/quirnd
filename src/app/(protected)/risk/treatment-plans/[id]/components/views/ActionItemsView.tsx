// /app/risk/treatment-plan/[id]/components/views/ActionItemsView.tsx
'use client';

import React, { useState } from 'react';
import { 
  PlusIcon,
  FilterIcon,
  SearchIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  FileTextIcon
} from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';
import { ActionStatusBadge } from '../shared/ActionStatusBadge';
import { PriorityBadge } from '../shared/PriorityBadge';
import { ProgressBar } from '../shared/ProgressBar';
import { ActionItem } from '../../types';
import { mockUsers } from '../../data/mockData';

export const ActionItemsView: React.FC = () => {
  const { treatmentDetails, updateActionItem } = useTreatmentDetails();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if (!treatmentDetails) return null;

  const { actionItems } = treatmentDetails;

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : userId;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusIcon = (status: ActionItem['status']) => {
    switch (status) {
      case 'Completed': return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'In Progress': return <PlayIcon className="w-4 h-4 text-blue-600" />;
      case 'Blocked': return <AlertCircleIcon className="w-4 h-4 text-red-600" />;
      case 'Cancelled': return <PauseIcon className="w-4 h-4 text-gray-600" />;
      default: return <ClockIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredItems = actionItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusChange = async (itemId: string, newStatus: ActionItem['status']) => {
    try {
      await updateActionItem(itemId, { 
        status: newStatus,
        ...(newStatus === 'Completed' && { completedDate: new Date().toISOString(), progress: 100 })
      });
    } catch (error) {
      console.error('Failed to update action item:', error);
    }
  };

  const handleProgressUpdate = async (itemId: string, progress: number) => {
    try {
      await updateActionItem(itemId, { progress });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Action Items</h2>
          <p className="text-gray-600 text-sm">Track and manage implementation tasks</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Action Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search actions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <div className="text-sm text-gray-600">
            {filteredItems.length} of {actionItems.length} items
          </div>
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const daysUntilDue = getDaysUntilDue(item.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;

          return (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <UserIcon className="w-4 h-4" />
                          {getUserName(item.assignedTo)}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          Due {formatDate(item.dueDate)}
                        </span>
                        <span>Type: {item.type}</span>
                        {item.estimatedEffort && (
                          <span>Est. {item.estimatedEffort}h</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <ActionStatusBadge status={item.status} size="sm" />
                        <PriorityBadge priority={item.priority} size="sm" />
                        
                        {isOverdue && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {Math.abs(daysUntilDue)} days overdue
                          </span>
                        )}
                        
                        {isDueSoon && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Due in {daysUntilDue} days
                          </span>
                        )}
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm text-gray-600">{item.progress}%</span>
                        </div>
                        <ProgressBar progress={item.progress} size="sm" />
                      </div>

                      {/* Dependencies and Blockers */}
                      {(item.dependencies.length > 0 || item.blockers.length > 0) && (
                        <div className="space-y-2 mb-3">
                          {item.dependencies.length > 0 && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">Dependencies:</span>
                              <span className="text-gray-600 ml-2">{item.dependencies.join(', ')}</span>
                            </div>
                          )}
                          {item.blockers.length > 0 && (
                            <div className="text-sm">
                              <span className="font-medium text-red-700">Blockers:</span>
                              <span className="text-red-600 ml-2">{item.blockers.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Notes */}
                      {item.notes && (
                        <div className="bg-gray-50 rounded-md p-3 mb-3">
                          <div className="flex items-start gap-2">
                            <FileTextIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                              <p className="text-sm text-gray-600">{item.notes}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Attachments */}
                      {item.attachments.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Attachments</p>
                          <div className="space-y-1">
                            {item.attachments.map((attachment) => (
                              <a
                                key={attachment.id}
                                href={attachment.url}
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                              >
                                <FileTextIcon className="w-4 h-4 mr-1" />
                                {attachment.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    {item.status !== 'Completed' && (
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as ActionItem['status'])}
                        className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    )}
                    
                    {item.status === 'In Progress' && (
                      <select
                        value={Math.floor(item.progress / 25) * 25}
                        onChange={(e) => handleProgressUpdate(item.id, parseInt(e.target.value))}
                        className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value={0}>0%</option>
                        <option value={25}>25%</option>
                        <option value={50}>50%</option>
                        <option value={75}>75%</option>
                        <option value={100}>100%</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Effort Tracking */}
                {(item.estimatedEffort || item.actualEffort) && (
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {item.estimatedEffort && (
                        <div>
                          <span className="font-medium text-gray-700">Estimated Effort:</span>
                          <span className="text-gray-600 ml-2">{item.estimatedEffort} hours</span>
                        </div>
                      )}
                      {item.actualEffort && (
                        <div>
                          <span className="font-medium text-gray-700">Actual Effort:</span>
                          <span className="text-gray-600 ml-2">{item.actualEffort} hours</span>
                          {item.estimatedEffort && (
                            <span className={`ml-2 text-xs ${
                              item.actualEffort > item.estimatedEffort ? 'text-red-600' : 'text-green-600'
                            }`}>
                              ({item.actualEffort > item.estimatedEffort ? '+' : ''}{item.actualEffort - item.estimatedEffort}h)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <CheckCircleIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No action items found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'Get started by adding your first action item.'}
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {actionItems.filter(item => item.status === 'Not Started').length}
            </p>
            <p className="text-sm text-gray-600">Not Started</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {actionItems.filter(item => item.status === 'In Progress').length}
            </p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {actionItems.filter(item => item.status === 'Completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {actionItems.filter(item => item.status === 'Blocked').length}
            </p>
            <p className="text-sm text-gray-600">Blocked</p>
          </div>
        </div>
      </div>
    </div>
  );
};