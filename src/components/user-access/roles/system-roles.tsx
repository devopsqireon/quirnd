// src/components/user-access/roles/system-roles.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Crown, Scale, Search, User, ChevronDown } from 'lucide-react'

export function SystemRoles() {
  const systemRoles = [
    {
      id: 'org-admin',
      name: 'Organization Administrator',
      description: 'Full administrative access across all modules and settings. Responsible for organization-wide compliance oversight.',
      icon: Crown,
      iconColor: 'bg-blue-100 text-blue-600',
      userCount: 3,
      users: [
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
      ]
    },
    {
      id: 'compliance-officer',
      name: 'Compliance Officer',
      description: 'Manages compliance programs, policies, and training. Can create and assign compliance-related tasks.',
      icon: Scale,
      iconColor: 'bg-purple-100 text-purple-600',
      userCount: 8,
      users: [
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'
      ]
    },
    {
      id: 'auditor',
      name: 'Auditor',
      description: 'Read-only access to audit trails, reports, and compliance data. Can generate audit reports and findings.',
      icon: Search,
      iconColor: 'bg-orange-100 text-orange-600',
      userCount: 2,
      users: [
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg'
      ]
    },
    {
      id: 'employee',
      name: 'Employee',
      description: 'Basic access to view assigned policies, complete training, and report incidents. Standard user permissions.',
      icon: User,
      iconColor: 'bg-gray-100 text-gray-600',
      userCount: 234,
      users: [
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg'
      ]
    }
  ]

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">System Roles</h3>
        <p className="text-sm text-gray-600">Default roles with predefined permissions aligned with ISO 27001 standards.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemRoles.map((role) => (
          <div key={role.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role.iconColor}`}>
                    <role.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">{role.name}</h4>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      System Role
                    </Badge>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4">{role.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {role.users.slice(0, 3).map((avatar, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                    {role.userCount > 3 && (
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                        +{role.userCount - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{role.userCount} users</span>
                </div>
                <Button variant="link" size="sm" className="text-primary-600 hover:text-primary-700 p-0">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}