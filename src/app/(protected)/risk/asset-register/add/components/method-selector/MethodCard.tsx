// File: /app/risk/asset-register/add/components/method-selector/MethodCard.tsx
'use client'

import React from 'react';
import { AddMethod } from '../../types';

interface MethodCardProps {
    method: AddMethod;
    icon: React.ReactNode;
    title: string;
    description: string;
    features: Array<{ icon: React.ReactNode; text: string }>;
    bestFor: string;
    onClick: () => void;
    colorClass: string;
}

export const MethodCard: React.FC<MethodCardProps> = ({
    icon,
    title,
    description,
    features,
    bestFor,
    onClick,
    colorClass
}) => {
    return (
        <div 
            className={`bg-white border-2 border-slate-200 rounded-xl p-8 hover:${colorClass}-300 hover:shadow-lg transition-all cursor-pointer group`}
            onClick={onClick}
        >
            <div className="text-center">
                <div className={`bg-${colorClass}-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:bg-${colorClass}-200 transition-colors`}>
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-600 mb-6">{description}</p>
                <div className="space-y-2 text-sm text-slate-500">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 justify-center">
                            {feature.icon}
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <span className={`text-${colorClass}-600 font-medium group-hover:text-${colorClass}-700`}>
                        {bestFor}
                    </span>
                </div>
            </div>
        </div>
    );
};