// File: src/components/feedback/MyFeedback.tsx
"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, ThumbsUp, MessageCircle, MoreVertical } from 'lucide-react';

interface FeedbackItem {
  id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  votes: number;
  comments: number;
  submittedDate: string;
}

const feedbackData: FeedbackItem[] = [
  {
    id: '1',
    title: 'Enhanced Dashboard Analytics',
    category: 'Feature Request',
    priority: 'High',
    status: 'In Progress',
    description: 'Need more detailed analytics with custom date ranges and advanced filtering options for better insights.',
    votes: 12,
    comments: 5,
    submittedDate: 'Oct 15, 2024'
  },
  {
    id: '2',
    title: 'Mobile App Dark Mode',
    category: 'Improvement',
    priority: 'Medium',
    status: 'Planned',
    description: 'Implement dark mode for the mobile application to reduce eye strain during nighttime usage.',
    votes: 28,
    comments: 8,
    submittedDate: 'Oct 12, 2024'
  },
  {
    id: '3',
    title: 'API Rate Limiting Issue',
    category: 'Bug Report',
    priority: 'Critical',
    status: 'Completed',
    description: 'Experiencing unexpected rate limiting on API endpoints during peak hours, affecting data synchronization.',
    votes: 6,
    comments: 12,
    submittedDate: 'Oct 10, 2024'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Progress': return 'bg-green-100 text-green-700';
    case 'Planned': return 'bg-blue-100 text-blue-700';
    case 'Completed': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'bg-red-100 text-red-700';
    case 'High': return 'bg-orange-100 text-orange-700';
    case 'Medium': return 'bg-yellow-100 text-yellow-700';
    case 'Low': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Feature Request': return 'bg-blue-100 text-blue-700';
    case 'Bug Report': return 'bg-red-100 text-red-700';
    case 'Improvement': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function MyFeedback() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredFeedback = feedbackData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">My Organization's Feedback</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredFeedback.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                      {item.category}
                    </Badge>
                    <Badge className={`${getPriorityColor(item.priority)} text-xs`}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Submitted: {item.submittedDate}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {item.votes} votes
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {item.comments} comments
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge className={`${getStatusColor(item.status)} text-sm font-medium`}>
                    {item.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline">Load More Feedback</Button>
        </div>
      </CardContent>
    </Card>
  );
}