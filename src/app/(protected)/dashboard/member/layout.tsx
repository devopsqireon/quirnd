// src/app/(protected)/dashboard/member/layout.tsx
import React from 'react';

interface MemberLayoutProps {
  children: React.ReactNode;
}

export default function MemberLayout({ children }: MemberLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Improvement Readiness System
              </h1>
              <span className="text-sm text-gray-500">Member Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome back, <span className="font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}