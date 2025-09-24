// /app/awareness-training/page.tsx
'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, ClipboardList, BarChart3 } from 'lucide-react';
import { 
  TrainingLibraryTab, 
  AssignmentsTab, 
  CompletionLogsTab, 
  ReportsTab 
} from './components/tabs';
import { useToast } from './utils/hooks';
import { Toast } from './components/shared';

export default function AwarenessTrainingPage() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Awareness & Training</h1>
            <p className="text-gray-600">
              Manage security awareness training programs, track assignments, and monitor compliance progress
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-gray-500">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-gray-500">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">85%</div>
              <div className="text-gray-500">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="library" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Training Library</span>
            <span className="sm:hidden">Library</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Assignments</span>
            <span className="sm:hidden">Assigned</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Completion Logs</span>
            <span className="sm:hidden">Logs</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
            <span className="sm:hidden">Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          <TrainingLibraryTab />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <AssignmentsTab />
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <CompletionLogsTab />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportsTab />
        </TabsContent>
      </Tabs>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </div>
  );
}