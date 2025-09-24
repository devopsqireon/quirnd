// File: /app/risk/risk-register/add/components/WizardNavigation.tsx

'use client'

import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { WizardStep } from '../types';

interface WizardNavigationProps {
    steps: WizardStep[];
    currentStep: number;
    onStepClick: (stepNumber: number) => void;
    canNavigateToStep: (stepNumber: number) => boolean;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
    steps,
    currentStep,
    onStepClick,
    canNavigateToStep
}) => {
    const getStepIcon = (step: WizardStep) => {
        if (step.isCompleted) {
            return <CheckCircle className="w-5 h-5 text-green-600" />;
        } else if (step.isActive) {
            return (
                <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{step.id}</span>
                </div>
            );
        } else {
            return <Circle className="w-5 h-5 text-slate-400" />;
        }
    };

    const getStepTextColor = (step: WizardStep) => {
        if (step.isCompleted) return 'text-green-600';
        if (step.isActive) return 'text-teal-600 font-semibold';
        if (canNavigateToStep(step.id)) return 'text-slate-700';
        return 'text-slate-400';
    };

    const getConnectorColor = (index: number) => {
        if (index < steps.length - 1) {
            const currentStepCompleted = steps[index].isCompleted;
            return currentStepCompleted ? 'border-green-300' : 'border-slate-300';
        }
        return '';
    };

    return (
        <div className="bg-white border-b border-slate-200 px-8 py-6">
            <div className="max-w-6xl mx-auto">
                {/* Mobile stepper */}
                <div className="md:hidden">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-slate-600">
                            Step {currentStep} of {steps.length}
                        </span>
                        <span className="text-sm text-slate-500">
                            {Math.round((currentStep / steps.length) * 100)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / steps.length) * 100}%` }}
                        />
                    </div>
                    <div className="mt-3">
                        <h3 className="font-semibold text-slate-900">
                            {steps.find(s => s.id === currentStep)?.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                            {steps.find(s => s.id === currentStep)?.description}
                        </p>
                    </div>
                </div>

                {/* Desktop stepper */}
                <div className="hidden md:flex items-center justify-between">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center flex-1">
                            {/* Step indicator */}
                            <div
                                className={`flex items-center cursor-pointer transition-colors ${
                                    canNavigateToStep(step.id) ? 'hover:opacity-80' : 'cursor-not-allowed'
                                }`}
                                onClick={() => canNavigateToStep(step.id) && onStepClick(step.id)}
                            >
                                <div className="flex flex-col items-center">
                                    {getStepIcon(step)}
                                    <div className="mt-2 text-center">
                                        <div className={`text-sm font-medium ${getStepTextColor(step)}`}>
                                            {step.title}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1 max-w-24 line-clamp-2">
                                            {step.description}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 flex items-center justify-center mx-4">
                                    <div className={`h-px border-t-2 flex-1 ${getConnectorColor(index)}`} />
                                    <ArrowRight className="w-4 h-4 text-slate-400 mx-2" />
                                    <div className={`h-px border-t-2 flex-1 ${getConnectorColor(index)}`} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};