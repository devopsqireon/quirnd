// /app/risk/treatment-plan/[id]/data/mockData.ts

import { TreatmentDetails } from '../types';

export const mockTreatmentDetails: TreatmentDetails[] = [
  {
    risk: {
      id: 'risk-001',
      title: 'Unauthorized Access to Customer Database',
      description: 'Risk of unauthorized personnel gaining access to sensitive customer data through inadequate access controls and authentication mechanisms.',
      category: 'Information Security',
      subcategory: 'Access Control',
      likelihood: 7,
      impact: 9,
      riskScore: 63,
      riskLevel: 'High',
      owner: 'Sarah Chen',
      department: 'IT Security',
      status: 'In Progress',
      createdDate: '2024-01-15T10:00:00Z',
      lastReviewed: '2024-09-01T14:30:00Z',
      nextReviewDate: '2024-12-01T14:30:00Z'
    },
    treatmentPlan: {
      id: 'treatment-001',
      riskId: 'risk-001',
      title: 'Multi-Factor Authentication Implementation',
      description: 'Comprehensive implementation of multi-factor authentication across all systems accessing customer data, including enhanced monitoring and access logging.',
      strategy: 'Mitigate',
      priority: 'High',
      status: 'In Progress',
      owner: 'Sarah Chen',
      assignedTo: ['john.doe', 'jane.smith', 'mike.wilson'],
      startDate: '2024-09-01T00:00:00Z',
      targetDate: '2024-12-31T00:00:00Z',
      budget: 150000,
      approvedBy: 'David Johnson',
      approvalDate: '2024-08-28T00:00:00Z',
      createdDate: '2024-08-25T10:00:00Z',
      lastUpdated: '2024-09-15T16:20:00Z',
      version: 3,
      tags: ['Security', 'Authentication', 'Customer Data', 'Compliance']
    },
    actionItems: [
      {
        id: 'action-001',
        treatmentPlanId: 'treatment-001',
        title: 'Implement MFA for Database Access',
        description: 'Deploy and configure multi-factor authentication for all database administrators and users with direct database access.',
        type: 'Technical',
        priority: 'High',
        status: 'In Progress',
        assignedTo: 'john.doe',
        startDate: '2024-09-01T00:00:00Z',
        dueDate: '2024-10-15T00:00:00Z',
        progress: 65,
        estimatedEffort: 40,
        actualEffort: 28,
        dependencies: ['action-002'],
        blockers: [],
        notes: 'Integration with existing LDAP directory in progress. Some legacy systems require additional configuration.',
        attachments: [
          {
            id: 'att-001',
            name: 'MFA_Implementation_Guide.pdf',
            type: 'application/pdf',
            url: '/files/mfa-guide.pdf',
            size: 2048576,
            uploadedBy: 'john.doe',
            uploadedDate: '2024-09-10T00:00:00Z'
          }
        ]
      },
      {
        id: 'action-002',
        treatmentPlanId: 'treatment-001',
        title: 'Update Access Control Policies',
        description: 'Revise and update all access control policies to include MFA requirements and regular access reviews.',
        type: 'Documentation',
        priority: 'Medium',
        status: 'Completed',
        assignedTo: 'jane.smith',
        startDate: '2024-09-01T00:00:00Z',
        dueDate: '2024-09-30T00:00:00Z',
        completedDate: '2024-09-28T00:00:00Z',
        progress: 100,
        estimatedEffort: 16,
        actualEffort: 18,
        dependencies: [],
        blockers: [],
        notes: 'Policies updated and approved by legal team. Training materials prepared.',
        attachments: []
      },
      {
        id: 'action-003',
        treatmentPlanId: 'treatment-001',
        title: 'Deploy Monitoring Dashboard',
        description: 'Implement comprehensive monitoring dashboard for authentication attempts, failed logins, and access patterns.',
        type: 'Technical',
        priority: 'Medium',
        status: 'Not Started',
        assignedTo: 'mike.wilson',
        startDate: '2024-10-15T00:00:00Z',
        dueDate: '2024-11-30T00:00:00Z',
        progress: 0,
        estimatedEffort: 32,
        dependencies: ['action-001'],
        blockers: ['Budget approval pending'],
        notes: 'Waiting for MFA implementation to complete before starting monitoring setup.',
        attachments: []
      }
    ],
    milestones: [
      {
        id: 'milestone-001',
        treatmentPlanId: 'treatment-001',
        title: 'Phase 1: Policy and Documentation Complete',
        description: 'All access control policies updated and approved',
        targetDate: '2024-09-30T00:00:00Z',
        completedDate: '2024-09-28T00:00:00Z',
        status: 'Completed',
        criteria: ['Policies reviewed', 'Legal approval obtained', 'Training materials ready'],
        dependencies: []
      },
      {
        id: 'milestone-002',
        treatmentPlanId: 'treatment-001',
        title: 'Phase 2: MFA Implementation',
        description: 'Multi-factor authentication deployed for all critical systems',
        targetDate: '2024-10-31T00:00:00Z',
        status: 'In Progress',
        criteria: ['MFA configured for database access', 'User enrollment completed', 'Testing completed'],
        dependencies: ['milestone-001']
      },
      {
        id: 'milestone-003',
        treatmentPlanId: 'treatment-001',
        title: 'Phase 3: Monitoring and Compliance',
        description: 'Full monitoring capabilities operational',
        targetDate: '2024-12-15T00:00:00Z',
        status: 'Upcoming',
        criteria: ['Dashboard operational', 'Alerting configured', 'Compliance verification'],
        dependencies: ['milestone-002']
      }
    ],
    riskAssessments: [
      {
        id: 'assessment-001',
        treatmentPlanId: 'treatment-001',
        assessmentType: 'Initial',
        likelihood: 7,
        impact: 9,
        riskScore: 63,
        riskLevel: 'High',
        assessmentDate: '2024-01-15T00:00:00Z',
        assessedBy: 'Sarah Chen',
        notes: 'Initial assessment based on current access controls and industry standards.',
        evidenceLinks: []
      },
      {
        id: 'assessment-002',
        treatmentPlanId: 'treatment-001',
        assessmentType: 'Current',
        likelihood: 5,
        impact: 8,
        riskScore: 40,
        riskLevel: 'Medium',
        assessmentDate: '2024-09-15T00:00:00Z',
        assessedBy: 'Sarah Chen',
        notes: 'Risk reduced due to policy updates and partial MFA implementation.',
        evidenceLinks: ['Policy approval documents', 'MFA configuration logs']
      }
    ],
    metrics: [
      {
        id: 'metric-001',
        treatmentPlanId: 'treatment-001',
        metricName: 'MFA Adoption Rate',
        metricType: 'KPI',
        targetValue: 100,
        currentValue: 65,
        unit: '%',
        measurementDate: '2024-09-15T00:00:00Z',
        trend: 'Improving',
        thresholds: { green: 90, amber: 70, red: 50 }
      },
      {
        id: 'metric-002',
        treatmentPlanId: 'treatment-001',
        metricName: 'Failed Login Attempts',
        metricType: 'KRI',
        targetValue: 50,
        currentValue: 127,
        unit: 'per week',
        measurementDate: '2024-09-15T00:00:00Z',
        trend: 'Stable',
        thresholds: { green: 50, amber: 100, red: 200 }
      }
    ],
    documents: [
      {
        id: 'doc-001',
        name: 'MFA Implementation Plan.docx',
        type: 'Policy',
        url: '/files/mfa-plan.docx',
        uploadedBy: 'Sarah Chen',
        uploadedDate: '2024-08-25T00:00:00Z',
        size: 1024000,
        version: '2.1'
      },
      {
        id: 'doc-002',
        name: 'Access Control Policy v3.0.pdf',
        type: 'Policy',
        url: '/files/access-policy.pdf',
        uploadedBy: 'Jane Smith',
        uploadedDate: '2024-09-28T00:00:00Z',
        size: 512000,
        version: '3.0'
      }
    ],
    comments: [
      {
        id: 'comment-001',
        entityId: 'treatment-001',
        entityType: 'treatment',
        author: 'David Johnson',
        content: 'Great progress on the policy updates. Please ensure we coordinate with HR for the user training rollout.',
        createdDate: '2024-09-29T10:30:00Z',
        mentions: ['jane.smith'],
        attachments: []
      },
      {
        id: 'comment-002',
        entityId: 'action-001',
        entityType: 'action',
        author: 'John Doe',
        content: 'Encountering some issues with legacy system integration. May need to extend timeline by 1 week.',
        createdDate: '2024-09-14T15:45:00Z',
        mentions: ['sarah.chen'],
        attachments: []
      }
    ],
    activityLog: [
      {
        id: 'activity-001',
        treatmentPlanId: 'treatment-001',
        action: 'status_change',
        description: 'Action item "Update Access Control Policies" marked as completed',
        performedBy: 'jane.smith',
        timestamp: '2024-09-28T16:00:00Z',
        entityType: 'action',
        entityId: 'action-002',
        previousValue: { status: 'In Progress' },
        newValue: { status: 'Completed' }
      },
      {
        id: 'activity-002',
        treatmentPlanId: 'treatment-001',
        action: 'comment_added',
        description: 'Comment added to treatment plan',
        performedBy: 'david.johnson',
        timestamp: '2024-09-29T10:30:00Z',
        entityType: 'treatment',
        entityId: 'treatment-001'
      },
      {
        id: 'activity-003',
        treatmentPlanId: 'treatment-001',
        action: 'document_uploaded',
        description: 'Document "Access Control Policy v3.0.pdf" uploaded',
        performedBy: 'jane.smith',
        timestamp: '2024-09-28T14:20:00Z',
        entityType: 'document',
        entityId: 'doc-002'
      }
    ]
  }
];

export const mockUsers = [
  { id: 'john.doe', name: 'John Doe', email: 'john.doe@company.com', department: 'IT Security', role: 'Senior Engineer' },
  { id: 'jane.smith', name: 'Jane Smith', email: 'jane.smith@company.com', department: 'Compliance', role: 'Policy Analyst' },
  { id: 'mike.wilson', name: 'Mike Wilson', email: 'mike.wilson@company.com', department: 'IT Operations', role: 'DevOps Engineer' },
  { id: 'sarah.chen', name: 'Sarah Chen', email: 'sarah.chen@company.com', department: 'IT Security', role: 'Security Manager' },
  { id: 'david.johnson', name: 'David Johnson', email: 'david.johnson@company.com', department: 'IT Security', role: 'CISO' }
];