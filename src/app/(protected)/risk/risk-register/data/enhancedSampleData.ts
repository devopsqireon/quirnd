// File: /app/risk/risk-register/data/enhancedSampleData.ts

import { Risk, HeatmapCell, ActivityItem, AssetRiskSummary, ComplianceControl } from '../types';

export const enhancedSampleRisks: Risk[] = [
    {
        id: 'R-2024-001',
        title: 'Unauthorized Access to Customer Database',
        description: 'Potential breach through weak authentication mechanisms',
        category: 'Information Security',
        severity: 'Critical',
        likelihood: 'High',
        likelihoodScore: 4,
        impactScore: 5,
        riskScore: 20,
        riskLevel: 'Critical',
        status: 'Under Treatment',
        owner: 'Mike Chen',
        ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        assignee: 'Security Team',
        dateIdentified: '2024-01-15',
        lastReviewed: '2024-09-01',
        nextReview: '2024-03-15',
        associatedAssets: [
            { id: 'DB-001', name: 'Customer Database', type: 'database' },
            { id: 'APP-015', name: 'Web Application', type: 'application' }
        ],
        annexAControls: [
            { id: 'A.9.1', name: 'Access Control Policy', category: 'Access Control' },
            { id: 'A.9.2', name: 'User Access Management', category: 'Access Control' }
        ],
        impact: { financial: 95, operational: 90, reputational: 95 },
        mitigation: {
            strategy: 'Implement enhanced access controls and monitoring',
            actions: ['Multi-factor authentication', 'Access review', 'Monitoring enhancement'],
            progress: 65,
            effectiveness: 'Moderate',
            treatmentPlan: 'Complete MFA rollout by Q2',
            dueDate: '2024-06-30'
        },
        controls: ['Access controls', 'Data encryption', 'Monitoring systems'],
        tags: ['Cybersecurity', 'Data Protection', 'Critical'],
        isOverdue: true
    },
    {
        id: 'R-2024-002',
        title: 'Server Hardware Failure',
        description: 'Critical infrastructure component failure affecting operations',
        category: 'Operational',
        severity: 'High',
        likelihood: 'Medium',
        likelihoodScore: 3,
        impactScore: 4,
        riskScore: 12,
        riskLevel: 'High',
        status: 'Mitigated',
        owner: 'Sarah Johnson',
        ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
        assignee: 'Infrastructure Team',
        dateIdentified: '2024-02-10',
        lastReviewed: '2024-09-05',
        nextReview: '2024-04-20',
        associatedAssets: [
            { id: 'SRV-003', name: 'Production Server', type: 'server' }
        ],
        annexAControls: [
            { id: 'A.12.1', name: 'Operational Procedures', category: 'Operations Security' }
        ],
        impact: { financial: 70, operational: 85, reputational: 50 },
        mitigation: {
            strategy: 'Implement redundancy and backup systems',
            actions: ['Hardware redundancy', 'Backup procedures', 'Monitoring'],
            progress: 90,
            effectiveness: 'High'
        },
        controls: ['Hardware monitoring', 'Backup systems', 'Maintenance schedules'],
        tags: ['Infrastructure', 'Operations', 'Hardware']
    },
    {
        id: 'R-2024-003',
        title: 'Third-Party Vendor Data Breach',
        description: 'Supplier security incident affecting shared data',
        category: 'Supplier Risk',
        severity: 'High',
        likelihood: 'Low',
        likelihoodScore: 2,
        impactScore: 4,
        riskScore: 8,
        riskLevel: 'Medium',
        status: 'Open',
        owner: 'Lisa Rodriguez',
        ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
        assignee: 'Vendor Management',
        dateIdentified: '2024-03-05',
        lastReviewed: '2024-08-20',
        nextReview: '2024-03-30',
        associatedAssets: [
            { id: 'VND-007', name: 'Cloud Provider', type: 'vendor' },
            { id: 'DB-002', name: 'Backup Database', type: 'database' }
        ],
        annexAControls: [
            { id: 'A.15.1', name: 'Supplier Security', category: 'Supplier Relationships' },
            { id: 'A.15.2', name: 'Supplier Service Delivery', category: 'Supplier Relationships' }
        ],
        impact: { financial: 60, operational: 70, reputational: 80 },
        mitigation: {
            strategy: 'Enhanced vendor security assessments',
            actions: ['Security audits', 'Contract updates', 'Incident response'],
            progress: 35,
            effectiveness: 'Low'
        },
        controls: ['Vendor assessments', 'Contract management', 'Monitoring'],
        tags: ['Vendor', 'Third-party', 'Data Protection']
    },
    {
        id: 'R-2024-004',
        title: 'Regulatory Compliance Violation',
        description: 'GDPR non-compliance due to data retention policies',
        category: 'Legal/Compliance',
        severity: 'Critical',
        likelihood: 'High',
        likelihoodScore: 4,
        impactScore: 5,
        riskScore: 20,
        riskLevel: 'Critical',
        status: 'Accepted',
        owner: 'David Kim',
        ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
        assignee: 'Legal Team',
        dateIdentified: '2024-04-01',
        lastReviewed: '2024-09-10',
        nextReview: '2024-05-15',
        associatedAssets: [
            { id: 'POL-001', name: 'Data Retention Policy', type: 'policy' },
            { id: 'DB-001', name: 'Customer Database', type: 'database' }
        ],
        annexAControls: [
            { id: 'A.18.1', name: 'Compliance Review', category: 'Compliance' }
        ],
        impact: { financial: 90, operational: 60, reputational: 95 },
        mitigation: {
            strategy: 'Update policies and implement data governance',
            actions: ['Policy review', 'Staff training', 'Process updates'],
            progress: 20,
            effectiveness: 'Low'
        },
        controls: ['Policy framework', 'Training programs', 'Audit procedures'],
        tags: ['GDPR', 'Compliance', 'Legal']
    },
    {
        id: 'R-2024-005',
        title: 'Phishing Attack on Employees',
        description: 'Social engineering targeting staff credentials',
        category: 'Information Security',
        severity: 'High',
        likelihood: 'High',
        likelihoodScore: 4,
        impactScore: 3,
        riskScore: 12,
        riskLevel: 'High',
        status: 'Under Treatment',
        owner: 'Mike Chen',
        ownerAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        assignee: 'Security Awareness Team',
        dateIdentified: '2024-05-12',
        lastReviewed: '2024-09-08',
        nextReview: '2024-04-10',
        associatedAssets: [
            { id: 'EML-001', name: 'Email System', type: 'application' },
            { id: 'USR-ALL', name: 'All Users', type: 'user' }
        ],
        annexAControls: [
            { id: 'A.7.2', name: 'Security Awareness', category: 'Human Resources' },
            { id: 'A.13.2', name: 'Information Transfer', category: 'Communications Security' }
        ],
        impact: { financial: 50, operational: 70, reputational: 65 },
        mitigation: {
            strategy: 'Enhanced security awareness and email filtering',
            actions: ['Security training', 'Email filters', 'Incident response'],
            progress: 75,
            effectiveness: 'High'
        },
        controls: ['Security training', 'Email filtering', 'Incident response'],
        tags: ['Phishing', 'Social Engineering', 'Training']
    }
];

export const sampleHeatmapData: HeatmapCell[][] = [
    // Very High Impact row
    [
        { likelihood: 1, impact: 5, count: 0, risks: [] },
        { likelihood: 2, impact: 5, count: 1, risks: [] },
        { likelihood: 3, impact: 5, count: 2, risks: [] },
        { likelihood: 4, impact: 5, count: 2, risks: [] },
        { likelihood: 5, impact: 5, count: 1, risks: [] }
    ],
    // High Impact row
    [
        { likelihood: 1, impact: 4, count: 2, risks: [] },
        { likelihood: 2, impact: 4, count: 3, risks: [] },
        { likelihood: 3, impact: 4, count: 4, risks: [] },
        { likelihood: 4, impact: 4, count: 2, risks: [] },
        { likelihood: 5, impact: 4, count: 1, risks: [] }
    ],
    // Medium Impact row
    [
        { likelihood: 1, impact: 3, count: 5, risks: [] },
        { likelihood: 2, impact: 3, count: 8, risks: [] },
        { likelihood: 3, impact: 3, count: 6, risks: [] },
        { likelihood: 4, impact: 3, count: 3, risks: [] },
        { likelihood: 5, impact: 3, count: 1, risks: [] }
    ],
    // Low Impact row
    [
        { likelihood: 1, impact: 2, count: 7, risks: [] },
        { likelihood: 2, impact: 2, count: 9, risks: [] },
        { likelihood: 3, impact: 2, count: 4, risks: [] },
        { likelihood: 4, impact: 2, count: 2, risks: [] },
        { likelihood: 5, impact: 2, count: 0, risks: [] }
    ],
    // Very Low Impact row
    [
        { likelihood: 1, impact: 1, count: 3, risks: [] },
        { likelihood: 2, impact: 1, count: 4, risks: [] },
        { likelihood: 3, impact: 1, count: 2, risks: [] },
        { likelihood: 4, impact: 1, count: 1, risks: [] },
        { likelihood: 5, impact: 1, count: 0, risks: [] }
    ]
];

export const sampleRecentActivity: ActivityItem[] = [
    {
        id: '1',
        type: 'risk_updated',
        message: 'Risk R-2024-015 status updated to "Mitigated"',
        timestamp: '2024-09-16T14:00:00Z',
        severity: 'success'
    },
    {
        id: '2',
        type: 'risk_created',
        message: 'New risk identified for Asset A-2024-089',
        timestamp: '2024-09-16T10:00:00Z',
        severity: 'warning'
    },
    {
        id: '3',
        type: 'review_due',
        message: 'Critical risk R-2024-012 requires review',
        timestamp: '2024-09-15T08:00:00Z',
        severity: 'error'
    }
];

export const sampleAssetRiskSummaries: AssetRiskSummary[] = [
    {
        id: 'DB-001',
        name: 'Customer Database',
        type: 'database',
        classification: 'Critical',
        associatedRisks: 3,
        highestRiskScore: 20,
        lastAssessment: '2024-03-01',
        icon: 'database'
    },
    {
        id: 'SRV-003',
        name: 'Web Server',
        type: 'server',
        classification: 'High',
        associatedRisks: 2,
        highestRiskScore: 12,
        lastAssessment: '2024-02-15',
        icon: 'server'
    },
    {
        id: 'VND-007',
        name: 'Cloud Provider',
        type: 'vendor',
        classification: 'Medium',
        associatedRisks: 1,
        highestRiskScore: 8,
        lastAssessment: '2024-03-20',
        icon: 'vendor'
    }
];

export const sampleComplianceControls: ComplianceControl[] = [
    {
        id: 'A.9',
        name: 'Access Control',
        category: 'Access Management',
        linkedRisks: 8,
        criticalRisks: 2,
        compliancePercentage: 75,
        status: 'Partial'
    },
    {
        id: 'A.8',
        name: 'Asset Management',
        category: 'Information Assets',
        linkedRisks: 12,
        criticalRisks: 1,
        compliancePercentage: 92,
        status: 'Compliant'
    },
    {
        id: 'A.12',
        name: 'Operations Security',
        category: 'Operational Procedures',
        linkedRisks: 15,
        criticalRisks: 0,
        compliancePercentage: 100,
        status: 'Compliant'
    },
    {
        id: 'A.15',
        name: 'Supplier Relations',
        category: 'External Parties',
        linkedRisks: 6,
        criticalRisks: 0,
        compliancePercentage: 67,
        status: 'Partial'
    }
];