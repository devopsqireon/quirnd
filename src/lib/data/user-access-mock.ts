// src/lib/data/user-access-mock.ts
import { User, Role, Activity, UserStats, RoleStats } from '@/lib/types/user-access'

export const mockUsers: User[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Compliance Team',
    role: 'Org Admin',
    roleColor: 'bg-blue-100 text-blue-800',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800',
    lastLogin: '2 hours ago',
    joinDate: 'January 15, 2023',
    location: 'San Francisco, CA',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
    permissions: ['Full System Access', 'User Management', 'Policy Management', 'Audit Reports']
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 234-5678',
    department: 'IT Department',
    role: 'Compliance Officer',
    roleColor: 'bg-purple-100 text-purple-800',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800',
    lastLogin: '1 day ago',
    joinDate: 'March 22, 2023',
    location: 'New York, NY',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    permissions: ['Policy Management', 'Training Management', 'Incident Response', 'Risk Assessment']
  },
  {
    id: 'emily-davis',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'Legal Department',
    role: 'Auditor',
    roleColor: 'bg-orange-100 text-orange-800',
    status: 'Invited',
    statusColor: 'bg-yellow-100 text-yellow-800',
    lastLogin: 'Never',
    joinDate: 'Not completed',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
    permissions: ['Audit Reports', 'View Policies', 'View Risk Assessments']
  },
  {
    id: 'david-wilson',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    department: 'HR Department',
    role: 'Employee',
    roleColor: 'bg-gray-100 text-gray-800',
    status: 'Suspended',
    statusColor: 'bg-red-100 text-red-800',
    lastLogin: '3 weeks ago',
    joinDate: 'September 10, 2023',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    permissions: ['View Policies', 'Complete Training', 'Report Incidents']
  },
  {
    id: 'lisa-martinez',
    name: 'Lisa Martinez',
    email: 'lisa.martinez@company.com',
    department: 'Finance Department',
    role: 'Employee',
    roleColor: 'bg-gray-100 text-gray-800',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800',
    lastLogin: '5 hours ago',
    joinDate: 'July 8, 2023',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
    permissions: ['View Policies', 'Complete Training', 'Report Incidents']
  }
]

export const mockRoles: Role[] = [
  {
    id: 'org-admin',
    name: 'Organization Administrator',
    description: 'Full administrative access across all modules and settings.',
    type: 'system',
    icon: 'Crown',
    iconColor: 'bg-blue-100 text-blue-600',
    userCount: 3,
    users: ['sarah-johnson', 'admin-2'],
    permissions: []
  },
  {
    id: 'compliance-officer',
    name: 'Compliance Officer',
    description: 'Manages compliance programs, policies, and training.',
    type: 'system',
    icon: 'Scale',
    iconColor: 'bg-purple-100 text-purple-600',
    userCount: 8,
    users: ['michael-chen'],
    permissions: []
  },
  {
    id: 'data-protection-officer',
    name: 'Data Protection Officer',
    description: 'Specialized role for GDPR compliance and data privacy management.',
    type: 'custom',
    icon: 'Database',
    iconColor: 'bg-green-100 text-green-600',
    userCount: 1,
    users: ['emily-davis'],
    createdDate: '2 weeks ago',
    permissions: []
  }
]

export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: 'james-thompson',
    userName: 'James Thompson',
    userAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
    action: 'completed mandatory compliance training',
    timestamp: '2 hours ago',
    badge: {
      text: 'Training Complete',
      color: 'bg-green-100 text-green-800'
    }
  },
  {
    id: '2',
    userId: 'alex-rodriguez',
    userName: 'Alex Rodriguez',
    userAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
    action: 'was assigned Compliance Officer role',
    timestamp: '4 hours ago',
    badge: {
      text: 'Role Assigned',
      color: 'bg-blue-100 text-blue-800'
    }
  },
  {
    id: '3',
    userId: 'rachel-green',
    userName: 'Rachel Green',
    userAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg',
    action: 'reported a security incident',
    timestamp: '6 hours ago',
    badge: {
      text: 'Incident Report',
      color: 'bg-red-100 text-red-800'
    }
  }
]

export const mockUserStats: UserStats = {
  totalUsers: 247,
  activeUsers: 234,
  pendingInvites: 8,
  suspendedUsers: 5
}

export const mockRoleStats: RoleStats = {
  systemRoles: 4,
  customRoles: 7,
  totalPermissions: 42
}