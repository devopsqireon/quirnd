// src/app/(protected)/organization-structure/components/UserStats.tsx
import { Users, UserCheck, Clock, UserX, ArrowUp, Check, Mail, AlertTriangle } from 'lucide-react'

export function UserStats() {
  const stats = [
    {
      title: 'Total Users',
      value: '97',
      icon: Users,
      change: '+12%',
      changeType: 'positive',
      subtitle: 'from last month',
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '89',
      icon: UserCheck,
      change: '91.7%',
      changeType: 'positive',
      subtitle: 'active rate',
      color: 'green'
    },
    {
      title: 'Pending Invites',
      value: '5',
      icon: Clock,
      change: 'Awaiting response',
      changeType: 'neutral',
      subtitle: '',
      color: 'yellow'
    },
    {
      title: 'Suspended',
      value: '3',
      icon: UserX,
      change: 'Requires attention',
      changeType: 'negative',
      subtitle: '',
      color: 'red'
    }
  ]

  function getIconBg(color: string) {
    switch (color) {
      case 'blue':
        return 'bg-blue-100'
      case 'green':
        return 'bg-green-100'
      case 'yellow':
        return 'bg-yellow-100'
      case 'red':
        return 'bg-red-100'
      default:
        return 'bg-gray-100'
    }
  }

  function getIconColor(color: string) {
    switch (color) {
      case 'blue':
        return 'text-blue-600'
      case 'green':
        return 'text-green-600'
      case 'yellow':
        return 'text-yellow-600'
      case 'red':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  function getChangeColor(changeType: string) {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-yellow-600'
    }
  }

  function getChangeIcon(changeType: string) {
    switch (changeType) {
      case 'positive':
        return ArrowUp
      case 'negative':
        return AlertTriangle
      default:
        return Mail
    }
  }

  return (
    <section className="p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        User Analytics & Compliance Metrics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          const ChangeIconComponent = getChangeIcon(stat.changeType)
          
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${getIconBg(stat.color)} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-4 h-4 ${getIconColor(stat.color)}`} />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className={`flex items-center text-sm ${getChangeColor(stat.changeType)}`}>
                  <ChangeIconComponent className="w-3 h-3 mr-1" />
                  <span>{stat.change}</span>
                  {stat.subtitle && <span className="ml-1">{stat.subtitle}</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}