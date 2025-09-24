// src/components/user-access/users-tab.tsx
import { Button } from '@/components/ui/button'
import { Upload, UserPlus } from 'lucide-react'
import { UserStats } from './users/user-stats'
import { UserTable } from './users/user-table'
import { RecentActivity } from './users/recent-activity'

interface UsersTabProps {
  onInviteUser: () => void
  onBulkUpload: () => void
  onUserClick: (userId: string) => void
}

export function UsersTab({ onInviteUser, onBulkUpload, onUserClick }: UsersTabProps) {
  return (
    <div className="p-6">
      {/* Users Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Users</h2>
            <p className="text-gray-600 mt-1">Manage your organization's users, invitations, and access.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onBulkUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Bulk Upload
            </Button>
            <Button onClick={onInviteUser}>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
          </div>
        </div>
      </div>

      <UserStats />
      <UserTable onUserClick={onUserClick} />
      <RecentActivity />
    </div>
  )
}