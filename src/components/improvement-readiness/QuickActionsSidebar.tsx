// src/components/improvement-readiness/QuickActionsSidebar.tsx
import React from 'react';
import { X, Plus, Lightbulb, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModals } from '@/components/improvement-readiness/modals/useModals';

interface QuickActionsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickActionsSidebar({ isOpen, onClose }: QuickActionsSidebarProps) {
  const { openModal } = useModals();

  const quickActions = [
    {
      id: 'new-corrective-action',
      title: 'New Corrective Action',
      description: 'Create a new corrective action item',
      icon: Plus,
      color: 'text-blue-600',
      onClick: () => openModal('new-corrective-action')
    },
    {
      id: 'add-improvement',
      title: 'Add Improvement',
      description: 'Log an improvement opportunity',
      icon: Lightbulb,
      color: 'text-yellow-600',
      onClick: () => openModal('new-improvement')
    },
    {
      id: 'schedule-review',
      title: 'Schedule Review',
      description: 'Plan a management review meeting',
      icon: Calendar,
      color: 'text-green-600',
      onClick: () => openModal('schedule-review')
    },
    {
      id: 'export-report',
      title: 'Export Report',
      description: 'Generate compliance reports',
      icon: FileText,
      color: 'text-purple-600',
      onClick: () => {}
    }
  ];

  return (
    <aside
      className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className="w-full flex items-center justify-start p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon className={`w-5 h-5 ${action.color} mr-3 flex-shrink-0`} />
              <div>
                <div className="font-medium text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-500">{action.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}