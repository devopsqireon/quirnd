// src/app/(protected)/organization-structure/components/UserProfileDrawer.tsx
import { X, AlertTriangle, Shield, FileText, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface User {
  id?: string
  name?: string
  email?: string
  role?: string
  department?: string
  status?: 'active' | 'pending' | 'suspended'
  lastLogin?: string
  avatar?: string
}

interface UserProfileDrawerProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export function UserProfileDrawer({ isOpen, onClose, user }: UserProfileDrawerProps) {
  if (!user) return null

  const responsibilities = [
    {
      title: 'Risks Owned',
      count: 8,
      icon: AlertTriangle,
      color: 'text-orange-500'
    },
    {
      title: 'Controls Owned',
      count: 12,
      icon: Shield,
      color: 'text-blue-500'
    },
    {
      title: 'Policies Authored',
      count: 5,
      icon: FileText,
      color: 'text-purple-500'
    },
    {
      title: 'Tasks Assigned',
      count: 3,
      icon: CheckSquare,
      color: 'text-green-500'
    }
  ]

  const trainingStatus = [
    {
      module: 'ISO 27001 Awareness',
      status: 'completed',
      statusColor: 'text-green-600'
    },
    {
      module: 'Data Privacy Training',
      status: 'in-progress',
      statusColor: 'text-yellow-600'
    },
    {
      module: 'Security Awareness',
      status: 'not-started',
      statusColor: 'text-red-600'
    }
  ]

  function getStatusText(status: string) {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'not-started':
        return 'Not Started'
      default:
        return status
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">User Profile</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center mb-6">
              <img 
                src={user.avatar || '/api/placeholder/80/80'} 
                alt="Profile" 
                className="w-20 h-20 rounded-full mx-auto mb-4" 
              />
              <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-2">
                {user.role}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Department:</span>
                    <span className="text-gray-900">{user.department}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className={cn(
                      "capitalize",
                      user.status === 'active' ? 'text-green-600' : 
                      user.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    )}>
                      {user.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Login:</span>
                    <span className="text-gray-900">{user.lastLogin}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Assigned Responsibilities</h4>
                <div className="space-y-3">
                  {responsibilities.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <IconComponent className={`w-4 h-4 mr-2 ${item.color}`} />
                          <span className="text-sm text-gray-900">{item.title}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{item.count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Training Status</h4>
                <div className="space-y-3">
                  {trainingStatus.map((training, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{training.module}</span>
                      <span className={`text-sm ${training.statusColor}`}>
                        {getStatusText(training.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6">
            <div className="flex space-x-3">
              <Button className="flex-1">
                Edit Profile
              </Button>
              <Button variant="outline">
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}