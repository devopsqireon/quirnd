// src/components/continuity-recovery/disaster-recovery-plans.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Server, 
  Cloud 
} from "lucide-react"

export function DisasterRecoveryPlans() {
  const drPlans = [
    {
      id: 1,
      name: "Primary Data Center DR",
      version: "3.2",
      systemsCovered: [
        { name: "Database Servers", color: "bg-blue-100 text-blue-700" },
        { name: "Web Servers", color: "bg-blue-100 text-blue-700" },
        { name: "+5 more", color: "bg-blue-100 text-blue-700" }
      ],
      owner: {
        name: "John Mitchell",
        role: "IT Director",
        avatar: "/avatars/avatar-2.jpg"
      },
      rto: "2 hours",
      rpo: "15 mins",
      lastUpdated: "Nov 20, 2024",
      icon: Server,
      iconColor: "bg-red-100 text-red-600",
      rtoColor: "bg-green-100 text-green-800",
      rpoColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      name: "Cloud Services DR",
      version: "1.8",
      systemsCovered: [
        { name: "AWS Services", color: "bg-purple-100 text-purple-700" },
        { name: "Azure Backup", color: "bg-purple-100 text-purple-700" },
        { name: "+3 more", color: "bg-purple-100 text-purple-700" }
      ],
      owner: {
        name: "Alex Thompson",
        role: "Cloud Architect",
        avatar: "/avatars/avatar-4.jpg"
      },
      rto: "4 hours",
      rpo: "30 mins",
      lastUpdated: "Oct 28, 2024",
      icon: Cloud,
      iconColor: "bg-orange-100 text-orange-600",
      rtoColor: "bg-yellow-100 text-yellow-800",
      rpoColor: "bg-green-100 text-green-800"
    }
  ]

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Disaster Recovery Plans</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Manage IT system disaster recovery planning and procedures
            </p>
          </div>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add DR Plan
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Plan Name</TableHead>
              <TableHead>Systems Covered</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="relative">
                RTO
                <div className="absolute top-12 left-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                  Recovery Time Objective
                </div>
              </TableHead>
              <TableHead className="relative">
                RPO
                <div className="absolute top-12 left-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                  Recovery Point Objective
                </div>
              </TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drPlans.map((plan) => (
              <TableRow key={plan.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${plan.iconColor}`}>
                      <plan.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                      <div className="text-sm text-gray-500">Version {plan.version}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {plan.systemsCovered.map((system, index) => (
                      <Badge key={index} className={`text-xs ${system.color}`}>
                        {system.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={plan.owner.avatar} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{plan.owner.name}</div>
                      <div className="text-sm text-gray-500">{plan.owner.role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={plan.rtoColor}>
                    {plan.rto}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={plan.rpoColor}>
                    {plan.rpo}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-900">{plan.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-900">
                      Test
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}