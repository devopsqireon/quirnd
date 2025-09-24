// Enhanced Asset Table with Advanced Features
'use client'

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
    Search, 
    Filter, 
    ChevronsUpDown, 
    Edit, 
    Trash2, 
    Plus, 
    ChevronLeft, 
    ChevronRight,
    Download,
    Eye,
    MoreHorizontal,
    CheckSquare,
    Square,
    AlertTriangle,
    Shield,
    Clock,
    ExternalLink,
    Copy,
    Star,
    StarOff
} from 'lucide-react';
import { Asset } from '@/types/asset';

interface EnhancedFilterOptions {
    assetType: string;
    status: string;
    assetValue: string;
    owner: string;
    hasRisks: string;
    compliance: string;
    dateRange: string;
}

interface SortConfig {
    key: keyof Asset | 'riskCount';
    direction: 'asc' | 'desc';
}

interface BulkActions {
    selectedAssets: string[];
    action: 'none' | 'export' | 'delete' | 'assign' | 'update_status';
}

const ASSET_TYPES = ['Hardware', 'Software', 'Data', 'People', 'Process', 'Network', 'Facility'];
const STATUSES = ['Active', 'In-Repair', 'Decommissioned', 'Deleted'];

const AdvancedFilterPopover: React.FC<{
    onApply: (filters: EnhancedFilterOptions) => void;
    onClear: () => void;
    assets: Asset[];
}> = ({ onApply, onClear, assets }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<EnhancedFilterOptions>({
        assetType: '',
        status: '',
        assetValue: '',
        owner: '',
        hasRisks: '',
        compliance: '',
        dateRange: ''
    });

    const uniqueOwners = useMemo(() => 
        [...new Set(assets.map(a => a.owner))].sort(), [assets]
    );

    const handleApply = () => {
        onApply(filters);
        setIsOpen(false);
    };

    const handleClear = () => {
        setFilters({
            assetType: '',
            status: '',
            assetValue: '',
            owner: '',
            hasRisks: '',
            compliance: '',
            dateRange: ''
        });
        onClear();
        setIsOpen(false);
    };

    const activeFilterCount = Object.values(filters).filter(Boolean).length;

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-2 text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 relative"
            >
                <Filter size={16} /> 
                Filter
                {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFilterCount}
                    </span>
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20 border border-slate-200">
                    <div className="p-4 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-900">Advanced Filters</h3>
                    </div>
                    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type</label>
                                <select 
                                    value={filters.assetType} 
                                    onChange={e => setFilters(f => ({...f, assetType: e.target.value}))} 
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">All Types</option>
                                    {ASSET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select 
                                    value={filters.status} 
                                    onChange={e => setFilters(f => ({...f, status: e.target.value}))} 
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">All Statuses</option>
                                    {STATUSES.filter(s => s !== 'Deleted').map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                                <select 
                                    value={filters.assetValue} 
                                    onChange={e => setFilters(f => ({...f, assetValue: e.target.value}))} 
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">All Risk Levels</option>
                                    <option value="critical">Critical (15+)</option>
                                    <option value="high">High (12-14)</option>
                                    <option value="medium">Medium (8-11)</option>
                                    <option value="low">Low (1-7)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                                <select 
                                    value={filters.owner} 
                                    onChange={e => setFilters(f => ({...f, owner: e.target.value}))} 
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">All Owners</option>
                                    {uniqueOwners.map(owner => <option key={owner} value={owner}>{owner}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Status</label>
                                <select 
                                    value={filters.hasRisks} 
                                    onChange={e => setFilters(f => ({...f, hasRisks: e.target.value}))} 
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">All Assets</option>
                                    <option value="with-risks">Has Open Risks</option>
                                    <option value="no-risks">No Open Risks</option>
                                    <option value="critical-risks">Critical Risks Only</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Compliance</label>
                                <select 
                                    value={filters.compliance} 
                                    onChange={e => setFilters(f => ({...f, compliance: e.target.value}))} 
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                >
                                    <option value="">All Compliance</option>
                                    <option value="compliant">Compliant</option>
                                    <option value="needs-review">Needs Review</option>
                                    <option value="non-compliant">Non-Compliant</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                            <select 
                                value={filters.dateRange} 
                                onChange={e => setFilters(f => ({...f, dateRange: e.target.value}))} 
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            >
                                <option value="">Any Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="quarter">This Quarter</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-slate-50 flex justify-between rounded-b-lg">
                        <button 
                            onClick={handleClear} 
                            className="text-sm font-semibold text-slate-600 hover:text-slate-800"
                        >
                            Clear All
                        </button>
                        <button 
                            onClick={handleApply} 
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const BulkActionsBar: React.FC<{
    bulkActions: BulkActions;
    onBulkAction: (action: string) => void;
    onClearSelection: () => void;
}> = ({ bulkActions, onBulkAction, onClearSelection }) => {
    if (bulkActions.selectedAssets.length === 0) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-blue-800">
                        {bulkActions.selectedAssets.length} asset{bulkActions.selectedAssets.length > 1 ? 's' : ''} selected
                    </span>
                    <button 
                        onClick={onClearSelection}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                        Clear selection
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => onBulkAction('export')}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                        Export Selected
                    </button>
                    <button 
                        onClick={() => onBulkAction('assign')}
                        className="bg-slate-600 text-white px-3 py-1 rounded text-sm hover:bg-slate-700"
                    >
                        Reassign Owner
                    </button>
                    <button 
                        onClick={() => onBulkAction('delete')}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                        Delete Selected
                    </button>
                </div>
            </div>
        </div>
    );
};

const AssetRowActions: React.FC<{
    asset: Asset;
    onEdit: () => void;
    onDelete: () => void;
    onViewDetails: () => void;
}> = ({ asset, onEdit, onDelete, onViewDetails }) => {
    const [showActions, setShowActions] = useState(false);

    return (
        <div className="relative">
            <button 
                onClick={() => setShowActions(!showActions)}
                className="p-1 hover:bg-slate-100 rounded"
            >
                <MoreHorizontal size={16} className="text-slate-400" />
            </button>
            
            {showActions && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
                    <div className="py-1">
                        <button 
                            onClick={() => { onViewDetails(); setShowActions(false); }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            <Eye size={14} /> View Details
                        </button>
                        <button 
                            onClick={() => { onEdit(); setShowActions(false); }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            <Edit size={14} /> Edit Asset
                        </button>
                        <button 
                            onClick={() => navigator.clipboard.writeText(asset.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            <Copy size={14} /> Copy Asset ID
                        </button>
                        <hr className="my-1" />
                        <button 
                            onClick={() => { onDelete(); setShowActions(false); }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <Trash2 size={14} /> Delete Asset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const EnhancedAssetTable: React.FC<{ 
    assets: Asset[];
    onRowClick: (id: string) => void; 
    onEdit: (asset: Asset) => void; 
    onDelete: (asset: Asset) => void;
    onAdd: () => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onApplyFilters: (filters: any) => void;
    onClearFilters: () => void;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onExport: () => void;
}> = ({ 
    assets, 
    onRowClick, 
    onEdit, 
    onDelete, 
    onAdd, 
    searchTerm, 
    setSearchTerm, 
    onApplyFilters, 
    onClearFilters, 
    currentPage, 
    totalPages, 
    onPageChange,
    onExport
}) => {
    const router = useRouter();
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
    const [bulkActions, setBulkActions] = useState<BulkActions>({ selectedAssets: [], action: 'none' });
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

    const sortedAssets = useMemo(() => {
        const sorted = [...assets].sort((a, b) => {
            let aValue: any = a[sortConfig.key as keyof Asset];
            let bValue: any = b[sortConfig.key as keyof Asset];

            if (sortConfig.key === 'riskCount') {
                aValue = a.associatedRisks?.length || 0;
                bValue = b.associatedRisks?.length || 0;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [assets, sortConfig]);

    const handleSort = (key: keyof Asset | 'riskCount') => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSelectAll = (checked: boolean) => {
        setBulkActions(prev => ({
            ...prev,
            selectedAssets: checked ? assets.map(a => a.id) : []
        }));
    };

    const handleSelectAsset = (assetId: string, checked: boolean) => {
        setBulkActions(prev => ({
            ...prev,
            selectedAssets: checked 
                ? [...prev.selectedAssets, assetId]
                : prev.selectedAssets.filter(id => id !== assetId)
        }));
    };

    const handleBulkAction = (action: string) => {
        switch (action) {
            case 'export':
                alert(`Exporting ${bulkActions.selectedAssets.length} selected assets...`);
                break;
            case 'delete':
                if (confirm(`Delete ${bulkActions.selectedAssets.length} selected assets?`)) {
                    alert('Assets deleted successfully');
                    setBulkActions({ selectedAssets: [], action: 'none' });
                }
                break;
            case 'assign':
                alert('Bulk reassignment modal would open here');
                break;
            default:
                break;
        }
    };

    const getValueColor = (value: number) => {
        if (value >= 15) return 'bg-red-100 text-red-800 border-red-200';
        if (value >= 12) return 'bg-red-50 text-red-700 border-red-100';
        if (value >= 8) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'In-Repair': return 'bg-yellow-100 text-yellow-800';
            case 'Decommissioned': return 'bg-slate-100 text-slate-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const handleRiskClick = (e: React.MouseEvent, riskId: string) => {
        e.stopPropagation();
        router.push(`/risk/risk-register/${riskId}`);
    };

    const allSelected = assets.length > 0 && bulkActions.selectedAssets.length === assets.length;
    const someSelected = bulkActions.selectedAssets.length > 0 && bulkActions.selectedAssets.length < assets.length;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            {/* Header with Search and Actions */}
            <div className="p-6 border-b border-slate-200">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search assets, owners, risks..." 
                            value={searchTerm} 
                            onChange={e => setSearchTerm(e.target.value)} 
                            className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <AdvancedFilterPopover 
                            onApply={onApplyFilters} 
                            onClear={onClearFilters}
                            assets={assets}
                        />
                        <button 
                            onClick={onExport}
                            className="text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                        >
                            <Download size={16} /> Export
                        </button>
                        <button 
                            onClick={onAdd} 
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            <Plus size={16} /> Add Asset
                        </button>
                    </div>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            <BulkActionsBar 
                bulkActions={bulkActions}
                onBulkAction={handleBulkAction}
                onClearSelection={() => setBulkActions({ selectedAssets: [], action: 'none' })}
            />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-left w-12">
                                <button onClick={() => handleSelectAll(!allSelected)}>
                                    {allSelected ? (
                                        <CheckSquare size={16} className="text-blue-600" />
                                    ) : someSelected ? (
                                        <div className="w-4 h-4 bg-blue-600 rounded border-2 border-blue-600 flex items-center justify-center">
                                            <div className="w-2 h-0.5 bg-white"></div>
                                        </div>
                                    ) : (
                                        <Square size={16} className="text-slate-400" />
                                    )}
                                </button>
                            </th>
                            {[
                                { key: 'id', label: 'Asset ID' },
                                { key: 'name', label: 'Asset Name' },
                                { key: 'assetType', label: 'Type' },
                                { key: 'owner', label: 'Owner' },
                                { key: 'confidentiality', label: 'C' },
                                { key: 'integrity', label: 'I' },
                                { key: 'availability', label: 'A' },
                                { key: 'assetValue', label: 'Risk Score' },
                                { key: 'riskCount', label: 'Open Risks' },
                                { key: 'status', label: 'Status' }
                            ].map(({ key, label }) => (
                                <th 
                                    key={key} 
                                    className="p-4 text-left font-semibold text-slate-600 cursor-pointer hover:bg-slate-100"
                                    onClick={() => handleSort(key as keyof Asset | 'riskCount')}
                                >
                                    <div className="flex items-center gap-2">
                                        {label}
                                        <ChevronsUpDown 
                                            size={14} 
                                            className={`${sortConfig.key === key ? 'text-blue-600' : 'text-slate-400'}`} 
                                        />
                                    </div>
                                </th>
                            ))}
                            <th className="p-4 text-right font-semibold text-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAssets.map(asset => {
                            const openRisks = asset.associatedRisks?.filter(r => r.status === 'Open') || [];
                            const isSelected = bulkActions.selectedAssets.includes(asset.id);
                            
                            return (
                                <tr 
                                    key={asset.id} 
                                    className={`border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors ${
                                        isSelected ? 'bg-blue-50' : ''
                                    }`}
                                    onClick={() => onRowClick(asset.id)}
                                >
                                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => handleSelectAsset(asset.id, !isSelected)}>
                                            {isSelected ? (
                                                <CheckSquare size={16} className="text-blue-600" />
                                            ) : (
                                                <Square size={16} className="text-slate-400" />
                                            )}
                                        </button>
                                    </td>
                                    <td className="p-4 font-mono text-xs text-slate-500">{asset.id}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-slate-800">{asset.name}</span>
                                            {asset.assetValue >= 12 && (
                                                <AlertTriangle size={14} className="text-red-500" title="Critical Asset" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">{asset.assetType}</td>
                                    <td className="p-4 text-slate-600">{asset.owner}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            asset.confidentiality >= 4 ? 'bg-red-100 text-red-700' : 
                                            asset.confidentiality >= 3 ? 'bg-yellow-100 text-yellow-700' : 
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {asset.confidentiality}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            asset.integrity >= 4 ? 'bg-red-100 text-red-700' : 
                                            asset.integrity >= 3 ? 'bg-yellow-100 text-yellow-700' : 
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {asset.integrity}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            asset.availability >= 4 ? 'bg-red-100 text-red-700' : 
                                            asset.availability >= 3 ? 'bg-yellow-100 text-yellow-700' : 
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {asset.availability}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getValueColor(asset.assetValue)}`}>
                                            {asset.assetValue}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {openRisks.length === 0 && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <Shield size={12} className="mr-1" />
                                                None
                                            </span>
                                        )}
                                        {openRisks.length === 1 && (
                                            <button
                                                onClick={(e) => handleRiskClick(e, openRisks[0].id)}
                                                className="font-medium text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                <AlertTriangle size={12} />
                                                {openRisks[0].id}
                                            </button>
                                        )}
                                        {openRisks.length > 1 && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <AlertTriangle size={12} className="mr-1" />
                                                {openRisks.length} Open
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(asset.status)}`}>
                                            {asset.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => onEdit(asset)} 
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                                title="Edit Asset"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => onDelete(asset)} 
                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                                title="Delete Asset"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <AssetRowActions 
                                                asset={asset}
                                                onEdit={() => onEdit(asset)}
                                                onDelete={() => onDelete(asset)}
                                                onViewDetails={() => onRowClick(asset.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center p-4 border-t border-slate-200">
                    <div className="text-sm text-slate-600">
                        Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, assets.length)} of {assets.length} assets
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => onPageChange(currentPage - 1)} 
                            disabled={currentPage === 1} 
                            className="flex items-center gap-1 text-sm font-semibold text-slate-600 disabled:opacity-50 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-100"
                        >
                            <ChevronLeft size={16} /> Previous
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNumber = i + Math.max(1, currentPage - 2);
                                if (pageNumber > totalPages) return null;
                                return (
                                    <button 
                                        key={pageNumber}
                                        onClick={() => onPageChange(pageNumber)} 
                                        className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                                            currentPage === pageNumber 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>
                        <button 
                            onClick={() => onPageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages} 
                            className="flex items-center gap-1 text-sm font-semibold text-slate-600 disabled:opacity-50 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-100"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};