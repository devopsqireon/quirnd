// src/components/dashboard/member/QuickStats.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare, FileText, GraduationCap, AlertTriangle } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  iconColor: string;
}

const stats: StatCard[] = [
  {
    title: 'Pending Tasks',
    value: '7',
    icon: CheckSquare,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Policies to Review',
    value: '3',
    icon: FileText,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    title: 'Training Progress',
    value: '85%',
    icon: GraduationCap,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Open Incidents',
    value: '1',
    icon: AlertTriangle,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  }
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`${stat.iconColor} h-6 w-6`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}