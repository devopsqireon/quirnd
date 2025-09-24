// src/components/integrations/integration-activity-log.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Bell, AlertTriangle, X, Plus } from "lucide-react"

export function IntegrationActivityLog() {
  const activities = [
    {
      type: "success",
      icon: Check,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "AWS integration sync completed",
      description: "Discovered 47 new EC2 instances and 12 S3 buckets",
      time: "2 minutes ago"
    },
    {
      type: "info",
      icon: Bell,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Slack notification sent",
      description: "Compliance alert sent to #security-team channel",
      time: "15 minutes ago"
    },
    {
      type: "warning",
      icon: AlertTriangle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      title: "Azure API rate limit warning",
      description: "Approaching API quota limit, sync frequency reduced",
      time: "1 hour ago"
    },
    {
      type: "error",
      icon: X,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "ServiceNow connection failed",
      description: "Authentication error - credentials may have expired",
      time: "3 hours ago"
    },
    {
      type: "success",
      icon: Plus,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "New integration added",
      description: "Splunk SIEM integration configured by John Smith",
      time: "1 day ago"
    }
  ]

  return (
    <section className="px-8 py-6 border-t border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
        <p className="text-sm text-gray-600">
          Monitor integration activities, sync status, and error logs.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Activity Log</CardTitle>
            <div className="flex items-center space-x-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Integrations</SelectItem>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="azure">Azure</SelectItem>
                  <SelectItem value="slack">Slack</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="24h">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <div key={index} className="py-4 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.iconBg}`}>
                    <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}