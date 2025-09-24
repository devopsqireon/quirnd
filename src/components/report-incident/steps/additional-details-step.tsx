// src/components/report-incident/steps/additional-details-step.tsx
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, X, Tags, DollarSign, Users, AlertTriangle, TrendingUp } from 'lucide-react';

interface AdditionalDetailsStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function AdditionalDetailsStep({ formData, updateFormData }: AdditionalDetailsStepProps) {
  const [tagInput, setTagInput] = useState('');

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      updateFormData('tags', [...formData.tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    updateFormData('tags', formData.tags.filter((t: string) => t !== tag));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  const suggestedTags = ['urgent', 'security', 'malware', 'external', 'customer-impact', 'data-breach', 'phishing'];

  return (
    <div className="space-y-8">
      {/* Step Introduction */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Tags className="text-blue-600 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Additional context (Optional)</h3>
              <p className="text-sm text-blue-800">
                Help us categorize and prioritize this incident by providing additional details 
                about its business impact and regulatory requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags & Labels */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-900">
          Tags & Labels
        </Label>
        <p className="text-sm text-gray-600">
          Add tags to help categorize this incident. This makes it easier to find and analyze similar incidents.
        </p>
        <Input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={handleTagKeyPress}
          placeholder="Type a tag and press Enter (e.g., urgent, customer-impact)"
          className="py-3"
        />
        
        {/* Current Tags */}
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
            {formData.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTag(tag)}
                  className="ml-2 h-auto p-0 text-red-600 hover:text-red-800"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        {/* Suggested Tags */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags
              .filter(tag => !formData.tags.includes(tag))
              .map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTag(suggestion)}
                  className="text-xs h-7"
                >
                  + {suggestion}
                </Button>
              ))
            }
          </div>
        </div>
      </div>

      {/* Regulatory Notification */}
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <label className="flex items-start space-x-4 cursor-pointer">
            <Checkbox
              checked={formData.regulatoryRequired}
              onCheckedChange={(checked) => updateFormData('regulatoryRequired', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Scale className="text-orange-600 h-5 w-5" />
                <span className="text-base font-semibold text-orange-900">Regulatory Notification Required</span>
              </div>
              <p className="text-sm text-orange-800 leading-relaxed">
                Check this box if you believe regulatory authorities (GDPR, HIPAA, SOX, PCI DSS, etc.) 
                may need to be informed about this incident. This helps ensure compliance with legal requirements.
              </p>
              {formData.regulatoryRequired && (
                <div className="mt-3 p-3 bg-orange-100 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">
                    This incident will be flagged for regulatory review by our compliance team.
                  </p>
                </div>
              )}
            </div>
          </label>
        </CardContent>
      </Card>

      {/* Related Incidents */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-900">
          Related Incidents or References
        </Label>
        <Input
          type="text"
          value={formData.relatedIncidents}
          onChange={(e) => updateFormData('relatedIncidents', e.target.value)}
          placeholder="Reference incident IDs, ticket numbers, or related events (e.g., INC-2024-001, TICKET-5678)"
          className="py-3"
        />
        <p className="text-sm text-gray-600">
          If this incident is related to previous incidents or support tickets, mention them here.
        </p>
      </div>

      {/* Business Impact Assessment */}
      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold text-gray-900 mb-2 block">
            Business Impact Assessment
          </Label>
          <p className="text-sm text-gray-600 mb-4">
            Help us understand the business impact to prioritize our response appropriately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <DollarSign className="h-5 w-5 text-green-600" />
                <Label className="font-medium text-gray-900">Financial Impact</Label>
              </div>
              <Select 
                value={formData.financialImpact} 
                onValueChange={(value) => updateFormData('financialImpact', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select impact level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None/Unknown</SelectItem>
                  <SelectItem value="low">Low (&lt;$1K)</SelectItem>
                  <SelectItem value="medium">Medium ($1K-$10K)</SelectItem>
                  <SelectItem value="high">High ($10K-$100K)</SelectItem>
                  <SelectItem value="critical">Critical (&gt;$100K)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="h-5 w-5 text-blue-600" />
                <Label className="font-medium text-gray-900">Customers Affected</Label>
              </div>
              <Select 
                value={formData.customersAffected} 
                onValueChange={(value) => updateFormData('customersAffected', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None/Unknown</SelectItem>
                  <SelectItem value="few">Few (&lt;10)</SelectItem>
                  <SelectItem value="some">Some (10-100)</SelectItem>
                  <SelectItem value="many">Many (100-1K)</SelectItem>
                  <SelectItem value="massive">Massive (&gt;1K)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <Label className="font-medium text-gray-900">Reputation Risk</Label>
              </div>
              <Select 
                value={formData.reputationRisk} 
                onValueChange={(value) => updateFormData('reputationRisk', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Help Text */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-2">Need help with impact assessment?</h4>
          <p className="text-sm text-gray-700">
            If you're unsure about the business impact, that's okay. Our security team will help 
            assess and categorize the incident properly. You can leave these fields as "Unknown" 
            and we'll follow up with you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}