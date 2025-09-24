// File: /app/risk/asset-register/add/components/csv/ValidationErrorList.tsx
'use client'

import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { ValidationError } from '../../types';

interface ValidationErrorListProps {
    errors: ValidationError[];
}

export const ValidationErrorList: React.FC<ValidationErrorListProps> = ({ errors }) => {
    const hasErrors = errors.filter(e => e.severity === 'error').length > 0;
    
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
                {hasErrors ? 'Validation Errors' : 'Import Results'}
            </h3>
            
            {errors.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {errors.map((error, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${
                            error.severity === 'error' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                        }`}>
                            <div className="flex items-start gap-2">
                                {error.severity === 'error' ? (
                                    <AlertTriangle size={16} className="text-red-600 mt-0.5" />
                                ) : (
                                    <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />
                                )}
                                <div>
                                    <div className={`font-medium ${
                                        error.severity === 'error' ? 'text-red-800' : 'text-yellow-800'
                                    }`}>
                                        Row {error.row}: {error.error}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">
                                        Column: {error.column}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <CheckCircle size={48} className="mx-auto text-green-600 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Import Successful!</h3>
                    <p className="text-slate-600">All assets have been imported successfully.</p>
                </div>
            )}
        </div>
    );
};