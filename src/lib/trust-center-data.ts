// src/lib/trust-center-data.ts
import { CertificationDetails, AuditEvent, ComplianceMetric, EvidencePackage, ContactMember } from '@/types/trust-center'

export const certificationData: CertificationDetails = {
  certificateId: 'ISO-27001-2024-SV-001',
  certificationBody: 'BSI Group',
  issueDate: 'March 15, 2024',
  expiryDate: 'March 14, 2027',
  status: 'active'
}

export const auditHistory: AuditEvent[] = [
  {
    title: 'Initial Certification Audit',
    date: 'March 2024',
    description: 'BSI Group conducted comprehensive stage 1 and stage 2 audits',
    status: 'Certificate Issued',
    statusColor: 'bg-green-100 text-green-800',
    nonConformities: 0,
    opportunities: 3
  },
  {
    title: 'First Surveillance Audit',
    date: 'September 2024',
    description: 'Annual surveillance audit to maintain certification',
    status: 'Passed',
    statusColor: 'bg-green-100 text-green-800',
    nonConformities: 0,
    opportunities: 2
  },
  {
    title: 'Second Surveillance Audit',
    date: 'March 2025 (Scheduled)',
    description: 'Upcoming surveillance audit scheduled for mid-March 2025',
    status: 'Scheduled',
    statusColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    title: 'Renewal Audit',
    date: 'March 2027 (Planned)',
    description: 'Full recertification audit required before certificate expiry',
    status: 'Planned',
    statusColor: 'bg-orange-100 text-orange-800'
  }
]

export const complianceMetrics: ComplianceMetric[] = [
  {
    title: 'Risks Treated',
    value: '98%',
    description: 'Identified risks with treatment plans',
    color: 'green',
    percentage: 98
  },
  {
    title: 'Policies Published',
    value: '100%',
    description: 'Required policies in effect',
    color: 'blue',
    percentage: 100
  },
  {
    title: 'Training Completion',
    value: '94%',
    description: 'Staff security awareness training',
    color: 'purple',
    percentage: 94
  },
  {
    title: 'Audit Compliance',
    value: '100%',
    description: 'Internal audit findings resolved',
    color: 'orange',
    percentage: 100
  }
]

export const evidencePackages: EvidencePackage[] = [
  {
    id: 'risk-assessment',
    title: 'Risk Assessment Documentation',
    description: 'Detailed risk register, treatment plans, and assessment methodology',
    accessLevel: 'restricted'
  },
  {
    id: 'policies',
    title: 'Policy & Procedure Library',
    description: 'Complete set of information security policies and procedures',
    accessLevel: 'restricted'
  },
  {
    id: 'audit-reports',
    title: 'Audit Reports & Findings',
    description: 'Internal and external audit reports with corrective actions',
    accessLevel: 'confidential'
  },
  {
    id: 'technical-controls',
    title: 'Technical Security Controls',
    description: 'Network diagrams, security configurations, and control evidence',
    accessLevel: 'confidential'
  }
]

export const complianceTeam: ContactMember[] = [
  {
    name: 'Sarah Mitchell',
    role: 'Chief Information Security Officer',
    email: 'sarah.mitchell@securevault.com',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
    initials: 'SM'
  },
  {
    name: 'Michael Chen',
    role: 'ISO 27001 Lead Implementer',
    email: 'michael.chen@securevault.com',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    initials: 'MC'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Compliance Analyst',
    email: 'emily.rodriguez@securevault.com',
    avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
    initials: 'ER'
  }
]