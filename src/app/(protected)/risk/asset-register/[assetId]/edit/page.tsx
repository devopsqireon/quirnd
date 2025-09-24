'use client'

import React, { useState, useEffect, FormEvent, useMemo, useRef, useCallback } from 'react';
import { ArrowLeft, Plus, CheckCircle, Circle, Link as LinkIcon, Users, Shield, MapPin, Tag, Clock, AlertTriangle, FileText, Settings, X, ChevronDown, Save } from 'lucide-react';

// --- MOCKED TYPES & CONSTANTS ---
export type CiaValue = 0 | 1 | 2 | 3 | 4 | 5;
export const CIA_RATINGS: CiaValue[] = [0, 1, 2, 3, 4, 5];
export const CIA_RATING_LABELS: { [key in CiaValue]: string } = { 0: '0 - Not Applicable', 1: '1 - Very Low', 2: '2 - Low', 3: '3 - Moderate', 4: '4 - High', 5: '5 - Very High' };

// --- MOCK DATA FOR THE ASSET TO BE EDITED ---
const existingAsset = {
    assetId: 'ASSET-B7A2',
    name: 'Production Database Server',
    assetType: 'Hardware',
    description: 'Main server hosting the production PostgreSQL database. Contains all customer PII and transactional data.',
    owner: 'Priya Singh',
    custodian: 'IT Infrastructure Team',
    department: 'Engineering',
    stakeholders: ['Security Team', 'Product Management', 'Legal'],
    classification: 'Confidential',
    confidentiality: 5 as CiaValue,
    integrity: 5 as CiaValue,
    availability: 5 as CiaValue,
    physicalLocation: 'AWS ap-south-1 (Mumbai)',
    hostingType: 'Cloud',
    vendor: 'Amazon Web Services',
    technicalReference: 'Instance ID: i-0123456789abcdef0',
    acquisitionDate: '2023-01-15',
    expectedLifetime: '5 years',
    status: 'Active',
    decommissioningPlan: 'Data to be archived to S3 Glacier, instance to be terminated.',
    linkedProcesses: 'Customer Order Processing, Billing Cycle',
    linkedSystems: 'API Gateway (API-001), Web Application Server (AS-003)',
    thirdPartyDependencies: 'Stripe API for payment processing',
    regulatoryRelevance: ['GDPR', 'PCI DSS'],
    knownVulnerabilities: ['Risk of hardware failure.', 'SQL Injection Vulnerability (CVE-2023-1234)'],
    riskNotes: 'Regular patching schedule is in place. Access is restricted via IAM roles.',
    complianceItems: [
      { id: 'confidentialData', label: 'Confidential Data Involved?', checked: true },
      { id: 'pii', label: 'PII Involved?', checked: true },
      { id: 'pci', label: 'PCI Data Involved?', checked: true },
    ],
    auditReference: 'AUDIT-2024-Q3-DB',
    approvalStatus: 'Approved',
    tags: ['database', 'production', 'customer-data', 'critical'],
    notes: 'Increased monitoring was enabled on 2024-08-20 due to recent high traffic.',
};

export interface Asset {
  name: string; assetType: string; assetId: string; description: string;
  owner: string; custodian: string; department: string; stakeholders: string[];
  classification: string; confidentiality: CiaValue; integrity: CiaValue; availability: CiaValue;
  physicalLocation: string; hostingType: string; vendor: string; technicalReference: string;
  acquisitionDate: string; expectedLifetime: string; status: string; decommissioningPlan: string;
  linkedProcesses: string; linkedSystems: string; thirdPartyDependencies: string; regulatoryRelevance: string[];
  knownVulnerabilities: string[]; riskNotes: string;
  complianceItems: { id: string; label: string; checked: boolean }[];
  auditReference: string; approvalStatus: string;
  tags: string[]; notes: string;
}

// --- MOCKED DATA FOR OPTIONS ---
const INITIAL_ASSET_TYPES = ['Information', 'Hardware', 'Software', 'People', 'Services', 'Facilities', 'Intangible'];
const INITIAL_MOCK_USERS = ['Alice Johnson', 'Bob Williams', 'Charlie Brown', 'Diana Miller', 'Ethan Hunt', 'Priya Singh'];
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

// --- REUSABLE FORM COMPONENTS (Copied from addpage for consistency) ---
const Section = React.memo(({ id, title }: { id: string, title: string, children: React.ReactNode }) => (
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
        <input id={id} {...props} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-shadow duration-200 disabled:bg-gray-100" />
    </div>
));

const Select = React.memo(({ label, id, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, id: string }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
        <select id={id} {...props} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-shadow duration-200 bg-white">
            {children}
        </select>
    </div>
));

const SearchableSelect = React.memo(({ label, options, value, onChange, placeholder }: { label: string; options: string[]; value: string; onChange: (value: string) => void; placeholder?: string; }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() =>
        options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        ), [options, searchTerm]);

    const handleSelect = (option: string) => {
        onChange(option);
        setSearchTerm('');
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setIsOpen(false);
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
                        <div className="p-2"><input type="text" placeholder="Search..." className="w-full px-3 py-2 border border-gray-200 rounded-md" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
                        <ul>
                            {filteredOptions.map(option => <li key={option} onClick={() => handleSelect(option)} className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm">{option}</li>)}
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

 const Toggle = React.memo(({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) => (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <button type="button" onClick={() => onChange(!checked)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
));

// --- MAIN PAGE COMPONENT ---
const EditAssetPage = () => {
    const router = useRouter();
    const [assetData, setAssetData] = useState<Asset>(existingAsset);

    // --- UI CONTROL STATES ---
    const [activeSection, setActiveSection] = useState(0);

    const SECTIONS = [
        { id: "basic-info", title: "Basic Information" },
        { id: "ownership", title: "Ownership & Responsibility" },
        { id: "classification", title: "Classification & Sensitivity" },
        { id: "location", title: "Location & Technical Details" },
        { id: "lifecycle", title: "Lifecycle & Status" },
        { id: "dependencies", title: "Dependencies & Relationships" },
        { id: "risk-security", title: "Risk & Security Context" },
        { id: "compliance-audit", title: "Compliance & Audit" },
        { id: "optional", title: "Optional Fields" },
    ];
    
    const overallCriticality = useMemo(() => {
        const total = assetData.confidentiality + assetData.integrity + assetData.availability;
        if (total >= 12) return 'High';
        if (total >= 6) return 'Medium';
        return 'Low';
    }, [assetData.confidentiality, assetData.integrity, assetData.availability]);

    // --- STABILIZED ONCHANGE HANDLERS ---
    const handleFieldChange = useCallback((field: keyof Asset, value: any) => {
        setAssetData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleNumericFieldChange = useCallback((field: 'confidentiality' | 'integrity' | 'availability', value: string) => {
        setAssetData(prev => ({ ...prev, [field]: parseInt(value) as CiaValue }));
    }, []);

    const handleCommaSeparatedChange = useCallback((field: 'stakeholders' | 'tags', value: string) => {
        setAssetData(prev => ({ ...prev, [field]: value.split(',').map(s => s.trim()).filter(Boolean) }));
    }, []);
    
    const handleMultiSelectChange = useCallback((field: 'regulatoryRelevance' | 'knownVulnerabilities', value: string) => {
        setAssetData(prev => {
            const currentValues = prev[field] as string[];
            const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    }, []);

    const handleComplianceToggle = useCallback((id: string, checked: boolean) => {
        setAssetData(prev => ({...prev, complianceItems: prev.complianceItems.map(item => item.id === id ? {...item, checked} : item)}));
    }, []);
    
    const handleSave = useCallback((e: FormEvent) => {
        e.preventDefault();
        console.log('Updating Asset:', { ...assetData, overallCriticality });
        alert('Asset updated successfully! Check the console for the data.');
        router.push('/risk/asset-register/view'); // Navigate back to view page
    }, [assetData, overallCriticality, router]);
    
    const scrollToSection = (index: number) => {
        setActiveSection(index);
        document.getElementById(SECTIONS[index].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <main className="w-full max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8 font-sans bg-gray-50 min-h-screen">
                <div className="mb-8">
                    <button onClick={() => router.push('risk/asset-register/view')} className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to View Asset
                    </button>
                    <h1 className="text-4xl font-extrabold text-gray-800 mt-2">Edit Asset</h1>
                    <p className="text-gray-500 mt-1">Update the asset details below as per ISO 27001 standards.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <nav className="sticky top-8">
                            <ul className="space-y-2">
                                {SECTIONS.map((section, index) => (
                                    <li key={section.id}>
                                        <button onClick={() => scrollToSection(index)} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeSection === index ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600'}`}>
                                           {activeSection === index ? <Circle className="w-5 h-5 text-blue-600 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                                           <span className="font-semibold">{section.title}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    <form onSubmit={handleSave} className="lg:col-span-3 bg-white rounded-2xl shadow-lg divide-y divide-gray-200">
                        <Section id={SECTIONS[0].id} title={SECTIONS[0].title}>
                            <div className="px-8 pb-4 border-b border-gray-200">
                                <div className="grid md:grid-cols-2 gap-6 mb-4">
                                    <Input label="Asset Name*" id="name" value={assetData.name} onChange={e => handleFieldChange('name', e.target.value)} />
                                    <Select label="Asset Type/Category*" id="assetType" value={assetData.assetType} onChange={e => handleFieldChange('assetType', e.target.value)}>
                                        {INITIAL_ASSET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </Select>
                                    <Input label="Asset ID" id="assetId" value={assetData.assetId} disabled />
                                </div>
                                <Textarea label="Description" id="description" value={assetData.description} onChange={e => handleFieldChange('description', e.target.value)} rows={4} />
                            </div>
                        </Section>
                        
                        <Section id={SECTIONS[1].id} title={SECTIONS[1].title}>
                            <div className="px-8 pb-8 border-b border-gray-200">
                               <div className="grid md:grid-cols-2 gap-6">
                                    <SearchableSelect
                                        label="Asset Owner*"
                                        options={INITIAL_MOCK_USERS}
                                        value={assetData.owner}
                                        onChange={ownerName => handleFieldChange('owner', ownerName)}
                                        placeholder="Select an owner"
                                    />
                                    <Input label="Custodian" id="custodian" value={assetData.custodian} onChange={e => handleFieldChange('custodian', e.target.value)} />
                                    <Select label="Department" id="department" value={assetData.department} onChange={e => handleFieldChange('department', e.target.value)}>
                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </Select>
                                    <Input label="Stakeholders (comma-separated)" id="stakeholders" value={assetData.stakeholders.join(', ')} onChange={e => handleCommaSeparatedChange('stakeholders', e.target.value)} />
                               </div>
                            </div>
                        </Section>

                        <Section id={SECTIONS[2].id} title={SECTIONS[2].title}>
                            <div className="px-8 pb-8 border-b border-gray-200">
                                <Select label="Information Classification Level" id="classification" value={assetData.classification} onChange={e => handleFieldChange('classification', e.target.value)}>
                                    {CLASSIFICATIONS.map(c => <option key={c} value={c}>{c}</option>)}
                                </Select>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mb-4">
                                   <Select label="Confidentiality" id="confidentiality" value={assetData.confidentiality} onChange={e => handleNumericFieldChange('confidentiality', e.target.value)}>
                                        {CIA_RATINGS.map(r => <option key={r} value={r}>{CIA_RATING_LABELS[r]}</option>)}
                                    </Select>
                                    <Select label="Integrity" id="integrity" value={assetData.integrity} onChange={e => handleNumericFieldChange('integrity', e.target.value)}>
                                        {CIA_RATINGS.map(r => <option key={r} value={r}>{CIA_RATING_LABELS[r]}</option>)}
                                    </Select>
                                    <Select label="Availability" id="availability" value={assetData.availability} onChange={e => handleNumericFieldChange('availability', e.target.value)}>
                                        {CIA_RATINGS.map(r => <option key={r} value={r}>{CIA_RATING_LABELS[r]}</option>)}
                                    </Select>
                                </div>
                                <div className="p-1 rounded-lg flex items-center">
                                    <span className="font-semibold text-gray-700 mr-3">Overall Criticality:</span>
                                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${overallCriticality === 'High' ? 'bg-red-100 text-red-800' : overallCriticality === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{overallCriticality}</span>
                                </div>
                            </div>
                        </Section>

                        <Section id={SECTIONS[3].id} title={SECTIONS[3].title}>
                            <div className="px-8 pb-8 border-b border-gray-200">
                                 <div className="grid md:grid-cols-2 gap-6">
                                    <Input label="Physical Location" id="physicalLocation" value={assetData.physicalLocation} onChange={e => handleFieldChange('physicalLocation', e.target.value)} />
                                    <Select label="Hosting Type" id="hostingType" value={assetData.hostingType} onChange={e => handleFieldChange('hostingType', e.target.value)}>
                                         {HOSTING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </Select>
                                    <Input label="Vendor / Provider" id="vendor" value={assetData.vendor} onChange={e => handleFieldChange('vendor', e.target.value)} />
                                    <Input label="Technical Reference" id="technicalReference" value={assetData.technicalReference} onChange={e => handleFieldChange('technicalReference', e.target.value)} />
                                </div>
                            </div>
                        </Section>
                        
                        <Section id={SECTIONS[4].id} title={SECTIONS[4].title}>
                            <div className="px-8 pb-8 border-b border-gray-200">
                                <div className="grid grid-cols-2 gap-6 mb-4">
                                    <Input label="Acquisition Date" id="acquisitionDate" type="date" value={assetData.acquisitionDate} onChange={e => handleFieldChange('acquisitionDate', e.target.value)} />
                                    <Input label="Expected Lifetime / Expiry" id="expectedLifetime" value={assetData.expectedLifetime} onChange={e => handleFieldChange('expectedLifetime', e.target.value)} />
                                </div>
                                 <Select label="Current Status" id="status" value={assetData.status} onChange={e => handleFieldChange('status', e.target.value)}>
                                    {LIFECYCLE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </Select>
                                <div className='pt-4'>
                                    <Textarea label="Decommissioning Plan" id="decommissioningPlan" value={assetData.decommissioningPlan} onChange={e => handleFieldChange('decommissioningPlan', e.target.value)} rows={2} />
                                </div>
                            </div>
                        </Section>

                        <Section id={SECTIONS[5].id} title={SECTIONS[5].title}>
                            <div className="px-8 pb-8 border-b border-gray-200">
                               <div className="grid md:grid-cols-2 gap-6 mb-4">
                                    <Input label="Linked Processes" id="linkedProcesses" value={assetData.linkedProcesses} onChange={e => handleFieldChange('linkedProcesses', e.target.value)} />
                                    <Input label="Linked Systems" id="linkedSystems" value={assetData.linkedSystems} onChange={e => handleFieldChange('linkedSystems', e.target.value)} />
                                    <Input label="Third-Party Dependencies" id="thirdPartyDependencies" value={assetData.thirdPartyDependencies} onChange={e => handleFieldChange('thirdPartyDependencies', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Regulatory/Compliance Relevance</label>
                                    <div className="space-y-2 mt-2">
                                        {INITIAL_REGULATORY_TAGS.map(tag => (
                                            <label key={tag} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                                <input type="checkbox" checked={assetData.regulatoryRelevance.includes(tag)} onChange={() => handleMultiSelectChange('regulatoryRelevance', tag)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                {tag}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>
                        
                        <Section id={SECTIONS[6].id} title={SECTIONS[6].title}>
                            <div className="px-8 pb-8 border-b border-gray-200">
                                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                                     <label className="block text-sm font-medium text-gray-600 mb-1.5">Known Threats / Vulnerabilities</label>
                                     <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-2 mb-4">
                                        {(INITIAL_RISKS_DATA[assetData.assetType] || []).map(risk => (
                                            <label key={risk} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                                <input type="checkbox" checked={assetData.knownVulnerabilities.includes(risk)} onChange={() => handleMultiSelectChange('knownVulnerabilities', risk)} className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"/>
                                                <span className="text-gray-600 text-sm">{risk}</span>
                                            </label>
                                        ))}
                                    </div>
                                 </div>
                                 <Textarea label="Risk Notes" id="riskNotes" value={assetData.riskNotes} onChange={e => handleFieldChange('riskNotes', e.target.value)} rows={3} />
                           </div>
                        </Section>

                         <Section id={SECTIONS[7].id} title={SECTIONS[7].title}>
                             <div className="px-8 pb-8 border-b border-gray-200">
                               <div className="space-y-3 bg-gray-50 p-4 mb-4 rounded-lg">
                                    {assetData.complianceItems.map(item => (
                                        <Toggle key={item.id} label={item.label} checked={item.checked} onChange={c => handleComplianceToggle(item.id, c)} />
                                    ))}
                               </div>
                               <Input label="Audit Reference ID" id="auditReference" value={assetData.auditReference} onChange={e => handleFieldChange('auditReference', e.target.value)} />
                            </div>
                        </Section>

                        <Section id={SECTIONS[8].id} title={SECTIONS[8].title}>
                            <div className="px-8 pb-8">
                                <div className='mb-4'>
                                <Input label="Tags / Keywords (comma-separated)" id="tags" value={assetData.tags.join(', ')} onChange={e => handleCommaSeparatedChange('tags', e.target.value)} />
                                </div>
                                <Textarea label="Notes / Comments" id="notes" value={assetData.notes} onChange={e => handleFieldChange('notes', e.target.value)} rows={4} />
                            </div>
                        </Section>

                        <div id="form-actions" className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
                            <Select label="" id="approvalStatus" value={assetData.approvalStatus} onChange={e => handleFieldChange('approvalStatus', e.target.value)} className="w-full sm:w-auto bg-gray-100">
                                {APPROVAL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </Select>
                            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default EditAssetPage;
