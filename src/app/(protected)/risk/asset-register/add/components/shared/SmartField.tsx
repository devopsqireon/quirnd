// File: /app/risk/asset-register/add/components/shared/SmartField.tsx
'use client'

import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';

interface SmartFieldProps {
    label: string;
    type: 'text' | 'select' | 'textarea' | 'date';
    value: any;
    onChange: (value: any) => void;
    options?: string[];
    required?: boolean;
    suggestion?: string;
    placeholder?: string;
}

export const SmartField: React.FC<SmartFieldProps> = ({ 
    label, 
    type, 
    value, 
    onChange, 
    options, 
    required, 
    suggestion,
    placeholder 
}) => {
    const [showSuggestion, setShowSuggestion] = useState(false);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                {suggestion && (
                    <button
                        type="button"
                        onClick={() => setShowSuggestion(!showSuggestion)}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                        <Lightbulb size={12} />
                        Suggestion
                    </button>
                )}
            </div>

            {showSuggestion && suggestion && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <p className="text-blue-800">{suggestion}</p>
                    <button
                        type="button"
                        onClick={() => { onChange(suggestion); setShowSuggestion(false); }}
                        className="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded"
                    >
                        Apply
                    </button>
                </div>
            )}

            {type === 'select' && (
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required={required}
                >
                    <option value="">{placeholder || `Select ${label.toLowerCase()}`}</option>
                    {options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            )}

            {type === 'textarea' && (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={3}
                    placeholder={placeholder}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required={required}
                />
            )}

            {type === 'text' && (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required={required}
                />
            )}

            {type === 'date' && (
                <input
                    type="date"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required={required}
                />
            )}
        </div>
    );
};