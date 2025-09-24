// File: src/components/feedback/FeedbackSubmission.tsx
"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wand2, CloudUpload, Lightbulb, Send, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function FeedbackSubmission() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    impactArea: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Feedback submitted successfully!');
    setFormData({
      title: '',
      category: '',
      priority: '',
      impactArea: '',
      description: ''
    });
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Submit Feedback</CardTitle>
          <div className="flex items-center text-sm text-gray-500">
            <Wand2 className="w-4 h-4 mr-2" />
            AI-Powered Suggestions
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Describe your feedback in one line"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="integration">Integration</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="impactArea" className="text-sm font-medium">Impact Area</Label>
              <Select value={formData.impactArea} onValueChange={(value) => setFormData({ ...formData, impactArea: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select impact area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ux">User Experience</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Provide detailed information about your feedback..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Attachments</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 mt-2 cursor-pointer">
              <CloudUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Drop files here or click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <AlertDescription>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">AI Suggestions</h4>
                <p className="text-sm text-blue-700 mb-3">Based on your input, we found similar feedback:</p>
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enhanced Dashboard Filters</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">In Progress</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Advanced Export Options</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Planned</span>
                    </div>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}