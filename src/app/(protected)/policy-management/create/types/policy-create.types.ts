// File: /app/policy-management/create/types/policy-create.types.ts

export interface PolicyFormData {
    id: string;
    version: string;
    title: string;
    content: string;
    category: string;
    owner: string;
    effectiveDate: string;
    reviewDate: string;
    reviewFrequency: 'Monthly' | 'Quarterly' | 'Bi-annually' | 'Annually';
    confidentialityLevel: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
    tags: string[];
    attachments: PolicyAttachment[];
    changeType: 'Minor Update' | 'Major Revision' | 'Emergency Change' | 'Scheduled Review';
    impactLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    changeSummary: string;
    requireAcknowledgment: boolean;
    acknowledgmentDeadline: string;
    reminderFrequency: 'Daily' | 'Weekly' | 'Bi-weekly' | 'Monthly';
    requireTraining: boolean;
    workflowType: 'Sequential' | 'Parallel';
    approvers: PolicyApprover[];
    publicationStatus: 'Draft' | 'Under Review' | 'Approved' | 'Published' | 'Archived';
    notifyOnPublication: boolean;
    archivePrevious: boolean;
}

export interface PolicyAttachment {
    id: string;
    name: string;
    size: string;
    type: 'pdf' | 'excel' | 'word' | 'image' | 'other';
    uploadedAt: string;
    url?: string;
}

export interface PolicyApprover {
    id: string;
    name: string;
    role: string;
    avatar: string;
    order: number;
}

export interface PolicyTemplate {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    content: string;
    controls: string[];
    category: 'Security' | 'HR' | 'Operational' | 'Finance' | 'Compliance';
}

export interface PolicyControl {
    id: string;
    code: string;
    title: string;
    description: string;
    clause: string;
    priority: 'High' | 'Medium' | 'Low';
    selected: boolean;
}

export interface PolicyRisk {
    id: string;
    title: string;
    riskId: string;
    level: 'High' | 'Medium' | 'Low';
}

export interface Comment {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    timestamp: string;
    resolved: boolean;
}

export interface AccessibilityCheck {
    id: string;
    name: string;
    status: 'passed' | 'warning' | 'failed';
    message: string;
}