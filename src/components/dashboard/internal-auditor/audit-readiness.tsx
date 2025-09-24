// src/components/internal-auditor/audit-readiness.tsx
import { PieChart, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export function AuditReadiness() {
  const evidenceProgress = [
    { category: "Risk Assessments", progress: 85 },
    { category: "Control Testing", progress: 72 },
    { category: "Policy Documentation", progress: 95 },
    { category: "Training Records", progress: 78 },
    { category: "Incident Reports", progress: 100 }
  ]

  const upcomingAudits = [
    {
      name: "ISO 27001 Certification Audit",
      description: "External audit by certification body",
      dueDate: "April 15, 2024",
      remaining: "23 days remaining",
      priority: "Critical",
      priorityColor: "bg-red-50 border-red-200",
      priorityBadge: "bg-red-100 text-red-800"
    },
    {
      name: "Internal ISMS Review",
      description: "Quarterly management review", 
      dueDate: "March 31, 2024",
      remaining: "8 days remaining",
      priority: "High",
      priorityColor: "bg-orange-50 border-orange-200",
      priorityBadge: "bg-orange-100 text-orange-800"
    },
    {
      name: "Risk Assessment Update",
      description: "Annual risk assessment review",
      dueDate: "May 30, 2024", 
      remaining: "67 days remaining",
      priority: "Medium",
      priorityColor: "bg-yellow-50 border-yellow-200",
      priorityBadge: "bg-yellow-100 text-yellow-800"
    }
  ]

  const evidenceCategories = [
    {
      category: "Risk Management",
      required: 45,
      collected: 38,
      pending: 7,
      progress: 84,
      lastUpdated: "2 days ago"
    },
    {
      category: "Access Control",
      required: 32,
      collected: 25,
      pending: 7,
      progress: 78,
      lastUpdated: "1 day ago"
    },
    {
      category: "Incident Management",
      required: 28,
      collected: 28,
      pending: 0,
      progress: 100,
      lastUpdated: "3 days ago"
    },
    {
      category: "Business Continuity",
      required: 20,
      collected: 12,
      pending: 8,
      progress: 60,
      lastUpdated: "5 days ago"
    }
  ]

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Audit Readiness Snapshot</h2>
        <p className="text-gray-600">Track evidence collection progress and upcoming audit deadlines</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Evidence Collection Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Evidence Collection Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evidenceProgress.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm text-gray-500">{item.progress}%</span>
                  </div>
                  <Progress 
                    value={item.progress} 
                    className="w-full h-2 mt-1"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <PieChart className="text-blue-600 mr-2 w-4 h-4" />
                <span className="font-medium text-blue-900">Overall Progress: 86%</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Good progress! Focus on control testing completion.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Audits & Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Audits & Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAudits.map((audit, index) => (
                <div key={index} className={`border rounded-lg p-4 ${audit.priorityColor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{audit.name}</span>
                    <Badge className={`text-xs ${audit.priorityBadge}`}>
                      {audit.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{audit.description}</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Due: {audit.dueDate}</span>
                    <span className={`font-medium ${
                      audit.priority === 'Critical' ? 'text-red-600' :
                      audit.priority === 'High' ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {audit.remaining}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="mr-2 w-4 h-4" />
                Export Audit Readiness Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evidence Collection Status by Category Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evidence Collection Status by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evidence Category</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Collected</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evidenceCategories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{category.category}</TableCell>
                    <TableCell>{category.required}</TableCell>
                    <TableCell className="text-green-600">{category.collected}</TableCell>
                    <TableCell className={category.pending === 0 ? "text-gray-400" : 
                      category.pending > 5 ? "text-red-600" : "text-orange-600"}>
                      {category.pending}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={category.progress} className="w-16" />
                        <span className="text-sm">{category.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{category.lastUpdated}</TableCell>
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