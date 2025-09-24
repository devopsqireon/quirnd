// src/components/trust-center/header.tsx
import { Shield, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white text-lg" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">SecureVault Technologies</h1>
              <p className="text-sm text-gray-500">ISO 27001 Trust Center</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-500">
              <HelpCircle className="text-lg" />
            </button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact Compliance Team
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}