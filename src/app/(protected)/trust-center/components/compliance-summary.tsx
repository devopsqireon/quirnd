// src/components/trust-center/compliance-summary.tsx
import { ShieldCheck, FileText, GraduationCap, Search, CheckCircle, ArrowUp, Clock, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function ComplianceSummary() {
  const metrics = [
    {
      title: 'Risks Treated',
      value: '98%',
      description: 'Identified risks with treatment plans',
      color: 'green',
      icon: ShieldCheck
    },
    {
      title: 'Policies Published',
      value: '100%',
      description: 'Required policies in effect',
      color: 'blue',
      icon: FileText
    },
    {
      title: 'Training Completion',
      value: '94%',
      description: 'Staff security awareness training',
      color: 'purple',
      icon: GraduationCap
    },
    {
      title: 'Audit Compliance',
      value: '100%',
      description: 'Internal audit findings resolved',
      color: 'orange',
      icon: Search
    }
  ]

  const auditResults = [
    {
      title: 'Surveillance Audit 2024',
      date: 'September 15, 2024',
      status: 'Passed',
      statusColor: 'green'
    },
    {
      title: 'Internal Audit Q3 2024',
      date: 'August 20, 2024',
      status: 'No NCRs',
      statusColor: 'green'
    },
    {
      title: 'Management Review',
      date: 'Scheduled: December 2024',
      status: 'Upcoming',
      statusColor: 'blue'
    }
  ]

  const monitoringData = [
    { label: 'Security Incidents (YTD)', value: '0 Major, 3 Minor' },
    { label: 'Vulnerability Assessments', value: 'Monthly' },
    { label: 'Penetration Testing', value: 'Quarterly' },
    { label: 'Business Continuity Tests', value: 'Semi-annual' },
    { label: 'Risk Assessment Updates', value: 'Quarterly' }
  ]

  const securityPosture = [
    { label: 'Vulnerability Remediation Rate', percentage: 96, trend: 'up' },
    { label: 'Security Awareness Training', percentage: 94, trend: 'up' },
    { label: 'Patch Management Compliance', percentage: 98, trend: 'stable' },
    { label: 'Backup Success Rate', percentage: 99.8, trend: 'up' }
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance Summary</h2>
        <p className="text-gray-600">Key performance indicators for our information security management system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`text-${metric.color}-600 text-xl`} />
                  </div>
                  <span className={`text-2xl font-bold text-${metric.color}-600`}>{metric.value}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{metric.title}</h3>
                <p className="text-sm text-gray-500">{metric.description}</p>
                <div className="mt-3">
                  <Progress value={parseInt(metric.value)} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Audit Results</h3>
            <div className="space-y-4">
              {auditResults.map((audit, index) => (
                <div key={index} className={`flex items-center justify-between p-3 bg-${audit.statusColor}-50 rounded-lg`}>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`text-${audit.statusColor}-500`} />
                    <div>
                      <p className="font-medium text-gray-900">{audit.title}</p>
                      <p className="text-sm text-gray-600">{audit.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold text-${audit.statusColor}-700`}>{audit.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Continuous Monitoring</h3>
            <div className="space-y-4">
              {monitoringData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Posture Indicators</h3>
          <div className="space-y-4">
            {securityPosture.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">{item.percentage}%</span>
                    {item.trend === 'up' && <ArrowUp className="text-green-500 text-xs" />}
                    {item.trend === 'stable' && <Minus className="text-gray-400 text-xs" />}
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}