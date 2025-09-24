// src/app/(protected)/settings/components/organization/ActionButtons.tsx

'use client';

import { Save, RotateCcw, TriangleAlert } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ActionButtonsProps {
  saving: boolean;
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onReset: () => void;
}

export function ActionButtons({ saving, hasUnsavedChanges, onSave, onReset }: ActionButtonsProps) {
  return (
    <section className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={onSave}
                disabled={saving || !hasUnsavedChanges}
                className="relative"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={onReset}
                disabled={saving || !hasUnsavedChanges}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Last Saved
              </Button>
            </div>
            <Button variant="ghost" className="text-muted-foreground">
              Cancel
            </Button>
          </div>
          
          {/* Unsaved Changes Indicator */}
          {hasUnsavedChanges && (
            <Alert className="mt-4 border-amber-200 bg-amber-50">
              <TriangleAlert className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-amber-700">
                You have unsaved changes
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </section>
  );
}