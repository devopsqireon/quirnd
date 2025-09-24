// Save as: /app/risk/statement-of-applicability/export-utils.tsx
'use client'

import React, { useState } from 'react';
import { 
    FileDown, 
    FileText, 
    FileSpreadsheet, 
    Download,
    Settings,
    Calendar,
    Building,
    User,
    X,
    CheckCircle
} from 'lucide-react';
import { SoAStatus } from './1components';
import { AnnexAControl } from '@/constants/annex-a-controls';

// Mock organization data
const ORGANIZATION_DATA = {
    name: "Acme Corporation",
    address: "123 Business Street, Tech City, TC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@acmecorp.com",
    website: "www.acmecorp.com",
    scope: "Information Technology Services and Software Development",
    certificationBody: "ISO Certification Authority",
    assessmentDate: new Date().toISOString().split('T')[0],
    nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    version: "1.2",
    approvedBy: "John Smith, CISO",
    reviewedBy: "Jane Doe, Compliance Manager"
};

interface ExportOptions {
    format: 'pdf' | 'excel' | 'csv';
    includeDetails: boolean;
    includeNotApplicable: boolean;
    includeEvidence: boolean;
    includeStatusHistory: boolean;
    filterByStatus?: string[];
    customFields: string[];
}

const defaultExportOptions: ExportOptions = {
    format: 'pdf',
    includeDetails: true,
    includeNotApplicable: true,
    includeEvidence: true,
    includeStatusHistory: false,
    customFields: []
};

// Mock PDF generation
const generatePDFReport = (
    controls: AnnexAControl[], 
    soaStatuses: SoAStatus[], 
    options: ExportOptions
): Promise<string> => {
    return new Promise((resolve) => {
        console.log('Generating PDF with options:', options);
        
        // Simulate API call delay
        setTimeout(() => {
            const mockPDFUrl = `data:application/pdf;base64,${btoa('Mock PDF Content')}`;
            resolve(mockPDFUrl);
        }, 2000);
    });
};

// Mock Excel generation
const generateExcelReport = (
    controls: AnnexAControl[], 
    soaStatuses: SoAStatus[], 
    options: ExportOptions
): Promise<Blob> => {
    return new Promise((resolve) => {
        console.log('Generating Excel with options:', options);
        
        // Create CSV-like content for Excel
        const headers = [
            'Control ID',
            'Control Title', 
            'Description',
            'Applicability',
            'Implementation Status',
            'Justification',
            'Responsible Owner',
            'Last Review',
            ...(options.includeEvidence ? ['Evidence/Linked Risks'] : []),
            ...(options.includeStatusHistory ? ['Status History'] : [])
        ];

        const rows = controls.map(control => {
            const status = soaStatuses.find(s => s.controlId === control.id);
            if (!status) return null;
            
            if (!options.includeNotApplicable && status.isApplicable === false) return null;

            const row = [
                control.id,
                control.description.substring(0, 50) + '...',
                control.description,
                status.isApplicable === true ? 'Yes' : status.isApplicable === false ? 'No' : 'TBD',
                status.implementationStatus || 'Not Set',
                status.justification || '',
                status.responsibleOwner || '',
                status.lastReview || '',
                ...(options.includeEvidence ? [status.evidence] : []),
                ...(options.includeStatusHistory ? [status.statusHistory?.map(h => `${h.date}: ${h.status} by ${h.user}`).join('; ') || ''] : [])
            ];
            return row;
        }).filter(Boolean);

        const csvContent = [headers, ...rows]
            .map(row => row?.map(cell => `"${cell}"`).join(','))
            .join('\n');

        setTimeout(() => {
            const blob = new Blob([csvContent], { type: 'text/csv' });
            resolve(blob);
        }, 1500);
    });
};

// Mock CSV generation
const generateCSVReport = (
    controls: AnnexAControl[], 
    soaStatuses: SoAStatus[], 
    options: ExportOptions
): Promise<Blob> => {
    return generateExcelReport(controls, soaStatuses, options);
};

const ExportModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    controls: AnnexAControl[];
    soaStatuses: SoAStatus[];
}> = ({ isOpen, onClose, controls, soaStatuses }) => {
    const [exportOptions, setExportOptions] = useState<ExportOptions>(defaultExportOptions);
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [exportComplete, setExportComplete] = useState(false);

    if (!isOpen) return null;

    const handleExport = async () => {
        setIsExporting(true);
        setExportProgress(0);
        setExportComplete(false);

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setExportProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            let result: string | Blob;

            switch (exportOptions.format) {
                case 'pdf':
                    result = await generatePDFReport(controls, soaStatuses, exportOptions);
                    break;
                case 'excel':
                    result = await generateExcelReport(controls, soaStatuses, exportOptions);
                    break;
                case 'csv':
                    result = await generateCSVReport(controls, soaStatuses, exportOptions);
                    break;
            }

            clearInterval(progressInterval);
            setExportProgress(100);
            setExportComplete(true);

            // Download the file
            if (typeof result === 'string') {
                // PDF case
                const link = document.createElement('a');
                link.href = result;
                link.download = `SOA_Report_${new Date().toISOString().split('T')[0]}.pdf`;
                link.click();
            } else {
                // Excel/CSV case
                const url = URL.createObjectURL(result);
                const link = document.createElement('a');
                link.href = url;
                link.download = `SOA_Report_${new Date().toISOString().split('T')[0]}.${exportOptions.format === 'excel' ? 'xlsx' : 'csv'}`;
                link.click();
                URL.revokeObjectURL(url);
            }

            setTimeout(() => {
                setIsExporting(false);
                setExportComplete(false);
                setExportProgress(0);
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Export failed:', error);
            setIsExporting(false);
            alert('Export failed. Please try again.');
        }
    };

    const applicableControls = soaStatuses.filter(s => s.isApplicable === true).length;
    const implementedControls = soaStatuses.filter(s => s.isApplicable === true && s.implementationStatus === 'Implemented').length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Export Statement of Applicability</h2>
                        <p className="text-sm text-slate-600 mt-1">Generate comprehensive ISO 27001 SOA documentation</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {isExporting ? (
                    // Export Progress
                    <div className="p-8 text-center">
                        <div className="mb-4">
                            <div className="w-16 h-16 mx-auto mb-4 relative">
                                <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
                                <div 
                                    className="w-16 h-16 border-4 border-blue-600 rounded-full absolute top-0 left-0 transition-all duration-300 ease-out"
                                    style={{
                                        transform: `rotate(${(exportProgress / 100) * 360}deg)`,
                                        borderTopColor: 'transparent',
                                        borderRightColor: exportProgress < 25 ? 'transparent' : '#2563eb',
                                        borderBottomColor: exportProgress < 50 ? 'transparent' : '#2563eb',
                                        borderLeftColor: exportProgress < 75 ? 'transparent' : '#2563eb'
                                    }}
                                ></div>
                                {exportComplete && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {exportComplete ? 'Export Complete!' : 'Generating Export...'}
                        </h3>
                        <p className="text-slate-600 mb-4">
                            {exportComplete 
                                ? 'Your SOA report has been downloaded successfully.' 
                                : `Processing ${exportOptions.format.toUpperCase()} report... ${exportProgress}%`
                            }
                        </p>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${exportProgress}%` }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    // Export Options
                    <div className="p-6 space-y-6">
                        {/* Organization Info */}
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                Organization Details
                            </h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-slate-600">Organization:</span>
                                    <span className="ml-2 font-medium">{ORGANIZATION_DATA.name}</span>
                                </div>
                                <div>
                                    <span className="text-slate-600">Scope:</span>
                                    <span className="ml-2 font-medium">IT Services</span>
                                </div>
                                <div>
                                    <span className="text-slate-600">Version:</span>
                                    <span className="ml-2 font-medium">{ORGANIZATION_DATA.version}</span>
                                </div>
                                <div>
                                    <span className="text-slate-600">Date:</span>
                                    <span className="ml-2 font-medium">{ORGANIZATION_DATA.assessmentDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Export Statistics */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-900 mb-3">Export Summary</h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{controls.length}</div>
                                    <div className="text-xs text-slate-600">Total Controls</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600">{applicableControls}</div>
                                    <div className="text-xs text-slate-600">Applicable</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-emerald-600">{implementedControls}</div>
                                    <div className="text-xs text-slate-600">Implemented</div>
                                </div>
                            </div>
                        </div>

                        {/* Format Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Export Format</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { format: 'pdf', icon: FileText, label: 'PDF Report', desc: 'Professional document' },
                                    { format: 'excel', icon: FileSpreadsheet, label: 'Excel File', desc: 'Spreadsheet format' },
                                    { format: 'csv', icon: Download, label: 'CSV Data', desc: 'Raw data export' }
                                ].map(({ format, icon: Icon, label, desc }) => (
                                    <button
                                        key={format}
                                        onClick={() => setExportOptions(prev => ({ ...prev, format: format as 'pdf' | 'excel' | 'csv' }))}
                                        className={`p-4 border rounded-lg text-center transition ${
                                            exportOptions.format === format
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <Icon className="w-6 h-6 mx-auto mb-2" />
                                        <div className="font-medium text-sm">{label}</div>
                                        <div className="text-xs text-slate-500">{desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Options */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Content Options</label>
                            <div className="space-y-3">
                                {[
                                    { key: 'includeDetails', label: 'Include detailed control descriptions', desc: 'Full Annex A descriptions' },
                                    { key: 'includeNotApplicable', label: 'Include non-applicable controls', desc: 'Show excluded controls with justification' },
                                    { key: 'includeEvidence', label: 'Include evidence and risk mappings', desc: 'Linked risks and documentation' },
                                    { key: 'includeStatusHistory', label: 'Include status change history', desc: 'Audit trail of control updates' }
                                ].map(({ key, label, desc }) => (
                                    <label key={key} className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={exportOptions[key as keyof ExportOptions] as boolean}
                                            onChange={(e) => setExportOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                                            className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                        />
                                        <div>
                                            <div className="text-sm font-medium text-slate-700">{label}</div>
                                            <div className="text-xs text-slate-500">{desc}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleExport}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                            >
                                <FileDown className="w-4 h-4" />
                                Export {exportOptions.format.toUpperCase()}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { ExportModal, ORGANIZATION_DATA };
export type { ExportOptions };