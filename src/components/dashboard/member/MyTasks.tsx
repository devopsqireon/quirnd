// src/components/dashboard/member/MyTasks.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Eye, 
  Check, 
  Play, 
  Calendar,
  Filter,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Not Started' | 'Review' | 'Completed' | 'Overdue';
  assignedBy: string;
  category: string;
  progress?: number;
  isOverdue?: boolean;
}

const mockTasks: Task[] = [
  {
    id: 1,
    name: 'Update Security Documentation',
    description: 'Review and update network security procedures for Q4 compliance',
    dueDate: '2024-12-15',
    priority: 'High',
    status: 'In Progress',
    assignedBy: 'Mike Chen',
    category: 'Documentation',
    progress: 65,
    isOverdue: true
  },
  {
    id: 2,
    name: 'Complete Risk Assessment',
    description: 'Annual comprehensive risk assessment for Q4 2024',
    dueDate: '2024-12-20',
    priority: 'Medium',
    status: 'Not Started',
    assignedBy: 'Lisa Rodriguez',
    category: 'Assessment',
    progress: 0
  },
  {
    id: 3,
    name: 'Vendor Security Review',
    description: 'Review security questionnaire for CloudTech Inc. partnership',
    dueDate: '2024-12-18',
    priority: 'Low',
    status: 'Review',
    assignedBy: 'David Park',
    category: 'Review',
    progress: 85
  },
  {
    id: 4,
    name: 'Employee Training Compliance',
    description: 'Ensure all team members complete mandatory security training',
    dueDate: '2024-12-22',
    priority: 'High',
    status: 'In Progress',
    assignedBy: 'Sarah Wilson',
    category: 'Training',
    progress: 40
  },
  {
    id: 5,
    name: 'Policy Acknowledgment Review',
    description: 'Review and acknowledge updated data privacy policies',
    dueDate: '2024-12-14',
    priority: 'Medium',
    status: 'Completed',
    assignedBy: 'Mike Chen',
    category: 'Policy',
    progress: 100
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
    case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Review': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Not Started': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'Overdue': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const isOverdue = date < now;
  
  return {
    formatted: date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    isOverdue
  };
};

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<string>('all');

  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const totalTasks = tasks.length;
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status.toLowerCase().replace(' ', '-') === filter);

  const handleTaskAction = (taskId: number, action: 'start' | 'complete' | 'view') => {
    if (action === 'complete') {
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'Completed' as const, progress: 100 }
          : task
      ));
    }
    // Handle other actions as needed
    console.log(`Action ${action} on task ${taskId}`);
  };

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                My Tasks
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Assigned compliance tasks and corrective actions
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-green-600">
                  {completedTasks} of {totalTasks} tasks completed
                </span>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter('all')}>
                    All Tasks
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('in-progress')}>
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('not-started')}>
                    Not Started
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('completed')}>
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-600">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Task Details
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Due Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Priority
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Progress
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                      Assigned By
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTasks.map((task) => {
                    const { formatted: formattedDate, isOverdue } = formatDate(task.dueDate);
                    
                    return (
                      <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-gray-900">{task.name}</h4>
                              {isOverdue && task.status !== 'Completed' && (
                                <AlertCircle className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 max-w-md">
                              {task.description}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {task.category}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className={`text-sm ${
                              isOverdue && task.status !== 'Completed' 
                                ? 'text-red-600 font-medium' 
                                : 'text-gray-900'
                            }`}>
                              {formattedDate}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className={getStatusColor(
                            isOverdue && task.status !== 'Completed' ? 'Overdue' : task.status
                          )}>
                            {isOverdue && task.status !== 'Completed' ? 'Overdue' : task.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1.5 w-20" />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {task.assignedBy}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTaskAction(task.id, 'view')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            {task.status !== 'Completed' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleTaskAction(
                                  task.id, 
                                  task.status === 'Not Started' ? 'start' : 'complete'
                                )}
                              >
                                {task.status === 'Not Started' ? (
                                  <Play className="h-4 w-4" />
                                ) : (
                                  <Check className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                <DropdownMenuItem>Add Comment</DropdownMenuItem>
                                <DropdownMenuItem>View History</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredTasks.map((task) => {
              const { formatted: formattedDate, isOverdue } = formatDate(task.dueDate);
              
              return (
                <Card key={task.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">{task.name}</h4>
                            {isOverdue && task.status !== 'Completed' && (
                              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Add Comment</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className={
                          isOverdue && task.status !== 'Completed' 
                            ? 'text-red-600 font-medium' 
                            : 'text-gray-600'
                        }>
                          Due {formattedDate}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(
                          isOverdue && task.status !== 'Completed' ? 'Overdue' : task.status
                        )}>
                          {isOverdue && task.status !== 'Completed' ? 'Overdue' : task.status}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-gray-600">
                          Assigned by {task.assignedBy}
                        </span>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTaskAction(task.id, 'view')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          
                          {task.status !== 'Completed' && (
                            <Button
                              size="sm"
                              onClick={() => handleTaskAction(
                                task.id, 
                                task.status === 'Not Started' ? 'start' : 'complete'
                              )}
                            >
                              {task.status === 'Not Started' ? (
                                <>
                                  <Play className="h-4 w-4 mr-1" />
                                  Start
                                </>
                              ) : (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Complete
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks found for the selected filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}