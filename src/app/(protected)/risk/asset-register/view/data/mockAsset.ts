// File: /app/risk/asset-register/view/data/mockAsset.ts
import { Asset } from '../types';

export const mockAsset: Asset = {
    assetId: 'ASSET-0010',
    name: 'Production Database Server',
    assetType: 'Hardware',
    description: 'Main server hosting the production PostgreSQL database. Contains all customer PII and transactional data. Critical for all business operations.',
    
    // Enhanced Ownership
    owner: 'Priya Singh',
    custodian: 'IT Infrastructure Team',
    department: 'Engineering',
    stakeholders: ['Security Team', 'Product Management', 'Legal', 'Data Protection Officer'],
    
    // Enhanced Classification
    classification: 'Confidential',
    confidentiality: 5,
    integrity: 5,
    availability: 5,
    
    // Enhanced Location & Technical
    physicalLocation: 'AWS ap-south-1 (Mumbai),Data Center A - Rack 15',
    hostingType: 'Cloud',
    vendor: 'Amazon Web Services,Dell Technologies',
    technicalReference: 'Instance ID: i-0123456789abcdef0, Serial: DT789456123',
    
    // Enhanced Lifecycle
    acquisitionDate: '2023-01-15',
    expectedLifetime: '5 years',
    status: 'Active',
    decommissioningPlan: 'Data to be archived to S3 Glacier, instance to be terminated. All customer data must be securely deleted following company data retention policies.',
    
    // Enhanced Dependencies
    linkedProcesses: 'Customer Order Processing, Billing Cycle, Payment Processing',
    linkedSystems: 'API Gateway (API-001), Web Application Server (AS-003), Load Balancer (LB-001)',
    thirdPartyDependencies: 'Stripe API for payment processing, SendGrid for notifications, AWS RDS for backup',
    regulatoryRelevance: ['GDPR (General Data Protection Regulation)', 'PCI DSS (Payment Card Industry)', 'HIPAA (Health Insurance Portability)', 'SOX (Sarbanes-Oxley Act)'],
    
    // Enhanced Risk & Security
    knownVulnerabilities: [
        'Risk of hardware failure due to aging infrastructure',
        'Risk of unauthorized access to hardware components',
        'SQL Injection Vulnerability (CVE-2023-1234) - Patched',
        'Risk of data breaches through application flaws',
        'Risk of DDoS attacks affecting availability'
    ],
    riskNotes: 'Regular patching schedule is in place every Tuesday at 2 AM UTC. Access is restricted via IAM roles with MFA enabled. Database backups are performed every 6 hours with point-in-time recovery enabled. Monitoring and alerting configured for all critical metrics.',
    associatedRisks: [
        { riskId: 'RISK-004', title: 'Unauthorized Access to Production Database', status: 'Open' },
        { riskId: 'RISK-011', title: 'Data Loss due to Hardware Failure', status: 'Mitigated' },
        { riskId: 'RISK-023', title: 'SQL Injection Attack', status: 'Open' },
        { riskId: 'RISK-031', title: 'DDoS Attack on Database Server', status: 'In Progress' },
    ],
    
    // Enhanced Compliance
    complianceItems: [
        { id: 'confidentialData', label: 'Confidential Data Involved?', checked: true },
        { id: 'pii', label: 'PII Involved?', checked: true },
        { id: 'pci', label: 'PCI Data Involved?', checked: true },
        { id: 'encryption', label: 'Data Encryption at Rest?', checked: true },
        { id: 'backups', label: 'Regular Backups Configured?', checked: true },
        { id: 'monitoring', label: 'Security Monitoring Enabled?', checked: true },
        { id: 'accessControls', label: 'Access Controls Implemented?', checked: true },
        { id: 'auditLogging', label: 'Audit Logging Enabled?', checked: false },
    ],
    auditReference: 'ISO27001-2024-001,SOC2-2024-Q1,PCI-DSS-2024-A1',
    
    // Enhanced Optional Fields
    approvalStatus: 'Approved',
    tags: ['database', 'production', 'customer-data', 'critical', 'postgresql', 'aws', 'encrypted'],
    notes: 'Increased monitoring was enabled on 2024-08-20 due to recent high traffic. Performance optimization completed on 2024-09-01. Next security review scheduled for 2024-10-15.\n\nSpecial considerations:\n- Critical business asset requiring 99.9% uptime\n- Contains sensitive customer payment information\n- Subject to quarterly security audits\n- Disaster recovery tested monthly',
    
    // Enhanced History
    history: [
        { date: '2024-09-07T10:30:00Z', user: 'Amit Sharma', action: 'Created asset record' },
        { date: '2024-09-08T14:15:00Z', user: 'Priya Singh', action: 'Updated owner and CIA values to reflect current criticality' },
        { date: '2024-09-10T09:45:00Z', user: 'Amit Sharma', action: 'Added PCI DSS regulatory relevance' },
        { date: '2024-09-12T16:20:00Z', user: 'Security Team', action: 'Updated known vulnerabilities after security scan' },
        { date: '2024-09-15T11:00:00Z', user: 'Priya Singh', action: 'Added compliance items for Q3 audit preparation' },
        { date: '2024-09-18T13:30:00Z', user: 'IT Infrastructure Team', action: 'Updated technical reference with new instance details' },
    ]
};  