// src/components/report-incident/description-impact.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, X, Server, Download, ShieldUser, TriangleAlert } from 'lucide-react';

interface DescriptionImpactProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function DescriptionImpact({ formData, updateFormData }: DescriptionImpactProps) {
  const [charCount, setCharCount] = useState(0);
  const [assetSearch, setAssetSearch] = useState('');

  const handleDescriptionChange = (value: string) => {
    setCharCount(value.length);
    updateFormData('description', value);
  };

  const addAffectedAsset = (asset: string) => {
    if (asset && !formData.affectedAssets.includes(asset)) {
      updateFormData('affectedAssets', [...formData.affectedAssets, asset]);
      setAssetSearch('');
    }
  };

  const removeAffectedAsset = (asset: string) => {
    updateFormData('affectedAssets', formData.affectedAssets.filter((a: string) => a !== asset));
  };

  const toggleImpact = (impact: string) => {
    const impacts = formData.impacts.includes(impact)
      ? formData.impacts.filter((i: string) => i !== impact)
      : [...formData.impacts, impact];
    updateFormData('impacts', impacts);
  };

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm">2</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Description & Impact</h2>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Incident Description <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Provide a detailed description of what happened, when you noticed it, and any relevant context..."
              className="resize-none pr-20"
              maxLength={2000}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {charCount}/2000
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Include timeline, affected systems, and any observed behaviors
          </p>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Affected Assets
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={assetSearch}
              onChange={(e) => setAssetSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addAffectedAsset(assetSearch)}
              placeholder="Search and select affected systems, databases, applications..."
              className="pr-10"
            />
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.affectedAssets.map((asset: string, index: number) => (
              <Badge key={index} variant="secondary" className="px-2 py-1">
                {asset}
                <button
                  type="button"
                  onClick={() => removeAffectedAsset(asset)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3">
            Initial Impact Assessment
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox
                checked={formData.impacts.includes('service-downtime')}
                onCheckedChange={() => toggleImpact('service-downtime')}
              />
              <div className="flex items-center space-x-2">
                <Server className="text-red-500 h-4 w-4" />
                <span className="text-sm font-medium text-gray-700">Service Downtime</span>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox
                checked={formData.impacts.includes('data-exfiltration')}
                onCheckedChange={() => toggleImpact('data-exfiltration')}
              />
              <div className="flex items-center space-x-2">
                <Download className="text-orange-500 h-4 w-4" />
                <span className="text-sm font-medium text-gray-700">Data Exfiltration</span>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox
                checked={formData.impacts.includes('pii-exposure')}
                onCheckedChange={() => toggleImpact('pii-exposure')}
              />
              <div className="flex items-center space-x-2">
                <ShieldUser className="text-purple-500 h-4 w-4" />
                <span className="text-sm font-medium text-gray-700">PII Exposure</span>
              </div>
            </label>
            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <Checkbox
                checked={formData.impacts.includes('other-impact')}
                onCheckedChange={() => toggleImpact('other-impact')}
              />
              <div className="flex items-center space-x-2">
                <TriangleAlert className="text-gray-500 h-4 w-4" />
                <span className="text-sm font-medium text-gray-700">Other Impact</span>
              </div>
            </label>
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2">
            Immediate Actions Taken <span className="text-gray-400">(Optional)</span>
          </Label>
          <Textarea
            rows={3}
            value={formData.immediateActions}
            onChange={(e) => updateFormData('immediateActions', e.target.value)}
            placeholder="Describe any immediate containment or mitigation steps already taken..."
            className="resize-none"
          />
        </div>
      </div>
    </section>
  );
}