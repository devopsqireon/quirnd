import { AssetFormData } from './asset.types';

export interface EnhancedAssetFormData extends AssetFormData {
    // Additional fields from your existing form
    assetId: string;
    custodian: string;
    stakeholders: string[];
    physicalLocation: string;
    hostingType: string;
    technicalReference: string;
    expectedLifetime: string;
    status: string;
    decommissioningPlan: string;
    linkedProcesses: string;
    linkedSystems: string;
    thirdPartyDependencies: string;
    regulatoryRelevance: string[];
    knownVulnerabilities: string[];
    riskNotes: string;
    complianceItems: { id: string; label: string; checked: boolean }[];
    auditReference: string;
    approvalStatus: string;
}