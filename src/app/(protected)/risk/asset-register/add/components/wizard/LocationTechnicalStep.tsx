// File: /app/risk/asset-register/add/components/wizard/LocationTechnicalStep.tsx (UPDATED)
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Building, MapPin, ChevronDown, Plus, Edit3, X } from 'lucide-react';
import { SmartField } from '../shared/SmartField';

interface Location {
    id: string;
    name: string;
    address?: string;
    type?: string;
    description?: string;
}

interface Vendor {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    category?: string;
    contactPerson?: string;
}

interface LocationTechnicalStepProps {
    formData: {
        physicalLocation: string;
        hostingType: string;
        vendor: string;
        technicalReference: string;
    };
    onFieldChange: (field: string, value: any) => void;
}

// Mock data for locations and vendors
const INITIAL_LOCATIONS: Location[] = [
    { id: '1', name: 'Data Center A - Rack 15', address: '123 Tech Street, Building A', type: 'Data Center', description: 'Primary data center facility' },
    { id: '2', name: 'Office Building - Floor 3', address: '456 Business Ave, Floor 3', type: 'Office', description: 'Main office building' },
    { id: '3', name: 'Cloud - AWS US-East-1', address: 'AWS Virginia Region', type: 'Cloud', description: 'Amazon Web Services cloud region' },
    { id: '4', name: 'Data Center B - Rack 7', address: '789 Server Lane, Building B', type: 'Data Center', description: 'Secondary data center' },
    { id: '5', name: 'Remote Office - London', address: 'London Office, UK', type: 'Office', description: 'European office location' },
    { id: '6', name: 'Cloud - Azure West-US', address: 'Azure California Region', type: 'Cloud', description: 'Microsoft Azure cloud region' },
];

const INITIAL_VENDORS: Vendor[] = [
    { id: '1', name: 'Microsoft Corporation', email: 'support@microsoft.com', category: 'Software', contactPerson: 'John Smith' },
    { id: '2', name: 'Amazon Web Services', email: 'support@aws.amazon.com', category: 'Cloud Services', contactPerson: 'Sarah Johnson' },
    { id: '3', name: 'Dell Technologies', email: 'support@dell.com', category: 'Hardware', contactPerson: 'Mike Wilson' },
    { id: '4', name: 'Cisco Systems', email: 'support@cisco.com', category: 'Networking', contactPerson: 'Lisa Chen' },
    { id: '5', name: 'VMware Inc.', email: 'support@vmware.com', category: 'Virtualization', contactPerson: 'David Brown' },
    { id: '6', name: 'Oracle Corporation', email: 'support@oracle.com', category: 'Database', contactPerson: 'Emma Davis' },
];

// Location Modal Component
const LocationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (location: Location) => void;
    location?: Location | null;
}> = ({ isOpen, onClose, onSave, location }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        type: '',
        description: ''
    });

    const LOCATION_TYPES = ['Data Center', 'Office', 'Cloud', 'Warehouse', 'Remote', 'Co-location', 'Other'];

    useEffect(() => {
        if (location) {
            setFormData({
                name: location.name || '',
                address: location.address || '',
                type: location.type || '',
                description: location.description || ''
            });
        } else {
            setFormData({
                name: '',
                address: '',
                type: '',
                description: ''
            });
        }
    }, [location, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: location?.id || Date.now().toString(),
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
                        {location ? 'Edit Location' : 'Add New Location'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Location Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="e.g., Data Center A - Rack 15"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Address/Description</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Physical address or location details"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Location Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select type</option>
                            {LOCATION_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            rows={2}
                            placeholder="Additional location details"
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
                            {location ? 'Update' : 'Add'} Location
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Vendor Modal Component
const VendorModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (vendor: Vendor) => void;
    vendor?: Vendor | null;
}> = ({ isOpen, onClose, onSave, vendor }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        contactPerson: ''
    });

    const VENDOR_CATEGORIES = ['Software', 'Hardware', 'Cloud Services', 'Networking', 'Security', 'Database', 'Virtualization', 'Other'];

    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || '',
                email: vendor.email || '',
                phone: vendor.phone || '',
                category: vendor.category || '',
                contactPerson: vendor.contactPerson || ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                category: '',
                contactPerson: ''
            });
        }
    }, [vendor, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: vendor?.id || Date.now().toString(),
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
                        {vendor ? 'Edit Vendor' : 'Add New Vendor'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Vendor Name *</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter vendor/company name"
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
                            placeholder="vendor@company.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="+1 (555) 123-4567"
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
                            {VENDOR_CATEGORIES.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Contact Person</label>
                        <input
                            type="text"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Primary contact name"
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
                            {vendor ? 'Update' : 'Add'} Vendor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Multi-Select Component
const MultiSelectDropdown: React.FC<{
    values: string[];
    onChange: (values: string[]) => void;
    options: (Location | Vendor)[];
    onAdd: () => void;
    onEdit: (item: Location | Vendor) => void;
    label: string;
    icon: React.ReactNode;
    placeholder: string;
    type: 'location' | 'vendor';
}> = ({ values, onChange, options, onAdd, onEdit, label, icon, placeholder, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (type === 'location' && (option as Location).address?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (type === 'vendor' && (option as Vendor).email?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const selectedOptions = options.filter(option => values.includes(option.id));

    const handleToggle = (option: Location | Vendor) => {
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
                            className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                        >
                            {option.name.length > 25 ? `${option.name.substring(0, 25)}...` : option.name}
                            <button
                                type="button"
                                onClick={() => removeSelected(option.id)}
                                className="text-green-600 hover:text-green-800"
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
                                Add New {type === 'location' ? 'Location' : 'Vendor'}
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
                                                className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-900">{option.name}</div>
                                                {type === 'location' && (option as Location).address && (
                                                    <div className="text-xs text-slate-500">{(option as Location).address}</div>
                                                )}
                                                {type === 'vendor' && (option as Vendor).email && (
                                                    <div className="text-xs text-slate-500">{(option as Vendor).email}</div>
                                                )}
                                                {type === 'location' && (option as Location).type && (
                                                    <div className="text-xs text-slate-500">Type: {(option as Location).type}</div>
                                                )}
                                                {type === 'vendor' && (option as Vendor).category && (
                                                    <div className="text-xs text-slate-500">Category: {(option as Vendor).category}</div>
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

export const LocationTechnicalStep: React.FC<LocationTechnicalStepProps> = ({
    formData,
    onFieldChange
}) => {
    const [locations, setLocations] = useState<Location[]>(INITIAL_LOCATIONS);
    const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showVendorModal, setShowVendorModal] = useState(false);
    const [editingLocation, setEditingLocation] = useState<Location | null>(null);
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

    const HOSTING_TYPES = ['On-premise', 'Cloud', 'Hybrid', 'Co-location', 'Remote'];

    // Convert single values to arrays for multi-select compatibility
    const physicalLocationArray = formData.physicalLocation ? formData.physicalLocation.split(',') : [];
    const vendorArray = formData.vendor ? formData.vendor.split(',') : [];

    const handleSaveLocation = (location: Location) => {
        if (editingLocation) {
            setLocations(prev => prev.map(l => l.id === location.id ? location : l));
        } else {
            setLocations(prev => [...prev, location]);
        }
        setEditingLocation(null);
        setShowLocationModal(false);
    };

    const handleSaveVendor = (vendor: Vendor) => {
        if (editingVendor) {
            setVendors(prev => prev.map(v => v.id === vendor.id ? vendor : v));
        } else {
            setVendors(prev => [...prev, vendor]);
        }
        setEditingVendor(null);
        setShowVendorModal(false);
    };

    const handleAddLocation = () => {
        setEditingLocation(null);
        setShowLocationModal(true);
    };

    const handleEditLocation = (location: Location) => {
        setEditingLocation(location);
        setShowLocationModal(true);
    };

    const handleAddVendor = () => {
        setEditingVendor(null);
        setShowVendorModal(true);
    };

    const handleEditVendor = (vendor: Vendor) => {
        setEditingVendor(vendor);
        setShowVendorModal(true);
    };

    return (
        <>
            <LocationModal
                isOpen={showLocationModal}
                onClose={() => {
                    setShowLocationModal(false);
                    setEditingLocation(null);
                }}
                onSave={handleSaveLocation}
                location={editingLocation}
            />

            <VendorModal
                isOpen={showVendorModal}
                onClose={() => {
                    setShowVendorModal(false);
                    setEditingVendor(null);
                }}
                onSave={handleSaveVendor}
                vendor={editingVendor}
            />

            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <MultiSelectDropdown
                        values={physicalLocationArray}
                        onChange={(values) => onFieldChange('physicalLocation', values.join(','))}
                        options={locations}
                        onAdd={handleAddLocation}
                        onEdit={handleEditLocation}
                        label="Physical Location(s)"
                        icon={<MapPin size={16} className="text-slate-400" />}
                        placeholder="Select physical locations"
                        type="location"
                    />

                    <SmartField
                        label="Hosting Type"
                        type="select"
                        value={formData.hostingType}
                        onChange={(value) => onFieldChange('hostingType', value)}
                        options={HOSTING_TYPES}
                    />

                    <MultiSelectDropdown
                        values={vendorArray}
                        onChange={(values) => onFieldChange('vendor', values.join(','))}
                        options={vendors}
                        onAdd={handleAddVendor}
                        onEdit={handleEditVendor}
                        label="Vendor/Provider(s)"
                        icon={<Building size={16} className="text-slate-400" />}
                        placeholder="Select vendors/providers"
                        type="vendor"
                    />

                    <SmartField
                        label="Technical Reference"
                        type="text"
                        value={formData.technicalReference}
                        onChange={(value) => onFieldChange('technicalReference', value)}
                        placeholder="Configuration details, version info"
                    />
                </div>
            </div>
        </>
    );
};