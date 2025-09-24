// src/app/(protected)/dashboard/external-dashboard/data/dashboard-data.ts
import { 
    ShieldCheck, 
    ShieldUser, 
    Eye, 
    FileText, 
    ClipboardList, 
    Users, 
    Bug, 
    TrendingUp, 
    Handshake,
    Flag,
    Check,
    Calendar,
    ClipboardCheck,
    AlertTriangle,
    Lightbulb,
    ArchiveRestore,
    Search,
    Bookmark,
    StickyNote,
    Printer
  } from 'lucide-react'
  
  import {
    Certification,
    Control,
    EvidencePackage,
    Finding,
    TimelineEvent,
    QuickAction,
    AuditStatistic,
    ComplianceMetric,
    UpcomingDeadline
  } from '../types'
  
  export const certifications: Certification[] = [
    {
      id: 1,
      name: 'ISO 27001:2022',
      description: 'Information Security Management',
      validUntil: 'Dec 15, 2025',
      nextAudit: 'Mar 20, 2024',
      status: 'Active',
      con: ShieldCheck,
      color: 'green'
    },
    {
      id: 2,
      name: 'HIPAA Compliance',
      description: 'Healthcare Data Protection',
      validUntil: 'Jun 30, 2024',
      nextAudit: 'Apr 15, 2024',
      status: 'Active',
      con: ShieldUser,
      color: 'blue'
    },
    {
      id: 3,
      name: 'SOC 2 Type II',
      description: 'Service Organization Controls',
      validUntil: 'Sep 10, 2024',
      nextAudit: 'May 25, 2024',
      status: 'Active',
      icon: Eye,
      color: 'purple'
    }
  ]
  
  export const controls: Control[] = [
    {
      id: 'A.5.1',
      name: 'Information security policies',
      category: 'Organizational',
      status: 'Implemented',
      implementationDate: 'Jan 15, 2023',
      statusColor: 'green'
    },
    {
      id: 'A.5.2',
      name: 'Information security risk management',
      category: 'Organizational',
      status: 'Implemented',
      implementationDate: 'Feb 20, 2023',
      statusColor: 'green'
    },
    {
      id: 'A.6.1',
      name: 'Screening',
      category: 'People',
      status: 'Planned',
      implementationDate: 'Q2 2024',
      statusColor: 'yellow'
    },
    {
      id: 'A.7.1',
      name: 'Physical security perimeters',
      category: 'Physical',
      status: 'Not Applicable',
      implementationDate: '-',
      statusColor: 'gray'
    },
    {
      id: 'A.8.1',
      name: 'User endpoint devices',
      category: 'Technology',
      status: 'Implemented',
      implementationDate: 'Mar 10, 2023',
      statusColor: 'green'
    }
  ]
  
  export const evidencePackages: EvidencePackage[] = [
    {
      id: 1,
      title: 'Security Policies Package',
      description: 'Information security, data protection, and access control policies',
      documents: 12,
      status: 'Complete',
      statusColor: 'green',
      icon: FileText,
      iconColor: 'blue'
    },
    {
      id: 2,
      title: 'Risk Assessment Reports',
      description: 'Risk identification, analysis, and treatment plans',
      documents: 8,
      status: 'Complete',
      statusColor: 'green',
      icon: ClipboardList,
      iconColor: 'purple'
    },
    {
      id: 3,
      title: 'Training Records',
      description: 'Security awareness and compliance training documentation',
      documents: 5,
      status: 'Pending',
      statusColor: 'yellow',
      icon: Users,
      iconColor: 'orange'
    },
    {
      id: 4,
      title: 'Vulnerability Assessments',
      description: 'Technical security testing and penetration test reports',
      documents: 6,
      status: 'Complete',
      statusColor: 'green',
      icon: Bug,
      iconColor: 'red'
    },
    {
      id: 5,
      title: 'Monitoring & Metrics',
      description: 'Security monitoring logs and performance metrics',
      documents: 15,
      status: 'Complete',
      statusColor: 'green',
      icon: TrendingUp,
      iconColor: 'green'
    },
    {
      id: 6,
      title: 'Vendor Agreements',
      description: 'Third-party security agreements and assessments',
      documents: 0,
      status: 'Missing',
      statusColor: 'red',
      icon: Handshake,
      iconColor: 'indigo'
    }
  ]
  
  export const findings: Finding[] = [
    {
      type: 'NC',
      typeColor: 'red',
      reference: 'A.5.1 - Security Policy',
      description: 'Information security policy lacks specific incident response procedures...',
      severity: 'Major',
      severityColor: 'orange',
      status: 'In Progress',
      statusColor: 'yellow',
      dueDate: 'Apr 15, 2024',
      owner: 'Compliance Officer'
    },
    {
      type: 'OFI',
      typeColor: 'orange',
      reference: 'A.8.1 - User Endpoints',
      description: 'Consider implementing automated endpoint monitoring for better visibility...',
      severity: 'Medium',
      severityColor: 'blue',
      status: 'Open',
      statusColor: 'red',
      dueDate: 'May 30, 2024',
      owner: 'IT Manager'
    },
    {
      type: 'NC',
      typeColor: 'red',
      reference: 'A.6.1 - Screening',
      description: 'Background check process not documented for contractor access...',
      severity: 'Minor',
      severityColor: 'red',
      status: 'Closed',
      statusColor: 'green',
      dueDate: 'Mar 30, 2024',
      owner: 'HR Manager'
    }
  ]
  
  export const timelineEvents: TimelineEvent[] = [
    {
      title: 'Audit Initiation',
      date: 'March 5, 2024',
      description: 'External audit commenced. Initial documentation review and scope definition completed.',
      status: 'Current',
      statusColor: 'blue',
      icon: Flag,
      completed: false
    },
    {
      title: 'Documentation Review',
      date: 'February 20, 2024',
      description: 'Comprehensive review of policies, procedures, and evidence documentation.',
      status: 'Completed',
      statusColor: 'green',
      icon: Check,
      completed: true
    },
    {
      title: 'Previous Surveillance Audit',
      date: 'March 15, 2023',
      description: 'Annual surveillance audit completed successfully with 2 minor non-conformities addressed.',
      status: 'Passed',
      statusColor: 'green',
      icon: Check,
      completed: true
    },
    {
      title: 'Closing Meeting',
      date: 'March 22, 2024',
      description: 'Final audit findings presentation and corrective action plan discussion.',
      status: 'Scheduled',
      statusColor: 'gray',
      icon: Calendar,
      completed: false
    }
  ]
  
  export const quickActions: QuickAction[] = [
    {
      title: 'Export Audit Report',
      description: 'Generate comprehensive audit summary',
      icon: ArchiveRestore,
      iconColor: 'blue'
    },
    {
      title: 'Evidence Search',
      description: 'Find specific evidence documents',
      icon: Search,
      iconColor: 'green'
    },
    {
      title: 'Bookmark Control',
      description: 'Save control for detailed review',
      icon: Bookmark,
      iconColor: 'purple'
    },
    {
      title: 'Add Audit Note',
      description: 'Record observations and comments',
      icon: StickyNote,
      iconColor: 'yellow'
    },
    {
      title: 'Flag for Follow-up',
      description: 'Mark items requiring attention',
      icon: Flag,
      iconColor: 'red'
    },
    {
      title: 'Print Checklist',
      description: 'Generate audit checklist PDF',
      icon: Printer,
      iconColor: 'indigo'
    }
  ]
  
  export const auditStatistics: AuditStatistic[] = [
    {
      title: 'Total Controls Reviewed',
      value: '114',
      subtitle: '95% Complete',
      icon: ClipboardCheck,
      iconColor: 'blue',
      trend: 'up',
      trendColor: 'green'
    },
    {
      title: 'Non-Conformities Raised',
      value: '2',
      subtitle: '1 Major, 1 Minor',
      icon: AlertTriangle,
      iconColor: 'red',
      trend: null,
      trendColor: 'red'
    },
    {
      title: 'Opportunities for Improvement',
      value: '1',
      subtitle: 'Medium Priority',
      icon: Lightbulb,
      iconColor: 'orange',
      trend: null,
      trendColor: 'orange'
    },
    {
      title: 'Evidence Documents',
      value: '46',
      subtitle: '87% Available',
      icon: FileText,
      iconColor: 'green',
      trend: 'up',
      trendColor: 'green'
    }
  ]
  
  export const complianceMetrics: ComplianceMetric[] = [
    {
      title: 'Controls Implemented',
      subtitle: '108 of 120 controls',
      percentage: 90,
      color: '#10b981'
    },
    {
      title: 'Risks Treated',
      subtitle: '34 of 40 risks',
      percentage: 85,
      color: '#3b82f6'
    },
    {
      title: 'SoA Coverage',
      subtitle: '114 of 120 controls',
      percentage: 95,
      color: '#8b5cf6'
    }
  ]
  
  export const upcomingDeadlines: UpcomingDeadline[] = [
    {
      title: 'ISO 27001 Surveillance Audit',
      date: 'March 20, 2024',
      priority: 'High Priority',
      daysLeft: '15 days',
      color: 'red'
    },
    {
      title: 'HIPAA Compliance Review',
      date: 'April 15, 2024',
      priority: 'Medium Priority',
      daysLeft: '41 days',
      color: 'yellow'
    },
    {
      title: 'SOC 2 Type II Examination',
      date: 'May 25, 2024',
      priority: 'Medium Priority',
      daysLeft: '81 days',
      color: 'blue'
    }
  ]
  
  export const progressItems = [
    { label: 'Overall Completion', percentage: 87 },
    { label: 'Policy Documentation', percentage: 95 },
    { label: 'Technical Controls', percentage: 82 },
    { label: 'Training Records', percentage: 78 }
  ]
  
  export const restrictedItems = [
    'Full Risk Register (only SoA + evidence mapping available)',
    'Incident Register (only summary via evidence if shared)',
    'Training/Policy completion breakdowns',
    'Activity Logs or Internal Audit Trail',
    'Integration settings and configurations'
  ]