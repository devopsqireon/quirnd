// File: src/components/feedback/EngagementMetrics.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageSquare, ThumbsUp, Users, Rocket, TrendingUp } from 'lucide-react';

interface MetricItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: string;
  changeColor: string;
  bgColor: string;
  iconColor: string;
}

const metrics: MetricItem[] = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    value: '1,247',
    label: 'Total Feedback',
    change: '↑ 23% this month',
    changeColor: 'text-green-600',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    icon: <ThumbsUp className="w-6 h-6" />,
    value: '8,934',
    label: 'Community Votes',
    change: '↑ 45% this month',
    changeColor: 'text-green-600',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: '456',
    label: 'Active Contributors',
    change: '↑ 12% this month',
    changeColor: 'text-blue-600',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    value: '89',
    label: 'Features Delivered',
    change: '↑ 8% this quarter',
    changeColor: 'text-green-600',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }
];

export default function EngagementMetrics() {
  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Community Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${metric.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <div className={metric.iconColor}>
                  {metric.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.label}</div>
              <div className={`text-xs ${metric.changeColor} mt-1 flex items-center justify-center`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {metric.change}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}