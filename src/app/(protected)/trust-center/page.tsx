// src/app/(protected)/trust-center/page.tsx
'use client'

import { useState } from 'react'
import { Header } from './components/header'
import { InfoBanner } from './components/info-banner'
import { CertificationStatus } from './components/certification-status'
import { CertificateDownload } from './components/certificate-download'
import { ScopeCertification } from './components/scope-certification'
import { StatementOfApplicability } from './components/statement-of-applicability'
import { ComplianceSummary } from './components/compliance-summary'
import { EvidenceAccess } from './components/evidence-access'
import { AuditHistory } from './components/audit-history'
import { SecurityMetrics } from './components/security-metrics'
import { ContactInformation } from './components/contact-information'
import { CertificateModal } from './components/modals/certificate-modal'
import { EvidenceModal } from './components/modals/evidence-modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TrustCenterPage() {
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false)
  const [evidenceType, setEvidenceType] = useState('')

  const openCertificateModal = () => setCertificateModalOpen(true)
  const closeCertificateModal = () => setCertificateModalOpen(false)

  const openEvidenceModal = (type: string) => {
    setEvidenceType(type)
    setEvidenceModalOpen(true)
  }
  const closeEvidenceModal = () => setEvidenceModalOpen(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <InfoBanner />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="certification" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="certification">Certification</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="certification" className="space-y-12">
            <CertificationStatus />
            <CertificateDownload onViewCertificate={openCertificateModal} />
            <ScopeCertification />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-12">
            <StatementOfApplicability />
            <ComplianceSummary />
          </TabsContent>

          <TabsContent value="audits" className="space-y-12">
            <AuditHistory />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-12">
            <SecurityMetrics />
          </TabsContent>

          <TabsContent value="evidence" className="space-y-12">
            <EvidenceAccess onRequestAccess={openEvidenceModal} />
          </TabsContent>

          <TabsContent value="contact" className="space-y-12">
            <ContactInformation />
          </TabsContent>
        </Tabs>
      </main>

      <CertificateModal 
        isOpen={certificateModalOpen} 
        onClose={closeCertificateModal} 
      />
      <EvidenceModal 
        isOpen={evidenceModalOpen} 
        onClose={closeEvidenceModal}
        evidenceType={evidenceType}
      />
    </div>
  )
}