// src/components/user-invitation/error-screens.tsx
import { Button } from '@/components/ui/button'
import { AlertTriangle, Info } from 'lucide-react'

interface ErrorScreensProps {
  status: 'expired' | 'activated'
}

export function ErrorScreens({ status }: ErrorScreensProps) {
  if (status === 'expired') {
    return (
      <section className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-600 h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Invitation Expired</h2>
            <p className="text-gray-600 mb-6">
              This invitation link has expired. Please request a new invitation from your organization administrator.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = 'mailto:admin@techcorp.com?subject=New Invitation Request'}
              >
                Contact Administrator
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = '/login'}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (status === 'activated') {
    return (
      <section className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info className="text-blue-600 h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Account Already Exists</h2>
            <p className="text-gray-600 mb-6">
              You already have an account with this email address. Please sign in to access your dashboard.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/login'}
              >
                Sign In
              </Button>
              <Button 
                variant="link" 
                className="w-full text-blue-600 hover:text-blue-800"
                onClick={() => window.location.href = '/forgot-password'}
              >
                Forgot Password?
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return null
}