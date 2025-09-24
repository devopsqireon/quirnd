// File: /app/risk/risk-register/add/page.tsx

'use client'

import React, { useState, useCallback, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Save, Send, AlertTriangle } from 'lucide-react';
import { AddRiskFormData, WizardStep, ValidationError, AddRiskState } from './types';
import { WizardNavigation } from './components/WizardNavigation';
import { Step1BasicInfo } from './components/steps/Step1BasicInfo';
import { Step2RiskAssessment } from './components/steps/Step2RiskAssessment';
import { Step3AssociatedAssets } from './components/steps/Step3AssociatedAssets';
import { Step4Ownership } from './components/steps/Step4Ownership';
import { Step5Controls } from './components/steps/Step5Controls';
import { Step6Treatment } from './components/steps/Step6Treatment';
import { Step7Timeline } from './components/steps/Step7Timeline';
import { Step8Details } from './components/steps/Step8Details';
import { validateStep1, validateStep2, validateStep3, validateStep4, validateStep5, validateStep6, validateStep7, validateStep8, getStepValidationStatus } from './utils/validation';

const initialFormData: AddRiskFormData = {
    // Basic Information
    title: '',
    description: '',
    category: '',
    riskType: '',
    
    // Risk Assessment
    likelihood: '',
    likelihoodScore: 0,
    impact: '',
    impactScore: 0,
    riskScore: 0,
    riskLevel: '',
    
    // Associated Assets
    associatedAssets: [],
    affectedSystems: [],
    businessProcesses: [],
    
    // Ownership & Responsibility
    owner: '',
    ownerEmail: '',
    assignee: '',
    assigneeEmail: '',
    department: '',
    reviewers: [],
    
    // ISO 27001 Controls
    annexAControls: [],
    controlGaps: [],
    
    // Risk Treatment
    treatmentStrategy: 'Mitigate',
    mitigationActions: [],
    contingencyPlan: '',
    
    // Timeline & Review
    dateIdentified: new Date().toISOString().split('T')[0],
    initialReviewDate: '',
    reviewFrequency: '',
    nextReviewDate: '',
    escalationCriteria: '',
    
    // Additional Details
    tags: [],
    references: [],
    attachments: [],
    notes: '',
    confidentialityLevel: 'Internal'
};

const wizardSteps: WizardStep[] = [
    {
        id: 1,
        title: 'Basic Info',
        description: 'Risk details and category',
        isCompleted: false,
        isActive: true
    },
    {
        id: 2,
        title: 'Assessment',
        description: 'Likelihood and impact',
        isCompleted: false,
        isActive: false
    },
    {
        id: 3,
        title: 'Assets',
        description: 'Associated assets',
        isCompleted: false,
        isActive: false
    },
    {
        id: 4,
        title: 'Ownership',
        description: 'Responsible parties',
        isCompleted: false,
        isActive: false
    },
    {
        id: 5,
        title: 'Controls',
        description: 'ISO 27001 controls',
        isCompleted: false,
        isActive: false
    },
    {
        id: 6,
        title: 'Treatment',
        description: 'Mitigation strategy',
        isCompleted: false,
        isActive: false
    },
    {
        id: 7,
        title: 'Timeline',
        description: 'Review schedule',
        isCompleted: false,
        isActive: false
    },
    {
        id: 8,
        title: 'Details',
        description: 'Additional information',
        isCompleted: false,
        isActive: false
    }
];

const AddRiskPage: React.FC = () => {
    const [state, setState] = useState<AddRiskState>({
        currentStep: 1,
        formData: initialFormData,
        validationErrors: [],
        isDirty: false,
        isSubmitting: false
    });

    // Update form data
    const updateFormData = useCallback((updates: Partial<AddRiskFormData>) => {
        setState(prev => ({
            ...prev,
            formData: { ...prev.formData, ...updates },
            isDirty: true
        }));
    }, []);

    // Get current step validation errors
    const currentStepErrors = useMemo(() => {
        switch (state.currentStep) {
            case 1:
                return validateStep1(state.formData);
            case 2:
                return validateStep2(state.formData);
            default:
                return [];
        }
    }, [state.currentStep, state.formData]);

    // Update wizard steps based on validation
    const updatedSteps = useMemo(() => {
        return wizardSteps.map(step => ({
            ...step,
            isCompleted: getStepValidationStatus(step.id, state.formData) && step.id < state.currentStep,
            isActive: step.id === state.currentStep
        }));
    }, [state.currentStep, state.formData]);

    const canNavigateToStep = useCallback((stepNumber: number) => {
        // Can always go back to previous steps
        if (stepNumber < state.currentStep) return true;
        
        // Can go to next step only if current step is valid
        if (stepNumber === state.currentStep + 1) {
            return getStepValidationStatus(state.currentStep, state.formData);
        }
        
        // Can't skip steps
        return false;
    }, [state.currentStep, state.formData]);

    const handleStepClick = useCallback((stepNumber: number) => {
        if (canNavigateToStep(stepNumber)) {
            setState(prev => ({ ...prev, currentStep: stepNumber }));
        }
    }, [canNavigateToStep]);

    const handleNext = useCallback(() => {
        const hasErrors = currentStepErrors.filter(e => e.severity === 'error').length > 0;
        if (!hasErrors && state.currentStep < wizardSteps.length) {
            setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
        }
    }, [currentStepErrors, state.currentStep]);

    const handlePrevious = useCallback(() => {
        if (state.currentStep > 1) {
            setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
        }
    }, [state.currentStep]);

    const handleSaveDraft = useCallback(async () => {
        // Save draft functionality
        console.log('Saving draft...', state.formData);
        setState(prev => ({ 
            ...prev, 
            savedDraft: { 
                id: 'draft-' + Date.now(), 
                savedAt: new Date().toISOString() 
            },
            isDirty: false
        }));
    }, [state.formData]);

    const handleSubmit = useCallback(async () => {
        setState(prev => ({ ...prev, isSubmitting: true }));
        try {
            // Submit risk functionality
            console.log('Submitting risk...', state.formData);
            // Redirect to risk register or view page
        } catch (error) {
            console.error('Error submitting risk:', error);
        } finally {
            setState(prev => ({ ...prev, isSubmitting: false }));
        }
    }, [state.formData]);

    const renderCurrentStep = () => {
        switch (state.currentStep) {
            case 1:
                return (
                    <Step1BasicInfo
                        formData={state.formData}
                        onChange={updateFormData}
                        errors={currentStepErrors}
                    />
                );
            case 2:
                return (
                    <Step2RiskAssessment
                        formData={state.formData}
                        onChange={updateFormData}
                        errors={currentStepErrors}
                    />
                );
            case 3:
                return (
                    <Step3AssociatedAssets
                        formData={state.formData}
                        onChange={updateFormData}
                        errors={currentStepErrors}
                    />
                );
            case 4:
                return (
                    <Step4Ownership
                        formData={state.formData}
                        onChange={updateFormData}
                        errors={currentStepErrors}
                    />
                );
            case 5:
                return (
                    <Step5Controls
                        formData={state.formData}
                        onChange={updateFormData}
                        errors={currentStepErrors}
                    />
                );
            case 6:
                return (
                    <Step6Treatment
                        formData={state.formData}
                        onChange={updateFormData}
                        errors={currentStepErrors}
                    />
                );
            case 7:
                return (
                    <Step7Timeline
                        formData={state.formData}
                        onChange={updateFormData}
                        errors={currentStepErrors}
                    />
                );
            case 8:
                return (
                    <Step8Details
                        formData={state.formData}
                        onChange={updateFormData}
                        errors={currentStepErrors}
                    />
                );
            default:
                return (
                    <div className="text-center py-12">
                        <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            Step {state.currentStep} Not Found
                        </h3>
                        <p className="text-slate-600">
                            This step does not exist. Please use the navigation to go to a valid step.
                        </p>
                    </div>
                );
        }
    };

    const hasErrorsInCurrentStep = currentStepErrors.filter(e => e.severity === 'error').length > 0;
    const hasWarningsInCurrentStep = currentStepErrors.filter(e => e.severity === 'warning').length > 0;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => window.history.back()}
                                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Add New Risk</h1>
                                <p className="text-slate-600">Create a new risk entry in the register</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {state.savedDraft && (
                                <span className="text-sm text-green-600 flex items-center gap-1">
                                    <Save className="w-4 h-4" />
                                    Draft saved
                                </span>
                            )}
                            <button
                                onClick={handleSaveDraft}
                                disabled={!state.isDirty}
                                className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Draft
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wizard Navigation */}
            <WizardNavigation
                steps={updatedSteps}
                currentStep={state.currentStep}
                onStepClick={handleStepClick}
                canNavigateToStep={canNavigateToStep}
            />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-8 py-8">
                {/* Validation Alerts */}
                {(hasErrorsInCurrentStep || hasWarningsInCurrentStep) && (
                    <div className="mb-6">
                        {hasErrorsInCurrentStep && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                    <h3 className="font-medium text-red-800">Please fix the following errors:</h3>
                                </div>
                                <ul className="list-disc list-inside space-y-1">
                                    {currentStepErrors.filter(e => e.severity === 'error').map((error, index) => (
                                        <li key={index} className="text-sm text-red-700">{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {hasWarningsInCurrentStep && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                    <h3 className="font-medium text-yellow-800">Recommendations:</h3>
                                </div>
                                <ul className="list-disc list-inside space-y-1">
                                    {currentStepErrors.filter(e => e.severity === 'warning').map((error, index) => (
                                        <li key={index} className="text-sm text-yellow-700">{error.message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Step Content */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                    {renderCurrentStep()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8">
                    <button
                        onClick={handlePrevious}
                        disabled={state.currentStep === 1}
                        className="flex items-center gap-2 px-6 py-3 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <div className="flex items-center gap-3">
                        {state.currentStep === wizardSteps.length ? (
                            <button
                                onClick={handleSubmit}
                                disabled={state.isSubmitting || hasErrorsInCurrentStep}
                                className="flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {state.isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Submit Risk
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={hasErrorsInCurrentStep}
                                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRiskPage;