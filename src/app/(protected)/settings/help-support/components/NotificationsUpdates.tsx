// src/app/(protected)/settings/help-support/components/NotificationsUpdates.tsx
import React from 'react';
import { CheckCircle, MessageCircle, Star, Calendar, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function NotificationsUpdates() {
  const notifications = [
    {
      id: 1,
      type: 'resolved',
      title: 'Ticket #12345 has been resolved',
      message: 'Your dashboard login issue has been fixed. Please try logging in again.',
      time: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-white',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-500',
      iconBg: 'bg-blue-500',
      actions: ['View ticket', 'Rate support'],
    },
    {
      id: 2,
      type: 'message',
      title: 'New message on ticket #12344',
      message: 'Agent Sarah has replied to your billing inquiry with additional information.',
      time: '4 hours ago',
      icon: MessageCircle,
      iconColor: 'text-white',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-l-yellow-500',
      iconBg: 'bg-yellow-500',
      actions: ['Read message', 'Reply'],
    },
    {
      id: 3,
      type: 'article',
      title: 'New knowledge base article available',
      message: '"Advanced Security Settings" - Learn how to enhance your account security.',
      time: '1 day ago',
      icon: Star,
      iconColor: 'text-white',
      bgColor: 'bg-green-50',
      borderColor: 'border-l-green-500',
      iconBg: 'bg-green-500',
      actions: ['Read article'],
    },
    {
      id: 4,
      type: 'maintenance',
      title: 'Scheduled maintenance reminder',
      message: 'System maintenance is scheduled for tomorrow from 2:00 AM to 4:00 AM EST.',
      time: '2 days ago',
      icon: Calendar,
      iconColor: 'text-white',
      bgColor: 'bg-purple-50',
      borderColor: 'border-l-purple-500',
      iconBg: 'bg-purple-500',
      actions: ['View details'],
    },
  ];

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read');
  };

  const handleNotificationAction = (action: string) => {
    toast.info(`Action: ${action}`);
  };

  const handleDismiss = (id: number, title: string) => {
    toast.success(`Dismissed: ${title}`);
  };

  return (
    <Card className="mt-12">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Notifications & Updates</CardTitle>
          <Button variant="link" onClick={handleMarkAllRead}>
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-4 ${notification.bgColor} border-l-4 ${notification.borderColor} rounded-r-lg`}
              >
                <div className="flex-shrink-0">
                  <div className={`h-8 w-8 ${notification.iconBg} rounded-full flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${notification.iconColor}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-500">{notification.time}</span>
                    {notification.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        variant="link"
                        size="sm"
                        className="ml-4 text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"
                        onClick={() => handleNotificationAction(action)}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 p-1"
                  onClick={() => handleDismiss(notification.id, notification.title)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="link" className="text-sm text-gray-600 hover:text-gray-700">
            Load more notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}