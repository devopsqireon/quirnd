// src/components/user-access/roles/permissions-matrix.tsx
import { Button } from '@/components/ui/button'
import { CheckCircle, Eye, UserCheck, Plus, XCircle, ArrowRight } from 'lucide-react'

export function PermissionsMatrix() {
  const permissions = [
    {
      category: 'Risk Management',
      orgAdmin: 'full',
      complianceOfficer: 'full',
      auditor: 'view',
      employee: 'view'
    },
    {
      category: 'Policy Management',
      orgAdmin: 'full',
      complianceOfficer: 'full',
      auditor: 'view',
      employee: 'view'
    },
    {
      category: 'Training Management',
      orgAdmin: 'full',
      complianceOfficer: 'full',
      auditor: 'view',
      employee: 'self'
    },
    {
      category: 'Incident Management',
      orgAdmin: 'full',
      complianceOfficer: 'full',
      auditor: 'view',
      employee: 'create'
    },
    {
      category: 'User Management',
      orgAdmin: 'full',
      complianceOfficer: 'none',
      auditor: 'none',
      employee: 'none'
    }
  ]

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'full':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'view':
        return <Eye className="h-5 w-5 text-blue-500" />
      case 'self':
        return <UserCheck className="h-5 w-5 text-yellow-500" />
      case 'create':
        return <Plus className="h-5 w-5 text-orange-500" />
      case 'none':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Permissions Matrix Overview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission Category
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Org Admin
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance Officer
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auditor
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {permissions.map((permission, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {permission.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {getPermissionIcon(permission.orgAdmin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {getPermissionIcon(permission.complianceOfficer)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {getPermissionIcon(permission.auditor)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {getPermissionIcon(permission.employee)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            Full Access
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 text-blue-500 mr-1" />
            View Only
          </div>
          <div className="flex items-center">
            <UserCheck className="h-4 w-4 text-yellow-500 mr-1" />
            Self-Service
          </div>
          <div className="flex items-center">
            <Plus className="h-4 w-4 text-orange-500 mr-1" />
            Create Only
          </div>
          <div className="flex items-center">
            <XCircle className="h-4 w-4 text-red-500 mr-1" />
            No Access
          </div>
        </div>
        <div className="mt-6">
          <Button variant="link" className="text-primary-600 hover:text-primary-500 text-sm font-medium p-0">
            View detailed permissions matrix <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}