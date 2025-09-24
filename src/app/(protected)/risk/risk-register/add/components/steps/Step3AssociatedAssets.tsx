// File: /app/risk/risk-register/add/components/steps/Step3AssociatedAssets.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { Package, Search, Plus, X, Server, Database, Globe, Users, FileText, Shield } from 'lucide-react';
import { AddRiskFormData, AssetSearchResult, ValidationError } from '../../types';

interface Step3AssociatedAssetsProps {
    formData: AddRiskFormData;
    onChange: (data: Partial<AddRiskFormData>) => void;
    errors: ValidationError[];
}

const mockAssets: AssetSearchResult[] = [
    { id: 'DB-001', name: 'Customer Database', type: 'database', classification: 'Critical', description: 'Primary customer data storage' },
    { id: 'SRV-003', name: 'Web Server', type: 'server', classification: 'High', description: 'Main application server' },
    { id: 'APP-015', name: 'Customer Portal', type: 'application', classification: 'High', description: 'Customer-facing web application' },
    { id: 'NET-007', name: 'Internal Network', type: 'network', classification: 'Critical', description: 'Corporate network infrastructure' },
    { id: 'VND-002', name: 'Cloud Provider AWS', type: 'vendor', classification: 'High', description: 'Primary cloud service provider' },
    { id: 'POL-001', name: 'Data Protection Policy', type: 'policy', classification: 'Medium', description: 'GDPR compliance policy' }
];

const businessProcesses = [
    'Customer Onboarding',
    'Order Processing',
    'Payment Processing',
    'Data Backup',
    'System Maintenance',
    'Security Monitoring',
    'Incident Response',
    'Compliance Reporting'
];

const systemTypes = [
    'Production Systems',
    'Development Systems',
    'Testing Systems',
    'Backup Systems',
    'Monitoring Systems',
    'Security Systems'
];

export const Step3AssociatedAssets: React.FC<Step3AssociatedAssetsProps> = ({
    formData,
    onChange,
    errors
}) => {
    const [assetSearch, setAssetSearch] = useState('');
    const [filteredAssets, setFilteredAssets] = useState(mockAssets);
    const [showAssetSearch, setShowAssetSearch] = useState(false);

    useEffect(() => {
        if (assetSearch) {
            setFilteredAssets(
                mockAssets.filter(asset =>
                    asset.name.toLowerCase().includes(assetSearch.toLowerCase()) ||
                    asset.id.toLowerCase().includes(assetSearch.toLowerCase()) ||
                    asset.type.toLowerCase().includes(assetSearch.toLowerCase())
                )
            );
        } else {
            setFilteredAssets(mockAssets);
        }
    }, [assetSearch]);

    const getAssetIcon = (type: string) => {
        const iconMap = {
            database: Database,
            server: Server,
            application: Globe,
            network: Shield,
            vendor: Users,
            policy: FileText
        };
        const IconComponent = iconMap[type as keyof typeof iconMap] || Package;
        return <IconComponent className="w-4 h-4" />;
    };

    const getAssetTypeColor = (type: string) => {
        const colorMap = {
            database: 'bg-blue-100 text-blue-800',
            server: 'bg-green-100 text-green-800',
            application: 'bg-purple-100 text-purple-800',
            network: 'bg-yellow-100 text-yellow-800',
            vendor: 'bg-orange-100 text-orange-800',
            policy: 'bg-pink-100 text-pink-800'
        };
        return colorMap[type as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
    };

    const getClassificationColor = (classification: string) => {
        const colorMap = {
            'Critical': 'bg-red-100 text-red-800',
            'High': 'bg-orange-100 text-orange-800',
            'Medium': 'bg-yellow-100 text-yellow-800',
            'Low': 'bg-green-100 text-green-800'
        };
        return colorMap[classification as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
    };

    const addAsset = (asset: AssetSearchResult) => {
        const isAlreadySelected = formData.associatedAssets.some(a => a.id === asset.id);
        if (!isAlreadySelected) {
            onChange({
                associatedAssets: [...formData.associatedAssets, {
                    id: asset.id,
                    name: asset.name,
                    type: asset.type
                }]
            });
        }
        setShowAssetSearch(false);
        setAssetSearch('');
    };

    const removeAsset = (assetId: string) => {
        onChange({
            associatedAssets: formData.associatedAssets.filter(a => a.id !== assetId)
        });
    };

    const toggleBusinessProcess = (process: string) => {
        const processes = formData.businessProcesses.includes(process)
            ? formData.businessProcesses.filter(p => p !== process)
            : [...formData.businessProcesses, process];
        onChange({ businessProcesses: processes });
    };

    const toggleAffectedSystem = (system: string) => {
        const systems = formData.affectedSystems.includes(system)
            ? formData.affectedSystems.filter(s => s !== system)
            : [...formData.affectedSystems, system];
        onChange({ affectedSystems: systems });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                    <Package className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Associated Assets</h2>
                <p className="text-slate-600">
                    Identify assets, systems, and processes affected by this risk
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Assets */}
                <div className="space-y-6">
                    {/* Associated Assets */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900">Associated Assets</h3>
                            <button
                                type="button"
                                onClick={() => setShowAssetSearch(!showAssetSearch)}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-teal-600 border border-teal-300 rounded-lg hover:bg-teal-50"
                            >
                                <Plus className="w-4 h-4" />
                                Add Asset
                            </button>
                        </div>

                        {/* Asset Search */}
                        {showAssetSearch && (
                            <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                <div className="relative mb-3">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search assets by name or ID..."
                                        value={assetSearch}
                                        onChange={(e) => setAssetSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                    />
                                </div>

                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {filteredAssets.map((asset) => (
                                        <div
                                            key={asset.id}
                                            onClick={() => addAsset(asset)}
                                            className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-teal-300 cursor-pointer transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${getAssetTypeColor(asset.type)}`}>
                                                    {getAssetIcon(asset.type)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{asset.name}</div>
                                                    <div className="text-sm text-slate-500">{asset.id} • {asset.description}</div>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getClassificationColor(asset.classification)}`}>
                                                {asset.classification}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Selected Assets */}
                        <div className="space-y-2">
                            {formData.associatedAssets.map((asset) => (
                                <div key={asset.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${getAssetTypeColor(asset.type)}`}>
                                            {getAssetIcon(asset.type)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{asset.name}</div>
                                            <div className="text-sm text-slate-500">{asset.id}</div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeAsset(asset.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            
                            {formData.associatedAssets.length === 0 && (
                                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>No assets selected</p>
                                    <p className="text-sm">Click "Add Asset" to select related assets</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Affected Systems */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Affected System Types</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {systemTypes.map((system) => (
                                <label key={system} className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.affectedSystems.includes(system)}
                                        onChange={() => toggleAffectedSystem(system)}
                                        className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 mr-3"
                                    />
                                    <span className="text-sm text-slate-700">{system}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Business Processes */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Affected Business Processes</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {businessProcesses.map((process) => (
                                <label key={process} className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.businessProcesses.includes(process)}
                                        onChange={() => toggleBusinessProcess(process)}
                                        className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 mr-3"
                                    />
                                    <span className="text-sm text-slate-700">{process}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-2">Selection Summary</h4>
                        <div className="space-y-2 text-sm text-slate-600">
                            <div>Assets: {formData.associatedAssets.length} selected</div>
                            <div>Systems: {formData.affectedSystems.length} selected</div>
                            <div>Processes: {formData.businessProcesses.length} selected</div>
                        </div>
                        
                        {(formData.associatedAssets.length + formData.affectedSystems.length + formData.businessProcesses.length) === 0 && (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    Consider selecting at least one asset or process to better understand the risk impact scope.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};