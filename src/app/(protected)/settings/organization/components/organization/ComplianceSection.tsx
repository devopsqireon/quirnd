// src/app/(protected)/settings/components/organization/ComplianceSection.tsx

'use client';

import { ComplianceSettings } from '@/lib/types/organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface ComplianceSectionProps {
  settings: ComplianceSettings | null;
  onUpdate: (updates: Partial<ComplianceSettings>) => void;
}

export function ComplianceSection({ settings, onUpdate }: ComplianceSectionProps) {
  if (!settings) return null;

  const handleFrameworkChange = (frameworkId: string, checked: boolean) => {
    const updatedFrameworks = checked
      ? [...settings.regulatoryFrameworks, frameworkId]
      : settings.regulatoryFrameworks.filter(id => id !== frameworkId);
    
    onUpdate({ regulatoryFrameworks: updatedFrameworks });
  };

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Configuration</CardTitle>
          <CardDescription>Configure compliance-specific organization settings</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Industry Classification */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry Classification</Label>
            <Select 
              value={settings.industryClassification} 
              onValueChange={(value) => onUpdate({ industryClassification: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial-services">Financial Services</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Determines applicable compliance frameworks and requirements</p>
          </div>

          {/* Regulatory Frameworks */}
          <div className="space-y-3">
            <Label>Applicable Regulatory Frameworks</Label>
            <div className="space-y-2">
              {[
                { id: 'sox', label: 'SOX (Sarbanes-Oxley Act)' },
                { id: 'gdpr', label: 'GDPR (General Data Protection Regulation)' },
                { id: 'hipaa', label: 'HIPAA (Health Insurance Portability and Accountability Act)' },
                { id: 'pci-dss', label: 'PCI DSS (Payment Card Industry Data Security Standard)' },
                { id: 'iso-27001', label: 'ISO 27001' }
              ].map((framework) => (
                <div key={framework.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={framework.id}
                    checked={settings.regulatoryFrameworks.includes(framework.id)}
                    onCheckedChange={(checked) => handleFrameworkChange(framework.id, checked as boolean)}
                  />
                  <Label htmlFor={framework.id} className="text-sm font-normal">
                    {framework.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Data Retention Policy */}
          <div className="space-y-2">
            <Label>Default Data Retention Period</Label>
            <div className="flex space-x-3">
              <Input
                type="number"
                className="w-20"
                value={settings.dataRetentionPeriod}
                onChange={(e) => onUpdate({ dataRetentionPeriod: parseInt(e.target.value) || 0 })}
              />
              <Select 
                value={settings.dataRetentionUnit} 
                onValueChange={(value: 'days' | 'months' | 'years') => onUpdate({ dataRetentionUnit: value })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="years">Years</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">Default retention period for compliance data and audit logs</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}