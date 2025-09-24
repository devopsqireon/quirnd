// File: /app/risk/asset-register/add/components/csv/SmartColumnMapper.tsx
'use client'

import React from 'react';
import { CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { CSVColumn } from '../../types';
import { REQUIRED_FIELDS, OPTIONAL_FIELDS, ALL_FIELDS } from '../../utils/constants';
import { getSmartSuggestion } from '../../utils/csv-helpers';

interface SmartColumnMapperProps {
    columns: CSVColumn[];
    onMappingChange: (columnIndex: number, mappedField: string) => void;
}

export const SmartColumnMapper: React.FC<SmartColumnMapperProps> = ({ 
    columns, 
    onMappingChange 
}) => {
    const applySmartMapping = () => {
        columns.forEach((column, index) => {
            const suggestion = getSmartSuggestion(column.name);
            if (suggestion) {
                onMappingChange(index, suggestion);
            }
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Map Your Columns</h3>
                <button
                    type="button"
                    onClick={applySmartMapping}
                    className="flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                    <Zap size={14} />
                    Auto-Map
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {columns.map((column, index) => {
                    const suggestion = getSmartSuggestion(column.name);
                    return (
                        <div key={index} className="bg-white p-4 rounded-lg border border-slate-200">
                            <div className="mb-2">
                                <div className="font-medium text-slate-800">{column.name}</div>
                                <div className="text-xs text-slate-500">
                                    Sample: {column.sampleValues.slice(0, 2).join(', ')}
                                </div>
                            </div>
                            
                            <select
                                value={column.mappedTo || ''}
                                onChange={(e) => onMappingChange(index, e.target.value)}
                                className="w-full p-2 text-sm border border-slate-300 rounded"
                            >
                                <option value="">Don't import</option>
                                <optgroup label="Required Fields">
                                    {REQUIRED_FIELDS.map(field => (
                                        <option key={field.key} value={field.key}>
                                            {field.label} *
                                        </option>
                                    ))}
                                </optgroup>
                                <optgroup label="Optional Fields">
                                    {OPTIONAL_FIELDS.map(field => (
                                        <option key={field.key} value={field.key}>
                                            {field.label}
                                        </option>
                                    ))}
                                </optgroup>
                            </select>

                            {suggestion && !column.mappedTo && (
                                <button
                                    type="button"
                                    onClick={() => onMappingChange(index, suggestion)}
                                    className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                >
                                    Suggest: {ALL_FIELDS.find(f => f.key === suggestion)?.label}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Required Field Status */}
            <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-3">Required Fields Status</h4>
                <div className="grid grid-cols-2 gap-2">
                    {REQUIRED_FIELDS.map(field => {
                        const isMapped = columns.some(col => col.mappedTo === field.key);
                        return (
                            <div key={field.key} className="flex items-center gap-2">
                                {isMapped ? (
                                    <CheckCircle size={16} className="text-green-600" />
                                ) : (
                                    <AlertTriangle size={16} className="text-red-600" />
                                )}
                                <span className={`text-sm ${isMapped ? 'text-green-800' : 'text-red-800'}`}>
                                    {field.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">💡 Data Quality Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Vendor/Provider:</strong> Use full company names (e.g., "Microsoft Corporation")</li>
                    <li>• <strong>Acquisition Date:</strong> Use YYYY-MM-DD format for best results</li>
                    <li>• <strong>Asset Owner:</strong> Include full names or email addresses</li>
                    <li>• <strong>CIA Ratings:</strong> Use numbers 1-5 (1=Low, 5=High)</li>
                </ul>
            </div>
        </div>
    );
};