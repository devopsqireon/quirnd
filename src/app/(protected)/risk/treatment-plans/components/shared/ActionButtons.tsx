// /app/risk/treatment-plans/components/shared/ActionButtons.tsx
import React from 'react';
import { Eye, Edit3, MoreVertical, Copy, Archive, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onCopy?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  showMoreActions?: boolean;
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onView,
  onEdit,
  onCopy,
  onArchive,
  onDelete,
  showMoreActions = true,
  className = ''
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {onView && (
        <button 
          onClick={onView}
          className="text-blue-600 hover:text-blue-900 transition-colors"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}
      
      {onEdit && (
        <button 
          onClick={onEdit}
          className="text-green-600 hover:text-green-900 transition-colors"
          title="Edit"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      )}

      {showMoreActions && (
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
            title="More Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                {onCopy && (
                  <button
                    onClick={() => { onCopy(); setShowDropdown(false); }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </button>
                )}
                {onArchive && (
                  <button
                    onClick={() => { onArchive(); setShowDropdown(false); }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => { onDelete(); setShowDropdown(false); }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};