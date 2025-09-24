// src/components/dashboard/member/IncidentReporting.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Bug, Mail, Key, AlertCircle, Shield, CheckCircle } from 'lucide-react';

interface IncidentReportingProps {
  onOpenReportModal: () => void;
}

const quickReportButtons = [
  { icon: Bug, label: 'Security Bug', color: 'text-red-600' },
  { icon: Mail, label: 'Phishing Email', color: 'text-red-600' },
  { icon: Key, label: 'Password Issue', color: 'text-red-600' },
  { icon: AlertCircle, label: 'Other', color: 'text-red-600' }
];

const reportedIncidents = [
  {
    id: 1,
    title: 'Suspicious Email Received',
    reportedOn: 'December 12, 2024',
    description: 'Received suspicious email claiming to be from IT department requesting password reset.',
    status: 'Under Review',
    icon: Mail,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    statusColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: 2,
    title: 'USB Device Found',
    reportedOn: 'December 8, 2024',
    description: 'Found unidentified USB device in conference room. Device was secured and investigated.',
    status: 'Resolved',
    icon: Shield,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    statusColor: 'bg-green-100 text-green-800'
  }
];

export default function IncidentReporting({ onOpenReportModal }: IncidentReportingProps) {
  return (
    <section id="incident-reporting-section" className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">Incident Reporting</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Report security events and view your submitted incidents</p>
            </div>
            <Button onClick={onOpenReportModal} className="bg-red-600 hover:bg-red-700">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report Incident
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Quick Report Card */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Shield className="text-red-600 h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Quick Incident Report</h3>
                <p className="text-sm text-gray-600">Report any security event or issue directly to the compliance team</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickReportButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="p-4 bg-white border-gray-200 hover:bg-gray-50 flex flex-col items-center h-auto"
                  onClick={onOpenReportModal}
                >
                  <button.icon className={`${button.color} h-5 w-5 mb-2`} />
                  <span className="text-sm font-medium">{button.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* My Reported Incidents */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">My Reported Incidents</h3>
              <Button variant="link" className="text-blue-600 hover:text-blue-700">View All</Button>
            </div>
            
            <div className="space-y-4">
              {reportedIncidents.map((incident) => (
                <Card key={incident.id} className="border border-gray-200 hover:bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`p-2 ${incident.iconBg} rounded-lg`}>
                          <incident.icon className={`${incident.iconColor} h-4 w-4`} />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">{incident.title}</h4>
                          <p className="text-sm text-gray-500">Reported on {incident.reportedOn}</p>
                        </div>
                      </div>
                      <Badge className={incident.statusColor}>{incident.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-11">{incident.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}