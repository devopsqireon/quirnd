// src/app/(protected)/settings/components/organization/OrganizationInfoSection.tsx

'use client';

import { Check, Shield, Globe } from 'lucide-react';
import { Organization } from '@/lib/types/organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrganizationInfoSectionProps {
  organization: Organization | null;
  onUpdate: (updates: Partial<Organization>) => void;
}

export function OrganizationInfoSection({ organization, onUpdate }: OrganizationInfoSectionProps) {
  if (!organization) return null;

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Organization Information</CardTitle>
          <CardDescription>Basic details about your organization</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Organization Name */}
          <div className="space-y-2">
            <Label htmlFor="org-name">
              Organization Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="org-name"
                placeholder="Enter organization name"
                value={organization.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">This name will appear on reports and in correspondence</p>
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contact-email">
              Contact Email <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="contact-email"
                type="email"
                placeholder="contact@example.com"
                value={organization.contactEmail}
                onChange={(e) => onUpdate({ contactEmail: e.target.value })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <p className="text-xs text-green-600 flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Email verified and secure
            </p>
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Contact Phone</Label>
            <div className="flex space-x-2">
              <Select defaultValue="+1">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+1">+1</SelectItem>
                  <SelectItem value="+44">+44</SelectItem>
                  <SelectItem value="+49">+49</SelectItem>
                  <SelectItem value="+33">+33</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="contact-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={organization.contactPhone || ''}
                onChange={(e) => onUpdate({ contactPhone: e.target.value })}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">Optional - Used for urgent compliance notifications</p>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your business address"
              rows={3}
              value={organization.address || ''}
              onChange={(e) => onUpdate({ address: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">This address may be required for certain compliance reports</p>
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <div className="relative">
              <Select 
                value={organization.timezone} 
                onValueChange={(value) => onUpdate({ timezone: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                  <SelectItem value="Europe/Berlin">Central European Time (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                  <SelectItem value="Australia/Sydney">Australian Eastern Time (AET)</SelectItem>
                </SelectContent>
              </Select>
              <div className="absolute inset-y-0 right-8 pr-3 flex items-center pointer-events-none">
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Used for scheduling reports and compliance deadlines</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}