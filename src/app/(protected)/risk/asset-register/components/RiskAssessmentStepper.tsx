'use client'

import React from 'react';
import { Clock, Check } from 'lucide-react';

export const RiskAssessmentStepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = [
        { id: 1, name: 'Asset Register', status: 'Current step' },
        { id: 2, name: 'Risk Register', status: 'Next step' },
        { id: 3, name: 'Risk Treatment Plan', status: 'Upcoming' },
        { id: 4, name: 'Statement of Applicability', status: 'Final step' },
    ];

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Risk Assessment Workflow</h1>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-2" />
                        <span>Estimated completion: 45 minutes</span>
                    </div>
                </div>
                <div className="flex items-center">
                    {steps.map((step, index) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        return (
                            <React.Fragment key={step.id}>
                                <div className="flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-colors ${
                                        isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>
                                        {isCompleted ? <Check size={20} /> : step.id}
                                    </div>
                                    <div className="ml-3">
                                        <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-slate-700' : 'text-gray-400'}`}>{step.name}</p>
                                        <p className="text-xs text-gray-500">{isActive ? step.status : isCompleted ? 'Completed' : step.status}</p>
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                     <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
