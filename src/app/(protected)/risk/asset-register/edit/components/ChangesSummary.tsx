// File: /app/risk/asset-register/edit/components/ChangesSummary.tsx
'use client'

import React, { useMemo } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { EditAssetFormData } from '../types';

interface ChangesSummaryProps {
    currentData: EditAssetFormData;
    originalData: EditAssetFormData | null;
    isVisible: boolean;
}

export const ChangesSummary: React.FC<ChangesSummaryProps> = ({
    currentData,
    originalData,
    isVisible
}) => {
    const changes = useMemo(() => {
        if (!originalData) return [];
        
        const changedFields: Array<{
            field: string;
            label: string;
            oldValue: any;
            newValue: any;
        }> = [];

        const fieldLabels: Record<string, string> = {
            name: 'Asset Name',
            assetType: 'Asset Type',
            description: 'Description',
            owner: 'Asset Owner',
            custodian: 'Custodian',
            department: 'Department',
            classification: 'Classification',
            confidentiality: 'Confidentiality',
            integrity: 'Integrity',
            availability: 'Availability',
            physicalLocation: 'Physical Location',
            hostingType: 'Hosting Type',
            vendor: 'Vendor',
            technicalReference: 'Technical Reference',
            acquisitionDate: 'Acquisition Date',
            expectedLifetime: 'Expected Lifetime',
            status: 'Status',
            decommissioningPlan: 'Decommissioning Plan',
            linkedProcesses: 'Linked Processes',
            linkedSystems: 'Linked Systems',
            thirdPartyDependencies: 'Third-Party Dependencies',
            riskNotes: 'Risk Notes',
            auditReference: 'Audit Reference',
            approvalStatus: 'Approval Status',
            notes: 'Notes'
        };

        // Check simple fields
        Object.keys(fieldLabels).forEach(field => {
            const currentValue = currentData[field as keyof EditAssetFormData];
            const originalValue = originalData[field as keyof EditAssetFormData];
            
            if (JSON.stringify(currentValue) !== JSON.stringify(originalValue)) {
                changedFields.push({
                    field,
                    label: fieldLabels[field],
                    oldValue: originalValue,
                    newValue: currentValue
                });
            }
        });

        // Check array fields
        const arrayFields = ['stakeholders', 'regulatoryRelevance', 'knownVulnerabilities', 'tags'];
        arrayFields.forEach(field => {
            const currentValue = currentData[field as keyof EditAssetFormData] as string[];
            const originalValue = originalData[field as keyof EditAssetFormData] as string[];
            
            if (JSON.stringify(currentValue?.sort()) !== JSON.stringify(originalValue?.sort())) {
                changedFields.push({
                    field,
                    label: field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1'),
                    oldValue: originalValue,
                    newValue: currentValue
                });
            }
        });

        // Check compliance items
        if (JSON.stringify(currentData.complianceItems) !== JSON.stringify(originalData.complianceItems)) {
            changedFields.push({
                field: 'complianceItems',
                label: 'Compliance Items',
                oldValue: originalData.complianceItems,
                newValue: currentData.complianceItems
            });
        }

        return changedFields;
    }, [currentData, originalData]);

    if (!isVisible || changes.length === 0) return null;

    const formatValue = (value: any): string => {
        if (value === null || value === undefined || value === '') return 'Not set';
        if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : 'None';
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (typeof value === 'object') {
            // Handle compliance items
            if (value.length > 0 && value[0].label) {
                return value.filter((item: any) => item.checked).map((item: any) => item.label).join(', ') || 'None checked';
            }
        }
        return String(value);
    };

    return (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={20} className="text-orange-600" />
                <h3 className="font-semibold text-orange-900">Unsaved Changes ({changes.length})</h3>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
                {changes.map((change, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="font-medium text-slate-900 mb-2">{change.label}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-500">Before:</span>
                                <div className="bg-red-50 p-2 rounded mt-1">
                                    <span className="text-red-800">{formatValue(change.oldValue)}</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-500">After:</span>
                                <div className="bg-green-50 p-2 rounded mt-1">
                                    <span className="text-green-800">{formatValue(change.newValue)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                    <Info size={16} className="text-blue-600" />
                    <span className="text-sm text-blue-800">
                        Changes will be saved to the asset record and logged in the history.
                    </span>
                </div>
            </div>
        </div>
    );
};