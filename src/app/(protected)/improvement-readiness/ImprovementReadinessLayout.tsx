// src/components/improvement-readiness/ImprovementReadinessLayout.tsx
import React from 'react';
import { Download, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImprovementReadinessLayoutProps {
  children: React.ReactNode;
}

export function ImprovementReadinessLayout({ children }: ImprovementReadinessLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="hover:text-gray-700 cursor-pointer">Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Improvement & Readiness</span>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="bg-white px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Improvement & Readiness</h1>
              <p className="text-gray-600 mt-2">
                Manage corrective actions, track improvements, schedule reviews, and monitor certification progress
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}