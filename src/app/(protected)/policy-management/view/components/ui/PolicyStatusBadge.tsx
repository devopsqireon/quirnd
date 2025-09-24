// File: /app/policy-management/view/components/ui/PolicyStatusBadge.tsx

'use client'

import React from 'react';

interface PolicyStatusBadgeProps {
  status: 'Draft' | 'Under Review' | 'Active' | 'Expired' | 'Archived';
  size?: 'sm' | 'md' | 'lg';
}

export function PolicyStatusBadge({ status, size = 'md' }: PolicyStatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Archived':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-2.5 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1 text-sm';
      default:
        return 'px-2.5 py-0.5 text-xs';
    }
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-full ${getStatusStyles(status)} ${getSizeStyles(size)}`}
    >
      {status}
    </span>
  );
}