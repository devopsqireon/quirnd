// src/components/incident-management/activity-feed.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  User, 
  CheckCircle, 
  Clock, 
  Upload 
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'incident_created' | 'incident_assigned' | 'incident_resolved' | 'status_updated' | 'bulk_import';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

const activityItems: ActivityItem[] = [
  {
    id: '1',
    type: 'incident_created',
    title: 'New critical incident reported',
    description: 'New critical incident INC-2024-001 reported by SIEM Integration',
    timestamp: '2m ago',
    icon: <AlertTriangle className="text-white h-4 w-4" />,
    iconBgColor: 'bg-red-500'
  },
  {
    id: '2',
    type: 'incident_assigned',
    title: 'Incident assigned',
    description: 'John Doe assigned to incident INC-2024-001',
    timestamp: '15m ago',
    icon: <User className="text-white h-4 w-4" />,
    iconBgColor: 'bg-blue-500'
  },
  {
    id: '3',
    type: 'incident_resolved',
    title: 'Incident resolved',
    description: 'Incident INC-2024-003 marked as Resolved by Mike Johnson',
    timestamp: '1h ago',
    icon: <CheckCircle className="text-white h-4 w-4" />,
    iconBgColor: 'bg-green-500'
  },
  {
    id: '4',
    type: 'status_updated',
    title: 'Status update',
    description: 'Status update for INC-2024-002 changed to Investigating',
    timestamp: '2h ago',
    icon: <Clock className="text-white h-4 w-4" />,
    iconBgColor: 'bg-yellow-500'
  },
  {
    id: '5',
    type: 'bulk_import',
    title: 'Bulk import completed',
    description: 'Bulk import completed: 5 incidents imported from Excel by Jane Smith',
    timestamp: '3h ago',
    icon: <Upload className="text-white h-4 w-4" />,
    iconBgColor: 'bg-purple-500'
  }
];

export function ActivityFeed() {
  return (
    <section className="px-8 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Recent Activity</h2>
        <p className="text-gray-600">Latest updates and actions across all incident management workflows.</p>
      </div>
      
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle>Activity Timeline</CardTitle>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {activityItems.map((item, index) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {index !== activityItems.length - 1 && (
                      <span 
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" 
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full ${item.iconBgColor} flex items-center justify-center ring-8 ring-white`}>
                          {item.icon}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {item.description.split(' ').map((word, wordIndex) => {
                              // Highlight incident IDs and user names
                              if (word.startsWith('INC-') || ['John', 'Jane', 'Mike'].some(name => word.includes(name))) {
                                return (
                                  <span key={wordIndex} className="font-medium text-gray-900">
                                    {word}{' '}
                                  </span>
                                );
                              }
                              return word + ' ';
                            })}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{item.timestamp}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}