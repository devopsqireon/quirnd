// File: /app/risk/asset-register/view/components/DetailItem.tsx
'use client'

import React from 'react';

interface DetailItemProps {
    label: string;
    value: React.ReactNode;
    className?: string;
    type?: 'text' | 'code' | 'list' | 'multiline';
}

export const DetailItem: React.FC<DetailItemProps> = ({ 
    label, 
    value, 
    className = '', 
    type = 'text' 
}) => {
    const renderValue = () => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return <span className="text-slate-400 italic">Not specified</span>;
        }

        switch (type) {
            case 'code':
                return (
                    <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded border">
                        {value}
                    </code>
                );
            case 'multiline':
                return (
                    <p className="font-normal text-slate-700 whitespace-pre-wrap">
                        {value}
                    </p>
                );
            case 'list':
                if (Array.isArray(value)) {
                    return (
                        <div className="flex flex-wrap gap-1">
                            {value.map((item, index) => (
                                <span 
                                    key={index}
                                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    );
                }
                return value;
            default:
                return <span className="font-semibold text-slate-900">{value}</span>;
        }
    };

    return (
        <div className={className}>
            <dt className="text-sm font-medium text-slate-500 mb-1">{label}</dt>
            <dd className="text-sm">
                {renderValue()}
            </dd>
        </div>
    );
};
