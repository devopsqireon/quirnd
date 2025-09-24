'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts'

const riskTrendData = [
  { month: 'Jan', Critical: 5, High: 12, Medium: 18, Low: 25 },
  { month: 'Feb', Critical: 4, High: 10, Medium: 15, Low: 22 },
  { month: 'Mar', Critical: 6, High: 14, Medium: 12, Low: 20 },
  { month: 'Apr', Critical: 3, High: 11, Medium: 16, Low: 23 },
  { month: 'May', Critical: 2, High: 13, Medium: 19, Low: 26 },
  { month: 'Jun', Critical: 4, High: 9, Medium: 14, Low: 21 },
  { month: 'Jul', Critical: 6, High: 8, Medium: 11, Low: 18 },
  { month: 'Aug', Critical: 7, High: 12, Medium: 16, Low: 24 },
  { month: 'Sep', Critical: 8, High: 10, Medium: 17, Low: 27 },
  { month: 'Oct', Critical: 9, High: 15, Medium: 20, Low: 30 },
  { month: 'Nov', Critical: 10, High: 17, Medium: 22, Low: 33 },
  { month: 'Dec', Critical: 12, High: 19, Medium: 24, Low: 36 }
]

const complianceScoreData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 82 },
  { month: 'May', score: 85 },
  { month: 'Jun', score: 87 },
  { month: 'Jul', score: 89 },
  { month: 'Aug', score: 91 },
  { month: 'Sep', score: 88 },
  { month: 'Oct', score: 90 },
  { month: 'Nov', score: 92 },
  { month: 'Dec', score: 94 }
]

export function ComplianceMetrics() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance Metrics & Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Number of Risks', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Critical" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
                  <Line type="monotone" dataKey="High" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
                  <Line type="monotone" dataKey="Medium" stroke="#eab308" strokeWidth={2} dot={{ fill: '#eab308' }} />
                  <Line type="monotone" dataKey="Low" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Score Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Score Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={complianceScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Compliance Score (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}