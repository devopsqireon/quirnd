// File: /app/risk/asset-register/add/enhanced-wizard-integration.tsx (UPDATED)
'use client'

import React, { useState, useCallback } from 'react';
import { Clock, ArrowLeft, ArrowRight, CheckCircle, Circle } from 'lucide-react';
import { useVendorManagement } from './utils/hooks/useVendorManagement';
import { useOwnerManagement } from './utils/hooks/useOwnerManagement';
import { ProgressBar } from './components/shared/ProgressBar';
import { VendorModal } from './components/modals/VendorModal';
import { OwnerModal } from './components/modals/OwnerModal';
import { Vendor, Owner } from './types';

// Import the split step components
import { BasicInformationStep } from './components/wizard/BasicInformationStep';
import { OwnershipResponsibilityStep } from './components/wizard/OwnershipResponsibilityStep';
import { ClassificationSecurityStep } from './components/wizard/ClassificationSecurityStep';
import { LocationTechnicalStep } from './components/wizard/LocationTechnicalStep';
import { LifecycleStep } from './components/wizard/LifecycleStep';
import { DependenciesStep } from './components/wizard/DependenciesStep';
import { RiskSecurityStep } from './components/wizard/RiskSecurityStep';
import { OptionalFieldsStep } from './components/wizard/OptionalFieldsStep';

// Enhanced Asset interface combining both approaches
interface EnhancedAssetFormData {
    // Basic fields
    name: string;
    assetType: string;
    owner: string;
    classification: string;
    description: string;
    department: string;
    confidentiality: number;
    integrity: number;
    availability: number;
    vendor: string;
    acquisitionDate: string;
    tags: string[];
    // Enhanced fields from your comprehensive form
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
    notes: string;
}

interface EnhancedWizardProps {
    onSave: (data: EnhancedAssetFormData) => void;
    onCancel: () => void;
}

// Main Enhanced Wizard Component
export const EnhancedAssetWizard: React.FC<EnhancedWizardProps> = ({ onSave, onCancel }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<EnhancedAssetFormData>({
        // Basic fields
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
        tags: [],
        // Enhanced fields
        assetId: '',
        custodian: '',
        stakeholders: [],
        physicalLocation: '',
        hostingType: '',
        technicalReference: '',
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
        notes: ''
    });

    const {
        vendors,
        editingVendor,
        showVendorModal,
        handleSaveVendor,
        openAddVendorModal,
        openEditVendorModal,
        closeVendorModal
    } = useVendorManagement();

    const {
        owners,
        editingOwner,
        showOwnerModal,
        handleSaveOwner,
        openAddOwnerModal,
        openEditOwnerModal,
        closeOwnerModal
    } = useOwnerManagement();

    const updateField = useCallback((field: keyof EnhancedAssetFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const STEPS = [
        { id: 1, title: 'Basic Information', description: 'Core asset details' },
        { id: 2, title: 'Ownership', description: 'Responsibility and ownership' },
        { id: 3, title: 'Classification', description: 'Security and risk assessment' },
        { id: 4, title: 'Location & Technical', description: 'Physical and technical details' },
        { id: 5, title: 'Lifecycle', description: 'Asset lifecycle information' },
        { id: 6, title: 'Dependencies', description: 'Relationships and dependencies' },
        { id: 7, title: 'Risk & Security', description: 'Risk assessment and vulnerabilities' },
        { id: 8, title: 'Optional Fields', description: 'Additional information' },
    ];

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.name && formData.assetType && formData.owner && formData.description;
            case 2:
                return formData.department;
            case 3:
                return formData.classification;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
        } else {
            onSave(formData);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        } else {
            onCancel();
        }
    };

    const handleVendorSave = (vendor: Vendor) => {
        const vendorId = handleSaveVendor(vendor);
        updateField('vendor', vendorId);
    };

    const handleOwnerSave = (owner: Owner) => {
        const ownerId = handleSaveOwner(owner);
        updateField('owner', ownerId);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <BasicInformationStep
                        formData={formData}
                        owners={owners}
                        onFieldChange={updateField}
                        onAddOwner={openAddOwnerModal}
                        onEditOwner={openEditOwnerModal}
                    />
                );
            case 2:
                return (
                    <OwnershipResponsibilityStep
                        formData={formData}
                        onFieldChange={updateField}
                    />
                );
            case 3:
                return (
                    <ClassificationSecurityStep
                        formData={formData}
                        onFieldChange={updateField}
                    />
                );
            case 4:
                return (
                    <LocationTechnicalStep
                        formData={formData}
                        vendors={vendors}
                        onFieldChange={updateField}
                        onAddVendor={openAddVendorModal}
                        onEditVendor={openEditVendorModal}
                    />
                );
            case 5:
                return (
                    <LifecycleStep
                        formData={formData}
                        onFieldChange={updateField}
                    />
                );
            case 6:
                return (
                    <DependenciesStep
                        formData={formData}
                        onFieldChange={updateField}
                    />
                );
            case 7:
                return (
                    <RiskSecurityStep
                        formData={formData}
                        onFieldChange={updateField}
                    />
                );
            case 8:
                return (
                    <OptionalFieldsStep
                        formData={formData}
                        onFieldChange={updateField}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Modals */}
            <VendorModal
                isOpen={showVendorModal}
                onClose={closeVendorModal}
                onSave={handleVendorSave}
                vendor={editingVendor}
            />
            <OwnerModal
                isOpen={showOwnerModal}
                onClose={closeOwnerModal}
                onSave={handleOwnerSave}
                owner={editingOwner}
            />

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
                {/* Header */}
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-slate-900">Enhanced Asset Registration</h1>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock size={14} />
                            ~10 minutes
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1]?.title}
                        </h2>
                    </div>
                    
                    <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} className="mb-2" />
                    
                    <p className="text-sm text-slate-600">{STEPS[currentStep - 1]?.description}</p>
                </div>

                {/* Step Navigation */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center space-x-2 overflow-x-auto">
                        {STEPS.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => setCurrentStep(step.id)}
                                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                    currentStep === step.id
                                        ? 'bg-blue-100 text-blue-700'
                                        : currentStep > step.id
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-white text-slate-500'
                                }`}
                            >
                                {currentStep > step.id ? (
                                    <CheckCircle size={12} />
                                ) : (
                                    <Circle size={12} />
                                )}
                                {step.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    {renderStepContent()}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800"
                    >
                        <ArrowLeft size={16} />
                        {currentStep === 1 ? 'Cancel' : 'Back'}
                    </button>

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {currentStep === STEPS.length ? 'Create Asset' : 'Next'}
                        {currentStep < STEPS.length && <ArrowRight size={16} />}
                    </button>
                </div>
            </div>
        </>
    );
};