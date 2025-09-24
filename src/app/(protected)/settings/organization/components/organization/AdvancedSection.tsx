// src/app/(protected)/settings/components/organization/AdvancedSection.tsx

'use client';

import { TriangleAlert, Trash2, ArrowRightLeft, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function AdvancedSection() {
  return (
    <section className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TriangleAlert className="h-5 w-5 text-amber-500" />
            <CardTitle>Advanced Settings</CardTitle>
          </div>
          <CardDescription>Dangerous operations that may affect your organization</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Data Purge */}
          <Alert className="border-destructive bg-destructive/10">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Trash2 className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-destructive">Purge Historical Data</h4>
                <AlertDescription className="text-destructive/80 mt-1">
                  Permanently delete audit logs and compliance data older than the retention period. This action cannot be undone.
                </AlertDescription>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="mt-3"
                >
                  Configure Data Purge
                </Button>
              </div>
            </div>
          </Alert>

          {/* Organization Transfer */}
          <Alert className="border-amber-200 bg-amber-50">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <ArrowRightLeft className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-amber-900">Transfer Organization</h4>
                <AlertDescription className="text-amber-700 mt-1">
                  Transfer ownership of this organization to another user. You will lose administrative access.
                </AlertDescription>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-3 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                >
                  Transfer Ownership
                </Button>
              </div>
            </div>
          </Alert>

          {/* Delete Organization */}
          <Alert className="border-destructive bg-destructive/10">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <X className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-destructive">Delete Organization</h4>
                <AlertDescription className="text-destructive/80 mt-1">
                  Permanently delete this organization and all associated data. This action cannot be undone and may affect compliance records.
                </AlertDescription>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="mt-3"
                >
                  Delete Organization
                </Button>
              </div>
            </div>
          </Alert>
        </CardContent>
      </Card>
    </section>
  );
}