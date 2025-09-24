// src/components/report-incident/wizard-header.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Clock, Lock, Smartphone, Shield } from 'lucide-react';

export function WizardHeader() {
  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="p-8">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-red-600 h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Report a Security Incident
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Help us respond quickly to potential security threats. This guided form will walk you through 
                reporting an incident step-by-step to ensure we have all the information needed for our response.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Auto-Save</div>
                    <div className="text-xs text-gray-600">Every 30 seconds</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <Lock className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Secure</div>
                    <div className="text-xs text-gray-600">End-to-end encrypted</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Mobile Ready</div>
                    <div className="text-xs text-gray-600">Works on any device</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Confidential</div>
                    <div className="text-xs text-gray-600">Optional anonymity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}