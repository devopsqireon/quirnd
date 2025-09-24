// src/lib/types/user-access.ts
export interface User {
    id: string
    name: string
    email: string
    phone?: string
    department: string
    role: string
    roleColor: string
    status: 'Active' | 'Invited' | 'Suspended'
    statusColor: string
    lastLogin: string
    joinDate: string
    location?: string
    avatar: string
    permissions: string[]
  }
  
  export interface Role {
    id: string
    name: string
    description: string
    type: 'system' | 'custom'
    icon: string
    iconColor: string
    userCount: number
    users: string[]
    createdDate?: string
    permissions: Permission[]
  }
  
  export interface Permission {
    id: string
    name: string
    category: string
    description: string
    level: 'full' | 'view' | 'create' | 'self' | 'none'
  }
  
  export interface Activity {
    id: string
    userId: string
    userName: string
    userAvatar: string
    action: string
    timestamp: string
    details?: string
    badge: {
      text: string
      color: string
    }
  }
  
  export interface UserStats {
    totalUsers: number
    activeUsers: number
    pendingInvites: number
    suspendedUsers: number
  }
  
  export interface RoleStats {
    systemRoles: number
    customRoles: number
    totalPermissions: number
  }