// Save as: /app/policy-management/components/tables/PolicyList.tsx
'use client'

import React, { useState, useMemo } from 'react';
import { Search, Eye, Pen, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
    Policy, 
    FilterProps, 
    statusColors, 
    statusOptions, 
    categoryOptions, 
    annexAControlOptions, 
    reviewDueOptions 
} from '../../types/policy.types';

interface PolicyListProps {
    policies: Policy[];
    filterProps: FilterProps;
}

const ITEMS_PER_PAGE = 10;

export const PolicyList: React.FC<PolicyListProps> = ({ policies, filterProps }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

    const {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        selectedOwner,
        setSelectedOwner,
        selectedAnnexControl,
        setSelectedAnnexControl,
        selectedReviewDue,
        setSelectedReviewDue,
        policies: allPolicies
    } = filterProps;

    // Get unique owners for filter dropdown
    const ownerOptions = useMemo(() => {
        const owners = Array.from(new Set(allPolicies.map(p => p.owner.name)));
        return ['All', ...owners.sort()];
    }, [allPolicies]);

    // Pagination calculations
    const totalPages = Math.ceil(policies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPolicies = policies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Reset to first page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedStatus, selectedOwner, selectedAnnexControl, selectedReviewDue]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedPolicies(paginatedPolicies.map(p => p.id));
        } else {
            setSelectedPolicies([]);
        }
    };

    const handleSelectPolicy = (policyId: string, checked: boolean) => {
        if (checked) {
            setSelectedPolicies([...selectedPolicies, policyId]);
        } else {
            setSelectedPolicies(selectedPolicies.filter(id => id !== policyId));
        }
    };

    const handleViewPolicy = (policyId: string) => {
        console.log('View policy:', policyId);
    };

    const handleEditPolicy = (policyId: string) => {
        console.log('Edit policy:', policyId);
    };

    const handleMoreActions = (policyId: string) => {
        console.log('More actions for policy:', policyId);
    };

    const renderAcknowledgementBar = (percentage: number) => {
        if (percentage === 0) {
            return <span className="text-slate-500">N/A</span>;
        }

        let barColor = 'bg-red-500';
        if (percentage >= 90) barColor = 'bg-green-500';
        else if (percentage >= 80) barColor = 'bg-yellow-500';
        else if (percentage >= 70) barColor = 'bg-orange-500';

        return (
            <div className="flex items-center min-w-0">
                <div className="w-full bg-gray-200 rounded-full h-1.5 mr-3">
                    <div 
                        className={`${barColor} h-1.5 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <span className="text-sm font-medium text-slate-700 min-w-fit">
                    {percentage}%
                </span>
            </div>
        );
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 transition-colors ${
                        currentPage === i 
                            ? 'z-10 text-slate-800 bg-slate-100 border-slate-800' 
                            : 'text-slate-500 bg-white'
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            {/* Search and Quick Filters */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-1/3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by title, ID, owner..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800/50 focus:border-slate-800 outline-none transition-colors"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm font-medium text-slate-800 bg-slate-800/10 rounded-full hover:bg-slate-800/20 transition-colors">
                            Policies missing owner
                        </button>
                        <button className="px-3 py-1 text-sm font-medium text-slate-800 bg-slate-800/10 rounded-full hover:bg-slate-800/20 transition-colors">
                            Pending acknowledgment
                        </button>
                    </div>
                </div>

                {/* Filter Dropdowns */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-slate-800/50 focus:border-slate-800 outline-none transition-colors"
                    >
                        {categoryOptions.map(option => (
                            <option key={option} value={option}>
                                Category: {option}
                            </option>
                        ))}
                    </select>
                    
                    <select 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-slate-800/50 focus:border-slate-800 outline-none transition-colors"
                    >
                        {statusOptions.map(option => (
                            <option key={option} value={option}>
                                Status: {option}
                            </option>
                        ))}
                    </select>
                    
                    <select 
                        value={selectedAnnexControl}
                        onChange={(e) => setSelectedAnnexControl(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-slate-800/50 focus:border-slate-800 outline-none transition-colors"
                    >
                        {annexAControlOptions.map(option => (
                            <option key={option} value={option}>
                                {option === 'All' ? 'Annex A Control: All' : option}
                            </option>
                        ))}
                    </select>
                    
                    <select 
                        value={selectedOwner}
                        onChange={(e) => setSelectedOwner(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-slate-800/50 focus:border-slate-800 outline-none transition-colors"
                    >
                        {ownerOptions.map(option => (
                            <option key={option} value={option}>
                                Owner: {option}
                            </option>
                        ))}
                    </select>
                    
                    <select 
                        value={selectedReviewDue}
                        onChange={(e) => setSelectedReviewDue(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-slate-800/50 focus:border-slate-800 outline-none transition-colors"
                    >
                        {reviewDueOptions.map(option => (
                            <option key={option} value={option}>
                                Review Due: {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                    Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, policies.length)} of {policies.length} policies
                </div>
                {selectedPolicies.length > 0 && (
                    <div className="text-sm text-slate-600">
                        {selectedPolicies.length} selected
                    </div>
                )}
            </div>

            {/* Policy Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-800">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                        <tr>
                            <th scope="col" className="p-4 w-10">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300"
                                    checked={selectedPolicies.length === paginatedPolicies.length && paginatedPolicies.length > 0}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                            </th>
                            <th scope="col" className="px-6 py-3">Policy ID</th>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Owner</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Next Review</th>
                            <th scope="col" className="px-6 py-3">Acknowledged</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPolicies.map(policy => (
                            <tr key={policy.id} className="bg-white border-b hover:bg-slate-50/50 transition-colors">
                                <td className="p-4">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-gray-300"
                                        checked={selectedPolicies.includes(policy.id)}
                                        onChange={(e) => handleSelectPolicy(policy.id, e.target.checked)}
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-500">{policy.id}</td>
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-semibold text-slate-800">{policy.title}</div>
                                        <div className="text-xs text-slate-500 mt-1">{policy.description}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img 
                                            className="w-6 h-6 rounded-full mr-2" 
                                            src={policy.owner.avatar} 
                                            alt={`${policy.owner.name} avatar`}
                                        />
                                        <span className="text-slate-800">{policy.owner.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[policy.status]}`}>
                                        {policy.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-700">{policy.nextReview}</td>
                                <td className="px-6 py-4">
                                    <div className="min-w-0 max-w-32">
                                        {renderAcknowledgementBar(policy.acknowledgement)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-1">
                                        <button 
                                            onClick={() => handleViewPolicy(policy.id)}
                                            className="text-slate-500 hover:text-slate-800 p-1 rounded transition-colors"
                                            title="View Policy"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleEditPolicy(policy.id)}
                                            className="text-slate-500 hover:text-slate-800 p-1 rounded transition-colors"
                                            title="Edit Policy"
                                        >
                                            <Pen size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleMoreActions(policy.id)}
                                            className="text-slate-500 hover:text-slate-800 p-1 rounded transition-colors"
                                            title="More Actions"
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {paginatedPolicies.length === 0 && (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                    No policies found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav className="flex items-center justify-between pt-6" aria-label="Table navigation">
                    <span className="text-sm font-normal text-slate-500">
                        Showing <span className="font-semibold text-slate-800">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, policies.length)}</span> of <span className="font-semibold text-slate-800">{policies.length}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center px-3 py-2 text-sm leading-tight text-slate-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={16} className="mr-1" />
                            Previous
                        </button>
                        
                        <div className="flex">
                            {renderPagination()}
                        </div>
                        
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center px-3 py-2 text-sm leading-tight text-slate-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                            <ChevronRight size={16} className="ml-1" />
                        </button>
                    </div>
                </nav>
            )}
        </section>
    );
};