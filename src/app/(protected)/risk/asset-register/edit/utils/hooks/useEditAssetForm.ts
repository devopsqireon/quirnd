// File: /app/risk/asset-register/edit/utils/hooks/useEditAssetForm.ts
import { useState, useCallback, useEffect } from 'react';
import { EditAssetFormData } from '../../types';

interface UseEditAssetFormProps {
    initialData?: EditAssetFormData;
}

export const useEditAssetForm = ({ initialData }: UseEditAssetFormProps = {}) => {
    const [formData, setFormData] = useState<EditAssetFormData>({
        assetId: '',
        name: '',
        assetType: '',
        description: '',
        owner: '',
        custodian: '',
        department: '',
        stakeholders: [],
        classification: '',
        confidentiality: 3,
        integrity: 3,
        availability: 3,
        physicalLocation: '',
        hostingType: '',
        vendor: '',
        technicalReference: '',
        acquisitionDate: '',
        expectedLifetime: '',
        status: 'Active',
        decommissioningPlan: '',
        linkedProcesses: '',
        linkedSystems: '',
        thirdPartyDependencies: '',
        regulatoryRelevance: [],
        knownVulnerabilities: [],
        riskNotes: '',
        complianceItems: [
            { id: 'confidentialData', label: 'Confidential Data Involved?', checked: false },
            { id: 'pii', label: 'PII Involved?', checked: false },
        ],
        auditReference: '',
        approvalStatus: 'Draft',
        tags: [],
        notes: ''
    });

    const [hasChanges, setHasChanges] = useState(false);
    const [originalData, setOriginalData] = useState<EditAssetFormData | null>(null);

    // Initialize form with existing asset data
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setOriginalData(initialData);
            setHasChanges(false);
        }
    }, [initialData]);

    const updateField = useCallback((field: keyof EditAssetFormData, value: any) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };
            
            // Check if there are changes
            if (originalData) {
                const hasChangesNow = JSON.stringify(newData) !== JSON.stringify(originalData);
                setHasChanges(hasChangesNow);
            }
            
            return newData;
        });
    }, [originalData]);

    const resetForm = useCallback(() => {
        if (originalData) {
            setFormData(originalData);
            setHasChanges(false);
        }
    }, [originalData]);

    const isStep1Valid = useCallback(() => {
        return formData.name && formData.assetType && formData.owner && formData.description;
    }, [formData]);

    const isStep2Valid = useCallback(() => {
        return formData.department;
    }, [formData]);

    const isStep3Valid = useCallback(() => {
        return formData.classification;
    }, [formData]);

    return {
        formData,
        updateField,
        resetForm,
        hasChanges,
        isStep1Valid,
        isStep2Valid,
        isStep3Valid,
        originalData
    };
};