// src/lib/types/user-invitation.ts
export interface InvitationData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    mfaCode: string
    acceptedTerms: boolean
    acceptedCompliance: boolean
    acceptedSecurity: boolean
  }
  
  export interface OrganizationInfo {
    name: string
    logo: string
    role: string
    employeeCount: string
    isoCertified: boolean
    assignedBy: string
  }
  
  export interface PasswordStrength {
    score: number
    feedback: string
    requirements: {
      length: boolean
      uppercase: boolean
      number: boolean
      special: boolean
    }
  }
  
  export interface InviteValidationResponse {
    status: 'valid' | 'expired' | 'activated' | 'invalid'
    organizationInfo?: OrganizationInfo
    userEmail?: string
    error?: string
  }
  
  export type InvitationStep = 1 | 2 | 3
  
  export interface StepValidation {
    isValid: boolean
    errors: Record<string, string>
  }
  
  export interface SecurityFeature {
    icon: string
    title: string
    description: string
    color: string
  }