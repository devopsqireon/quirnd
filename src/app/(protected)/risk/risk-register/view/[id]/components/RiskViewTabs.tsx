// File: /app/risk/risk-register/view/[id]/components/RiskViewTabs.tsx

'use client'

import React from 'react';
import { 
    Eye, 
    Shield, 
    Clock, 
    FileText,
    AlertTriangle,
    Target,
    BarChart3
} from 'lucide-react';

interface Tab {
    id: string;
    label: string;
    icon: React.ReactNode;
    description: string;
    badge?: string | number;
}

interface RiskViewTabsProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export const RiskViewTabs: React.FC<RiskViewTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs: Tab[] = [
        {
            id: 'overview',
            label: 'Overview',
            icon: <Eye className="w-4 h-4" />,
            description: 'Risk assessment and key details'
        },
        {
            id: 'controls',
            label: 'Controls',
            icon: <Shield className="w-4 h-4" />,
            description: 'Risk mitigation controls',
            badge: 2 // Sample count
        },
        {
            id: 'timeline',
            label: 'Timeline',
            icon: <Clock className="w-4 h-4" />,
            description: 'Risk history and events',
            badge: 6 // Sample count
        },
        {
            id: 'documents',
            label: 'Documents',
            icon: <FileText className="w-4 h-4" />,
            description: 'Supporting documents and evidence',
            badge: 5 // Sample count
        }
    ];

    return (
        <div className="flex space-x-8">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                            isActive
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                            {tab.icon}
                        </span>
                        <span>{tab.label}</span>
                        
                        {/* Badge for counts */}
                        {tab.badge && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                isActive
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-600'
                            }`}>
                                {tab.badge}
                            </span>
                        )}
                        
                        {/* Tooltip on hover */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                            {tab.description}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};