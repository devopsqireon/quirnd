// File: /app/risk/asset-register/add/enhanced-csv-import.tsx
'use client'

import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { CSVColumn, ValidationError } from './types';
import { validateData } from './utils/validation';
import { ALL_FIELDS, REQUIRED_FIELDS } from './utils/constants';
import { ProgressBar } from './components/shared/ProgressBar';
import { CSVUploadArea } from './components/csv/CSVUploadArea';
import { SmartColumnMapper } from './components/csv/SmartColumnMapper';
import { DataPreviewTable } from './components/csv/DataPreviewTable';
import { ValidationErrorList } from './components/csv/ValidationErrorList';

interface EnhancedCSVImportWizardProps {
    onImportComplete: (data: any[]) => void;
    onCancel: () => void;
}

export const EnhancedCSVImportWizard: React.FC<EnhancedCSVImportWizardProps> = ({ 
    onImportComplete, 
    onCancel 
}) => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [columns, setColumns] = useState<CSVColumn[]>([]);
    const [errors, setErrors] = useState<ValidationError[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (!uploadedFile) return;

        setFile(uploadedFile);
        setIsProcessing(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows = text.split('\n').map(row => 
                row.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''))
            );
            
            setCsvData(rows);
            
            // Extract column information
            const headers = rows[0] || [];
            const dataRows = rows.slice(1).filter(row => row.some(cell => cell.length > 0));
            
            const columnInfo: CSVColumn[] = headers.map((header, index) => ({
                index,
                name: header,
                sampleValues: dataRows.slice(0, 3).map(row => row[index] || '').filter(Boolean)
            }));
            
            setColumns(columnInfo);
            setIsProcessing(false);
            setStep(2);
        };
        
        reader.readAsText(uploadedFile);
    }, []);

    const handleMappingChange = useCallback((columnIndex: number, mappedField: string) => {
        setColumns(prev => prev.map((col, idx) => 
            idx === columnIndex ? { ...col, mappedTo: mappedField } : col
        ));
    }, []);

    const validateAndImport = useCallback(() => {
        setIsProcessing(true);
        
        // Simulate validation
        setTimeout(() => {
            const mappedColumns = columns.filter(col => col.mappedTo);
            const dataRows = csvData.slice(1).filter(row => row.some(cell => cell.length > 0));
            
            const validationErrors: ValidationError[] = [];
            
            // Check required fields
            REQUIRED_FIELDS.forEach(field => {
                const column = mappedColumns.find(col => col.mappedTo === field.key);
                if (!column) {
                    validationErrors.push({
                        row: 0,
                        column: field.label,
                        error: `Required field '${field.label}' not mapped`,
                        severity: 'error'
                    });
                }
            });

            // Validate data quality
            const dataValidationErrors = validateData(dataRows, mappedColumns);
            validationErrors.push(...dataValidationErrors);

            setErrors(validationErrors);

            if (validationErrors.filter(e => e.severity === 'error').length === 0) {
                // Generate imported data
                const importedData = dataRows.map((row, rowIndex) => {
                    const obj: Record<string, any> = {};
                    mappedColumns.forEach(column => {
                        const field = ALL_FIELDS.find(f => f.key === column.mappedTo);
                        if (field) {
                            let value = row[column.index] || '';
                            
                            // Process specific field types
                            if (['confidentiality', 'integrity', 'availability'].includes(column.mappedTo || '')) {
                                value = parseInt(value) || 3; // Default to 3 if invalid
                            } else if (column.mappedTo === 'tags' && value) {
                                value = value.split(',').map(t => t.trim());
                            }
                            
                            obj[field.key] = value;
                        }
                    });
                    
                    return {
                        ...obj,
                        id: `ASSET-${(rowIndex + 1).toString().padStart(3, '0')}`,
                        assetValue: (obj.confidentiality || 3) + (obj.integrity || 3) + (obj.availability || 3),
                        status: 'Active'
                    };
                });

                onImportComplete(importedData);
            } else {
                setStep(3); // Show errors
            }
            
            setIsProcessing(false);
        }, 1500);
    }, [columns, csvData, onImportComplete]);

    const canProceed = () => {
        if (step === 2) {
            return REQUIRED_FIELDS.every(field => 
                columns.some(col => col.mappedTo === field.key)
            );
        }
        return false;
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
            {/* Header */}
            <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Import Assets from CSV</h2>
                        <p className="text-sm text-slate-600 mt-1">
                            Step {step} of 3: {step === 1 ? 'Upload File' : step === 2 ? 'Map Columns' : 'Review Results'}
                        </p>
                    </div>
                    <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
                        <X size={24} />
                    </button>
                </div>

                <ProgressBar currentStep={step} totalSteps={3} className="mt-4" />
            </div>

            {/* Content */}
            <div className="p-6">
                {step === 1 && (
                    <CSVUploadArea
                        onFileUpload={handleFileUpload}
                        file={file}
                        csvData={csvData}
                        isProcessing={isProcessing}
                    />
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <SmartColumnMapper
                            columns={columns}
                            onMappingChange={handleMappingChange}
                        />
                        
                        {columns.some(col => col.mappedTo) && (
                            <DataPreviewTable
                                csvData={csvData}
                                columns={columns}
                                errors={errors}
                            />
                        )}
                    </div>
                )}

                {step === 3 && (
                    <ValidationErrorList errors={errors} />
                )}

                {isProcessing && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-slate-600 mt-2">Processing your file...</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 flex justify-between items-center">
                <button
                    onClick={() => step > 1 ? setStep(step - 1) : onCancel()}
                    className="text-slate-600 hover:text-slate-800"
                    disabled={isProcessing}
                >
                    {step === 1 ? 'Cancel' : 'Back'}
                </button>

                <div className="flex items-center gap-3">
                    {step === 2 && (
                        <button
                            onClick={validateAndImport}
                            disabled={!canProceed() || isProcessing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            Import Assets
                        </button>
                    )}
                    
                    {step === 3 && errors.filter(e => e.severity === 'error').length > 0 && (
                        <button
                            onClick={() => setStep(2)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Fix Mapping
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};