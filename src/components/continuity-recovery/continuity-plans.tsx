// src/components/continuity-recovery/continuity-plans.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Search, 
  FileText, 
  Building, 
  Users, 
  Eye, 
  MoreHorizontal,
  Edit,
  Download,
  Archive,
  Trash2
} from "lucide-react"

interface Owner {
  name: string
  role: string
  avatar: string
}

interface ContinuityPlan {
  id: number
  name: string
  version: string
  owner: Owner
  lastUpdated: string
  nextReview: string
  status: 'Active' | 'Under Review' | 'Draft' | 'Retired'
  evidence: string
  icon: typeof FileText
  iconColor: string
}

export function ContinuityPlans() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ownerFilter, setOwnerFilter] = useState("all")

  const plans: ContinuityPlan[] = [
    {
      id: 1,
      name: "IT Systems Continuity Plan",
      version: "2.1",
      owner: {
        name: "John Mitchell",
        role: "IT Director",
        avatar: "/avatars/avatar-2.jpg"
      },
      lastUpdated: "Nov 28, 2024",
      nextReview: "Feb 28, 2025",
      status: "Active",
      evidence: "3 files",
      icon: FileText,
      iconColor: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      name: "Facilities Continuity Plan",
      version: "1.3",
      owner: {
        name: "Sarah Chen",
        role: "Operations Manager",
        avatar: "/avatars/avatar-6.jpg"
      },
      lastUpdated: "Nov 15, 2024",
      nextReview: "Dec 15, 2024",
      status: "Under Review",
      evidence: "5 files",
      icon: Building,
      iconColor: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      name: "Human Resources Continuity Plan",
      version: "1.0",
      owner: {
        name: "Lisa Rodriguez",
        role: "HR Director",
        avatar: "/avatars/avatar-7.jpg"
      },
      lastUpdated: "Oct 22, 2024",
      nextReview: "Jan 22, 2025",
      status: "Draft",
      evidence: "1 file",
      icon: Users,
      iconColor: "bg-purple-100 text-purple-600"
    },
    {
      id: 4,
      name: "Financial Services Continuity Plan",
      version: "2.0",
      owner: {
        name: "Michael Torres",
        role: "Finance Director",
        avatar: "/avatars/avatar-8.jpg"
      },
      lastUpdated: "Oct 15, 2024",
      nextReview: "Jan 15, 2025",
      status: "Active",
      evidence: "4 files",
      icon: FileText,
      iconColor: "bg-emerald-100 text-emerald-600"
    },
    {
      id: 5,
      name: "Customer Support Continuity Plan",
      version: "1.5",
      owner: {
        name: "Emma Wilson",
        role: "Customer Success Manager",
        avatar: "/avatars/avatar-9.jpg"
      },
      lastUpdated: "Sep 30, 2024",
      nextReview: "Dec 30, 2024",
      status: "Under Review",
      evidence: "2 files",
      icon: Users,
      iconColor: "bg-orange-100 text-orange-600"
    }
  ]

  const getStatusBadge = (status: ContinuityPlan['status']): string => {
    const statusColors: Record<ContinuityPlan['status'], string> = {
      "Active": "bg-green-100 text-green-800 border-green-200",
      "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Draft": "bg-gray-100 text-gray-800 border-gray-200",
      "Retired": "bg-red-100 text-red-800 border-red-200"
    }
    return statusColors[status]
  }

  const isOverdue = (nextReview: string): boolean => {
    const reviewDate = new Date(nextReview)
    const today = new Date()
    return reviewDate < today
  }

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || 
                         plan.status.toLowerCase().replace(' ', '-') === statusFilter
    
    const matchesOwner = ownerFilter === "all" || 
                        (ownerFilter === "it" && plan.owner.role.toLowerCase().includes("it")) ||
                        (ownerFilter === "operations" && plan.owner.role.toLowerCase().includes("operations")) ||
                        (ownerFilter === "finance" && plan.owner.role.toLowerCase().includes("finance")) ||
                        (ownerFilter === "hr" && plan.owner.role.toLowerCase().includes("hr"))
    
    return matchesSearch && matchesStatus && matchesOwner
  })

  const handleAddPlan = () => {
    console.log("Add new continuity plan")
  }

  const handleEditPlan = (planId: number) => {
    console.log(`Edit plan ${planId}`)
  }

  const handleViewEvidence = (planId: number) => {
    console.log(`View evidence for plan ${planId}`)
  }

  const handleDownloadPlan = (planId: number) => {
    console.log(`Download plan ${planId}`)
  }

  const handleArchivePlan = (planId: number) => {
    console.log(`Archive plan ${planId}`)
  }

  const handleDeletePlan = (planId: number) => {
    console.log(`Delete plan ${planId}`)
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Continuity Plans</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Manage business continuity planning documents and procedures
            </p>
          </div>
          <Button onClick={handleAddPlan} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
        </div>
      </CardHeader>

      {/* Search and Filter */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search plans..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ownerFilter} onValueChange={setOwnerFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Owners" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="it">IT Department</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Plans Table */}
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-80">Plan Name</TableHead>
              <TableHead className="w-60">Owner</TableHead>
              <TableHead className="w-32">Last Updated</TableHead>
              <TableHead className="w-32">Next Review</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="w-32">Evidence</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No plans found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredPlans.map((plan) => {
                const IconComponent = plan.icon
                return (
                  <TableRow key={plan.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${plan.iconColor}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                          <div className="text-sm text-gray-500">Version {plan.version}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={plan.owner.avatar} alt={plan.owner.name} />
                          <AvatarFallback>
                            {plan.owner.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{plan.owner.name}</div>
                          <div className="text-sm text-gray-500">{plan.owner.role}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">{plan.lastUpdated}</TableCell>
                    <TableCell>
                      <span className={`text-sm ${
                        isOverdue(plan.nextReview) 
                          ? 'text-red-600 font-medium' 
                          : 'text-gray-900'
                      }`}>
                        {plan.nextReview}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(plan.status)}>
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          {plan.evidence}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewEvidence(plan.id)}
                          className="p-1 h-6 w-6"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditPlan(plan.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewEvidence(plan.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadPlan(plan.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleArchivePlan(plan.id)}>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeletePlan(plan.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}