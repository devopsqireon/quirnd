// src/components/integrations/integration-health-dashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function IntegrationHealthDashboard() {
  return (
    <section className="px-8 py-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Integration Health Dashboard</h3>
        <p className="text-sm text-gray-600">
          Monitor the performance and health of all your integrations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sync Success Rate Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sync Success Rate</CardTitle>
              <div className="text-sm text-gray-500">Last 7 days</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98.5%</div>
                <div className="text-sm text-gray-500 mt-1">Average success rate</div>
                <div className="flex items-center justify-center mt-3 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Successful</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Failed</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Volume Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Data Volume</CardTitle>
              <div className="text-sm text-gray-500">Today</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2.4M</div>
                <div className="text-sm text-gray-500 mt-1">Records processed</div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">847K</div>
                    <div className="text-gray-500">Assets</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">1.6M</div>
                    <div className="text-gray-500">Events</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}