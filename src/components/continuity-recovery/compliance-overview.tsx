// src/components/continuity-recovery/compliance-overview.tsx
import { Card, CardContent } from "@/components/ui/card"
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  TrendingUp 
} from "lucide-react"

interface OverviewMetric {
  title: string
  value: string
  subtitle: string
  icon: typeof FileText
  color: 'success' | 'warning' | 'danger' | 'primary'
}

export function ComplianceOverview() {
  const overviewData: OverviewMetric[] = [
    {
      title: "Active Plans",
      value: "12",
      subtitle: "8 BCP, 4 DRP",
      icon: FileText,
      color: "success"
    },
    {
      title: "Upcoming Tests",
      value: "3",
      subtitle: "Next: Dec 15, 2024",
      icon: Clock,
      color: "warning"
    },
    {
      title: "Overdue Reviews",
      value: "2",
      subtitle: "Require attention",
      icon: AlertTriangle,
      color: "danger"
    },
    {
      title: "Compliance Score",
      value: "94%",
      subtitle: "A.17 Requirements",
      icon: TrendingUp,
      color: "primary"
    }
  ]

  const getColorClasses = (color: OverviewMetric['color']): string => {
    const colorMap: Record<OverviewMetric['color'], string> = {
      success: "bg-green-100 text-green-600",
      warning: "bg-yellow-100 text-yellow-600",
      danger: "bg-red-100 text-red-600",
      primary: "bg-blue-100 text-blue-600"
    }
    return colorMap[color]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewData.map((item, index) => {
        const IconComponent = item.icon
        return (
          <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getColorClasses(item.color)}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{item.value}</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Alternative version with click handlers and animations
export function ComplianceOverviewInteractive() {
  const overviewData: (OverviewMetric & { 
    onClick?: () => void
    trend?: { direction: 'up' | 'down' | 'stable', percentage: number }
  })[] = [
    {
      title: "Active Plans",
      value: "12",
      subtitle: "8 BCP, 4 DRP",
      icon: FileText,
      color: "success",
      trend: { direction: 'up', percentage: 8.3 },
      onClick: () => console.log('Navigate to plans')
    },
    {
      title: "Upcoming Tests",
      value: "3",
      subtitle: "Next: Dec 15, 2024",
      icon: Clock,
      color: "warning",
      onClick: () => console.log('Navigate to tests')
    },
    {
      title: "Overdue Reviews",
      value: "2",
      subtitle: "Require attention",
      icon: AlertTriangle,
      color: "danger",
      trend: { direction: 'down', percentage: 33.3 },
      onClick: () => console.log('Navigate to overdue reviews')
    },
    {
      title: "Compliance Score",
      value: "94%",
      subtitle: "A.17 Requirements",
      icon: TrendingUp,
      color: "primary",
      trend: { direction: 'up', percentage: 2.1 },
      onClick: () => console.log('Navigate to compliance details')
    }
  ]

  const getColorClasses = (color: OverviewMetric['color']): string => {
    const colorMap: Record<OverviewMetric['color'], string> = {
      success: "bg-green-100 text-green-600",
      warning: "bg-yellow-100 text-yellow-600", 
      danger: "bg-red-100 text-red-600",
      primary: "bg-blue-100 text-blue-600"
    }
    return colorMap[color]
  }

  const getTrendColor = (direction: 'up' | 'down' | 'stable'): string => {
    switch (direction) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up': return '↗'
      case 'down': return '↘'
      case 'stable': return '→'
      default: return '→'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewData.map((item, index) => {
        const IconComponent = item.icon
        return (
          <Card 
            key={index} 
            className={`border-gray-200 hover:shadow-md transition-all duration-200 ${
              item.onClick ? 'cursor-pointer hover:border-gray-300' : ''
            }`}
            onClick={item.onClick}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getColorClasses(item.color)}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                  {item.trend && (
                    <div className={`text-xs ${getTrendColor(item.trend.direction)} flex items-center justify-end mt-1`}>
                      <span className="mr-1">{getTrendIcon(item.trend.direction)}</span>
                      {item.trend.percentage}%
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}