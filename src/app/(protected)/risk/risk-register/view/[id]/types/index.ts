// File: /app/risk/risk-register/view/[id]/types/index.ts

export interface Risk {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'Open' | 'In Progress' | 'Under Review' | 'Closed' | 'Deferred';
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    likelihood: number;
    impact: number;
    riskScore: number;
    riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    owner: string;
    assignee: string;
    businessUnit: string;
    department: string;
    dateIdentified: string;
    dateCreated: string;
    dueDate: string;
    lastReviewed: string;
    nextReview: string;
    progress: number;
    tags: string[];
    
    // Controls - matching OverviewTab interface
    controls: Control[];
    
    // Assets - matching OverviewTab interface
    assets: Asset[];
    
    // Impact analysis - matching OverviewTab interface structure
    impact_analysis: {
        financial: {
            level: string;
            description: string;
            amount?: string;
        };
        operational: {
            level: string;
            description: string;
        };
        reputational: {
            level: string;
            description: string;
        };
        regulatory: {
            level: string;
            description: string;
        };
    };
    
    // Legacy properties for backward compatibility
    likelihoodScore: number;
    impactScore: number;
    inherentRisk: {
        probability: number;
        impact: number;
        score: number;
    };
    residualRisk: {
        probability: number;
        impact: number;
        score: number;
    };
    createdDate: string;
    lastUpdated: string;
    
    // Legacy impact structure for other components
    impact: {
        financial: number;
        operational: number;
        reputational: number;
    };
    
    // Legacy asset structure for other components
    associatedAssets: Array<{
        id: string;
        name: string;
    }>;
    
    // Legacy control structure for other components
    riskControls: RiskControl[];
    
    // Optional properties
    assignedTo?: string;
}

export interface Control {
    id: string;
    name: string;
    type: 'Preventive' | 'Detective' | 'Corrective';
    effectiveness: 'High' | 'Medium' | 'Low';
    status: 'Active' | 'Inactive' | 'Planned';
    owner: string;
    testDate: string;
    nextTest: string;
}

export interface Asset {
    id: string;
    name: string;
    type: string;
    criticality: 'Critical' | 'High' | 'Medium' | 'Low';
    owner: string;
}

export interface RiskControl {
    id: string;
    name: string;
    description: string;
    type: 'Preventive' | 'Detective' | 'Corrective';
    status: 'Effective' | 'Partially Effective' | 'Ineffective' | 'Not Tested';
    frequency: 'Continuous' | 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annually';
    owner: string;
    effectiveness: number;
    implementationDate: string;
    lastReview: string;
    nextReview: string;
    testingHistory?: Array<{
        date: string;
        result: string;
    }>;
}

export interface RiskMetrics {
    riskVelocity?: string;
    timeToResolve?: string;
    controlEffectiveness?: number;
    previousRiskScore?: number;
    recentActivity?: Array<{
        action: string;
        user: string;
        date: string;
    }>;
}

export interface TimelineEvent {
    id: string;
    type: 'risk_created' | 'risk_updated' | 'status_changed' | 'control_added' | 'control_updated' | 'assessment_updated' | 'document_added' | 'comment_added';
    title: string;
    description: string;
    user: string;
    userEmail: string;
    timestamp: string;
    metadata?: {
        oldValue?: string;
        newValue?: string;
        field?: string;
        comment?: string;
        documentName?: string;
        controlName?: string;
        [key: string]: any;
    };
}

export interface RiskDocument {
    id: string;
    name: string;
    type: 'evidence' | 'policy' | 'procedure' | 'assessment' | 'control' | 'incident' | 'other';
    fileType: string;
    size: number;
    uploadedBy: string;
    uploadedAt: string;
    description: string;
    tags: string[];
    url: string;
}

export interface RiskFilters {
    categories: string[];
    riskLevels: string[];
    statuses: string[];
    businessUnits: string[];
    assignees: string[];
    tags: string[];
    dateRange: {
        start: string;
        end: string;
    } | null;
}