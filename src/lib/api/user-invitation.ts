// src/lib/api/user-invitation.ts
import { InvitationData, InviteValidationResponse } from '@/lib/types/user-invitation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const invitationApi = {
  async validateInvite(token: string, email: string): Promise<InviteValidationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/invitations/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email }),
      })

      if (!response.ok) {
        throw new Error('Failed to validate invitation')
      }

      return await response.json()
    } catch (error) {
      console.error('Error validating invitation:', error)
      return {
        status: 'invalid',
        error: 'Failed to validate invitation'
      }
    }
  },

  async createAccount(data: InvitationData, token: string): Promise<{
    success: boolean
    user?: any
    error?: string
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/invitations/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          mfaCode: data.mfaCode,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create account')
      }

      const result = await response.json()
      return {
        success: true,
        user: result.user
      }
    } catch (error) {
      console.error('Error creating account:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create account'
      }
    }
  },

  async resendInvite(email: string): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/invitations/resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to resend invitation')
      }

      return { success: true }
    } catch (error) {
      console.error('Error resending invitation:', error)
      return {
        success: false,
        error: 'Failed to resend invitation'
      }
    }
  },

  async setupMFA(token: string): Promise<{
    success: boolean
    qrCode?: string
    secret?: string
    error?: string
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/mfa/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to setup MFA')
      }

      return await response.json()
    } catch (error) {
      console.error('Error setting up MFA:', error)
      return {
        success: false,
        error: 'Failed to setup MFA'
      }
    }
  },

  async verifyMFA(token: string, code: string): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/mfa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error('Invalid MFA code')
      }

      return { success: true }
    } catch (error) {
      console.error('Error verifying MFA:', error)
      return {
        success: false,
        error: 'Invalid verification code'
      }
    }
  }
}