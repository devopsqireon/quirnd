// src/components/continuity-recovery/compliance-timeline.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Check, 
  Upload, 
  Clock, 
  AlertTriangle 
} from "lucide-react"

export function ComplianceTimeline() {
  const timelineEvents = [
    {
      id: 1,
      title: "IT Failover Drill completed",
      date: "Nov 15, 2024 at 2:30 PM",
      description: "Successfully tested primary database failover procedures. All systems recovered within RTO.",
      type: "success",
      icon: Check,
      iconColor: "bg-green-100 text-green-600"
    },
    {
      id: 2,
      title: "Updated IT Systems Continuity Plan",
      date: "Nov 12, 2024 at 10:15 AM",
      description: "John Mitchell uploaded version 2.1 with updated recovery procedures and contact information.",
      type: "info",
      icon: Upload,
      iconColor: "bg-blue-100 text-blue-600"
    },
    {
      id: 3,
      title: "Fire Evacuation Drill scheduled",
      date: "Dec 15, 2024 at 10:00 AM",
      description: "Monthly building evacuation drill scheduled. All staff will be notified 24 hours in advance.",
      type: "scheduled",
      icon: Clock,
      iconColor: "bg-yellow-100 text-yellow-600"
    },
    {
      id: 4,
      title: "Plan review overdue",
      date: "Due: Dec 15, 2024",
      description: "Facilities Continuity Plan requires quarterly review. Contact Sarah Chen for scheduling.",
      type: "warning",
      icon: AlertTriangle,
      iconColor: "bg-red-100 text-red-600"
    }
  ]

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <CardTitle>Compliance Timeline</CardTitle>
        <p className="text-sm text-gray-600">Recent activities and upcoming deadlines</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {timelineEvents.map((event, index) => (
              <li key={event.id}>
                <div className={`relative ${index !== timelineEvents.length - 1 ? 'pb-8' : ''}`}>
                  {index !== timelineEvents.length - 1 && (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white ${event.iconColor}`}>
                        <event.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{event.title}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">{event.date}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}