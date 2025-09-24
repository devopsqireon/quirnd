// src/components/improvement-readiness/modals/ScheduleReviewModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ScheduleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleReviewModal({ isOpen, onClose }: ScheduleReviewModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    participants: [] as string[],
    agenda: ''
  });

  const availableParticipants = [
    { id: 'john-smith', name: 'John Smith', role: 'Security Manager' },
    { id: 'sarah-johnson', name: 'Sarah Johnson', role: 'HR Director' },
    { id: 'mike-davis', name: 'Mike Davis', role: 'IT Manager' },
    { id: 'lisa-chen', name: 'Lisa Chen', role: 'Compliance Officer' },
    { id: 'emma-wilson', name: 'Emma Wilson', role: 'Quality Manager' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleParticipantToggle = (participantId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      participants: checked 
        ? [...prev.participants, participantId]
        : prev.participants.filter(id => id !== participantId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scheduling review:', formData);
    onClose();
    setFormData({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      participants: [],
      agenda: ''
    });
  };

  const handleClose = () => {
    onClose();
    setFormData({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      participants: [],
      agenda: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Management Review</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Review Title*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter review title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date*</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the review purpose"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time*</Label>
              <Input
                id="start-time"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time*</Label>
              <Input
                id="end-time"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conference-room-a">Conference Room A</SelectItem>
                  <SelectItem value="conference-room-b">Conference Room B</SelectItem>
                  <SelectItem value="boardroom">Boardroom</SelectItem>
                  <SelectItem value="virtual">Virtual Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Participants*</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableParticipants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <Checkbox
                    id={participant.id}
                    checked={formData.participants.includes(participant.id)}
                    onCheckedChange={(checked) => 
                      handleParticipantToggle(participant.id, checked as boolean)
                    }
                  />
                  <div className="flex-1">
                    <Label htmlFor={participant.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                      {participant.name}
                    </Label>
                    <div className="text-xs text-gray-500">{participant.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenda">Agenda</Label>
            <Textarea
              id="agenda"
              value={formData.agenda}
              onChange={(e) => handleInputChange('agenda', e.target.value)}
              placeholder="Meeting agenda and topics to be discussed"
              rows={4}
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}