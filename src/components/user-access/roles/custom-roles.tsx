// src/components/user-access/roles/custom-roles.tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Database, AlertTriangle, GraduationCap, Copy, Edit, Trash2, ChevronDown } from 'lucide-react'

export function CustomRoles() {
  const customRoles = [
    {
      id: 'data-protection-officer',
      name: 'Data Protection Officer',
      description: 'Specialized role for GDPR compliance and data privacy management. Can manage data processing activities and privacy assessments.',
      icon: Database,
      iconColor: 'bg-green-100 text-green-600',
      userCount: 1,
      users: ['https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg'],
      createdDate: '2 weeks ago'
    },
    {
      id: 'incident-response-coordinator',
      name: 'Incident Response Coordinator',
      description: 'Manages security incident response workflows and coordinates with internal teams and external stakeholders.',
      icon: AlertTriangle,
      iconColor: 'bg-yellow-100 text-yellow-600',
      userCount: 2,
      users: [
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
      ],
      createdDate: '1 month ago'
    },
    {
      id: 'training-administrator',
      name: 'Training Administrator',
      description: 'Creates and manages compliance training programs. Can assign training modules and track completion rates.',
      icon: GraduationCap,
      iconColor: 'bg-indigo-100 text-indigo-600',
      userCount: 3,
      users: [
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
        'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg'
      ],
      createdDate: '3 weeks ago'
    }
  ]

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Custom Roles</h3>
          <p className="text-sm text-gray-600">Organization-specific roles tailored to your compliance needs.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Custom Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Custom Roles</SelectItem>
              <SelectItem value="recent">Recently Created</SelectItem>
              <SelectItem value="most-used">Most Used</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {customRoles.map((role) => (
          <div key={role.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role.iconColor}`}>
                    <role.icon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">{role.name}</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Custom Role
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{role.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {role.users.slice(0, 2).map((avatar, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                    {role.userCount > 2 && (
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                        +{role.userCount - 2}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{role.userCount} user{role.userCount !== 1 ? 's' : ''}</span>
                  <span className="text-xs text-gray-400">• Created {role.createdDate}</span>
                </div>
                <Button variant="link" size="sm" className="text-primary-600 hover:text-primary-700 p-0">
                  Configure Permissions
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}