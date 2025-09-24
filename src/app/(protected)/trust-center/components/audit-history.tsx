// src/components/trust-center/audit-history.tsx
import { Award, Search, Calendar, RotateCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function AuditHistory() {
  const auditEvents = [
    {
      title: 'Initial Certification Audit',
      date: 'March 2024',
      description: 'BSI Group conducted comprehensive stage 1 and stage 2 audits',
      status: 'Certificate Issued',
      statusColor: 'bg-green-100 text-green-800',
      nonConformities: 0,
      opportunities: 3,
      icon: Award,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      title: 'First Surveillance Audit',
      date: 'September 2024',
      description: 'Annual surveillance audit to maintain certification',
      status: 'Passed',
      statusColor: 'bg-green-100 text-green-800',
      nonConformities: 0,
      opportunities: 2,
      icon: Search,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Second Surveillance Audit',
      date: 'March 2025 (Scheduled)',
      description: 'Upcoming surveillance audit scheduled for mid-March 2025',
      status: 'Scheduled',
      statusColor: 'bg-yellow-100 text-yellow-800',
      icon: Calendar,
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100'
    },
    {
      title: 'Renewal Audit',
      date: 'March 2027 (Planned)',
      description: 'Full recertification audit required before certificate expiry',
      status: 'Planned',
      statusColor: 'bg-orange-100 text-orange-800',
      icon: RotateCw,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100'
    }
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Audit History</h2>
        <p className="text-gray-600">Complete timeline of certification and surveillance audits</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {auditEvents.map((event, index) => (
              <div key={index}>
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${event.iconBg} rounded-full flex items-center justify-center`}>
                    <event.icon className={`${event.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                    <div className="mt-3 flex items-center space-x-4">
                      <Badge className={event.statusColor}>
                        {event.status}
                      </Badge>
                      {event.nonConformities !== undefined && (
                        <span className="text-sm text-gray-500">{event.nonConformities} Non-conformities</span>
                      )}
                      {event.opportunities !== undefined && (
                        <span className="text-sm text-gray-500">{event.opportunities} Opportunities for Improvement</span>
                      )}
                    </div>
                  </div>
                </div>
                {index < auditEvents.length - 1 && (
                  <div className="border-l-2 border-gray-200 ml-6 h-8"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}