// File: /app/risk/asset-register/edit/types/index.ts
export interface EditAssetFormData {
    // Basic Information
    assetId: string;
    name: string;
    assetType: string;
    description: string;
    
    // Ownership & Responsibility
    owner: string;
    custodian: string;
    department: string;
    stakeholders: string[];
    
    // Classification & Security
    classification: string;
    confidentiality: number;
    integrity: number;
    availability: number;
    
    // Location & Technical
    physicalLocation: string;
    hostingType: string;
    vendor: string;
    technicalReference: string;
    
    // Lifecycle
    acquisitionDate: string;
    expectedLifetime: string;
    status: string;
    decommissioningPlan: string;
    
    // Dependencies & Relationships
    linkedProcesses: string;
    linkedSystems: string;
    thirdPartyDependencies: string;
    regulatoryRelevance: string[];
    
    // Risk & Security
    knownVulnerabilities: string[];
    riskNotes: string;
    
    // Compliance
    complianceItems: Array<{
        id: string;
        label: string;
        checked: boolean;
    }>;
    auditReference: string;
    
    // Optional Fields
    approvalStatus: string;
    tags: string[];
    notes: string;
}