// src/components/improvement-readiness/modals/NewImprovementModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface NewImprovementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewImprovementModal({ isOpen, onClose }: NewImprovementModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    owner: '',
    priority: 'low',
    linkedControl: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting improvement:', formData);
    onClose();
    setFormData({
      title: '',
      description: '',
      category: '',
      owner: '',
      priority: 'low',
      linkedControl: ''
    });
  };

  const handleClose = () => {
    onClose();
    setFormData({
      title: '',
      description: '',
      category: '',
      owner: '',
      priority: 'low',
      linkedControl: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Improvement Opportunity</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter improvement title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="process">Process</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
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
              placeholder="Describe the improvement opportunity"
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
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linked-control">Linked Control/Risk</Label>
            <Select value={formData.linkedControl} onValueChange={(value) => handleInputChange('linkedControl', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select control or risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ac-2.1">AC-2.1 - Access Control</SelectItem>
                <SelectItem value="cp-9.1">CP-9.1 - Backup Procedures</SelectItem>
                <SelectItem value="risk-001">Risk-001 - Data Breach</SelectItem>
                <SelectItem value="risk-003">Risk-003 - System Failure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Add Improvement
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}