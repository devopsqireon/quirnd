// File: src/components/feedback/CommunityFeedback.tsx
"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, ThumbsUp, MessageCircle } from 'lucide-react';

interface CommunityFeedbackItem {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  comments: number;
  submittedDate: string;
  author: {
    name: string;
    company: string;
    tier: string;
    avatar: string;
  };
}

const communityFeedbackData: CommunityFeedbackItem[] = [
  {
    id: '1',
    title: 'Advanced Workflow Automation',
    description: 'We need more sophisticated workflow automation capabilities with conditional logic and custom triggers for complex business processes.',
    category: 'Feature Request',
    votes: 89,
    comments: 24,
    submittedDate: 'Oct 18, 2024',
    author: {
      name: 'TechCorp Solutions',
      company: 'TechCorp Solutions',
      tier: 'Enterprise Customer',
      avatar: '/avatars/avatar-2.jpg'
    }
  },
  {
    id: '2',
    title: 'Real-time Collaboration Features',
    description: 'Add real-time collaboration tools like live cursors, commenting, and simultaneous editing for team workflows.',
    category: 'Enhancement',
    votes: 56,
    comments: 18,
    submittedDate: 'Oct 16, 2024',
    author: {
      name: 'StartupHub Inc',
      company: 'StartupHub Inc',
      tier: 'Pro Customer',
      avatar: '/avatars/avatar-6.jpg'
    }
  },
  {
    id: '3',
    title: 'Advanced Reporting & Analytics',
    description: 'Need more comprehensive reporting tools with custom dashboards, scheduled reports, and advanced data visualization options.',
    category: 'Analytics',
    votes: 43,
    comments: 31,
    submittedDate: 'Oct 14, 2024',
    author: {
      name: 'Global Enterprises',
      company: 'Global Enterprises',
      tier: 'Enterprise Customer',
      avatar: '/avatars/avatar-8.jpg'
    }
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Feature Request': return 'bg-blue-100 text-blue-700';
    case 'Enhancement': return 'bg-purple-100 text-purple-700';
    case 'Analytics': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function CommunityFeedback() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('most-voted');

  const filteredFeedback = communityFeedbackData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="mt-12">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Community Feedback</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search community feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most-voted">Most Voted</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="most-commented">Most Commented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeedback.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md cursor-pointer transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.author.avatar} alt={item.author.name} />
                    <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{item.author.company}</div>
                    <div className="text-xs text-gray-500">{item.author.tier}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.votes}</span>
                </Button>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <Badge className={`${getCategoryColor(item.category)}`}>
                    {item.category}
                  </Badge>
                  <span>{item.submittedDate}</span>
                </div>
                <span className="flex items-center">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  {item.comments}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline">View All Community Feedback</Button>
        </div>
      </CardContent>
    </Card>
  );
}