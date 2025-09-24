// File: /app/risk/asset-register/add/components/shared/SearchableDropdown.tsx
'use client'

import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit3 } from 'lucide-react';

interface SearchableDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: Array<{ id: string; name: string; [key: string]: any }>;
    onAdd: () => void;
    onEdit: (item: any) => void;
    placeholder: string;
    label: string;
    icon: React.ReactNode;
    required?: boolean;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ 
    value, 
    onChange, 
    options, 
    onAdd, 
    onEdit, 
    placeholder, 
    label, 
    icon, 
    required 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = useMemo(() => {
        return options.filter(option =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm]);

    const selectedOption = options.find(option => option.id === value);

    const handleSelect = (option: any) => {
        onChange(option.id);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            
            <div className="relative">
                <div
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-slate-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        {icon}
                        <span className={selectedOption ? 'text-slate-900' : 'text-slate-500'}>
                            {selectedOption ? selectedOption.name : placeholder}
                        </span>
                    </div>
                    <Search size={16} className="text-slate-400" />
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
                        {/* Search Input */}
                        <div className="p-3 border-b border-slate-200">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={`Search ${label.toLowerCase()}...`}
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue-500"
                                autoFocus
                            />
                        </div>

                        {/* Add New Button */}
                        <div className="p-2 border-b border-slate-200">
                            <button
                                onClick={() => {
                                    onAdd();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            >
                                <Plus size={16} />
                                Add New {label}
                            </button>
                        </div>

                        {/* Options List */}
                        <div className="max-h-40 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 cursor-pointer"
                                        onClick={() => handleSelect(option)}
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium text-slate-900">{option.name}</div>
                                            {option.email && (
                                                <div className="text-xs text-slate-500">{option.email}</div>
                                            )}
                                            {option.department && (
                                                <div className="text-xs text-slate-500">{option.department}</div>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit(option);
                                                setIsOpen(false);
                                            }}
                                            className="p-1 text-slate-400 hover:text-slate-600"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-sm text-slate-500">
                                    No {label.toLowerCase()} found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};