// src/components/improvement-readiness/tabs/ImprovementLogTab.tsx
import React, { useState } from 'react';
import { Search, Filter, User, Tags, Plus, List, Grid3X3, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { useModals } from '@/components/improvement-readiness/modals/useModals';

interface ImprovementOpportunity {
  id: string;
  title: string;
  description: string;
  category: 'Security' | 'Operations' | 'Process' | 'Technology';
  owner: {
    name: string;
    department: string;
    avatar: string;
  };
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
}

interface ImprovementLogTabProps {
  data: ImprovementOpportunity[];
}

export function ImprovementLogTab({ data }: ImprovementLogTabProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const { openModal } = useModals();

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      'Security': { variant: 'secondary' as const, className: 'bg-purple-100 text-purple-800' },
      'Operations': { variant: 'default' as const, className: 'bg-blue-100 text-blue-800' },
      'Process': { variant: 'secondary' as const, className: 'bg-green-100 text-green-800' },
      'Technology': { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = categoryConfig[category as keyof typeof categoryConfig];
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {category}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'High': { className: 'bg-orange-100 text-orange-800' },
      'Medium': { className: 'bg-yellow-100 text-yellow-800' },
      'Low': { className: 'bg-green-100 text-green-800' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    
    return (
      <Badge className={config.className}>
        {priority}
      </Badge>
    );
  };

  const getStatusSelect = (currentStatus: string) => (
    <Select defaultValue={currentStatus.toLowerCase().replace(' ', '-')}>
      <SelectTrigger className="w-auto border-none bg-transparent p-0 h-auto text-sm font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="open">Open</SelectItem>
        <SelectItem value="in-progress">In Progress</SelectItem>
        <SelectItem value="closed">Closed</SelectItem>
      </SelectContent>
    </Select>
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
              placeholder="Search improvement opportunities..."
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
              <User className="w-4 h-4 mr-2" />
              Owner
            </Button>
            <Button variant="outline" size="sm">
              <Tags className="w-4 h-4 mr-2" />
              Category
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
          <Button onClick={() => openModal('new-improvement')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Improvement
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((improvement) => (
              <tr key={improvement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Checkbox />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{improvement.title}</div>
                  <div className="text-sm text-gray-500">{improvement.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{improvement.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getCategoryBadge(improvement.category)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={improvement.owner.avatar} />
                      <AvatarFallback>{improvement.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{improvement.owner.name}</div>
                      <div className="text-sm text-gray-500">{improvement.owner.department}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusSelect(improvement.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPriorityBadge(improvement.priority)}
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
          <span>Showing 1 to 10 of 15 results</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}