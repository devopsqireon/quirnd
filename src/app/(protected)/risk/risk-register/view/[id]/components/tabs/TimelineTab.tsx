// File: /app/risk/risk-register/view/[id]/components/tabs/TimelineTab.tsx

import { useState } from 'react';
import { 
    Clock, 
    Filter, 
    User, 
    AlertTriangle, 
    Shield, 
    FileText, 
    Activity,
    Calendar,
    MessageSquare,
    Upload,
    Download,
    Settings,
    Eye,
    Edit,
    Plus
} from 'lucide-react';
import { TimelineEvent } from '../../types';

interface TimelineTabProps {
    riskId: string;
}

const eventTypeConfig = {
    risk_created: {
        icon: Plus,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    },
    risk_updated: {
        icon: Edit,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
    },
    status_changed: {
        icon: Activity,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
    },
    control_added: {
        icon: Shield,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
    },
    control_updated: {
        icon: Settings,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200'
    },
    assessment_updated: {
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    },
    document_added: {
        icon: FileText,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50',
        borderColor: 'border-cyan-200'
    },
    comment_added: {
        icon: MessageSquare,
        color: 'text-slate-600',
        bgColor: 'bg-slate-50',
        borderColor: 'border-slate-200'
    }
};

const mockEvents: TimelineEvent[] = [
    {
        id: '1',
        type: 'risk_created',
        title: 'Risk Created',
        description: 'New cyber security risk identified and added to register',
        timestamp: '2024-01-15T10:30:00Z',
        user: 'Sarah Johnson',
        userEmail: 'sarah.johnson@company.com'
    },
    {
        id: '2',
        type: 'control_added',
        title: 'Control Added',
        description: 'Added firewall configuration control',
        timestamp: '2024-01-25T14:15:00Z',
        user: 'Michael Chen',
        userEmail: 'michael.chen@company.com',
        metadata: {
            controlName: 'Firewall Configuration Review'
        }
    },
    {
        id: '3',
        type: 'status_changed',
        title: 'Status Updated',
        description: 'Risk status changed from Open to In Progress',
        timestamp: '2024-02-05T09:20:00Z',
        user: 'Emily Davis',
        userEmail: 'emily.davis@company.com',
        metadata: {
            field: 'status',
            oldValue: 'Open',
            newValue: 'In Progress'
        }
    },
    {
        id: '4',
        type: 'assessment_updated',
        title: 'Risk Assessment Updated',
        description: 'Updated likelihood and impact scores based on recent analysis',
        timestamp: '2024-02-10T16:45:00Z',
        user: 'Robert Wilson',
        userEmail: 'robert.wilson@company.com',
        metadata: {
            field: 'risk_score',
            oldValue: 'Medium (6)',
            newValue: 'High (12)'
        }
    },
    {
        id: '5',
        type: 'document_added',
        title: 'Document Uploaded',
        description: 'Added risk mitigation strategy document',
        timestamp: '2024-02-15T11:30:00Z',
        user: 'Lisa Thompson',
        userEmail: 'lisa.thompson@company.com',
        metadata: {
            documentName: 'Cyber_Security_Mitigation_Strategy_v2.pdf'
        }
    },
    {
        id: '6',
        type: 'comment_added',
        title: 'Comment Added',
        description: 'Added comment regarding implementation timeline',
        timestamp: '2024-02-20T13:15:00Z',
        user: 'David Brown',
        userEmail: 'david.brown@company.com',
        metadata: {
            comment: 'Implementation should be completed by end of Q2. Coordinating with IT security team.'
        }
    },
    {
        id: '7',
        type: 'control_updated',
        title: 'Control Updated',
        description: 'Updated effectiveness rating for firewall configuration control',
        timestamp: '2024-03-01T10:00:00Z',
        user: 'Michael Chen',
        userEmail: 'michael.chen@company.com',
        metadata: {
            controlName: 'Firewall Configuration Review',
            field: 'effectiveness',
            oldValue: 'Moderate',
            newValue: 'High'
        }
    },
    {
        id: '8',
        type: 'risk_updated',
        title: 'Risk Details Updated',
        description: 'Updated risk description and potential impact details',
        timestamp: '2024-03-05T15:20:00Z',
        user: 'Sarah Johnson',
        userEmail: 'sarah.johnson@company.com'
    }
];

export function TimelineTab({ riskId }: TimelineTabProps) {
    const [filter, setFilter] = useState<string>('all');
    const [events] = useState<TimelineEvent[]>(mockEvents);
    
    const filterOptions = [
        { value: 'all', label: 'All Events', count: events.length },
        { value: 'risk_created', label: 'Risk Created', count: events.filter(e => e.type === 'risk_created').length },
        { value: 'risk_updated', label: 'Risk Updates', count: events.filter(e => e.type === 'risk_updated').length },
        { value: 'status_changed', label: 'Status Changes', count: events.filter(e => e.type === 'status_changed').length },
        { value: 'control_added', label: 'Control Added', count: events.filter(e => e.type === 'control_added').length },
        { value: 'control_updated', label: 'Control Updates', count: events.filter(e => e.type === 'control_updated').length },
        { value: 'assessment_updated', label: 'Assessments', count: events.filter(e => e.type === 'assessment_updated').length },
        { value: 'document_added', label: 'Documents', count: events.filter(e => e.type === 'document_added').length },
        { value: 'comment_added', label: 'Comments', count: events.filter(e => e.type === 'comment_added').length }
    ];

    const filteredEvents = filter === 'all' 
        ? events 
        : events.filter(event => event.type === filter);

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
            return {
                date: 'Today',
                time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
        } else if (diffInHours < 48) {
            return {
                date: 'Yesterday',
                time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
        } else {
            return {
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Timeline</h2>
                        <p className="text-slate-600 mt-1">
                            Complete history of risk events and changes
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                            <Download className="w-4 h-4" />
                            Export Timeline
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Timeline Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Filters */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="w-4 h-4 text-slate-600" />
                                <h3 className="font-medium text-slate-900">Filter Events</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {filterOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setFilter(option.value)}
                                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                                            filter === option.value
                                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        {option.label}
                                        <span className={`ml-1.5 text-xs ${
                                            filter === option.value ? 'text-blue-600' : 'text-slate-500'
                                        }`}>
                                            ({option.count})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Timeline Events */}
                        <div className="bg-white rounded-lg border border-slate-200">
                            <div className="p-4 border-b border-slate-200">
                                <h3 className="font-medium text-slate-900">
                                    {filter === 'all' ? 'All Events' : filterOptions.find(f => f.value === filter)?.label}
                                    <span className="ml-2 text-sm text-slate-500">
                                        ({filteredEvents.length} events)
                                    </span>
                                </h3>
                            </div>

                            <div className="p-4">
                                {filteredEvents.map((event, index) => {
                                    const config = eventTypeConfig[event.type];
                                    const IconComponent = config.icon;
                                    const { date, time } = formatTimestamp(event.timestamp);
                                    
                                    return (
                                        <div key={event.id} className="relative">
                                            {/* Timeline line */}
                                            {index < filteredEvents.length - 1 && (
                                                <div className="absolute left-6 top-12 w-px h-16 bg-slate-200"></div>
                                            )}
                                            
                                            <div className="flex gap-4 pb-6">
                                                {/* Icon */}
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${config.bgColor} ${config.borderColor} border flex items-center justify-center`}>
                                                    <IconComponent className={`w-5 h-5 ${config.color}`} />
                                                </div>
                                                
                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-medium text-slate-900">{event.title}</h4>
                                                            <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                                                        </div>
                                                        <div className="text-right text-sm text-slate-500">
                                                            <div className="font-medium">{date}</div>
                                                            <div className="text-xs">{time}</div>
                                                        </div>
                                                    </div>

                                                    {/* Metadata */}
                                                    {event.metadata && (
                                                        <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                                                            {event.metadata.field && event.metadata.oldValue && event.metadata.newValue && (
                                                                <div className="text-sm">
                                                                    <span className="font-medium text-slate-900">
                                                                        {event.metadata.field.replace('_', ' ').toUpperCase()}:
                                                                    </span>
                                                                    <span className="ml-2 text-red-600 line-through">
                                                                        {event.metadata.oldValue}
                                                                    </span>
                                                                    <span className="mx-2 text-slate-400">→</span>
                                                                    <span className="text-green-600 font-medium">
                                                                        {event.metadata.newValue}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {event.metadata.controlName && (
                                                                <div className="text-sm text-slate-700">
                                                                    <span className="font-medium">Control:</span>
                                                                    <span className="ml-1">{event.metadata.controlName}</span>
                                                                </div>
                                                            )}
                                                            {event.metadata.documentName && (
                                                                <div className="text-sm text-slate-700">
                                                                    <span className="font-medium">Document:</span>
                                                                    <span className="ml-1">{event.metadata.documentName}</span>
                                                                </div>
                                                            )}
                                                            {event.metadata.comment && (
                                                                <div className="text-sm text-slate-700 italic">
                                                                    "{event.metadata.comment}"
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* User Info */}
                                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-3">
                                                        <User className="w-4 h-4" />
                                                        <span>{event.user}</span>
                                                        <span>•</span>
                                                        <span>{event.userEmail}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Empty State */}
                                {filteredEvents.length === 0 && (
                                    <div className="text-center py-12">
                                        <Clock className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                                            No events found
                                        </h3>
                                        <p className="text-slate-600 mb-6">
                                            {filter === 'all' 
                                                ? 'No events have been recorded for this risk yet.'
                                                : `No ${filterOptions.find(f => f.value === filter)?.label.toLowerCase()} found.`
                                            }
                                        </p>
                                        <button 
                                            onClick={() => setFilter('all')}
                                            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                                        >
                                            View All Events
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Activity Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Total Events</span>
                                    <span className="font-medium text-slate-900">{events.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">This Month</span>
                                    <span className="font-medium text-slate-900">3</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Last Activity</span>
                                    <span className="font-medium text-slate-900">2 days ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Recent Activity
                            </h3>
                            <div className="space-y-3">
                                {events.slice(0, 3).map((event) => {
                                    const config = eventTypeConfig[event.type];
                                    const IconComponent = config.icon;
                                    const { date, time } = formatTimestamp(event.timestamp);
                                    
                                    return (
                                        <div key={event.id} className="flex items-start gap-3">
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${config.bgColor} flex items-center justify-center`}>
                                                <IconComponent className={`w-3 h-3 ${config.color}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-slate-900 truncate">
                                                    {event.title}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {date} at {time}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Key Milestones */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Key Milestones
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-slate-900">Risk Created</div>
                                        <div className="text-xs text-slate-500">Jan 15, 2024</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-slate-900">First Control Added</div>
                                        <div className="text-xs text-slate-500">Jan 25, 2024</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-slate-900">Status In Progress</div>
                                        <div className="text-xs text-slate-500">Feb 5, 2024</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-slate-900">Risk Score Updated</div>
                                        <div className="text-xs text-slate-500">Feb 10, 2024</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Actions */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                                    <MessageSquare className="w-4 h-4" />
                                    Add Comment
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                                    <Upload className="w-4 h-4" />
                                    Upload Document
                                </button>
                                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                                    <Eye className="w-4 h-4" />
                                    View All Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}