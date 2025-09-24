// src/app/(protected)/dashboard/external-dashboard/components/audit-timeline.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Flag, Check, Calendar } from 'lucide-react'

const timelineEvents = [
  {
    title: 'Audit Initiation',
    date: 'March 5, 2024',
    description: 'External audit commenced. Initial documentation review and scope definition completed.',
    status: 'Current',
    statusColor: 'blue',
    icon: Flag,
    completed: false
  },
  {
    title: 'Documentation Review',
    date: 'February 20, 2024',
    description: 'Comprehensive review of policies, procedures, and evidence documentation.',
    status: 'Completed',
    statusColor: 'green',
    icon: Check,
    completed: true
  },
  {
    title: 'Previous Surveillance Audit',
    date: 'March 15, 2023',
    description: 'Annual surveillance audit completed successfully with 2 minor non-conformities addressed.',
    status: 'Passed',
    statusColor: 'green',
    icon: Check,
    completed: true
  },
  {
    title: 'Closing Meeting',
    date: 'March 22, 2024',
    description: 'Final audit findings presentation and corrective action plan discussion.',
    status: 'Scheduled',
    statusColor: 'gray',
    icon: Calendar,
    completed: false
  }
]

export function AuditTimeline() {
  return (
    <section className="mb-8">
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle>Audit Timeline & History</CardTitle>
          <CardDescription>Previous audit activities and upcoming milestones</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon
              return (
                <div key={index} className={`relative flex items-start ${index !== timelineEvents.length - 1 ? 'mb-8' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 ${
                    event.completed ? 'bg-green-600' : 
                    event.status === 'Current' ? 'bg-blue-600' : 'bg-gray-300'
                  } rounded-full flex items-center justify-center z-10`}>
                    <IconComponent className="text-white text-sm" />
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <Badge 
                        variant={
                          event.statusColor === 'blue' ? 'default' : 
                          event.statusColor === 'green' ? 'secondary' : 'outline'
                        }
                        className={
                          event.statusColor === 'blue' ? 'bg-blue-100 text-blue-800' : 
                          event.statusColor === 'green' ? 'bg-green-100 text-green-800' : ''
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{event.date}</p>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}