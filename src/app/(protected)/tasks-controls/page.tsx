// src/app/tasks-controls/page.tsx
'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download } from 'lucide-react';
import TaskCenter from './components/TaskCenter';
import ControlTracker from './components/ControlTracker';

export default function TasksControlsPage() {
  const [activeTab, setActiveTab] = useState('task-center');
  const [globalSearch, setGlobalSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleExport = () => {
    // Export functionality
    console.log('Exporting data...');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Tasks & Controls
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Manage compliance tasks and track control implementation status
                </p>
              </div>
              
              {/* Global Actions */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tasks and controls..."
                    value={globalSearch}
                    onChange={(e) => setGlobalSearch(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="task-center" className="text-sm font-medium">
              Task Center
            </TabsTrigger>
            <TabsTrigger value="control-tracker" className="text-sm font-medium">
              Control Tracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="task-center" className="space-y-6">
            <TaskCenter 
              globalSearch={globalSearch}
              showFilters={showFilters}
            />
          </TabsContent>

          <TabsContent value="control-tracker" className="space-y-6">
            <ControlTracker 
              globalSearch={globalSearch}
              showFilters={showFilters}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}