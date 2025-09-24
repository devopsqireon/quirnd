// File: /app/risk/asset-register/view/components/TabNavigation.tsx
'use client'

import React from 'react';

interface Tab {
    id: string;
    name: string;
    icon: React.ElementType;
    count?: number;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ 
    tabs, 
    activeTab, 
    onTabChange 
}) => {
    return (
        <div className="border-b border-slate-200 px-6">
            <nav className="-mb-px flex space-x-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 py-3 px-1 border-b-2 font-semibold text-sm transition-colors ${
                            activeTab === tab.id 
                                ? 'border-blue-600 text-blue-600' 
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                    >
                        <tab.icon size={16} />
                        {tab.name}
                        {tab.count !== undefined && (
                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                                activeTab === tab.id 
                                    ? 'bg-blue-100 text-blue-600' 
                                    : 'bg-slate-100 text-slate-600'
                            }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
};