// src/lib/utils/user-access.ts
import { User, Role, Permission } from '@/lib/types/user-access'

export const getUsersByRole = (users: User[], roleId: string): User[] => {
  return users.filter(user => user.role.toLowerCase().replace(/\s+/g, '-') === roleId)
}

export const getUsersByStatus = (users: User[], status: string): User[] => {
  if (status === 'all') return users
  return users.filter(user => user.status.toLowerCase() === status.toLowerCase())
}

export const searchUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm) return users
  
  const term = searchTerm.toLowerCase()
  return users.filter(user => 
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.department.toLowerCase().includes(term)
  )
}

export const getPermissionIcon = (level: Permission['level']) => {
  switch (level) {
    case 'full':
      return 'CheckCircle'
    case 'view':
      return 'Eye'
    case 'create':
      return 'Plus'
    case 'self':
      return 'UserCheck'
    case 'none':
      return 'XCircle'
    default:
      return 'XCircle'
  }
}

export const getPermissionColor = (level: Permission['level']) => {
  switch (level) {
    case 'full':
      return 'text-green-500'
    case 'view':
      return 'text-blue-500'
    case 'create':
      return 'text-orange-500'
    case 'self':
      return 'text-yellow-500'
    case 'none':
      return 'text-red-500'
    default:
      return 'text-red-500'
  }
}

export const getRoleBadgeColor = (roleType: Role['type']) => {
  return roleType === 'system' 
    ? 'bg-blue-100 text-blue-800 border-blue-200'
    : 'bg-green-100 text-green-800 border-green-200'
}

export const getStatusBadgeColor = (status: User['status']) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Invited':
      return 'bg-yellow-100 text-yellow-800'
    case 'Suspended':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const formatLastLogin = (lastLogin: string): string => {
  // This would typically parse and format actual dates
  // For now, returning as-is since we're using relative strings
  return lastLogin
}

export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}