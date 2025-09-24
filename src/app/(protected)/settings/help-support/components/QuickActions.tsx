// src/app/(protected)/settings/help-support/components/QuickActions.tsx
import React from 'react';
import { Plus, MessageCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export function QuickActions() {
  const handleNewTicket = () => {
    toast.success('Redirecting to ticket submission form');
  };

  const handleStartChat = () => {
    toast.info('Starting live chat session...');
  };

  const handleSearchKB = () => {
    toast.info('Opening knowledge base search');
  };

  const actions = [
    {
      title: 'New Ticket',
      description: 'Submit a new support request',
      icon: Plus,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      onClick: handleNewTicket,
    },
    {
      title: 'Start Chat',
      description: 'Chat with support agents',
      icon: MessageCircle,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      onClick: handleStartChat,
    },
    {
      title: 'Search KB',
      description: 'Find answers instantly',
      icon: Search,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      onClick: handleSearchKB,
    },
  ];

  return (
    <section className="mb-8">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="flex items-center p-4 h-auto bg-white hover:shadow-md transition-shadow duration-200"
                  onClick={action.onClick}
                >
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 ${action.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                  </div>
                  <div className="ml-4 text-left">
                    <p className="text-sm font-medium text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}