'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const risksData = [
  {
    title: 'Data Breach via Unsecured API',
    description: 'Impact: High | Likelihood: Medium | Owner: IT Security',
    severity: 'Critical',
    severityColor: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    title: 'Inadequate Employee Training',
    description: 'Impact: Medium | Likelihood: High | Owner: HR',
    severity: 'High',
    severityColor: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    title: 'Third-party Vendor Non-compliance',
    description: 'Impact: Medium | Likelihood: Medium | Owner: Procurement',
    severity: 'High',
    severityColor: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    title: 'Outdated Software Dependencies',
    description: 'Impact: Low | Likelihood: High | Owner: Engineering',
    severity: 'Medium',
    severityColor: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    title: 'Regulatory Changes Impact',
    description: 'Impact: Medium | Likelihood: Low | Owner: Legal',
    severity: 'Medium',
    severityColor: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
]

const controlsData = [
  { name: 'Implemented', value: 156, color: '#10b981' },
  { name: 'In Progress', value: 8, color: '#f59e0b' },
  { name: 'Overdue', value: 5, color: '#ef4444' }
]

export function RisksAndControls() {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Open Risks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle>Top 5 Open Risks</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New Risk
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {risksData.map((risk, index) => (
                <div key={index} className={`flex items-center p-4 rounded-lg border ${risk.severityColor.includes('red') ? 'bg-red-50 border-red-200' : risk.severityColor.includes('orange') ? 'bg-orange-50 border-orange-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <div className={`flex-shrink-0 w-3 h-3 rounded-full ${risk.severityColor.includes('red') ? 'bg-red-500' : risk.severityColor.includes('orange') ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{risk.title}</h4>
                    <p className="text-xs text-gray-500">{risk.description}</p>
                  </div>
                  <div className="ml-4">
                    <Badge className={risk.severityColor}>{risk.severity}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700">
                View All Risks →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Control Status Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle>Control Status</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Assign Control
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={controlsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {controlsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-xs text-gray-500">Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">8</div>
                <div className="text-xs text-gray-500">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">5</div>
                <div className="text-xs text-gray-500">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}