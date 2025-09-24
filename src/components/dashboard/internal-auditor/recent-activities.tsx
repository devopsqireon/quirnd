// src/components/internal-auditor/recent-activities.tsx
import { FileText, Settings, Bug, GraduationCap, User, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export function RecentActivities() {
  const activities = [
    {
      type: "Policy Updated",
      title: "Information Security Policy v2.1 has been updated and published",
      user: "John Smith (Compliance Officer)",
      tag: "POL-IS-001",
      time: "2 hours ago",
      icon: FileText,
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      type: "Control Status Updated",
      title: 'Access Control C-AC-001 status changed from "In Progress" to "Implemented"',
      user: "Sarah Wilson (IT Security)",
      tag: "C-AC-001",
      time: "4 hours ago",
      icon: Settings,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      type: "New Incident Reported",
      title: "Security incident INC-2024-003 reported: Unauthorized access attempt detected",
      user: "Security System (Automated)",
      tag: "INC-2024-003",
      time: "6 hours ago",
      icon: Bug,
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      type: "Training Completed",
      title: "Employee Mike Johnson completed Information Security Awareness training",
      user: "Mike Johnson (Operations)",
      tag: "TR-SEC-001",
      time: "8 hours ago",
      icon: GraduationCap,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ]

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Activities (Audit Trail)</h2>
        <p className="text-gray-600">Log of ISMS activities including policy acceptance, control updates, and incidents</p>
      </div>

      {/* Activity Filters */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Activity Filters</CardTitle>
            <Badge variant="secondary" className="text-xs">Read-only</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select defaultValue="all-modules">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-modules">All Modules</SelectItem>
                <SelectItem value="risk-management">Risk Management</SelectItem>
                <SelectItem value="control-management">Control Management</SelectItem>
                <SelectItem value="policy-management">Policy Management</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="incidents">Incidents</SelectItem>
                <SelectItem value="evidence">Evidence</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-users">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-users">All Users</SelectItem>
                <SelectItem value="system-admin">System Admin</SelectItem>
                <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                <SelectItem value="risk-manager">Risk Manager</SelectItem>
                <SelectItem value="control-owner">Control Owner</SelectItem>
              </SelectContent>
            </Select>
            
            <Input type="date" />
            <Input type="date" />
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center`}>
                    <activity.icon className={`${activity.iconColor} w-4 h-4`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <p className="text-sm text-gray-600">{activity.title}</p>
                  <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <User className="mr-1 w-3 h-3" />
                      {activity.user}
                    </span>
                    <span className="flex items-center">
                      <Tag className="mr-1 w-3 h-3" />
                      {activity.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}