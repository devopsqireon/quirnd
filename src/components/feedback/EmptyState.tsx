// File: src/components/feedback/EmptyState.tsx

import React from 'react';
import { MessageSquare, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'no-feedback' | 'no-results' | 'no-roadmap';
  onAction?: () => void;
  actionLabel?: string;
}

export function EmptyState({ type, onAction, actionLabel }: EmptyStateProps) {
  const configs = {
    'no-feedback': {
      icon: MessageSquare,
      title: 'No feedback yet',
      description: 'Be the first to share your ideas and help shape the product.',
      action: 'Submit Feedback'
    },
    'no-results': {
      icon: Search,
      title: 'No results found',
      description: 'Try adjusting your search criteria or filters.',
      action: 'Clear Filters'
    },
    'no-roadmap': {
      icon: Plus,
      title: 'No roadmap items',
      description: 'Check back later for upcoming features and improvements.',
      action: undefined
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{config.title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{config.description}</p>
      {config.action && onAction && (
        <Button onClick={onAction}>
          {actionLabel || config.action}
        </Button>
      )}
    </div>
  );
}