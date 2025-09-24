// src/components/user-access/users/recent-activity.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: 'James Thompson',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
      },
      action: 'completed mandatory compliance training',
      time: '2 hours ago',
      badge: {
        text: 'Training Complete',
        color: 'bg-green-100 text-green-800'
      }
    },
    {
      id: 2,
      user: {
        name: 'Alex Rodriguez',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
      },
      action: 'was assigned Compliance Officer role',
      time: '4 hours ago',
      badge: {
        text: 'Role Assigned',
        color: 'bg-blue-100 text-blue-800'
      }
    },
    {
      id: 3,
      user: {
        name: 'Rachel Green',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg'
      },
      action: 'reported a security incident',
      time: '6 hours ago',
      badge: {
        text: 'Incident Report',
        color: 'bg-red-100 text-red-800'
      }
    }
  ]

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent User Activity</h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>
                    {activity.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user.name}</span> {activity.action}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <div className="flex-shrink-0">
                <Badge className={activity.badge.color}>
                  {activity.badge.text}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="link" className="text-primary-600 hover:text-primary-500 text-sm font-medium p-0">
            View all activity <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}