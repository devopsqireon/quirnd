// Save as: /app/risk/risk-register/components.tsx
'use client'

import React, { useState, useMemo } from 'react';
import { Database, ShieldAlert, Server, ChevronsUpDown, Edit, Trash2, Filter, RotateCcw, Plus, Lightbulb, ChevronLeft, ChevronRight as ChevronRightIcon, AlertTriangle, FileDown, X } from 'lucide-react';
import { Risk } from '@/types/risk';
import { MOCK_USERS } from '@/constants/assets';
import { RISK_CATEGORIES, RISK_STATUSES } from '@/constants/risk-form-options';

// --- MOCK PDF COMPONENT ---
export const RiskRegisterPDF: React.FC<{ risks: Risk[]; onClose: () => void }> = ({ risks, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="p-4 bg-slate-100 flex justify-between items-center border-b">
                <h2 className="text-lg font-semibold text-slate-800">Export Preview: Risk Register</h2>
                <div>
                    <button onClick={() => alert("Printing to PDF...")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 text-sm">
                        <FileDown size={16} /> Download PDF
                    </button>
                    <button onClick={onClose} className="ml-2 text-slate-500 hover:text-slate-800 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>
            </div>
            <div className="p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-2">Risk Register Report</h1>
                <p className="text-sm text-slate-500 mb-6">Generated on: {new Date().toLocaleDateString()}</p>
                <table className="w-full text-xs border-collapse border border-slate-400">
                    <thead className="bg-slate-200">
                        <tr>
                            {['ID', 'Statement', 'Category', 'Owner', 'Inherent Risk', 'Residual Risk', 'Status'].map(h => (
                                <th key={h} className="border border-slate-300 p-2 text-left font-semibold">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {risks.map(risk => {
                            const inherent = calculateRiskProfile(risk.likelihood, risk.impact);
                            const residual = calculateRiskProfile(risk.revisedLikelihood, risk.revisedImpact);
                            return (
                                <tr key={risk.id} className="even:bg-slate-50">
                                    <td className="border border-slate-300 p-2">{risk.id}</td>
                                    <td className="border border-slate-300 p-2">{risk.title}</td>
                                    <td className="border border-slate-300 p-2">{risk.category}</td>
                                    <td className="border border-slate-300 p-2">{risk.owner}</td>
                                    <td className="border border-slate-300 p-2">{inherent.level} ({inherent.score})</td>
                                    <td className="border border-slate-300 p-2">{residual.level} ({residual.score})</td>
                                    <td className="border border-slate-300 p-2">{risk.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);


// --- DELETE CONFIRMATION MODAL ---
export const DeleteConfirmationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    assetName: string; 
    isPermanent: boolean;
}> = ({ isOpen, onClose, onConfirm, assetName, isPermanent }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex items-start gap-4">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-0 text-left">
                        <h3 className="text-lg leading-6 font-semibold text-gray-900">
                            {isPermanent ? 'Permanently Delete Risk' : 'Delete Risk'}
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to {isPermanent ? 'permanently delete' : 'move'} the risk <strong className="text-slate-800">{assetName}</strong> {isPermanent ? '' : 'to the trash'}?
                                {isPermanent && <span className="font-bold block mt-2">This action cannot be undone.</span>}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- PAGINATION COMPONENT ---
export const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <div className="flex justify-between items-center mt-4">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-1 text-sm font-semibold text-slate-600 disabled:opacity-50">
                <ChevronLeft size={16} /> Previous
            </button>
            <div className="flex items-center gap-2">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => onPageChange(number)} className={`w-8 h-8 rounded-md text-sm font-semibold ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>{number}</button>
                ))}
            </div>
             <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-1 text-sm font-semibold text-slate-600 disabled:opacity-50">
                Next <ChevronRightIcon size={16} />
            </button>
        </div>
    );
};


// --- HELPER FUNCTION ---
const calculateRiskProfile = (likelihood: number, impact: number) => {
    const score = likelihood * impact;
    let level = 'Low';
    let color = 'bg-green-100 text-green-800';
    if (score >= 20) {
        level = 'High';
        color = 'bg-red-100 text-red-800';
    } else if (score > 10) {
        level = 'Medium';
        color = 'bg-yellow-100 text-yellow-800';
    }
    return { score, level, color };
};

// --- UI COMPONENTS ---

const SummaryCard: React.FC<{ icon: React.ElementType; title: string; count: number; color: string }> = ({ icon: Icon, title, count, color }) => (
     <div className="bg-white p-5 rounded-lg shadow-sm flex items-start gap-4 border border-slate-200">
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('600', '100')}`}><Icon className={`w-6 h-6 ${color}`} /></div>
        <div><p className="text-sm text-slate-500">{title}</p><p className="text-3xl font-bold text-slate-800">{count}</p></div>
    </div>
);

export const RiskSummary: React.FC<{ risks: Risk[] }> = ({ risks }) => {
    const stats = useMemo(() => ({
        total: risks.length,
        highInherent: risks.filter(r => calculateRiskProfile(r.likelihood, r.impact).level === 'High').length,
        openForTreatment: risks.filter(r => r.status === 'Open' || r.status === 'Under Review').length
    }), [risks]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SummaryCard icon={Database} title="Total Risks" count={stats.total} color="text-blue-600" />
            <SummaryCard icon={ShieldAlert} title="High Inherent Risks" count={stats.highInherent} color="text-red-600" />
            <SummaryCard icon={Server} title="Open for Treatment" count={stats.openForTreatment} color="text-yellow-600" />
        </div>
    );
};

export const FilterPopover: React.FC<{
    onApply: (filters: any) => void;
    onClear: () => void;
    owners: string[];
}> = ({ onApply, onClear, owners }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({ riskLevel: '', status: '', owner: '', category: '' });

    const handleApply = () => { onApply(filters); setIsOpen(false); };
    const handleClear = () => { setFilters({ riskLevel: '', status: '', owner: '', category: '' }); onClear(); setIsOpen(false); };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-slate-600 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100">
                <Filter size={16} /> Filter
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-20 border border-slate-200">
                    <div className="p-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Inherent Risk Level</label>
                            <select value={filters.riskLevel} onChange={e => setFilters(f => ({...f, riskLevel: e.target.value}))} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                <option value="">All</option>
                                {['High', 'Medium', 'Low'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select value={filters.category} onChange={e => setFilters(f => ({...f, category: e.target.value}))} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                <option value="">All</option>
                                {RISK_CATEGORIES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select value={filters.status} onChange={e => setFilters(f => ({...f, status: e.target.value}))} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                <option value="">All</option>
                                {RISK_STATUSES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Owner</label>
                            <select value={filters.owner} onChange={e => setFilters(f => ({...f, owner: e.target.value}))} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                                <option value="">All</option>
                                {owners.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-slate-50 flex justify-between">
                        <button onClick={handleClear} className="text-sm font-semibold text-slate-600 hover:text-slate-800">Clear</button>
                        <button onClick={handleApply} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700">Apply</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export const RiskTable: React.FC<{
    risks: Risk[],
    onEdit: (risk: Risk) => void,
    onDelete: (risk: Risk) => void,
    onRowClick: (riskId: string) => void
}> = ({ risks, onEdit, onDelete, onRowClick }) => {
     const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': case 'Under Review': return 'bg-yellow-100 text-yellow-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Treated': case 'Closed': return 'bg-green-100 text-green-800';
            case 'Accepted': return 'bg-slate-100 text-slate-800';
            default: return 'bg-slate-100 text-slate-600';
        }
    };
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-slate-50">
                    <tr>
                        {['Risk ID', 'Risk Statement', 'Associated Assets', 'Inherent Risk', 'Residual Risk', 'Status', 'Owner', 'Actions'].map(header => (
                            <th key={header} className="p-3 text-left font-semibold text-slate-600">
                                <div className="flex items-center gap-1">{header} {header !== 'Actions' && <ChevronsUpDown size={14} className="cursor-pointer" />}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {risks.map(risk => {
                        const inherentRisk = calculateRiskProfile(risk.likelihood, risk.impact);
                        const residualRisk = calculateRiskProfile(risk.revisedLikelihood, risk.revisedImpact);
                        const relatedAssets = risk.relatedAssets || [];
                        return (
                            <tr key={risk.id} className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer" onClick={() => onRowClick(risk.id)}>
                                <td className="p-3 font-mono text-xs text-slate-500">{risk.id}</td>
                                <td className="p-3 font-semibold text-slate-800 max-w-xs truncate">{risk.title}</td>
                                <td className="p-3 text-slate-600 font-medium">
                                    {relatedAssets.length > 0 ? (
                                        <div className="flex items-center gap-1">
                                            <span className="font-mono text-xs bg-slate-200 px-2 py-0.5 rounded">{relatedAssets[0]}</span>
                                            {relatedAssets.length > 1 && <span className="text-xs text-slate-500">+{relatedAssets.length - 1}</span>}
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 italic">None</span>
                                    )}
                                </td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${inherentRisk.color}`}>{inherentRisk.score} - {inherentRisk.level}</span>
                                </td>
                                <td className="p-3">
                                     <span className={`px-2 py-1 text-xs font-bold rounded-full ${residualRisk.color}`}>{residualRisk.score} - {residualRisk.level}</span>
                                </td>
                                <td className="p-3"><span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(risk.status)}`}>{risk.status}</span></td>
                                <td className="p-3 text-slate-600">{risk.owner}</td>
                                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex gap-2">
                                        <button onClick={() => onEdit(risk)} className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                                        <button onClick={() => onDelete(risk)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export const WelcomeBanner: React.FC = () => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
        <div className="flex">
            <div className="flex-shrink-0"><Lightbulb className="h-5 w-5 text-blue-500" /></div>
            <div className="ml-3">
                <h3 className="text-lg font-semibold text-blue-800">Step 2: Build Your Risk Register</h3>
                <div className="mt-2 text-sm text-blue-700">
                    <p>Now that you have your assets, it's time to identify potential risks. A risk is anything that could harm your assets' confidentiality, integrity, or availability.</p>
                </div>
            </div>
        </div>
    </div>
);

export const EmptyState: React.FC<{ onAddRisk: () => void; }> = ({ onAddRisk }) => (
    <div className="text-center bg-white p-12 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">Your Risk Register is Empty</h2>
        <p className="mt-2 text-slate-600">Start by identifying risks related to your key assets.</p>
        <div className="mt-8">
            <button onClick={onAddRisk} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 mx-auto">
                <Plus size={20} /> Add Your First Risk
            </button>
        </div>
    </div>
);

export const TrashView: React.FC<{
    deletedRisks: Risk[];
    onRestore: (id: string) => void;
    onPermanentDelete: (risk: Risk) => void;
    onClose: () => void;
}> = ({ deletedRisks, onRestore, onPermanentDelete, onClose }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Deleted Risks</h2>
            <button onClick={onClose} className="text-sm font-semibold text-blue-600 hover:underline">Back to Risk Register</button>
        </div>
        {deletedRisks.length === 0 ? (
            <p className="text-slate-500 text-center py-8">The trash is empty.</p>
        ) : (
            <table className="w-full text-sm">
                <thead className="bg-slate-50">
                    <tr>{['Risk ID', 'Risk Title', 'Owner', 'Actions'].map(h => <th key={h} className="p-3 text-left font-semibold text-slate-600">{h}</th>)}</tr>
                </thead>
                 <tbody>
                    {deletedRisks.map(risk => (
                        <tr key={risk.id} className="border-b border-slate-200">
                            <td className="p-3 font-mono text-xs text-slate-500">{risk.id}</td>
                            <td className="p-3 font-semibold text-slate-800">{risk.title}</td>
                            <td className="p-3 text-slate-600">{risk.owner}</td>
                            <td className="p-3">
                                <div className="flex gap-4">
                                    <button onClick={() => onRestore(risk.id)} className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-800"><RotateCcw size={14} /> Restore</button>
                                    <button onClick={() => onPermanentDelete(risk)} className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-800"><Trash2 size={14} /> Delete Permanently</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);

