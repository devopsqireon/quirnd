// src/app/(protected)/organization-structure/components/SystemHealth.tsx
import { AlertTriangle, Clock } from 'lucide-react'

export function SystemHealth() {
  const systemStatus = [
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

  const securityAlerts = [
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

  function getStatusStyle(status: string) {
    switch (status) {
      case 'operational':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          dot: 'bg-green-500'
        }
      case 'degraded':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-600',
          dot: 'bg-yellow-500'
        }
      case 'down':
        return {
          bg: 'bg-red-50',
          text: 'text-red-600',
          dot: 'bg-red-500'
        }
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          dot: 'bg-gray-500'
        }
    }
  }

  return (
    <section className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            {systemStatus.map((system, index) => {
              const styles = getStatusStyle(system.status)
              return (
                <div key={index} className={`flex items-center justify-between p-3 ${styles.bg} rounded-lg`}>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 ${styles.dot} rounded-full mr-3`}></div>
                    <span className="text-sm font-medium text-gray-900">{system.service}</span>
                  </div>
                  <span className={`text-sm ${styles.text}`}>{system.statusText}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Alerts</h3>
          <div className="space-y-4">
            {securityAlerts.map((alert, index) => {
              const IconComponent = alert.icon
              return (
                <div key={index} className={`flex items-start p-3 ${alert.bgColor} rounded-lg`}>
                  <div className="flex-shrink-0">
                    <IconComponent className={`${alert.iconColor} w-4 h-4 mt-1`} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}