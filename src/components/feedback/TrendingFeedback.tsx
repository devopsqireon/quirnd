// File: src/components/feedback/TrendingFeedback.tsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TrendingItem {
  rank: number;
  title: string;
  votes: number;
  category: string;
}

const trendingItems: TrendingItem[] = [
  { rank: 1, title: 'Advanced Search Filters', votes: 47, category: 'Feature Request' },
  { rank: 2, title: 'Bulk Data Export', votes: 35, category: 'Improvement' },
  { rank: 3, title: 'Real-time Notifications', votes: 31, category: 'Feature Request' }
];

export default function TrendingFeedback() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">🔥 Trending Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trendingItems.map((item) => (
            <div key={item.rank} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold text-sm">{item.rank}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {item.votes} votes • {item.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}