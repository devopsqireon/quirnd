// src/app/(protected)/dashboard/external-dashboard/types/index.ts

export interface Certification {
    id: number
    name: string
    description: string
    validUntil: string
    nextAudit: string
    status: 'Active' | 'Inactive' | 'Pending'
    icon: any
    color: string
  }
  
  export interface Control {
    id: string
    name: string
    category: string
    status: 'Implemented' | 'Planned' | 'Not Applicable'
    implementationDate: string
    statusColor: string
  }
  
  export interface EvidencePackage {
    id: number
    title: string
    description: string
    documents: number
    status: 'Complete' | 'Pending' | 'Missing'
    statusColor: string
    icon: any
    iconColor: string
  }
  
  export interface Finding {
    type: 'NC' | 'OFI'
    typeColor: string
    reference: string
    description: string
    severity: string
    severityColor: string
    status: string
    statusColor: string
    dueDate: string
    owner: string
  }
  
  export interface TimelineEvent {
    title: string
    date: string
    description: string
    status: string
    statusColor: string
    icon: any
    completed: boolean
  }
  
  export interface QuickAction {
    title: string
    description: string
    icon: any
    iconColor: string
  }
  
  export interface AuditStatistic {
    title: string
    value: string
    subtitle: string
    icon: any
    iconColor: string
    trend: 'up' | 'down' | null
    trendColor: string
  }
  
  export interface ComplianceMetric {
    title: string
    subtitle: string
    percentage: number
    color: string
  }
  
  export interface UpcomingDeadline {
    title: string
    date: string
    priority: string
    daysLeft: string
    color: string
  }