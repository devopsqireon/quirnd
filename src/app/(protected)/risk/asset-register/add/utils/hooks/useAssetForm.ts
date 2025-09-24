// File: /app/risk/asset-register/add/utils/hooks/useAssetForm.ts
import { useState, useCallback } from 'react';
import { AssetFormData } from '../../types';

const initialFormData: AssetFormData = {
    name: '',
    assetType: '',
    owner: '',
    classification: '',
    description: '',
    department: '',
    confidentiality: 3,
    integrity: 3,
    availability: 3,
    vendor: '',
    acquisitionDate: '',
    tags: []
};

export const useAssetForm = () => {
    const [formData, setFormData] = useState<AssetFormData>(initialFormData);

    const updateField = useCallback((field: keyof AssetFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialFormData);
    }, []);

    const isStep1Valid = useCallback(() => {
        return formData.name && formData.assetType && formData.owner && formData.classification;
    }, [formData]);

    const isStep2Valid = useCallback(() => {
        return formData.description && formData.department;
    }, [formData]);

    return {
        formData,
        updateField,
        resetForm,
        isStep1Valid,
        isStep2Valid
    };
};