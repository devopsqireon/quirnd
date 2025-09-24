// src/app/(protected)/organization-structure/constants/mockData.ts
import { 
    User, 
    Department, 
    TrainingModule, 
    Activity, 
    SystemStatus, 
    SecurityAlert,
    RoleDistribution,
    DepartmentBreakdown,
    UserStats 
  } from '../types'
  import { 
    Users, 
    UserCheck, 
    Clock, 
    UserX, 
    UserPlus, 
    UserPen, 
    Key, 
    AlertTriangle 
  } from 'lucide-react'
  
  export const MOCK_USERS: User[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'Compliance Officer',
      department: 'Legal',
      status: 'active',
      lastLogin: '2 hours ago',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Risk Owner',
      department: 'IT',
      status: 'active',
      lastLogin: '1 day ago',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'Auditor',
      department: 'Finance',
      status: 'pending',
      lastLogin: 'Never',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg'
    },
    {
      id: '4',
      name: 'David Thompson',
      email: 'david.thompson@company.com',
      role: 'Employee',
      department: 'Operations',
      status: 'active',
      lastLogin: '3 hours ago',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
    },
    {
      id: '5',
      name: 'Lisa Park',
      email: 'lisa.park@company.com',
      role: 'CISO',
      department: 'IT',
      status: 'active',
      lastLogin: '5 minutes ago',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg'
    }
  ]
  
  export const MOCK_DEPARTMENTS: Department[] = [
    {
      id: 'it',
      name: 'IT Department',
      head: {
        name: 'Lisa Park',
        role: 'CISO',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
        reports: 12,
        controls: 8
      },
      color: 'green',
      team: [
        {
          name: 'Michael Chen',
          role: 'Risk Owner',
          avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
        },
        {
          name: 'James Wilson',
          role: 'IT Manager',
          avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
        }
      ]
    },
    {
      id: 'legal',
      name: 'Legal Department',
      head: {
        name: 'Sarah Wilson',
        role: 'Legal Counsel',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
        reports: 5,
        policies: 15
      },
      color: 'purple',
      team: [
        {
          name: 'Anna Davis',
          role: 'Compliance Officer',
          avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
        }
      ]
    },
    {
      id: 'finance',
      name: 'Finance Department',
      head: {
        name: 'Emily Rodriguez',
        role: 'CFO',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
        reports: 8,
        audits: 3
      },
      color: 'orange',
      team: [
        {
          name: 'Tom Anderson',
          role: 'Financial Analyst',
          avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg'
        }
      ]
    },
    {
      id: 'operations',
      name: 'Operations',
      head: {
        name: 'David Thompson',
        role: 'COO',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        reports: 15,
        risks: 4
      },
      color: 'blue',
      team: [
        {
          name: 'John Doe',
          role: 'Operations Manager',
          avatar: null
        }
      ]
    }
  ]
  
  export const MOCK_USER_STATS: UserStats[] = [
    {
      title: 'Total Users',
      value: '97',
      icon: Users,
      change: '+12%',
      changeType: 'positive',
      subtitle: 'from last month',
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '89',
      icon: UserCheck,
      change: '91.7%',
      changeType: 'positive',
      subtitle: 'active rate',
      color: 'green'
    },
    {
      title: 'Pending Invites',
      value: '5',
      icon: Clock,
      change: 'Awaiting response',
      changeType: 'neutral',
      subtitle: '',
      color: 'yellow'
    },
    {
      title: 'Suspended',
      value: '3',
      icon: UserX,
      change: 'Requires attention',
      changeType: 'negative',
      subtitle: '',
      color: 'red'
    }
  ]
  
  export const MOCK_ROLE_DISTRIBUTION: RoleDistribution[] = [
    {
      role: 'Compliance Officers',
      count: 8,
      color: 'bg-purple-500',
      percentage: 32
    },
    {
      role: 'Risk Owners',
      count: 12,
      color: 'bg-blue-500',
      percentage: 48
    },
    {
      role: 'Auditors',
      count: 6,
      color: 'bg-orange-500',
      percentage: 24
    },
    {
      role: 'Employees',
      count: 71,
      color: 'bg-gray-500',
      percentage: 100
    }
  ]
  
  export const MOCK_DEPARTMENT_BREAKDOWN: DepartmentBreakdown[] = [
    { department: 'IT Department', users: 25 },
    { department: 'Operations', users: 22 },
    { department: 'Finance', users: 18 },
    { department: 'Legal', users: 15 },
    { department: 'HR', users: 12 },
    { department: 'Other', users: 5 }
  ]
  
  export const MOCK_TRAINING_MODULES: TrainingModule[] = [
    {
      module: 'ISO 27001 Awareness',
      assigned: 97,
      completed: 89,
      completionRate: 92,
      dueDate: 'Dec 31, 2024',
      color: 'bg-green-500'
    },
    {
      module: 'Data Privacy Training',
      assigned: 97,
      completed: 76,
      completionRate: 78,
      dueDate: 'Jan 15, 2025',
      color: 'bg-yellow-500'
    },
    {
      module: 'Security Awareness',
      assigned: 97,
      completed: 45,
      completionRate: 46,
      dueDate: 'Feb 1, 2025',
      color: 'bg-red-500'
    }
  ]
  
  export const MOCK_ACTIVITIES: Activity[] = [
    {
      id: 1,
      type: 'user_invited',
      icon: UserPlus,
      iconBg: 'bg-green-500',
      title: 'Emily Rodriguez was invited to the platform',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'role_updated',
      icon: UserPen,
      iconBg: 'bg-blue-500',
      title: "Michael Chen's role was updated to Risk Owner",
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'password_reset',
      icon: Key,
      iconBg: 'bg-yellow-500',
      title: 'Password reset requested for David Thompson',
      time: '6 hours ago'
    },
    {
      id: 4,
      type: 'user_suspended',
      icon: UserX,
      iconBg: 'bg-red-500',
      title: 'John Doe account was suspended',
      time: '1 day ago'
    }
  ]
  
  export const MOCK_SYSTEM_STATUS: SystemStatus[] = [
    {
      service: 'User Authentication',
      status: 'operational',
      statusText: 'Operational'
    },
    {
      service: 'Directory Sync',
      status: 'operational',
      statusText: 'Operational'
    },
    {
      service: 'Email Notifications',
      status: 'degraded',
      statusText: 'Degraded'
    }
  ]
  
  export const MOCK_SECURITY_ALERTS: SecurityAlert[] = [
    {
      type: 'critical',
      title: 'Multiple failed login attempts',
      description: 'User: john.doe@company.com (5 attempts)',
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      type: 'warning',
      title: 'Pending access review',
      description: '3 users require quarterly access review',
      icon: Clock,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500'
    }
  ]