// src/app/user-invitation/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Invitation - Qireon Compliance Platform',
  description: 'Complete your account setup to join your organization\'s compliance management system.',
  robots: 'noindex, nofollow', // Prevent indexing of invitation pages
}

export default function UserInvitationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}