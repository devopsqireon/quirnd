// /app/risk/treatment-plan/[id]/components/shared/TreatmentActionsDropdown.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { 
  EditIcon, 
  CopyIcon, 
  ArchiveIcon, 
  TrashIcon, 
  PlayIcon, 
  PauseIcon, 
  CheckCircleIcon 
} from 'lucide-react';
import { TreatmentPlan } from '../../types';

interface TreatmentActionsDropdownProps {
  onClose: () => void;
  treatmentPlan: TreatmentPlan;
  onUpdate: (updates: Partial<TreatmentPlan>) => Promise<void>;
}

export const TreatmentActionsDropdown: React.FC<TreatmentActionsDropdownProps> = ({
  onClose,
  treatmentPlan,
  onUpdate
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleStatusChange = async (newStatus: TreatmentPlan['status']) => {
    try {
      await onUpdate({ status: newStatus });
      onClose();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const actions = [
    {
      label: 'Edit Treatment Plan',
      icon: EditIcon,
      onClick: () => {
        // Handle edit
        onClose();
      }
    },
    {
      label: 'Duplicate',
      icon: CopyIcon,
      onClick: () => {
        // Handle duplicate
        onClose();
      }
    },
    { type: 'divider' },
    {
      label: 'Mark In Progress',
      icon: PlayIcon,
      onClick: () => handleStatusChange('In Progress'),
      disabled: treatmentPlan.status === 'In Progress'
    },
    {
      label: 'Put On Hold',
      icon: PauseIcon,
      onClick: () => handleStatusChange('On Hold'),
      disabled: treatmentPlan.status === 'On Hold'
    },
    {
      label: 'Mark Completed',
      icon: CheckCircleIcon,
      onClick: () => handleStatusChange('Completed'),
      disabled: treatmentPlan.status === 'Completed'
    },
    { type: 'divider' },
    {
      label: 'Archive',
      icon: ArchiveIcon,
      onClick: () => {
        // Handle archive
        onClose();
      }
    },
    {
      label: 'Delete',
      icon: TrashIcon,
      onClick: () => {
        // Handle delete
        onClose();
      },
      className: 'text-red-600 hover:text-red-700'
    }
  ];

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20"
    >
      {actions.map((action, index) => {
        if (action.type === 'divider') {
          return <div key={index} className="border-t border-gray-100 my-1" />;
        }

        const Icon = action.icon;
        return (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`
              w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors
              ${action.disabled 
                ? 'text-gray-400 cursor-not-allowed' 
                : action.className || 'text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
};