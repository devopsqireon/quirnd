// src/app/(protected)/trust-center/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trust Center - SecureVault Technologies',
  description: 'ISO 27001 certification status, compliance documentation, and security metrics for SecureVault Technologies.',
}

export default function TrustCenterLayout({
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