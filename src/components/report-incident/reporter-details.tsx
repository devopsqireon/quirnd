// src/components/report-incident/reporter-details.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';

interface ReporterDetailsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function ReporterDetails({ formData, updateFormData }: ReporterDetailsProps) {
  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm">3</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Reporter Details</h2>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="text-blue-500 h-5 w-5 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Auto-filled from your profile</p>
              <p className="text-xs text-blue-600 mt-1">You can modify these details or report anonymously</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <Label className="text-sm font-medium text-gray-700">Report Anonymously</Label>
            <p className="text-xs text-gray-500 mt-1">Your identity will be hidden from non-admin users</p>
          </div>
          <Switch
            checked={formData.isAnonymous}
            onCheckedChange={(checked) => updateFormData('isAnonymous', checked)}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Full Name
            </Label>
            <Input
              type="text"
              value={formData.reporterName}
              onChange={(e) => updateFormData('reporterName', e.target.value)}
              className="bg-gray-50"
              readOnly={!formData.isAnonymous}
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Department
            </Label>
            <Input
              type="text"
              value={formData.reporterDepartment}
              onChange={(e) => updateFormData('reporterDepartment', e.target.value)}
              className="bg-gray-50"
              readOnly={!formData.isAnonymous}
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </Label>
            <Input
              type="email"
              value={formData.reporterEmail}
              onChange={(e) => updateFormData('reporterEmail', e.target.value)}
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-gray-400">(Optional)</span>
            </Label>
            <Input
              type="tel"
              value={formData.reporterPhone}
              onChange={(e) => updateFormData('reporterPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Additional Contact Information <span className="text-gray-400">(Optional)</span>
          </Label>
          <Textarea
            rows={2}
            value={formData.additionalContact}
            onChange={(e) => updateFormData('additionalContact', e.target.value)}
            placeholder="Alternative contact methods, best times to reach you, etc..."
            className="resize-none"
          />
        </div>
      </div>
    </section>
  );
}