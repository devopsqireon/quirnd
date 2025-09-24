// /app/awareness-training/components/modals/AssignTrainingModal.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { sampleTrainingPrograms, sampleUsers } from '../../data/sample-data';
import { PRIORITY_LEVELS } from '../../utils/constants';

interface AssignTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AssignTrainingModal: React.FC<AssignTrainingModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    trainingId: '',
    assigneeIds: [] as string[],
    dueDate: '',
    priority: 'medium' as keyof typeof PRIORITY_LEVELS,
    notes: '',
    sendNotification: true
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleUser = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      assigneeIds: prev.assigneeIds.includes(userId)
        ? prev.assigneeIds.filter(id => id !== userId)
        : [...prev.assigneeIds, userId]
    }));
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Training</DialogTitle>
          <DialogDescription>
            Assign training programs to employees with specific deadlines and priorities.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Training Selection */}
          <div>
            <Label htmlFor="training">Select Training Program *</Label>
            <select
              id="training"
              value={formData.trainingId}
              onChange={(e) => setFormData(prev => ({ ...prev, trainingId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose training program</option>
              {sampleTrainingPrograms.filter(p => p.isActive).map((program) => (
                <option key={program.id} value={program.id}>
                  {program.title} ({program.duration}min)
                </option>
              ))}
            </select>
          </div>

          {/* Assignment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                min={getMinDate()}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(PRIORITY_LEVELS).map(([value, config]) => (
                  <option key={value} value={value}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* User Selection */}
          <div>
            <Label>Select Assignees *</Label>
            <div className="mt-2">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="border rounded-md max-h-64 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <Checkbox
                      checked={formData.assigneeIds.includes(user.id)}
                      onCheckedChange={() => toggleUser(user.id)}
                    />
                    <User className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.department} • {user.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {formData.assigneeIds.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {formData.assigneeIds.length} employee(s) selected
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any additional instructions or context"
              rows={2}
            />
          </div>

          {/* Notification Option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notification"
              checked={formData.sendNotification}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, sendNotification: !!checked }))
              }
            />
            <Label htmlFor="notification">Send email notification to assignees</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={formData.assigneeIds.length === 0 || !formData.trainingId}
            >
              Assign Training
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTrainingModal;