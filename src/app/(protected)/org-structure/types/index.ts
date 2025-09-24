// src/app/(protected)/organization-structure/types/index.ts

export interface User {
    id: string
    name: string
    email: string
    role: string
    department: string
    status: 'active' | 'pending' | 'suspended'
    lastLogin: string
    avatar: string
    responsibilities?: {
      risksOwned: number
      controlsOwned: number
      policiesAuthored: number
      tasksAssigned: number
    }
    trainingStatus?: {
      module: string
      status: 'completed' | 'in-progress' | 'not-started'
    }[]
  }
  
  export interface Department {
    id: string
    name: string
    head: {
      name: string
      role: string
      avatar: string
      reports: number
      controls?: number
      policies?: number
      audits?: number
      risks?: number
    }
    color: 'green' | 'purple' | 'orange' | 'blue'
    team: {
      name: string
      role: string
      avatar: string | null
    }[]
  }
  
  export interface TrainingModule {
    module: string
    assigned: number
    completed: number
    completionRate: number
    dueDate: string
    color: string
  }
  
  export interface Activity {
    id: number
    type: 'user_invited' | 'role_updated' | 'password_reset' | 'user_suspended'
    icon: any
    iconBg: string
    title: string
    time: string
  }
  
  export interface SystemStatus {
    service: string
    status: 'operational' | 'degraded' | 'down'
    statusText: string
  }
  
  export interface SecurityAlert {
    type: 'critical' | 'warning' | 'info'
    title: string
    description: string
    icon: any
    bgColor: string
    iconColor: string
  }
  
  export interface RoleDistribution {
    role: string
    count: number
    color: string
    percentage: number
  }
  
  export interface DepartmentBreakdown {
    department: string
    users: number
  }
  
  export interface UserStats {
    title: string
    value: string
    icon: any
    change: string
    changeType: 'positive' | 'negative' | 'neutral'
    subtitle: string
    color: 'blue' | 'green' | 'yellow' | 'red'
  }