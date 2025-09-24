// src/app/(protected)/continuity-recovery/layout.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Continuity & Recovery | IRS Platform",
  description: "Maintain business operations and recover IT systems during disruptions",
}

interface ContinuityRecoveryLayoutProps {
  children: React.ReactNode
}

export default function ContinuityRecoveryLayout({
  children,
}: ContinuityRecoveryLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}