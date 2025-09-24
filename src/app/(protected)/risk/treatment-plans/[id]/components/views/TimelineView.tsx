// /app/risk/treatment-plan/[id]/components/views/TimelineView.tsx
'use client';

import React from 'react';
import { CalendarIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon } from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';

export const TimelineView: React.FC = () => {
  const { treatmentDetails } = useTreatmentDetails();

  if (!treatmentDetails) return null;

  const { milestones, actionItems } = treatmentDetails;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
      case 'In Progress': return <ClockIcon className="w-6 h-6 text-blue-600" />;
      case 'Overdue': return <AlertCircleIcon className="w-6 h-6 text-red-600" />;
      default: return <ClockIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Timeline & Milestones</h2>
        <p className="text-gray-600 text-sm">Track progress through key milestones and deadlines</p>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Milestones</h3>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {index < milestones.length - 1 && (
                  <div className="absolute left-3 top-8 w-0.5 h-16 bg-gray-200"></div>
                )}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(milestone.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{milestone.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4" />
                        Target: {formatDate(milestone.targetDate)}
                        {milestone.completedDate && (
                          <span className="text-green-600 ml-2">
                            ✓ Completed: {formatDate(milestone.completedDate)}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{milestone.description}</p>
                    
                    {milestone.criteria.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Success Criteria:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {milestone.criteria.map((criterion, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-gray-400">•</span>
                              {criterion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        milestone.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {milestone.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h3>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-3">
            {actionItems
              .filter(item => item.status !== 'Completed')
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 5)
              .map((item) => {
                const daysUntilDue = Math.ceil(
                  (new Date(item.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                const isOverdue = daysUntilDue < 0;
                const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;
                
                return (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-600">Assigned to: {item.assignedTo}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{formatDate(item.dueDate)}</span>
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
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};