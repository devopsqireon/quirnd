// File: /app/risk/asset-register/add/components/wizard/OwnershipResponsibilityStep.tsx (UPDATED)
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Edit3, X, Users, User } from 'lucide-react';
import { SmartField } from '../shared/SmartField';
import { DEPARTMENTS } from '../../utils/constants';

interface Person {
    id: string;
    name: string;
    email?: string;
    department?: string;
    role?: string;
}

interface OwnershipResponsibilityStepProps {
    formData: {
        custodian: string;
        department: string;
        stakeholders: string[];
    };
    onFieldChange: (field: string, value: any) => void;
}

// Mock data for custodians and stakeholders
const INITIAL_PEOPLE: Person[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice.j@company.com', department: 'Engineering', role: 'Senior Engineer' },
    { id: '2', name: 'Bob Williams', email: 'bob.w@company.com', department: 'IT', role: 'System Administrator' },
    { id: '3', name: 'Charlie Brown', email: 'charlie.b@company.com', department: 'Security', role: 'Security Analyst' },
    { id: '4', name: 'Diana Miller', email: 'diana.m@company.com', department: 'Operations', role: 'Operations Manager' },
    { id: '5', name: 'Ethan Hunt', email: 'ethan.h@company.com', department: 'Marketing', role: 'Marketing Lead' },
    { id: '6', name: 'Fiona Green', email: 'fiona.g@company.com', department: 'Finance', role: 'Financial Analyst' },
    { id: '7', name: 'George Wilson', email: 'george.w@company.com', department: 'HR', role: 'HR Manager' },
    { id: '8', name: 'Helen Davis', email: 'helen.d@company.com', department: 'Sales', role: 'Sales Director' },
];

// Person Modal Component
const PersonModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (person: Person) => void;
    person?: Person | null;
    title: string;
}> = ({ isOpen, onClose, onSave, person, title }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        role: ''
    });

    useEffect(() => {
        if (person) {
            setFormData({
                name: person.name || '',
                email: person.email || '',
                department: person.department || '',
                role: person.role || ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                department: '',
                role: ''
            });
        }
    }, [person, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: person?.id || Date.now().toString(),
            ...formData
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="user@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                        <select
                            value={formData.department}
                            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select department</option>
                            {DEPARTMENTS.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Role/Title</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="e.g., Senior Engineer, Manager"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {person ? 'Update' : 'Add'} Person
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Searchable Single Select Component for Custodian
const SearchableSingleSelect: React.FC<{
    value: string;
    onChange: (value: string) => void;
    options: Person[];
    onAdd: () => void;
    onEdit: (person: Person) => void;
    placeholder: string;
    label: string;
    icon: React.ReactNode;
}> = ({ value, onChange, options, onAdd, onEdit, placeholder, label, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.email && option.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const selectedOption = options.find(option => option.id === value);

    const handleSelect = (option: Person) => {
        onChange(option.id);
        setIsOpen(false);
        setSearchTerm('');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef}>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
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
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
                        <div className="p-3 border-b border-slate-200">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue-500"
                                autoFocus
                            />
                        </div>

                        <div className="p-2 border-b border-slate-200">
                            <button
                                onClick={() => {
                                    onAdd();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            >
                                <Plus size={16} />
                                Add New Person
                            </button>
                        </div>

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
                                                <div className="text-xs text-slate-500">{option.department} • {option.role}</div>
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
                                <div className="px-3 py-2 text-sm text-slate-500">No people found</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Multi-Select Component for Stakeholders
const MultiSelectDropdown: React.FC<{
    values: string[];
    onChange: (values: string[]) => void;
    options: Person[];
    onAdd: () => void;
    onEdit: (person: Person) => void;
    label: string;
    icon: React.ReactNode;
}> = ({ values, onChange, options, onAdd, onEdit, label, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.email && option.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const selectedOptions = options.filter(option => values.includes(option.id));

    const handleToggle = (option: Person) => {
        const newValues = values.includes(option.id)
            ? values.filter(id => id !== option.id)
            : [...values, option.id];
        onChange(newValues);
    };

    const removeSelected = (optionId: string) => {
        onChange(values.filter(id => id !== optionId));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef}>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            
            {/* Selected Items Display */}
            {selectedOptions.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                    {selectedOptions.map((option) => (
                        <span
                            key={option.id}
                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                            {option.name}
                            <button
                                type="button"
                                onClick={() => removeSelected(option.id)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="relative">
                <div
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-slate-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        {icon}
                        <span className="text-slate-500">
                            {selectedOptions.length > 0 
                                ? `${selectedOptions.length} stakeholder${selectedOptions.length > 1 ? 's' : ''} selected`
                                : 'Select stakeholders'
                            }
                        </span>
                    </div>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
                        <div className="p-3 border-b border-slate-200">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search stakeholders..."
                                className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue-500"
                                autoFocus
                            />
                        </div>

                        <div className="p-2 border-b border-slate-200">
                            <button
                                onClick={() => {
                                    onAdd();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            >
                                <Plus size={16} />
                                Add New Stakeholder
                            </button>
                        </div>

                        <div className="max-h-40 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center justify-between px-3 py-2 hover:bg-slate-50"
                                    >
                                        <label className="flex items-center gap-3 cursor-pointer flex-1">
                                            <input
                                                type="checkbox"
                                                checked={values.includes(option.id)}
                                                onChange={() => handleToggle(option)}
                                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-900">{option.name}</div>
                                                {option.email && (
                                                    <div className="text-xs text-slate-500">{option.email}</div>
                                                )}
                                                {option.department && (
                                                    <div className="text-xs text-slate-500">{option.department} • {option.role}</div>
                                                )}
                                            </div>
                                        </label>
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
                                <div className="px-3 py-2 text-sm text-slate-500">No people found</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const OwnershipResponsibilityStep: React.FC<OwnershipResponsibilityStepProps> = ({
    formData,
    onFieldChange
}) => {
    const [people, setPeople] = useState<Person[]>(INITIAL_PEOPLE);
    const [showPersonModal, setShowPersonModal] = useState(false);
    const [editingPerson, setEditingPerson] = useState<Person | null>(null);
    const [modalTitle, setModalTitle] = useState('');

    const handleSavePerson = (person: Person) => {
        if (editingPerson) {
            setPeople(prev => prev.map(p => p.id === person.id ? person : p));
        } else {
            setPeople(prev => [...prev, person]);
        }
        setEditingPerson(null);
        setShowPersonModal(false);
    };

    const handleAddPerson = () => {
        setEditingPerson(null);
        setModalTitle('Add New Person');
        setShowPersonModal(true);
    };

    const handleEditPerson = (person: Person) => {
        setEditingPerson(person);
        setModalTitle('Edit Person');
        setShowPersonModal(true);
    };

    return (
        <>
            <PersonModal
                isOpen={showPersonModal}
                onClose={() => {
                    setShowPersonModal(false);
                    setEditingPerson(null);
                }}
                onSave={handleSavePerson}
                person={editingPerson}
                title={modalTitle}
            />

            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <SearchableSingleSelect
                        value={formData.custodian}
                        onChange={(value) => onFieldChange('custodian', value)}
                        options={people}
                        onAdd={handleAddPerson}
                        onEdit={handleEditPerson}
                        placeholder="Select custodian/responsible person"
                        label="Custodian/Responsible Person"
                        icon={<User size={16} className="text-slate-400" />}
                    />

                    <SmartField
                        label="Department"
                        type="select"
                        value={formData.department}
                        onChange={(value) => onFieldChange('department', value)}
                        options={DEPARTMENTS}
                        required
                    />
                </div>

                <MultiSelectDropdown
                    values={formData.stakeholders}
                    onChange={(values) => onFieldChange('stakeholders', values)}
                    options={people}
                    onAdd={handleAddPerson}
                    onEdit={handleEditPerson}
                    label="Stakeholders"
                    icon={<Users size={16} className="text-slate-400" />}
                />
            </div>
        </>
    );
};