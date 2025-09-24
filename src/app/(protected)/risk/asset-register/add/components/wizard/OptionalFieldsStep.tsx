// File: /app/risk/asset-register/add/components/wizard/OptionalFieldsStep.tsx (UPDATED)
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Tag, FileText, ChevronDown, Plus, Edit3, X } from 'lucide-react';
import { SmartField } from '../shared/SmartField';

interface TagItem {
    id: string;
    name: string;
    category?: string;
    description?: string;
    color?: string;
}

interface AuditRef {
    id: string;
    reference: string;
    auditor?: string;
    date?: string;
    type?: string;
    status?: string;
}

interface OptionalFieldsStepProps {
    formData: {
        tags: string[];
        auditReference: string;
        notes: string;
    };
    onFieldChange: (field: string, value: any) => void;
}

// Mock data for tags and audit references
const INITIAL_TAGS: TagItem[] = [
    { id: '1', name: 'production', category: 'Environment', description: 'Production environment asset', color: 'red' },
    { id: '2', name: 'customer-facing', category: 'Business', description: 'Customer-facing system', color: 'blue' },
    { id: '3', name: 'critical', category: 'Priority', description: 'Business critical asset', color: 'red' },
    { id: '4', name: 'compliance-critical', category: 'Compliance', description: 'Required for regulatory compliance', color: 'purple' },
    { id: '5', name: 'development', category: 'Environment', description: 'Development environment', color: 'green' },
    { id: '6', name: 'testing', category: 'Environment', description: 'Testing environment', color: 'yellow' },
    { id: '7', name: 'backup', category: 'Function', description: 'Backup system or data', color: 'gray' },
    { id: '8', name: 'monitoring', category: 'Function', description: 'Monitoring and alerting', color: 'blue' },
    { id: '9', name: 'security', category: 'Function', description: 'Security-related asset', color: 'red' },
    { id: '10', name: 'legacy', category: 'Status', description: 'Legacy system', color: 'orange' },
];

const INITIAL_AUDIT_REFS: AuditRef[] = [
    { id: '1', reference: 'ISO27001-2024-001', auditor: 'External Auditor Corp', date: '2024-01-15', type: 'ISO 27001', status: 'Completed' },
    { id: '2', reference: 'SOC2-2024-Q1', auditor: 'Compliance Partners', date: '2024-03-20', type: 'SOC 2', status: 'In Progress' },
    { id: '3', reference: 'PCI-DSS-2024-A1', auditor: 'Security Audit LLC', date: '2024-02-10', type: 'PCI DSS', status: 'Completed' },
    { id: '4', reference: 'GDPR-2024-REV1', auditor: 'Privacy Consultants', date: '2024-04-05', type: 'GDPR', status: 'Scheduled' },
    { id: '5', reference: 'HIPAA-2024-MED', auditor: 'Healthcare Compliance', date: '2024-01-30', type: 'HIPAA', status: 'Completed' },
];

// Tag Modal Component
const TagModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (tag: TagItem) => void;
    tag?: TagItem | null;
}> = ({ isOpen, onClose, onSave, tag }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        color: 'blue'
    });

    const TAG_CATEGORIES = ['Environment', 'Business', 'Priority', 'Compliance', 'Function', 'Status', 'Custom'];
    const TAG_COLORS = ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'gray', 'pink'];

    useEffect(() => {
        if (tag) {
            setFormData({
                name: tag.name || '',
                category: tag.category || '',
                description: tag.description || '',
                color: tag.color || 'blue'
            });
        } else {
            setFormData({
                name: '',
                category: '',
                description: '',
                color: 'blue'
            });
        }
    }, [tag, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: tag?.id || Date.now().toString(),
            ...formData
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">
                        {tag ? 'Edit Tag' : 'Add New Tag'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tag Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="e.g., high-priority, database, external"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select category</option>
                            {TAG_CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                        <div className="flex gap-2 flex-wrap">
                            {TAG_COLORS.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                                    className={`w-8 h-8 rounded-full border-2 ${
                                        formData.color === color ? 'border-slate-800' : 'border-slate-300'
                                    } bg-${color}-500`}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            rows={2}
                            placeholder="Brief description of what this tag represents"
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
                            {tag ? 'Update' : 'Add'} Tag
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Audit Reference Modal Component
const AuditRefModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (auditRef: AuditRef) => void;
    auditRef?: AuditRef | null;
}> = ({ isOpen, onClose, onSave, auditRef }) => {
    const [formData, setFormData] = useState({
        reference: '',
        auditor: '',
        date: '',
        type: '',
        status: ''
    });

    const AUDIT_TYPES = ['ISO 27001', 'SOC 2', 'PCI DSS', 'GDPR', 'HIPAA', 'SOX', 'FedRAMP', 'Internal', 'Other'];
    const AUDIT_STATUSES = ['Scheduled', 'In Progress', 'Completed', 'Pending Review', 'Closed'];

    useEffect(() => {
        if (auditRef) {
            setFormData({
                reference: auditRef.reference || '',
                auditor: auditRef.auditor || '',
                date: auditRef.date || '',
                type: auditRef.type || '',
                status: auditRef.status || ''
            });
        } else {
            setFormData({
                reference: '',
                auditor: '',
                date: '',
                type: '',
                status: ''
            });
        }
    }, [auditRef, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: auditRef?.id || Date.now().toString(),
            ...formData
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">
                        {auditRef ? 'Edit Audit Reference' : 'Add New Audit Reference'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Reference ID *</label>
                        <input
                            type="text"
                            value={formData.reference}
                            onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="e.g., ISO27001-2024-001"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Audit Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select audit type</option>
                            {AUDIT_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Auditor/Organization</label>
                        <input
                            type="text"
                            value={formData.auditor}
                            onChange={(e) => setFormData(prev => ({ ...prev, auditor: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="e.g., External Auditor Corp"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Audit Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select status</option>
                            {AUDIT_STATUSES.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
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
                            {auditRef ? 'Update' : 'Add'} Reference
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Multi-Select Component for Tags and Audit References
const MultiSelectDropdown: React.FC<{
    values: string[];
    onChange: (values: string[]) => void;
    options: (TagItem | AuditRef)[];
    onAdd: () => void;
    onEdit: (item: TagItem | AuditRef) => void;
    label: string;
    icon: React.ReactNode;
    placeholder: string;
    type: 'tag' | 'audit';
}> = ({ values, onChange, options, onAdd, onEdit, label, icon, placeholder, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option => {
        if (type === 'tag') {
            const tag = option as TagItem;
            return tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   (tag.category && tag.category.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            const audit = option as AuditRef;
            return audit.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   (audit.type && audit.type.toLowerCase().includes(searchTerm.toLowerCase()));
        }
    });

    const selectedOptions = options.filter(option => values.includes(option.id));

    const handleToggle = (option: TagItem | AuditRef) => {
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

    const getDisplayName = (option: TagItem | AuditRef) => {
        return type === 'tag' ? (option as TagItem).name : (option as AuditRef).reference;
    };

    const getTagColor = (option: TagItem) => {
        const colorMap: { [key: string]: string } = {
            blue: 'bg-blue-100 text-blue-800',
            green: 'bg-green-100 text-green-800',
            red: 'bg-red-100 text-red-800',
            yellow: 'bg-yellow-100 text-yellow-800',
            purple: 'bg-purple-100 text-purple-800',
            orange: 'bg-orange-100 text-orange-800',
            gray: 'bg-gray-100 text-gray-800',
            pink: 'bg-pink-100 text-pink-800'
        };
        return colorMap[option.color || 'blue'] || 'bg-blue-100 text-blue-800';
    };

    return (
        <div ref={wrapperRef}>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            
            {/* Selected Items Display */}
            {selectedOptions.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1">
                    {selectedOptions.map((option) => (
                        <span
                            key={option.id}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                type === 'tag' 
                                    ? getTagColor(option as TagItem)
                                    : 'bg-indigo-100 text-indigo-800'
                            }`}
                        >
                            {getDisplayName(option).length > 20 
                                ? `${getDisplayName(option).substring(0, 20)}...` 
                                : getDisplayName(option)
                            }
                            <button
                                type="button"
                                onClick={() => removeSelected(option.id)}
                                className="hover:text-current opacity-75 hover:opacity-100"
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
                                ? `${selectedOptions.length} ${type}${selectedOptions.length > 1 ? 's' : ''} selected`
                                : placeholder
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
                                placeholder={`Search ${type}s...`}
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
                                Add New {type === 'tag' ? 'Tag' : 'Audit Reference'}
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
                                                <div className="font-medium text-slate-900">{getDisplayName(option)}</div>
                                                {type === 'tag' && (option as TagItem).category && (
                                                    <div className="text-xs text-slate-500">Category: {(option as TagItem).category}</div>
                                                )}
                                                {type === 'audit' && (option as AuditRef).type && (
                                                    <div className="text-xs text-slate-500">Type: {(option as AuditRef).type} • Status: {(option as AuditRef).status}</div>
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
                                <div className="px-3 py-2 text-sm text-slate-500">No {type}s found</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const OptionalFieldsStep: React.FC<OptionalFieldsStepProps> = ({
    formData,
    onFieldChange
}) => {
    const [tags, setTags] = useState<TagItem[]>(INITIAL_TAGS);
    const [auditRefs, setAuditRefs] = useState<AuditRef[]>(INITIAL_AUDIT_REFS);
    const [showTagModal, setShowTagModal] = useState(false);
    const [showAuditModal, setShowAuditModal] = useState(false);
    const [editingTag, setEditingTag] = useState<TagItem | null>(null);
    const [editingAuditRef, setEditingAuditRef] = useState<AuditRef | null>(null);

    // Convert string arrays to ID arrays for multi-select compatibility
    const tagIds = formData.tags || [];
    const auditRefIds = formData.auditReference ? formData.auditReference.split(',') : [];

    const handleSaveTag = (tag: TagItem) => {
        if (editingTag) {
            setTags(prev => prev.map(t => t.id === tag.id ? tag : t));
        } else {
            setTags(prev => [...prev, tag]);
        }
        setEditingTag(null);
        setShowTagModal(false);
    };

    const handleSaveAuditRef = (auditRef: AuditRef) => {
        if (editingAuditRef) {
            setAuditRefs(prev => prev.map(a => a.id === auditRef.id ? auditRef : a));
        } else {
            setAuditRefs(prev => [...prev, auditRef]);
        }
        setEditingAuditRef(null);
        setShowAuditModal(false);
    };

    const handleAddTag = () => {
        setEditingTag(null);
        setShowTagModal(true);
    };

    const handleEditTag = (tag: TagItem) => {
        setEditingTag(tag);
        setShowTagModal(true);
    };

    const handleAddAuditRef = () => {
        setEditingAuditRef(null);
        setShowAuditModal(true);
    };

    const handleEditAuditRef = (auditRef: AuditRef) => {
        setEditingAuditRef(auditRef);
        setShowAuditModal(true);
    };

    return (
        <>
            <TagModal
                isOpen={showTagModal}
                onClose={() => {
                    setShowTagModal(false);
                    setEditingTag(null);
                }}
                onSave={handleSaveTag}
                tag={editingTag}
            />

            <AuditRefModal
                isOpen={showAuditModal}
                onClose={() => {
                    setShowAuditModal(false);
                    setEditingAuditRef(null);
                }}
                onSave={handleSaveAuditRef}
                auditRef={editingAuditRef}
            />

            <div className="space-y-6">
                <div className="text-center mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-slate-900">Almost Done!</h3>
                    <p className="text-slate-600">Add optional details or create your asset now</p>
                </div>

                <MultiSelectDropdown
                    values={tagIds}
                    onChange={(values) => onFieldChange('tags', values)}
                    options={tags}
                    onAdd={handleAddTag}
                    onEdit={handleEditTag}
                    label="Tags"
                    icon={<Tag size={16} className="text-slate-400" />}
                    placeholder="Select tags to categorize this asset"
                    type="tag"
                />

                <MultiSelectDropdown
                    values={auditRefIds}
                    onChange={(values) => onFieldChange('auditReference', values.join(','))}
                    options={auditRefs}
                    onAdd={handleAddAuditRef}
                    onEdit={handleEditAuditRef}
                    label="Audit References"
                    icon={<FileText size={16} className="text-slate-400" />}
                    placeholder="Select relevant audit references"
                    type="audit"
                />

                <SmartField
                    label="Notes"
                    type="textarea"
                    value={formData.notes}
                    onChange={(value) => onFieldChange('notes', value)}
                    placeholder="Any additional notes or comments about this asset"
                />
            </div>
        </>
    );
};