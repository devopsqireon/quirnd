// Save as: /app/risk/statement-of-applicability/types.ts

export interface SoAStatus {
    controlId: string;
    isApplicable: boolean | null;
    implementationStatus: 'Implemented' | 'Planned' | 'Not Implemented' | 'In Progress' | 'Under Review' | null;
    justification: string;
    evidence: string;
    responsibleOwner: string;
    backupOwner?: string;
    lastReview: string;
    nextReview?: string;
    linkedAssets: string[];
    treatmentActions: string[];
    implementationDate?: string;
    targetDate?: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low' | null;
    effort: 'Low' | 'Medium' | 'High' | null;
    cost?: number;
    statusHistory: Array<{
        date: string;
        status: string;
        user: string;
        comment?: string;
    }>;
    riskMitigated?: string[];
    complianceNotes?: string;
    reviewFrequency?: 'Monthly' | 'Quarterly' | 'Annually';
    tags?: string[];
}

export interface SummaryMetrics {
    total: number;
    applicable: number;
    implemented: number;
    planned: number;
    inProgress: number;
    notApplicable: number;
    overdue: number;
    highPriority: number;
    progress: number;
    dueReview: number;
}

export interface SoAFilters {
    category: string;
    implementationStatus: string;
    riskLevel: string;
    priority: string;
    owner: string;
    applicability: string;
    tags: string[];
}

export interface ExportOptions {
    format: 'pdf' | 'excel' | 'csv';
    includeDetails: boolean;
    includeNotApplicable: boolean;
    includeEvidence: boolean;
    includeStatusHistory: boolean;
    filterByStatus?: string[];
    customFields: string[];
}

export interface BulkUpdateOptions {
    controlIds: string[];
    field: keyof SoAStatus;
    value: any;
    comment?: string;
}