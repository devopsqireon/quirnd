// File: src/components/feedback/RecentUpdates.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface UpdateItem {
  title: string;
  status: string;
  date: string;
  color: string;
}

const updates: UpdateItem[] = [
  {
    title: 'Dashboard Performance Boost',
    status: 'Released • Oct 20, 2024',
    date: 'Oct 2024',
    color: 'bg-green-500'
  },
  {
    title: 'Enhanced Security Features',
    status: 'In Progress • Est. Nov 2024',
    date: 'Nov 2024',
    color: 'bg-blue-500'
  },
  {
    title: 'Mobile App Redesign',
    status: 'Planning • Q1 2025',
    date: 'Q1 2025',
    color: 'bg-yellow-500'
  }
];

export default function RecentUpdates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.map((update, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 ${update.color} rounded-full mt-2 flex-shrink-0`} />
              <div>
                <p className="text-sm font-medium text-gray-900">{update.title}</p>
                <p className="text-xs text-gray-500 mt-1">{update.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}