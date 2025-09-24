// src/components/report-incident/page-header.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Clock, Lock, Smartphone } from 'lucide-react';

export function PageHeader() {
  return (
    <section className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600 h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Report an Incident</h1>
              <p className="text-gray-600 text-lg">
                Quickly report a suspected security incident. Your submission will be logged in the Incident Register.
              </p>
              <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Auto-saves every 30 seconds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Secure & confidential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile friendly</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}