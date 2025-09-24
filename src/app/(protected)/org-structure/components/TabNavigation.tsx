// src/app/(protected)/organization-structure/components/TabNavigation.tsx
import { cn } from '@/lib/utils'

interface TabNavigationProps {
  activeTab: 'directory' | 'hierarchy'
  onTabChange: (tab: 'directory' | 'hierarchy') => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <section className="bg-white border-b border-gray-200 px-8">
      <nav className="flex space-x-8">
        <button
          onClick={() => onTabChange('directory')}
          className={cn(
            "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
            activeTab === 'directory'
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          Directory View
        </button>
        <button
          onClick={() => onTabChange('hierarchy')}
          className={cn(
            "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
            activeTab === 'hierarchy'
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          )}
        >
          Hierarchy View
        </button>
      </nav>
    </section>
  )
}