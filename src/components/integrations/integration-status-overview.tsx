// src/components/integrations/integration-status-overview.tsx
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react"

export function IntegrationStatusOverview() {
  const stats = [
    {
      label: "Connected",
      value: "12",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      label: "Warning",
      value: "3",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      label: "Error",
      value: "2",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      label: "Last Sync",
      value: "2 minutes ago",
      icon: Clock,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    }
  ]

  return (
    <section className="px-8 py-6 bg-white border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`${stat.bgColor} ${stat.borderColor}`}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className={`text-2xl ${stat.color}`} />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${stat.color.replace('text-', 'text-').replace('-600', '-800')}`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold ${stat.color.replace('text-', 'text-').replace('-600', '-900')}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}