// src/components/report-incident/form-actions.tsx
"use client";

import { Button } from '@/components/ui/button';
import { Save, Send } from 'lucide-react';

interface FormActionsProps {
  onSaveDraft: () => void;
}

export function FormActions({ onSaveDraft }: FormActionsProps) {
  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Save className="h-4 w-4" />
          <span>Draft auto-saved 2 minutes ago</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          
          <Button type="button" variant="outline" onClick={onSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            <Send className="mr-2 h-4 w-4" />
            Submit Incident Report
          </Button>
        </div>
      </div>
    </section>
  );
}