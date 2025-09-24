// src/types/trust-center.ts
export interface CertificationDetails {
    certificateId: string
    certificationBody: string
    issueDate: string
    expiryDate: string
    status: 'active' | 'expired' | 'pending'
  }
  
  export interface AuditEvent {
    title: string
    date: string
    description: string
    status: string
    statusColor: string
    nonConformities?: number
    opportunities?: number
  }
  
  export interface ComplianceMetric {
    title: string
    value: string
    description: string
    color: string
    percentage?: number
  }
  
  export interface EvidencePackage {
    id: string
    title: string
    description: string
    accessLevel: 'public' | 'restricted' | 'confidential'
  }
  
  export interface ContactMember {
    name: string
    role: string
    email: string
    avatar?: string
    initials: string
  }