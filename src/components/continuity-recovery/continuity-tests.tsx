// src/components/continuity-recovery/continuity-tests.tsx
"use client"

import { useState } from "react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  CalendarPlus, 
  Monitor, 
  Flame, 
  Shield, 
  Check, 
  Clock, 
  X, 
  Paperclip,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  Edit,
  Play,
  FileText
} from "lucide-react"

interface Owner {
  name: string
  avatar: string
}

interface ContinuityTest {
  id: number
  type: string
  category: string
  date: string
  owner: Owner
  participants: string[] | string
  additionalParticipants?: number
  outcome: 'Passed' | 'Failed' | 'Scheduled'
  evidence: string
  icon: typeof Monitor
  iconColor: string
  details?: {
    duration?: string
    systems?: string[]
    issues?: string[]
  }
}

export function ContinuityTests() {
  const [selectedTest, setSelectedTest] = useState<number | null>(null)

  const testStats = [
    { label: "Completed Tests", value: "8", color: "text-green-600" },
    { label: "Scheduled", value: "3", color: "text-yellow-600" },
    { label: "Failed", value: "1", color: "text-red-600" },
    { label: "Success Rate", value: "92%", color: "text-blue-600" }
  ]

  const tests: ContinuityTest[] = [
    {
      id: 1,
      type: "IT Failover Drill",
      category: "Quarterly Test",
      date: "Nov 15, 2024",
      owner: {
        name: "John Mitchell",
        avatar: "/avatars/avatar-2.jpg"
      },
      participants: [
        "/avatars/avatar-2.jpg",
        "/avatars/avatar-4.jpg",
        "/avatars/avatar-8.jpg"
      ],
      additionalParticipants: 2,
      outcome: "Passed",
      evidence: "View Report",
      icon: Monitor,
      iconColor: "bg-blue-100 text-blue-600",
      details: {
        duration: "2h 15m",
        systems: ["Database Server", "Web Server", "Load Balancer"],
        issues: []
      }
    },
    {
      id: 2,
      type: "Fire Evacuation Drill",
      category: "Monthly Test",
      date: "Dec 15, 2024",
      owner: {
        name: "Sarah Chen",
        avatar: "/avatars/avatar-6.jpg"
      },
      participants: "All Staff",
      outcome: "Scheduled",
      evidence: "Pending",
      icon: Flame,
      iconColor: "bg-orange-100 text-orange-600",
      details: {
        duration: "Expected: 15m",
        systems: ["Fire Alarm System", "Emergency Exits"],
        issues: []
      }
    },
    {
      id: 3,
      type: "Security Incident Response",
      category: "Bi-annual Test",
      date: "Oct 30, 2024",
      owner: {
        name: "Mike Johnson",
        avatar: "/avatars/avatar-3.jpg"
      },
      participants: [
        "/avatars/avatar-3.jpg",
        "/avatars/avatar-2.jpg"
      ],
      additionalParticipants: 3,
      outcome: "Failed",
      evidence: "Issues Log",
      icon: Shield,
      iconColor: "bg-red-100 text-red-600",
      details: {
        duration: "4h 30m",
        systems: ["Security System", "Access Control", "CCTV"],
        issues: ["Response time exceeded target", "Communication breakdown"]
      }
    },
    {
      id: 4,
      type: "Data Backup Validation",
      category: "Weekly Test",
      date: "Nov 20, 2024",
      owner: {
        name: "Alex Thompson",
        avatar: "/avatars/avatar-4.jpg"
      },
      participants: [
        "/avatars/avatar-4.jpg",
        "/avatars/avatar-2.jpg"
      ],
      additionalParticipants: 1,
      outcome: "Passed",
      evidence: "View Report",
      icon: Monitor,
      iconColor: "bg-green-100 text-green-600",
      details: {
        duration: "1h 45m",
        systems: ["Backup Server", "Cloud Storage"],
        issues: []
      }
    },
    {
      id: 5,
      type: "Communication System Test",
      category: "Quarterly Test",
      date: "Dec 20, 2024",
      owner: {
        name: "Emma Wilson",
        avatar: "/avatars/avatar-9.jpg"
      },
      participants: "IT Team",
      outcome: "Scheduled",
      evidence: "Pending",
      icon: Monitor,
      iconColor: "bg-purple-100 text-purple-600",
      details: {
        duration: "Expected: 1h",
        systems: ["Phone System", "Email Server", "Messaging Platform"],
        issues: []
      }
    }
  ]

  const getOutcomeBadge = (outcome: ContinuityTest['outcome']) => {
    const outcomes = {
      "Passed": { 
        color: "bg-green-100 text-green-800 border-green-200", 
        icon: Check 
      },
      "Scheduled": { 
        color: "bg-yellow-100 text-yellow-800 border-yellow-200", 
        icon: Clock 
      },
      "Failed": { 
        color: "bg-red-100 text-red-800 border-red-200", 
        icon: X 
      }
    }
    return outcomes[outcome]
  }

  const renderParticipants = (participants: string[] | string, additional?: number) => {
    if (typeof participants === 'string') {
      return <span className="text-sm text-gray-500">{participants}</span>
    }

    return (
      <div className="flex -space-x-1">
        {participants.slice(0, 3).map((avatar, index) => (
          <Avatar key={index} className="h-6 w-6 border-2 border-white">
            <AvatarImage src={avatar} alt={`Participant ${index + 1}`} />
            <AvatarFallback className="text-xs">U{index + 1}</AvatarFallback>
          </Avatar>
        ))}
        {additional && additional > 0 && (
          <div className="h-6 w-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600">
            +{additional}
          </div>
        )}
      </div>
    )
  }

  const handleScheduleDrill = () => {
    console.log("Schedule new drill")
  }

  const handleViewDetails = (testId: number) => {
    setSelectedTest(testId)
    console.log(`View details for test ${testId}`)
  }

  const handleEditTest = (testId: number) => {
    console.log(`Edit test ${testId}`)
  }

  const handleRunTest = (testId: number) => {
    console.log(`Run test ${testId}`)
  }

  const handleViewEvidence = (testId: number) => {
    console.log(`View evidence for test ${testId}`)
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Continuity Tests & Drills</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Track and manage business continuity testing activities
            </p>
          </div>
          <Button onClick={handleScheduleDrill} className="bg-green-600 hover:bg-green-700 flex items-center">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Schedule Drill
          </Button>
        </div>
      </CardHeader>

      {/* Test Statistics */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {testStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tests Table */}
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-64">Test Type</TableHead>
              <TableHead className="w-32">Date</TableHead>
              <TableHead className="w-48">Owner</TableHead>
              <TableHead className="w-40">Participants</TableHead>
              <TableHead className="w-32">Outcome</TableHead>
              <TableHead className="w-32">Evidence</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((test) => {
              const outcomeData = getOutcomeBadge(test.outcome)
              const IconComponent = test.icon
              const OutcomeIcon = outcomeData.icon
              
              return (
                <TableRow key={test.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${test.iconColor}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{test.type}</div>
                        <div className="text-sm text-gray-500">{test.category}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{test.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={test.owner.avatar} alt={test.owner.name} />
                        <AvatarFallback className="text-xs">
                          {test.owner.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">{test.owner.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderParticipants(test.participants, test.additionalParticipants)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={outcomeData.color}>
                      <OutcomeIcon className="mr-1 h-3 w-3" />
                      {test.outcome}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewEvidence(test.id)}
                      className={`text-sm flex items-center ${
                        test.outcome === 'Failed' 
                          ? 'text-red-600 hover:text-red-900' 
                          : test.outcome === 'Scheduled'
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-blue-600 hover:text-blue-900'
                      }`}
                      disabled={test.outcome === 'Scheduled'}
                    >
                      {test.outcome === 'Failed' ? (
                        <>
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          {test.evidence}
                        </>
                      ) : test.outcome === 'Scheduled' ? (
                        <span>{test.evidence}</span>
                      ) : (
                        <>
                          <Paperclip className="mr-1 h-3 w-3" />
                          {test.evidence}
                        </>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewDetails(test.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {test.outcome === 'Scheduled' ? 'Edit Schedule' : 
                         test.outcome === 'Failed' ? 'Remediate' : 'View Details'}
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(test.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditTest(test.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Test
                          </DropdownMenuItem>
                          {test.outcome === 'Scheduled' && (
                            <DropdownMenuItem onClick={() => handleRunTest(test.id)}>
                              <Play className="mr-2 h-4 w-4" />
                              Run Now
                            </DropdownMenuItem>
                          )}
                          {test.evidence !== 'Pending' && (
                            <DropdownMenuItem onClick={() => handleViewEvidence(test.id)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Download Report
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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