// src/app/(protected)/dashboard/external-dashboard/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'External Auditor Dashboard | Improvement Readiness System',
  description: 'External auditor portal for certification audit activities, evidence review, and findings management.',
}

interface ExternalDashboardLayoutProps {
  children: React.ReactNode
}

export default function ExternalDashboardLayout({
  children,
}: ExternalDashboardLayoutProps) {
  return (
    <div className="external-dashboard-layout">
      {children}
    </div>
  )
}