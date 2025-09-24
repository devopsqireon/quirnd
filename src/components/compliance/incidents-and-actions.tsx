import { AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const incidentSummary = [
  {
    title: 'Open Incidents',
    value: '12',
    icon: AlertTriangle,
    color: 'bg-red-100 text-red-600'
  },
  {
    title: 'Resolved This Month',
    value: '47',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Avg Resolution Days',
    value: '2.4',
    icon: Clock,
    color: 'bg-blue-100 text-blue-600'
  }
]

const recentIncidents = [
  {
    title: 'Data Access Violation',
    time: '2 hours ago',
    severity: 'Critical',
    status: 'Investigating',
    severityColor: 'bg-red-100 text-red-800',
    statusColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    title: 'Failed Login Attempts',
    time: '5 hours ago',
    severity: 'High',
    status: 'In Progress',
    severityColor: 'bg-orange-100 text-orange-800',
    statusColor: 'bg-blue-100 text-blue-800'
  },
  {
    title: 'Policy Violation Alert',
    time: '1 day ago',
    severity: 'Medium',
    status: 'Resolved',
    severityColor: 'bg-yellow-100 text-yellow-800',
    statusColor: 'bg-green-100 text-green-800'
  }
]

const correctiveActions = [
  { label: 'Open', count: 24, percentage: 35, color: 'bg-red-600' },
  { label: 'In Review', count: 18, percentage: 26, color: 'bg-yellow-600' },
  { label: 'Closed', count: 27, percentage: 39, color: 'bg-green-600' }
]

export function IncidentsAndActions() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Incidents & Corrective Actions</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {incidentSummary.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle>Recent Incidents</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">Incident</th>
                    <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">Severity</th>
                    <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentIncidents.map((incident, index) => (
                    <tr key={index} className="cursor-pointer hover:bg-gray-50">
                      <td className="py-3">
                        <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                        <div className="text-xs text-gray-500">{incident.time}</div>
                      </td>
                      <td className="py-3">
                        <Badge className={incident.severityColor}>{incident.severity}</Badge>
                      </td>
                      <td className="py-3">
                        <Badge className={incident.statusColor}>{incident.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Corrective Actions Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Corrective Actions Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {correctiveActions.map((action, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{action.label}</span>
                    <span className="text-sm text-gray-500">{action.count} actions</span>
                  </div>
                  <Progress value={action.percentage} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {correctiveActions.map((action, index) => (
                <div key={index}>
                  <div className={`text-lg font-semibold ${action.color.replace('bg-', 'text-')}`}>{action.count}</div>
                  <div className="text-xs text-gray-500">{action.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}