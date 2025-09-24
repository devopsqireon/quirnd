// src/app/(protected)/settings/help-support/components/RecentActivity.tsx
import React from 'react';
import { CheckCircle, MessageCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'resolved',
      title: 'Ticket #12345 resolved',
      description: 'Login issue fixed by Agent Mike - 2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 2,
      type: 'message',
      title: 'New message on ticket #12344',
      description: 'Agent Sarah replied to your billing inquiry - 4 hours ago',
      icon: MessageCircle,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 3,
      type: 'progress',
      title: 'Ticket #12343 in progress',
      description: 'Feature request assigned to development team - 1 day ago',
      icon: Clock,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className={`h-8 w-8 ${activity.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}