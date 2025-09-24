// src/app/(protected)/settings/components/organization/NotificationSection.tsx

'use client';

import { NotificationSettings } from '@/lib/types/organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MessageSquare } from 'lucide-react';

interface NotificationSectionProps {
  settings: NotificationSettings | null;
  onUpdate: (updates: Partial<NotificationSettings>) => void;
}

export function NotificationSection({ settings, onUpdate }: NotificationSectionProps) {
  if (!settings) return null;

  const updateEmailSetting = (key: keyof NotificationSettings['email'], value: boolean) => {
    onUpdate({
      email: {
        ...settings.email,
        [key]: value
      }
    });
  };

  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how your organization receives important updates</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div>
            <h4 className="text-sm font-medium mb-4">Email Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-normal">Compliance alerts</Label>
                  <p className="text-xs text-muted-foreground">Critical compliance issues and deadlines</p>
                </div>
                <Switch 
                  checked={settings.email.complianceAlerts}
                  onCheckedChange={(checked) => updateEmailSetting('complianceAlerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-normal">Audit reports</Label>
                  <p className="text-xs text-muted-foreground">Weekly audit summaries and findings</p>
                </div>
                <Switch 
                  checked={settings.email.auditReports}
                  onCheckedChange={(checked) => updateEmailSetting('auditReports', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-normal">System maintenance</Label>
                  <p className="text-xs text-muted-foreground">Scheduled maintenance and updates</p>
                </div>
                <Switch 
                  checked={settings.email.systemMaintenance}
                  onCheckedChange={(checked) => updateEmailSetting('systemMaintenance', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-normal">Feature updates</Label>
                  <p className="text-xs text-muted-foreground">New features and product announcements</p>
                </div>
                <Switch 
                  checked={settings.email.featureUpdates}
                  onCheckedChange={(checked) => updateEmailSetting('featureUpdates', checked)}
                />
              </div>
            </div>
          </div>

          {/* Slack Integration */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Slack Integration</h4>
                  <p className="text-xs text-muted-foreground">Send notifications to Slack channels</p>
                </div>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Connect Slack
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Connect your Slack workspace to receive compliance alerts and audit notifications directly in your channels.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}