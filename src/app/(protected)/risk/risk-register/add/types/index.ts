// File: /app/risk/risk-register/add/types/index.ts

export interface AddRiskFormData {
    // Basic Information (Step 1)
    title: string;
    description: string;
    category: string;
    riskType: string;
    
    // Risk Assessment (Step 2)
    likelihood: string;
    likelihoodScore: number;
    impact: string;
    impactScore: number;
    riskScore: number;
    riskLevel: string;
    
    // Associated Assets (Step 3)
    associatedAssets: Array<{
        id: string;
        name: string;
        type: string;
    }>;
    affectedSystems: string[];
    businessProcesses: string[];
    
    // Ownership & Responsibility (Step 4)
    owner: string;
    ownerEmail: string;
    assignee: string;
    assigneeEmail: string;
    department: string;
    reviewers: string[];
    
    // ISO 27001 Controls (Step 5)
    annexAControls: Array<{
        id: string;
        name: string;
        category: string;
        applicability: 'Applicable' | 'Not Applicable' | 'Partially Applicable';
        notes?: string;
    }>;
    controlGaps: string[];
    
    // Risk Treatment (Step 6)
    treatmentStrategy: 'Avoid' | 'Mitigate' | 'Accept' | 'Transfer';
    mitigationActions: Array<{
        id: string;
        action: string;
        priority: 'High' | 'Medium' | 'Low';
        dueDate: string;
        assignee: string;
        status: 'Planned' | 'In Progress' | 'Completed';
    }>;
    contingencyPlan: string;
    
    // Timeline & Review (Step 7)
    dateIdentified: string;
    initialReviewDate: string;
    reviewFrequency: string;
    nextReviewDate: string;
    escalationCriteria: string;
    
    // Additional Details (Step 8)
    tags: string[];
    references: string[];
    attachments: Array<{
        id: string;
        name: string;
        url: string;
        type: string;
    }>;
    notes: string;
    confidentialityLevel: string;
}

export interface WizardStep {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isActive: boolean;
    validation?: (data: AddRiskFormData) => ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
    severity: 'error' | 'warning';
}

export interface AssetSearchResult {
    id: string;
    name: string;
    type: string;
    classification: string;
    description?: string;
}

export interface ControlTemplate {
    id: string;
    name: string;
    category: string;
    description: string;
    implementationGuidance: string;
    commonRisks: string[];
}

export interface RiskTemplate {
    id: string;
    title: string;
    description: string;
    category: string;
    commonControls: string[];
    typicalLikelihood: string;
    typicalImpact: string;
    mitigationSuggestions: string[];
}

export interface AddRiskState {
    currentStep: number;
    formData: AddRiskFormData;
    validationErrors: ValidationError[];
    isDirty: boolean;
    isSubmitting: boolean;
    savedDraft?: {
        id: string;
        savedAt: string;
    };
}