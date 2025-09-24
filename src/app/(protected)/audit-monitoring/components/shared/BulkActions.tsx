// /app/(protected)/audit-monitoring/components/shared/BulkActions.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  ChevronDown, 
  Download, 
  Trash2, 
  Edit, 
  Tag, 
  Archive,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface BulkAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick: (selectedIds: string[]) => void;
  variant?: 'default' | 'destructive';
  requiresConfirmation?: boolean;
}

interface BulkActionsProps {
  selectedCount: number;
  selectedIds: string[];
  actions: BulkAction[];
  onClearSelection: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  selectedIds,
  actions,
  onClearSelection
}) => {
  const handleAction = (action: BulkAction) => {
    if (action.requiresConfirmation) {
      const confirmed = window.confirm(
        `Are you sure you want to ${action.label.toLowerCase()} ${selectedCount} item${selectedCount !== 1 ? 's' : ''}?`
      );
      if (!confirmed) return;
    }

    try {
      action.onClick(selectedIds);
      toast.success(`${action.label} completed`, {
        description: `Successfully processed ${selectedCount} item${selectedCount !== 1 ? 's' : ''}`
      });
      onClearSelection();
    } catch (error) {
      toast.error(`${action.label} failed`, {
        description: 'Please try again or contact support'
      });
    }
  };

  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <span className="text-sm text-blue-700">
        {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
      </span>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Actions
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {actions.map((action, index) => (
            <React.Fragment key={action.key}>
              {index > 0 && actions[index - 1].variant !== action.variant && (
                <DropdownMenuSeparator />
              )}
              <DropdownMenuItem
                onClick={() => handleAction(action)}
                className={action.variant === 'destructive' ? 'text-red-600' : ''}
              >
                {action.icon}
                <span className="ml-2">{action.label}</span>
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="sm" onClick={onClearSelection}>
        Clear Selection
      </Button>
    </div>
  );
};

// Default bulk actions for different entity types
export const DEFAULT_AUDIT_LOG_ACTIONS: BulkAction[] = [
  {
    key: 'export',
    label: 'Export Selected',
    icon: <Download className="w-4 h-4" />,
    onClick: (ids) => console.log('Export:', ids)
  },
  {
    key: 'archive',
    label: 'Archive Selected',
    icon: <Archive className="w-4 h-4" />,
    onClick: (ids) => console.log('Archive:', ids),
    requiresConfirmation: true
  }
];

export const DEFAULT_EVIDENCE_ACTIONS: BulkAction[] = [
  {
    key: 'export',
    label: 'Export Selected',
    icon: <Download className="w-4 h-4" />,
    onClick: (ids) => console.log('Export:', ids)
  },
  {
    key: 'tag',
    label: 'Add Tags',
    icon: <Tag className="w-4 h-4" />,
    onClick: (ids) => console.log('Tag:', ids)
  },
  {
    key: 'verify',
    label: 'Mark as Verified',
    icon: <CheckCircle className="w-4 h-4" />,
    onClick: (ids) => console.log('Verify:', ids)
  },
  {
    key: 'delete',
    label: 'Delete Selected',
    icon: <Trash2 className="w-4 h-4" />,
    onClick: (ids) => console.log('Delete:', ids),
    variant: 'destructive',
    requiresConfirmation: true
  }
];

export const DEFAULT_AUDIT_ACTIONS: BulkAction[] = [
  {
    key: 'export',
    label: 'Export Selected',
    icon: <Download className="w-4 h-4" />,
    onClick: (ids) => console.log('Export:', ids)
  },
  {
    key: 'update-status',
    label: 'Update Status',
    icon: <Edit className="w-4 h-4" />,
    onClick: (ids) => console.log('Update Status:', ids)
  },
  {
    key: 'delete',
    label: 'Delete Selected',
    icon: <Trash2 className="w-4 h-4" />,
    onClick: (ids) => console.log('Delete:', ids),
    variant: 'destructive',
    requiresConfirmation: true
  }
];