// src/app/(protected)/organization-structure/components/ComplianceTraining.tsx
import { Button } from '@/components/ui/button'

export function ComplianceTraining() {
  const trainingData = [
    {
      module: 'ISO 27001 Awareness',
      assigned: 97,
      completed: 89,
      completionRate: 92,
      dueDate: 'Dec 31, 2024',
      color: 'bg-green-500'
    },
    {
      module: 'Data Privacy Training',
      assigned: 97,
      completed: 76,
      completionRate: 78,
      dueDate: 'Jan 15, 2025',
      color: 'bg-yellow-500'
    },
    {
      module: 'Security Awareness',
      assigned: 97,
      completed: 45,
      completionRate: 46,
      dueDate: 'Feb 1, 2025',
      color: 'bg-red-500'
    }
  ]

  return (
    <section className="p-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Training Status</h3>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            View all training
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Training Module</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Assigned Users</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Completed</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Completion Rate</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainingData.map((training, index) => (
                <tr key={index}>
                  <td className="py-4 text-sm text-gray-900">{training.module}</td>
                  <td className="py-4 text-sm text-gray-600">{training.assigned}</td>
                  <td className="py-4 text-sm text-gray-600">{training.completed}</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`${training.color} h-2 rounded-full`}
                          style={{ width: `${training.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{training.completionRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{training.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}