// src/components/user-invitation/steps/welcome-step.tsx
import { Button } from '@/components/ui/button'
import { CheckCircle, FileCheck, GraduationCap, BarChart3 } from 'lucide-react'

interface WelcomeStepProps {
  organization: {
    name: string
    role: string
  }
  userRole: string
}

export function WelcomeStep({ organization, userRole }: WelcomeStepProps) {
  const handleGetStarted = () => {
    // Redirect to main dashboard
    window.location.href = '/dashboard'
  }

  const handleStartReview = () => {
    // Redirect to policy review
    window.location.href = '/policies'
  }

  const handleBeginTraining = () => {
    // Redirect to training modules
    window.location.href = '/training'
  }

  const handleViewDashboard = () => {
    // Redirect to compliance dashboard
    window.location.href = '/compliance'
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-white h-10 w-10" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to {organization.name}!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your account has been successfully created. You're now part of our compliance team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <FileCheck className="text-blue-600 h-12 w-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Review Policies</h3>
              <p className="text-sm text-gray-600 mb-4">3 policies require your review and acknowledgment</p>
              <Button 
                onClick={handleStartReview}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                Start Review
              </Button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <GraduationCap className="text-purple-600 h-12 w-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Complete Training</h3>
              <p className="text-sm text-gray-600 mb-4">2 mandatory training modules assigned</p>
              <Button 
                onClick={handleBeginTraining}
                className="bg-purple-600 hover:bg-purple-700 text-white"
                size="sm"
              >
                Begin Training
              </Button>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <BarChart3 className="text-green-600 h-12 w-12 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">View Dashboard</h3>
              <p className="text-sm text-gray-600 mb-4">Access your compliance dashboard and reports</p>
              <Button 
                onClick={handleViewDashboard}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Your Role & Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">As a {userRole}, you can:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Monitor organizational compliance status
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Generate and review compliance reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Manage policy assignments and tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Access audit trails and logs
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Your responsibilities include:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Ensuring ISO 27001 compliance
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Coordinating internal audits
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Managing risk assessments
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Training oversight and coordination
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold"
            size="lg"
          >
            Get Started with Qireon
          </Button>
        </div>
      </div>
    </section>
  )
}