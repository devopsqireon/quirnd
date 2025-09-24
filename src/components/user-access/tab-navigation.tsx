// src/components/user-access/tab-navigation.tsx
import { Users, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TabNavigationProps {
  activeTab: 'users' | 'roles'
  onTabChange: (tab: 'users' | 'roles') => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6">
      <nav className="flex space-x-8">
        <button
          onClick={() => onTabChange('users')}
          className={cn(
            "py-4 px-1 border-b-2 font-medium text-sm flex items-center",
            activeTab === 'users'
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
        >
          <Users className="mr-2 h-4 w-4" />
          Users
        </button>
        <button
          onClick={() => onTabChange('roles')}
          className={cn(
            "py-4 px-1 border-b-2 font-medium text-sm flex items-center",
            activeTab === 'roles'
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
        >
          <Shield className="mr-2 h-4 w-4" />
          Roles & Permissions
        </button>
      </nav>
    </div>
  )
}