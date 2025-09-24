// /app/risk/treatment-plan/[id]/components/views/OverviewView.tsx
'use client';

import React from 'react';
import { 
  CalendarIcon, 
  UserIcon, 
  UsersIcon, 
  DollarSignIcon, 
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  FileTextIcon,
  TagIcon
} from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';
import { TreatmentStatusBadge } from '../shared/TreatmentStatusBadge';
import { PriorityBadge } from '../shared/PriorityBadge';
import { ProgressBar } from '../shared/ProgressBar';
import { mockUsers } from '../../data/mockData';

export const OverviewView: React.FC = () => {
  const { treatmentDetails } = useTreatmentDetails();

  if (!treatmentDetails) return null;

  const { treatmentPlan, risk, actionItems, milestones, riskAssessments } = treatmentDetails;

  const overallProgress = Math.round(actionItems.reduce((acc, item) => acc + item.progress, 0) / actionItems.length);
  const completedActions = actionItems.filter(item => item.status === 'Completed').length;
  const completedMilestones = milestones.filter(milestone => milestone.status === 'Completed').length;
  const currentAssessment = riskAssessments.find(assessment => assessment.assessmentType === 'Current') || riskAssessments[0];

  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return user ? user.name : userId;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUpIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overall Progress</p>
              <p className="text-2xl font-semibold text-gray-900">{overallProgress}%</p>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar progress={overallProgress} size="sm" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Actions Complete</p>
              <p className="text-2xl font-semibold text-gray-900">{completedActions}/{actionItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Milestones</p>
              <p className="text-2xl font-semibold text-gray-900">{completedMilestones}/{milestones.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Current Risk Level</p>
              <p className="text-2xl font-semibold text-gray-900">{currentAssessment?.riskLevel}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Treatment Plan Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Treatment Plan Details</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    <TreatmentStatusBadge status={treatmentPlan.status} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Priority</label>
                  <div className="mt-1">
                    <PriorityBadge priority={treatmentPlan.priority} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Strategy</label>
                  <p className="mt-1 text-sm text-gray-900">{treatmentPlan.strategy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Version</label>
                  <p className="mt-1 text-sm text-gray-900">v{treatmentPlan.version}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 text-sm text-gray-900 leading-relaxed">{treatmentPlan.description}</p>
              </div>

              {/* Tags */}
              {treatmentPlan.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {treatmentPlan.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Timeline & Budget</h3>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Start Date</p>
                      <p className="text-sm text-gray-900">{formatDate(treatmentPlan.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Target Date</p>
                      <p className="text-sm text-gray-900">{formatDate(treatmentPlan.targetDate)}</p>
                    </div>
                  </div>
                  {treatmentPlan.completionDate && (
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Completed</p>
                        <p className="text-sm text-gray-900">{formatDate(treatmentPlan.completionDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {treatmentPlan.budget && (
                    <div className="flex items-center gap-3">
                      <DollarSignIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Budget</p>
                        <p className="text-sm text-gray-900">{formatCurrency(treatmentPlan.budget)}</p>
                      </div>
                    </div>
                  )}
                  {treatmentPlan.approvedBy && (
                    <div className="flex items-center gap-3">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Approved By</p>
                        <p className="text-sm text-gray-900">{treatmentPlan.approvedBy}</p>
                        {treatmentPlan.approvalDate && (
                          <p className="text-xs text-gray-500">{formatDate(treatmentPlan.approvalDate)}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Team</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Owner</label>
                <div className="flex items-center gap-3">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-900">{treatmentPlan.owner}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Assigned To</label>
                <div className="space-y-2">
                  {treatmentPlan.assignedTo.map((userId, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <UsersIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{getUserName(userId)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Risk Information */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Related Risk</h3>
            </div>
            <div className="px-6 py-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500">Risk Title</label>
                <p className="mt-1 text-sm text-gray-900">{risk.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Category</label>
                  <p className="mt-1 text-sm text-gray-900">{risk.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Level</label>
                  <p className="mt-1 text-sm text-gray-900">{risk.riskLevel}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Score</label>
                  <p className="mt-1 text-sm text-gray-900">{risk.riskScore}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Owner</label>
                  <p className="mt-1 text-sm text-gray-900">{risk.owner}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-3">
                {treatmentDetails.activityLog.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};