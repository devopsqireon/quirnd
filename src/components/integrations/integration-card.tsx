// src/components/integrations/integration-card.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Clock, Info, AlertTriangle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface IntegrationCardProps {
  name: string
  description: string
  icon: string
  status: "connected" | "warning" | "error" | "not-connected"
  lastSync: string
  iconBg: string
  iconColor: string
}

export function IntegrationCard({
  name,
  description,
  icon,
  status,
  lastSync,
  iconBg,
  iconColor
}: IntegrationCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          badge: "Connected",
          badgeClass: "bg-green-100 text-green-800",
          icon: Clock,
          actions: [
            { 
              label: "Settings", 
              variant: "secondary" as const,
              onClick: () => toast.info(`Opening ${name} settings`)
            },
            { 
              label: "Disconnect", 
              variant: "destructive" as const,
              onClick: () => toast.warning(`Disconnecting ${name}`)
            }
          ]
        }
      case "warning":
        return {
          badge: "Warning",
          badgeClass: "bg-yellow-100 text-yellow-800",
          icon: AlertTriangle,
          actions: [
            { 
              label: "Settings", 
              variant: "secondary" as const,
              onClick: () => toast.info(`Opening ${name} settings`)
            },
            { 
              label: "Reconnect", 
              variant: "default" as const,
              onClick: () => toast.info(`Reconnecting ${name}`)
            }
          ]
        }
      case "error":
        return {
          badge: "Error",
          badgeClass: "bg-red-100 text-red-800",
          icon: XCircle,
          actions: [
            { 
              label: "Settings", 
              variant: "secondary" as const,
              onClick: () => toast.info(`Opening ${name} settings`)
            },
            { 
              label: "Reconnect", 
              variant: "default" as const,
              onClick: () => toast.info(`Reconnecting ${name}`)
            }
          ]
        }
      default:
        return {
          badge: "Not Connected",
          badgeClass: "bg-gray-100 text-gray-800",
          icon: Info,
          actions: [
            { 
              label: "Connect", 
              variant: "default" as const,
              onClick: () => toast.success(`Connecting to ${name}`)
            }
          ]
        }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBg)}>
              <div className={cn("text-xl", iconColor)}>
                {/* Icon placeholder - in real implementation, you'd use actual brand icons */}
                <div className="w-6 h-6 bg-current rounded"></div>
              </div>
            </div>
            <div className="ml-3">
              <h4 className="text-base font-semibold text-gray-900">{name}</h4>
              <Badge className={statusConfig.badgeClass}>
                {statusConfig.badge}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => toast.info(`More options for ${name}`)}>
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 flex items-center">
            <statusConfig.icon className="w-3 h-3 mr-1" />
            {lastSync}
          </div>
          <div className="flex space-x-2">
            {statusConfig.actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                className="text-xs"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}