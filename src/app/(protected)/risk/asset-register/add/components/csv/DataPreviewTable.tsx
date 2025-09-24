// File: /app/risk/asset-register/add/components/csv/DataPreviewTable.tsx
'use client'

import React from 'react';
import { CSVColumn, ValidationError } from '../../types';
import { ALL_FIELDS, REQUIRED_FIELDS } from '../../utils/constants';

interface DataPreviewTableProps {
    csvData: string[][];
    columns: CSVColumn[];
    errors: ValidationError[];
}

export const DataPreviewTable: React.FC<DataPreviewTableProps> = ({ 
    csvData, 
    columns, 
    errors 
}) => {
    const mappedColumns = columns.filter(col => col.mappedTo);
    const dataRows = csvData.slice(1, 6); // Show first 5 rows

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Data Preview</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-slate-300">
                    <thead>
                        <tr className="bg-slate-50">
                            {mappedColumns.map((column) => {
                                const field = ALL_FIELDS.find(f => f.key === column.mappedTo);
                                return (
                                    <th key={column.index} className="border border-slate-300 px-3 py-2 text-left">
                                        {field?.label}
                                        {REQUIRED_FIELDS.some(f => f.key === column.mappedTo) && (
                                            <span className="text-red-500 ml-1">*</span>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {dataRows.map((row, rowIndex) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                {mappedColumns.map((column) => (
                                    <td key={column.index} className="border border-slate-300 px-3 py-2">
                                        {row[column.index] || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {dataRows.length < csvData.length - 1 && (
                <p className="text-sm text-slate-500">
                    Showing first 5 rows of {csvData.length - 1} total rows
                </p>
            )}
        </div>
    );
};