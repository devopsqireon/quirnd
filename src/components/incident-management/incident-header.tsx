// src/components/incident-management/incident-header.tsx
"use client";

import { Bell, HelpCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function IncidentHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-lg">
            <AlertTriangle className="text-orange-600 h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Incident Management</h1>
            <p className="text-gray-600 mt-1">
              Report, track, and resolve information security incidents in compliance with ISO 27001 Clause 16.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/user.jpg" />
            <AvatarFallback className="bg-blue-600 text-white text-sm">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}