// src/components/report-incident/steps/description-impact-step.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X, Server, Download, ShieldUser, TriangleAlert, FileText, AlertCircle } from 'lucide-react';

interface DescriptionImpactStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function DescriptionImpactStep({ formData, updateFormData }: DescriptionImpactStepProps) {
  const [charCount, setCharCount] = useState(formData.description?.length || 0);
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

  const suggestedAssets = ['Customer Database', 'Web Application', 'Email Server', 'File Server', 'VPN Gateway'];

  return (
    <div className="space-y-8">
      {/* Step Introduction */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <FileText className="text-blue-600 h-5 w-5 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Tell us what happened</h3>
              <p className="text-sm text-blue-800">
                Provide detailed information about the incident and its impact. The more specific you can be, 
                the better our security team can respond.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Description */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-900">
          Describe what happened in detail <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Textarea
            required
            rows={6}
            value={formData.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Please include:
• What did you notice first?
• When did it happen?
• What systems or data were involved?
• Any error messages or unusual behavior?
• Timeline of events
• Any actions you've already taken"
            className="resize-none pr-20 text-base leading-relaxed"
            maxLength={2000}
          />
          <div className={`absolute bottom-3 right-3 text-xs ${
            charCount > 1800 ? 'text-red-500' : 'text-gray-400'
          }`}>
            {charCount}/2000
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="text-yellow-600 h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Writing tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Be specific about times, systems, and symptoms</li>
                <li>• Include any error messages exactly as they appeared</li>
                <li>• Mention if other people have reported similar issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Affected Assets */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-900">
          Which systems or assets were affected?
        </Label>
        <div className="space-y-3">
          <div className="relative">
            <Input
              type="text"
              value={assetSearch}
              onChange={(e) => setAssetSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addAffectedAsset(assetSearch);
                }
              }}
              placeholder="Type system name and press Enter (e.g., Customer Database, Email Server)"
              className="pr-10"
            />
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          
          {/* Quick Add Suggestions */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Quick add:</span>
            {suggestedAssets
              .filter(asset => !formData.affectedAssets.includes(asset))
              .map((asset) => (
                <Button
                  key={asset}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addAffectedAsset(asset)}
                  className="text-xs h-7"
                >
                  + {asset}
                </Button>
              ))
            }
          </div>

          {/* Selected Assets */}
          {formData.affectedAssets.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
              {formData.affectedAssets.map((asset: string, index: number) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {asset}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAffectedAsset(asset)}
                    className="ml-2 h-auto p-0 text-red-600 hover:text-red-800"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Impact Assessment */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-900">
          What type of impact did this incident cause?
        </Label>
        <p className="text-sm text-gray-600">Select all that apply. This helps us prioritize our response.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className={`cursor-pointer transition-all ${
            formData.impacts.includes('service-downtime') ? 'ring-2 ring-red-500 bg-red-50' : 'hover:bg-gray-50'
          }`}>
            <CardContent className="p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <Checkbox
                  checked={formData.impacts.includes('service-downtime')}
                  onCheckedChange={() => toggleImpact('service-downtime')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Server className="text-red-500 h-4 w-4" />
                    <span className="font-medium text-gray-900">Service Downtime</span>
                  </div>
                  <p className="text-sm text-gray-600">Users cannot access systems or services</p>
                </div>
              </label>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all ${
            formData.impacts.includes('data-exfiltration') ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:bg-gray-50'
          }`}>
            <CardContent className="p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <Checkbox
                  checked={formData.impacts.includes('data-exfiltration')}
                  onCheckedChange={() => toggleImpact('data-exfiltration')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Download className="text-orange-500 h-4 w-4" />
                    <span className="font-medium text-gray-900">Data Exfiltration</span>
                  </div>
                  <p className="text-sm text-gray-600">Unauthorized data access or theft</p>
                </div>
              </label>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all ${
            formData.impacts.includes('pii-exposure') ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'
          }`}>
            <CardContent className="p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <Checkbox
                  checked={formData.impacts.includes('pii-exposure')}
                  onCheckedChange={() => toggleImpact('pii-exposure')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <ShieldUser className="text-purple-500 h-4 w-4" />
                    <span className="font-medium text-gray-900">Personal Data Exposure</span>
                  </div>
                  <p className="text-sm text-gray-600">Customer or employee personal information exposed</p>
                </div>
              </label>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all ${
            formData.impacts.includes('other-impact') ? 'ring-2 ring-gray-500 bg-gray-50' : 'hover:bg-gray-50'
          }`}>
            <CardContent className="p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <Checkbox
                  checked={formData.impacts.includes('other-impact')}
                  onCheckedChange={() => toggleImpact('other-impact')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <TriangleAlert className="text-gray-500 h-4 w-4" />
                    <span className="font-medium text-gray-900">Other Impact</span>
                  </div>
                  <p className="text-sm text-gray-600">Different type of impact not listed above</p>
                </div>
              </label>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Immediate Actions */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-gray-900">
          What immediate actions have you taken? <span className="text-gray-500">(Optional)</span>
        </Label>
        <Textarea
          rows={3}
          value={formData.immediateActions}
          onChange={(e) => updateFormData('immediateActions', e.target.value)}
          placeholder="Describe any steps you've already taken to contain or mitigate this incident..."
          className="resize-none"
        />
        <p className="text-sm text-gray-600">
          Examples: Disconnected affected systems, changed passwords, notified IT support, isolated network segments
        </p>
      </div>
    </div>
  );
}