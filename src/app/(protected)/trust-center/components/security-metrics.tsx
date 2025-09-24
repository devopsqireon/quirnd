// src/components/trust-center/security-metrics.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function SecurityMetrics() {
  const incidentMetrics = [
    {
      title: 'Mean Time to Detection (MTTD)',
      value: '4.2 min',
      description: 'Average time to identify security incidents',
      color: 'green'
    },
    {
      title: 'Mean Time to Response (MTTR)',
      value: '12.8 min',
      description: 'Average time to begin incident response',
      color: 'blue'
    },
    {
      title: 'Mean Time to Resolution (MTTR)',
      value: '2.4 hrs',
      description: 'Average time to fully resolve incidents',
      color: 'purple'
    }
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Performance Metrics</h2>
        <p className="text-gray-600">Key security indicators and performance trends</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Response Metrics</h3>
            <div className="space-y-4">
              {incidentMetrics.map((metric, index) => (
                <div key={index} className={`flex items-center justify-between p-3 bg-${metric.color}-50 rounded-lg`}>
                  <div>
                    <p className="font-medium text-gray-900">{metric.title}</p>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                  </div>
                  <span className={`text-xl font-bold text-${metric.color}-600`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Posture Indicators</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Vulnerability Remediation Rate</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-green-600">96%</span>
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Security Awareness Training</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-blue-600">94%</span>
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Patch Management Compliance</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-purple-600">98%</span>
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Backup Success Rate</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-orange-600">99.8%</span>
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <Progress value={99.8} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}