// src/app/(protected)/dashboard/external-dashboard/components/compliance-posture.tsx
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CircularProgressProps {
  percentage: number
  color: string
  size?: number
  strokeWidth?: number
}

function CircularProgress({ percentage, color, size = 96, strokeWidth = 8 }: CircularProgressProps) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg 
        className="transform -rotate-90" 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.1))'
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  subtitle: string
  percentage: number
  color: string
  description?: string
}

function MetricCard({ title, subtitle, percentage, color, description }: MetricCardProps) {
  return (
    <div className="text-center p-4">
      <div className="mb-4">
        <CircularProgress 
          percentage={percentage} 
          color={color} 
          size={120}
          strokeWidth={10}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-600 font-medium">
          {subtitle}
        </p>
        {description && (
          <p className="text-xs text-gray-500 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

const complianceMetrics = [
  {
    title: 'Controls Implemented',
    subtitle: '108 of 120 controls',
    percentage: 90,
    color: '#10b981',
    description: 'ISO 27001 Annex A controls successfully implemented'
  },
  {
    title: 'Risks Treated',
    subtitle: '34 of 40 risks',
    percentage: 85,
    color: '#3b82f6',
    description: 'Risk treatment plans executed and monitored'
  },
  {
    title: 'SoA Coverage',
    subtitle: '114 of 120 controls',
    percentage: 95,
    color: '#8b5cf6',
    description: 'Statement of Applicability documented coverage'
  }
]

export function CompliancePosture() {
  return (
    <section className="animate-fade-in">
      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Compliance Posture Summary
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Overall compliance status across all frameworks and standards
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complianceMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                subtitle={metric.subtitle}
                percentage={metric.percentage}
                color={metric.color}
                description={metric.description}
              />
            ))}
          </div>
          
          {/* Summary Statistics */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-700">90%</div>
                <div className="text-sm text-green-600 font-medium">Average Implementation</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">12</div>
                <div className="text-sm text-blue-600 font-medium">Controls Remaining</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-700">Q2</div>
                <div className="text-sm text-purple-600 font-medium">Target Completion</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}