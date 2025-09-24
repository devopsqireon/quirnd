// src/app/(protected)/organization-structure/components/RoleAnalytics.tsx

export function RoleAnalytics() {
    const roleData = [
      {
        role: 'Compliance Officers',
        count: 8,
        color: 'bg-purple-500',
        percentage: 32
      },
      {
        role: 'Risk Owners',
        count: 12,
        color: 'bg-blue-500',
        percentage: 48
      },
      {
        role: 'Auditors',
        count: 6,
        color: 'bg-orange-500',
        percentage: 24
      },
      {
        role: 'Employees',
        count: 71,
        color: 'bg-gray-500',
        percentage: 100
      }
    ]
  
    const departmentData = [
      { department: 'IT Department', users: 25 },
      { department: 'Operations', users: 22 },
      { department: 'Finance', users: 18 },
      { department: 'Legal', users: 15 },
      { department: 'HR', users: 12 },
      { department: 'Other', users: 5 }
    ]
  
    return (
      <section className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Distribution</h3>
            <div className="space-y-4">
              {roleData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 ${item.color} rounded mr-3`}></div>
                    <span className="text-sm text-gray-700">{item.role}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{item.count}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Breakdown</h3>
            <div className="space-y-4">
              {departmentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.department}</span>
                  <span className="text-sm font-medium text-gray-900">{item.users} users</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }