// File: src/components/feedback/AIInsights.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Brain, TrendingUp, Users, Lightbulb } from 'lucide-react';

interface InsightCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  recommendation: string;
  iconColor: string;
}

const insights: InsightCard[] = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Trending Requests',
    description: 'Based on recent submissions, mobile app improvements are trending 340% higher than usual.',
    recommendation: 'Recommend prioritizing mobile features',
    iconColor: 'text-purple-600'
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'User Segments',
    description: 'Enterprise customers are requesting advanced analytics 5x more than other segments.',
    recommendation: 'Consider enterprise-focused features',
    iconColor: 'text-blue-600'
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: 'Smart Suggestions',
    description: 'Similar feedback detected: "API Documentation" appears in 12 different requests.',
    recommendation: 'Consolidate related feedback items',
    iconColor: 'text-yellow-600'
  }
];

export default function AIInsights() {
  return (
    <Card className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">AI-Powered Insights</CardTitle>
            <p className="text-purple-700">Intelligent recommendations based on feedback patterns</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-purple-200">
              <div className="flex items-center mb-4">
                <div className={`${insight.iconColor} mr-3`}>
                  {insight.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{insight.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
              <div className={`text-sm ${insight.iconColor} font-medium`}>
                {insight.recommendation}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}