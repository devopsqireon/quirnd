// src/components/continuity-recovery/critical-processes.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  DollarSign, 
  Users, 
  Settings 
} from "lucide-react"

export function CriticalProcesses() {
  const [activeFilter, setActiveFilter] = useState("all")

  const processes = [
    {
      id: 1,
      name: "Financial Operations",
      description: "Payment processing, invoicing, and financial reporting systems",
      priority: "Critical",
      owner: {
        name: "Emily Watson",
        avatar: "/avatars/avatar-5.jpg"
      },
      keyAssets: ["ERP System", "Payment Gateway", "+3 more"],
      rto: "2 hours",
      rpo: "15 mins",
      icon: DollarSign,
      iconColor: "bg-green-100 text-green-600",
      priorityColor: "bg-red-100 text-red-800"
    },
    {
      id: 2,
      name: "Human Resources",
      description: "Employee management, payroll, and HR information systems",
      priority: "Important",
      owner: {
        name: "Lisa Rodriguez",
        avatar: "/avatars/avatar-7.jpg"
      },
      keyAssets: ["HRIS", "Payroll System", "+2 more"],
      rto: "4 hours",
      rpo: "1 hour",
      icon: Users,
      iconColor: "bg-purple-100 text-purple-600",
      priorityColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 3,
      name: "Core Operations",
      description: "Customer service, order processing, and operational systems",
      priority: "Critical",
      owner: {
        name: "Sarah Chen",
        avatar: "/avatars/avatar-6.jpg"
      },
      keyAssets: ["CRM", "Order System", "+4 more"],
      rto: "1 hour",
      rpo: "5 mins",
      icon: Settings,
      iconColor: "bg-blue-100 text-blue-600",
      priorityColor: "bg-red-100 text-red-800"
    }
  ]

  const filterButtons = [
    { id: "all", label: "All Processes" },
    { id: "critical", label: "Critical" },
    { id: "important", label: "Important" },
    { id: "standard", label: "Standard" }
  ]

  const filteredProcesses = processes.filter(process => {
    if (activeFilter === "all") return true
    return process.priority.toLowerCase() === activeFilter
  })

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Dependencies & Critical Processes</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Identify and manage critical business functions and their dependencies
            </p>
          </div>
          <Button className="bg-yellow-600 hover:bg-yellow-700 flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Process
          </Button>
        </div>
      </CardHeader>

      {/* Process Categories Filter */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex space-x-4">
          {filterButtons.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={activeFilter === filter.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Critical Processes Grid */}
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcesses.map((process) => (
            <Card key={process.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${process.iconColor}`}>
                    <process.icon className="h-5 w-5" />
                  </div>
                  <Badge className={process.priorityColor}>
                    {process.priority}
                  </Badge>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{process.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{process.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Process Owner</div>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={process.owner.avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{process.owner.name}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Key Assets</div>
                    <div className="flex flex-wrap gap-1">
                      {process.keyAssets.map((asset, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Recovery Objectives</div>
                    <div className="flex justify-between text-sm">
                      <span>RTO: {process.rto}</span>
                      <span>RPO: {process.rpo}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900 font-medium">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}