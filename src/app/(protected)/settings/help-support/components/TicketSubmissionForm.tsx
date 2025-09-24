// src/app/(protected)/settings/help-support/components/TicketSubmissionForm.tsx
'use client';
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export function TicketSubmissionForm() {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    priority: '',
    description: '',
    browser: '',
    os: '',
    device: '',
    emailNotifications: false,
    allowAccess: false,
    scheduleCall: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.category || !formData.priority || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Ticket submitted successfully! You will receive a confirmation email shortly.');
    // Reset form
    setFormData({
      subject: '',
      category: '',
      priority: '',
      description: '',
      browser: '',
      os: '',
      device: '',
      emailNotifications: false,
      allowAccess: false,
      scheduleCall: false,
    });
  };

  const handleSaveDraft = () => {
    toast.info('Draft saved successfully');
  };

  const handlePreview = () => {
    toast.info('Opening ticket preview');
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Submit New Ticket</CardTitle>
        <p className="text-sm text-gray-500">Describe your issue and we'll help you resolve it quickly</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Information */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value="Sarah Wilson" disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label>Organization</Label>
                  <Input value="Acme Corporation" disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value="sarah.wilson@acme.com" disabled className="bg-gray-100" />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input value="Marketing" disabled className="bg-gray-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="integration">Integration Support</SelectItem>
                    <SelectItem value="training">Training & Onboarding</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority *</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General inquiry</SelectItem>
                    <SelectItem value="medium">Medium - Standard issue</SelectItem>
                    <SelectItem value="high">High - Urgent issue</SelectItem>
                    <SelectItem value="critical">Critical - System down</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Please provide detailed information about your issue, including steps to reproduce, error messages, and any relevant context..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">Be as specific as possible to help us resolve your issue quickly</p>
            </div>

            {/* Environment Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Browser</Label>
                <Select value={formData.browser} onValueChange={(value) => setFormData({ ...formData, browser: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select browser" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chrome">Chrome</SelectItem>
                    <SelectItem value="firefox">Firefox</SelectItem>
                    <SelectItem value="safari">Safari</SelectItem>
                    <SelectItem value="edge">Edge</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Operating System</Label>
                <Select value={formData.os} onValueChange={(value) => setFormData({ ...formData, os: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select OS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="windows">Windows</SelectItem>
                    <SelectItem value="macos">macOS</SelectItem>
                    <SelectItem value="linux">Linux</SelectItem>
                    <SelectItem value="ios">iOS</SelectItem>
                    <SelectItem value="android">Android</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Device Type</Label>
                <Select value={formData.device} onValueChange={(value) => setFormData({ ...formData, device: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* File Attachments */}
            <div>
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)</p>
                <Button type="button" variant="outline" className="mt-2">
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Additional Options */}
            <Card className="bg-gray-50">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Additional Options</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="emailNotifications"
                      checked={formData.emailNotifications}
                      onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: !!checked })}
                    />
                    <Label htmlFor="emailNotifications" className="text-sm">Send me email notifications for updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowAccess"
                      checked={formData.allowAccess}
                      onCheckedChange={(checked) => setFormData({ ...formData, allowAccess: !!checked })}
                    />
                    <Label htmlFor="allowAccess" className="text-sm">Allow support team to access my account for troubleshooting</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="scheduleCall"
                      checked={formData.scheduleCall}
                      onCheckedChange={(checked) => setFormData({ ...formData, scheduleCall: !!checked })}
                    />
                    <Label htmlFor="scheduleCall" className="text-sm">Schedule a call with support agent</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={handlePreview}>
                Preview
              </Button>
              <Button type="submit">
                Submit Ticket
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}