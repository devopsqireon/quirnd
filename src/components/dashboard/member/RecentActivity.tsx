// src/components/dashboard/member/RecentActivity.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  FileText, 
  AlertTriangle, 
  Play, 
  User,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'completed' | 'accepted' | 'reported' | 'started' | 'updated';
  title: string;
  description: string;
  date: string;
  datetime: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  category?: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: 'completed',
    title: 'Completed',
    description: 'Phishing Awareness Training',
    date: 'Nov 25',
    datetime: '2024-11-25T14:30:00',
    icon: Check,
    iconBg: 'bg-green-500',
    iconColor: 'text-white',
    category: 'Training'
  },
  {
    id: 2,
    type: 'accepted',
    title: 'Accepted',
    description: 'Code of Conduct Policy',
    date: 'Nov 15',
    datetime: '2024-11-15T09:15:00',
    icon: FileText,
    iconBg: 'bg-blue-500',
    iconColor: 'text-white',
    category: 'Policy'
  },
  {
    id: 3,
    type: 'reported',
    title: 'Reported',
    description: 'Suspicious Email Incident',
    date: 'Dec 12',
    datetime: '2024-12-12T16:45:00',
    icon: AlertTriangle,
    iconBg: 'bg-red-500',
    iconColor: 'text-white',
    category: 'Incident'
  },
  {
    id: 4,
    type: 'started',
    title: 'Started',
    description: 'Data Protection & GDPR Training',
    date: 'Dec 10',
    datetime: '2024-12-10T11:20:00',
    icon: Play,
    iconBg: 'bg-yellow-500',
    iconColor: 'text-white',
    category: 'Training'
  },
  {
    id: 5,
    type: 'updated',
    title: 'Updated Profile',
    description: 'Emergency contact information',
    date: 'Dec 8',
    datetime: '2024-12-08T13:10:00',
    icon: User,
    iconBg: 'bg-gray-400',
    iconColor: 'text-white',
    category: 'Profile'
  },
  {
    id: 6,
    type: 'completed',
    title: 'Completed',
    description: 'Security Documentation Review',
    date: 'Dec 5',
    datetime: '2024-12-05T10:30:00',
    icon: Check,
    iconBg: 'bg-green-500',
    iconColor: 'text-white',
    category: 'Task'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Training': return 'bg-blue-100 text-blue-800';
    case 'Policy': return 'bg-purple-100 text-purple-800';
    case 'Incident': return 'bg-red-100 text-red-800';
    case 'Task': return 'bg-green-100 text-green-800';
    case 'Profile': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getRelativeTime = (datetime: string) => {
  const date = new Date(datetime);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
};

export default function RecentActivity() {
  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Recent Activity
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your recent compliance-related activities
              </p>
            </div>
            <Button variant="link" className="text-blue-600 hover:text-blue-700">
              View All Activity
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Desktop Timeline View */}
          <div className="hidden md:block">
            <div className="flow-root">
              <ul className="-mb-8">
                {activities.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== activities.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center ring-8 ring-white shadow-sm`}
                          >
                            <activity.icon className={`${activity.iconColor} h-4 w-4`} />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                              {activity.title}{' '}
                              <span className="font-medium text-gray-900">
                                {activity.description}
                              </span>
                            </p>
                            {activity.category && (
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${getCategoryColor(activity.category)}`}
                              >
                                {activity.category}
                              </Badge>
                            )}
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={activity.datetime}>
                              {activity.date}
                            </time>
                            <div className="text-xs text-gray-400 mt-1">
                              {getRelativeTime(activity.datetime)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0`}
                >
                  <activity.icon className={`${activity.iconColor} h-4 w-4`} />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="text-gray-500">{activity.title}</span>{' '}
                    <span className="font-medium text-gray-900">
                      {activity.description}
                    </span>
                  </p>
                  <div className="flex items-center justify-between">
                    {activity.category && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getCategoryColor(activity.category)}`}
                      >
                        {activity.category}
                      </Badge>
                    )}
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {getRelativeTime(activity.datetime)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button for Mobile */}
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <Button variant="outline" className="w-full">
              View All Activity
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}