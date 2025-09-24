// src/app/(protected)/dashboard/external-dashboard/components/external-dashboard-header.tsx
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Clock, Info } from 'lucide-react'

export function ExternalDashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">External Auditor Dashboard</h1>
              <p className="text-sm text-gray-600">Certification audit portal — evidence and findings</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last updated: 2 hours ago</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">EA</span>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center space-x-3">
          <Info className="text-amber-600" />
          <span className="text-amber-800 text-sm font-medium">
            You have limited, read-only access. Actions are restricted to NCs and OFIs.
          </span>
        </div>
      </div>
    </header>
  )
}