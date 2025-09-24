// File: /app/risk/risk-register/components/EnhancedHeader.tsx

'use client'

import React from 'react';
import { Plus, Download, Filter, Search, ExternalLink } from 'lucide-react';
import { useRouter } from "next/navigation";

interface HeaderProps {
    stats: {
        managed: number;
        underReview: number;
        critical: number;
    };
}

export const EnhancedHeader: React.FC<HeaderProps> = ({ stats }) => {

    const router = useRouter();
    
    const handleAddRisk = () => {
        router.push("/risk/risk-register/add"); 
    };

    const handleAdvancedSearch = () => {
        console.log('Advanced Search clicked');
    };

    const handleExport = () => {
        console.log('Export Register clicked');
    };

    return (
        <header className="bg-white border-b border-slate-200 px-8 py-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-navy">Risk Register</h1>
                    <p className="text-slate-500 mt-2">
                        Comprehensive risk management and ISO 27001 compliance tracking
                    </p>
                    
                    <div className="flex items-center mt-4 space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-slate-500">
                                {stats.managed} Risks Managed
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm text-slate-500">
                                {stats.underReview} Under Review
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-slate-500">
                                {stats.critical} Critical
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={handleAdvancedSearch}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Advanced Search
                    </button>
                    <button 
                        onClick={handleExport}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Register
                    </button>
                    <button 
                        onClick={handleAddRisk}
                        className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center font-medium"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Risk
                    </button>
                </div>
            </div>
        </header>
    );
};