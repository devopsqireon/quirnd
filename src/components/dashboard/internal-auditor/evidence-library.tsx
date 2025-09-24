// src/components/internal-auditor/evidence-library.tsx
import { Search, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function EvidenceLibrary() {
  const evidenceItems = [
    {
      id: "EV-2024-001",
      title: "Network Security Assessment Report",
      category: "Risk Assessment",
      mappedTo: "R-2024-001, C-NET-001",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
      lastUpdated: "Mar 20, 2024",
      hasAccess: true
    },
    {
      id: "EV-2024-002",
      title: "Access Control Testing Results",
      category: "Control Testing",
      mappedTo: "C-AC-001, C-AC-002",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      lastUpdated: "Mar 18, 2024",
      hasAccess: false
    },
    {
      id: "EV-2024-003",
      title: "Information Security Policy v2.1",
      category: "Policy Document",
      mappedTo: "POL-IS-001",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
      lastUpdated: "Mar 15, 2024",
      hasAccess: true
    },
    {
      id: "EV-2024-004",
      title: "Employee Security Training Records",
      category: "Training Records",
      mappedTo: "TR-SEC-001",
      status: "Missing",
      statusColor: "bg-red-100 text-red-800",
      lastUpdated: "Mar 10, 2024",
      hasAccess: false
    },
    {
      id: "EV-2024-005",
      title: "Incident Response Test Results",
      category: "Incident Reports",
      mappedTo: "INC-2024-TEST-001",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
      lastUpdated: "Mar 8, 2024",
      hasAccess: true
    }
  ]

  return (
    <div className="px-8 py-6 bg-gray-50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Evidence Library Access</h2>
        <p className="text-gray-600">Search and access evidence mapped to risks, controls, and policies</p>
      </div>

      {/* Search & Filters */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Evidence Search & Filters</CardTitle>
            <Badge variant="secondary" className="text-xs">Read-only</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search evidence..." 
                className="pl-10"
              />
            </div>
            
            <Select defaultValue="all-categories">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="risk-assessments">Risk Assessments</SelectItem>
                <SelectItem value="control-testing">Control Testing</SelectItem>
                <SelectItem value="policy-documents">Policy Documents</SelectItem>
                <SelectItem value="training-records">Training Records</SelectItem>
                <SelectItem value="incident-reports">Incident Reports</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-status">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="missing">Missing</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all-departments">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-departments">All Departments</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Library Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Evidence Library</CardTitle>
            <div className="flex items-center space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
                <Download className="mr-2 w-4 h-4" />
                Download Package
              </Button>
              <Badge variant="secondary" className="text-xs">Read-only</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Evidence ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Mapped To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evidenceItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-sm">{item.mappedTo}</TableCell>
                    <TableCell>
                      <Badge className={`text-xs ${item.statusColor}`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{item.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex space-x-3">
                        <span className={`cursor-pointer ${
                          item.hasAccess ? 'text-blue-600 hover:text-blue-900' : 'text-gray-400'
                        }`}>
                          View
                        </span>
                        <span className={`cursor-pointer ${
                          item.hasAccess ? 'text-blue-600 hover:text-blue-900' : 'text-gray-400'
                        }`}>
                          Download
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing 1-5 of 127 evidence items
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button size="sm" className="bg-blue-600">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}