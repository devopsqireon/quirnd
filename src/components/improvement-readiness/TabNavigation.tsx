// src/components/improvement-readiness/TabNavigation.tsx
import React from 'react';
import { CheckSquare, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    {
      id: 'corrective-actions',
      label: 'Corrective Actions',
      icon: CheckSquare,
    },
    {
      id: 'improvement-log',
      label: 'Improvement Log',
      icon: TrendingUp,
    },
    {
      id: 'management-reviews',
      label: 'Management Reviews',
      icon: Users,
    },
    {
      id: 'certification-dashboard',
      label: 'Certification Dashboard',
      icon: BarChart3,
    },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 mr-2 inline" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}