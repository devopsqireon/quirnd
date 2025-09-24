// src/lib/utils/user-invitation.ts
import { InvitationData, PasswordStrength, StepValidation } from '@/lib/types/user-invitation'

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): PasswordStrength => {
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

  return { score, feedback, requirements }
}

export const validatePersonalInfoStep = (data: InvitationData): StepValidation => {
  const errors: Record<string, string> = {}
  
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required'
  }
  
  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required'
  }
  
  if (!data.acceptedTerms) {
    errors.terms = 'You must accept the terms and conditions'
  }
  
  if (!data.acceptedCompliance) {
    errors.compliance = 'You must acknowledge your compliance responsibilities'
  }
  
  if (!data.acceptedSecurity) {
    errors.security = 'You must agree to security requirements'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateSecurityStep = (data: InvitationData): StepValidation => {
  const errors: Record<string, string> = {}
  const passwordStrength = validatePassword(data.password)
  
  if (!data.password) {
    errors.password = 'Password is required'
  } else if (passwordStrength.score < 3) {
    errors.password = 'Password must meet minimum requirements'
  }
  
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  
  if (!data.mfaCode || data.mfaCode.length !== 6) {
    errors.mfaCode = 'Please enter a valid 6-digit code'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const formatMfaCode = (value: string): string => {
  // Remove non-numeric characters and limit to 6 digits
  return value.replace(/\D/g, '').slice(0, 6)
}

export const generateSecretKey = (): string => {
  // Generate a random secret key for TOTP
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let result = ''
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const validateInviteToken = async (token: string, email: string): Promise<{
  status: 'valid' | 'expired' | 'activated' | 'invalid'
  organizationInfo?: any
}> => {
  try {
    // Simulate API call to validate invite token
    // In a real implementation, this would make an HTTP request
    
    if (!token || !email) {
      return { status: 'invalid' }
    }

    // Mock validation logic
    if (token === 'expired') {
      return { status: 'expired' }
    }
    
    if (token === 'activated') {
      return { status: 'activated' }
    }

    // Return valid status with organization info
    return {
      status: 'valid',
      organizationInfo: {
        name: 'TechCorp Industries',
        logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/654f49ee2a-52cce7bc148b016a8211.png',
        role: 'Compliance Officer',
        employeeCount: '500+',
        isoCertified: true,
        assignedBy: 'Sarah Johnson (Admin)'
      }
    }
  } catch (error) {
    console.error('Error validating invite token:', error)
    return { status: 'invalid' }
  }
}

export const createUserAccount = async (data: InvitationData, token: string): Promise<{
  success: boolean
  error?: string
}> => {
  try {
    // Simulate API call to create user account
    console.log('Creating account with data:', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: 'Compliance Officer',
      mfaEnabled: true
    })

    // Simulate success response
    return { success: true }
  } catch (error) {
    console.error('Error creating user account:', error)
    return { 
      success: false, 
      error: 'Failed to create account. Please try again.' 
    }
  }
}

export const getProgressPercentage = (step: number, totalSteps: number): number => {
  return Math.round((step / totalSteps) * 100)
}

export const isStepComplete = (step: number, data: InvitationData): boolean => {
  switch (step) {
    case 1:
      return validatePersonalInfoStep(data).isValid
    case 2:
      return validateSecurityStep(data).isValid
    case 3:
      return true // Welcome step is always complete
    default:
      return false
  }
}