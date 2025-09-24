// src/types/continuity-recovery.ts
export interface Owner {
    name: string
    role: string
    avatar: string
  }
  
  export interface ContinuityPlan {
    id: number
    name: string
    version: string
    owner: Owner
    lastUpdated: string
    nextReview: string
    status: 'Active' | 'Draft' | 'Under Review' | 'Retired'
    evidence: string
    icon: any
    iconColor: string
  }
  
  export interface ContinuityTest {
    id: number
    type: string
    category: string
    date: string
    owner: Owner
    participants: string[] | string
    additionalParticipants?: number
    outcome: 'Passed' | 'Failed' | 'Scheduled'
    evidence: string
    icon: any
    iconColor: string
  }
  
  export interface CriticalProcess {
    id: number
    name: string
    description: string
    priority: 'Critical' | 'Important' | 'Standard'
    owner: Owner
    keyAssets: string[]
    rto: string
    rpo: string
    icon: any
    iconColor: string
    priorityColor: string
  }
  
  export interface DisasterRecoveryPlan {
    id: number
    name: string
    version: string
    systemsCovered: Array<{ name: string; color: string }>
    owner: Owner
    rto: string
    rpo: string
    lastUpdated: string
    icon: any
    iconColor: string
    rtoColor: string
    rpoColor: string
  }
  
  export interface SystemRecoveryTest {
    id: number
    system: {
      name: string
      description: string
      icon: any
      iconColor: string
    }
    testDate: string
    recoveryTime: string
    targetRTO: string
    status: 'Passed' | 'Failed'
    evidence: string
    recoveryTimeColor: string
    statusColor: string
    evidenceIcon: any
    evidenceColor: string
  }
  
  export interface BackupSystem {
    id: number
    name: string
    description: string
    schedule: string
    lastBackup: string
    lastTest: string
    retention: string
    status: 'Success' | 'Running' | 'Failed'
    icon: any
    iconColor: string
    statusColor: string
    lastBackupColor: string
    progress?: number
    actions: Array<{ label: string; color: string }>
  }
  
  export interface TimelineEvent {
    id: number
    title: string
    date: string
    description: string
    type: 'success' | 'info' | 'scheduled' | 'warning'
    icon: any
    iconColor: string
  }
  
  export interface Risk {
    id: number
    title: string
    description: string
    priority: string
    impact: number
    likelihood: number
    backgroundColor: string
    textColor: string
    badgeColor: string
    buttonColor: string
  }
  
  export interface MitigationStatus {
    title: string
    subtitle: string
    percentage: number
    color: string
    progressColor: string
  }