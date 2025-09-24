// src/components/improvement-readiness/ImprovementReadinessLayout.tsx
import React from 'react';
import { Download, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImprovementReadinessLayoutProps {
  children: React.ReactNode;
  onQuickAdd?: () => void;
  onExportReport?: () => void;
}

export function ImprovementReadinessLayout({ 
  children, 
  onQuickAdd,
  onExportReport 
}: ImprovementReadinessLayoutProps) {
  const handleQuickAdd = () => {
    if (onQuickAdd) {
      onQuickAdd();
    } else {
      // Default behavior - you could open a modal or navigate
      console.log('Quick Add clicked - implement modal or navigation');
    }
  };

  const handleExportReport = () => {
    if (onExportReport) {
      onExportReport();
    } else {
      // Default behavior - you could trigger a download
      console.log('Export Report clicked - implement download functionality');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <button 
              className="hover:text-gray-700 transition-colors cursor-pointer focus:outline-none focus:text-gray-700"
              onClick={() => {
                // Navigate to dashboard - implement your navigation logic
                console.log('Navigate to Dashboard');
              }}
            >
              Dashboard
            </button>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-gray-900 font-medium" aria-current="page">
              Improvement & Readiness
            </span>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="bg-white px-6 py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Improvement & Readiness
              </h1>
              <p className="text-gray-600 mt-2 max-w-3xl">
                Manage corrective actions, track improvements, schedule reviews, and monitor certification progress
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportReport}
                className="whitespace-nowrap"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button 
                size="sm"
                onClick={handleQuickAdd}
                className="whitespace-nowrap"
              >
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Optional Footer - uncomment if needed */}
      {/*
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Last updated: {new Date().toLocaleDateString()}
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-gray-700 transition-colors">
                Help & Support
              </button>
              <button className="hover:text-gray-700 transition-colors">
                System Status
              </button>
            </div>
          </div>
        </div>
      </footer>
      */}
    </div>
  );
}