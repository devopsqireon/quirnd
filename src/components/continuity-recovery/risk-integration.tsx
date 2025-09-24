// src/components/continuity-recovery/risk-integration.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function RiskIntegration() {
  const highPriorityRisks = [
    {
      id: 1,
      title: "Data Center Outage",
      description: "Extended outage could impact all critical systems and customer services.",
      priority: "High Risk",
      impact: 5,
      likelihood: 3,
      backgroundColor: "border-red-200 bg-red-50",
      textColor: "text-red-900",
      badgeColor: "bg-red-100 text-red-800",
      buttonColor: "text-red-700 hover:text-red-900"
    },
    {
      id: 2,
      title: "Backup System Failure",
      description: "Primary and secondary backup systems could fail simultaneously.",
      priority: "Medium Risk",
      impact: 4,
      likelihood: 2,
      backgroundColor: "border-orange-200 bg-orange-50",
      textColor: "text-orange-900",
      badgeColor: "bg-orange-100 text-orange-800",
      buttonColor: "text-orange-700 hover:text-orange-900"
    }
  ]

  const mitigationStatus = [
    {
      title: "DR Plans Coverage",
      subtitle: "8 of 10 critical systems",
      percentage: 80,
      color: "text-green-600",
      progressColor: "bg-green-600"
    },
    {
      title: "Continuity Tests",
      subtitle: "12 of 15 plans tested",
      percentage: 75,
      color: "text-blue-600",
      progressColor: "bg-blue-600"
    }
  ]

  return (
    <Card className="border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <CardTitle>Risk Integration</CardTitle>
        <p className="text-sm text-gray-600">Continuity and recovery risks from the risk register</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">High Priority Risks</h4>
            
            {highPriorityRisks.map((risk) => (
              <Card key={risk.id} className={`${risk.backgroundColor} border`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className={`text-sm font-medium ${risk.textColor}`}>{risk.title}</h5>
                    <Badge className={risk.badgeColor}>
                      {risk.priority}
                    </Badge>
                  </div>
                  <p className={`text-sm mb-3 ${risk.textColor.replace('900', '700')}`}>
                    {risk.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className={risk.textColor.replace('900', '600')}>
                      Impact: {risk.impact} | Likelihood: {risk.likelihood}
                    </span>
                    <Button variant="ghost" size="sm" className={`font-medium ${risk.buttonColor}`}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Mitigation Status</h4>
            
            <div className="space-y-3">
              {mitigationStatus.map((status, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{status.title}</div>
                    <div className="text-xs text-gray-600">{status.subtitle}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${status.color}`}>{status.percentage}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`${status.progressColor} h-2 rounded-full`} 
                        style={{ width: `${status.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">Staff Training</div>
                  <div className="text-xs text-gray-600">Emergency response trained</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-yellow-600">65%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}