// src/components/report-incident/steps/basic-information-step.tsx
"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, HelpCircle, AlertTriangle } from 'lucide-react';

interface BasicInformationStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function BasicInformationStep({ formData, updateFormData }: BasicInformationStepProps) {
  const getSeverityHelper = (severity: string) => {
    const helpers = {
      low: "Minor issues with minimal business impact. System still functional.",
      medium: "Moderate impact affecting some users or systems. Service degraded but available.", 
      high: "Significant impact affecting many users. Major service disruption.",
      critical: "Severe impact affecting all users or containing data. Complete service outage or data breach."
    };
    return helpers[severity as keyof typeof helpers] || "";
  };

  return (
    <div className="space-y-8">
      {/* Step Introduction */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-blue-600 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Let's start with the basics</h3>
              <p className="text-sm text-blue-800">
                Provide essential information about the incident. This helps our security team understand 
                the nature and urgency of the situation immediately.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incident Title */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-900">
          What happened? <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          required
          value={formData.title}
          onChange={(e) => updateFormData('title', e.target.value)}
          placeholder="e.g., Suspicious login attempts on admin accounts"
          className="text-lg py-4"
        />
        <p className="text-sm text-gray-600">
          Write a clear, concise title that summarizes the incident in one sentence.
        </p>
      </div>

      {/* Category and Severity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label className="text-base font-semibold text-gray-900">
            What type of incident is this? <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
            <SelectTrigger className="py-4 text-left">
              <SelectValue placeholder="Choose the closest category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="security-breach">🔒 Security Breach - Unauthorized access</SelectItem>
              <SelectItem value="data-leak">💾 Data Leak - Information exposure</SelectItem>
              <SelectItem value="service-outage">⚡ Service Outage - System downtime</SelectItem>
              <SelectItem value="phishing">🎣 Phishing Attack - Social engineering</SelectItem>
              <SelectItem value="malware">🦠 Malware/Ransomware - Malicious software</SelectItem>
              <SelectItem value="physical-breach">🏢 Physical Security - Building/device access</SelectItem>
              <SelectItem value="other">❓ Other - Not listed above</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Label className="text-base font-semibold text-gray-900">
              How severe is this incident? <span className="text-red-500">*</span>
            </Label>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              className="text-blue-600 hover:text-blue-700 h-auto p-1"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
          <Select value={formData.severity} onValueChange={(value) => updateFormData('severity', value)}>
            <SelectTrigger className="py-4 text-left">
              <SelectValue placeholder="Select impact level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">🟢 Low Impact - Minor issue</SelectItem>
              <SelectItem value="medium">🟡 Medium Impact - Moderate disruption</SelectItem>
              <SelectItem value="high">🟠 High Impact - Significant problems</SelectItem>
              <SelectItem value="critical">🔴 Critical Impact - Severe emergency</SelectItem>
            </SelectContent>
          </Select>
          {formData.severity && (
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {getSeverityHelper(formData.severity)}
            </p>
          )}
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Bot className="h-4 w-4 mr-2" />
            Get AI Severity Suggestion
          </Button>
        </div>
      </div>

      {/* Date and Time */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-900">
          When did you first notice this incident? <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Date</Label>
            <Input
              type="date"
              required
              value={formData.dateDetected}
              onChange={(e) => updateFormData('dateDetected', e.target.value)}
              className="py-3"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Time (approximate is fine)</Label>
            <Input
              type="time"
              required
              value={formData.timeDetected}
              onChange={(e) => updateFormData('timeDetected', e.target.value)}
              className="py-3"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">
          If you're not sure of the exact time, provide your best estimate. This helps us understand the timeline.
        </p>
      </div>

      {/* Quick Validation Summary */}
      {(formData.title || formData.category || formData.severity) && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-green-900 mb-2">Summary so far:</h4>
            <div className="text-sm text-green-800 space-y-1">
              {formData.title && <p>• Incident: {formData.title}</p>}
              {formData.category && <p>• Type: {formData.category.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>}
              {formData.severity && <p>• Severity: {formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1)}</p>}
              {formData.dateDetected && formData.timeDetected && (
                <p>• When: {formData.dateDetected} at {formData.timeDetected}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}