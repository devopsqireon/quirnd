// src/app/(protected)/dashboard/internal-auditor/page.tsx
"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/internal-auditor/dashboard-header"
import { ComplianceOverview } from "@/components/dashboard/internal-auditor/compliance-overview"
import { RisksControlsSnapshot } from "@/components/dashboard/internal-auditor/risks-controls-snapshot"
import { PoliciesTraining } from "@/components/dashboard/internal-auditor/policies-training"
import { IncidentsActions } from "@/components/dashboard/internal-auditor/incidents-actions"
import { AuditReadiness } from "@/components/dashboard/internal-auditor/audit-readiness"
import { EvidenceLibrary } from "@/components/dashboard/internal-auditor/evidence-library"
import { RecentActivities } from "@/components/dashboard/internal-auditor/recent-activities"
import { AuditorSidebar } from "@/components/dashboard/internal-auditor/auditor-sidebar"
import { NCModal } from "@/components/dashboard/internal-auditor/modals/nc-modal"
import { OFIModal } from "@/components/dashboard/internal-auditor/modals/ofi-modal"

export default function AuditorDashboard() {
  const [isNCModalOpen, setIsNCModalOpen] = useState(false)
  const [isOFIModalOpen, setIsOFIModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <AuditorSidebar 
        onOpenNCModal={() => setIsNCModalOpen(true)}
        onOpenOFIModal={() => setIsOFIModalOpen(true)}
      />
      
      <div>
        <DashboardHeader 
          onOpenNCModal={() => setIsNCModalOpen(true)}
          onOpenOFIModal={() => setIsOFIModalOpen(true)}
        />
        
        <main>
          <ComplianceOverview />
          <RisksControlsSnapshot />
          <PoliciesTraining />
          <IncidentsActions />
          <AuditReadiness />
          <EvidenceLibrary />
          <RecentActivities />
        </main>
      </div>

      <NCModal 
        isOpen={isNCModalOpen}
        onClose={() => setIsNCModalOpen(false)}
      />
      
      <OFIModal 
        isOpen={isOFIModalOpen}
        onClose={() => setIsOFIModalOpen(false)}
      />
    </div>
  )
}