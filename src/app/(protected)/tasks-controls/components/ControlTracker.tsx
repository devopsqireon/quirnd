// src/app/tasks-controls/components/ControlTracker.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Plus, 
  Upload, 
  Calendar, 
  Shield, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Info,
  Paperclip,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

import FilterPanel from './FilterPanel';
import { Control, ControlFilters, ControlTrackerProps } from '../types';
import { mockControls } from '../mock-data';
import { STATUS_VARIANTS, CONTROL_CATEGORIES } from '../constants';

export default function ControlTracker({ globalSearch, showFilters }: ControlTrackerProps) {
  const [controls, setControls] = useState<Control[]>(mockControls);
  const [filters, setFilters] = useState<ControlFilters>({
    status: '',
    owner: '',
    category: '',
    dueDateRange: ''
  });

  // Get unique owners for filter dropdown
  const uniqueOwners = useMemo(() => {
    return Array.from(new Set(controls.map(control => control.owner)));
  }, [controls]);

  // Filter controls based on search and filters
  const filteredControls = useMemo(() => {
    return controls.filter(control => {
      const matchesSearch = globalSearch === '' || 
        control.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
        control.annexARef.toLowerCase().includes(globalSearch.toLowerCase()) ||
        control.owner.toLowerCase().includes(globalSearch.toLowerCase()) ||
        control.category.toLowerCase().includes(globalSearch.toLowerCase());

      const matchesStatus = !filters.status || control.status === filters.status;
      const matchesOwner = !filters.owner || control.owner === filters.owner;
      const matchesCategory = !filters.category || control.category === filters.category;

      return matchesSearch && matchesStatus && matchesOwner && matchesCategory;
    });
  }, [controls, globalSearch, filters]);

  // Calculate implementation progress
  const implementationStats = useMemo(() => {
    const total = controls.length;
    const implemented = controls.filter(c => c.status === 'Implemented').length;
    const inProgress = controls.filter(c => c.status === 'In Progress').length;
    const planned = controls.filter(c => c.status === 'Planned').length;
    const notApplicable = controls.filter(c => c.status === 'Not Applicable').length;
    
    const implementedPercentage = total > 0 ? Math.round((implemented / total) * 100) : 0;
    
    return {
      total,
      implemented,
      inProgress,
      planned,
      notApplicable,
      implementedPercentage
    };
  }, [controls]);

  const getStatusBadge = (status: string) => {
    const variant = STATUS_VARIANTS[status as keyof typeof STATUS_VARIANTS] || 'secondary';
    return <Badge variant={variant}>{status}</Badge>;
  };

  const handleAddTask = (controlId: string) => {
    toast.success('Add Task', {
      description: 'Task creation modal would open here.'
    });
  };

  const handleUploadEvidence = (controlId: string) => {
    toast.success('Upload Evidence', {
      description: 'Evidence upload modal would open here.'
    });
  };

  const handleExportReport = () => {
    toast.success('Exporting report...', {
      description: 'Your control tracker report is being generated.'
    });
  };

  // Empty state
  if (filteredControls.length === 0 && controls.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-12 text-center">
        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No controls configured</h3>
        <p className="text-muted-foreground mb-6">
          Start tracking controls to monitor your ISO 27001 compliance status.
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Configure Controls
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Implemented</p>
              <p className="text-2xl font-bold text-foreground">{implementationStats.implemented}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-foreground">{implementationStats.inProgress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Planned</p>
              <p className="text-2xl font-bold text-foreground">{implementationStats.planned}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Implementation Progress</p>
              <p className="text-2xl font-bold text-foreground">{implementationStats.implementedPercentage}%</p>
            </div>
            <div className="w-16">
              <Progress value={implementationStats.implementedPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-card rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {filteredControls.length} of {controls.length} controls
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          uniqueOwners={uniqueOwners}
          type="control"
        />
      )}

      {/* Controls Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Control ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Linked Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Next Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Evidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredControls.map((control) => (
                <tr key={control.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-foreground">{control.annexARef}</span>
                            <Info className="h-4 w-4 text-muted-foreground ml-1" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md">
                          <p className="text-sm">{control.clauseText}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{control.title}</div>
                      <div className="text-sm text-muted-foreground">{control.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {control.linkedRisks.length > 0 && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Shield className="h-3 w-3 mr-1" />
                          {control.linkedRisks.length} Risk{control.linkedRisks.length > 1 ? 's' : ''}
                        </div>
                      )}
                      {control.linkedPolicies.length > 0 && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileText className="h-3 w-3 mr-1" />
                          {control.linkedPolicies.length} Polic{control.linkedPolicies.length > 1 ? 'ies' : 'y'}
                        </div>
                      )}
                      {control.linkedTasks.length > 0 && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {control.linkedTasks.length} Task{control.linkedTasks.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{control.owner}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(control.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-foreground">{control.nextReviewDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {control.evidence.length > 0 ? (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Paperclip className="h-4 w-4 mr-1" />
                          {control.evidence.length}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No evidence</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleAddTask(control.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleUploadEvidence(control.id)}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}