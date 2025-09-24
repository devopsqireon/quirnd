// File: src/components/feedback/ProductRoadmap.tsx
"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, Calendar, Clock, CheckCircle } from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  category: string;
  description: string;
  votes: number;
  targetDate: string;
  progress?: number;
  status: 'upcoming' | 'in-progress' | 'planning' | 'completed';
}

const roadmapData: Record<string, RoadmapItem[]> = {
  upcoming: [
    {
      id: '1',
      title: 'Advanced Analytics Dashboard',
      category: 'Feature',
      description: 'Comprehensive analytics with custom metrics and real-time data visualization.',
      votes: 23,
      targetDate: 'Dec 2024',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Slack Integration',
      category: 'Integration',
      description: 'Native Slack integration for notifications and quick actions.',
      votes: 18,
      targetDate: 'Nov 2024',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Mobile App Performance',
      category: 'Enhancement',
      description: 'Significant performance improvements for mobile applications.',
      votes: 31,
      targetDate: 'Dec 2024',
      status: 'upcoming'
    }
  ],
  'in-progress': [
    {
      id: '4',
      title: 'Dark Mode Interface',
      category: 'Feature',
      description: 'System-wide dark mode with automatic switching based on preferences.',
      votes: 42,
      targetDate: 'Nov 2024',
      progress: 75,
      status: 'in-progress'
    },
    {
      id: '5',
      title: 'REST API v2.0',
      category: 'API',
      description: 'Enhanced API with better performance and new endpoints.',
      votes: 15,
      targetDate: 'Dec 2024',
      progress: 60,
      status: 'in-progress'
    }
  ],
  planning: [
    {
      id: '6',
      title: 'AI-Powered Insights',
      category: 'Feature',
      description: 'Machine learning algorithms to provide predictive analytics and recommendations.',
      votes: 67,
      targetDate: 'Q1 2025',
      status: 'planning'
    },
    {
      id: '7',
      title: 'Multi-tenant Architecture',
      category: 'Platform',
      description: 'Enhanced multi-tenancy with improved isolation and customization.',
      votes: 29,
      targetDate: 'Q1 2025',
      status: 'planning'
    }
  ],
  completed: [
    {
      id: '8',
      title: 'Enhanced Security',
      category: 'Completed',
      description: 'Two-factor authentication and advanced security protocols implemented.',
      votes: 0,
      targetDate: 'Oct 2024',
      status: 'completed'
    },
    {
      id: '9',
      title: 'Bulk Operations',
      category: 'Completed',
      description: 'Support for bulk data operations and batch processing.',
      votes: 0,
      targetDate: 'Oct 2024',
      status: 'completed'
    }
  ]
};

const getColumnConfig = (column: string) => {
  switch (column) {
    case 'upcoming':
      return { title: 'Upcoming (Q4 2024)', bgColor: 'bg-gray-50', dotColor: 'bg-gray-400', count: roadmapData.upcoming.length };
    case 'in-progress':
      return { title: 'In Progress', bgColor: 'bg-blue-50', dotColor: 'bg-blue-500', count: roadmapData['in-progress'].length };
    case 'planning':
      return { title: 'Planning (Q1 2025)', bgColor: 'bg-yellow-50', dotColor: 'bg-yellow-500', count: roadmapData.planning.length };
    case 'completed':
      return { title: 'Recently Completed', bgColor: 'bg-green-50', dotColor: 'bg-green-500', count: roadmapData.completed.length };
    default:
      return { title: '', bgColor: '', dotColor: '', count: 0 };
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Feature': return 'bg-blue-100 text-blue-700';
    case 'Integration': return 'bg-purple-100 text-purple-700';
    case 'Enhancement': return 'bg-green-100 text-green-700';
    case 'API': return 'bg-orange-100 text-orange-700';
    case 'Platform': return 'bg-green-100 text-green-700';
    case 'Completed': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function ProductRoadmap() {
  const [viewMode, setViewMode] = useState('kanban');
  const [quarterFilter, setQuarterFilter] = useState('all');

  return (
    <Card className="mt-12">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">Product Roadmap</CardTitle>
            <p className="text-gray-600 mt-2">See what we're working on and what's coming next</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'kanban' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                Kanban View
              </Button>
              <Button 
                variant={viewMode === 'timeline' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('timeline')}
              >
                Timeline View
              </Button>
            </div>
            <Select value={quarterFilter} onValueChange={setQuarterFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Quarters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quarters</SelectItem>
                <SelectItem value="q4-2024">Q4 2024</SelectItem>
                <SelectItem value="q1-2025">Q1 2025</SelectItem>
                <SelectItem value="q2-2025">Q2 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(roadmapData).map(([column, items]) => {
            const config = getColumnConfig(column);
            return (
              <div key={column} className="kanban-column">
                <div className={`${config.bgColor} rounded-lg p-4 mb-4`}>
                  <h3 className="font-semibold text-gray-900 mb-2">{config.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">{config.count} features</span>
                    <div className={`w-2 h-2 ${config.dotColor} rounded-full`} />
                  </div>
                </div>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`bg-white border ${column === 'in-progress' ? 'border-blue-200' : column === 'completed' ? 'border-green-200' : 'border-gray-200'} rounded-lg p-4 hover:shadow-md cursor-pointer`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${getCategoryColor(item.category)} text-xs`}>
                          {item.status === 'completed' ? '✓ Completed' : item.category}
                        </Badge>
                        {item.status !== 'completed' && (
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                            <ThumbsUp className="w-3 h-3" />
                            <span className="text-xs font-medium">{item.votes}</span>
                          </button>
                        )}
                        {item.status === 'completed' && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            <span className="text-xs">{item.targetDate}</span>
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      
                      {item.progress !== undefined ? (
                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{item.progress}% Complete</span>
                          </div>
                          <Progress value={item.progress} className="w-16 h-1.5" />
                        </div>
                      ) : (
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>Target: {item.targetDate}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}