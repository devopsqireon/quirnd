import { Suspense } from 'react'
import { ComplianceHeader } from '@/components/compliance/compliance-header'
import { ComplianceKPICards } from '@/components/compliance/compliance-kpi-cards'
import { RisksAndControls } from '@/components/compliance/risks-and-controls'
import { IncidentsAndActions } from '@/components/compliance/incidents-and-actions'
import { TrainingAndAwareness } from '@/components/compliance/training-and-awareness'
import { AuditReadiness } from '@/components/compliance/audit-readiness'
import { IntegrationsStatus } from '@/components/compliance/integrations-status'
import { ComplianceMetrics } from '@/components/compliance/compliance-metrics'
import { RecentActivities } from '@/components/compliance/recent-activities'
import { DashboardSkeleton } from '@/components/ui/dashboard-skeleton'

export default function ComplianceDashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={<DashboardSkeleton />}>
        {/* Dashboard Header with Role Filter */}
        <ComplianceHeader />

        {/* Compliance Posture Overview - KPI Cards */}
        <ComplianceKPICards />

        {/* Risks & Controls Section */}
        <RisksAndControls />

        {/* Incidents & Corrective Actions */}
        <IncidentsAndActions />

        {/* Training & Awareness Section */}
        <TrainingAndAwareness />

        {/* Audit Readiness Snapshot */}
        <AuditReadiness />

        {/* Integrations Status */}
        <IntegrationsStatus />

        {/* Compliance Metrics & Analytics */}
        <ComplianceMetrics />

        {/* Recent Activities & Quick Actions */}
        <RecentActivities />
      </Suspense>
    </main>
  )
}