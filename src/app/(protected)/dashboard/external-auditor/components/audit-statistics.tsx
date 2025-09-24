// src/app/(protected)/dashboard/external-dashboard/components/audit-statistics.tsx
import { Card, CardContent } from '@/components/ui/card'
import { ClipboardCheck, AlertTriangle, Lightbulb, FileText, ArrowUp, Check } from 'lucide-react'

const statistics = [
  {
    title: 'Total Controls Reviewed',
    value: '114',
    subtitle: '95% Complete',
    icon: ClipboardCheck,
    iconColor: 'blue',
    trend: 'up',
    trendColor: 'green'
  },
  {
    title: 'Non-Conformities Raised',
    value: '2',
    subtitle: '1 Major, 1 Minor',
    icon: AlertTriangle,
    iconColor: 'red',
    trend: null,
    trendColor: 'red'
  },
  {
    title: 'Opportunities for Improvement',
    value: '1',
    subtitle: 'Medium Priority',
    icon: Lightbulb,
    iconColor: 'orange',
    trend: null,
    trendColor: 'orange'
  },
  {
    title: 'Evidence Documents',
    value: '46',
    subtitle: '87% Available',
    icon: FileText,
    iconColor: 'green',
    trend: 'up',
    trendColor: 'green'
  }
]

export function AuditStatistics() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.iconColor}-100 rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`text-${stat.iconColor}-600 text-lg`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.title}</div>
                <div className={`mt-2 text-xs font-medium ${
                  stat.trend === 'up' ? `text-${stat.trendColor}-600` : `text-${stat.trendColor}-600`
                }`}>
                  {stat.trend === 'up' && <ArrowUp className="w-3 h-3 inline mr-1" />}
                  {stat.trend === null && stat.iconColor === 'green' && <Check className="w-3 h-3 inline mr-1" />}
                  {stat.subtitle}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}