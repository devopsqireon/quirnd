// src/components/internal-auditor/compliance-overview.tsx
import { Shield, Settings, GraduationCap, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ComplianceOverview() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance Posture Overview</h2>
        <p className="text-gray-600">Key performance indicators for your ISMS compliance status</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Shield className="text-green-600 w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">87%</div>
                <div className="text-sm text-gray-500">Risk Coverage</div>
              </div>
            </div>
            <Progress value={87} className="mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>152 of 175 risks</span>
              <span className="text-green-600">+2% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Settings className="text-blue-600 w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">92%</div>
                <div className="text-sm text-gray-500">Control Implementation</div>
              </div>
            </div>
            <Progress value={92} className="mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>184 of 200 controls</span>
              <span className="text-blue-600">+1% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <GraduationCap className="text-purple-600 w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">78%</div>
                <div className="text-sm text-gray-500">Training Completion</div>
              </div>
            </div>
            <Progress value={78} className="mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>234 of 300 employees</span>
              <span className="text-red-600">-3% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FileText className="text-orange-600 w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-500">Policy Acceptance</div>
              </div>
            </div>
            <Progress value={95} className="mb-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>285 of 300 employees</span>
              <span className="text-orange-600">+5% this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Compliance Trend (Last 12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">Chart placeholder - Integration needed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">Chart placeholder - Integration needed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}