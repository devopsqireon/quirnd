// src/app/tasks-controls/components/TaskCenter.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  User, 
  Calendar, 
  MoreHorizontal,
  Shield,
  FileText,
  GraduationCap,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

import CreateTaskModal from './CreateTaskModal';
import TaskDetailsDrawer from './TaskDetailsDrawer';
import FilterPanel from './FilterPanel';
import { Task, TaskFilters, TaskCenterProps } from '../types';
import { mockTasks } from '../mock-data';
import { STATUS_VARIANTS, PRIORITY_COLORS, LINKED_ITEM_TYPE } from '../constants';

export default function TaskCenter({ globalSearch, showFilters }: TaskCenterProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    status: '',
    owner: '',
    priority: '',
    linkedItemType: '',
    dueDateRange: ''
  });

  // Get unique owners for filter dropdown
  const uniqueOwners = useMemo(() => {
    return Array.from(new Set(tasks.map(task => task.owner)));
  }, [tasks]);

  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = globalSearch === '' || 
        task.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.owner.toLowerCase().includes(globalSearch.toLowerCase()) ||
        task.linkedItem.title.toLowerCase().includes(globalSearch.toLowerCase());

      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesOwner = !filters.owner || task.owner === filters.owner;
      const matchesPriority = !filters.priority || task.priority === filters.priority;
      const matchesLinkedType = !filters.linkedItemType || task.linkedItem.type === filters.linkedItemType;

      return matchesSearch && matchesStatus && matchesOwner && matchesPriority && matchesLinkedType;
    });
  }, [tasks, globalSearch, filters]);

  const getStatusBadge = (status: string) => {
    const variant = STATUS_VARIANTS[status as keyof typeof STATUS_VARIANTS] || 'secondary';
    return <Badge variant={variant}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colorClass = PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || 'text-gray-600';
    return (
      <span className={`font-medium ${colorClass}`}>
        {priority}
      </span>
    );
  };

  const getLinkedItemIcon = (type: string) => {
    const icons = {
      [LINKED_ITEM_TYPE.RISK]: Shield,
      [LINKED_ITEM_TYPE.POLICY]: FileText,
      [LINKED_ITEM_TYPE.TRAINING]: GraduationCap,
      [LINKED_ITEM_TYPE.CONTROL]: CheckCircle2
    };
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  const handleBulkAction = (action: string) => {
    if (selectedTasks.length === 0) {
      toast.error('No tasks selected', {
        description: 'Please select at least one task to perform bulk actions.',
      });
      return;
    }

    toast.success('Bulk action completed', {
      description: `${action} applied to ${selectedTasks.length} task(s).`
    });
    setSelectedTasks([]);
  };

  const handleStatusUpdate = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus as Task['status'], updatedDate: new Date().toISOString().split('T')[0] }
        : task
    ));
    toast.success('Task updated', {
      description: 'Task status has been updated successfully.'
    });
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
    toast.success('Task created', {
      description: 'New task has been created successfully.'
    });
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    toast.success('Task updated', {
      description: 'Task has been updated successfully.'
    });
  };

  // Empty state
  if (filteredTasks.length === 0 && tasks.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground mb-6">
          Create your first task to start managing compliance activities.
        </p>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="bg-card rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
            
            {selectedTasks.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {selectedTasks.length} selected
                </span>
                <Select onValueChange={(value) => handleBulkAction(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assign">Assign Owner</SelectItem>
                    <SelectItem value="status">Change Status</SelectItem>
                    <SelectItem value="export">Export Selected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {filteredTasks.length} of {tasks.length} tasks
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          uniqueOwners={uniqueOwners}
          type="task"
        />
      )}

      {/* Tasks Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Checkbox
                    checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTasks(filteredTasks.map(task => task.id));
                      } else {
                        setSelectedTasks([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Task ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Linked Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredTasks.map((task) => (
                <tr 
                  key={task.id} 
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => setShowTaskDetails(task.id)}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedTasks.includes(task.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTasks(prev => [...prev, task.id]);
                        } else {
                          setSelectedTasks(prev => prev.filter(id => id !== task.id));
                        }
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{task.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getLinkedItemIcon(task.linkedItem.type)}
                      <div className="ml-2">
                        <div className="text-sm font-medium text-foreground">{task.linkedItem.title}</div>
                        <div className="text-sm text-muted-foreground">{task.linkedItem.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-foreground">{task.owner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-foreground">{task.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={task.status}
                      onValueChange={(value) => handleStatusUpdate(task.id, value)}
                    >
                      <SelectTrigger className="w-32 h-8">
                        {getStatusBadge(task.status)}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(task.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals and Drawers */}
      <CreateTaskModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onTaskCreated={handleTaskCreated}
      />

      {showTaskDetails && (
        <TaskDetailsDrawer
          taskId={showTaskDetails}
          task={tasks.find(t => t.id === showTaskDetails)!}
          open={!!showTaskDetails}
          onOpenChange={(open) => !open && setShowTaskDetails(null)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
}