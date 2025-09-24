// src/components/incident-management/quick-actions.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Bell, 
  FileOutput, 
  Users 
} from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverBgColor: string;
  iconColor: string;
  onClick: () => void;
}

const quickActions: QuickAction[] = [
  {
    title: 'Create Template',
    description: 'Set up incident report templates for common scenarios',
    icon: <Plus className="h-6 w-6" />,
    bgColor: 'bg-blue-100',
    hoverBgColor: 'group-hover:bg-blue-200',
    iconColor: 'text-blue-600',
    onClick: () => console.log('Create template clicked')
  },
  {
    title: 'Alert Rules',
    description: 'Configure automatic notifications and escalation rules',
    icon: <Bell className="h-6 w-6" />,
    bgColor: 'bg-green-100',
    hoverBgColor: 'group-hover:bg-green-200',
    iconColor: 'text-green-600',
    onClick: () => console.log('Alert rules clicked')
  },
  {
    title: 'Export Report',
    description: 'Generate compliance reports for audits and reviews',
    icon: <FileOutput className="h-6 w-6" />,
    bgColor: 'bg-purple-100',
    hoverBgColor: 'group-hover:bg-purple-200',
    iconColor: 'text-purple-600',
    onClick: () => console.log('Export report clicked')
  },
  {
    title: 'Team Setup',
    description: 'Manage incident response teams and role assignments',
    icon: <Users className="h-6 w-6" />,
    bgColor: 'bg-orange-100',
    hoverBgColor: 'group-hover:bg-orange-200',
    iconColor: 'text-orange-600',
    onClick: () => console.log('Team setup clicked')
  }
];

export function QuickActions() {
  return (
    <section className="px-8 py-8 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600">Frequently used actions and shortcuts for efficient incident management.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card 
            key={index}
            className="group cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-200"
            onClick={action.onClick}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className={`${action.bgColor} p-3 rounded-lg ${action.hoverBgColor} transition-colors`}>
                  <div className={action.iconColor}>
                    {action.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">{action.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}