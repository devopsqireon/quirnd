// /app/(protected)/audit-monitoring/components/tabs/MonitoringReportsTab.tsx
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  TrendingUp,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

import { mockMonitoringReports, mockDashboardMetrics } from '../../data/mock-data';
import { formatDate } from '../../utils';
import { StatusBadge } from '../shared';

export const MonitoringReportsTab: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const handleGenerateReport = () => {
    toast.success('Report Generation', {
      description: 'New monitoring report generation started'
    });
  };

  const handleExportReport = (reportId: string) => {
    toast.success('Export started', {
      description: 'Exporting report as PDF...'
    });
  };

  const handleViewReport = (reportId: string) => {
    toast.info('Opening Report', {
      description: 'Report details would open here'
    });
  };

  // Dashboard metrics with trends
  const dashboardMetrics = [
    {
      title: 'Risk Score',
      value: mockDashboardMetrics.riskScore.toString(),
      change: -0.3,
      changeLabel: 'from last month',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      target: '< 3.0',
      status: 'warning'
    },
    {
      title: 'Control Effectiveness',
      value: `${mockDashboardMetrics.controlEffectiveness}%`,
      change: 2,
      changeLabel: 'from last month',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      target: '> 90%',
      status: 'good'
    },
    {
      title: 'Training Coverage',
      value: `${mockDashboardMetrics.trainingCoverage}%`,
      change: -5,
      changeLabel: 'from last month',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      target: '> 95%',
      status: 'needs-attention'
    },
    {
      title: 'Compliance Rate',
      value: `${mockDashboardMetrics.complianceRate}%`,
      change: 1,
      changeLabel: 'from last month',
      icon: <Target className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      target: '> 85%',
      status: 'good'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Monitoring Reports</h2>
          <p className="text-slate-600">Real-time dashboards and compliance reporting</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleGenerateReport}>
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <div className={metric.color}>
                        {metric.icon}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center text-xs ${
                        metric.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className={`w-3 h-3 mr-1 ${
                          metric.change < 0 ? 'rotate-180' : ''
                        }`} />
                        {Math.abs(metric.change)}% {metric.changeLabel}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">Target: {metric.target}</p>
                  </div>
                </div>
                <StatusBadge 
                  status={metric.status} 
                  type="status"
                  className="text-xs"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Risk Heatmap Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Risk Heatmap
          </CardTitle>
          <CardDescription>
            Visual representation of risk levels across different areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-600">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Risk Heatmap Chart</p>
              <p className="text-sm">Integration with Chart.js or similar library</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Control Effectiveness Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Control Effectiveness Trend
            </CardTitle>
            <CardDescription>
              Monthly control effectiveness percentage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-600">
                <LineChart className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Line Chart - Control Effectiveness</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Coverage by Department */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Training Coverage by Department
            </CardTitle>
            <CardDescription>
              Security awareness training completion rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-600">
                <PieChart className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Pie Chart - Training Coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Generated monitoring and compliance reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMonitoringReports.map((report) => (
              <div 
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-slate-600" />
                    <h3 className="font-medium text-slate-900">{report.name}</h3>
                    <StatusBadge status={report.status} type="status" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>Generated: {formatDate(report.generatedDate)}</span>
                    <span>Period: {report.period}</span>
                    <span>By: {report.generatedBy}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-slate-500">
                      {report.findings.length} findings
                    </span>
                    <span className="text-sm text-slate-500">
                      {report.recommendations.length} recommendations
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewReport(report.id)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleExportReport(report.id)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overdue Tasks Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-orange-900 mb-1">
                Overdue Tasks Detected
              </h3>
              <p className="text-sm text-orange-700 mb-3">
                There are 12 overdue compliance tasks that require immediate attention.
              </p>
              <Button variant="outline" size="sm" className="border-orange-300">
                Review Overdue Tasks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};