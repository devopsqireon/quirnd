// File: /app/policy-management/view/components/ui/FloatingActionButtons.tsx

'use client'

import React, { useState } from 'react';
import {
  Pencil,
  Share,
  Printer,
  Bookmark,
  Plus,
  X
} from 'lucide-react';

interface FloatingActionButtonsProps {
  onEdit: () => void;
  onShare: () => void;
  onPrint: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

export function FloatingActionButtons({
  onEdit,
  onShare,
  onPrint,
  onBookmark,
  isBookmarked
}: FloatingActionButtonsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      label: 'Edit Policy',
      icon: Pencil,
      onClick: onEdit,
      className: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      label: 'Share Policy',
      icon: Share,
      onClick: onShare,
      className: 'bg-green-600 hover:bg-green-700 text-white'
    },
    {
      label: 'Print Policy',
      icon: Printer,
      onClick: onPrint,
      className: 'bg-gray-600 hover:bg-gray-700 text-white'
    },
    {
      label: isBookmarked ? 'Remove Bookmark' : 'Add Bookmark',
      icon: Bookmark,
      onClick: onBookmark,
      className: isBookmarked 
        ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col-reverse items-end space-y-reverse space-y-2 z-40">
      {/* Action Buttons */}
      <div className={`flex flex-col-reverse space-y-reverse space-y-2 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={`group relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 ${action.className}`}
            title={action.label}
          >
            <action.icon className="h-5 w-5" />
            
            {/* Tooltip */}
            <div className="absolute right-14 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {action.label}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
      >
        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}>
          {isExpanded ? (
            <X className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </div>
      </button>
    </div>
  );
}