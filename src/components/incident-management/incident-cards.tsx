// src/components/incident-management/incident-cards.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
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

interface IncidentCardsProps {
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

export function IncidentCards({ searchQuery, onIncidentSelect }: IncidentCardsProps) {
  const filteredIncidents = mockIncidents.filter(incident =>
    incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    incident.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredIncidents.map((incident) => (
        <Card 
          key={incident.id}
          className="hover:shadow-md transition-all cursor-pointer"
          onClick={() => onIncidentSelect(incident.id)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-blue-600">{incident.id}</span>
              <div className="flex items-center space-x-2">
                {getSeverityBadge(incident.severity)}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">{incident.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{incident.description}</p>
            
            <div className="flex items-center justify-between text-sm mb-3">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={incident.owner.avatar} />
                  <AvatarFallback>{incident.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-gray-700">{incident.owner.name}</span>
              </div>
              <span className="text-gray-500">{incident.dateReported}</span>
            </div>
            
            <div className="flex items-center justify-between">
              {getStatusBadge(incident.status)}
              {getSourceBadge(incident.source)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}