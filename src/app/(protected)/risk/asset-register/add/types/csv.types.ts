// File: /app/risk/asset-register/add/types/csv.types.ts
export interface CSVColumn {
    index: number;
    name: string;
    sampleValues: string[];
    mappedTo?: string;
}

export interface ValidationError {
    row: number;
    column: string;
    error: string;
    severity: 'error' | 'warning';
}

export interface Field {
    key: string;
    label: string;
}