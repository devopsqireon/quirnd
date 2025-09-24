// src/components/continuity-recovery/system-recovery-tests.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Plus, 
  Database, 
  Globe, 
  Mail, 
  Check, 
  X, 
  FileText,
  TrendingUp,
  Bug
} from "lucide-react"

export function SystemRecoveryTests() {
  const recoveryTests = [
    {
      id: 1,
      system: {
        name: "Primary Database",
        description: "PostgreSQL Cluster",
        icon: Database,
        iconColor: "bg-blue-100 text-blue-600"
      },
      testDate: "Nov 15, 2024",
      recoveryTime: "1h 23m",
      targetRTO: "2h 00m",
      status: "Passed",
      evidence: "Test Report",
      recoveryTimeColor: "text-green-600",
      statusColor: "bg-green-100 text-green-800",
      evidenceIcon: FileText,
      evidenceColor: "text-blue-600 hover:text-blue-900"
    },
    {
      id: 2,
      system: {
        name: "Web Application",
        description: "Load Balancer Failover",
        icon: Globe,
        iconColor: "bg-green-100 text-green-600"
      },
      testDate: "Nov 10, 2024",
      recoveryTime: "45m",
      targetRTO: "1h 00m",
      status: "Passed",
      evidence: "Metrics",
      recoveryTimeColor: "text-green-600",
      statusColor: "bg-green-100 text-green-800",
      evidenceIcon: TrendingUp,
      evidenceColor: "text-blue-600 hover:text-blue-900"
    },
    {
      id: 3,
      system: {
        name: "Email System",
        description: "Exchange Server",
        icon: Mail,
        iconColor: "bg-red-100 text-red-600"
      },
      testDate: "Oct 25, 2024",
      recoveryTime: "6h 15m",
      targetRTO: "4h 00m",
      status: "Failed",
      evidence: "Issue Log",
      recoveryTimeColor: "text-red-600",
      statusColor: "bg-red-100 text-red-800",
      evidenceIcon: Bug,
      evidenceColor: "text-red-600 hover:text-red-900"
    }
  ]

  const getStatusIcon = (status: string) => {
    return status === "Passed" ? Check : X
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Recovery Tests</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Track disaster recovery testing and validation activities
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Log Recovery Test
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>System</TableHead>
              <TableHead>Test Date</TableHead>
              <TableHead>Recovery Time</TableHead>
              <TableHead>Target RTO</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Evidence</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recoveryTests.map((test) => {
              const StatusIcon = getStatusIcon(test.status)
              return (
                <TableRow key={test.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${test.system.iconColor}`}>
                        <test.system.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{test.system.name}</div>
                        <div className="text-sm text-gray-500">{test.system.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{test.testDate}</TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${test.recoveryTimeColor}`}>
                      {test.recoveryTime}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{test.targetRTO}</TableCell>
                  <TableCell>
                    <Badge className={test.statusColor}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {test.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`text-sm flex items-center ${test.evidenceColor}`}
                    >
                      <test.evidenceIcon className="mr-1 h-3 w-3" />
                      {test.evidence}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {test.status === "Failed" ? "Remediate" : "View Details"}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}