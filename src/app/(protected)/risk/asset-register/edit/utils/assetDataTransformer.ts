
// File: /app/risk/asset-register/edit/utils/assetDataTransformer.ts
import { Asset } from '../../view/types';
import { EditAssetFormData } from '../types';

export const transformAssetToEditForm = (asset: Asset): EditAssetFormData => {
    return {
        assetId: asset.assetId,
        name: asset.name,
        assetType: asset.assetType,
        description: asset.description,
        owner: asset.owner,
        custodian: asset.custodian,
        department: asset.department,
        stakeholders: asset.stakeholders || [],
        classification: asset.classification,
        confidentiality: asset.confidentiality,
        integrity: asset.integrity,
        availability: asset.availability,
        physicalLocation: asset.physicalLocation || '',
        hostingType: asset.hostingType || '',
        vendor: asset.vendor || '',
        technicalReference: asset.technicalReference || '',
        acquisitionDate: asset.acquisitionDate || '',
        expectedLifetime: asset.expectedLifetime || '',
        status: asset.status,
        decommissioningPlan: asset.decommissioningPlan || '',
        linkedProcesses: asset.linkedProcesses || '',
        linkedSystems: asset.linkedSystems || '',
        thirdPartyDependencies: asset.thirdPartyDependencies || '',
        regulatoryRelevance: asset.regulatoryRelevance || [],
        knownVulnerabilities: asset.knownVulnerabilities || [],
        riskNotes: asset.riskNotes || '',
        complianceItems: asset.complianceItems || [],
        auditReference: asset.auditReference || '',
        approvalStatus: asset.approvalStatus,
        tags: asset.tags || [],
        notes: asset.notes || ''
    };
};

export const transformEditFormToAsset = (formData: EditAssetFormData): Asset => {
    return {
        assetId: formData.assetId,
        name: formData.name,
        assetType: formData.assetType,
        description: formData.description,
        owner: formData.owner,
        custodian: formData.custodian,
        department: formData.department,
        stakeholders: formData.stakeholders,
        classification: formData.classification,
        confidentiality: formData.confidentiality,
        integrity: formData.integrity,
        availability: formData.availability,
        physicalLocation: formData.physicalLocation,
        hostingType: formData.hostingType,
        vendor: formData.vendor,
        technicalReference: formData.technicalReference,
        acquisitionDate: formData.acquisitionDate,
        expectedLifetime: formData.expectedLifetime,
        status: formData.status,
        decommissioningPlan: formData.decommissioningPlan,
        linkedProcesses: formData.linkedProcesses,
        linkedSystems: formData.linkedSystems,
        thirdPartyDependencies: formData.thirdPartyDependencies,
        regulatoryRelevance: formData.regulatoryRelevance,
        knownVulnerabilities: formData.knownVulnerabilities,
        riskNotes: formData.riskNotes,
        complianceItems: formData.complianceItems,
        auditReference: formData.auditReference,
        approvalStatus: formData.approvalStatus,
        tags: formData.tags,
        notes: formData.notes,
        // Note: history and associatedRisks would be preserved separately
        history: [],
        associatedRisks: []
    };
};