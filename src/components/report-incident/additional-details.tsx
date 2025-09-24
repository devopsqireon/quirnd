// src/components/report-incident/additional-details.tsx
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scale, X } from 'lucide-react';

interface AdditionalDetailsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function AdditionalDetails({ formData, updateFormData }: AdditionalDetailsProps) {
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
      addTag(tagInput);
    }
  };

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm">5</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Additional Details</h2>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Tags & Labels
          </Label>
          <Input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="Type tags and press Enter (e.g., urgent, phishing, customer-impact)"
          />
          <div className="mt-3 flex flex-wrap gap-2">
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
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
            <div className="flex flex-wrap gap-2">
              {['security', 'malware', 'external'].map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTag(suggestion)}
                  className="text-xs h-6 px-2 py-1"
                >
                  + {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <Checkbox
              checked={formData.regulatoryRequired}
              onCheckedChange={(checked) => updateFormData('regulatoryRequired', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Scale className="text-orange-600 h-4 w-4" />
                <span className="text-sm font-medium text-orange-900">Regulatory Notification Required</span>
              </div>
              <p className="text-xs text-orange-800 mt-1">
                Check this box if you believe regulatory authorities (GDPR, HIPAA, SOX, etc.) may need to be informed about this incident
              </p>
            </div>
          </label>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Related Incidents or References
          </Label>
          <Input
            type="text"
            value={formData.relatedIncidents}
            onChange={(e) => updateFormData('relatedIncidents', e.target.value)}
            placeholder="Reference incident IDs, ticket numbers, or related events (e.g., INC-2024-001)"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Business Impact Assessment
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <Label className="text-xs font-medium text-gray-600 mb-2">Financial Impact</Label>
              <Select 
                value={formData.financialImpact} 
                onValueChange={(value) => updateFormData('financialImpact', value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None/Unknown</SelectItem>
                  <SelectItem value="low">Low (&lt;$1K)</SelectItem>
                  <SelectItem value="medium">Medium ($1K-$10K)</SelectItem>
                  <SelectItem value="high">High ($10K-$100K)</SelectItem>
                  <SelectItem value="critical">Critical (&gt;$100K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <Label className="text-xs font-medium text-gray-600 mb-2">Customers Affected</Label>
              <Select 
                value={formData.customersAffected} 
                onValueChange={(value) => updateFormData('customersAffected', value)}
              >
                <SelectTrigger className="h-8 text-sm">
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
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <Label className="text-xs font-medium text-gray-600 mb-2">Reputation Risk</Label>
              <Select 
                value={formData.reputationRisk} 
                onValueChange={(value) => updateFormData('reputationRisk', value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}