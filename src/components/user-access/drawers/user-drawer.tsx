// src/components/user-access/drawers/user-drawer.tsx
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Edit, 
  Shield, 
  Key, 
  Activity, 
  User,
  Building,
  AlertCircle,
  CheckCircle2,
  Settings,
  Download,
  MoreHorizontal,
  Bell,
  Lock,
  History
} from 'lucide-react'

interface UserDrawerProps {
  isOpen: boolean
  onClose: () => void
  userId: string | null
}

interface UserDetails {
  id: string
  name: string
  email: string
  phone?: string
  department: string
  role: string
  roleColor: string
  status: string
  statusColor: string
  lastLogin: string
  joinDate: string
  location?: string
  avatar: string
  permissions: string[]
  recentActivity: Array<{
    action: string
    timestamp: string
    details: string
    type: 'success' | 'warning' | 'info' | 'error'
  }>
  loginHistory: Array<{
    timestamp: string
    location: string
    device: string
    status: 'success' | 'failed'
  }>
  securitySettings: {
    mfaEnabled: boolean
    lastPasswordChange: string
    failedLoginAttempts: number
  }
}

export function UserDrawer({ isOpen, onClose, userId }: UserDrawerProps) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Enhanced mock user data
  const mockUserData: Record<string, UserDetails> = {
    'sarah-johnson': {
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
      permissions: ['Full System Access', 'User Management', 'Policy Management', 'Audit Reports', 'Risk Management', 'Training Administration'],
      recentActivity: [
        {
          action: 'Updated security policy',
          timestamp: '2 hours ago',
          details: 'Modified password requirements policy',
          type: 'success'
        },
        {
          action: 'Approved user access request',
          timestamp: '1 day ago',
          details: 'Granted Michael Chen compliance officer access',
          type: 'info'
        },
        {
          action: 'Generated compliance report',
          timestamp: '3 days ago',
          details: 'Q4 2024 compliance status report',
          type: 'success'
        },
        {
          action: 'Failed login detected',
          timestamp: '1 week ago',
          details: 'Suspicious login attempt from unknown location',
          type: 'warning'
        }
      ],
      loginHistory: [
        {
          timestamp: '2024-01-20 14:30:00',
          location: 'San Francisco, CA',
          device: 'Chrome on MacOS',
          status: 'success'
        },
        {
          timestamp: '2024-01-20 09:15:00',
          location: 'San Francisco, CA',
          device: 'Safari on iPhone',
          status: 'success'
        },
        {
          timestamp: '2024-01-19 16:45:00',
          location: 'Unknown',
          device: 'Firefox on Windows',
          status: 'failed'
        }
      ],
      securitySettings: {
        mfaEnabled: true,
        lastPasswordChange: '3 months ago',
        failedLoginAttempts: 1
      }
    },
    'michael-chen': {
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
      permissions: ['Policy Management', 'Training Management', 'Incident Response', 'Risk Assessment'],
      recentActivity: [
        {
          action: 'Completed training module',
          timestamp: '1 day ago',
          details: 'Data Privacy Fundamentals',
          type: 'success'
        },
        {
          action: 'Created policy document',
          timestamp: '2 days ago',
          details: 'Remote Work Security Guidelines',
          type: 'info'
        }
      ],
      loginHistory: [
        {
          timestamp: '2024-01-19 10:20:00',
          location: 'New York, NY',
          device: 'Chrome on Windows',
          status: 'success'
        }
      ],
      securitySettings: {
        mfaEnabled: false,
        lastPasswordChange: '6 months ago',
        failedLoginAttempts: 0
      }
    }
  }

  useEffect(() => {
    if (userId && mockUserData[userId]) {
      setIsLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        setUserDetails(mockUserData[userId])
        setIsLoading(false)
      }, 300)
    }
  }, [userId])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    return status === 'success' 
      ? <CheckCircle2 className="h-3 w-3 text-green-500" />
      : <AlertCircle className="h-3 w-3 text-red-500" />
  }

  if (!userDetails) {
    return null
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[480px] sm:max-w-none p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Profile
              </SheetTitle>
            </SheetHeader>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-white shadow-md">
                    <AvatarImage src={userDetails.avatar} alt={userDetails.name} />
                    <AvatarFallback className="text-lg bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                      {userDetails.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{userDetails.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{userDetails.department}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className={userDetails.roleColor}>
                        <Shield className="h-3 w-3 mr-1" />
                        {userDetails.role}
                      </Badge>
                      <Badge variant="outline" className={userDetails.statusColor}>
                        {userDetails.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                  <TabsTrigger value="permissions" className="text-xs">Permissions</TabsTrigger>
                  <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
                  <TabsTrigger value="security" className="text-xs">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{userDetails.email}</p>
                          <p className="text-xs text-gray-500">Primary email</p>
                        </div>
                      </div>
                      {userDetails.phone && (
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{userDetails.phone}</p>
                            <p className="text-xs text-gray-500">Mobile phone</p>
                          </div>
                        </div>
                      )}
                      {userDetails.location && (
                        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{userDetails.location}</p>
                            <p className="text-xs text-gray-500">Office location</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Account Information */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Account Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 p-2 rounded-md">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Member since</p>
                          <p className="text-xs text-gray-500">{userDetails.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-md">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Last login</p>
                          <p className="text-xs text-gray-500">{userDetails.lastLogin}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="permissions" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        Assigned Permissions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        {userDetails.permissions.map((permission, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-900">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userDetails.recentActivity.map((activity, index) => (
                          <div key={index} className="flex gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex-shrink-0 mt-0.5">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 leading-5">
                                {activity.action}
                              </p>
                              <p className="text-xs text-gray-600 mt-1 leading-4">
                                {activity.details}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {activity.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  {/* Security Overview */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Multi-Factor Authentication</span>
                        </div>
                        <Badge variant={userDetails.securitySettings.mfaEnabled ? "default" : "destructive"}>
                          {userDetails.securitySettings.mfaEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Password Last Changed</span>
                        </div>
                        <span className="text-sm text-gray-600">{userDetails.securitySettings.lastPasswordChange}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Failed Login Attempts</span>
                        </div>
                        <Badge variant={userDetails.securitySettings.failedLoginAttempts > 0 ? "destructive" : "default"}>
                          {userDetails.securitySettings.failedLoginAttempts}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Login History */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <History className="h-4 w-4" />
                        Recent Logins
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {userDetails.loginHistory.map((login, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                            {getStatusIcon(login.status)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{login.device}</span>
                                <span className="text-xs text-gray-500">{login.timestamp}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{login.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage Access
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}   