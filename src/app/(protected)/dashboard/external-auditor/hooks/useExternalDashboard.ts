// src/app/(protected)/dashboard/external-dashboard/hooks/useExternalDashboard.ts
'use client'

import { useState, useCallback } from 'react'
import {
  certifications,
  controls,
  evidencePackages,
  findings,
  timelineEvents,
  quickActions,
  auditStatistics,
  complianceMetrics,
  upcomingDeadlines,
  progressItems,
  restrictedItems
} from '../data/dashboard-data'

import { Finding } from '../types'

export function useExternalDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Modal states
  const [ncModalOpen, setNcModalOpen] = useState(false)
  const [ofiModalOpen, setOfiModalOpen] = useState(false)

  // Filter states
  const [controlFilter, setControlFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [findingFilter, setFindingFilter] = useState('all')

  // Dashboard data
  const dashboardData = {
    certifications,
    controls: controls.filter(control => {
      if (controlFilter && !control.name.toLowerCase().includes(controlFilter.toLowerCase())) {
        return false
      }
      if (statusFilter !== 'all' && control.status.toLowerCase() !== statusFilter) {
        return false
      }
      return true
    }),
    evidencePackages,
    findings: findings.filter(finding => {
      if (findingFilter !== 'all' && finding.type.toLowerCase() !== findingFilter) {
        return false
      }
      return true
    }),
    timelineEvents,
    quickActions,
    auditStatistics,
    complianceMetrics,
    upcomingDeadlines,
    progressItems,
    restrictedItems
  }

  // Actions
  const openNCModal = useCallback(() => setNcModalOpen(true), [])
  const closeNCModal = useCallback(() => setNcModalOpen(false), [])
  const openOFIModal = useCallback(() => setOfiModalOpen(true), [])
  const closeOFIModal = useCallback(() => setOfiModalOpen(false), [])

  const submitNC = useCallback(async (ncData: any) => {
    setLoading(true)
    setError(null)
    
    try {
      // Here you would typically make an API call
      console.log('Submitting NC:', ncData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      closeNCModal()
    } catch (err) {
      setError('Failed to submit non-conformity')
    } finally {
      setLoading(false)
    }
  }, [closeNCModal])

  const submitOFI = useCallback(async (ofiData: any) => {
    setLoading(true)
    setError(null)
    
    try {
      // Here you would typically make an API call
      console.log('Submitting OFI:', ofiData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      closeOFIModal()
    } catch (err) {
      setError('Failed to submit opportunity for improvement')
    } finally {
      setLoading(false)
    }
  }, [closeOFIModal])

  const exportData = useCallback(async (type: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Here you would typically make an API call to generate export
      console.log('Exporting data:', type)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real implementation, you would handle the file download here
    } catch (err) {
      setError('Failed to export data')
    } finally {
      setLoading(false)
    }
  }, [])

  const downloadEvidence = useCallback(async (packageId: number) => {
    setLoading(true)
    setError(null)
    
    try {
      // Here you would typically make an API call to download evidence
      console.log('Downloading evidence package:', packageId)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real implementation, you would handle the file download here
    } catch (err) {
      setError('Failed to download evidence package')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    // State
    activeTab,
    loading,
    error,
    ncModalOpen,
    ofiModalOpen,
    controlFilter,
    statusFilter,
    findingFilter,
    
    // Data
    dashboardData,
    
    // Actions
    setActiveTab,
    setControlFilter,
    setStatusFilter,
    setFindingFilter,
    openNCModal,
    closeNCModal,
    openOFIModal,
    closeOFIModal,
    submitNC,
    submitOFI,
    exportData,
    downloadEvidence,
    
    // Utils
    clearError: () => setError(null)
  }
}