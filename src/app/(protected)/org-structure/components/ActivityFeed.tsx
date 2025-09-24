// src/app/(protected)/organization-structure/components/ActivityFeed.tsx
import { UserPlus, UserPen, Key, UserX } from 'lucide-react'

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: 'user_invited',
      icon: UserPlus,
      iconBg: 'bg-green-500',
      title: 'Emily Rodriguez was invited to the platform',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'role_updated',
      icon: UserPen,
      iconBg: 'bg-blue-500',
      title: "Michael Chen's role was updated to Risk Owner",
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'password_reset',
      icon: Key,
      iconBg: 'bg-yellow-500',
      title: 'Password reset requested for David Thompson',
      time: '6 hours ago'
    },
    {
      id: 4,
      type: 'user_suspended',
      icon: UserX,
      iconBg: 'bg-red-500',
      title: 'John Doe account was suspended',
      time: '1 day ago'
    }
  ]

  return (
    <section className="p-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent User Activity</h3>
        
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, index) => {
              const IconComponent = activity.icon
              const isLast = index === activities.length - 1
              
              return (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {!isLast && (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center ring-8 ring-white`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {activity.title.includes('was invited') && activity.title.split(' was invited')[0]}
                              {activity.title.includes("'s role was updated") && activity.title.split("'s role was updated")[0]}
                              {activity.title.includes('Password reset requested for') && activity.title.split('Password reset requested for ')[1]}
                              {activity.title.includes('account was suspended') && activity.title.split(' account was suspended')[0]}
                            </span>
                            {activity.title.includes('was invited') && ' was invited to the platform'}
                            {activity.title.includes("'s role was updated") && "'s role was updated to Risk Owner"}
                            {activity.title.includes('Password reset requested for') && 'Password reset requested for '}
                            {activity.title.includes('account was suspended') && ' account was suspended'}
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}