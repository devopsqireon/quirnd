// Enhanced Asset Register Export System
'use client'

import React, { useState } from 'react';
import { 
    FileDown, 
    X, 
    FileText, 
    FileSpreadsheet, 
    Download,
    BarChart3,
    Shield,
    AlertTriangle,
    CheckCircle,
    Calendar,
    Building,
    TrendingUp
} from 'lucide-react';
import { Asset } from '@/types/asset';

interface AssetExportOptions {
    format: 'pdf' | 'excel' | 'csv';
    includeRiskAnalysis: boolean;
    includeComplianceMapping: boolean;
    includeHistoricalData: boolean;
    includeDetailedCIA: boolean;
    filterByValue: string[];
    customFields: string[];
    reportType: 'summary' | 'detailed' | 'compliance' | 'risk-focused';
}

const defaultExportOptions: AssetExportOptions = {
    format: 'pdf',
    includeRiskAnalysis: true,
    includeComplianceMapping: false,
    includeHistoricalData: false,
    includeDetailedCIA: true,
    filterByValue: [],
    customFields: [],
    reportType: 'summary'
};

// Mock organization data for Asset Register
const ASSET_ORGANIZATION_DATA = {
    name: "Acme Corporation",
    department: "Information Technology",
    assessmentDate: new Date().toISOString().split('T')[0],
    assetManager: "Sarah Johnson, IT Asset Manager",
    reviewPeriod: "Quarterly",
    version: "2.1",
    totalAssetValue: 2.4, // in millions
    complianceFrameworks: ["ISO 27001", "SOX", "GDPR"],
    lastAuditDate: "2025-08-15"
};

const EnhancedAssetExportModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    assets: Asset[];
}> = ({ isOpen, onClose, assets }) => {
    const [exportOptions, setExportOptions] = useState<AssetExportOptions>(defaultExportOptions);
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [exportComplete, setExportComplete] = useState(false);

    if (!isOpen) return null;

    const handleExport = async () => {
        setIsExporting(true);
        setExportProgress(0);
        setExportComplete(false);

        // Simulate export process with progress
        const progressInterval = setInterval(() => {
            setExportProgress(prev => {
                if (prev >= 95) {
                    clearInterval(progressInterval);
                    return 95;
                }
                return prev + 8;
            });
        }, 200);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            clearInterval(progressInterval);
            setExportProgress(100);
            setExportComplete(true);

            // Generate and download the file
            const content = generateAssetReport(assets, exportOptions);
            downloadFile(content, exportOptions.format);

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

    const generateAssetReport = (assets: Asset[], options: AssetExportOptions) => {
        const stats = calculateAssetStatistics(assets);
        
        if (options.format === 'csv') {
            return generateAssetCSV(assets, options);
        } else if (options.format === 'excel') {
            return generateAssetExcel(assets, options, stats);
        } else {
            return generateAssetPDF(assets, options, stats);
        }
    };

    const downloadFile = (content: string, format: string) => {
        const blob = new Blob([content], { 
            type: format === 'csv' ? 'text/csv' : 'application/octet-stream' 
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Asset_Register_${new Date().toISOString().split('T')[0]}.${format}`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const calculateAssetStatistics = (assets: Asset[]) => {
        return {
            total: assets.length,
            byType: assets.reduce((acc, asset) => {
                acc[asset.assetType] = (acc[asset.assetType] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            byValue: {
                high: assets.filter(a => a.assetValue >= 12).length,
                medium: assets.filter(a => a.assetValue >= 8 && a.assetValue < 12).length,
                low: assets.filter(a => a.assetValue < 8).length
            },
            byStatus: assets.reduce((acc, asset) => {
                acc[asset.status] = (acc[asset.status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            withRisks: assets.filter(a => a.associatedRisks && a.associatedRisks.length > 0).length,
            averageValue: Math.round(assets.reduce((sum, a) => sum + a.assetValue, 0) / assets.length * 10) / 10
        };
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Export Asset Register</h2>
                        <p className="text-sm text-slate-600 mt-1">Generate comprehensive asset documentation and reports</p>
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
                            {exportComplete ? 'Export Complete!' : 'Generating Asset Report...'}
                        </h3>
                        <p className="text-slate-600 mb-4">
                            {exportComplete 
                                ? 'Your asset register report has been downloaded successfully.' 
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
                        {/* Asset Statistics Overview */}
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4" />
                                Asset Register Overview
                            </h3>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{assets.length}</div>
                                    <div className="text-xs text-slate-600">Total Assets</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">
                                        {assets.filter(a => a.assetValue >= 12).length}
                                    </div>
                                    <div className="text-xs text-slate-600">Critical Assets</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">
                                        {assets.filter(a => a.associatedRisks?.some(r => r.status === 'Open')).length}
                                    </div>
                                    <div className="text-xs text-slate-600">With Open Risks</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        ${ASSET_ORGANIZATION_DATA.totalAssetValue}M
                                    </div>
                                    <div className="text-xs text-slate-600">Est. Value</div>
                                </div>
                            </div>
                        </div>

                        {/* Report Type Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Report Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { type: 'summary', icon: BarChart3, label: 'Executive Summary', desc: 'High-level overview and statistics' },
                                    { type: 'detailed', icon: FileText, label: 'Detailed Report', desc: 'Complete asset inventory with all fields' },
                                    { type: 'compliance', icon: Shield, label: 'Compliance Report', desc: 'Regulatory and audit-focused view' },
                                    { type: 'risk-focused', icon: AlertTriangle, label: 'Risk Analysis', desc: 'Focus on security risks and vulnerabilities' }
                                ].map(({ type, icon: Icon, label, desc }) => (
                                    <button
                                        key={type}
                                        onClick={() => setExportOptions(prev => ({ ...prev, reportType: type as any }))}
                                        className={`p-4 border rounded-lg text-left transition ${
                                            exportOptions.reportType === type
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5 mb-2" />
                                        <div className="font-medium text-sm">{label}</div>
                                        <div className="text-xs text-slate-500 mt-1">{desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Format Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Export Format</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { format: 'pdf', icon: FileText, label: 'PDF Report', desc: 'Professional document' },
                                    { format: 'excel', icon: FileSpreadsheet, label: 'Excel Workbook', desc: 'Spreadsheet with analysis' },
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

                        {/* Advanced Options */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Content Options</label>
                            <div className="space-y-3">
                                {[
                                    { key: 'includeRiskAnalysis', label: 'Include Risk Analysis', desc: 'Risk mappings and vulnerability assessments' },
                                    { key: 'includeComplianceMapping', label: 'Include Compliance Mapping', desc: 'Regulatory framework alignment' },
                                    { key: 'includeDetailedCIA', label: 'Include CIA Ratings', desc: 'Confidentiality, Integrity, Availability scores' },
                                    { key: 'includeHistoricalData', label: 'Include Historical Data', desc: 'Asset lifecycle and change history' }
                                ].map(({ key, label, desc }) => (
                                    <label key={key} className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={exportOptions[key as keyof AssetExportOptions] as boolean}
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

// Utility functions for generating different export formats
const generateAssetCSV = (assets: Asset[], options: AssetExportOptions): string => {
    const headers = [
        'Asset ID', 'Asset Name', 'Asset Type', 'Owner', 'Status',
        'Confidentiality', 'Integrity', 'Availability', 'Asset Value',
        ...(options.includeRiskAnalysis ? ['Open Risks', 'Risk Count'] : []),
        ...(options.includeComplianceMapping ? ['Compliance Status', 'Framework'] : []),
        'Location', 'Last Updated'
    ];

    const rows = assets.map(asset => [
        asset.id,
        asset.name,
        asset.assetType,
        asset.owner,
        asset.status,
        asset.confidentiality.toString(),
        asset.integrity.toString(),
        asset.availability.toString(),
        asset.assetValue.toString(),
        ...(options.includeRiskAnalysis ? [
            asset.associatedRisks?.filter(r => r.status === 'Open').map(r => r.id).join('; ') || 'None',
            asset.associatedRisks?.length.toString() || '0'
        ] : []),
        ...(options.includeComplianceMapping ? ['Compliant', 'ISO 27001'] : []),
        asset.location || 'Not Specified',
        new Date().toISOString().split('T')[0]
    ]);

    return [headers, ...rows].map(row => 
        row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
};

const generateAssetPDF = (assets: Asset[], options: AssetExportOptions, stats: any): string => {
    return `
    ASSET REGISTER REPORT
    ${ASSET_ORGANIZATION_DATA.name}
    
    Generated: ${new Date().toLocaleDateString()}
    Report Type: ${options.reportType.toUpperCase()}
    Asset Manager: ${ASSET_ORGANIZATION_DATA.assetManager}
    
    ═══════════════════════════════════════════════════════════════════
    EXECUTIVE SUMMARY
    ═══════════════════════════════════════════════════════════════════
    
    Total Assets: ${stats.total}
    Critical Assets (Value ≥12): ${stats.byValue.high}
    Assets with Open Risks: ${stats.withRisks}
    Average Asset Value: ${stats.averageValue}
    
    Asset Distribution by Type:
    ${Object.entries(stats.byType).map(([type, count]) => `• ${type}: ${count}`).join('\n    ')}
    
    ${options.includeRiskAnalysis ? `
    ═══════════════════════════════════════════════════════════════════
    RISK ANALYSIS
    ═══════════════════════════════════════════════════════════════════
    
    High-Risk Assets (requiring immediate attention):
    ${assets.filter(a => a.assetValue >= 12 && a.associatedRisks?.some(r => r.status === 'Open'))
            .map(a => `• ${a.id} - ${a.name} (Risk Score: ${a.assetValue})`)
            .join('\n    ')}
    ` : ''}
    
    ═══════════════════════════════════════════════════════════════════
    DETAILED ASSET INVENTORY
    ═══════════════════════════════════════════════════════════════════
    
    ${assets.map(asset => `
    Asset ID: ${asset.id}
    Name: ${asset.name}
    Type: ${asset.assetType}
    Owner: ${asset.owner}
    Value: ${asset.assetValue} (C:${asset.confidentiality}, I:${asset.integrity}, A:${asset.availability})
    Status: ${asset.status}
    Associated Risks: ${asset.associatedRisks?.map(r => r.id).join(', ') || 'None'}
    ─────────────────────────────────────────────────────────────────
    `).join('\n')}
    
    End of Report - Generated by Asset Management System
    `;
};

const generateAssetExcel = (assets: Asset[], options: AssetExportOptions, stats: any): string => {
    // In a real implementation, this would generate actual Excel content
    return generateAssetCSV(assets, options);
};

export { EnhancedAssetExportModal };
export type { AssetExportOptions };