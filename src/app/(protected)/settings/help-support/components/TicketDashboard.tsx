// src/app/(protected)/settings/help-support/components/TicketDashboard.tsx
'use client';
import React, { useState } from 'react';
import { Filter, Download, Eye, Reply } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function TicketDashboard() {
  const [activeFilter, setActiveFilter] = useState('all');

  const tickets = [
    {
      id: '#12345',
      subject: 'Dashboard login issues',
      description: 'Cannot access main dashboard after password reset',
      category: 'Technical',
      priority: 'High',
      status: 'Resolved',
      agent: { name: 'Mike Johnson', avatar: '/avatar-2.jpg' },
      lastUpdated: '2 hours ago',
      priorityColor: 'bg-red-100 text-red-800',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: '#12344',
      subject: 'Billing inquiry',
      description: 'Question about monthly subscription charges',
      category: 'Billing',
      priority: 'Medium',
      status: 'In Progress',
      agent: { name: 'Sarah Davis', avatar: '/avatar-5.jpg' },
      lastUpdated: '4 hours ago',
      priorityColor: 'bg-yellow-100 text-yellow-800',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: '#12343',
      subject: 'Feature request: Export functionality',
      description: 'Need ability to export data in CSV format',
      category: 'Feature',
      priority: 'Low',
      status: 'Open',
      agent: { name: 'Alex Chen', avatar: '/avatar-3.jpg' },
      lastUpdated: '1 day ago',
      priorityColor: 'bg-green-100 text-green-800',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
  ];

  const stats = [
    { label: 'Open Tickets', value: 3, color: 'text-blue-600' },
    { label: 'In Progress', value: 2, color: 'text-yellow-600' },
    { label: 'Resolved', value: 15, color: 'text-green-600' },
    { label: 'Total Tickets', value: 20, color: 'text-gray-600' },
  ];

  const filters = [
    { id: 'all', label: 'All (20)', count: 20 },
    { id: 'open', label: 'Open (3)', count: 3 },
    { id: 'progress', label: 'In Progress (2)', count: 2 },
    { id: 'resolved', label: 'Resolved (15)', count: 15 },
    { id: 'closed', label: 'Closed (0)', count: 0 },
  ];

  const handleViewTicket = (ticketId: string) => {
    toast.info(`Opening ticket ${ticketId}`);
  };

  const handleReplyTicket = (ticketId: string) => {
    toast.info(`Opening reply for ticket ${ticketId}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>My Support Tickets</CardTitle>
            <p className="text-sm text-gray-500">Track and manage your support requests</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className={`rounded-full ${
                activeFilter === filter.id 
                  ? 'bg-blue-100 text-blue-700 border-blue-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
          <div className="ml-auto">
            <Select defaultValue="date">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="priority">Sort by Priority</SelectItem>
                <SelectItem value="status">Sort by Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-1">
                  <span className="text-sm font-medium text-blue-600">{ticket.id}</span>
                </div>
                <div className="md:col-span-4">
                  <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                  <div className="text-sm text-gray-500">{ticket.description}</div>
                </div>
                <div className="md:col-span-1">
                  <span className="text-sm text-gray-900">{ticket.category}</span>
                </div>
                <div className="md:col-span-1">
                  <Badge className={ticket.priorityColor}>{ticket.priority}</Badge>
                </div>
                <div className="md:col-span-1">
                  <Badge className={ticket.statusColor}>{ticket.status}</Badge>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={ticket.agent.avatar} alt={ticket.agent.name} />
                      <AvatarFallback>{ticket.agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-900">{ticket.agent.name}</span>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <span className="text-sm text-gray-500">{ticket.lastUpdated}</span>
                </div>
                <div className="md:col-span-1">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewTicket(ticket.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReplyTicket(ticket.id)}
                    >
                      <Reply className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
            <span className="font-medium">20</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">4</Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}