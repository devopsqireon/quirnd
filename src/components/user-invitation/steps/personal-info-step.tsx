// src/components/user-invitation/steps/personal-info-step.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { User, Lock, Users, FileText, X } from 'lucide-react'
import { SecurityFeatures } from '@/components/user-invitation/security-features'
import { WhatsNext } from '@/components/user-invitation/whats-next'
import { SupportContact } from '@/components/user-invitation/support-contact'

interface PersonalInfoStepProps {
  data: any
  updateData: (field: string, value: any) => void
  onNext: () => void
  organization: any
}

export function PersonalInfoStep({ data, updateData, onNext, organization }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!data.firstName?.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!data.lastName?.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!data.acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions'
    }
    
    if (!data.acceptedCompliance) {
      newErrors.compliance = 'You must acknowledge your compliance responsibilities'
    }
    
    if (!data.acceptedSecurity) {
      newErrors.security = 'You must agree to security requirements'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext()
    }
  }

  const handleDecline = () => {
    if (confirm('Are you sure you want to decline this invitation? This action cannot be undone.')) {
      // Handle decline logic
      window.location.href = '/'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Account Setup</h1>
            <p className="text-gray-600">Create your secure account to access {organization.name}'s compliance management system.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={data.firstName}
                    onChange={(e) => updateData('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className={errors.firstName ? 'border-red-500' : ''}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={data.lastName}
                    onChange={(e) => updateData('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className={errors.lastName ? 'border-red-500' : ''}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    readOnly
                    className="bg-gray-50 text-gray-600"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">This email was provided by your organization administrator</p>
              </div>
            </div>

            {/* Role Assignment Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-indigo-600" />
                Role Assignment
              </h3>
              
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-indigo-900">{organization.role}</h4>
                    <p className="text-sm text-indigo-700">Assigned by: {organization.assignedBy}</p>
                  </div>
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Primary Role
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Permissions Included:</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        View compliance dashboard
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Manage policy assignments
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Generate compliance reports
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Audit trail access
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Responsibilities:</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Monitor compliance status
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Review risk assessments
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Coordinate audits
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Training oversight
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-gray-600" />
                Terms and Agreements
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={data.acceptedTerms}
                    onCheckedChange={(checked) => updateData('acceptedTerms', checked)}
                    className={errors.terms ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-700">
                    I have read and agree to the{' '}
                    <button type="button" className="text-blue-600 hover:text-blue-800 underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-blue-600 hover:text-blue-800 underline">
                      Privacy Policy
                    </button>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-sm ml-6">{errors.terms}</p>
                )}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="compliance"
                    checked={data.acceptedCompliance}
                    onCheckedChange={(checked) => updateData('acceptedCompliance', checked)}
                    className={errors.compliance ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="compliance" className="text-sm text-gray-700">
                    I acknowledge my responsibilities as a {organization.role} and agree to maintain confidentiality of sensitive information
                  </Label>
                </div>
                {errors.compliance && (
                  <p className="text-red-500 text-sm ml-6">{errors.compliance}</p>
                )}

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="security"
                    checked={data.acceptedSecurity}
                    onCheckedChange={(checked) => updateData('acceptedSecurity', checked)}
                    className={errors.security ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="security" className="text-sm text-gray-700">
                    I understand the security requirements and agree to follow organizational security policies
                  </Label>
                </div>
                {errors.security && (
                  <p className="text-red-500 text-sm ml-6">{errors.security}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Continue to Security Setup
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleDecline}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <X className="mr-2 h-4 w-4" />
                Decline Invitation
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Information Panel */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <SecurityFeatures />
          <WhatsNext />
          <SupportContact />
        </div>
      </div>
    </div>
  )
}