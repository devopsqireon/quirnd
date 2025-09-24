// /app/(protected)/audit-monitoring/page.tsx
"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Shield, 
  Database, 
  BarChart3, 
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

// Import individual tab components
import { AuditLogsTab } from './components/tabs/AuditLogsTab';
import { EvidenceLibraryTab } from './components/tabs/EvidenceLibraryTab';
import { MonitoringReportsTab } from './components/tabs/MonitoringReportsTab';
import { InternalAuditsTab } from './components/tabs/InternalAuditsTab';

import { mockDashboardMetrics } from './data/mock-data';

const AuditMonitoringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('audit-logs');
  const [globalSearch, setGlobalSearch] = useState('');

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      toast.info('Global Search', {
        description: `Searching for "${globalSearch}" across all audit data...`
      });
    }
  };

  const clearGlobalSearch = () => {
    setGlobalSearch('');
  };

  // Overview metrics for dashboard header
  const overviewMetrics = [
    {
      title: 'Risk Score',
      value: mockDashboardMetrics.riskScore.toString(),
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      status: mockDashboardMetrics.riskScore > 3 ? 'warning' : 'good'
    },
    {
      title: 'Control Effectiveness',
      value: `${mockDashboardMetrics.controlEffectiveness}%`,
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      status: 'good'
    },
    {
      title: 'Active Audits',
      value: mockDashboardMetrics.activeAudits.toString(),
      icon: <Activity className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      status: 'info'
    },
    {
      title: 'Compliance Rate',
      value: `${mockDashboardMetrics.complianceRate}%`,
      icon: <Target className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      status: mockDashboardMetrics.complianceRate >= 85 ? 'good' : 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Audit & Monitoring
            </h1>
            <p className="text-slate-600 mt-1">
              Comprehensive audit trail management and compliance monitoring
            </p>
          </div>

          {/* Global Search */}
          <form onSubmit={handleGlobalSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Global search across all audit data..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button type="submit" disabled={!globalSearch.trim()}>
              Search
            </Button>
            {globalSearch && (
              <Button variant="ghost" onClick={clearGlobalSearch}>
                Clear
              </Button>
            )}
          </form>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewMetrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {metric.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${metric.bgColor}`}>
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                  </div>
                </div>
                
                {/* Status Indicator */}
                <div className="mt-3">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    metric.status === 'good' ? 'bg-green-100 text-green-800' :
                    metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    metric.status === 'info' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {metric.status === 'good' ? '✓ On Target' :
                     metric.status === 'warning' ? '⚠ Needs Attention' :
                     metric.status === 'info' ? 'ℹ Active' :
                     'Status'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-slate-200">
                <TabsList className="h-auto p-0 bg-transparent">
                  <TabsTrigger 
                    value="audit-logs" 
                    className="flex items-center gap-2 px-6 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                  >
                    <FileText className="w-4 h-4" />
                    Audit Logs
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="evidence-library" 
                    className="flex items-center gap-2 px-6 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                  >
                    <Database className="w-4 h-4" />
                    Evidence Library
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="monitoring-reports" 
                    className="flex items-center gap-2 px-6 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Monitoring Reports
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="internal-audits" 
                    className="flex items-center gap-2 px-6 py-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                  >
                    <Shield className="w-4 h-4" />
                    Internal Audits
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="audit-logs" className="mt-0">
                  <AuditLogsTab />
                </TabsContent>

                <TabsContent value="evidence-library" className="mt-0">
                  <EvidenceLibraryTab />
                </TabsContent>

                <TabsContent value="monitoring-reports" className="mt-0">
                  <MonitoringReportsTab />
                </TabsContent>

                <TabsContent value="internal-audits" className="mt-0">
                  <InternalAuditsTab />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* ISO 27001 Compliance Notice */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  ISO 27001 Compliance Framework
                </h3>
                <p className="text-blue-700 text-sm mb-3">
                  This module supports ISO 27001:2022 compliance requirements including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span><strong>Clause 7.5:</strong> Documented Information</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span><strong>Clause 9.1:</strong> Monitoring & Measurement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span><strong>Clause 9.2:</strong> Internal Audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span><strong>Clause 9.3:</strong> Management Review</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Footer */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
          <div className="text-sm text-slate-600">
            Last updated: {new Date().toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info('Help', { description: 'Opening help documentation...' })}
            >
              Help & Documentation
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info('Settings', { description: 'Opening audit settings...' })}
            >
              Audit Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditMonitoringPage;