// src/app/(protected)/settings/help-support/components/NavigationTabs.tsx
import React from 'react';
import { Plus, List, MessageCircle, Book, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    {
      id: 'submit-ticket',
      label: 'Submit Ticket',
      icon: Plus,
    },
    {
      id: 'my-tickets',
      label: 'My Tickets',
      icon: List,
    },
    {
      id: 'live-chat',
      label: 'Live Chat',
      icon: MessageCircle,
    },
    {
      id: 'knowledge-base',
      label: 'Knowledge Base',
      icon: Book,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`
                  border-b-2 rounded-none py-6 px-1 text-sm font-medium
                  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}