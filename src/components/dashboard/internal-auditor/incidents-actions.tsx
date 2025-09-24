// src/components/internal-auditor/incidents-actions.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function IncidentsActions() {
  const recentIncidents = [
    {
      id: "INC-2024-003",
      title: "Unauthorized Access Attempt",
      description: "Multiple failed login attempts detected on admin accounts",
      severity: "Critical",
      severityColor: "bg-red-50 border-red-200",
      severityBadge: "bg-red-100 text-red-800",
      status: "Under Investigation",
      reported: "2 days ago"
    },
    {
      id: "INC-2024-002", 
      title: "Phishing Email Campaign",
      description: "Employees received suspicious emails with malicious attachments",
      severity: "High",
      severityColor: "bg-orange-50 border-orange-200",
      severityBadge: "bg-orange-100 text-orange-800",
      status: "Resolved",
      reported: "5 days ago"
    },
    {
      id: "INC-2024-001",
      title: "System Performance Issue", 
      description: "Database server experiencing high CPU usage",
      severity: "Medium",
      severityColor: "bg-yellow-50 border-yellow-200",
      severityBadge: "bg-yellow-100 text-yellow-800",
      status: "Resolved",
      reported: "1 week ago"
    }
  ]

  const correctiveActions = [
    {
      id: "CA-2024-008",
      description: "Implement MFA for all admin accounts",
      owner: "IT Security Team",
      dueDate: "Mar 15, 2024",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: "CA-2024-007",
      description: "Update email security training", 
      owner: "HR Department",
      dueDate: "Feb 28, 2024",
      status: "Closed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: "CA-2024-006",
      description: "Upgrade firewall configuration",
      owner: "Network Team",
      dueDate: "Mar 30, 2024", 
      status: "Open",
      statusColor: "bg-red-100 text-red-800"
    },
    {
      id: "CA-2024-005",
      description: "Review access control policies",
      owner: "Compliance Officer",
      dueDate: "Feb 15, 2024",
      status: "Closed", 
      statusColor: "bg-green-100 text-green-800"
    }
  ]

  return (
    <div className="px-8 py-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Incidents & Corrective Actions</h2>
        <p className="text-gray-600">Recent security incidents and the progress of corrective actions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Incidents</CardTitle>
              <Badge variant="secondary" className="text-xs">Read-only</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <div key={index} className={`border rounded-lg p-4 ${incident.severityColor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${
                        incident.severity === 'Critical' ? 'bg-red-500' :
                        incident.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}></span>
                      <span className="font-medium text-gray-900">{incident.id}</span>
                    </div>
                    <Badge className={`text-xs ${incident.severityBadge}`}>
                      {incident.severity}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{incident.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Reported: {incident.reported}</span>
                    <span>Status: {incident.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Corrective Actions Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Corrective Actions Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg mb-4">
              <p className="text-gray-500">Corrective Actions Chart Placeholder</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">8</div>
                <div className="text-sm text-gray-600">Open</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">15</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">42</div>
                <div className="text-sm text-gray-600">Closed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Corrective Actions Details Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Corrective Actions Details</CardTitle>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="text-xs">Read-only</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Evidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {correctiveActions.map((action, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{action.id}</TableCell>
                    <TableCell>{action.description}</TableCell>
                    <TableCell>{action.owner}</TableCell>
                    <TableCell className="text-gray-500">{action.dueDate}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${action.statusColor}`}>
                        {action.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-blue-600 hover:text-blue-900 cursor-pointer">
                        View Evidence
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}