// File: /app/risk/asset-register/add/components/wizard/WizardNavigation.tsx
'use client'

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface WizardNavigationProps {
    currentStep: number;
    totalSteps: number;
    onBack: () => void;
    onNext: () => void;
    isNextDisabled: boolean;
    nextButtonText?: string;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
    currentStep,
    totalSteps,
    onBack,
    onNext,
    isNextDisabled,
    nextButtonText = 'Next'
}) => {
    return (
        <div className="flex items-center justify-between">
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800"
            >
                <ArrowLeft size={16} />
                {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>

            <button
                type="button"
                onClick={onNext}
                disabled={isNextDisabled}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {nextButtonText}
                {currentStep < totalSteps && <ArrowRight size={16} />}
            </button>
        </div>
    );
};