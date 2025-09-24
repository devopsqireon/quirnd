// src/components/user-access/roles/role-stats.tsx
import { Shield, Settings, Key } from 'lucide-react'

export function RoleStats() {
  const stats = [
    {
      title: "System Roles",
      value: "4",
      icon: Shield,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Custom Roles",
      value: "7",
      icon: Settings,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Total Permissions",
      value: "42",
      icon: Key,
      color: "bg-green-100 text-green-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                  <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}