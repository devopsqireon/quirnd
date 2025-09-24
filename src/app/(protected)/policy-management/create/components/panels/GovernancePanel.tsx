// File: /app/policy-management/create/components/panels/GovernancePanel.tsx

import React from 'react';
import { PolicyFormData } from '../../types/policy-create.types';
import { MetadataSection } from '../sections/MetadataSection';
import { ControlsSection } from '../sections/ControlsSection';
import { RiskSection } from '../sections/RiskSection';
import { WorkflowSection } from '../sections/WorkflowSection';
import { AcknowledgmentSection } from '../sections/AcknowledgmentSection';
import { CommentsSection } from '../sections/CommentsSection';
import { PublicationSection } from '../sections/PublicationSection';

interface GovernancePanelProps {
    data: PolicyFormData;
    onChange: (updates: Partial<PolicyFormData>) => void;
    onShowApproverModal: () => void;
}

export const GovernancePanel: React.FC<GovernancePanelProps> = ({
    data,
    onChange,
    onShowApproverModal
}) => {
    return (
        <div className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">
                <MetadataSection 
                    data={data}
                    onChange={onChange}
                />
                
                <ControlsSection 
                    selectedControls={[]}
                    onChange={(controls) => {/* Handle controls change */}}
                />
                
                <RiskSection 
                    linkedRisks={[]}
                    onChange={(risks) => {/* Handle risks change */}}
                />
                
                <WorkflowSection 
                    data={data}
                    onChange={onChange}
                    onShowApproverModal={onShowApproverModal}
                />
                
                <AcknowledgmentSection 
                    data={data}
                    onChange={onChange}
                />
                
                <CommentsSection 
                    comments={[]}
                />
                
                <PublicationSection 
                    data={data}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};