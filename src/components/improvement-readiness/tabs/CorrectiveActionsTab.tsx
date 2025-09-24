// src/components/improvement-readiness/tabs/CorrectiveActionsTab.tsx
import React, { useState } from 'react';
import { Search, Filter, User, Calendar, Plus, List, Grid3X3, Eye, MoreHorizontal, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { useModals } from '@/components/improvement-readiness/modals/useModals';

interface CorrectiveAction {
  id: string;
  title: string;
  description: string;
  owner: {
    name: string;
    department: string;
    avatar: string;
  };
  status: 'Open' | 'In Progress' | 'Under Review' | 'Closed' | 'Overdue';
  dueDate: string;
  daysOverdue?: number;
  linkedItems: string[];
}

interface CorrectiveActionsTabProps {
  data: CorrectiveAction[];
}

export function CorrectiveActionsTab({ data }: CorrectiveActionsTabProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { openModal } = useModals();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Overdue': { variant: 'destructive' as const, icon: AlertTriangle },
      'In Progress': { variant: 'default' as const, icon: Clock },
      'Under Review': { variant: 'secondary' as const, icon: CheckCircle },
      'Open': { variant: 'outline' as const, icon: Clock },
      'Closed': { variant: 'secondary' as const, icon: CheckCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Checkbox />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Owner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Linked Items
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((action) => (
            <tr key={action.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Checkbox />
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{action.title}</div>
                <div className="text-sm text-gray-500">{action.id}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">{action.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={action.owner.avatar} />
                    <AvatarFallback>{action.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{action.owner.name}</div>
                    <div className="text-sm text-gray-500">{action.owner.department}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(action.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className={action.daysOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}>
                  {action.dueDate}
                </div>
                {action.daysOverdue && (
                  <div className="text-xs text-red-500">{action.daysOverdue} days overdue</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {action.linkedItems.map((item) => (
                    <Badge key={item} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
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
  );

  const CardView = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((action) => (
          <Card key={action.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{action.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{action.id}</span>
                  <span>•</span>
                  <span className={action.daysOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}>
                    {action.daysOverdue ? `${action.daysOverdue} days overdue` : action.dueDate}
                  </span>
                </div>
              </div>
              {getStatusBadge(action.status)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={action.owner.avatar} />
                  <AvatarFallback className="text-xs">{action.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm text-gray-700">{action.owner.name}</span>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="tab-content">
      {/* Action Bar */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search corrective actions..."
              className="pl-10 w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Status
            </Button>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Owner
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Due Date
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
          <Button onClick={() => openModal('new-corrective-action')}>
            <Plus className="w-4 h-4 mr-2" />
            New Corrective Action
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Owners" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="mike">Mike Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date Range</label>
              <Input type="date" />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" onClick={() => setShowFilters(false)}>Clear Filters</Button>
            <Button>Apply Filters</Button>
          </div>
        </div>
      )}

      {/* Content */}
      {viewMode === 'table' ? <TableView /> : <CardView />}

      {/* Pagination */}
      <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-700">
          <span>Showing 1 to 10 of 23 results</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}