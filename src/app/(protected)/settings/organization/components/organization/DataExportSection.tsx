// src/app/(protected)/settings/components/organization/DataExportSection.tsx

'use client';

import { FileText, FileSpreadsheet, File, FileCode } from 'lucide-react';
import { DataExportSettings } from '@/lib/types/organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface DataExportSectionProps {
  settings: DataExportSettings | null;
  onUpdate: (updates: Partial<DataExportSettings>) => void;
}

export function DataExportSection({ settings, onUpdate }: DataExportSectionProps) {
  if (!settings) return null;

  const formatOptions = [
    { 
      value: 'pdf', 
      label: 'PDF', 
      icon: FileText, 
      color: 'text-red-500' 
    },
    { 
      value: 'excel', 
      label: 'Excel', 
      icon: FileSpreadsheet, 
      color: 'text-green-500' 
    },
    { 
      value: 'csv', 
      label: 'CSV', 
      icon: File, 
      color: 'text-blue-500' 
    },
    { 
      value: 'json', 
      label: 'JSON', 
      icon: FileCode, 
      color: 'text-orange-500' 
    }
  ];

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Data Export Settings</CardTitle>
          <CardDescription>Configure default export formats and preferences</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Default Export Format */}
          <div className="space-y-2">
            <Label>Default Export Format</Label>
            <RadioGroup 
              value={settings.defaultFormat} 
              onValueChange={(value: 'pdf' | 'excel' | 'csv' | 'json') => onUpdate({ defaultFormat: value })}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {formatOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = settings.defaultFormat === option.value;
                  
                  return (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={`relative cursor-pointer`}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="sr-only"
                      />
                      <Card 
                        className={`p-3 text-center transition-all ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-muted hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        <CardContent className="p-0">
                          <Icon className={`${option.color} text-xl mb-2 mx-auto h-6 w-6`} />
                          <p className="text-xs font-medium">{option.label}</p>
                        </CardContent>
                      </Card>
                    </Label>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Export Security */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Export Security</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="password-protect"
                  checked={settings.passwordProtect}
                  onCheckedChange={(checked) => onUpdate({ passwordProtect: checked as boolean })}
                />
                <Label htmlFor="password-protect" className="text-sm font-normal">
                  Password protect exports
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="audit-trail"
                  checked={settings.includeAuditTrail}
                  onCheckedChange={(checked) => onUpdate({ includeAuditTrail: checked as boolean })}
                />
                <Label htmlFor="audit-trail" className="text-sm font-normal">
                  Include audit trail in exports
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="watermark"
                  checked={settings.watermarkSensitive}
                  onCheckedChange={(checked) => onUpdate({ watermarkSensitive: checked as boolean })}
                />
                <Label htmlFor="watermark" className="text-sm font-normal">
                  Watermark sensitive documents
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}