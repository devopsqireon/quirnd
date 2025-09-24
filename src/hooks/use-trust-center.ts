// src/hooks/use-trust-center.ts
import { useState, useCallback } from 'react'

export function useTrustCenter() {
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false)
  const [evidenceType, setEvidenceType] = useState('')

  const openCertificateModal = useCallback(() => {
    setCertificateModalOpen(true)
  }, [])

  const closeCertificateModal = useCallback(() => {
    setCertificateModalOpen(false)
  }, [])

  const openEvidenceModal = useCallback((type: string) => {
    setEvidenceType(type)
    setEvidenceModalOpen(true)
  }, [])

  const closeEvidenceModal = useCallback(() => {
    setEvidenceModalOpen(false)
    setEvidenceType('')
  }, [])

  return {
    certificateModalOpen,
    evidenceModalOpen,
    evidenceType,
    openCertificateModal,
    closeCertificateModal,
    openEvidenceModal,
    closeEvidenceModal
  }
}