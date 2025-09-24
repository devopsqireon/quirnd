// src/app/tasks-controls/components/TaskDetailsDrawer.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  X, 
  Edit3, 
  Save, 
  Upload, 
  Download, 
  Eye, 
  Trash2,
  User, 
  Calendar, 
  Flag, 
  Clock,
  FileText,
  Shield,
  GraduationCap,
  CheckCircle2,
  Activity,
  Paperclip
} from 'lucide-react';
import { toast } from 'sonner';

import { Task, Evidence, ActivityLog, TaskDetailsDrawerProps } from '../types';
import { mockEvidence, mockActivityLog } from '../mock-data';
import { STATUS_VARIANTS, PRIORITY_COLORS, LINKED_ITEM_TYPE } from '../constants';

export default function TaskDetailsDrawer({ taskId, task, open, onOpenChange, onTaskUpdated }: TaskDetailsDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [evidence, setEvidence] = useState<Evidence[]>(mockEvidence);
  const [activityLog] = useState<ActivityLog[]>(mockActivityLog);

  const handleSave = () => {
    onTaskUpdated(editedTask);
    setIsEditing(false);
    toast.success('Task updated successfully');
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

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

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4 text-muted-foreground" />;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newEvidence: Evidence = {
        id: `EVD-${String(evidence.length + 1).padStart(3, '0')}`,
        name: file.name,
        type: file.type.split('/')[1]?.toUpperCase() || 'Unknown',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: 'Current User'
      };
      setEvidence(prev => [...prev, newEvidence]);
      toast.success('Evidence uploaded successfully');
    }
  };

  const handleDeleteEvidence = (evidenceId: string) => {
    setEvidence(prev => prev.filter(e => e.id !== evidenceId));
    toast.success('Evidence deleted successfully');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="space-y-4 pb-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              Task Details
            </SheetTitle>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
          
          {/* Task ID and Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{task.id}</span>
            {getStatusBadge(editedTask.status)}
          </div>
        </SheetHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Task Details Tab */}
          <TabsContent value="details" className="space-y-6 mt-6">
            <div className="space-y-4">
              {/* Task Title */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Title</Label>
                {isEditing ? (
                  <Input
                    value={editedTask.title}
                    onChange={(e) => setEditedTask(prev => ({ ...prev, title: e.target.value }))}
                  />
                ) : (
                  <p className="text-sm text-foreground p-2 bg-muted rounded-md">{task.title}</p>
                )}
              </div>

              {/* Linked Item */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Linked Item</Label>
                <div className="flex items-center p-2 bg-muted rounded-md">
                  {getLinkedItemIcon(task.linkedItem.type)}
                  <div className="ml-2">
                    <span className="text-sm font-medium text-foreground">{task.linkedItem.title}</span>
                    <div className="text-xs text-muted-foreground">{task.linkedItem.type} • {task.linkedItem.id}</div>
                  </div>
                </div>
              </div>

              {/* Owner and Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Owner</Label>
                  {isEditing ? (
                    <Select
                      value={editedTask.owner}
                      onValueChange={(value) => setEditedTask(prev => ({ ...prev, owner: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Smith">John Smith</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Mike Davis">Mike Davis</SelectItem>
                        <SelectItem value="Emily Chen">Emily Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center p-2 bg-muted rounded-md">
                      <User className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-foreground">{task.owner}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Due Date</Label>
                  <div className="flex items-center p-2 bg-muted rounded-md">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-foreground">{task.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  {isEditing ? (
                    <Select
                      value={editedTask.status}
                      onValueChange={(value) => setEditedTask(prev => ({ ...prev, status: value as Task['status'] }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2 bg-muted rounded-md">
                      {getStatusBadge(task.status)}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Priority</Label>
                  {isEditing ? (
                    <Select
                      value={editedTask.priority}
                      onValueChange={(value) => setEditedTask(prev => ({ ...prev, priority: value as Task['priority'] }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center p-2 bg-muted rounded-md">
                      <Flag className="h-4 w-4 mr-2" />
                      {getPriorityBadge(task.priority)}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                {isEditing ? (
                  <Textarea
                    value={editedTask.description || ''}
                    onChange={(e) => setEditedTask(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">
                    <p className="text-sm text-foreground">{task.description || 'No description provided.'}</p>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Created</Label>
                  <p className="text-sm text-foreground">{task.createdDate}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-muted-foreground">Last Updated</Label>
                  <p className="text-sm text-foreground">{task.updatedDate}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Evidence Tab */}
          <TabsContent value="evidence" className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Attached Evidence</h3>
              <div>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
                <Button
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Evidence
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {evidence.length > 0 ? (
                evidence.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.size} • Uploaded by {file.uploadedBy} on {file.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteEvidence(file.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Paperclip className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No evidence uploaded yet</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4 mt-6">
            <h3 className="text-sm font-medium">Activity Log</h3>
            <div className="space-y-3">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <Activity className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{activity.action}</span>
                      <span className="text-xs text-muted-foreground">by {activity.user}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}