// src/components/incident-management/incident-analytics.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SourceData {
  name: string;
  count: number;
  color: string;
}

interface TeamMember {
  name: string;
  avatar: string;
  incidents: number;
  avgTime: string;
  performance: 'good' | 'average' | 'needs-improvement';
}

interface ComplianceMetric {
  name: string;
  percentage: number;
  color: string;
}

const sourceData: SourceData[] = [
  { name: 'SIEM Integration', count: 18, color: 'bg-purple-500' },
  { name: 'Manual Form', count: 12, color: 'bg-green-500' },
  { name: 'Email Ingestion', count: 8, color: 'bg-blue-500' },
  { name: 'Excel Import', count: 5, color: 'bg-orange-500' },
  { name: 'ServiceNow', count: 4, color: 'bg-red-500' },
];

const teamMembers: TeamMember[] = [
  {
    name: 'John Doe',
    avatar: '/avatars/john-doe.jpg',
    incidents: 8,
    avgTime: '14.2h',
    performance: 'good'
  },
  {
    name: 'Jane Smith',
    avatar: '/avatars/jane-smith.jpg',
    incidents: 6,
    avgTime: '16.8h',
    performance: 'good'
  },
  {
    name: 'Mike Johnson',
    avatar: '/avatars/mike-johnson.jpg',
    incidents: 5,
    avgTime: '22.1h',
    performance: 'needs-improvement'
  }
];

const complianceMetrics: ComplianceMetric[] = [
  { name: 'SLA Compliance', percentage: 94, color: 'bg-green-500' },
  { name: 'Documentation Rate', percentage: 88, color: 'bg-blue-500' },
  { name: 'First Response Time', percentage: 76, color: 'bg-orange-500' },
];

export function IncidentAnalytics() {
  return (
    <section className="px-8 py-8 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Incident Analytics</h2>
        <p className="text-gray-600">Comprehensive insights and trends for incident management performance.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Severity Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Incidents by Severity (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="text-gray-500 mb-2">Pie Chart Visualization</div>
                <div className="text-sm text-gray-400">
                  Critical: 8 • High: 12 • Medium: 18 • Low: 9
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Resolution Time Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Time Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="text-gray-500 mb-2">Line Chart Visualization</div>
                <div className="text-sm text-gray-400">
                  Week 1: 24.5h • Week 2: 21.2h • Week 3: 19.8h • Week 4: 18.5h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Incident Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Top Incident Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceData.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 ${source.color} rounded-full mr-3`}></div>
                    <span className="text-sm text-gray-700">{source.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{source.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-3">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700">{member.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{member.incidents} incidents</div>
                    <div className={`text-xs ${
                      member.performance === 'good' ? 'text-green-600' : 
                      member.performance === 'average' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      Avg: {member.avgTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{metric.name}</span>
                    <span className={`font-medium ${
                      metric.percentage >= 90 ? 'text-green-600' : 
                      metric.percentage >= 80 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {metric.percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={metric.percentage} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}