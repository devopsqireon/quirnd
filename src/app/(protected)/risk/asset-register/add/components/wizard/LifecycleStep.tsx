// File: /app/risk/asset-register/add/components/wizard/LifecycleStep.tsx
'use client'

import React from 'react';
import { SmartField } from '../shared/SmartField';

interface LifecycleStepProps {
    formData: {
        acquisitionDate: string;
        expectedLifetime: string;
        status: string;
        decommissioningPlan: string;
    };
    onFieldChange: (field: string, value: any) => void;
}

export const LifecycleStep: React.FC<LifecycleStepProps> = ({
    formData,
    onFieldChange
}) => {
    const LIFECYCLE_STATUSES = ['Active', 'In Use', 'Retired', 'Archived', 'Disposed'];

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <SmartField
                    label="Acquisition Date"
                    type="date"
                    value={formData.acquisitionDate}
                    onChange={(value) => onFieldChange('acquisitionDate', value)}
                />

                <SmartField
                    label="Expected Lifetime"
                    type="text"
                    value={formData.expectedLifetime}
                    onChange={(value) => onFieldChange('expectedLifetime', value)}
                    placeholder="e.g., 5 years, Until 2028"
                />

                <SmartField
                    label="Current Status"
                    type="select"
                    value={formData.status}
                    onChange={(value) => onFieldChange('status', value)}
                    options={LIFECYCLE_STATUSES}
                />
            </div>

            <SmartField
                label="Decommissioning Plan"
                type="textarea"
                value={formData.decommissioningPlan}
                onChange={(value) => onFieldChange('decommissioningPlan', value)}
                placeholder="Describe the planned decommissioning process"
            />
        </div>
    );
};
