import { Settings, CheckCircle, AlertTriangle, Clock, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const integrations = [
  {
    name: 'Amazon Web Services',
    status: 'Connected',
    lastSync: '5 minutes ago',
    icon: '☁️',
    statusColor: 'bg-green-100 text-green-800',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    name: 'Slack',
    status: 'Connected',
    lastSync: '2 minutes ago',
    icon: '💬',
    statusColor: 'bg-green-100 text-green-800',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    name: 'Jira',
    status: 'Error',
    lastSync: 'Authentication failed',
    icon: '📋',
    statusColor: 'bg-red-100 text-red-800',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Google Workspace',
    status: 'Connected',
    lastSync: '1 hour ago',
    icon: '📧',
    statusColor: 'bg-green-100 text-green-800',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    name: 'Microsoft 365',
    status: 'Syncing',
    lastSync: 'Sync in progress...',
    icon: '📊',
    statusColor: 'bg-yellow-100 text-yellow-800',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'GitHub',
    status: 'Not Configured',
    lastSync: 'Setup required',
    icon: '🔧',
    statusColor: 'bg-gray-100 text-gray-800',
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-600'
  }
]

function getStatusIcon(status: string) {
  switch (status) {
    case 'Connected':
      return <CheckCircle className="mr-1 h-3 w-3" />
    case 'Error':
      return <AlertTriangle className="mr-1 h-3 w-3" />
    case 'Syncing':
      return <Clock className="mr-1 h-3 w-3" />
    case 'Not Configured':
      return <XCircle className="mr-1 h-3 w-3" />
    default:
      return <Clock className="mr-1 h-3 w-3" />
  }
}

export function IntegrationsStatus() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Integrations Status</h2>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle>Active Integrations</CardTitle>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Manage Integrations
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${integration.bgColor}`}>
                  <span className={`text-xl ${integration.iconColor}`}>{integration.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{integration.name}</h4>
                  <div className="flex items-center mt-1">
                    <Badge className={`${integration.statusColor} text-xs`}>
                      {getStatusIcon(integration.status)}
                      {integration.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Last sync: {integration.lastSync}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}