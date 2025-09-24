// src/components/improvement-readiness/tabs/CertificationDashboardTab.tsx
import React, { useState } from 'react';
import { RefreshCw, Download, Shield, CheckCircle, AlertTriangle, FileText, Activity, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CertificationData {
  riskCoverage: number;
  controlImplementation: number;
  overdueTasks: number;
  criticalTasks: number;
  highTasks: number;
  evidenceGaps: number;
  documentGaps: number;
  testGaps: number;
  topRisks: Array<{
    name: string;
    description: string;
    severity: 'Critical' | 'High' | 'Medium';
    openActions: number;
  }>;
  recentActivities: Array<{
    type: 'completed' | 'uploaded' | 'overdue' | 'scheduled';
    description: string;
    user?: string;
    time: string;
  }>;
}

interface CertificationDashboardTabProps {
  data: CertificationData;
}

export function CertificationDashboardTab({ data }: CertificationDashboardTabProps) {
  const [scope, setScope] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'uploaded':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'scheduled':
        return <Users className="w-4 h-4 text-purple-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'completed':
        return 'bg-green-100';
      case 'uploaded':
        return 'bg-blue-100';
      case 'overdue':
        return 'bg-yellow-100';
      case 'scheduled':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getRiskSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500';
      case 'High':
        return 'bg-orange-500';
      case 'Medium':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRiskSeverityBg = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-50';
      case 'High':
        return 'bg-orange-50';
      case 'Medium':
        return 'bg-yellow-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getRiskSeverityText = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-600';
      case 'High':
        return 'text-orange-600';
      case 'Medium':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="tab-content">
      {/* Dashboard Controls */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Scope:</label>
            <Select value={scope} onValueChange={setScope}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="it">IT Security</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Time Range:</label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Risk Coverage</h3>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{data.riskCoverage}%</div>
              <Progress value={data.riskCoverage} className="mb-3 h-2" />
              <p className="text-sm text-gray-600">
                <span className="text-green-600 font-medium">+5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Control Implementation</h3>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{data.controlImplementation}%</div>
              <Progress value={data.controlImplementation} className="mb-3 h-2" />
              <p className="text-sm text-gray-600">
                <span className="text-green-600 font-medium">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Overdue Tasks</h3>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">{data.overdueTasks}</div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-gray-600">Critical: {data.criticalTasks}</span>
                <span className="text-sm text-gray-600">High: {data.highTasks}</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="text-red-600 font-medium">+2</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Evidence Gaps</h3>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">{data.evidenceGaps}</div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm text-gray-600">Documents: {data.documentGaps}</span>
                <span className="text-sm text-gray-600">Tests: {data.testGaps}</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="text-green-600 font-medium">-3</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Risks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Top Risks Requiring Attention</span>
                <Button variant="ghost" size="sm">
                  <Target className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topRisks.map((risk, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${getRiskSeverityBg(risk.severity)} rounded-lg`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 ${getRiskSeverityColor(risk.severity)} rounded-full mr-3`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{risk.name}</div>
                        <div className="text-sm text-gray-600">{risk.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getRiskSeverityText(risk.severity)}`}>{risk.severity}</div>
                      <div className="text-xs text-gray-500">{risk.openActions} open actions</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 ${getActivityBgColor(activity.type)} rounded-full flex items-center justify-center`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{activity.description}</div>
                      <div className="text-xs text-gray-500">
                        {activity.time} {activity.user && `by ${activity.user}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}