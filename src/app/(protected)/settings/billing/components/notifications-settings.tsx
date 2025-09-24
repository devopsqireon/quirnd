// src/app/(protected)/settings/billing/components/notifications-settings.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { NotificationSettings } from "../types/billing";

interface NotificationSettingsProps {
  settings: NotificationSettings;
  notificationEmail: string;
  onUpdateSettings: (settings: NotificationSettings) => void;
  onChangeEmail: () => void;
}

export function NotificationSettingsComponent({ 
  settings, 
  notificationEmail, 
  onUpdateSettings, 
  onChangeEmail 
}: NotificationSettingsProps) {
  const handleToggle = (key: keyof NotificationSettings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const notificationOptions = [
    {
      key: 'billingReminders' as keyof NotificationSettings,
      title: 'Billing Reminders',
      description: 'Get notified 7 days before your next billing cycle'
    },
    {
      key: 'paymentFailureAlerts' as keyof NotificationSettings,
      title: 'Payment Failure Alerts',
      description: 'Immediate notifications for failed payments'
    },
    {
      key: 'usageLimitWarnings' as keyof NotificationSettings,
      title: 'Usage Limit Warnings',
      description: 'Alerts when approaching plan limits (80% and 95%)'
    },
    {
      key: 'planChangeConfirmations' as keyof NotificationSettings,
      title: 'Plan Change Confirmations',
      description: 'Email confirmations for subscription changes'
    },
    {
      key: 'invoiceReceipts' as keyof NotificationSettings,
      title: 'Invoice Receipts',
      description: 'Automatic email delivery of invoices and receipts'
    },
    {
      key: 'renewalNotifications' as keyof NotificationSettings,
      title: 'Renewal Notifications',
      description: 'Annual subscription renewal reminders (30 days in advance)'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Notifications & Reminders</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {notificationOptions.map((option) => (
            <div key={option.key} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-slate-900">{option.title}</div>
                <div className="text-sm text-slate-600">{option.description}</div>
              </div>
              <div className="flex items-center">
                <Switch
                  checked={settings[option.key]}
                  onCheckedChange={() => handleToggle(option.key)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Email Configuration */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-slate-700 mb-1">Notification Email</div>
              <div className="text-sm text-slate-600 mb-2">{notificationEmail}</div>
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm"
                onClick={onChangeEmail}
              >
                Change email address
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}