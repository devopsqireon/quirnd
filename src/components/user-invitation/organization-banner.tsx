// src/components/user-invitation/organization-banner.tsx
import { Users, Globe } from 'lucide-react'

interface OrganizationBannerProps {
  organization: {
    name: string
    logo: string
    role: string
    employeeCount: string
    isoCertified: boolean
    assignedBy: string
  }
}

export function OrganizationBanner({ organization }: OrganizationBannerProps) {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
              <img 
                className="w-12 h-12 rounded-lg object-cover" 
                src={organization.logo} 
                alt={`${organization.name} logo`}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{organization.name}</h2>
              <p className="text-sm text-gray-600">
                You've been invited to join as{' '}
                <span className="font-semibold text-blue-600">{organization.role}</span>
              </p>
              {organization.isoCertified && (
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">ISO 27001 Certified Organization</span>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{organization.employeeCount} Employees</span>
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Global Operations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}