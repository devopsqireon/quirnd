// src/app/(protected)/settings/help-support/components/HelpSupportHeader.tsx
import React from 'react';
import { Headphones, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HelpSupportHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Headphones className="text-white h-4 w-4" />
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-900">Support Center</h1>
              <p className="text-sm text-gray-500">Get help and track your tickets</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">3 agents online</span>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}