// src/app/(protected)/settings/components/organization/SettingsSidebar.tsx

'use client';

import { Building, Users, Shield, CreditCard, Settings, Bell, FileText, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SettingsSidebar() {
  const menuItems = [
    { icon: Building, label: 'Profile', active: true },
    { icon: Users, label: 'Members', active: false },
    { icon: Shield, label: 'Security', active: false },
    { icon: CreditCard, label: 'Billing', active: false },
    { icon: Settings, label: 'Integrations', active: false },
    { icon: Bell, label: 'Notifications', active: false },
    { icon: FileText, label: 'Compliance', active: false },
    { icon: Database, label: 'Data Export', active: false },
  ];

  return (
    <aside className="lg:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Organization Settings</CardTitle>
          <CardDescription>Manage your organization configuration</CardDescription>
        </CardHeader>
        
        <CardContent className="p-2">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant={item.active ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
        
        <div className="p-4 bg-muted border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Acme Corp</p>
              <p className="text-xs text-muted-foreground">Enterprise Plan</p>
            </div>
          </div>
        </div>
      </Card>
    </aside>
  );
}