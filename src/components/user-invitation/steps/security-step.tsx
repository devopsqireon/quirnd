// src/components/user-invitation/steps/security-step.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Smartphone, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft, UserPlus } from 'lucide-react'
import { PasswordStrength } from '@/components/user-invitation/password-strength'
import { QRCode } from '@/components/user-invitation/qr-code'

interface SecurityStepProps {
  data: any
  updateData: (field: string, value: any) => void
  onNext: () => void
  onPrev: () => void
  organization: any
}

export function SecurityStep({ data, updateData, onNext, onPrev, organization }: SecurityStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: 'Weak',
    requirements: {
      length: false,
      uppercase: false,
      number: false,
      special: false
    }
  })

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }

    const score = Object.values(requirements).filter(Boolean).length
    let feedback = 'Weak'
    
    if (score === 4) feedback = 'Very Strong'
    else if (score === 3) feedback = 'Strong'
    else if (score === 2) feedback = 'Fair'

    setPasswordStrength({ score, feedback, requirements })
  }

  const handlePasswordChange = (value: string) => {
    updateData('password', value)
    validatePassword(value)
  }

  const handleMfaCodeChange = (value: string) => {
    // Only allow numeric input and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6)
    updateData('mfaCode', numericValue)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!data.password) {
      newErrors.password = 'Password is required'
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Password must meet minimum requirements'
    }
    
    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!data.mfaCode) {
      newErrors.mfaCode = 'Please enter the verification code'
    } else if (data.mfaCode.length !== 6) {
      newErrors.mfaCode = 'Please enter a valid 6-digit code'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate account creation delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      onNext()
    } catch (error) {
      console.error('Account creation failed:', error)
      setErrors({ submit: 'Failed to create account. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Verification</h1>
            <p className="text-gray-600">Set up your password and multi-factor authentication to secure your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Settings Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-green-600" />
                Security Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={data.password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Create a strong password"
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {data.password && (
                    <PasswordStrength 
                      password={data.password}
                      strength={passwordStrength}
                    />
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={data.confirmPassword}
                      onChange={(e) => updateData('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Multi-Factor Authentication Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Smartphone className="mr-2 h-5 w-5 text-purple-600" />
                Multi-Factor Authentication
                <span className="ml-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Required by Organization
                </span>
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Enhanced Security Required</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Your organization requires multi-factor authentication to comply with ISO 27001 security standards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Step 1: Scan QR Code</h4>
                  <QRCode />
                  <div className="mt-3 text-xs text-gray-500">
                    <p className="font-medium mb-1">Recommended Apps:</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <span className="text-blue-600 mr-1">●</span>
                        Google Authenticator
                      </span>
                      <span className="flex items-center">
                        <span className="text-green-600 mr-1">●</span>
                        Authy
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Step 2: Enter Verification Code</h4>
                  <div>
                    <Label htmlFor="mfaCode">
                      6-Digit Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="mfaCode"
                      type="text"
                      maxLength={6}
                      value={data.mfaCode}
                      onChange={(e) => handleMfaCodeChange(e.target.value)}
                      placeholder="000000"
                      className={`text-center text-lg font-mono tracking-widest ${
                        errors.mfaCode ? 'border-red-500' : ''
                      }`}
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter the 6-digit code from your authenticator app</p>
                    {errors.mfaCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.mfaCode}</p>
                    )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-700 mb-1">Backup Options:</p>
                    <button 
                      type="button" 
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                      onClick={() => alert('SMS backup setup will be available after account creation')}
                    >
                      Setup SMS backup codes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Display submission errors */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                  <p className="text-sm text-red-700">{errors.submit}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onPrev}
                className="order-2 sm:order-1"
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 order-1 sm:order-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Information Panel */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          {/* Security Tips */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-600" />
              Security Tips
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Use a unique password for this account</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Keep your authenticator app secure</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Never share your verification codes</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Log out when using shared computers</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Enable device notifications for login attempts</span>
              </div>
            </div>
          </div>

          {/* MFA Benefits */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Why MFA is Required</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• Protects against password breaches</p>
              <p>• Meets ISO 27001 compliance requirements</p>
              <p>• Reduces unauthorized access by 99.9%</p>
              <p>• Required for compliance role access</p>
              <p>• Enables secure remote work capabilities</p>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
            <h3 className="font-semibold text-yellow-900 mb-4">Password Requirements</h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>✓ Minimum 8 characters</p>
              <p>✓ At least one uppercase letter</p>
              <p>✓ At least one number</p>
              <p>✓ At least one special character</p>
              <p>✓ Different from common passwords</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}