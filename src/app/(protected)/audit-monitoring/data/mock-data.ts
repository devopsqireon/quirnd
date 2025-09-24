// /app/(protected)/audit-monitoring/data/mock-data.ts

import type { 
    AuditLog, 
    Evidence, 
    MonitoringReport, 
    InternalAudit, 
    Finding, 
    Recommendation,
    CorrectiveAction,
    NonConformity,
    User
  } from '../types';
  
  export const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Security Analyst',
      department: 'Information Security'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Compliance Officer',
      department: 'Compliance'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'Internal Auditor',
      department: 'Internal Audit'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'Risk Manager',
      department: 'Risk Management'
    },
    {
      id: '5',
      name: 'Admin User',
      email: 'admin@company.com',
      role: 'System Administrator',
      department: 'IT Operations'
    }
  ];
  
  export const mockAuditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: 'john.doe@company.com',
      action: 'Document Access',
      resource: 'Security Policy v2.1',
      category: 'access',
      severity: 'low',
      details: 'User accessed security policy document for review',
      ip: '192.168.1.100',
      status: 'success',
      metadata: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: 'sess_123456789'
      }
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      user: 'admin@company.com',
      action: 'Control Modified',
      resource: 'Access Control AC-001',
      category: 'modification',
      severity: 'high',
      details: 'Modified access control permissions for HR department',
      ip: '192.168.1.10',
      status: 'success',
      metadata: {
        previousValue: 'read-only',
        newValue: 'read-write',
        approvedBy: 'jane.smith@company.com'
      }
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      user: 'unknown',
      action: 'Failed Login Attempt',
      resource: 'Admin Portal',
      category: 'security',
      severity: 'critical',
      details: 'Multiple failed login attempts detected from external IP',
      ip: '203.0.113.42',
      status: 'failed',
      metadata: {
        attemptCount: 5,
        accountLocked: true,
        alertsSent: ['security@company.com']
      }
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      user: 'mike.johnson@company.com',
      action: 'Evidence Upload',
      resource: 'Audit Evidence AUD-2024-001',
      category: 'creation',
      severity: 'medium',
      details: 'Uploaded penetration testing report as audit evidence',
      ip: '192.168.1.75',
      status: 'success',
      metadata: {
        fileName: 'pentest_report_q3_2024.pdf',
        fileSize: 5242880,
        auditId: 'audit-2'
      }
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      user: 'system',
      action: 'Backup Completed',
      resource: 'Database Backup',
      category: 'system',
      severity: 'low',
      details: 'Daily database backup completed successfully',
      ip: '127.0.0.1',
      status: 'success',
      metadata: {
        backupSize: '2.3GB',
        duration: '45 minutes',
        location: '/backups/2024-09-18'
      }
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      user: 'sarah.wilson@company.com',
      action: 'Risk Assessment Updated',
      resource: 'Risk Register RISK-2024-015',
      category: 'modification',
      severity: 'medium',
      details: 'Updated risk likelihood and impact scores',
      ip: '192.168.1.89',
      status: 'success',
      metadata: {
        riskId: 'RISK-2024-015',
        previousScore: 3.2,
        newScore: 2.8,
        reviewDate: new Date().toISOString()
      }
    }
  ];
  
  export const mockEvidence: Evidence[] = [
    {
      id: '1',
      name: 'ISO 27001 Certificate 2024.pdf',
      type: 'certificate',
      category: 'Compliance Certification',
      uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      uploadedBy: 'jane.smith@company.com',
      fileSize: 2048000,
      filePath: '/evidence/certificates/iso27001_2024.pdf',
      mimeType: 'application/pdf',
      tags: ['iso27001', 'certificate', 'compliance', '2024'],
      linkedAudits: ['audit-1', 'audit-3'],
      linkedControls: ['AC-001', 'AC-002'],
      status: 'verified',
      description: 'Annual ISO 27001 certification document from accredited certification body',
      retention: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000),
      version: '1.0',
      approvedBy: 'mike.johnson@company.com',
      approvedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      checksum: 'sha256:a1b2c3d4e5f6...'
    },
    {
      id: '2',
      name: 'Penetration Test Report Q3.pdf',
      type: 'report',
      category: 'Security Assessment',
      uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      uploadedBy: 'john.doe@company.com',
      fileSize: 5120000,
      filePath: '/evidence/reports/pentest_q3_2024.pdf',
      mimeType: 'application/pdf',
      tags: ['pentest', 'security', 'vulnerability', 'q3-2024'],
      linkedAudits: ['audit-2'],
      linkedControls: ['SC-001', 'SC-007', 'SC-018'],
      status: 'verified',
      description: 'Third-party penetration testing results conducted by CyberSec Solutions',
      retention: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000),
      version: '1.2',
      approvedBy: 'sarah.wilson@company.com',
      approvedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      checksum: 'sha256:b2c3d4e5f6a1...'
    },
    {
      id: '3',
      name: 'Employee Security Training Matrix.xlsx',
      type: 'document',
      category: 'Training Records',
      uploadDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      uploadedBy: 'jane.smith@company.com',
      fileSize: 1536000,
      filePath: '/evidence/training/security_training_matrix.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      tags: ['training', 'security-awareness', 'employees', 'matrix'],
      linkedAudits: ['audit-1'],
      linkedControls: ['AT-001', 'AT-002'],
      status: 'verified',
      description: 'Comprehensive security training completion matrix for all employees',
      retention: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000),
      version: '2.1',
      approvedBy: 'mike.johnson@company.com',
      approvedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Business Continuity Plan 2024.docx',
      type: 'procedure',
      category: 'Business Continuity',
      uploadDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      uploadedBy: 'sarah.wilson@company.com',
      fileSize: 3072000,
      filePath: '/evidence/procedures/bcp_2024.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      tags: ['bcp', 'continuity', 'disaster-recovery', 'procedures'],
      linkedAudits: ['audit-3'],
      linkedControls: ['CP-001', 'CP-002', 'CP-006'],
      status: 'pending',
      description: 'Updated business continuity plan including disaster recovery procedures',
      retention: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000),
      version: '3.0'
    },
    {
      id: '5',
      name: 'Incident Response Evidence - INC-2024-042.zip',
      type: 'other',
      category: 'Incident Management',
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      uploadedBy: 'john.doe@company.com',
      fileSize: 8192000,
      filePath: '/evidence/incidents/inc_2024_042.zip',
      mimeType: 'application/zip',
      tags: ['incident', 'response', 'forensics', 'security-breach'],
      linkedAudits: ['audit-2'],
      linkedControls: ['IR-001', 'IR-004', 'IR-008'],
      status: 'verified',
      description: 'Digital forensics evidence and incident response documentation',
      retention: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
      version: '1.0',
      approvedBy: 'mike.johnson@company.com',
      approvedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      checksum: 'sha256:c3d4e5f6a1b2...'
    }
  ];
  
  export const mockFindings: Finding[] = [
    {
      id: '1',
      title: 'Inadequate Password Policy Enforcement',
      description: 'Current password policy allows weak passwords and lacks complexity requirements',
      severity: 'high',
      category: 'Access Control',
      evidence: ['evidence-2'],
      status: 'open',
      assignedTo: 'john.doe@company.com',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Missing Security Awareness Training',
      description: 'Several employees have not completed mandatory security awareness training',
      severity: 'medium',
      category: 'Training & Awareness',
      evidence: ['evidence-3'],
      status: 'in-progress',
      assignedTo: 'jane.smith@company.com',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      createdDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Outdated Backup Recovery Procedures',
      description: 'Business continuity plan contains outdated backup and recovery procedures',
      severity: 'medium',
      category: 'Business Continuity',
      evidence: ['evidence-4'],
      status: 'resolved',
      assignedTo: 'sarah.wilson@company.com',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      createdDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
    }
  ];
  
  export const mockRecommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Implement Multi-Factor Authentication',
      description: 'Deploy MFA across all critical systems to enhance access security',
      priority: 'high',
      category: 'Security Enhancement',
      estimatedEffort: '3-4 weeks',
      estimatedCost: 15000,
      targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      status: 'approved',
      assignedTo: 'john.doe@company.com',
      relatedFindings: ['1']
    },
    {
      id: '2',
      title: 'Enhanced Security Training Program',
      description: 'Develop comprehensive security awareness training with regular assessments',
      priority: 'medium',
      category: 'Training & Awareness',
      estimatedEffort: '2-3 weeks',
      estimatedCost: 8000,
      targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      status: 'in-progress',
      assignedTo: 'jane.smith@company.com',
      relatedFindings: ['2']
    },
    {
      id: '3',
      title: 'Automated Backup Testing',
      description: 'Implement automated testing of backup and recovery procedures',
      priority: 'medium',
      category: 'Business Continuity',
      estimatedEffort: '1-2 weeks',
      estimatedCost: 5000,
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'completed',
      assignedTo: 'sarah.wilson@company.com',
      relatedFindings: ['3']
    }
  ];
  
  export const mockCorrectiveActions: CorrectiveAction[] = [
    {
      id: '1',
      auditId: 'audit-1',
      title: 'Update Password Policy Configuration',
      description: 'Configure Active Directory to enforce complex password requirements',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'john.doe@company.com',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      evidence: [],
      cost: 2000,
      relatedFinding: '1'
    },
    {
      id: '2',
      auditId: 'audit-1',
      title: 'Schedule Outstanding Security Training',
      description: 'Coordinate with HR to schedule mandatory training for remaining employees',
      priority: 'medium',
      status: 'planned',
      assignedTo: 'jane.smith@company.com',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      evidence: [],
      cost: 1500,
      relatedFinding: '2'
    },
    {
      id: '3',
      auditId: 'audit-3',
      title: 'Update Business Continuity Plan',
      description: 'Revise BCP with current backup and recovery procedures',
      priority: 'medium',
      status: 'completed',
      assignedTo: 'sarah.wilson@company.com',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      completedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      evidence: ['evidence-4'],
      cost: 3000,
      relatedFinding: '3'
    }
  ];
  
  export const mockNonConformities: NonConformity[] = [
    {
      id: '1',
      auditId: 'audit-1',
      title: 'Non-compliance with ISO 27001 A.9.4.3',
      description: 'Password management system does not meet minimum complexity requirements',
      clause: 'A.9.4.3',
      severity: 'major',
      status: 'open',
      identifiedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      rootCause: 'Legacy system configuration not updated to current standards',
      correctiveActions: ['1'],
      evidence: ['evidence-2']
    },
    {
      id: '2',
      auditId: 'audit-1',
      title: 'Non-compliance with ISO 27001 A.7.2.2',
      description: 'Information security awareness training not completed by all personnel',
      clause: 'A.7.2.2',
      severity: 'minor',
      status: 'in-progress',
      identifiedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      rootCause: 'Training schedule not aligned with new employee onboarding',
      correctiveActions: ['2'],
      evidence: ['evidence-3']
    }
  ];
  
  export const mockMonitoringReports: MonitoringReport[] = [
    {
      id: '1',
      name: 'Q3 2024 Risk Assessment Report',
      type: 'risk-assessment',
      generatedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      generatedBy: 'sarah.wilson@company.com',
      period: 'Q3 2024',
      status: 'published',
      metrics: {
        totalRisks: 47,
        highRisks: 8,
        mitigatedRisks: 23,
        riskScore: 3.2,
        riskTrend: 'improving'
      },
      findings: mockFindings.slice(0, 2),
      recommendations: mockRecommendations.slice(0, 2),
      recipients: ['management@company.com', 'board@company.com']
    },
    {
      id: '2',
      name: 'September 2024 Control Effectiveness Report',
      type: 'control-effectiveness',
      generatedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      generatedBy: 'mike.johnson@company.com',
      period: 'September 2024',
      status: 'published',
      metrics: {
        totalControls: 156,
        effectiveControls: 142,
        ineffectiveControls: 14,
        effectivenessRate: 91,
        improvementTrend: 'positive'
      },
      findings: mockFindings.slice(1, 3),
      recommendations: mockRecommendations.slice(1, 3),
      recipients: ['compliance@company.com', 'management@company.com']
    },
    {
      id: '3',
      name: 'Security Training Coverage Analysis',
      type: 'training-coverage',
      generatedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      generatedBy: 'jane.smith@company.com',
      period: 'Q3 2024',
      status: 'published',
      metrics: {
        totalEmployees: 287,
        trainedEmployees: 244,
        coverageRate: 85,
        avgCompletionTime: 24,
        overdueTraining: 43
      },
      findings: [mockFindings[1]],
      recommendations: [mockRecommendations[1]],
      recipients: ['hr@company.com', 'compliance@company.com']
    },
    {
      id: '4',
      name: 'ISO 27001 Compliance Status Dashboard',
      type: 'compliance-status',
      generatedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      generatedBy: 'jane.smith@company.com',
      period: 'September 2024',
      status: 'published',
      metrics: {
        totalControls: 114,
        compliantControls: 98,
        nonCompliantControls: 16,
        complianceRate: 86,
        certificationStatus: 'valid',
        nextAudit: '2024-12-15'
      },
      findings: mockFindings,
      recommendations: mockRecommendations,
      recipients: ['management@company.com', 'compliance@company.com', 'board@company.com']
    }
  ];
  
  export const mockInternalAudits: InternalAudit[] = [
    {
      id: '1',
      title: 'ISO 27001 Annual Surveillance Audit',
      description: 'Annual surveillance audit of the Information Security Management System',
      scope: 'Information Security Management System - All Controls',
      auditType: 'compliance',
      standard: 'ISO 27001:2022',
      status: 'in-progress',
      priority: 'high',
      scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      auditor: 'Mike Johnson, CISA',
      auditTeam: ['mike.johnson@company.com', 'jane.smith@company.com'],
      findings: 3,
      actions: 5,
      progress: 65,
      nextReview: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      evidenceCount: 23,
      budget: 25000,
      actualCost: 18500,
      correctiveActions: mockCorrectiveActions.slice(0, 2),
      nonConformities: mockNonConformities
    },
    {
      id: '2',
      title: 'IT Security Controls Review',
      description: 'Comprehensive review of technical security controls and implementations',
      scope: 'Network Security, Access Controls, and System Hardening',
      auditType: 'security',
      standard: 'NIST Cybersecurity Framework',
      status: 'completed',
      priority: 'medium',
      scheduledDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      completedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      auditor: 'John Doe, CISSP',
      auditTeam: ['john.doe@company.com', 'sarah.wilson@company.com'],
      findings: 8,
      actions: 12,
      progress: 100,
      evidenceCount: 18,
      budget: 15000,
      actualCost: 14200,
      correctiveActions: [mockCorrectiveActions[0]],
      nonConformities: []
    },
    {
      id: '3',
      title: 'Business Continuity Planning Audit',
      description: 'Assessment of business continuity and disaster recovery capabilities',
      scope: 'Business Continuity Planning, Disaster Recovery, and Crisis Management',
      auditType: 'operational',
      standard: 'ISO 22301:2019',
      status: 'planned',
      priority: 'medium',
      scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      auditor: 'Sarah Wilson, CBCP',
      auditTeam: ['sarah.wilson@company.com'],
      findings: 0,
      actions: 0,
      progress: 0,
      evidenceCount: 0,
      budget: 18000,
      correctiveActions: [mockCorrectiveActions[2]],
      nonConformities: []
    },
    {
      id: '4',
      title: 'Data Privacy Compliance Review',
      description: 'Review of data privacy controls and GDPR compliance measures',
      scope: 'Data Processing, Privacy Controls, and Consent Management',
      auditType: 'compliance',
      standard: 'GDPR',
      status: 'on-hold',
      priority: 'high',
      scheduledDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      auditor: 'Jane Smith, CIPP/E',
      auditTeam: ['jane.smith@company.com', 'mike.johnson@company.com'],
      findings: 2,
      actions: 3,
      progress: 25,
      evidenceCount: 8,
      budget: 20000,
      correctiveActions: [],
      nonConformities: []
    },
    {
      id: '5',
      title: 'Third-Party Risk Assessment',
      description: 'Assessment of vendor and supplier security and compliance posture',
      scope: 'Vendor Management, Supply Chain Security, and Third-Party Contracts',
      auditType: 'security',
      standard: 'Custom Framework',
      status: 'completed',
      priority: 'medium',
      scheduledDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      completedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      auditor: 'Sarah Wilson, CRMA',
      auditTeam: ['sarah.wilson@company.com', 'john.doe@company.com'],
      findings: 5,
      actions: 7,
      progress: 100,
      evidenceCount: 12,
      budget: 12000,
      actualCost: 11800,
      correctiveActions: [],
      nonConformities: []
    },
    {
      id: '6',
      title: 'Financial Controls Audit',
      description: 'Review of financial controls and SOX compliance requirements',
      scope: 'Financial Reporting Controls, IT General Controls, and SOX Compliance',
      auditType: 'financial',
      standard: 'SOX',
      status: 'planned',
      priority: 'critical',
      scheduledDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      auditor: 'External Auditor - PwC',
      auditTeam: ['external.auditor@pwc.com', 'mike.johnson@company.com'],
      findings: 0,
      actions: 0,
      progress: 0,
      evidenceCount: 0,
      budget: 35000,
      correctiveActions: [],
      nonConformities: []
    }
  ];
  
  // Mock data for dashboard metrics
  export const mockDashboardMetrics = {
    totalAuditLogs: mockAuditLogs.length,
    criticalLogs: mockAuditLogs.filter(log => log.severity === 'critical').length,
    failedActions: mockAuditLogs.filter(log => log.status === 'failed').length,
    
    totalEvidence: mockEvidence.length,
    verifiedEvidence: mockEvidence.filter(evidence => evidence.status === 'verified').length,
    pendingEvidence: mockEvidence.filter(evidence => evidence.status === 'pending').length,
    
    totalAudits: mockInternalAudits.length,
    activeAudits: mockInternalAudits.filter(audit => audit.status === 'in-progress').length,
    completedAudits: mockInternalAudits.filter(audit => audit.status === 'completed').length,
    overdueAudits: mockInternalAudits.filter(audit => 
      audit.status === 'in-progress' && 
      audit.scheduledDate < new Date()
    ).length,
    
    totalFindings: mockFindings.length,
    openFindings: mockFindings.filter(finding => finding.status === 'open').length,
    resolvedFindings: mockFindings.filter(finding => finding.status === 'resolved').length,
    
    totalActions: mockCorrectiveActions.length,
    completedActions: mockCorrectiveActions.filter(action => action.status === 'completed').length,
    overdueActions: mockCorrectiveActions.filter(action => 
      action.status !== 'completed' && 
      action.dueDate < new Date()
    ).length,
  
    riskScore: 3.2,
    controlEffectiveness: 91,
    trainingCoverage: 85,
    complianceRate: 86
  };
  
  // Mock chart data for reports
  export const mockChartData = {
    riskTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [{
        label: 'Risk Score',
        data: [3.8, 3.6, 3.4, 3.5, 3.3, 3.1, 3.0, 3.1, 3.2],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true
      }]
    },
    
    auditLogCategories: {
      labels: ['Access', 'Modification', 'Security', 'System', 'Creation', 'Deletion'],
      datasets: [{
        data: [
          mockAuditLogs.filter(log => log.category === 'access').length,
          mockAuditLogs.filter(log => log.category === 'modification').length,
          mockAuditLogs.filter(log => log.category === 'security').length,
          mockAuditLogs.filter(log => log.category === 'system').length,
          mockAuditLogs.filter(log => log.category === 'creation').length,
          mockAuditLogs.filter(log => log.category === 'deletion').length
        ],
        backgroundColor: [
          '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'
        ]
      }]
    },
  
    findingsBySeverity: {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      datasets: [{
        data: [
          mockFindings.filter(f => f.severity === 'critical').length,
          mockFindings.filter(f => f.severity === 'high').length,
          mockFindings.filter(f => f.severity === 'medium').length,
          mockFindings.filter(f => f.severity === 'low').length
        ],
        backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6']
      }]
    },
  
    auditProgress: {
      labels: mockInternalAudits.map(audit => audit.title.substring(0, 20) + '...'),
      datasets: [{
        label: 'Progress %',
        data: mockInternalAudits.map(audit => audit.progress),
        backgroundColor: '#10B981',
        borderColor: '#059669',
        borderWidth: 1
      }]
    }
  };
  
  // Export utility functions for mock data
  export const getAuditLogById = (id: string): AuditLog | undefined => {
    return mockAuditLogs.find(log => log.id === id);
  };
  
  export const getEvidenceById = (id: string): Evidence | undefined => {
    return mockEvidence.find(evidence => evidence.id === id);
  };
  
  export const getAuditById = (id: string): InternalAudit | undefined => {
    return mockInternalAudits.find(audit => audit.id === id);
  };
  
  export const getUserById = (id: string): User | undefined => {
    return mockUsers.find(user => user.id === id);
  };
  
  export const getReportById = (id: string): MonitoringReport | undefined => {
    return mockMonitoringReports.find(report => report.id === id);
  };
  
  // Utility functions to generate additional mock data
  export const generateMockAuditLog = (overrides: Partial<AuditLog> = {}): AuditLog => {
    const categories = ['access', 'modification', 'deletion', 'creation', 'security', 'system'] as const;
    const severities = ['low', 'medium', 'high', 'critical'] as const;
    const statuses = ['success', 'failed', 'warning'] as const;
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      user: 'user@company.com',
      action: 'System Action',
      resource: 'System Resource',
      category: categories[Math.floor(Math.random() * categories.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      details: 'Generated mock audit log entry',
      ip: '192.168.1.100',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      ...overrides
    };
  };
  
  export const generateMockEvidence = (overrides: Partial<Evidence> = {}): Evidence => {
    const types = ['document', 'screenshot', 'video', 'certificate', 'report', 'other'] as const;
    const statuses = ['verified', 'pending', 'rejected'] as const;
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Mock Evidence Document.pdf',
      type: types[Math.floor(Math.random() * types.length)],
      category: 'Mock Category',
      uploadDate: new Date(),
      uploadedBy: 'user@company.com',
      fileSize: Math.floor(Math.random() * 5000000) + 100000,
      tags: ['mock', 'generated'],
      linkedAudits: [],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      description: 'Generated mock evidence item',
      retention: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000),
      ...overrides
    };
  };