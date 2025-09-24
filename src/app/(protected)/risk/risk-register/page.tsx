// File: /app/risk/risk-register/page.tsx

'use client'

import React, { useState, useMemo } from 'react';
import { 
    enhancedSampleRisks, 
    sampleHeatmapData, 
    sampleRecentActivity,
    sampleAssetRiskSummaries,
    sampleComplianceControls
} from './data/enhancedSampleData';
import { RiskFilters, RiskStats } from './types';
import { EnhancedHeader } from './components/EnhancedHeader';
import { EnhancedStatsCards } from './components/EnhancedStatsCards';
import { RiskHeatmapSection } from './components/RiskHeatmapSection';
import { AdvancedFiltersPanel } from './components/AdvancedFiltersPanel';
import { EnhancedBulkActions } from './components/EnhancedBulkActions';
import { EnhancedRiskTable } from './components/EnhancedRiskTable';
import { ComplianceIntegrationSection } from './components/ComplianceIntegrationSection';

const EnhancedRiskRegisterLanding: React.FC = () => {
    // State management
    const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filters, setFilters] = useState<RiskFilters>({
        search: '',
        associatedAsset: '',
        category: '',
        riskScore: '',
        owner: '',
        status: '',
        annexAControl: '',
        reviewDue: ''
    });

    // Calculate filtered risks
    const filteredRisks = useMemo(() => {
        return enhancedSampleRisks.filter(risk => {
            const matchesSearch = !filters.search || 
                risk.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                risk.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                risk.id.toLowerCase().includes(filters.search.toLowerCase()) ||
                risk.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
            
            const matchesAsset = !filters.associatedAsset || 
                risk.associatedAssets.some(asset => asset.type === filters.associatedAsset);
            
            const matchesCategory = !filters.category || risk.category === filters.category;
            
            const matchesRiskScore = !filters.riskScore || (() => {
                const score = risk.riskScore;
                switch (filters.riskScore) {
                    case 'low': return score >= 1 && score <= 5;
                    case 'medium': return score >= 6 && score <= 15;
                    case 'high': return score >= 16 && score <= 20;
                    case 'critical': return score >= 21 && score <= 25;
                    default: return true;
                }
            })();
            
            const matchesOwner = !filters.owner || risk.owner.toLowerCase().includes(filters.owner.toLowerCase());
            const matchesStatus = !filters.status || risk.status === filters.status;
            
            const matchesControl = !filters.annexAControl || 
                risk.annexAControls.some(control => control.id.toLowerCase().startsWith(filters.annexAControl.toLowerCase()));
            
            const matchesReviewDue = !filters.reviewDue || (() => {
                const reviewDate = new Date(risk.nextReview);
                const today = new Date();
                const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
                const quarterFromNow = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
                
                switch (filters.reviewDue) {
                    case 'overdue': return reviewDate < today;
                    case 'week': return reviewDate >= today && reviewDate <= weekFromNow;
                    case 'month': return reviewDate >= today && reviewDate <= monthFromNow;
                    case 'quarter': return reviewDate >= today && reviewDate <= quarterFromNow;
                    default: return true;
                }
            })();
            
            return matchesSearch && matchesAsset && matchesCategory && matchesRiskScore && 
                   matchesOwner && matchesStatus && matchesControl && matchesReviewDue;
        });
    }, [filters]);

    // Calculate statistics
    const riskStats = useMemo((): RiskStats => {
        const total = filteredRisks.length;
        const critical = filteredRisks.filter(r => r.riskLevel === 'Critical').length;
        const high = filteredRisks.filter(r => r.riskLevel === 'High').length;
        const open = filteredRisks.filter(r => r.status === 'Open').length;
        const overdue = filteredRisks.filter(r => new Date(r.nextReview) < new Date()).length;
        const underTreatment = filteredRisks.filter(r => r.status === 'Under Treatment').length;
        const mitigated = filteredRisks.filter(r => r.status === 'Mitigated').length;
        const assetsAtRisk = 23; // This would be calculated from actual asset data
        const complianceScore = 94; // This would be calculated from compliance data
        
        return { total, critical, high, open, overdue, underTreatment, mitigated, assetsAtRisk, complianceScore };
    }, [filteredRisks]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredRisks.length / itemsPerPage);
    const paginatedRisks = filteredRisks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Get active filters for display
    const activeFilters = useMemo(() => {
        const filters_array: string[] = [];
        if (filters.category) filters_array.push(`Category: ${filters.category}`);
        if (filters.status) filters_array.push(`Status: ${filters.status}`);
        if (filters.owner) filters_array.push(`Owner: ${filters.owner}`);
        if (filters.riskScore) filters_array.push(`Risk Score: ${filters.riskScore}`);
        if (filters.associatedAsset) filters_array.push(`Asset: ${filters.associatedAsset}`);
        return filters_array;
    }, [filters]);

    // Event handlers
    const handleSelectRisk = (riskId: string) => {
        setSelectedRisks(prev => 
            prev.includes(riskId) 
                ? prev.filter(id => id !== riskId)
                : [...prev, riskId]
        );
    };

    const handleSelectAll = () => {
        setSelectedRisks(
            selectedRisks.length === paginatedRisks.length 
                ? []
                : paginatedRisks.map(risk => risk.id)
        );
    };

    const handleClearAllFilters = () => {
        setFilters({
            search: '',
            associatedAsset: '',
            category: '',
            riskScore: '',
            owner: '',
            status: '',
            annexAControl: '',
            reviewDue: ''
        });
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSelectedRisks([]); // Clear selections when changing pages
    };

    const handleItemsPerPageChange = (items: number) => {
        setItemsPerPage(items);
        setCurrentPage(1);
        setSelectedRisks([]);
    };

    // Action handlers
    const handleViewRisk = (riskId: string) => {
        console.log('View risk:', riskId);
        // Navigate to view risk page
    };

    const handleEditRisk = (riskId: string) => {
        console.log('Edit risk:', riskId);
        // Navigate to edit risk page
    };

    const handleDeleteRisk = (riskId: string) => {
        console.log('Delete risk:', riskId);
        if (confirm('Are you sure you want to delete this risk?')) {
            // Implement delete logic
        }
    };

    const handleBulkActions = {
        assignOwner: () => console.log('Assign owner to selected risks'),
        changeStatus: () => console.log('Change status of selected risks'),
        linkControl: () => console.log('Link control to selected risks'),
        exportSelected: () => console.log('Export selected risks'),
        deleteSelected: () => {
            if (confirm(`Are you sure you want to delete ${selectedRisks.length} risks?`)) {
                console.log('Delete selected risks');
                setSelectedRisks([]);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <EnhancedHeader stats={{ managed: 42, underReview: 12, critical: 3 }} />

            {/* Statistics Cards */}
            <EnhancedStatsCards stats={riskStats} />

            {/* Main Content Grid - Two Column Layout */}
            <div className="px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content (2/3 width) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Advanced Filters Panel */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                            <AdvancedFiltersPanel
                                filters={filters}
                                onFilterChange={setFilters}
                                activeFilters={activeFilters}
                                onClearAllFilters={handleClearAllFilters}
                                resultsCount={filteredRisks.length}
                                totalCount={enhancedSampleRisks.length}
                            />
                        </div>

                        {/* Bulk Actions Bar */}
                        {selectedRisks.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                                <EnhancedBulkActions
                                    selectedCount={selectedRisks.length}
                                    totalCount={paginatedRisks.length}
                                    isAllSelected={selectedRisks.length === paginatedRisks.length && paginatedRisks.length > 0}
                                    onSelectAll={handleSelectAll}
                                    onAssignOwner={handleBulkActions.assignOwner}
                                    onChangeStatus={handleBulkActions.changeStatus}
                                    onLinkControl={handleBulkActions.linkControl}
                                    onExportSelected={handleBulkActions.exportSelected}
                                    onDeleteSelected={handleBulkActions.deleteSelected}
                                />
                            </div>
                        )}

                        {/* Enhanced Risk Table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                            <EnhancedRiskTable
                                risks={paginatedRisks}
                                selectedRisks={selectedRisks}
                                onSelectRisk={handleSelectRisk}
                                onSelectAll={handleSelectAll}
                                onViewRisk={handleViewRisk}
                                onEditRisk={handleEditRisk}
                                onDeleteRisk={handleDeleteRisk}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                                onItemsPerPageChange={handleItemsPerPageChange}
                            />
                        </div>
                    </div>

                    {/* Right Column - Heatmap and Quick Actions (1/3 width) */}
                    <div className="lg:col-span-1">
                        <RiskHeatmapSection 
                            heatmapData={sampleHeatmapData}
                            recentActivity={sampleRecentActivity}
                        />
                    </div>
                </div>
            </div>

            {/* Compliance and Asset Integration - Full Width */}
            <ComplianceIntegrationSection
                assetRiskSummaries={sampleAssetRiskSummaries}
                complianceControls={sampleComplianceControls}
                overallComplianceScore={94}
            />
        </div>
    );
};

export default EnhancedRiskRegisterLanding;