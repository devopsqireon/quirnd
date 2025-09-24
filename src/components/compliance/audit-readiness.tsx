import { Download, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const evidenceProgress = [
  {
    title: 'Evidence Collected',
    percentage: 80,
    description: '240 of 300 items',
    color: '#10b981'
  },
  {
    title: 'Pending Evidence',
    percentage: 50,
    description: '60 items remaining',
    color: '#f59e0b'
  },
  {
    title: 'Audit Logs',
    percentage: 90,
    description: 'System monitoring active',
    color: '#3b82f6'
  }
]

const auditItems = [
  {
    title: 'SOC 2 Type II Documentation',
    status: 'Complete',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200'
  },
  {
    title: 'ISO 27001 Evidence Collection',
    status: 'Complete',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200'
  },
  {
    title: 'GDPR Compliance Assessment',
    status: 'In Progress',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200'
  },
  {
    title: 'HIPAA Risk Assessment',
    status: 'Pending',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200'
  }
]

const upcomingAudits = [
  {
    title: 'SOC 2 Type II Audit',
    dueDate: 'March 15, 2024',
    timeRemaining: '2 weeks remaining',
    color: 'bg-red-600',
    textColor: 'text-red-600'
  },
  {
    title: 'ISO 27001 Surveillance',
    dueDate: 'April 22, 2024',
    timeRemaining: '6 weeks remaining',
    color: 'bg-yellow-600',
    textColor: 'text-yellow-600'
  },
  {
    title: 'GDPR Assessment',
    dueDate: 'May 30, 2024',
    timeRemaining: '10 weeks remaining',
    color: 'bg-blue-600',
    textColor: 'text-blue-600'
  },
  {
    title: 'HIPAA Review',
    dueDate: 'June 15, 2024',
    timeRemaining: '12 weeks remaining',
    color: 'bg-green-600',
    textColor: 'text-green-600'
  }
]

export function AuditReadiness() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Audit Readiness Snapshot</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Tracker */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle>Evidence Collection Progress</CardTitle>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download Audit Report (PDF)
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {evidenceProgress.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="36" 
                          stroke="#e5e7eb" 
                          strokeWidth="8" 
                          fill="transparent"
                        />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="36" 
                          stroke={item.color} 
                          strokeWidth="8" 
                          fill="transparent"
                          strokeDasharray={`${item.percentage * 2.26} 226.2`}
                        />
                      </svg>
                      <span className="absolute text-lg font-semibold text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                {auditItems.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${item.bgColor}`}>
                    <div className="flex items-center">
                      <item.icon className={`mr-3 h-4 w-4 ${item.color}`} />
                      <span className="text-sm font-medium text-gray-900">{item.title}</span>
                    </div>
                    <span className={`text-sm ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Audits Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Audits & Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {upcomingAudits.map((audit, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${audit.color}`}></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{audit.title}</div>
                      <div className="text-xs text-gray-500">Due: {audit.dueDate}</div>
                      <div className={`text-xs mt-1 ${audit.textColor}`}>{audit.timeRemaining}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700">
                View Full Schedule →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}