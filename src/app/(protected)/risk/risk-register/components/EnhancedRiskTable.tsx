// File: /app/risk/risk-register/components/EnhancedRiskTable.tsx

'use client'

import React from 'react';
import { Eye, Edit, Trash2, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Risk } from '../types';

interface EnhancedRiskTableProps {
    risks: Risk[];
    selectedRisks: string[];
    onSelectRisk: (riskId: string) => void;
    onSelectAll: () => void;
    onViewRisk: (riskId: string) => void;
    onEditRisk: (riskId: string) => void;
    onDeleteRisk: (riskId: string) => void;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
}

export const EnhancedRiskTable: React.FC<EnhancedRiskTableProps> = ({
    risks,
    selectedRisks,
    onSelectRisk,
    onSelectAll,
    onViewRisk,
    onEditRisk,
    onDeleteRisk,
    currentPage,
    totalPages,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
}) => {
    const isAllSelected = selectedRisks.length === risks.length && risks.length > 0;

    const getRiskScoreColor = (score: number) => {
        if (score >= 20) return 'bg-red-500 text-white';
        if (score >= 15) return 'bg-orange-400 text-white';
        if (score >= 9) return 'bg-yellow-400 text-white';
        return 'bg-green-400 text-white';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': return 'bg-red-100 text-red-800 border border-red-200';
            case 'Under Treatment': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
            case 'Mitigated': return 'bg-green-100 text-green-800 border border-green-200';
            case 'Closed': return 'bg-gray-100 text-gray-800 border border-gray-200';
            case 'Accepted': return 'bg-blue-100 text-blue-800 border border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border border-gray-200';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Information Security': return 'bg-red-100 text-red-800';
            case 'Operational': return 'bg-blue-100 text-blue-800';
            case 'Legal/Compliance': return 'bg-pink-100 text-pink-800';
            case 'Supplier Risk': return 'bg-orange-100 text-orange-800';
            case 'Financial': return 'bg-green-100 text-green-800';
            case 'Strategic': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getAssetTypeIcon = (type: string) => {
        const iconMap: Record<string, string> = {
            database: 'fa-database',
            server: 'fa-server', 
            application: 'fa-window-maximize',
            network: 'fa-network-wired',
            vendor: 'fa-handshake',
            policy: 'fa-file-contract',
            user: 'fa-users'
        };
        return iconMap[type] || 'fa-cube';
    };

    const getAssetTypeColor = (type: string) => {
        const colorMap: Record<string, string> = {
            database: 'bg-blue-100 text-blue-800',
            server: 'bg-green-100 text-green-800',
            application: 'bg-purple-100 text-purple-800',
            network: 'bg-yellow-100 text-yellow-800',
            vendor: 'bg-orange-100 text-orange-800',
            policy: 'bg-pink-100 text-pink-800',
            user: 'bg-gray-100 text-gray-800'
        };
        return colorMap[type] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const isOverdue = (dateString: string) => {
        return new Date(dateString) < new Date();
    };

    return (
        <section className="px-8 py-6">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-100 text-slate-900">
                            <tr>
                                <th className="px-3 py-3 text-left">
                                    <input 
                                        type="checkbox" 
                                        checked={isAllSelected}
                                        onChange={onSelectAll}
                                        className="w-3 h-3 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                    />
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        RISK ID
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs min-w-[250px]">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        RISK TITLE
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        ASSETS
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        CATEGORY
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        LIKELIHOOD
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        IMPACT
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        SCORE
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        STATUS
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        OWNER
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    CONTROLS
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">
                                    <div className="flex items-center cursor-pointer hover:text-teal-600">
                                        REVIEW
                                        <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                                    </div>
                                </th>
                                <th className="px-3 py-3 text-left font-semibold text-xs">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {risks.map((risk) => (
                                <tr key={risk.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-3 py-3">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedRisks.includes(risk.id)}
                                            onChange={() => onSelectRisk(risk.id)}
                                            className="w-3 h-3 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                                        />
                                    </td>
                                    <td className="px-3 py-3">
                                        <button 
                                            onClick={() => onViewRisk(risk.id)}
                                            className="text-teal-600 hover:text-teal-700 font-medium text-xs"
                                        >
                                            {risk.id}
                                        </button>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div>
                                            <p className="font-medium text-slate-900 text-xs">{risk.title}</p>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{risk.description}</p>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {risk.associatedAssets.slice(0, 2).map((asset) => (
                                                <span 
                                                    key={asset.id}
                                                    className={`px-1.5 py-0.5 text-xs rounded-full ${getAssetTypeColor(asset.type)}`}
                                                >
                                                    {asset.id}
                                                </span>
                                            ))}
                                            {risk.associatedAssets.length > 2 && (
                                                <span className="px-1.5 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full">
                                                    +{risk.associatedAssets.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={`px-1.5 py-0.5 text-xs rounded-full ${getCategoryColor(risk.category)}`}>
                                            {risk.category}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 bg-orange-200 text-orange-800 rounded text-xs flex items-center justify-center font-medium mr-1">
                                                {risk.likelihoodScore}
                                            </div>
                                            <span className="text-xs text-slate-500 hidden lg:inline">
                                                {risk.likelihood === 'Very High' ? 'VH' :
                                                 risk.likelihood === 'Very Low' ? 'VL' :
                                                 risk.likelihood.charAt(0)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 bg-red-200 text-red-800 rounded text-xs flex items-center justify-center font-medium mr-1">
                                                {risk.impactScore}
                                            </div>
                                            <span className="text-xs text-slate-500 hidden lg:inline">
                                                {risk.impactScore === 5 ? 'VH' : 
                                                 risk.impactScore === 4 ? 'H' :
                                                 risk.impactScore === 3 ? 'M' :
                                                 risk.impactScore === 2 ? 'L' : 'VL'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={`px-1.5 py-0.5 text-xs rounded font-medium ${getRiskScoreColor(risk.riskScore)}`}>
                                            {risk.riskScore}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span className={`px-1.5 py-0.5 text-xs rounded-full flex items-center w-fit ${getStatusColor(risk.status)}`}>
                                            <div className={`w-1.5 h-1.5 ${risk.status === 'Open' ? 'bg-red-500' : 
                                                                   risk.status === 'Under Treatment' ? 'bg-yellow-500' :
                                                                   risk.status === 'Mitigated' ? 'bg-green-500' :
                                                                   risk.status === 'Closed' ? 'bg-gray-500' : 'bg-blue-500'} rounded-full mr-1`}></div>
                                            {risk.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center">
                                            <img 
                                                src={risk.ownerAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(risk.owner)}&size=20&background=e2e8f0&color=334155`}
                                                alt={risk.owner} 
                                                className="w-5 h-5 rounded-full mr-1.5"
                                            />
                                            <span className="text-xs text-slate-700 truncate">{risk.owner}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {risk.annexAControls.slice(0, 2).map((control) => (
                                                <span 
                                                    key={control.id}
                                                    className="px-1.5 py-0.5 bg-purple-100 text-purple-800 text-xs rounded"
                                                >
                                                    {control.id}
                                                </span>
                                            ))}
                                            {risk.annexAControls.length > 2 && (
                                                <span className="px-1.5 py-0.5 text-xs bg-slate-100 text-slate-600 rounded">
                                                    +{risk.annexAControls.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div>
                                            <p className="text-xs text-slate-700">{formatDate(risk.nextReview)}</p>
                                            {isOverdue(risk.nextReview) ? (
                                                <p className="text-xs text-red-600 font-medium">Overdue</p>
                                            ) : (
                                                <p className="text-xs text-green-600">On track</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center space-x-1">
                                            <button 
                                                onClick={() => onViewRisk(risk.id)}
                                                className="text-teal-600 hover:text-teal-700 p-1"
                                                title="View Risk"
                                            >
                                                <Eye className="w-3 h-3" />
                                            </button>
                                            <button 
                                                onClick={() => onEditRisk(risk.id)}
                                                className="text-blue-600 hover:text-blue-700 p-1"
                                                title="Edit Risk"
                                            >
                                                <Edit className="w-3 h-3" />
                                            </button>
                                            <button 
                                                onClick={() => onDeleteRisk(risk.id)}
                                                className="text-red-600 hover:text-red-700 p-1"
                                                title="Delete Risk"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {risks.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-slate-500 text-lg mb-2">No risks found</div>
                            <div className="text-slate-400 text-sm">
                                Try adjusting your search criteria or filters
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Table Footer with Pagination */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-slate-500">
                                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, risks.length)} of {risks.length} results
                            </span>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-slate-500">Show</span>
                                <select 
                                    value={itemsPerPage}
                                    onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
                                    className="border border-slate-300 rounded px-2 py-1 text-sm"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span className="text-sm text-slate-500">per page</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>
                            
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = i + 1;
                                const isActive = pageNum === currentPage;
                                return (
                                    <button 
                                        key={pageNum}
                                        onClick={() => onPageChange(pageNum)}
                                        className={`px-3 py-1 rounded text-sm transition-colors ${
                                            isActive 
                                                ? 'bg-teal-600 text-white' 
                                                : 'border border-slate-300 text-slate-700 hover:bg-white'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            
                            {totalPages > 5 && (
                                <>
                                    <span className="px-3 py-1 text-slate-500">...</span>
                                    <button 
                                        onClick={() => onPageChange(totalPages)}
                                        className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-700 hover:bg-white transition-colors"
                                    >
                                    </button>
                                </>
                            )}
                            
                            <button 
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};