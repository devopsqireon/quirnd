// src/components/internal-auditor/risks-controls-snapshot.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function RisksControlsSnapshot() {
  const topRisks = [
    {
      id: "R-2024-001",
      title: "Data Breach via Phishing",
      department: "IT Department",
      severity: "Critical",
      impact: "9/10",
      color: "bg-red-50 border-red-200"
    },
    {
      id: "R-2024-012",
      title: "Unauthorized Access to HR Systems",
      department: "HR Department",
      severity: "High",
      impact: "7/10",
      color: "bg-orange-50 border-orange-200"
    },
    {
      id: "R-2024-008",
      title: "Supply Chain Disruption",
      department: "Operations",
      severity: "High",
      impact: "6/10",
      color: "bg-orange-50 border-orange-200"
    },
    {
      id: "R-2024-015",
      title: "Financial Reporting Errors",
      department: "Finance",
      severity: "Medium",
      impact: "5/10",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      id: "R-2024-003",
      title: "Employee Data Privacy Breach",
      department: "HR Department",
      severity: "Medium",
      impact: "4/10",
      color: "bg-yellow-50 border-yellow-200"
    }
  ]

  const departmentControls = [
    {
      department: "IT Department",
      total: 85,
      implemented: 78,
      inProgress: 5,
      overdue: 2,
      completion: 92
    },
    {
      department: "HR Department",
      total: 45,
      implemented: 42,
      inProgress: 2,
      overdue: 1,
      completion: 93
    },
    {
      department: "Operations",
      total: 35,
      implemented: 32,
      inProgress: 3,
      overdue: 0,
      completion: 91
    },
    {
      department: "Finance",
      total: 35,
      implemented: 32,
      inProgress: 2,
      overdue: 1,
      completion: 91
    }
  ]

  return (
    <div className="px-8 py-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Risks & Controls Snapshot</h2>
        <p className="text-gray-600">Critical risks and control implementation status across departments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top 5 Open Risks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Top 5 Open Risks</CardTitle>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="secondary" className="text-xs">Read-only</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRisks.map((risk, index) => (
                <div key={index} className={`flex items-center justify-between p-3 border rounded-lg ${risk.color}`}>
                  <div>
                    <div className="font-medium text-gray-900">{risk.title}</div>
                    <div className="text-sm text-gray-600">{risk.department} • Risk ID: {risk.id}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      risk.severity === 'Critical' ? 'text-red-600' :
                      risk.severity === 'High' ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {risk.severity}
                    </div>
                    <div className="text-xs text-gray-500">Impact: {risk.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Control Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Control Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg mb-4">
              <p className="text-gray-500">Control Status Chart Placeholder</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">184</div>
                <div className="text-sm text-gray-600">Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">4</div>
                <div className="text-sm text-gray-600">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls by Department Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Controls by Department</CardTitle>
            <Badge variant="secondary" className="text-xs">Read-only</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Total Controls</TableHead>
                  <TableHead>Implemented</TableHead>
                  <TableHead>In Progress</TableHead>
                  <TableHead>Overdue</TableHead>
                  <TableHead>Completion %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentControls.map((dept, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{dept.department}</TableCell>
                    <TableCell>{dept.total}</TableCell>
                    <TableCell className="text-green-600">{dept.implemented}</TableCell>
                    <TableCell className="text-yellow-600">{dept.inProgress}</TableCell>
                    <TableCell className="text-red-600">{dept.overdue}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={dept.completion} className="w-16" />
                        <span className="text-sm">{dept.completion}%</span>
                      </div>
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