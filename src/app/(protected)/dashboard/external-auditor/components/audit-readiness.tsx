// src/app/(protected)/dashboard/external-dashboard/components/audit-readiness.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Download } from 'lucide-react'

interface ProgressItemProps {
  label: string
  percentage: number
  color: string
}

function ProgressItem({ label, percentage, color }: ProgressItemProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{percentage}%</span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-${label === 'Overall Completion' ? '3' : '2'}`}
      />
    </div>
  )
}

const progressItems = [
  { label: 'Overall Completion', percentage: 87 },
  { label: 'Policy Documentation', percentage: 95 },
  { label: 'Technical Controls', percentage: 82 },
  { label: 'Training Records', percentage: 78 }
]

const upcomingDeadlines = [
  {
    title: 'ISO 27001 Surveillance Audit',
    date: 'March 20, 2024',
    priority: 'High Priority',
    daysLeft: '15 days',
    color: 'red'
  },
  {
    title: 'HIPAA Compliance Review',
    date: 'April 15, 2024',
    priority: 'Medium Priority',
    daysLeft: '41 days',
    color: 'yellow'
  },
  {
    title: 'SOC 2 Type II Examination',
    date: 'May 25, 2024',
    priority: 'Medium Priority',
    daysLeft: '81 days',
    color: 'blue'
  }
]

export function AuditReadiness() {
  return (
    <section className="mb-8">
      <Card className="border border-gray-100">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Audit Readiness Snapshot</CardTitle>
              <CardDescription>Evidence collection progress and upcoming deadlines</CardDescription>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download Readiness Report
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Evidence Collection Progress</h3>
              <div className="space-y-4">
                {progressItems.map((item) => (
                  <ProgressItem 
                    key={item.label}
                    label={item.label}
                    percentage={item.percentage}
                    color="green"
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Upcoming Audit Deadlines</h3>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className={`flex items-center p-3 border border-${deadline.color}-200 bg-${deadline.color}-50 rounded-lg`}>
                    <div className={`w-3 h-3 bg-${deadline.color}-500 rounded-full mr-3`} />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{deadline.title}</div>
                      <div className="text-sm text-gray-600">{deadline.date} • {deadline.priority}</div>
                    </div>
                    <div className={`text-sm font-medium text-${deadline.color}-600`}>{deadline.daysLeft}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}