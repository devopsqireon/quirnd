// File: /app/risk/asset-register/add/components/shared/ProgressBar.tsx
'use client'

import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
    currentStep, 
    totalSteps, 
    className = '' 
}) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className={`w-full bg-slate-200 rounded-full h-2 ${className}`}>
            <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};