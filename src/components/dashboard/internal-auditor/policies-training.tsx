// src/components/internal-auditor/policies-training.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export function PoliciesTraining() {
  const departmentTraining = [
    {
      department: "IT Department",
      completed: 42,
      total: 45,
      percentage: 93
    },
    {
      department: "HR Department", 
      completed: 28,
      total: 32,
      percentage: 88
    },
    {
      department: "Operations",
      completed: 85,
      total: 120,
      percentage: 71
    },
    {
      department: "Finance",
      completed: 25,
      total: 28,
      percentage: 89
    },
    {
      department: "Sales & Marketing",
      completed: 48,
      total: 75,
      percentage: 64
    }
  ]

  const trainingPrograms = [
    {
      name: "Information Security Awareness",
      requiredFor: "All Employees",
      completion: 78,
      lastUpdated: "Jan 15, 2024",
      dueDate: "Mar 31, 2024",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      name: "Data Protection & GDPR",
      requiredFor: "All Employees",
      completion: 85,
      lastUpdated: "Dec 20, 2023",
      dueDate: "Feb 28, 2024",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Incident Response Training",
      requiredFor: "IT & Security Team",
      completion: 95,
      lastUpdated: "Jan 10, 2024",
      dueDate: "Apr 15, 2024",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Risk Management Fundamentals",
      requiredFor: "Managers & Above",
      completion: 45,
      lastUpdated: "Feb 1, 2024",
      dueDate: "May 30, 2024",
      status: "Behind Schedule",
      statusColor: "bg-red-100 text-red-800"
    }
  ]

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Policies & Training</h2>
        <p className="text-gray-600">Policy acceptance rates and training completion status across the organization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Policy Status Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Policy Status Summary</CardTitle>
              <Badge variant="secondary" className="text-xs">Read-only</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Accepted Policies</div>
                  <div className="text-sm text-gray-600">285 employees have accepted all required policies</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-xs text-gray-500">285/300</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Pending Policies</div>
                  <div className="text-sm text-gray-600">15 employees have pending policy acknowledgments</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-600">5%</div>
                  <div className="text-xs text-gray-500">15/300</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Recent Policy Updates</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Information Security Policy v2.1</span>
                  <span className="text-gray-500">Updated 3 days ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data Protection Policy v1.3</span>
                  <span className="text-gray-500">Updated 1 week ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Incident Response Policy v1.2</span>
                  <span className="text-gray-500">Updated 2 weeks ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Completion by Department */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Training Completion by Department</CardTitle>
              <Badge variant="secondary" className="text-xs">Read-only</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentTraining.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{dept.department}</div>
                    <div className="text-sm text-gray-600">{dept.completed}/{dept.total} employees completed</div>
                  </div>
                  <div className="flex items-center">
                    <Progress value={dept.percentage} className="w-24 mr-3" />
                    <span className={`text-sm font-medium ${
                      dept.percentage >= 90 ? 'text-green-600' :
                      dept.percentage >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {dept.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Training Programs Overview Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Training Programs Overview</CardTitle>
            <Badge variant="secondary" className="text-xs">Read-only</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Training Program</TableHead>
                  <TableHead>Required For</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingPrograms.map((program, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{program.name}</TableCell>
                    <TableCell>{program.requiredFor}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={program.completion} className="w-16" />
                        <span className="text-sm">{program.completion}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{program.lastUpdated}</TableCell>
                    <TableCell className="text-gray-500">{program.dueDate}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${program.statusColor}`}>
                        {program.status}
                      </Badge>
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