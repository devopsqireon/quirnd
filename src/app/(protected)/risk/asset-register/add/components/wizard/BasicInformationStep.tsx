// File: /app/risk/asset-register/add/components/wizard/BasicInformationStep.tsx
'use client'

import React, { useEffect } from 'react';
import { Users, Sparkles } from 'lucide-react';
import { SmartField } from '../shared/SmartField';
import { SearchableDropdown } from '../shared/SearchableDropdown';
import { ASSET_TYPES } from '../../utils/constants';
import { Owner } from '../../types';

interface BasicInformationStepProps {
    formData: {
        name: string;
        assetType: string;
        assetId: string;
        owner: string;
        description: string;
    };
    owners: Owner[];
    onFieldChange: (field: string, value: any) => void;
    onAddOwner: () => void;
    onEditOwner: (owner: Owner) => void;
}

export const BasicInformationStep: React.FC<BasicInformationStepProps> = ({
    formData,
    owners,
    onFieldChange,
    onAddOwner,
    onEditOwner
}) => {
    // Auto-generate asset ID
    useEffect(() => {
        if (!formData.assetId) {
            onFieldChange('assetId', `ASSET-${crypto.randomUUID().split('-')[0].toUpperCase()}`);
        }
    }, [formData.assetId, onFieldChange]);

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-900">Smart Asset Registration</span>
                </div>
                <p className="text-blue-800 text-sm">
                    Our enhanced form provides intelligent suggestions and validates data in real-time to ensure compliance.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <SmartField
                    label="Asset Name"
                    type="text"
                    value={formData.name}
                    onChange={(value) => onFieldChange('name', value)}
                    required
                    placeholder="Enter descriptive asset name"
                    suggestion="Use descriptive names like 'Customer Database Server' or 'HR Management System'"
                />

                <SmartField
                    label="Asset Type"
                    type="select"
                    value={formData.assetType}
                    onChange={(value) => onFieldChange('assetType', value)}
                    options={ASSET_TYPES}
                    required
                />

                <SmartField
                    label="Asset ID"
                    type="text"
                    value={formData.assetId}
                    onChange={(value) => onFieldChange('assetId', value)}
                    placeholder="Auto-generated"
                />

                <SearchableDropdown
                    value={formData.owner}
                    onChange={(value) => onFieldChange('owner', value)}
                    options={owners}
                    onAdd={onAddOwner}
                    onEdit={onEditOwner}
                    placeholder="Select or add asset owner"
                    label="Asset Owner"
                    icon={<Users size={16} className="text-slate-400" />}
                    required
                />
            </div>

            <SmartField
                label="Description"
                type="textarea"
                value={formData.description}
                onChange={(value) => onFieldChange('description', value)}
                required
                placeholder="Describe the asset's purpose and characteristics"
                suggestion="Describe the asset's purpose, key characteristics, and business importance"
            />
        </div>
    );
};