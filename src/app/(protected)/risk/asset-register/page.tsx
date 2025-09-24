// Save as: /app/risk/asset-register/page.tsx
'use client'

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TrashIcon, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';

import { Asset } from '@/types/asset';
import { initialAssets, MOCK_USERS } from '@/constants/assets';

import { RiskAssessmentStepper } from './components/RiskAssessmentStepper';
import { AssetModals } from './components/AssetModals';
import { EmptyState, WelcomeBanner, TrashView } from './components/EmptyState';
import { EnhancedAssetSummary } from './components/enhanced-asset-dashboard';
import { EnhancedAssetTable } from './components/enhanced-asset-table';
import { EnhancedAssetExportModal } from './components/enhanced-asset-export';

interface EnhancedFilterOptions {
    assetType: string;
    status: string;
    assetValue: string;
    owner: string;
    hasRisks: string;
    compliance: string;
    dateRange: string;
}

const AssetRegisterPage = () => {
    const router = useRouter();
    
    // Core Data State
    const [allAssets, setAllAssets] = useState<Asset[]>(initialAssets);
    const [assetOwners, setAssetOwners] = useState<string[]>(MOCK_USERS);
    
    // View State
    const [isTrashView, setIsTrashView] = useState(false);
    const [showDetailedAnalytics, setShowDetailedAnalytics] = useState(false);
    
    // Modal State (removed add modal related state)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
    const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPermanentDelete, setIsPermanentDelete] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
    const [isAddOwnerModalOpen, setIsAddOwnerModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    // Search, Filter, Pagination State
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<EnhancedFilterOptions>({
        assetType: '',
        status: '',
        assetValue: '',
        owner: '',
        hasRisks: '',
        compliance: '',
        dateRange: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Computed State
    const activeAssets = useMemo(() => 
        allAssets.filter(a => a.status !== 'Deleted'), [allAssets]
    );
    
    const deletedAssets = useMemo(() => 
        allAssets.filter(a => a.status === 'Deleted'), [allAssets]
    );

    // Enhanced filtering logic
    const filteredAssets = useMemo(() => {
        return activeAssets.filter(asset => {
            // Search filter
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch = 
                    asset.name.toLowerCase().includes(searchLower) ||
                    asset.id.toLowerCase().includes(searchLower) ||
                    asset.owner.toLowerCase().includes(searchLower) ||
                    asset.assetType.toLowerCase().includes(searchLower) ||
                    asset.description?.toLowerCase().includes(searchLower) ||
                    asset.associatedRisks?.some(r => r.id.toLowerCase().includes(searchLower));
                
                if (!matchesSearch) return false;
            }

            // Enhanced filters
            const { assetType, status, assetValue, owner, hasRisks, compliance, dateRange } = activeFilters;
            
            // Asset type filter
            if (assetType && asset.assetType !== assetType) return false;
            
            // Status filter
            if (status && asset.status !== status) return false;
            
            // Asset value/risk level filter
            if (assetValue) {
                switch (assetValue) {
                    case 'critical':
                        if (asset.assetValue < 15) return false;
                        break;
                    case 'high':
                        if (asset.assetValue < 12 || asset.assetValue >= 15) return false;
                        break;
                    case 'medium':
                        if (asset.assetValue < 8 || asset.assetValue >= 12) return false;
                        break;
                    case 'low':
                        if (asset.assetValue >= 8) return false;
                        break;
                }
            }
            
            // Owner filter
            if (owner && asset.owner !== owner) return false;
            
            // Risk status filter
            if (hasRisks) {
                const openRisks = asset.associatedRisks?.filter(r => r.status === 'Open') || [];
                const criticalRisks = openRisks.filter(r => r.severity === 'High');
                
                switch (hasRisks) {
                    case 'with-risks':
                        if (openRisks.length === 0) return false;
                        break;
                    case 'no-risks':
                        if (openRisks.length > 0) return false;
                        break;
                    case 'critical-risks':
                        if (criticalRisks.length === 0) return false;
                        break;
                }
            }
            
            // Compliance filter (mock implementation)
            if (compliance) {
                // In a real app, this would check actual compliance data
                const mockCompliance = Math.random() > 0.25 ? 'compliant' : 
                                     Math.random() > 0.5 ? 'needs-review' : 'non-compliant';
                if (compliance !== mockCompliance) return false;
            }
            
            // Date range filter (mock implementation)
            if (dateRange) {
                // In a real app, this would check actual last updated dates
                const now = new Date();
                const daysDiff = Math.floor(Math.random() * 90); // Mock: 0-90 days ago
                
                switch (dateRange) {
                    case 'today':
                        if (daysDiff > 1) return false;
                        break;
                    case 'week':
                        if (daysDiff > 7) return false;
                        break;
                    case 'month':
                        if (daysDiff > 30) return false;
                        break;
                    case 'quarter':
                        if (daysDiff > 90) return false;
                        break;
                }
            }
            
            return true;
        });
    }, [activeAssets, searchTerm, activeFilters]);

    const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
    const paginatedAssets = filteredAssets.slice(
        (currentPage - 1) * ITEMS_PER_PAGE, 
        currentPage * ITEMS_PER_PAGE
    );

    // Event Handlers (removed handleSaveAsset since we're not using add modal)
    const handleUpdateAsset = useCallback((updatedAsset: Asset) => {
        setAllAssets(prev => prev.map(asset => 
            asset.id === updatedAsset.id ? updatedAsset : asset
        ));
        setIsEditModalOpen(false);
        setAssetToEdit(null);
    }, []);
    
    const handleDeleteClick = useCallback((asset: Asset) => {
        setAssetToDelete(asset);
        setIsPermanentDelete(false);
        setIsDeleteModalOpen(true);
    }, []);

    const handlePermanentDeleteClick = useCallback((asset: Asset) => {
        setAssetToDelete(asset);
        setIsPermanentDelete(true);
        setIsDeleteModalOpen(true);
    }, []);
    
    const confirmDelete = useCallback(() => {
        if (!assetToDelete) return;

        if (isPermanentDelete) {
            setAllAssets(prev => prev.filter(asset => asset.id !== assetToDelete.id));
        } else {
            setAllAssets(prev => prev.map(asset => 
                asset.id === assetToDelete.id ? { ...asset, status: 'Deleted' } : asset
            ));
        }
        setIsDeleteModalOpen(false);
        setAssetToDelete(null);
    }, [assetToDelete, isPermanentDelete]);

    const handleRestoreAsset = useCallback((assetId: string) => {
        setAllAssets(prev => prev.map(asset => 
            asset.id === assetId ? { ...asset, status: 'Active' } : asset
        ));
    }, []);

   
    
    const handleAddOwner = useCallback((newOwner: string) => {
        if (!assetOwners.includes(newOwner)) {
            setAssetOwners(prev => [...prev, newOwner].sort());
        }
        setIsAddOwnerModalOpen(false);
        // Navigate to add page instead of opening add modal
        router.push('/risk/asset-register/add');
    }, [assetOwners, router]);

    const openManual = useCallback(() => { 
        setIsOptionsModalOpen(false);
        router.push('/risk/asset-register/add');
    }, [router]);
    
    const openImport = useCallback(() => { 
        setIsOptionsModalOpen(false); 
        setIsImportModalOpen(true); 
    }, []);
    
    const openSync = useCallback(() => { 
        setIsOptionsModalOpen(false); 
        setIsSyncModalOpen(true); 
    }, []);
    
    const handlePageChange = useCallback((page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);
    
    const handleApplyFilters = useCallback((filters: EnhancedFilterOptions) => {
        setActiveFilters(filters);
        setCurrentPage(1);
    }, []);
    
    const handleClearFilters = useCallback(() => {
        setActiveFilters({
            assetType: '',
            status: '',
            assetValue: '',
            owner: '',
            hasRisks: '',
            compliance: '',
            dateRange: ''
        });
        setCurrentPage(1);
    }, []);
    
    const handleRowClick = useCallback((assetId: string) => {
        router.push(`/risk/asset-register/view/${assetId}`);
    }, [router]);

    const handleEditClick = useCallback((assetId: string) => {
        router.push(`/risk/asset-register/edit/${assetId}`);
    }, [router]);

    const handleCardClick = useCallback((type: string) => {
        // Handle dashboard card clicks to filter assets
        switch (type) {
            case 'critical':
                setActiveFilters(prev => ({ ...prev, assetValue: 'critical' }));
                break;
            case 'risks':
                setActiveFilters(prev => ({ ...prev, hasRisks: 'with-risks' }));
                break;
            case 'total':
                handleClearFilters();
                break;
            default:
                break;
        }
        setCurrentPage(1);
    }, [handleClearFilters]);

    const handleQuickActions = useCallback((action: string) => {
        switch (action) {
            case 'risk-report':
                alert('Generating comprehensive risk analysis report...\n\nThis would include:\n- High-risk asset analysis\n- Vulnerability assessments\n- Risk correlation matrix\n- Mitigation recommendations');
                break;
            case 'compliance-review':
                alert('Scheduling compliance review...\n\nThis would:\n- Create review tasks\n- Assign to compliance team\n- Set review deadlines\n- Generate compliance checklist');
                break;
            case 'export-inventory':
                setIsExportModalOpen(true);
                break;
            default:
                break;
        }
    }, []);

    // Analytics calculations for insights
    const assetInsights = useMemo(() => {
        const criticalAssets = activeAssets.filter(a => a.assetValue >= 12);
        const assetsWithRisks = activeAssets.filter(a => 
            a.associatedRisks && a.associatedRisks.some(r => r.status === 'Open')
        );
        
        return {
            criticalAssetsGrowth: criticalAssets.length > 0 ? '+2.3%' : '0%',
            riskTrend: assetsWithRisks.length > activeAssets.length * 0.3 ? 'increasing' : 'stable',
            complianceScore: Math.round((1 - (assetsWithRisks.length / activeAssets.length)) * 100),
            topRiskOwner: activeAssets
                .reduce((acc, asset) => {
                    const riskCount = asset.associatedRisks?.filter(r => r.status === 'Open').length || 0;
                    if (riskCount > (acc.risks || 0)) {
                        return { owner: asset.owner, risks: riskCount };
                    }
                    return acc;
                }, { owner: '', risks: 0 })
        };
    }, [activeAssets]);

    return (
        <div className="bg-slate-50 font-sans min-h-screen">
            {/* Modals (removed add modal props) */}
            <AssetModals
                isEditModalOpen={isEditModalOpen}
                closeEditModal={() => setIsEditModalOpen(false)}
                onUpdateAsset={handleUpdateAsset}
                assetToEdit={assetToEdit}
                isAddOwnerModalOpen={isAddOwnerModalOpen}
                closeAddOwnerModal={() => setIsAddOwnerModalOpen(false)}
                onSaveOwner={handleAddOwner}
                isDeleteModalOpen={isDeleteModalOpen}
                closeDeleteModal={() => setIsDeleteModalOpen(false)}
                onConfirmDelete={confirmDelete}
                assetToDelete={assetToDelete}
                isPermanentDelete={isPermanentDelete}
                isImportModalOpen={isImportModalOpen}
                closeImportModal={() => setIsImportModalOpen(false)}
                isSyncModalOpen={isSyncModalOpen}
                closeSyncModal={() => setIsSyncModalOpen(false)}
                isOptionsModalOpen={isOptionsModalOpen}
                closeOptionsModal={() => setIsOptionsModalOpen(false)}
                onAddManually={openManual}
                onImport={openImport}
                onSync={openSync}
                assetOwners={assetOwners}
                onAddNewOwner={() => setIsAddOwnerModalOpen(true)}
            />

            <EnhancedAssetExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                assets={filteredAssets}
            />

            {/* Main Content */}
            <RiskAssessmentStepper currentStep={1} />
            
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Asset Register</h1>
                            <p className="text-slate-600 mt-2">
                                A comprehensive inventory of all organizational assets with risk analysis and compliance tracking.
                            </p>
                            {/* Insights Bar */}
                            <div className="flex items-center gap-6 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-slate-600">
                                        Compliance Score: <span className="font-semibold text-green-600">{assetInsights.complianceScore}%</span>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-blue-600" />
                                    <span className="text-slate-600">
                                        Critical Assets: <span className="font-semibold">{assetInsights.criticalAssetsGrowth}</span>
                                    </span>
                                </div>
                                {assetInsights.riskTrend === 'increasing' && (
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                                        <span className="text-orange-600 font-medium">Risk trend increasing</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {!isTrashView && (
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => handleQuickActions('risk-report')}
                                    className="flex items-center gap-2 text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 font-medium text-sm"
                                >
                                    <BarChart3 size={16} /> Risk Report
                                </button>
                                <button 
                                    onClick={() => setIsTrashView(true)} 
                                    className="flex items-center gap-2 text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 font-medium text-sm"
                                >
                                    <TrashIcon size={16} /> Trash ({deletedAssets.length})
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Conditional Content */}
                    {isTrashView ? (
                        <TrashView 
                            deletedAssets={deletedAssets} 
                            onRestore={handleRestoreAsset} 
                            onPermanentDelete={handlePermanentDeleteClick} 
                            onClose={() => setIsTrashView(false)} 
                        />
                    ) : allAssets.length === 0 ? (
                        <>
                            <WelcomeBanner />
                            <EmptyState 
                                onAddManually={() => router.push('/risk/asset-register/add')}
                                onImport={() => setIsImportModalOpen(true)}
                                onSync={() => setIsSyncModalOpen(true)}
                            />
                        </>
                    ) : (
                        <>
                            {/* Enhanced Asset Summary Dashboard */}
                            <EnhancedAssetSummary 
                                assets={activeAssets} 
                                onCardClick={handleCardClick}
                            />
                            
                            {/* Enhanced Asset Table */}
                            <EnhancedAssetTable 
                                assets={paginatedAssets}
                                onRowClick={handleRowClick}
                                onEdit={(asset) => handleEditClick(asset.id)}
                                onDelete={handleDeleteClick}
                                onAdd={() => router.push('/risk/asset-register/add')} // Direct navigation instead of modal
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                onApplyFilters={handleApplyFilters}
                                onClearFilters={handleClearFilters}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                onExport={() => setIsExportModalOpen(true)}
                            />
                            
                            {/* Quick Stats Footer */}
                            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                                <div className="text-center text-sm text-slate-600">
                                    Showing {filteredAssets.length} of {activeAssets.length} assets
                                    {searchTerm && (
                                        <span> • Filtered by: "{searchTerm}"</span>
                                    )}
                                    {Object.values(activeFilters).some(Boolean) && (
                                        <span> • {Object.values(activeFilters).filter(Boolean).length} filter(s) applied</span>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssetRegisterPage;