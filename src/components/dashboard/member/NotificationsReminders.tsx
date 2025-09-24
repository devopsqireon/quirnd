// src/components/dashboard/member/NotificationsReminders.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, AlertCircle, Clock, Info, CheckCircle, X } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'error',
    title: 'Security Training Overdue',
    message: 'Your Security Awareness Training 2024 is past due. Complete it immediately to maintain compliance.',
    action: 'Start Training →',
    bgColor: 'bg-red-50 border-l-red-400',
    iconColor: 'text-red-400',
    icon: AlertCircle,
    textColor: 'text-red-800',
    messageColor: 'text-red-700',
    actionColor: 'text-red-800 hover:text-red-900'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Policy Review Due Soon',
    message: 'Data Privacy Policy v2.1 requires your acknowledgment by December 15, 2024.',
    action: 'Review Policy →',
    bgColor: 'bg-yellow-50 border-l-yellow-400',
    iconColor: 'text-yellow-400',
    icon: Clock,
    textColor: 'text-yellow-800',
    messageColor: 'text-yellow-700',
    actionColor: 'text-yellow-800 hover:text-yellow-900'
  },
  {
    id: 3,
    type: 'info',
    title: 'New Training Available',
    message: 'Secure Coding Practices training is now available. Due by January 15, 2025.',
    action: 'View Training →',
    bgColor: 'bg-blue-50 border-l-blue-400',
    iconColor: 'text-blue-400',
    icon: Info,
    textColor: 'text-blue-800',
    messageColor: 'text-blue-700',
    actionColor: 'text-blue-800 hover:text-blue-900'
  },
  {
    id: 4,
    type: 'success',
    title: 'Task Completed',
    message: 'Great job! You\'ve completed the Phishing Awareness training with a score of 95%.',
    action: 'View Certificate →',
    bgColor: 'bg-green-50 border-l-green-400',
    iconColor: 'text-green-400',
    icon: CheckCircle,
    textColor: 'text-green-800',
    messageColor: 'text-green-700',
    actionColor: 'text-green-800 hover:text-green-900'
  }
];

export default function NotificationsReminders() {
  const [dismissedNotifications, setDismissedNotifications] = useState<number[]>([]);

  const dismissReminder = (id: number) => {
    setDismissedNotifications(prev => [...prev, id]);
  };

  const visibleNotifications = notifications.filter(n => !dismissedNotifications.includes(n.id));

  return (
    <section id="notifications-section" className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">Notifications & Reminders</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Important deadlines and compliance reminders</p>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
              <Settings className="mr-1 h-4 w-4" />
              Settings
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {visibleNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`${notification.bgColor} border-l-4 p-4 rounded-r-lg`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <notification.icon className={`${notification.iconColor} h-5 w-5`} />
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${notification.textColor}`}>
                        {notification.title}
                      </h3>
                      <p className={`text-sm ${notification.messageColor} mt-1`}>
                        {notification.message}
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="link"
                          className={`text-sm font-medium ${notification.actionColor} p-0 h-auto`}
                        >
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${notification.iconColor} hover:bg-transparent p-1`}
                    onClick={() => dismissReminder(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}