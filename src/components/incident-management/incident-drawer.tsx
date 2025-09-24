// src/components/incident-management/incident-drawer.tsx
"use client";

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  X, 
  User, 
  Edit, 
  Plus, 
  Check,
  AlertCircle,
  Clock,
  Search,
  FileText,
  MessageSquare,
  History,
  Paperclip,
  Calendar,
  Shield,
  Eye,
  Settings
} from 'lucide-react';

interface IncidentDrawerProps {
  incidentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface TimelineEvent {
  id: string;
  type: 'reported' | 'assigned' | 'investigation_started' | 'status_changed' | 'comment_added';
  title: string;
  timestamp: string;
  description: string;
  user?: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

interface Evidence {
  id: string;
  name: string;
  type: 'file' | 'log' | 'screenshot' | 'document';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

const mockIncidentData = {
  'INC-2024-001': {
    id: 'INC-2024-001',
    title: 'Unauthorized access attempt detected',
    description: 'Multiple failed login attempts from suspicious IP addresses targeting admin accounts. Initial analysis shows coordinated attack pattern from various geographical locations.',
    severity: 'critical',
    status: 'in-progress',
    priority: 'P1',
    category: 'Security Breach',
    affectedSystems: ['Web Portal', 'Admin Dashboard', 'User Database'],
    source: 'SIEM Integration',
    reportedBy: 'System Alert',
    owner: {
      name: 'John Doe',
      avatar: '/avatars/john-doe.jpg',
      email: 'john.doe@company.com'
    },
    createdAt: 'Dec 15, 2024 at 9:23 AM',
    updatedAt: 'Dec 15, 2024 at 11:45 AM',
    slaDeadline: 'Dec 16, 2024 at 9:23 AM',
    timeline: [
      {
        id: '1',
        type: 'reported',
        title: 'Incident reported',
        timestamp: 'Dec 15, 2024 at 9:23 AM',
        description: 'Automated alert from SIEM system detected suspicious activity',
        icon: <AlertCircle className="text-white h-4 w-4" />,
        iconBgColor: 'bg-red-500'
      },
      {
        id: '2',
        type: 'assigned',
        title: 'Incident assigned',
        timestamp: 'Dec 15, 2024 at 9:35 AM',
        description: 'Assigned to John Doe for investigation',
        user: 'Security Manager',
        icon: <User className="text-white h-4 w-4" />,
        iconBgColor: 'bg-blue-500'
      },
      {
        id: '3',
        type: 'investigation_started',
        title: 'Investigation started',
        timestamp: 'Dec 15, 2024 at 10:15 AM',
        description: 'Initial analysis of affected systems begun',
        user: 'John Doe',
        icon: <Search className="text-white h-4 w-4" />,
        iconBgColor: 'bg-yellow-500'
      },
      {
        id: '4',
        type: 'comment_added',
        title: 'Comment added',
        timestamp: 'Dec 15, 2024 at 11:45 AM',
        description: 'Found evidence of brute force attack. Blocking suspicious IPs.',
        user: 'John Doe',
        icon: <MessageSquare className="text-white h-4 w-4" />,
        iconBgColor: 'bg-green-500'
      }
    ],
    evidence: [
      {
        id: '1',
        name: 'failed_login_logs.txt',
        type: 'log',
        size: '2.3 MB',
        uploadedBy: 'John Doe',
        uploadedAt: '2 hours ago'
      },
      {
        id: '2',
        name: 'ip_analysis_report.pdf',
        type: 'document',
        size: '856 KB',
        uploadedBy: 'Security Team',
        uploadedAt: '1 hour ago'
      }
    ]
  }
};

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
    resolved: { variant: 'secondary' as const, icon: Check },
    closed: { variant: 'outline' as const, icon: Check }
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

export function IncidentDrawer({ incidentId, isOpen, onClose }: IncidentDrawerProps) {
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  if (!incidentId || !isOpen) return null;

  const incident = mockIncidentData[incidentId as keyof typeof mockIncidentData];
  
  if (!incident) return null;

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[50vw] min-w-[600px] max-w-none overflow-y-auto p-0"
      >
        <SheetHeader className="px-8 py-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SheetTitle className="text-2xl font-semibold">{incident.id}</SheetTitle>
              {getSeverityBadge(incident.severity)}
              {getStatusBadge(incident.status)}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-gray-700 text-left mt-3 text-lg">{incident.title}</p>
        </SheetHeader>
        
        <div className="px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
              <TabsTrigger value="timeline" className="text-sm font-medium">Timeline</TabsTrigger>
              <TabsTrigger value="evidence" className="text-sm font-medium">Evidence</TabsTrigger>
              <TabsTrigger value="actions" className="text-sm font-medium">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Incident Details */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold text-gray-900 mb-3 block">Description</Label>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{incident.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">Priority</Label>
                      <Badge variant="destructive" className="text-sm px-3 py-1">{incident.priority}</Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">Category</Label>
                      <p className="text-gray-900 font-medium">{incident.category}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500 mb-3 block">Affected Systems</Label>
                    <div className="flex flex-wrap gap-2">
                      {incident.affectedSystems.map((system, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">{system}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-500 mb-3 block">Assigned To</Label>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={incident.owner.avatar} />
                        <AvatarFallback className="text-sm">{incident.owner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{incident.owner.name}</p>
                        <p className="text-sm text-gray-500">{incident.owner.email}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">Created</Label>
                      <p className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {incident.createdAt}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">Last Updated</Label>
                      <p className="text-sm text-gray-900 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {incident.updatedAt}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">SLA Deadline</Label>
                      <p className="text-sm text-red-600 flex items-center font-medium">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        {incident.slaDeadline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Activity Timeline</h4>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Update
                </Button>
              </div>
              
              <div className="space-y-6">
                {incident.timeline.map((event, index) => (
                  <div key={event.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full ${event.iconBgColor} flex items-center justify-center`}>
                        {event.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500">{event.timestamp}</p>
                      </div>
                      <p className="text-gray-600 mb-2">{event.description}</p>
                      {event.user && (
                        <p className="text-sm text-gray-500">by {event.user}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-900">Add Comment</Label>
                <Textarea
                  placeholder="Add a comment or update..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evidence" className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Evidence & Attachments</h4>
                <Button size="sm" variant="outline">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>

              <div className="space-y-4">
                {incident.evidence.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.size} • Uploaded by {item.uploadedBy}
                        </p>
                        <p className="text-xs text-gray-400">{item.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900">Available Actions</h4>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start h-auto p-6">
                  <User className="mr-4 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-base">Reassign Incident</div>
                    <div className="text-sm text-gray-500">Change incident owner</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-auto p-6">
                  <Edit className="mr-4 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-base">Update Status</div>
                    <div className="text-sm text-gray-500">Change incident status</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-auto p-6">
                  <Shield className="mr-4 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-base">Escalate</div>
                    <div className="text-sm text-gray-500">Escalate to higher priority</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="w-full justify-start h-auto p-6">
                  <Settings className="mr-4 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium text-base">Configure Alerts</div>
                    <div className="text-sm text-gray-500">Set up notifications</div>
                  </div>
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h5 className="text-base font-semibold text-gray-900">Resolution Actions</h5>
                <div className="space-y-3">
                  <Button className="w-full justify-center py-3">
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Resolved
                  </Button>
                  <Button variant="outline" className="w-full justify-center py-3">
                    <X className="mr-2 h-4 w-4" />
                    Close Incident
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}