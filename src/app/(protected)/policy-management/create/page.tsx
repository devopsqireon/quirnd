// File: /app/policy-management/create/page.tsx

'use client'

import React, { useState } from 'react';
import { CreatePolicyHeader } from './components/layout/CreatePolicyHeader';
import { PolicyTitleSection } from './components/sections/PolicyTitleSection';
import { TemplateSelectionSection } from './components/sections/TemplateSelectionSection';
import { RichTextEditorSection } from './components/sections/RichTextEditorSection';
import { AttachmentsSection } from './components/sections/AttachmentsSection';
import { VersionControlSection } from './components/sections/VersionControlSection';
import { AccessibilitySection } from './components/sections/AccessibilitySection';
import { GovernancePanel } from './components/panels/GovernancePanel';
import { PreviewModal } from './components/modals/PreviewModal';
import { ApproverModal } from './components/modals/ApproverModal';
import { FloatingActions } from './components/ui/FloatingActions';
import { PolicyFormData } from './types/policy-create.types';

export default function CreatePolicyPage() {
    const [policyData, setPolicyData] = useState<PolicyFormData>({
        id: 'POL-2024-001',
        version: '1.0',
        title: '',
        content: '',
        category: '',
        owner: '',
        effectiveDate: '',
        reviewDate: '',
        reviewFrequency: 'Annually',
        confidentialityLevel: 'Internal',
        tags: ['ISO 27001', 'Security', 'Compliance'],
        attachments: [],
        changeType: 'Minor Update',
        impactLevel: 'Low',
        changeSummary: '',
        requireAcknowledgment: true,
        acknowledgmentDeadline: '',
        reminderFrequency: 'Weekly',
        requireTraining: false,
        workflowType: 'Sequential',
        approvers: [],
        publicationStatus: 'Draft',
        notifyOnPublication: true,
        archivePrevious: false
    });

    const [showPreview, setShowPreview] = useState(false);
    const [showApproverModal, setShowApproverModal] = useState(false);

    const handleSaveDraft = () => {
        console.log('Saving draft...', policyData);
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleSubmitReview = () => {
        console.log('Submitting for review...', policyData);
    };

    const updatePolicyData = (updates: Partial<PolicyFormData>) => {
        setPolicyData(prev => ({ ...prev, ...updates }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <CreatePolicyHeader 
                onCancel={() => window.history.back()}
                onSaveDraft={handleSaveDraft}
                onPreview={handlePreview}
                onSubmitReview={handleSubmitReview}
            />

            {/* Main Layout */}
            <div className="flex h-screen pt-0">
                {/* Left Content Editor Panel */}
                <div className="flex-1 bg-white border-r border-gray-200 overflow-y-auto">
                    <div className="p-8">
                        <PolicyTitleSection 
                            data={policyData}
                            onChange={updatePolicyData}
                        />
                        
                        <TemplateSelectionSection 
                            onTemplateSelect={(template) => updatePolicyData({ content: template.content })}
                        />
                        
                        <RichTextEditorSection 
                            content={policyData.content}
                            onChange={(content) => updatePolicyData({ content })}
                        />
                        
                        <AttachmentsSection 
                            attachments={policyData.attachments}
                            onChange={(attachments) => updatePolicyData({ attachments })}
                        />
                        
                        <VersionControlSection 
                            data={policyData}
                            onChange={updatePolicyData}
                        />
                        
                        <AccessibilitySection />
                    </div>
                </div>

                {/* Right Governance Panel */}
                <GovernancePanel 
                    data={policyData}
                    onChange={updatePolicyData}
                    onShowApproverModal={() => setShowApproverModal(true)}
                />
            </div>

            {/* Modals */}
            <PreviewModal 
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                policyData={policyData}
            />
            
            <ApproverModal 
                isOpen={showApproverModal}
                onClose={() => setShowApproverModal(false)}
                onSelectApprover={(approver) => {
                    updatePolicyData({ 
                        approvers: [...policyData.approvers, approver] 
                    });
                    setShowApproverModal(false);
                }}
            />

            {/* Floating Actions */}
            <FloatingActions 
                onSave={handleSaveDraft}
                onPreview={handlePreview}
                onHelp={() => console.log('Help clicked')}
            />
        </div>
    );
}