// src/components/continuity-recovery/backup-validation.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  RefreshCcw, 
  Database, 
  Folder, 
  Settings, 
  Check, 
  Clock, 
  X 
} from "lucide-react"

export function BackupValidation() {
  const backupSystems = [
    {
      id: 1,
      name: "Database Backups",
      description: "PostgreSQL, MySQL clusters",
      schedule: "Every 4 hours",
      lastBackup: "2 hours ago",
      lastTest: "Nov 15, 2024",
      retention: "30 days",
      status: "Success",
      icon: Database,
      iconColor: "bg-blue-100 text-blue-600",
      statusColor: "bg-green-100 text-green-800",
      lastBackupColor: "text-green-600",
      actions: [
        { label: "View Logs", color: "text-blue-600 hover:text-blue-900" },
        { label: "Test Restore", color: "text-green-600 hover:text-green-900" }
      ]
    },
    {
      id: 2,
      name: "File System Backups",
      description: "Application files, documents",
      schedule: "Daily at 2 AM",
      lastBackup: "In progress",
      lastTest: "Nov 10, 2024",
      retention: "90 days",
      status: "Running",
      icon: Folder,
      iconColor: "bg-green-100 text-green-600",
      statusColor: "bg-yellow-100 text-yellow-800",
      lastBackupColor: "text-yellow-600",
      progress: 65,
      actions: []
    },
    {
      id: 3,
      name: "Configuration Backups",
      description: "System configurations, settings",
      schedule: "Weekly",
      lastBackup: "Failed - 3 days ago",
      lastTest: "Oct 28, 2024",
      retention: "60 days",
      status: "Failed",
      icon: Settings,
      iconColor: "bg-purple-100 text-purple-600",
      statusColor: "bg-red-100 text-red-800",
      lastBackupColor: "text-red-600",
      actions: [
        { label: "View Error", color: "text-red-600 hover:text-red-900" },
        { label: "Retry Backup", color: "text-blue-600 hover:text-blue-900" }
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success": return Check
      case "Running": return Clock
      case "Failed": return X
      default: return Clock
    }
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Backup & Restore Validation</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Monitor backup systems and validate restore capabilities
            </p>
          </div>
          <Button className="flex items-center">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Status
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {backupSystems.map((system) => {
            const StatusIcon = getStatusIcon(system.status)
            return (
              <Card key={system.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${system.iconColor}`}>
                      <system.icon className="h-5 w-5" />
                    </div>
                    <Badge className={system.statusColor}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {system.status}
                    </Badge>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{system.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{system.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Schedule:</span>
                      <span className="font-medium">{system.schedule}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Backup:</span>
                      <span className={`font-medium ${system.lastBackupColor}`}>
                        {system.lastBackup}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Test:</span>
                      <span className="font-medium">{system.lastTest}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Retention:</span>
                      <span className="font-medium">{system.retention}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {system.progress ? (
                      <div>
                        <Progress value={system.progress} className="w-full mb-2" />
                        <div className="text-xs text-gray-600 text-center">
                          {system.progress}% Complete
                        </div>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        {system.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className={`font-medium ${action.color}`}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}