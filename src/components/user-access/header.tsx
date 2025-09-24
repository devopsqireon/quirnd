// src/components/user-access/header.tsx
import { Button } from '@/components/ui/button'
import { Download, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">User & Access Control</h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span className="hover:text-primary-600 cursor-pointer">Home</span>
              <span className="text-xs">›</span>
              <span className="hover:text-primary-600 cursor-pointer">Settings</span>
              <span className="text-xs">›</span>
              <span className="text-gray-900 font-medium">User & Access Control</span>
            </nav>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  )
}