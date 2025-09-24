// src/components/user-access/roles-tab.tsx
import { Button } from '@/components/ui/button'
import { Download, Plus } from 'lucide-react'
import { RoleStats } from './roles/role-stats'
import { SystemRoles } from './roles/system-roles'
import { CustomRoles } from './roles/custom-roles'
import { PermissionsMatrix } from './roles/permissions-matrix'

export function RolesTab() {
  return (
    <div className="p-6">
      {/* Roles Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Roles & Permissions</h2>
            <p className="text-gray-600 mt-1">Control access across your organization with default and custom roles.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Roles
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Custom Role
            </Button>
          </div>
        </div>
      </div>

      <RoleStats />
      <SystemRoles />
      <CustomRoles />
      <PermissionsMatrix />
    </div>
  )
}