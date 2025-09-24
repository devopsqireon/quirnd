// src/components/trust-center/statement-of-applicability.tsx
import { Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export function StatementOfApplicability() {
  const controlCategories = [
    { name: 'Information Security Policies', percentage: 100 },
    { name: 'Organization of Information Security', percentage: 95 },
    { name: 'Human Resource Security', percentage: 88 },
    { name: 'Asset Management', percentage: 92 },
    { name: 'Access Control', percentage: 85 },
    { name: 'Cryptography', percentage: 90 },
    { name: 'Physical and Environmental Security', percentage: 94 },
    { name: 'Operations Security', percentage: 87 },
    { name: 'Communications Security', percentage: 91 },
    { name: 'System Acquisition, Development and Maintenance', percentage: 83 },
    { name: 'Supplier Relationships', percentage: 78 },
    { name: 'Information Security Incident Management', percentage: 96 },
    { name: 'Information Security in Business Continuity', percentage: 89 },
    { name: 'Compliance', percentage: 98 }
  ]

  const implementationStats = {
    totalControls: 117,
    implementedControls: 89,
    notApplicableControls: 28,
    implementedPercentage: 76,
    notApplicablePercentage: 24
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-green-500'
    if (percentage >= 85) return 'bg-blue-500'
    if (percentage >= 75) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Statement of Applicability Summary</h2>
        <p className="text-gray-600">High-level overview of ISO 27001 controls implementation status</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Implementation Overview */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Controls Implementation Overview</h3>
            
            {/* Circular Progress Chart */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              <div className="w-full h-full rounded-full relative overflow-hidden bg-gray-200">
                {/* Implemented portion */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#10b981 0% ${implementationStats.implementedPercentage}%, #9ca3af ${implementationStats.implementedPercentage}% 100%)`
                  }}
                ></div>
                {/* Inner white circle to create donut effect */}
                <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{implementationStats.implementedPercentage}%</div>
                    <div className="text-sm text-gray-600">Implemented</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Implemented</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {implementationStats.implementedControls} controls ({implementationStats.implementedPercentage}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Not Applicable</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {implementationStats.notApplicableControls} controls ({implementationStats.notApplicablePercentage}%)
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total Controls</span>
                  <span className="text-sm font-bold text-gray-900">{implementationStats.totalControls}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Control Categories Breakdown */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Control Categories Breakdown</h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {controlCategories.map((category, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 pr-2">{category.name}</span>
                    <span className={`text-sm font-semibold ${
                      category.percentage >= 95 ? 'text-green-600' :
                      category.percentage >= 85 ? 'text-blue-600' :
                      category.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(category.percentage)}`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Performance Legend */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Performance Indicators:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Excellent (≥95%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Good (85-94%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Fair (75-84%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Needs Improvement (&lt;75%)</span>
                </div>
              </div>
            </div>
            
            {/* Download Button */}
            <div className="mt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Download Complete SoA (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Information Card */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">14</div>
              <div className="text-sm text-gray-600">Control Categories</div>
              <div className="text-xs text-gray-500 mt-1">All categories assessed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">89%</div>
              <div className="text-sm text-gray-600">Average Implementation</div>
              <div className="text-xs text-gray-500 mt-1">Across all categories</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">Q3 2024</div>
              <div className="text-sm text-gray-600">Last Assessment</div>
              <div className="text-xs text-gray-500 mt-1">Next review: Q1 2025</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-yellow-800 text-xs font-bold">!</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-yellow-800">Continuous Improvement</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Controls with implementation rates below 90% are prioritized for enhancement in our continuous improvement program. 
                  Detailed improvement plans are available in the full Statement of Applicability document.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}