// src/app/(protected)/settings/help-support/components/SupportAnalytics.tsx
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SupportAnalytics() {
  const metrics = [
    {
      title: 'Avg Response Time',
      value: '2.3h',
      change: '↓ 15% faster',
      changeColor: 'text-green-600',
      bgColor: 'bg-blue-50',
      valueColor: 'text-blue-600',
    },
    {
      title: 'Resolution Rate',
      value: '95%',
      change: '↑ 3% improved',
      changeColor: 'text-green-600',
      bgColor: 'bg-green-50',
      valueColor: 'text-green-600',
    },
    {
      title: 'Satisfaction Score',
      value: '4.8/5',
      change: '↑ 0.2 higher',
      changeColor: 'text-green-600',
      bgColor: 'bg-purple-50',
      valueColor: 'text-purple-600',
    },
    {
      title: 'Avg Interactions',
      value: '1.2',
      change: '↓ 0.3 fewer',
      changeColor: 'text-green-600',
      bgColor: 'bg-orange-50',
      valueColor: 'text-orange-600',
    },
  ];

  const categoryData = [
    { category: 'Technical Issues', percentage: 45, color: 'bg-blue-500', width: 'w-9/20' },
    { category: 'Account Management', percentage: 25, color: 'bg-green-500', width: 'w-1/4' },
    { category: 'Billing & Payments', percentage: 20, color: 'bg-purple-500', width: 'w-1/5' },
    { category: 'Feature Requests', percentage: 10, color: 'bg-orange-500', width: 'w-1/10' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Support Analytics</CardTitle>
        <p className="text-sm text-gray-500">Track your support experience and resolution times</p>
      </CardHeader>
      <CardContent>
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className={`text-center p-4 ${metric.bgColor} rounded-lg`}>
              <div className={`text-2xl font-bold ${metric.valueColor} mb-1`}>{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.title}</div>
              <div className={`text-xs ${metric.changeColor} mt-1`}>{metric.change}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ticket Volume Chart */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Ticket Volume (Last 30 Days)</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500">Chart visualization would appear here</p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Issues by Category</h3>
            <div className="space-y-3">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 ${item.color} rounded-full mr-3`}></div>
                    <span className="text-sm text-gray-700">{item.category}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{item.percentage}%</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className={`${item.width} h-2 ${item.color} rounded-full`}></div>
                    </div>
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