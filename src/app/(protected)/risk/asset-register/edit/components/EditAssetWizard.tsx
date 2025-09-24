// File: /app/risk/asset-register/edit/components/EditAssetWizard.tsx
'use client'

import React, { useState, useCallback } from 'react';
import { Clock, ArrowLeft, ArrowRight, CheckCircle, Circle, Save, AlertTriangle } from 'lucide-react';
import { EditAssetFormData } from '../types';
import { useEditAssetForm } from '../utils/hooks/useEditAssetForm';
import { useVendorManagement } from '../../add/utils/hooks/useVendorManagement';
import { useOwnerManagement } from '../../add/utils/hooks/useOwnerManagement';
import { ProgressBar } from '../../add/components/shared/ProgressBar';
import { VendorModal } from '../../add/components/modals/VendorModal';
import { OwnerModal } from '../../add/components/modals/OwnerModal';
import { Vendor, Owner } from '../../add/types';

// Import step components from add flow (reusing them)
import { BasicInformationStep } from '../../add/components/wizard/BasicInformationStep';
import { OwnershipResponsibilityStep } from '../../add/components/wizard/OwnershipResponsibilityStep';
import { ClassificationSecurityStep } from '../../add/components/wizard/ClassificationSecurityStep';
import { LocationTechnicalStep } from '../../add/components/wizard/LocationTechnicalStep';
import { LifecycleStep } from '../../add/components/wizard/LifecycleStep';
import { DependenciesStep } from '../../add/components/wizard/DependenciesStep';
import { RiskSecurityStep } from '../../add/components/wizard/RiskSecurityStep';
import { OptionalFieldsStep } from '../../add/components/wizard/OptionalFieldsStep';

interface EditAssetWizardProps {
    initialData: EditAssetFormData;
    onSave: (data: EditAssetFormData, hasChanges: boolean) => void;
    onCancel: () => void;
}

export const EditAssetWizard: React.FC<EditAssetWizardProps> = ({ 
    initialData, 
    onSave, 
    onCancel 
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const { 
        formData, 
        updateField, 
        resetForm, 
        hasChanges,
        isStep1Valid,
        isStep2Valid,
        isStep3Valid
    } = useEditAssetForm({ initialData });

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
            case 1: return isStep1Valid();
            case 2: return isStep2Valid();
            case 3: return isStep3Valid();
            default: return true;
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSaveAndExit = () => {
        onSave(formData, hasChanges);
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
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Edit Asset</h1>
                            {hasChanges && (
                                <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
                                    Unsaved Changes
                                </span>
                            )}
                        </div>
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

                {/* Changes Warning */}
                {hasChanges && (
                    <div className="mx-6 mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={16} className="text-orange-600" />
                            <span className="text-sm text-orange-800 font-medium">
                                You have unsaved changes. Make sure to save before leaving this page.
                            </span>
                        </div>
                    </div>
                )}

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
                        onClick={currentStep === 1 ? onCancel : handleBack}
                        className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800"
                    >
                        <ArrowLeft size={16} />
                        {currentStep === 1 ? 'Cancel' : 'Back'}
                    </button>

                    <div className="flex items-center gap-3">
                        {hasChanges && (
                            <button
                                type="button"
                                onClick={handleSaveAndExit}
                                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                            >
                                <Save size={16} />
                                Save & Exit
                            </button>
                        )}
                        
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {currentStep === STEPS.length ? 'Complete' : 'Next'}
                            {currentStep < STEPS.length && <ArrowRight size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};