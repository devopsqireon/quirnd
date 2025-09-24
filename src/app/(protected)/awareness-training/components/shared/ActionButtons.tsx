// /app/awareness-training/components/shared/ActionButtons.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Download, UserPlus, Send } from 'lucide-react';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  onAssign?: () => void;
  onSend?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'default';
  showLabels?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
  onDownload,
  onAssign,
  onSend,
  size = 'sm',
  variant = 'ghost',
  showLabels = false
}) => {
  return (
    <div className="flex items-center gap-1">
      {onView && (
        <Button size={size} variant={variant} onClick={onView} title="View">
          <Eye className="w-4 h-4" />
          {showLabels && <span className="ml-1">View</span>}
        </Button>
      )}
      {onEdit && (
        <Button size={size} variant={variant} onClick={onEdit} title="Edit">
          <Edit className="w-4 h-4" />
          {showLabels && <span className="ml-1">Edit</span>}
        </Button>
      )}
      {onAssign && (
        <Button size={size} variant={variant} onClick={onAssign} title="Assign">
          <UserPlus className="w-4 h-4" />
          {showLabels && <span className="ml-1">Assign</span>}
        </Button>
      )}
      {onSend && (
        <Button size={size} variant={variant} onClick={onSend} title="Send">
          <Send className="w-4 h-4" />
          {showLabels && <span className="ml-1">Send</span>}
        </Button>
      )}
      {onDownload && (
        <Button size={size} variant={variant} onClick={onDownload} title="Download">
          <Download className="w-4 h-4" />
          {showLabels && <span className="ml-1">Download</span>}
        </Button>
      )}
      {onDelete && (
        <Button size={size} variant={variant} onClick={onDelete} title="Delete" className="text-red-600 hover:text-red-700">
          <Trash2 className="w-4 h-4" />
          {showLabels && <span className="ml-1">Delete</span>}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;