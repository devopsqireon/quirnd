// Save as: /app/risk/risk-register/page.tsx
'use client'

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, TrashIcon, FileDown } from 'lucide-react';

import { Risk } from '@/types/risk';
import { initialRisks } from '@/constants/risk';
import { MOCK_USERS } from '@/constants/assets';
import { calculateRiskProfile } from './add/components'; // Assuming this path

// Shared components - adjust path as needed
import { RiskAssessmentStepper } from '../asset-register/components/RiskAssessmentStepper';

// Components specific to this page
import { RiskSummary, RiskTable, EmptyState, WelcomeBanner, FilterPopover, TrashView, Pagination, DeleteConfirmationModal, RiskRegisterPDF } from './components';

const RiskRegisterPage = () => {
    const router = useRouter();
    const [allRisks, setAllRisks] = useState<Risk[]>(initialRisks);
    const [owners] = useState<string[]>(MOCK_USERS);

    // View State
    const [isTrashView, setIsTrashView] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // Modals state
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [riskToDelete, setRiskToDelete] = useState<Risk | null>(null);
    const [isPermanentDelete, setIsPermanentDelete] = useState(false);

    // Search, Filter, Pagination State
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 7;
    
    const activeRisks = useMemo(() => allRisks.filter(r => r.status !== 'Deleted'), [allRisks]);
    const deletedRisks = useMemo(() => allRisks.filter(r => r.status === 'Deleted'), [allRisks]);

    const filteredRisks = useMemo(() => {
        return activeRisks
            .filter(risk => {
                const { riskLevel, status, owner, category } = activeFilters;
                if (status && risk.status !== status) return false;
                if (owner && risk.owner !== owner) return false;
                if (category && risk.category !== category) return false;
                if (riskLevel) {
                    const inherentRiskLevel = calculateRiskProfile(risk.likelihood, risk.impact).level;
                    if (inherentRiskLevel !== riskLevel) return false;
                }
                return true;
            })
            .filter(risk => 
                risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                risk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                risk.owner.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [activeRisks, searchTerm, activeFilters]);

    const totalPages = Math.ceil(filteredRisks.length / ITEMS_PER_PAGE);
    const paginatedRisks = filteredRisks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    
    const handleEditClick = (risk: Risk) => {
        alert(`Navigating to edit page for ${risk.id} (not implemented yet).`);
    };

    const handleDeleteClick = (risk: Risk) => {
        setRiskToDelete(risk);
        setIsPermanentDelete(false);
        setIsDeleteModalOpen(true);
    };
    
    const handlePermanentDeleteClick = (risk: Risk) => {
        setRiskToDelete(risk);
        setIsPermanentDelete(true);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!riskToDelete) return;
        if (isPermanentDelete) {
            setAllRisks(prev => prev.filter(risk => risk.id !== riskToDelete.id));
        } else {
            setAllRisks(prev => prev.map(risk => 
                risk.id === riskToDelete.id ? { ...risk, status: 'Deleted' } : risk
            ));
        }
        setIsDeleteModalOpen(false);
        setRiskToDelete(null);
    };
    
    const handleRestoreRisk = (riskId: string) => {
        setAllRisks(prev => prev.map(risk => 
            risk.id === riskId ? { ...risk, status: 'Open' } : risk
        ));
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };
    
    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setActiveFilters({});
        setCurrentPage(1);
    };

    return (
        <div className="bg-slate-50 font-sans min-h-screen">
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} assetName={riskToDelete?.title || ''} isPermanent={isPermanentDelete} />
            {isExporting && <RiskRegisterPDF risks={filteredRisks} onClose={() => setIsExporting(false)} />}

            <RiskAssessmentStepper currentStep={2} />
            
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Risk Register</h1>
                            <p className="text-slate-600 mt-1">Identify, analyze, and evaluate risks to your assets.</p>
                        </div>
                        {!isTrashView && (
                             <button onClick={() => setIsTrashView(true)} className="flex items-center gap-2 text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 font-semibold text-sm">
                                <TrashIcon size={16} /> View Trash ({deletedRisks.length})
                            </button>
                        )}
                    </div>
                    
                    {isTrashView ? (
                        <TrashView deletedRisks={deletedRisks} onRestore={handleRestoreRisk} onPermanentDelete={handlePermanentDeleteClick} onClose={() => setIsTrashView(false)} />
                    ) : allRisks.length === 0 ? (
                        <>
                            <WelcomeBanner />
                            <EmptyState onAddRisk={() => router.push('/risk/risk-register/add')} />
                        </>
                    ) : (
                        <>
                            <RiskSummary risks={activeRisks} />
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                                    <div className="relative w-full md:w-1/3">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input type="text" placeholder="Search risks..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 pl-10 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FilterPopover onApply={handleApplyFilters} onClear={handleClearFilters} owners={owners} />
                                        <button onClick={() => setIsExporting(true)} className="flex items-center gap-2 text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 font-semibold text-sm">
                                            <FileDown size={16} /> Export
                                        </button>
                                        <button onClick={() => router.push('/risk/risk-register/add')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                                            <Plus size={16} /> Add New Risk
                                        </button>
                                    </div>
                                </div>
                                <RiskTable
                                    risks={paginatedRisks}
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteClick}
                                    onRowClick={(riskId) => router.push(`/risk/risk-register/${riskId}`)}
                                />
                                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiskRegisterPage;

