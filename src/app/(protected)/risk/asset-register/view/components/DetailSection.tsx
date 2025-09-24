// File: /app/risk/asset-register/view/components/DetailSection.tsx
'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DetailSectionProps {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const DetailSection: React.FC<DetailSectionProps> = ({ 
    title, 
    icon: Icon, 
    children, 
    defaultOpen = true 
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
        <div className="border-b border-slate-200 last:border-b-0 py-6">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex justify-between items-center text-left"
            >
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-slate-500" />
                    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                </div>
                {isOpen ? 
                    <ChevronUp className="text-slate-500" size={20} /> : 
                    <ChevronDown className="text-slate-500" size={20} />
                }
            </button>
            {isOpen && <div className="pt-4 pl-9 space-y-4">{children}</div>}
        </div>
    );
};