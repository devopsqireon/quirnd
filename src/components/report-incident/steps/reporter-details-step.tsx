// src/components/report-incident/steps/reporter-details-step.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Info, User, Shield, Eye, EyeOff } from 'lucide-react';

interface ReporterDetailsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function ReporterDetailsStep({ formData, updateFormData }: ReporterDetailsStepProps) {
  return (
    <div className="space-y-8">
      {/* Step Introduction */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <User className="text-blue-600 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Your contact information</h3>
              <p className="text-sm text-blue-800">
                We need to know how to reach you for follow-up questions and updates. 
                You can choose to report anonymously if preferred.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-filled Notice */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="text-green-600 h-5 w-5 mt-0.5" />
            <div>
              <p className="text-sm text-green-800 font-medium">Information pre-filled from your profile</p>
              <p className="text-xs text-green-700 mt-1">
                You can modify these details below or choose to report anonymously
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anonymous Reporting Toggle */}
      <Card className="border-2 border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {formData.isAnonymous ? (
                  <EyeOff className="text-gray-600 h-6 w-6" />
                ) : (
                  <Eye className="text-gray-600 h-6 w-6" />
                )}
              </div>
              <div>
                <Label className="text-base font-semibold text-gray-900">Anonymous Reporting</Label>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.isAnonymous 
                    ? "Your identity will be hidden from non-admin users. Only security administrators can see your details."
                    : "Your name and contact information will be visible to the incident response team."
                  }
                </p>
              </div>
            </div>
            <Switch
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => updateFormData('isAnonymous', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Form */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span>Contact Information</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              type="text"
              value={formData.reporterName}
              onChange={(e) => updateFormData('reporterName', e.target.value)}
              className={`${formData.isAnonymous ? 'bg-gray-100' : ''} py-3`}
              readOnly={!formData.isAnonymous}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Department / Team
            </Label>
            <Input
              type="text"
              value={formData.reporterDepartment}
              onChange={(e) => updateFormData('reporterDepartment', e.target.value)}
              className={`${formData.isAnonymous ? 'bg-gray-100' : ''} py-3`}
              readOnly={!formData.isAnonymous}
              placeholder="Your department or team"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              required
              value={formData.reporterEmail}
              onChange={(e) => updateFormData('reporterEmail', e.target.value)}
              className="py-3"
              placeholder="your.email@company.com"
            />
            <p className="text-xs text-gray-600">
              We'll send incident updates and may need to ask follow-up questions
            </p>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Phone Number <span className="text-gray-500">(Optional)</span>
            </Label>
            <Input
              type="tel"
              value={formData.reporterPhone}
              onChange={(e) => updateFormData('reporterPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="py-3"
            />
            <p className="text-xs text-gray-600">
              For urgent follow-up if needed
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Additional Contact Information <span className="text-gray-500">(Optional)</span>
          </Label>
          <Textarea
            rows={3}
            value={formData.additionalContact}
            onChange={(e) => updateFormData('additionalContact', e.target.value)}
            placeholder="Alternative contact methods, best times to reach you, or any special instructions..."
            className="resize-none"
          />
        </div>
      </div>

      {/* Privacy Notice */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-2">Privacy & Confidentiality</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Your report is encrypted and stored securely</li>
            <li>• Only authorized security team members can access full details</li>
            <li>• We follow strict data protection protocols</li>
            <li>• You can request updates on your report at any time</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}