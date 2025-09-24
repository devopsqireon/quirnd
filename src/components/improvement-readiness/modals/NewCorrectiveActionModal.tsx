// src/components/improvement-readiness/modals/NewCorrectiveActionModal.tsx
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface NewCorrectiveActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewCorrectiveActionModal({ isOpen, onClose }: NewCorrectiveActionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    owner: '',
    dueDate: '',
    linkedItems: [] as string[]
  });

  const [newLinkedItem, setNewLinkedItem] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addLinkedItem = () => {
    if (newLinkedItem.trim()) {
      setFormData(prev => ({
        ...prev,
        linkedItems: [...prev.linkedItems, newLinkedItem.trim()]
      }));
      setNewLinkedItem('');
    }
  };

  const removeLinkedItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      linkedItems: prev.linkedItems.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitting corrective action:', formData);
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: '',
      owner: '',
      dueDate: '',
      linkedItems: []
    });
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: '',
      owner: '',
      dueDate: '',
      linkedItems: []
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Corrective Action</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter corrective action title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority*</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the corrective action in detail"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="owner">Owner*</Label>
              <Select value={formData.owner} onValueChange={(value) => handleInputChange('owner', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-smith">John Smith</SelectItem>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="mike-davis">Mike Davis</SelectItem>
                  <SelectItem value="lisa-chen">Lisa Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date*</Label>
              <Input
                id="due-date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Linked Risks/Controls</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {formData.linkedItems.map((item, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {item}
                    <button
                      type="button"
                      onClick={() => removeLinkedItem(index)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newLinkedItem}
                  onChange={(e) => setNewLinkedItem(e.target.value)}
                  placeholder="Enter risk or control ID"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLinkedItem())}
                />
                <Button type="button" variant="outline" onClick={addLinkedItem}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Corrective Action
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}