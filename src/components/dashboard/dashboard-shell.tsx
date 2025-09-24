// src/components/dashboard/dashboard-shell.tsx
import { ReactNode } from 'react'

interface DashboardShellProps {
  title: string
  description?: string
  children: ReactNode
}

export function DashboardShell({ title, description, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-lg text-gray-600 mt-2">{description}</p>
          )}
        </div>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  )
}