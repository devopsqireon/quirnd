// File: /app/risk/risk-register/types/index.ts

export interface Risk {
    id: string;
    title: string;
    description: string;
    category: 'Information Security' | 'Operational' | 'Legal/Compliance' | 'Supplier Risk' | 'Financial' | 'Strategic';
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    likelihood: 'Very High' | 'High' | 'Medium' | 'Low' | 'Very Low';
    likelihoodScore: 1 | 2 | 3 | 4 | 5;
    impactScore: 1 | 2 | 3 | 4 | 5;
    riskScore: number; // calculated from likelihood * impact
    riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Under Treatment' | 'Mitigated' | 'Closed' | 'Accepted';
    owner: string;
    ownerAvatar?: string;
    assignee: string;
    dateIdentified: string;
    lastReviewed: string;
    nextReview: string;
    associatedAssets: Array<{
        id: string;
        name: string;
        type: 'database' | 'server' | 'application' | 'network' | 'vendor' | 'policy' | 'user';
    }>;
    annexAControls: Array<{
        id: string;
        name: string;
        category: string;
    }>;
    impact: {
        financial: number;
        operational: number;
        reputational: number;
    };
    mitigation: {
        strategy: string;
        actions: string[];
        progress: number;
        effectiveness: 'High' | 'Moderate' | 'Low' | 'Not Effective';
        treatmentPlan?: string;
        dueDate?: string;
    };
    controls: string[];
    tags: string[];
    complianceScore?: number;
    isOverdue?: boolean;
}

export interface RiskFilters {
    search: string;
    associatedAsset: string;
    category: string;
    riskScore: string;
    owner: string;
    status: string;
    annexAControl: string;
    reviewDue: string;
}

export interface RiskStats {
    total: number;
    critical: number;
    high: number;
    open: number;
    overdue: number;
    underTreatment: number;
    mitigated: number;
    assetsAtRisk: number;
    complianceScore: number;
}

export interface HeatmapCell {
    likelihood: number;
    impact: number;
    count: number;
    risks: Risk[];
}

export interface AssetRiskSummary {
    id: string;
    name: string;
    type: string;
    classification: 'Critical' | 'High' | 'Medium' | 'Low';
    associatedRisks: number;
    highestRiskScore: number;
    lastAssessment: string;
    icon: string;
}

export interface ComplianceControl {
    id: string;
    name: string;
    category: string;
    linkedRisks: number;
    criticalRisks: number;
    compliancePercentage: number;
    status: 'Compliant' | 'Partial' | 'Non-Compliant';
}

export interface ActivityItem {
    id: string;
    type: 'risk_updated' | 'risk_created' | 'risk_closed' | 'review_due';
    message: string;
    timestamp: string;
    severity: 'info' | 'warning' | 'error' | 'success';
}