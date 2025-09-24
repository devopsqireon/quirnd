import { Plus, Send, Laptop, Users, TrendingUp, DollarSign, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const departmentTraining = [
  {
    department: 'Engineering',
    employees: 45,
    completion: 89,
    icon: Laptop,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    department: 'Human Resources',
    employees: 12,
    completion: 95,
    icon: Users,
    color: 'bg-green-100 text-green-600'
  },
  {
    department: 'Sales',
    employees: 28,
    completion: 72,
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    department: 'Finance',
    employees: 18,
    completion: 65,
    icon: DollarSign,
    color: 'bg-red-100 text-red-600'
  },
  {
    department: 'Operations',
    employees: 22,
    completion: 81,
    icon: Settings,
    color: 'bg-yellow-100 text-yellow-600'
  }
]

// Mock heatmap data - in real app this would come from your data source
const heatmapData = [
  ['Engineering', 'Data Protection', 85],
  ['Engineering', 'Security', 90],
  ['Engineering', 'HR', 75],
  ['Engineering', 'Finance', 80],
  ['Engineering', 'IT', 95],
  ['Engineering', 'Operations', 88],
  ['HR', 'Data Protection', 92],
  ['HR', 'Security', 88],
  ['HR', 'HR', 98],
  ['HR', 'Finance', 85],
  ['HR', 'IT', 82],
  ['HR', 'Operations', 90],
  // Add more data points as needed
]

export function TrainingAndAwareness() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Training & Awareness</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Training Completion */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle>Department Training Completion</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Assign Training
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentTraining.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${dept.color}`}>
                      <dept.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{dept.department}</div>
                      <div className="text-xs text-gray-500">{dept.employees} employees</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{dept.completion}%</div>
                    <div className="w-24">
                      <Progress value={dept.completion} className="h-2 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policy Acceptance Heatmap */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle>Policy Acceptance Heatmap</CardTitle>
            <Button variant="outline" size="sm">
              <Send className="mr-2 h-4 w-4" />
              Send Reminder
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              {/* Simplified heatmap representation */}
              <div className="grid grid-cols-6 gap-1 h-full">
                {Array.from({ length: 36 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-red-400 rounded-sm opacity-80"
                    style={{ 
                      backgroundColor: `rgba(239, 68, 68, ${Math.random() * 0.8 + 0.2})` 
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Low Acceptance</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-200 rounded"></div>
                <div className="w-3 h-3 bg-red-300 rounded"></div>
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <div className="w-3 h-3 bg-red-600 rounded"></div>
              </div>
              <span>High Acceptance</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}