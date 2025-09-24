// src/app/user-invitation/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProgressSection } from '@/components/user-invitation/progress-section'
import { OrganizationBanner } from '@/components/user-invitation/organization-banner'
import { PersonalInfoStep } from '@/components/user-invitation/steps/personal-info-step'
import { SecurityStep } from '@/components/user-invitation/steps/security-step'
import { WelcomeStep } from '@/components/user-invitation/steps/welcome-step'
import { ErrorScreens } from '@/components/user-invitation/error-screens'

export default function UserInvitationPage() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mfaCode: '',
    acceptedTerms: false,
    acceptedCompliance: false,
    acceptedSecurity: false
  })
  const [inviteStatus, setInviteStatus] = useState<'valid' | 'expired' | 'activated' | 'loading'>('loading')
  const [organizationInfo, setOrganizationInfo] = useState({
    name: 'TechCorp Industries',
    logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/654f49ee2a-52cce7bc148b016a8211.png',
    role: 'Compliance Officer',
    employeeCount: '500+',
    isoCertified: true,
    assignedBy: 'Sarah Johnson (Admin)'
  })

  useEffect(() => {
    // Simulate invite validation
    const token = searchParams.get('token')
    const email = searchParams.get('email')
    
    if (!token || !email) {
      setInviteStatus('expired')
      return
    }

    // Simulate API call to validate invite
    setTimeout(() => {
      // Mock validation logic
      if (token === 'expired') {
        setInviteStatus('expired')
      } else if (token === 'activated') {
        setInviteStatus('activated')
      } else {
        setInviteStatus('valid')
        setSignupData(prev => ({ ...prev, email: decodeURIComponent(email) }))
      }
    }, 1000)
  }, [searchParams])

  const updateSignupData = (field: string, value: any) => {
    setSignupData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    try {
      // Simulate account creation
      console.log('Creating account with data:', signupData)
      
      // Move to welcome step
      nextStep()
    } catch (error) {
      console.error('Account creation failed:', error)
    }
  }

  if (inviteStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating invitation...</p>
        </div>
      </div>
    )
  }

  if (inviteStatus !== 'valid') {
    return <ErrorScreens status={inviteStatus} />
  }

  const steps = [
    'Account Setup',
    'Security Verification', 
    'Welcome & Onboarding'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressSection 
        currentStep={currentStep}
        totalSteps={3}
        steps={steps}
      />
      
      <OrganizationBanner organization={organizationInfo} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          <PersonalInfoStep
            data={signupData}
            updateData={updateSignupData}
            onNext={nextStep}
            organization={organizationInfo}
          />
        )}
        
        {currentStep === 2 && (
          <SecurityStep
            data={signupData}
            updateData={updateSignupData}
            onNext={handleSubmit}
            onPrev={prevStep}
            organization={organizationInfo}
          />
        )}
        
        {currentStep === 3 && (
          <WelcomeStep
            organization={organizationInfo}
            userRole={organizationInfo.role}
          />
        )}
      </main>
    </div>
  )
}