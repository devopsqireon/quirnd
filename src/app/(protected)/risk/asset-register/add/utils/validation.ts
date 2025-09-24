// File: /app/risk/asset-register/add/utils/validation.ts
import { ValidationError, CSVColumn } from '../types';
import { ALL_FIELDS, REQUIRED_FIELDS } from './constants';

export const validateData = (dataRows: string[][], mappedColumns: CSVColumn[]): ValidationError[] => {
    const validationErrors: ValidationError[] = [];
    
    dataRows.forEach((row, rowIndex) => {
        mappedColumns.forEach(column => {
            const value = row[column.index] || '';
            const field = ALL_FIELDS.find(f => f.key === column.mappedTo);
            
            if (!field) return;
            
            // Required field validation
            if (REQUIRED_FIELDS.some(f => f.key === column.mappedTo) && !value.trim()) {
                validationErrors.push({
                    row: rowIndex + 2, // +2 because of header and 0-indexing
                    column: field.label,
                    error: `Required field '${field.label}' is empty`,
                    severity: 'error'
                });
            }
            
            // Date validation
            if (column.mappedTo === 'acquisitionDate' && value) {
                const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                if (!datePattern.test(value) && value !== '') {
                    validationErrors.push({
                        row: rowIndex + 2,
                        column: field.label,
                        error: `Date should be in YYYY-MM-DD format, got '${value}'`,
                        severity: 'warning'
                    });
                }
            }
            
            // CIA Triad validation
            if (['confidentiality', 'integrity', 'availability'].includes(column.mappedTo || '') && value) {
                const numValue = parseInt(value);
                if (isNaN(numValue) || numValue < 1 || numValue > 5) {
                    validationErrors.push({
                        row: rowIndex + 2,
                        column: field.label,
                        error: `${field.label} must be a number between 1-5, got '${value}'`,
                        severity: 'warning'
                    });
                }
            }
            
            // Email validation for owner field
            if (column.mappedTo === 'owner' && value && value.includes('@')) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    validationErrors.push({
                        row: rowIndex + 2,
                        column: field.label,
                        error: `Invalid email format for owner: '${value}'`,
                        severity: 'warning'
                    });
                }
            }
        });
    });
    
    return validationErrors;
};