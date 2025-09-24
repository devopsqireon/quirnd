// src/components/improvement-readiness/tabs/ManagementReviewsTab.tsx
import React, { useState } from 'react';
import { Search, Filter, Calendar, Users, Plus, List, Grid3X3, Eye, MoreHorizontal, Clock, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { useModals } from '@/components/improvement-readiness/modals/useModals';

interface ManagementReview {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  participants: Array<{
    name: string;
    avatar: string;
  }>;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  outcomes?: number;
  hasReport?: boolean;
}

interface ManagementReviewsTabProps {
  data: ManagementReview[];
}

export function ManagementReviewsTab({ data }: ManagementReviewsTabProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal } = useModals();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Scheduled': { variant: 'default' as const, icon: Clock, className: 'bg-blue-100 text-blue-800' },
      'Completed': { variant: 'secondary' as const, icon: CheckCircle, className: 'bg-green-100 text-green-800' },
      'Cancelled': { variant: 'destructive' as const, icon: Clock, className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="tab-content">
      {/* Action Bar */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search reviews..."
              className="pl-10 w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Status
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Participants
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-md p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
          <Button onClick={() => openModal('schedule-review')}>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Review
          </Button>
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Checkbox />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                Review Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participants
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Outcomes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((review) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Checkbox />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{review.title}</div>
                  <div className="text-sm text-gray-500">{review.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{review.date}</div>
                  <div className="text-sm text-gray-500">{review.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex -space-x-2 overflow-hidden">
                    {review.participants.slice(0, 3).map((participant, index) => (
                      <Avatar key={index} className="inline-block h-8 w-8 ring-2 ring-white">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="text-xs">{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    ))}
                    {review.participants.length > 3 && (
                      <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-500 text-xs font-medium text-white">
                        +{review.participants.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(review.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {review.outcomes ? (
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">{review.outcomes} Actions</span>
                      {review.hasReport && <FileText className="w-4 h-4 text-red-600" />}
                    </div>
                  ) : (
                    <span className="text-gray-500">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-700">
          <span>Showing 1 to 10 of 4 results</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}