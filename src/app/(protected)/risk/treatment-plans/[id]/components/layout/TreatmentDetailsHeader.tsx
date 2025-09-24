// /app/risk/treatment-plan/[id]/components/layout/TreatmentDetailsHeader.tsx
'use client';

import React, { useState } from 'react';
import { 
  Edit2Icon, 
  ShareIcon, 
  MoreVerticalIcon, 
  CheckCircleIcon, 
  PauseCircleIcon,
  PlayCircleIcon,
  XCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  UsersIcon,
  CalendarIcon
} from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';
import { TreatmentStatusBadge } from '../shared/TreatmentStatusBadge';
import { PriorityBadge } from '../shared/PriorityBadge';
import { TreatmentActionsDropdown } from '../shared/TreatmentActionsDropdown';

export const TreatmentDetailsHeader: React.FC = () => {
  const { treatmentDetails, updateTreatmentPlan } = useTreatmentDetails();
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);

  if (!treatmentDetails) {
    return (
      <div className="py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  const { treatmentPlan, risk } = treatmentDetails;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'In Progress': return <PlayCircleIcon className="w-5 h-5 text-blue-600" />;
      case 'On Hold': return <PauseCircleIcon className="w-5 h-5 text-yellow-600" />;
      case 'Cancelled': return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default: return <ClockIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="py-6">
      {/* Main Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            {getStatusIcon(treatmentPlan.status)}
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {treatmentPlan.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <TreatmentStatusBadge status={treatmentPlan.status} />
            <PriorityBadge priority={treatmentPlan.priority} />
            <span className="text-sm text-gray-600">
              Version {treatmentPlan.version}
            </span>
          </div>

          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {treatmentPlan.description}
          </p>

          {/* Related Risk Info */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Related Risk</h3>
                <p className="text-gray-600 text-sm mb-2">{risk.title}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Risk Level: <span className="font-medium text-red-600">{risk.riskLevel}</span></span>
                  <span>Score: {risk.riskScore}</span>
                  <span>Category: {risk.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-6">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Edit2Icon className="w-4 h-4 mr-2" />
            Edit
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ShareIcon className="w-4 h-4 mr-2" />
            Share
          </button>
          <div className="relative">
            <button
              onClick={() => setShowActionsDropdown(!showActionsDropdown)}
              className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <MoreVerticalIcon className="w-4 h-4" />
            </button>
            {showActionsDropdown && (
              <TreatmentActionsDropdown
                onClose={() => setShowActionsDropdown(false)}
                treatmentPlan={treatmentPlan}
                onUpdate={updateTreatmentPlan}
              />
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUpIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(treatmentDetails.actionItems.reduce((acc, item) => acc + item.progress, 0) / treatmentDetails.actionItems.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Actions Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {treatmentDetails.actionItems.filter(item => item.status === 'Completed').length}/
                {treatmentDetails.actionItems.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UsersIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {treatmentPlan.assignedTo.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Days Remaining</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.max(0, Math.ceil((new Date(treatmentPlan.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};