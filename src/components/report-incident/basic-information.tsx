// src/components/report-incident/basic-information.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Bot, ChevronDown } from 'lucide-react';

interface BasicInformationProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function BasicInformation({ formData, updateFormData }: BasicInformationProps) {
  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm">1</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Incident Title <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            required
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            placeholder="Brief description of the incident"
            className="py-3"
          />
          <p className="mt-1 text-xs text-gray-500">
            Keep it concise but descriptive (e.g., "Unauthorized access to customer database")
          </p>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
            <SelectTrigger className="py-3">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="security-breach">🔒 Security Breach</SelectItem>
              <SelectItem value="data-leak">💾 Data Leak</SelectItem>
              <SelectItem value="service-outage">⚡ Service Outage</SelectItem>
              <SelectItem value="phishing">🎣 Phishing Attack</SelectItem>
              <SelectItem value="malware">🦠 Malware/Ransomware</SelectItem>
              <SelectItem value="physical-breach">🏢 Physical Security Breach</SelectItem>
              <SelectItem value="other">❓ Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Severity Level <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.severity} onValueChange={(value) => updateFormData('severity', value)}>
            <SelectTrigger className="py-3">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">🟢 Low - Minimal impact</SelectItem>
              <SelectItem value="medium">🟡 Medium - Moderate impact</SelectItem>
              <SelectItem value="high">🟠 High - Significant impact</SelectItem>
              <SelectItem value="critical">🔴 Critical - Severe impact</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-2 flex items-center space-x-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              className="text-xs text-blue-600 hover:text-blue-700 h-auto p-0"
            >
              <Bot className="h-3 w-3 mr-1" />
              AI Severity Suggestion
            </Button>
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Date Detected <span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            required
            value={formData.dateDetected}
            onChange={(e) => updateFormData('dateDetected', e.target.value)}
            className="py-3"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Time Detected <span className="text-red-500">*</span>
          </Label>
          <Input
            type="time"
            required
            value={formData.timeDetected}
            onChange={(e) => updateFormData('timeDetected', e.target.value)}
            className="py-3"
          />
        </div>
      </div>
    </section>
  );
}