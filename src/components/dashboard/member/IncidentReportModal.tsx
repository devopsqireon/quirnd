// src/components/dashboard/member/IncidentReportModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CloudUpload, Send, X } from 'lucide-react';

interface IncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IncidentReportModal({ isOpen, onClose }: IncidentReportModalProps) {
  const [formData, setFormData] = useState({
    incidentType: '',
    severity: '',
    description: '',
    occurredAt: '',
    files: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Incident report submitted:', formData);
    onClose();
    // Reset form
    setFormData({
      incidentType: '',
      severity: '',
      description: '',
      occurredAt: '',
      files: []
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: Array.from(e.target.files || [])
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-semibold text-gray-900">
              Report Security Incident
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Incident Type */}
          <div>
            <Label htmlFor="incident-type" className="text-sm font-medium text-gray-700">
              Incident Type
            </Label>
            <Select value={formData.incidentType} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, incidentType: value }))
            }>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select incident type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="security-bug">Security Bug/Vulnerability</SelectItem>
                <SelectItem value="phishing">Phishing Email</SelectItem>
                <SelectItem value="suspicious-activity">Suspicious Activity</SelectItem>
                <SelectItem value="password-issue">Password/Access Issue</SelectItem>
                <SelectItem value="data-breach">Data Breach</SelectItem>
                <SelectItem value="physical-security">Physical Security</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Severity Level */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Severity Level
            </Label>
            <RadioGroup 
              value={formData.severity} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
              className="grid grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="text-sm cursor-pointer">Low</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="text-sm cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-sm cursor-pointer">High</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              className="mt-2"
              rows={4}
              placeholder="Please provide detailed information about the incident..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          {/* When did this occur */}
          <div>
            <Label htmlFor="occurred-at" className="text-sm font-medium text-gray-700">
              When did this occur?
            </Label>
            <Input
              id="occurred-at"
              type="datetime-local"
              className="mt-2"
              value={formData.occurredAt}
              onChange={(e) => setFormData(prev => ({ ...prev, occurredAt: e.target.value }))}
            />
          </div>

          {/* Attachments */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Attachments (Optional)
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <Label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>Upload files</span>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileChange}
                    />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB each</p>
                {formData.files.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {formData.files.length} file(s) selected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}