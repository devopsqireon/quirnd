// File: src/components/feedback/QuickStats.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: number;
  color: string;
}

const stats: StatItem[] = [
  { label: 'Total Submissions', value: 24, color: 'bg-blue-500' },
  { label: 'Implemented', value: 8, color: 'bg-green-500' },
  { label: 'In Progress', value: 6, color: 'bg-yellow-500' },
  { label: 'Under Review', value: 10, color: 'bg-purple-500' }
];

export default function QuickStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 ${stat.color} rounded-full mr-3`} />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}