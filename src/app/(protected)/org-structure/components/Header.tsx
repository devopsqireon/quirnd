// src/app/(protected)/organization-structure/components/Header.tsx
import { Download, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onInviteUser: () => void
}

export function Header({ onInviteUser }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            User Directory & Organization Hierarchy
          </h1>
          <p className="text-gray-600 mt-1">
            Manage users, roles, and organizational structure for compliance oversight
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export User List</span>
          </Button>
          <Button 
            onClick={onInviteUser}
            className="flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite User</span>
          </Button>
        </div>
      </div>
    </header>
  )
}