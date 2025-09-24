// src/app/tasks-controls/components/CreateTaskModal.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, User, Flag, FileText, Shield, GraduationCap, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { Task, LinkedItem, CreateTaskModalProps } from '../types';
import { mockLinkedItems } from '../mock-data';
import { MOCK_OWNERS, TASK_PRIORITY, LINKED_ITEM_TYPE, PRIORITY_COLORS } from '../constants';

export default function CreateTaskModal({ open, onOpenChange, onTaskCreated }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    linkedItemId: '',
    owner: '',
    dueDate: null as Date | null,
    priority: 'Medium' as Task['priority'],
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.title || !formData.linkedItemId || !formData.owner || !formData.dueDate) {
        throw new Error('Please fill in all required fields');
      }

      const linkedItem = mockLinkedItems.find(item => item.id === formData.linkedItemId);
      if (!linkedItem) {
        throw new Error('Selected linked item not found');
      }

      // Generate task ID
      const taskId = `TSK-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];

      const newTask: Task = {
        id: taskId,
        title: formData.title,
        linkedItem,
        owner: formData.owner,
        dueDate: format(formData.dueDate, 'yyyy-MM-dd'),
        status: 'Open',
        priority: formData.priority,
        description: formData.description,
        createdDate: today,
        updatedDate: today
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      onTaskCreated(newTask);
      
      // Reset form
      setFormData({
        title: '',
        linkedItemId: '',
        owner: '',
        dueDate: null,
        priority: 'Medium',
        description: ''
      });
      
      onOpenChange(false);
      
      toast.success('Task created successfully', {
        description: `Task ${taskId} has been created and assigned to ${formData.owner}.`
      });
    } catch (error) {
      toast.error('Error creating task', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const getPriorityColor = (priority: string) => {
    return PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] || 'text-gray-600';
  };

  const groupedLinkedItems = mockLinkedItems.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, LinkedItem[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Task Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Task Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Linked Item */}
            <div className="space-y-2">
              <Label htmlFor="linkedItem" className="text-sm font-medium">
                Linked Item *
              </Label>
              <Select
                value={formData.linkedItemId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, linkedItemId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a linked item" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(groupedLinkedItems).map(([type, items]) => (
                    <div key={type}>
                      <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground bg-muted/50">
                        {type}s
                      </div>
                      {items.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="flex items-center">
                            {getLinkedItemIcon(item.type)}
                            <span className="ml-2">{item.title}</span>
                            <span className="ml-2 text-xs text-muted-foreground">({item.id})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Owner and Due Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Owner */}
              <div className="space-y-2">
                <Label htmlFor="owner" className="text-sm font-medium">
                  Task Owner *
                </Label>
                <Select
                  value={formData.owner}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, owner: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_OWNERS.map((owner) => (
                      <SelectItem key={owner} value={owner}>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {owner}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Due Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dueDate ? format(formData.dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.dueDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, dueDate: date }))}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as Task['priority'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TASK_PRIORITY).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      <div className="flex items-center">
                        <Flag className={`h-4 w-4 mr-2 ${getPriorityColor(priority)}`} />
                        <span className={getPriorityColor(priority)}>{priority}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter task description and any relevant details..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}