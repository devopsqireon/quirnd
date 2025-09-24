// src/app/(protected)/dashboard/external-dashboard/page.tsx
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

import { ExternalDashboardHeader } from './components/external-dashboard-header'
import { CertificationOverview } from './components/certification-overview'
import { CompliancePosture } from './components/compliance-posture'
import { StatementOfApplicability } from './components/statement-of-applicability'
import { EvidencePackages } from './components/evidence-packages'
import { AuditReadiness } from './components/audit-readiness'
import { AuditFindings } from './components/audit-findings'
import { RestrictedAccess } from './components/restricted-access'
import { AuditStatistics } from './components/audit-statistics'
import { AuditTimeline } from './components/audit-timeline'
import { QuickActions } from './components/quick-actions'
import { NCModal } from './components/nc-modal'
import { OFIModal } from './components/ofi-modal'
import { useExternalDashboard } from './hooks/useExternalDashboard'

export default function ExternalAuditorDashboard() {
  const {
    activeTab,
    setActiveTab,
    loading,
    error,
    ncModalOpen,
    ofiModalOpen,
    openNCModal,
    closeNCModal,
    openOFIModal,
    closeOFIModal,
    clearError
  } = useExternalDashboard()

  return (
    <div className="min-h-screen bg-gray-50">
      <ExternalDashboardHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <button 
                onClick={clearError}
                className="ml-2 underline hover:no-underline"
              >
                Dismiss
              </button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <CertificationOverview />
            <CompliancePosture />
            <AuditStatistics />
            <RestrictedAccess />
          </TabsContent>

          <TabsContent value="controls" className="space-y-8">
            <StatementOfApplicability />
          </TabsContent>

          <TabsContent value="evidence" className="space-y-8">
            <EvidencePackages />
            <AuditReadiness />
          </TabsContent>

          <TabsContent value="findings" className="space-y-8">
            <AuditFindings 
              onRaiseNC={openNCModal}
              onRaiseOFI={openOFIModal}
            />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-8">
            <AuditTimeline />
          </TabsContent>

          <TabsContent value="tools" className="space-y-8">
            <QuickActions />
          </TabsContent>
        </Tabs>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Processing...</span>
            </div>
          </div>
        )}
      </main>

      <NCModal 
        open={ncModalOpen} 
        onClose={closeNCModal} 
      />
      <OFIModal 
        open={ofiModalOpen} 
        onClose={closeOFIModal} 
      />
    </div>
  )
}