// src/components/continuity-recovery/quick-actions.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Plus, 
  CalendarPlus, 
  ClipboardCheck, 
  Upload,
  FileText,
  Users,
  Shield,
  Database,
  Clock,
  CheckCircle
} from "lucide-react"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: typeof Plus
  color: string
  hoverColor: string
  iconColor: string
  onClick: () => void
  badge?: {
    text: string
    color: string
  }
  disabled?: boolean
  tooltip?: string
}

export function QuickActions() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleActionClick = (actionId: string, action: () => void) => {
    setSelectedAction(actionId)
    action()
  }

  const actions: QuickAction[] = [
    {
      id: "add-plan",
      title: "Add Continuity Plan",
      description: "Create new business continuity plan",
      icon: Plus,
      color: "border-gray-300 hover:border-primary-500 hover:bg-primary-50",
      hoverColor: "hover:border-primary-500 hover:bg-primary-50",
      iconColor: "text-gray-400 group-hover:text-primary-600",
      onClick: () => {
        console.log("Opening continuity plan creation wizard")
        setIsDialogOpen(true)
      },
      badge: { text: "New", color: "bg-green-100 text-green-800" }
    },
    {
      id: "schedule-drill",
      title: "Schedule Drill",
      description: "Schedule continuity testing drill",
      icon: CalendarPlus,
      color: "border-gray-300 hover:border-blue-500 hover:bg-blue-50",
      hoverColor: "hover:border-blue-500 hover:bg-blue-50",
      iconColor: "text-gray-400 group-hover:text-blue-600",
      onClick: () => {
        console.log("Opening drill scheduling interface")
      },
      badge: { text: "3 Pending", color: "bg-yellow-100 text-yellow-800" }
    },
    {
      id: "log-test",
      title: "Log Test Result",
      description: "Record test or drill results",
      icon: ClipboardCheck,
      color: "border-gray-300 hover:border-green-500 hover:bg-green-50",
      hoverColor: "hover:border-green-500 hover:bg-green-50",
      iconColor: "text-gray-400 group-hover:text-green-600",
      onClick: () => {
        console.log("Opening test result logging form")
      }
    },
    {
      id: "upload-evidence",
      title: "Upload Evidence",
      description: "Upload supporting documentation",
      icon: Upload,
      color: "border-gray-300 hover:border-purple-500 hover:bg-purple-50",
      hoverColor: "hover:border-purple-500 hover:bg-purple-50",
      iconColor: "text-gray-400 group-hover:text-purple-600",
      onClick: () => {
        console.log("Opening file upload interface")
      }
    }
  ]

  const recentActions = [
    {
      icon: FileText,
      title: "IT Systems Plan Updated",
      time: "2 hours ago",
      user: "John Mitchell"
    },
    {
      icon: CheckCircle,
      title: "Fire Drill Completed",
      time: "1 day ago",
      user: "Sarah Chen"
    },
    {
      icon: Upload,
      title: "Evidence Uploaded",
      time: "3 days ago",
      user: "Mike Johnson"
    }
  ]

  const upcomingTasks = [
    {
      icon: Clock,
      title: "Quarterly DR Test",
      dueDate: "Dec 15, 2024",
      priority: "High"
    },
    {
      icon: Users,
      title: "Staff Training Session",
      dueDate: "Dec 20, 2024",
      priority: "Medium"
    },
    {
      icon: FileText,
      title: "Plan Review - HR",
      dueDate: "Jan 5, 2025",
      priority: "Low"
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            Quick Actions
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              4 Actions
            </Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Common tasks and frequently used functions
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TooltipProvider>
              {actions.map((action) => {
                const IconComponent = action.icon
                return (
                  <Tooltip key={action.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className={`group relative h-auto p-4 border-2 border-dashed ${action.color} transition-all duration-200 flex flex-col items-center justify-center text-center min-h-[100px] ${
                          action.disabled ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => !action.disabled && handleActionClick(action.id, action.onClick)}
                        disabled={action.disabled}
                      >
                        {action.badge && (
                          <Badge 
                            className={`absolute -top-2 -right-2 ${action.badge.color} text-xs px-2 py-1`}
                          >
                            {action.badge.text}
                          </Badge>
                        )}
                        
                        <IconComponent className={`h-6 w-6 mb-2 transition-colors duration-200 ${action.iconColor}`} />
                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          {action.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 leading-tight">
                          {action.description}
                        </p>
                      </Button>
                    </TooltipTrigger>
                    {action.tooltip && (
                      <TooltipContent>
                        <p>{action.tooltip}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </div>

          {/* Additional Quick Access Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
            {/* Recent Actions */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Recent Activity
              </h4>
              <div className="space-y-2">
                {recentActions.map((activity, index) => {
                  const ActivityIcon = activity.icon
                  return (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <ActivityIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.time} • {activity.user}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Upcoming Tasks
              </h4>
              <div className="space-y-2">
                {upcomingTasks.map((task, index) => {
                  const TaskIcon = task.icon
                  return (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <TaskIcon className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.title}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500">{task.dueDate}</p>
                          <Badge className={`text-xs px-2 py-0 ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">12</div>
                <div className="text-xs text-green-700">Active Plans</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">8</div>
                <div className="text-xs text-blue-700">Tests Passed</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">3</div>
                <div className="text-xs text-yellow-700">Pending Tasks</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">94%</div>
                <div className="text-xs text-purple-700">Compliance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Dialog for Action */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Continuity Plan</DialogTitle>
            <DialogDescription>
              Choose a template to get started with your new business continuity plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <FileText className="h-6 w-6 mb-2" />
              <span>IT Systems</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Users className="h-6 w-6 mb-2" />
              <span>Human Resources</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Shield className="h-6 w-6 mb-2" />
              <span>Security</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Database className="h-6 w-6 mb-2" />
              <span>Data Management</span>
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}