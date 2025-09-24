// File: src/components/feedback/FeedbackAnalytics.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CategoryData {
  name: string;
  count: number;
  color: string;
  percentage: number;
}

interface MetricCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const categoryData: CategoryData[] = [
  { name: 'Feature Requests', count: 142, color: 'bg-blue-500', percentage: 65 },
  { name: 'Bug Reports', count: 89, color: 'bg-red-500', percentage: 40 },
  { name: 'Improvements', count: 67, color: 'bg-green-500', percentage: 30 },
  { name: 'Integrations', count: 34, color: 'bg-purple-500', percentage: 15 }
];

const metrics: MetricCard[] = [
  {
    title: 'Average Resolution Time',
    value: '14 days',
    change: '↓ 3 days faster than last month',
    isPositive: true,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600'
  },
  {
    title: 'Customer Satisfaction',
    value: '4.7/5',
    change: '↑ 0.2 points increase',
    isPositive: true,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600'
  },
  {
    title: 'Implementation Rate',
    value: '68%',
    change: '↑ 5% increase from last quarter',
    isPositive: true,
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600'
  }
];

export default function FeedbackAnalytics() {
  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Feedback Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback by Category</h3>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 ${category.color} rounded mr-3`} />
                    <span className="text-gray-700">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 font-medium">{category.count}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${category.color} h-2 rounded-full`} 
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Timeline</h3>
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className={`${metric.bgColor} border ${metric.borderColor} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`${metric.textColor.replace('text-', 'text-')} font-medium`}>
                      {metric.title}
                    </span>
                    <span className={`${metric.textColor} font-bold`}>{metric.value}</span>
                  </div>
                  <div className={`text-sm ${metric.textColor} flex items-center`}>
                    {metric.isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}