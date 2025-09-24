/* eslint-disable react/display-name */
'use client'

import React, { useState, useEffect, FormEvent, useMemo, useRef, useCallback } from 'react';
import { ArrowLeft, Plus, CheckCircle, Circle, Link as LinkIcon, Users, Shield, MapPin, Tag, Clock, AlertTriangle, FileText, Settings, X, ChevronDown } from 'lucide-react';

// --- MOCKED TYPES & CONSTANTS ---
export type CiaValue = 0 | 1 | 2 | 3 | 4 | 5;
export const CIA_RATINGS: CiaValue[] = [0, 1, 2, 3, 4, 5];
export const CIA_RATING_LABELS: { [key in CiaValue]: string } = { 0: '0 - Not Applicable', 1: '1 - Very Low', 2: '2 - Low', 3: '3 - Moderate', 4: '4 - High', 5: '5 - Very High' };


export interface Asset {
  // 1. Basic Info
  name: string;
  assetType: string;
  assetId: string;
  description: string;
  // 2. Ownership
  owner: string;
  custodian: string;
  department: string;
  stakeholders: string[];
  // 3. Classification
  classification: string;
  confidentiality: CiaValue;
  integrity: CiaValue;
  availability: CiaValue;
  // 4. Location
  physicalLocation: string;
  hostingType: string;
  vendor: string;
  technicalReference: string;
  // 5. Lifecycle
  acquisitionDate: string;
  expectedLifetime: string;
  status: string;
  decommissioningPlan: string;
  // 6. Dependencies
  linkedProcesses: string;
  linkedSystems: string;
  thirdPartyDependencies: string;
  regulatoryRelevance: string[];
  // 7. Risk
  knownVulnerabilities: string[];
  riskNotes: string;
  // 8. Compliance
  complianceItems: { id: string; label: string; checked: boolean }[];
  auditReference: string;
  // 9. Metadata
  approvalStatus: string;
  // 10. Optional
  tags: string[];
  notes: string;
}


// --- MOCKED DATA ---
const INITIAL_ASSET_TYPES = ['Information', 'Hardware', 'Software', 'People', 'Services', 'Facilities', 'Intangible'];
const INITIAL_MOCK_USERS = ['Alice Johnson', 'Bob Williams', 'Charlie Brown', 'Diana Miller', 'Ethan Hunt'];
const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance'];
const CLASSIFICATIONS = ['Public', 'Internal', 'Confidential', 'Restricted'];
const HOSTING_TYPES = ['On-premise', 'Cloud', 'Hybrid'];
const LIFECYCLE_STATUSES = ['Active', 'In Use', 'Retired', 'Archived', 'Disposed'];
const INITIAL_REGULATORY_TAGS = ['GDPR', 'HIPAA', 'PCI DSS', 'SOX'];
const APPROVAL_STATUSES = ['Draft', 'Under Review', 'Approved'];
const INITIAL_RISKS_DATA: { [key: string]: string[] } = {
    'Software': ['Risk of exploitation due to unpatched vulnerabilities.', 'Risk of license non-compliance.', 'Risk of data breaches through application flaws.'],
    'Hardware': ['Risk of physical theft or damage.', 'Risk of hardware failure.', 'Risk of unauthorized access to hardware.'],
    'Information': ['Risk of unauthorized data disclosure (data breach).', 'Risk of data loss or corruption.', 'Risk of non-compliance with data protection regulations.'],
    'People': ['Risk of insider threat (malicious or accidental).', 'Risk of social engineering attacks.', 'Risk of knowledge loss when employee leaves.'],
    'Services': ['Risk of service unavailability due to provider outage.', 'Risk of data breach from a third-party service.', 'Risk of vendor lock-in.'],
};


// --- HELPER HOOK ---
const useRouter = () => ({
    push: (path: string) => alert(`Navigating to: ${path}`),
});

// --- GENERIC MODAL COMPONENT ---
const AddItemModal = ({ isOpen, onClose, onSave, title, placeholder, itemLabel }: { isOpen: boolean; onClose: () => void; onSave: (name: string) => void; title: string; placeholder: string; itemLabel: string; }) => {
    const [name, setName] = useState('');
    if (!isOpen) return null;

    const handleSave = () => {
        if (name.trim()) {
            onSave(name.trim());
            setName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{itemLabel}</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeholder} />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="text-sm font-semibold text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold transition shadow-md">Save</button>
                </div>
            </div>
        </div>
    );
};

// --- REUSABLE FORM COMPONENTS (MEMOIZED) ---
const Section = React.memo(({ id, icon: Icon, title, children }: { id: string, icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <section id={id} className="space-y-6 pt-4">
        <div className="flex items-center px-8 pt-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        {children}
    </section>
));

const Input = React.memo(({ label, id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, id: string }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
        <input id={id} {...props} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-shadow duration-200" />
    </div>
));

const Select = React.memo(({ label, id, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, id: string, onAdd?: () => void }) => (
     <div>
        <div className="flex justify-between items-center mb-1.5">
            <label htmlFor={id} className="block text-sm font-medium text-gray-600">{label}</label>
            {props.onAdd && <button type="button" onClick={props.onAdd} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">+ Add New</button>}
        </div>
        <select id={id} {...props} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-shadow duration-200 bg-white">
            {children}
        </select>
    </div>
));

const ADD_NEW_OWNER_TEXT = "Add New Owner...";
const SearchableSelect = React.memo(({ label, options, value, onChange, onAdd, placeholder }: { label: string; options: string[]; value: string; onChange: (value: string) => void; onAdd?: () => void; placeholder?: string; }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() =>
        options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        ), [options, searchTerm]);

    const handleSelect = (option: string) => {
        if (option === ADD_NEW_OWNER_TEXT) {
            if (onAdd) onAdd();
            setIsOpen(false);
        } else {
            onChange(option);
            setSearchTerm('');
            setIsOpen(false);
        }
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
            <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
            <div className="relative">
                <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white flex justify-between items-center text-left">
                    <span className={value ? 'text-gray-900' : 'text-gray-500'}>{value || placeholder || 'Select an option'}</span>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-3 py-2 border border-gray-200 rounded-md"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <ul>
                            {filteredOptions.length > 0 ? filteredOptions.map(option => (
                                <li key={option} onClick={() => handleSelect(option)} className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm">
                                    {option}
                                </li>
                            )) : <li className="px-4 py-2 text-sm text-gray-500">No results found</li>}
                            {onAdd && (
                                <li onClick={() => handleSelect(ADD_NEW_OWNER_TEXT)} className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-blue-600 font-semibold border-t flex items-center gap-2">
                                  <Plus size={16} /> {ADD_NEW_OWNER_TEXT}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
});

const Textarea = React.memo(({ label, id, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string, id: string }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
        <textarea id={id} {...props} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-shadow duration-200" />
    </div>
));

 const Toggle = React.memo(({ label, checked, onChange, onDelete }: { label: string; checked: boolean; onChange: (checked: boolean) => void, onDelete?: () => void }) => (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="flex items-center gap-3">
            {onDelete && <button type="button" onClick={onDelete} className="text-gray-400 hover:text-red-500"><X size={16}/></button>}
            <button type="button" onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    </div>
));


// --- MAIN PAGE COMPONENT ---
const AddAssetPage = () => {
    const router = useRouter();
    const [newAsset, setNewAsset] = useState<Asset>({
        name: '', assetType: '', assetId: '', description: '',
        owner: '', custodian: '', department: '', stakeholders: [],
        classification: '', confidentiality: 0, integrity: 0, availability: 0,
        physicalLocation: '', hostingType: '', vendor: '', technicalReference: '',
        acquisitionDate: '', expectedLifetime: '', status: 'Active', decommissioningPlan: '',
        linkedProcesses: '', linkedSystems: '', thirdPartyDependencies: '', regulatoryRelevance: [],
        knownVulnerabilities: [], riskNotes: '',
        complianceItems: [
            { id: 'confidentialData', label: 'Confidential Data Involved?', checked: false },
            { id: 'pii', label: 'PII Involved?', checked: false },
        ],
        auditReference: '',
        approvalStatus: 'Draft',
        tags: [], notes: '',
    });

    // --- DYNAMIC DATA STATES ---
    const [assetTypes] = useState(INITIAL_ASSET_TYPES);
    const [owners, setOwners] = useState(INITIAL_MOCK_USERS);
    const [regulatoryTags, setRegulatoryTags] = useState(INITIAL_REGULATORY_TAGS);
    const [riskData] = useState(INITIAL_RISKS_DATA);
    
    // --- UI CONTROL STATES ---
    const [customRisk, setCustomRisk] = useState('');
    const [newRegulatoryTag, setNewRegulatoryTag] = useState('');
    const [newComplianceItem, setNewComplianceItem] = useState('');
    const [activeSection, setActiveSection] = useState(0);
    const [isOwnerModalOpen, setOwnerModalOpen] = useState(false);

    const SECTIONS = [
        { id: "basic-info", title: "Basic Information", icon: Tag },
        { id: "ownership", title: "Ownership & Responsibility", icon: Users },
        { id: "classification", title: "Classification & Sensitivity", icon: Shield },
        { id: "location", title: "Location & Technical Details", icon: MapPin },
        { id: "lifecycle", title: "Lifecycle & Status", icon: Clock },
        { id: "dependencies", title: "Dependencies & Relationships", icon: LinkIcon },
        { id: "risk-security", title: "Risk & Security Context", icon: AlertTriangle },
        { id: "compliance-audit", title: "Compliance & Audit", icon: FileText },
        { id: "optional", title: "Optional Fields", icon: Settings },
    ];

    useEffect(() => {
        setNewAsset(prev => ({ ...prev, assetId: `ASSET-${crypto.randomUUID().split('-')[0].toUpperCase()}` }));
    }, []);

    useEffect(() => {
        const suggested = riskData[newAsset.assetType] || [];
        setNewAsset(prev => ({ ...prev, knownVulnerabilities: suggested }));
    }, [newAsset.assetType, riskData]);

    const overallCriticality = useMemo(() => {
        const total = newAsset.confidentiality + newAsset.integrity + newAsset.availability;
        if (total >= 12) return 'High';
        if (total >= 6) return 'Medium';
        return 'Low';
    }, [newAsset.confidentiality, newAsset.integrity, newAsset.availability]);

    // --- STABILIZED ONCHANGE HANDLERS ---
    const handleFieldChange = useCallback((field: keyof Asset, value: any) => {
        setNewAsset(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleNumericFieldChange = useCallback((field: 'confidentiality' | 'integrity' | 'availability', value: string) => {
        setNewAsset(prev => ({ ...prev, [field]: parseInt(value) as CiaValue }));
    }, []);

    const handleCommaSeparatedChange = useCallback((field: 'stakeholders' | 'tags', value: string) => {
        setNewAsset(prev => ({ ...prev, [field]: value.split(',').map(s => s.trim()) }));
    }, []);

    const handleMultiSelectChange = useCallback((field: 'stakeholders' | 'regulatoryRelevance' | 'knownVulnerabilities', value: string) => {
        setNewAsset(prev => {
            const currentValues = prev[field] as string[];
            const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    }, []);
    
    const handleAddCustomRisk = useCallback(() => {
        const riskToAdd = customRisk.trim();
        if (!riskToAdd) return;
        if (!newAsset.knownVulnerabilities.includes(riskToAdd)) {
            setNewAsset(prev => ({...prev, knownVulnerabilities: [...prev.knownVulnerabilities, riskToAdd]}));
        }
        setCustomRisk('');
    }, [customRisk, newAsset.knownVulnerabilities]);

    const handleSave = useCallback((e: FormEvent) => {
        e.preventDefault();
        if (!newAsset.name || !newAsset.assetType || !newAsset.owner) {
            alert('Please fill in all required fields: Asset Name, Asset Type, and Asset Owner.');
            return;
        }
        console.log('Saving Asset:', { ...newAsset, overallCriticality });
        alert('Asset saved successfully! Check the console for the data.');
        router.push('/risk/asset-register');
    }, [newAsset, overallCriticality, router]);
    
    const scrollToSection = (index: number) => {
        setActiveSection(index);
        document.getElementById(SECTIONS[index].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // --- DYNAMIC LIST HANDLERS (STABILIZED) ---
    const handleAddOwner = useCallback((name: string) => { 
        if (!owners.includes(name)) setOwners(prev => [...prev, name]); 
        setNewAsset(p=>({...p, owner: name}));
    }, [owners]);
    
    const handleDeleteOwner = useCallback((ownerToDelete: string) => {
        if (INITIAL_MOCK_USERS.includes(ownerToDelete)) return;
        setOwners(prev => prev.filter(o => o !== ownerToDelete));
        if (newAsset.owner === ownerToDelete) {
            setNewAsset(p => ({ ...p, owner: '' }));
        }
    }, [newAsset.owner]);

    const handleAddRegulatoryTag = useCallback(() => {
        const tagToAdd = newRegulatoryTag.trim();
        if (tagToAdd && !regulatoryTags.includes(tagToAdd)) {
            setRegulatoryTags(prev => [...prev, tagToAdd]);
            if (!newAsset.regulatoryRelevance.includes(tagToAdd)) {
                setNewAsset(prev => ({ ...prev, regulatoryRelevance: [...prev.regulatoryRelevance, tagToAdd] }));
            }
        }
        setNewRegulatoryTag('');
    }, [newRegulatoryTag, regulatoryTags, newAsset.regulatoryRelevance]);
    
    const handleDeleteRegulatoryTag = useCallback((tagToDelete: string) => {
        setRegulatoryTags(prev => prev.filter(tag => tag !== tagToDelete));
        setNewAsset(prev => ({ ...prev, regulatoryRelevance: prev.regulatoryRelevance.filter(tag => tag !== tagToDelete) }));
    }, []);

    const handleAddComplianceItem = useCallback(() => {
        const label = newComplianceItem.trim();
        if(label && !newAsset.complianceItems.find(item => item.label === label)) {
            const id = label.toLowerCase().replace(/\s/g, '-');
            setNewAsset(prev => ({ ...prev, complianceItems: [...prev.complianceItems, {id, label, checked: false}] }));
        }
        setNewComplianceItem('');
    }, [newComplianceItem, newAsset.complianceItems]);

    const handleDeleteComplianceItem = useCallback((id: string) => {
        setNewAsset(prev => ({ ...prev, complianceItems: prev.complianceItems.filter(item => item.id !== id) }));
    }, []);

    const handleComplianceToggle = useCallback((id: string, checked: boolean) => {
        setNewAsset(prev => ({...prev, complianceItems: prev.complianceItems.map(item => item.id === id ? {...item, checked} : item)}));
    }, []);

    return (
        <>
            <AddItemModal isOpen={isOwnerModalOpen} onClose={() => setOwnerModalOpen(false)} onSave={handleAddOwner} title="Add New Asset Owner" itemLabel="Owner Full Name" placeholder="e.g., John Doe"/>

            <main className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8 font-sans bg-gray-50 min-h-screen">
                <div className="mb-8">
                    <button onClick={() => router.push('risk/asset-register')} className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to Asset Register
                    </button>
                    <h1 className="text-4xl font-extrabold text-gray-800 mt-2">Register New Asset</h1>
                    <p className="text-gray-500 mt-1">Complete the form below to ensure compliance with ISO 27001 standards.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <nav className="sticky top-8">
                            <ul className="space-y-2">
                                {SECTIONS.map((section, index) => (
                                    <li key={section.id}>
                                        <button onClick={() => scrollToSection(index)} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeSection === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600'}`}>
                                           {activeSection > index ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /> : <Circle className={`w-5 h-5 flex-shrink-0 ${activeSection === index ? 'text-blue-600' : 'text-gray-300'}`} />}
                                           <span className="font-semibold">{section.title}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    <form onSubmit={handleSave} className="lg:col-span-3 bg-white rounded-2xl shadow-lg divide-y divide-gray-200">
                        <Section id={SECTIONS[0].id} icon={SECTIONS[0].icon} title={SECTIONS[0].title}>
                        <div className="px-8 pb-4 border-b border-gray-200">
                            <div className="grid md:grid-cols-2 gap-6 mb-4">
                                <Input label="Asset Name*" id="name" value={newAsset.name} onChange={e => handleFieldChange('name', e.target.value)} />
                                <div>
                                    <Select label="Asset Type/Category*" id="assetType" value={newAsset.assetType} onChange={e => handleFieldChange('assetType', e.target.value)}>
                                        <option value="">Select a type</option>
                                        {assetTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                    </Select>
                                </div>
                                <Input label="Asset ID / Reference Code" id="assetId" value={newAsset.assetId} readOnly className="bg-gray-100" />
                            </div>
                            <Textarea label="Description" id="description" value={newAsset.description} onChange={e => handleFieldChange('description', e.target.value)} rows={4} />
                        </div>
                        </Section>
                        
                        <Section id={SECTIONS[1].id} icon={SECTIONS[1].icon} title={SECTIONS[1].title}>
                        <div className="px-8 pb-8 border-b border-gray-200">
                           <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <SearchableSelect
                                        label="Asset Owner*"
                                        options={owners}
                                        value={newAsset.owner}
                                        onChange={ownerName => handleFieldChange('owner', ownerName)}
                                        onAdd={() => setOwnerModalOpen(true)}
                                        placeholder="Select an owner"
                                    />
                                    <div className="mt-2 space-y-1">
                                        {owners.filter(o => !INITIAL_MOCK_USERS.includes(o)).map(o => (
                                            <div key={o} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                                <span className="text-sm text-gray-700">{o}</span>
                                                <button type="button" onClick={() => handleDeleteOwner(o)} className="text-gray-400 hover:text-red-500">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Input label="Custodian / Responsible Person" id="custodian" value={newAsset.custodian} onChange={e => handleFieldChange('custodian', e.target.value)} />
                                <Select label="Department / Business Unit" id="department" value={newAsset.department} onChange={e => handleFieldChange('department', e.target.value)}>
                                    <option value="">Select a department</option>
                                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                </Select>
                                <Input label="Stakeholders (optional, comma-separated)" id="stakeholders" value={newAsset.stakeholders.join(', ')} onChange={e => handleCommaSeparatedChange('stakeholders', e.target.value)} />
                           </div>
                           </div>
                        </Section>

                        <Section id={SECTIONS[2].id} icon={SECTIONS[2].icon} title={SECTIONS[2].title}>
                        <div className="px-8 pb-8 border-b border-gray-200">
                            <Select label="Information Classification Level" id="classification" value={newAsset.classification} onChange={e => handleFieldChange('classification', e.target.value)}>
                                <option value="">Select a level</option>
                                {CLASSIFICATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                            </Select>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mb-4">
                               <Select label="Confidentiality" id="confidentiality" value={newAsset.confidentiality} onChange={e => handleNumericFieldChange('confidentiality', e.target.value)}>
                                    {CIA_RATINGS.map(r => <option key={r} value={r}>{CIA_RATING_LABELS[r]}</option>)}
                                </Select>
                                <Select label="Integrity" id="integrity" value={newAsset.integrity} onChange={e => handleNumericFieldChange('integrity', e.target.value)}>
                                    {CIA_RATINGS.map(r => <option key={r} value={r}>{CIA_RATING_LABELS[r]}</option>)}
                                </Select>
                                <Select label="Availability" id="availability" value={newAsset.availability} onChange={e => handleNumericFieldChange('availability', e.target.value)}>
                                    {CIA_RATINGS.map(r => <option key={r} value={r}>{CIA_RATING_LABELS[r]}</option>)}
                                </Select>
                            </div>
                            <div className="p-1 rounded-lg flex items-center">
                                <span className="font-semibold text-gray-700 mr-3">Overall Criticality:</span>
                                <span className={`px-3 py-1 text-sm font-bold rounded-full ${overallCriticality === 'High' ? 'bg-red-100 text-red-800' : overallCriticality === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{overallCriticality}</span>
                            </div>
                            </div>
                        </Section>

                        <Section id={SECTIONS[3].id} icon={SECTIONS[3].icon} title={SECTIONS[3].title}>
                        <div className="px-8 pb-8 border-b border-gray-200">
                             <div className="grid md:grid-cols-2 gap-6">
                                <Input label="Physical Location" id="physicalLocation" value={newAsset.physicalLocation} onChange={e => handleFieldChange('physicalLocation', e.target.value)} />
                                <Select label="Hosting Type" id="hostingType" value={newAsset.hostingType} onChange={e => handleFieldChange('hostingType', e.target.value)}>
                                     <option value="">Select hosting type</option>
                                     {HOSTING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </Select>
                                <Input label="Vendor / Provider" id="vendor" value={newAsset.vendor} onChange={e => handleFieldChange('vendor', e.target.value)} />
                                <Input label="Configuration / Technical Reference" id="technicalReference" value={newAsset.technicalReference} onChange={e => handleFieldChange('technicalReference', e.target.value)} />
                            </div>
                            </div>
                        </Section>
                        
                        <Section id={SECTIONS[4].id} icon={SECTIONS[4].icon} title={SECTIONS[4].title}>
                        <div className="px-8 pb-8 border-b border-gray-200">
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <Input label="Acquisition Date" id="acquisitionDate" type="date" value={newAsset.acquisitionDate} onChange={e => handleFieldChange('acquisitionDate', e.target.value)} />
                                <Input label="Expected Lifetime / Expiry" id="expectedLifetime" value={newAsset.expectedLifetime} onChange={e => handleFieldChange('expectedLifetime', e.target.value)} />
                            </div>
                             <Select label="Current Status" id="status" value={newAsset.status} onChange={e => handleFieldChange('status', e.target.value)}>
                                {LIFECYCLE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </Select>
                                  <div className='pt-4'>
                                                         <Textarea label="Decommissioning Plan" id="decommissioningPlan" value={newAsset.decommissioningPlan} onChange={e => handleFieldChange('decommissioningPlan', e.target.value)} rows={2} />
                                </div></div>
                        </Section>

                        <Section id={SECTIONS[5].id} icon={SECTIONS[5].icon} title={SECTIONS[5].title}>
                        <div className="px-8 pb-8 border-b border-gray-200">
                           <div className="grid md:grid-cols-2 gap-6 mb-4">
                                <Input label="Linked Processes" id="linkedProcesses" value={newAsset.linkedProcesses} onChange={e => handleFieldChange('linkedProcesses', e.target.value)} />
                                <Input label="Linked Systems / Other Assets" id="linkedSystems" value={newAsset.linkedSystems} onChange={e => handleFieldChange('linkedSystems', e.target.value)} />
                                <Input label="Third-Party Dependencies" id="thirdPartyDependencies" value={newAsset.thirdPartyDependencies} onChange={e => handleFieldChange('thirdPartyDependencies', e.target.value)} />
                       
                            </div>
                            <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Regulatory/Compliance Relevance</label>
                                    <div className="space-y-2 mt-2">
                                        {regulatoryTags.map(tag => (
                                            <div key={tag} className="flex items-center justify-between">
                                                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                                    <input type="checkbox" checked={newAsset.regulatoryRelevance.includes(tag)} onChange={() => handleMultiSelectChange('regulatoryRelevance', tag)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                    {tag}
                                                </label>
                                                 {!INITIAL_REGULATORY_TAGS.includes(tag) && <button type="button" onClick={() => handleDeleteRegulatoryTag(tag)} className="text-gray-400 hover:text-red-500"><X size={16}/></button>}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <input type="text" value={newRegulatoryTag} onChange={e => setNewRegulatoryTag(e.target.value)} placeholder="Add new tag..." className="flex-grow px-3 py-1.5 text-sm border border-gray-300 rounded-md"/>
                                        <button type="button" onClick={handleAddRegulatoryTag} className="p-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"><Plus size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </Section>
                        
                        <Section id={SECTIONS[6].id} icon={SECTIONS[6].icon} title={SECTIONS[6].title}>
                        <div className="px-8 pb-8 border-b border-gray-200">
                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                                 <label className="block text-sm font-medium text-gray-600 mb-1.5">Known Threats / Vulnerabilities</label>
                                 <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-2 mb-4">
                                    {(riskData[newAsset.assetType] || []).length > 0 ? (
                                        (riskData[newAsset.assetType] || []).map(risk => (
                                        <label key={risk} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                            <input type="checkbox" checked={newAsset.knownVulnerabilities.includes(risk)} onChange={() => handleMultiSelectChange('knownVulnerabilities', risk)} className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"/>
                                            <span className="text-gray-600 text-sm">{risk}</span>
                                        </label>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 italic p-2">Select an asset type to see suggestions.</p>
                                    )}
                                </div>
                                 <div className="mt-4">
                                    <div className="flex gap-2">
                                        <input type="text" value={customRisk} onChange={e => setCustomRisk(e.target.value)} className="flex-grow px-4 py-2 border border-gray-300 rounded-lg" placeholder="Add a custom risk..."/>
                                        <button type="button" onClick={handleAddCustomRisk} className="flex-shrink-0 w-10 h-10 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 flex items-center justify-center">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                             </div>
                             <Textarea label="Risk Notes" id="riskNotes" value={newAsset.riskNotes} onChange={e => handleFieldChange('riskNotes', e.target.value)} rows={3} />
                       </div>
                        </Section>

                         <Section id={SECTIONS[7].id} icon={SECTIONS[7].icon} title={SECTIONS[7].title}>
                         <div className="px-8 pb-8 border-b border-gray-200">
                           <div className="space-y-3 bg-gray-50 p-4 mb-4 rounded-lg">
                                {newAsset.complianceItems.map((item, index) => (
                                    <Toggle key={item.id} label={item.label} checked={item.checked} onChange={c => handleComplianceToggle(item.id, c)} onDelete={index > 1 ? () => handleDeleteComplianceItem(item.id) : undefined} />
                                ))}
                           </div>
                           <div className="flex gap-2 mb-4">
                               <input type="text" value={newComplianceItem} onChange={e => setNewComplianceItem(e.target.value)} placeholder="Add new compliance item..." className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"/>
                               <button type="button" onClick={handleAddComplianceItem} className="flex-shrink-0 w-10 h-10 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 flex items-center justify-center">
                                   <Plus size={18} />
                               </button>
                           </div>

                           <Input label="Audit Reference ID" id="auditReference" value={newAsset.auditReference} onChange={e => handleFieldChange('auditReference', e.target.value)} />
                        </div>
                        </Section>

                        <Section id={SECTIONS[8].id} icon={SECTIONS[8].icon} title={SECTIONS[8].title}>
                        <div className="px-8 pb-8">
                            <div className='mb-4'>
                            <Input label="Tags / Keywords (comma-separated)" id="tags" value={newAsset.tags.join(', ')} onChange={e => handleCommaSeparatedChange('tags', e.target.value)} />
                            </div>
                            <Textarea label="Notes / Comments" id="notes" value={newAsset.notes} onChange={e => handleFieldChange('notes', e.target.value)} rows={4} />
                        </div>
                        </Section>

                        <div id="form-actions" className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
                            <Select label="" id="approvalStatus" value={newAsset.approvalStatus} onChange={e => handleFieldChange('approvalStatus', e.target.value)} className="w-full sm:w-auto bg-gray-100">
                                {APPROVAL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </Select>
                            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg">
                                Save Asset
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default AddAssetPage;