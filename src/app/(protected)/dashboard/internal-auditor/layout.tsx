// src/app/(protected)/dashboard/internal-auditor/layout.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Internal Auditor Dashboard | AuditPro",
  description: "Audit your organization's ISMS with findings and evidence tracking",
}

export default function InternalAuditorLayout({
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