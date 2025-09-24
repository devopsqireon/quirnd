// Save as: /app/risk/statement-of-applicability/components/ExportComponents.tsx
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
    CheckCircle,
    Printer,
    Share2,
    Mail
} from 'lucide-react';
import { SoAStatus, ExportOptions } from '../types';
import { AnnexAControl } from '@/constants/annex-a-controls';

// Organization data - would typically come from config/database
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
    version: "1.3",
    approvedBy: "John Smith, CISO",
    reviewedBy: "Jane Doe, Compliance Manager"
};

const defaultExportOptions: ExportOptions = {
    format: 'pdf',
    includeDetails: true,
    includeNotApplicable: true,
    includeEvidence: true,
    includeStatusHistory: false,
    customFields: []
};

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    controls: AnnexAControl[];
    soaStatuses: SoAStatus[];
    selectedControls?: string[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
    isOpen,
    onClose,
    controls,
    soaStatuses,
    selectedControls = []
}) => {
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

            // Filter controls if specific ones are selected
            const controlsToExport = selectedControls.length > 0 
                ? controls.filter(c => selectedControls.includes(c.id))
                : controls;

            const statusesToExport = selectedControls.length > 0
                ? soaStatuses.filter(s => selectedControls.includes(s.controlId))
                : soaStatuses;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            clearInterval(progressInterval);
            setExportProgress(100);
            setExportComplete(true);

            // Generate and download file
            const fileName = `SOA_Report_${new Date().toISOString().split('T')[0]}`;
            
            switch (exportOptions.format) {
                case 'pdf':
                    generatePDFExport(controlsToExport, statusesToExport, exportOptions, fileName);
                    break;
                case 'excel':
                    generateExcelExport(controlsToExport, statusesToExport, exportOptions, fileName);
                    break;
                case 'csv':
                    generateCSVExport(controlsToExport, statusesToExport, exportOptions, fileName);
                    break;
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

    const generatePDFExport = (controls: AnnexAControl[], statuses: SoAStatus[], options: ExportOptions, fileName: string) => {
        // Mock PDF generation
        const content = generatePDFContent(controls, statuses, options);
        downloadAsFile(content, `${fileName}.pdf`, 'application/pdf');
    };

    const generateExcelExport = (controls: AnnexAControl[], statuses: SoAStatus[], options: ExportOptions, fileName: string) => {
        const data = generateSpreadsheetData(controls, statuses, options);
        const csvContent = [data.headers, ...data.rows]
            .map(row => row?.map(cell => `"${cell}"`).join(','))
            .join('\n');
        downloadAsFile(csvContent, `${fileName}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    };

    const generateCSVExport = (controls: AnnexAControl[], statuses: SoAStatus[], options: ExportOptions, fileName: string) => {
        const data = generateSpreadsheetData(controls, statuses, options);
        const csvContent = [data.headers, ...data.rows]
            .map(row => row?.map(cell => `"${cell}"`).join(','))
            .join('\n');
        downloadAsFile(csvContent, `${fileName}.csv`, 'text/csv');
    };

    const downloadAsFile = (content: string, fileName: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    };

    const applicableControls = soaStatuses.filter(s => s.isApplicable === true).length;
    const implementedControls = soaStatuses.filter(s => s.isApplicable === true && s.implementationStatus === 'Implemented').length;
    const totalControls = selectedControls.length > 0 ? selectedControls.length : controls.length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Export Statement of Applicability</h2>
                        <p className="text-sm text-slate-600 mt-1">
                            {selectedControls.length > 0 
                                ? `Generate report for ${selectedControls.length} selected controls`
                                : 'Generate comprehensive ISO 27001 SOA documentation'
                            }
                        </p>
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
                                    <div className="text-2xl font-bold text-blue-600">{totalControls}</div>
                                    <div className="text-xs text-slate-600">
                                        {selectedControls.length > 0 ? 'Selected' : 'Total'} Controls
                                    </div>
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
                                    { key: 'includeDetails', label: 'Include detailed control descriptions', desc: 'Full Annex A descriptions and justifications' },
                                    { key: 'includeNotApplicable', label: 'Include non-applicable controls', desc: 'Show excluded controls with justification' },
                                    { key: 'includeEvidence', label: 'Include evidence and risk mappings', desc: 'Linked risks and documentation references' },
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

                        {/* Custom Fields */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Additional Fields</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    'Implementation Cost',
                                    'Effort Estimate',
                                    'Business Impact',
                                    'Technical Requirements',
                                    'Compliance Notes',
                                    'Review Frequency'
                                ].map((field) => (
                                    <label key={field} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={exportOptions.customFields.includes(field)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setExportOptions(prev => ({
                                                        ...prev,
                                                        customFields: [...prev.customFields, field]
                                                    }));
                                                } else {
                                                    setExportOptions(prev => ({
                                                        ...prev,
                                                        customFields: prev.customFields.filter(f => f !== field)
                                                    }));
                                                }
                                            }}
                                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-slate-700">{field}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 transition"
                                >
                                    <Printer className="w-4 h-4" />
                                    Print Preview
                                </button>
                                <button
                                    onClick={() => alert('Share functionality would be implemented here')}
                                    className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 transition"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                            <div className="flex space-x-3">
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
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper functions for generating export content
const generatePDFContent = (controls: AnnexAControl[], statuses: SoAStatus[], options: ExportOptions): string => {
    // This would typically generate actual PDF content
    return `PDF Content for ${controls.length} controls with options: ${JSON.stringify(options)}`;
};

const generateSpreadsheetData = (controls: AnnexAControl[], statuses: SoAStatus[], options: ExportOptions) => {
    const baseHeaders = [
        'Control ID',
        'Control Title',
        'Control Description',
        'Applicability',
        'Implementation Status',
        'Priority',
        'Responsible Owner',
        'Last Review Date'
    ];

    const extendedHeaders = [
        ...baseHeaders,
        'Justification',
        'Evidence/Risk Mapping',
        'Linked Assets',
        'Treatment Actions',
        'Target Date',
        'Next Review Date'
    ];

    const headers = options.includeDetails ? extendedHeaders : baseHeaders;

    const rows = controls.map(control => {
        const status = statuses.find(s => s.controlId === control.id);
        if (!status) return null;

        if (!options.includeNotApplicable && status.isApplicable === false) return null;

        const baseRow = [
            control.id,
            control.description.substring(0, 100) + (control.description.length > 100 ? '...' : ''),
            control.description,
            status.isApplicable === true ? 'Yes' : status.isApplicable === false ? 'No' : 'TBD',
            status.implementationStatus || 'Not Set',
            status.priority || 'Not Set',
            status.responsibleOwner || 'Not Assigned',
            status.lastReview || 'Not Reviewed'
        ];

        if (!options.includeDetails) return baseRow;

        const extendedRow = [
            ...baseRow,
            status.justification || '',
            status.evidence || '',
            status.linkedAssets?.join('; ') || '',
            status.treatmentActions?.join('; ') || '',
            status.targetDate || '',
            status.nextReview || ''
        ];

        return extendedRow;
    }).filter(Boolean);

    return { headers, rows };
};

// Quick Export Dropdown Component
interface QuickExportProps {
    controls: AnnexAControl[];
    soaStatuses: SoAStatus[];
    selectedControls?: string[];
    onOpenModal: () => void;
}

export const QuickExportDropdown: React.FC<QuickExportProps> = ({
    controls,
    soaStatuses,
    selectedControls = [],
    onOpenModal
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleQuickExport = (format: 'csv' | 'print') => {
        const controlsToExport = selectedControls.length > 0 
            ? controls.filter(c => selectedControls.includes(c.id))
            : controls;
        
        const statusesToExport = selectedControls.length > 0
            ? soaStatuses.filter(s => selectedControls.includes(s.controlId))
            : soaStatuses;

        const fileName = `SOA_Quick_Export_${new Date().toISOString().split('T')[0]}`;
        
        if (format === 'csv') {
            const data = generateSpreadsheetData(controlsToExport, statusesToExport, { 
                format: 'csv', 
                includeDetails: false, 
                includeNotApplicable: true, 
                includeEvidence: true, 
                includeStatusHistory: false, 
                customFields: [] 
            });
            
            const csvContent = [data.headers, ...data.rows].map(row => 
                row?.map(cell => `"${cell}"`).join(',')
            ).join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.csv`;
            link.click();
            URL.revokeObjectURL(url);
        } else if (format === 'print') {
            window.print();
        }
        
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center gap-2"
            >
                <Download className="w-4 h-4" />
                Export
                {selectedControls.length > 0 && (
                    <span className="bg-blue-700 px-2 py-0.5 rounded-full text-xs">
                        {selectedControls.length}
                    </span>
                )}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
                    <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Quick Export
                        </div>
                        <button
                            onClick={() => handleQuickExport('csv')}
                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV (Basic)
                        </button>
                        
                        <button
                            onClick={() => handleQuickExport('print')}
                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded flex items-center gap-2"
                        >
                            <Printer className="w-4 h-4" />
                            Print View
                        </button>
                        
                        <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-t mt-2">
                            Advanced Options
                        </div>
                        <button
                            onClick={onOpenModal}
                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded flex items-center gap-2"
                        >
                            <FileDown className="w-4 h-4" />
                            Full PDF Report
                        </button>
                        <button
                            onClick={onOpenModal}
                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded flex items-center gap-2"
                        >
                            <Share2 className="w-4 h-4" />
                            Excel with Options
                        </button>
                        <button
                            onClick={() => {
                                alert('Email functionality would be implemented here');
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            Email Report
                        </button>
                    </div>
                </div>
            )}
            
            {/* Overlay to close dropdown */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-5" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};