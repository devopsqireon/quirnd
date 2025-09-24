// File: /app/risk/asset-register/add/components/csv/CSVUploadArea.tsx
'use client'

import React from 'react';
import { Upload, Download, FileText } from 'lucide-react';
import { downloadTemplate } from '../../utils/csv-helpers';

interface CSVUploadAreaProps {
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    csvData: string[][];
    isProcessing: boolean;
}

export const CSVUploadArea: React.FC<CSVUploadAreaProps> = ({
    onFileUpload,
    file,
    csvData,
    isProcessing
}) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Your CSV File</h3>
                <p className="text-slate-600 mb-6">
                    Import multiple assets at once using a CSV file with vendor and owner information.
                </p>
                
                <button
                    onClick={downloadTemplate}
                    className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 mb-6"
                >
                    <Download size={16} />
                    Download CSV Template
                </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto text-slate-400 mb-4" />
                <label htmlFor="csv-upload" className="cursor-pointer">
                    <span className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                        Click to upload a CSV file
                    </span>
                    <p className="text-sm text-slate-500 mt-2">
                        CSV files up to 10MB
                    </p>
                </label>
                <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={onFileUpload}
                    className="hidden"
                    disabled={isProcessing}
                />
            </div>

            {file && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <FileText className="text-green-600" size={20} />
                        <div>
                            <div className="font-medium text-green-800">{file.name}</div>
                            <div className="text-sm text-green-600">
                                {(file.size / 1024).toFixed(1)} KB • {csvData.length - 1} rows detected
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};