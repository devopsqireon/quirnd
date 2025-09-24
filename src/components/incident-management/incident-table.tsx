// src/components/incident-management/incident-table.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowUpDown, 
  MoreHorizontal, 
  AlertCircle,
  Clock,
  CheckCircle,
  Search,
  Settings,
  FileText,
  Shield
} from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'investigating' | 'resolved' | 'closed';
  owner: {
    name: string;
    avatar: string;
  };
  source: 'siem' | 'form' | 'edr' | 'email' | 'import';
  dateReported: string;
  lastUpdated: string;
}

interface IncidentTableProps {
  searchQuery: string;
  onIncidentSelect: (incidentId: string) => void;
}

const mockIncidents: Incident[] = [
  {
    id: 'INC-2024-001',
    title: 'Unauthorized access attempt detected',
    description: 'Multiple failed login attempts from suspicious IP addresses targeting admin accounts',
    severity: 'critical',
    status: 'in-progress',
    owner: {
      name: 'John Doe',
      avatar: '/avatars/john-doe.jpg'
    },
    source: 'siem',
    dateReported: 'Dec 15, 2024',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'INC-2024-002',
    title: 'Data exfiltration via email',
    description: 'Suspicious email activity with large attachments sent to external addresses',
    severity: 'high',
    status: 'investigating',
    owner: {
      name: 'Jane Smith',
      avatar: '/avatars/jane-smith.jpg'
    },
    source: 'form',
    dateReported: 'Dec 14, 2024',
    lastUpdated: '5 hours ago'
  },
  {
    id: 'INC-2024-003',
    title: 'Malware detected on workstation',
    description: 'Endpoint protection detected suspicious executable attempting to modify system files',
    severity: 'medium',
    status: 'resolved',
    owner: {
      name: 'Mike Johnson',
      avatar: '/avatars/mike-johnson.jpg'
    },
    source: 'edr',
    dateReported: 'Dec 13, 2024',
    lastUpdated: '1 day ago'
  }
];

function getSeverityBadge(severity: string) {
  const variants = {
    critical: { variant: 'destructive' as const, icon: AlertCircle },
    high: { variant: 'default' as const, icon: AlertCircle },
    medium: { variant: 'secondary' as const, icon: AlertCircle },
    low: { variant: 'outline' as const, icon: AlertCircle }
  };
  
  const config = variants[severity as keyof typeof variants];
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="capitalize">
      <Icon className="mr-1 h-3 w-3" />
      {severity}
    </Badge>
  );
}

function getStatusBadge(status: string) {
  const variants = {
    open: { variant: 'destructive' as const, icon: AlertCircle },
    'in-progress': { variant: 'default' as const, icon: Clock },
    investigating: { variant: 'default' as const, icon: Search },
    resolved: { variant: 'secondary' as const, icon: CheckCircle },
    closed: { variant: 'outline' as const, icon: CheckCircle }
  };
  
  const config = variants[status as keyof typeof variants];
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="capitalize">
      <Icon className="mr-1 h-3 w-3" />
      {status.replace('-', ' ')}
    </Badge>
  );
}

function getSourceBadge(source: string) {
  const variants = {
    siem: { variant: 'default' as const, icon: Settings },
    form: { variant: 'secondary' as const, icon: FileText },
    edr: { variant: 'default' as const, icon: Shield },
    email: { variant: 'outline' as const, icon: FileText },
    import: { variant: 'outline' as const, icon: FileText }
  };
  
  const config = variants[source as keyof typeof variants];
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className="capitalize">
      <Icon className="mr-1 h-3 w-3" />
      {source}
    </Badge>
  );
}

export function IncidentTable({ searchQuery, onIncidentSelect }: IncidentTableProps) {
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const filteredIncidents = mockIncidents.filter(incident =>
    incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedIncidents(filteredIncidents.map(incident => incident.id));
    } else {
      setSelectedIncidents([]);
    }
  };

  const handleSelectIncident = (incidentId: string, checked: boolean) => {
    if (checked) {
      setSelectedIncidents([...selectedIncidents, incidentId]);
    } else {
      setSelectedIncidents(selectedIncidents.filter(id => id !== incidentId));
      setSelectAll(false);
    }
  };

  return (
    <Card>
      <CardHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Incident Register</h3>
            <p className="text-gray-600 text-sm mt-1">{filteredIncidents.length} incidents found</p>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm text-gray-600">Select all</span>
            <div className="border-l border-gray-300 h-5 mx-3"></div>
            <Button variant="ghost" size="sm">Bulk Actions</Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left w-8">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    Incident ID
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title & Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    Severity
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    Status
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                    Date Reported
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIncidents.map((incident) => (
                <tr 
                  key={incident.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onIncidentSelect(incident.id)}
                >
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedIncidents.includes(incident.id)}
                      onCheckedChange={(checked) => handleSelectIncident(incident.id, checked as boolean)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600">{incident.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                    <div className="text-sm text-gray-500">{incident.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSeverityBadge(incident.severity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(incident.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={incident.owner.avatar} />
                        <AvatarFallback>{incident.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm font-medium text-gray-900">{incident.owner.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSourceBadge(incident.source)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {incident.dateReported}<br />
                    <span className="text-xs text-gray-400">09:23 AM</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {incident.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {filteredIncidents.length} of 47 results
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="px-2 text-gray-500">...</span>
              <Button variant="outline" size="sm">16</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}