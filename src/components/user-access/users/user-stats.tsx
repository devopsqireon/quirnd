// src/components/user-access/users/user-stats.tsx
import { Users, UserCheck, Mail, UserX } from 'lucide-react'

export function UserStats() {
  const stats = [
    {
      title: "Total Users",
      value: "247",
      icon: Users,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Active Users",
      value: "234",
      icon: UserCheck,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Pending Invites",
      value: "8",
      icon: Mail,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Suspended",
      value: "5",
      icon: UserX,
      color: "bg-red-100 text-red-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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