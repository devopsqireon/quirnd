import { 
    Check, 
    Plus, 
    AlertTriangle, 
    File, 
    X, 
    GraduationCap, 
    FileText, 
    Bug, 
    Search,
    Download
  } from 'lucide-react'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  import { Button } from '@/components/ui/button'
  
  const recentActivities = [
    {
      user: 'Sarah Johnson',
      action: 'completed SOC 2 evidence review',
      time: '2 hours ago',
      icon: Check,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      user: 'Mike Chen',
      action: 'added new risk: "API Rate Limiting Failure"',
      time: '4 hours ago',
      icon: Plus,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      user: 'System Alert:',
      action: 'Training completion rate dropped below 80%',
      time: '6 hours ago',
      icon: AlertTriangle,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      user: 'Lisa Rodriguez',
      action: 'updated Data Protection Policy',
      time: '8 hours ago',
      icon: File,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      user: 'Security Incident:',
      action: 'Failed login attempts detected',
      time: '12 hours ago',
      icon: X,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ]
  
  const quickActions = [
    {
      title: 'Report Risk',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Add Control',
      icon: Plus,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Assign Training',
      icon: GraduationCap,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Update Policy',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Log Incident',
      icon: Bug,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Run Audit',
      icon: Search,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ]
  
  export function RecentActivities() {
    return (
      <section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${activity.bgColor}`}>
                      <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700">
                  View All Activities →
                </Button>
              </div>
            </CardContent>
          </Card>
  
          {/* Quick Actions Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{action.title}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Compliance Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }