import { Shield, CheckCircle, GraduationCap, FileText, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const kpiData = [
  {
    title: 'Risk Coverage',
    value: '87%',
    change: '+5% from last month',
    icon: Shield,
    color: 'bg-red-100 text-red-600',
    progressColor: 'bg-red-600',
    description: '247 of 284 risks assessed',
    trending: 'up'
  },
  {
    title: 'Control Implementation',
    value: '92%',
    change: '+8% from last month',
    icon: CheckCircle,
    color: 'bg-blue-100 text-blue-600',
    progressColor: 'bg-blue-600',
    description: '156 of 169 controls active',
    trending: 'up'
  },
  {
    title: 'Training Completion',
    value: '78%',
    change: '-2% from last month',
    icon: GraduationCap,
    color: 'bg-green-100 text-green-600',
    progressColor: 'bg-green-600',
    description: '312 of 400 employees trained',
    trending: 'down'
  },
  {
    title: 'Policy Acceptance',
    value: '95%',
    change: '+3% from last month',
    icon: FileText,
    color: 'bg-purple-100 text-purple-600',
    progressColor: 'bg-purple-600',
    description: '380 of 400 policies acknowledged',
    trending: 'up'
  }
]

export function ComplianceKPICards() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance Posture Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                  <div className={`text-sm flex items-center ${kpi.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trending === 'up' ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {kpi.change}
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{kpi.title}</h3>
              <Progress value={parseInt(kpi.value)} className="h-2 mb-2" />
              <p className="text-xs text-gray-500">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}