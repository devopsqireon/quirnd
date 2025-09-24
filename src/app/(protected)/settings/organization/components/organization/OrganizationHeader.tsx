// src/app/(protected)/settings/components/organization/OrganizationHeader.tsx

'use client';

import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function OrganizationHeader() {
  return (
    <section className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Organization Profile</h1>
              <p className="text-muted-foreground mt-2">
                Manage your organization's basic information, contact details, and branding.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Auto-saved 2 minutes ago</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}