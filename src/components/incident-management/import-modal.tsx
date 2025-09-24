// src/components/incident-management/import-modal.tsx
"use client";

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CloudUpload, X } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportModal({ isOpen, onClose }: ImportModalProps) {
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [sendNotifications, setSendNotifications] = useState(false);

  const handleImport = () => {
    // Handle import logic here
    console.log('Import settings:', { skipDuplicates, sendNotifications });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Import Incidents from Excel</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <CloudUpload className="text-gray-400 h-12 w-12 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">Drag and drop your Excel file here, or</p>
            <Button variant="outline" size="sm">
              browse files
            </Button>
            <p className="text-xs text-gray-500 mt-2">Supports .xlsx, .xls, and .csv files up to 10MB</p>
          </div>
          
          <div className="mt-4">
            <Label className="text-sm font-medium text-gray-700 mb-2">Import Options</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="skip-duplicates"
                  checked={skipDuplicates}
                  onCheckedChange={setSkipDuplicates}
                />
                <Label htmlFor="skip-duplicates" className="text-sm text-gray-600">
                  Skip duplicate incidents
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="send-notifications"
                  checked={sendNotifications}
                  onCheckedChange={setSendNotifications}
                />
                <Label htmlFor="send-notifications" className="text-sm text-gray-600">
                  Send notifications to assignees
                </Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleImport}>
            Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}