// src/app/(protected)/settings/help-support/components/SupportStatus.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SupportStatus() {
  const statusItems = [
    {
      label: 'System Status',
      value: 'All Systems Operational',
      indicator: <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>,
      textColor: 'text-green-600',
    },
    {
      label: 'Average Response Time',
      value: '< 2 hours',
      textColor: 'text-gray-900',
    },
    {
      label: 'Available Agents',
      value: '3 online',
      textColor: 'text-gray-900',
    },
    {
      label: 'Queue Position',
      value: 'No queue',
      textColor: 'text-gray-900',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statusItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <div className="flex items-center">
                {item.indicator}
                <span className={`text-sm ${item.textColor}`}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}