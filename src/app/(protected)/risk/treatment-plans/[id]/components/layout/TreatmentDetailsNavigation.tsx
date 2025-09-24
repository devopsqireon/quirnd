// /app/risk/treatment-plan/[id]/components/layout/TreatmentDetailsNavigation.tsx
'use client';

import React from 'react';
import { 
  LayoutDashboardIcon, 
  CheckSquareIcon, 
  GanttChartIcon, 
  TrendingUpIcon, 
  FileTextIcon, 
  ActivityIcon,
  MessageSquareIcon,
  SettingsIcon
} from 'lucide-react';
import { useTreatmentDetails } from '../../contexts/TreatmentDetailsContext';
import { ViewMode } from '../../types';

const navigationItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboardIcon,
    description: 'Summary and key information'
  },
  {
    id: 'actions',
    label: 'Action Items',
    icon: CheckSquareIcon,
    description: 'Tasks and implementation steps'
  },
  {
    id: 'timeline',
    label: 'Timeline',
    icon: GanttChartIcon,
    description: 'Milestones and schedule'
  },
  {
    id: 'metrics',
    label: 'Metrics',
    icon: TrendingUpIcon,
    description: 'Performance indicators'
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileTextIcon,
    description: 'Files and attachments'
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: ActivityIcon,
    description: 'Changes and updates'
  },
  {
    id: 'comments',
    label: 'Comments',
    icon: MessageSquareIcon,
    description: 'Discussions and notes'
  }
];

export const TreatmentDetailsNavigation: React.FC = () => {
  const { viewMode, setViewMode, treatmentDetails } = useTreatmentDetails();

  const getItemCount = (itemId: string): number | undefined => {
    if (!treatmentDetails) return undefined;
    
    switch (itemId) {
      case 'actions':
        return treatmentDetails.actionItems.length;
      case 'documents':
        return treatmentDetails.documents.length;
      case 'comments':
        return treatmentDetails.comments.length;
      case 'activity':
        return treatmentDetails.activityLog.length;
      case 'metrics':
        return treatmentDetails.metrics.length;
      default:
        return undefined;
    }
  };

  const getActiveCount = (itemId: string): number | undefined => {
    if (!treatmentDetails) return undefined;
    
    switch (itemId) {
      case 'actions':
        return treatmentDetails.actionItems.filter(item => 
          item.status === 'In Progress' || item.status === 'Not Started'
        ).length;
      default:
        return undefined;
    }
  };

  return (
    <nav className="py-3">
      <div className="flex space-x-8 overflow-x-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = viewMode.type === item.id;
          const itemCount = getItemCount(item.id);
          const activeCount = getActiveCount(item.id);

          return (
            <button
              key={item.id}
              onClick={() => setViewMode({ type: item.id as ViewMode['type'] })}
              className={`
                flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap
                ${isActive
                  ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
              title={item.description}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              
              {/* Item count badge */}
              {itemCount !== undefined && itemCount > 0 && (
                <span className={`
                  inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                  ${isActive
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-gray-200 text-gray-700'
                  }
                `}>
                  {itemCount}
                </span>
              )}
              
              {/* Active/urgent count for actions */}
              {activeCount !== undefined && activeCount > 0 && item.id === 'actions' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                  {activeCount} active
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};