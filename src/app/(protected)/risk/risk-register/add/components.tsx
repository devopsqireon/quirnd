// Save as: /app/risk/risk-register/add/components.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Asset } from '@/types/asset';
import { MOCK_USERS } from '@/constants/assets';
import { RISK_CATEGORIES, THREAT_SOURCES, LIKELIHOOD_SCALE, IMPACT_SCALE, CONTROL_EFFECTIVENESS_SCALE, REVIEW_FREQUENCIES, ESCALATION_LEVELS, RISK_STATUSES } from '@/constants/risk-form-options';
import { Plus, Paperclip, Info, ShieldCheck, BarChart2, Zap, Target, FileText, Clock, Settings, CheckCircle, X, TrendingDown, Lightbulb, Loader2 } from 'lucide-react';

// --- QUICK ADD CONTROL MODAL ---
export const QuickAddControlModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (newControl: { id: string; description: string }) => void;
}> = ({ isOpen, onClose, onSave }) => {
    const [controlId, setControlId] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        if (!controlId.trim() || !description.trim()) {
            alert('Please fill out both Control ID and Description.');
            return;
        }
        onSave({ id: controlId.trim(), description: description.trim() });
        setControlId('');
        setDescription('');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Add New Control</h2>
                <div className="space-y-4">
                    <FormField label="Control ID (e.g., A.5.1)" required>
                        <input type="text" value={controlId} onChange={(e) => setControlId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                    </FormField>
                    <FormField label="Control Description" required>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded-md" />
                    </FormField>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="text-sm font-semibold text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Save Control</button>
                </div>
            </div>
        </div>
    );
};

// --- AI HELPER COMPONENT ---
const AiHelperPopover: React.FC<{ content: string }> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2 flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
                <Lightbulb size={14} />
            </button>
            {isOpen && (
                <div className="absolute z-20 w-72 p-3 bg-slate-800 text-white text-sm rounded-lg shadow-lg -top-2 left-8 transform">
                    <p className="font-semibold mb-1 text-blue-300">Qiro AI Assist</p>
                    <p className="text-slate-200">{content}</p>
                </div>
            )}
        </div>
    );
};

// --- RISK CALCULATION LOGIC ---
export const calculateRiskProfile = (likelihood: number, impact: number) => {
    const score = likelihood * impact;
    let level = 'Low';
    let color = 'bg-green-100 text-green-800';

    if (score >= 20) {
        level = 'High';
        color = 'bg-red-100 text-red-800';
    } else if (score > 10) {
        level = 'Medium';
        color = 'bg-yellow-100 text-yellow-800';
    }
    return { score, level, color };
};

// --- VERTICAL STEPPER COMPONENT ---
export const VerticalStepper: React.FC<{ steps: { title: string }[]; activeStep: number }> = ({ steps, activeStep }) => {
    return (
        <div className="sticky top-24">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Details</h3>
            <nav aria-label="Progress">
                <ol role="list" className="space-y-4">
                    {steps.map((step, index) => {
                        const isCompleted = activeStep > index;
                        const isCurrent = activeStep === index;
                        return (
                            <li key={step.title} className="relative">
                                {index < steps.length - 1 && (
                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-slate-300" aria-hidden="true" />
                                )}
                                <a href={`#section-${index}`} className="group relative flex items-start">
                                    <span className="flex h-9 items-center">
                                        <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${isCompleted ? 'bg-blue-600' : isCurrent ? 'border-2 border-blue-600 bg-white' : 'border-2 border-slate-300 bg-white'}`}>
                                            {isCompleted ? <CheckCircle className="h-5 w-5 text-white" /> : isCurrent ? <span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> : <span className="h-2.5 w-2.5 rounded-full bg-transparent" />}
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className={`text-sm font-semibold transition-colors duration-300 ${isCurrent ? 'text-blue-600' : 'text-slate-700'}`}>{step.title}</span>
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

const FormCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; isActive: boolean; subtitle?: string; aiHelpText?: string; }> = ({ title, icon: Icon, children, isActive, subtitle, aiHelpText }) => (
    <div className={`bg-white p-6 rounded-lg border transition-all duration-300 ${isActive ? 'border-blue-500 shadow-md' : 'border-slate-200 shadow-sm'}`}>
        <div className="flex items-center mb-1">
            <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                <h2 className={`text-xl font-semibold transition-colors duration-300 ${isActive ? 'text-slate-800' : 'text-slate-700'}`}>{title}</h2>
            </div>
            {aiHelpText && <AiHelperPopover content={aiHelpText} />}
        </div>
        {subtitle && <p className="text-sm text-slate-500 mb-4 ml-9">{subtitle}</p>}
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const FormField: React.FC<{ label: string; children: React.ReactNode; required?: boolean }> = ({ label, children, required }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
    </div>
);

const ControlSelector: React.FC<{
    selectedControls: string[];
    onControlChange: (newControls: string[]) => void;
    controlsLibrary: { id: string; description: string }[];
    onQuickAdd: () => void;
}> = ({ selectedControls, onControlChange, controlsLibrary, onQuickAdd }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const availableControls = controlsLibrary
        .filter(c => !selectedControls.includes(c.id))
        .filter(c => c.id.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelect = (controlId: string) => {
        if (!selectedControls.includes(controlId)) {
            onControlChange([...selectedControls, controlId]);
        }
        setSearchTerm('');
        setDropdownOpen(false);
    };

    const handleRemove = (controlId: string) => {
        onControlChange(selectedControls.filter(c => c !== controlId));
    };
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setDropdownOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md min-h-[42px] focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                {selectedControls.map(controlId => (
                    <span key={controlId} className="flex items-center gap-1.5 bg-slate-200 text-slate-800 text-sm font-medium px-2.5 py-1 rounded-full">
                        {controlId}
                        <button type="button" onClick={() => handleRemove(controlId)} className="text-slate-600 hover:text-slate-800">
                            <X size={14} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setDropdownOpen(true)}
                    placeholder={selectedControls.length > 0 ? "Add more..." : "Search controls..."}
                    className="flex-grow p-1 outline-none bg-transparent"
                />
            </div>
            {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <ul>
                        {availableControls.map(c => (
                            <li key={c.id} onClick={() => handleSelect(c.id)} className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm">
                                <div className="font-semibold">{c.id}</div>
                                <div className="text-xs text-slate-500">{c.description}</div>
                            </li>
                        ))}
                         <li onClick={onQuickAdd} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm text-blue-600 font-semibold border-t border-slate-200">
                            <Plus size={16} /> Quick Add New Control
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export const BasicInfoSection: React.FC<{ data: any; handleChange: any; isActive: boolean; aiHelpText: string; }> = ({ data, handleChange, isActive, aiHelpText }) => (
    <FormCard title="Basic Risk Information" icon={Info} isActive={isActive} aiHelpText={aiHelpText}>
        <FormField label="Risk ID">
            <input type="text" name="riskId" value="Will be generated upon saving" disabled className="w-full p-2 border border-gray-300 rounded-md bg-slate-100 cursor-not-allowed" />
        </FormField>
        <FormField label="Risk Statement" required>
            <input type="text" name="title" value={data.title} onChange={handleChange} placeholder="e.g., Water damage compromises availability of the Data Center" className="w-full p-2 border border-gray-300 rounded-md" />
        </FormField>
        <FormField label="Risk Category" required>
            <select name="category" value={data.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Select a category...</option>
                {RISK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </FormField>
    </FormCard>
);

export const AssetLinkSection: React.FC<{
    data: any;
    handleChange: (event: { target: { name: string; value: string[] } }) => void;
    assets: Asset[];
    isActive: boolean;
    onAddAsset: () => void;
    aiHelpText: string;
}> = ({ data, handleChange, assets, isActive, onAddAsset, aiHelpText }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedAssetIds = data.relatedAssets || [];
    const selectedAssets = selectedAssetIds.map((id: string) => assets.find(a => a.id === id)).filter(Boolean);

    const availableAssets = assets
        .filter(asset => !selectedAssetIds.includes(asset.id))
        .filter(asset => asset.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelectAsset = (assetId: string) => {
        const newSelectedAssets = [...selectedAssetIds, assetId];
        handleChange({ target: { name: 'relatedAssets', value: newSelectedAssets } });
        setSearchTerm('');
        setDropdownOpen(false);
    };

    const handleRemoveAsset = (assetId: string) => {
        const newSelectedAssets = selectedAssetIds.filter((id: string) => id !== assetId);
        handleChange({ target: { name: 'relatedAssets', value: newSelectedAssets } });
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <FormCard title="Link to Assets & Processes" icon={Target} isActive={isActive} aiHelpText={aiHelpText}>
            <FormField label="Related Asset(s)" required>
                <div className="relative" ref={wrapperRef}>
                    <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md min-h-[42px] focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                        {selectedAssets.map(asset => asset && (
                            <span key={asset.id} className="flex items-center gap-1.5 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full">
                                {asset.name}
                                <button type="button" onClick={() => handleRemoveAsset(asset.id)} className="text-blue-600 hover:text-blue-800">
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setDropdownOpen(true)}
                            placeholder={selectedAssets.length > 0 ? "Add more..." : "Search for assets..."}
                            className="flex-grow p-1 outline-none bg-transparent"
                        />
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            <ul>
                                {availableAssets.map(asset => (
                                    <li key={asset.id} onClick={() => handleSelectAsset(asset.id)} className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm">
                                        <div className="font-semibold">{asset.name}</div>
                                        <div className="text-xs text-slate-500">{asset.id}</div>
                                    </li>
                                ))}
                                 <li onClick={onAddAsset} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm text-blue-600 font-semibold border-t border-slate-200">
                                    <Plus size={16} /> Add New Asset
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </FormField>
        </FormCard>
    );
};

export const RiskIdentificationSection: React.FC<{ data: any; handleChange: any; isActive: boolean; aiHelpText: string; }> = ({ data, handleChange, isActive, aiHelpText }) => (
    <FormCard title="Risk Identification" icon={Zap} isActive={isActive} subtitle="Describe the threat, vulnerability, cause, and potential consequences." aiHelpText={aiHelpText}>
        <FormField label="Threat Source">
            <select name="threatSource" value={data.threatSource} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">Select a source...</option>
                {THREAT_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </FormField>
        <FormField label="Cause of Risk">
            <textarea name="causeOfRisk" value={data.causeOfRisk} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Fire incident, Unauthorized access gained by intruder..." />
        </FormField>
        <FormField label="Vulnerability / Source of Risk">
            <textarea name="vulnerabilityDescription" value={data.vulnerabilityDescription} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Sprinklers are in active status, User access review not being carried out..." />
        </FormField>
        <FormField label="Potential Consequences">
            <textarea name="potentialConsequences" value={data.potentialConsequences} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Loss of data availability, financial loss..." />
        </FormField>
    </FormCard>
);

export const InherentRiskAnalysisSection: React.FC<{ data: any; handleChange: any; isActive: boolean; aiHelpText: string; }> = ({ data, handleChange, isActive, aiHelpText }) => (
    <FormCard title="Inherent Risk Analysis" icon={BarChart2} isActive={isActive} subtitle="Assess the risk level before any controls are applied." aiHelpText={aiHelpText}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Likelihood of Occurrence" required>
                <select name="likelihood" value={data.likelihood} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                    {Object.entries(LIKELIHOOD_SCALE).map(([value, label]) => <option key={value} value={value}>{value} - {label}</option>)}
                </select>
            </FormField>
            <FormField label="Impact Level" required>
                <select name="impact" value={data.impact} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                    {Object.entries(IMPACT_SCALE).map(([value, label]) => <option key={value} value={value}>{value} - {label}</option>)}
                </select>
            </FormField>
        </div>
    </FormCard>
);

export const ControlsAndTreatmentSection: React.FC<{
    data: any;
    handleChange: any;
    isActive: boolean;
    aiHelpText: string;
    controlsLibrary: { id: string; description: string }[];
    onQuickAddControl: () => void;
    onSuggestControls: () => void;
    suggestedControls: string[];
    onControlClick: (fieldName: 'newControlMapping' | 'isoMapping', control: string) => void;
    isSuggesting: boolean;
}> = ({ data, handleChange, isActive, aiHelpText, controlsLibrary, onQuickAddControl, onSuggestControls, suggestedControls, onControlClick, isSuggesting }) => {
    const extendedTreatmentOptions = ['Accept the risk', 'Avoid the risk', 'Share the risk', 'Change the likelihood', 'Remove the risk source', 'Take risk to avail further business opportunities'];
    return (
        <FormCard title="Controls & Treatment Plan" icon={ShieldCheck} isActive={isActive} aiHelpText={aiHelpText}>
            <FormField label="Existing Security Controls">
                <textarea name="existingControls" value={data.existingControls} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Access review being carried irregularly" />
            </FormField>
            <FormField label="Control Effectiveness">
                 <select name="controlEffectiveness" value={data.controlEffectiveness} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                    {CONTROL_EFFECTIVENESS_SCALE.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </FormField>
            <hr className="my-4"/>
            <FormField label="Risk Treatment Option" required>
                <select name="treatmentDecision" value={data.treatmentDecision} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select a treatment...</option>
                    {extendedTreatmentOptions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </FormField>
             <FormField label="Description of Control to be Implemented">
                <textarea name="plannedControls" value={data.plannedControls} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Deactivate the sprinklers permanently..." />
            </FormField>
            <FormField label="Map to Annex-A (New Control)">
                <ControlSelector
                    selectedControls={data.newControlMapping}
                    onControlChange={(newValue) => handleChange({ target: { name: 'newControlMapping', value: newValue } })}
                    controlsLibrary={controlsLibrary}
                    onQuickAdd={onQuickAddControl}
                />
            </FormField>
             <div className="mt-2">
                <button type="button" onClick={onSuggestControls} disabled={isSuggesting} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50">
                    {isSuggesting ? <Loader2 className="animate-spin" size={16} /> : <Lightbulb size={16} />}
                    {isSuggesting ? 'Analyzing...' : 'Suggest Controls'}
                </button>
                {suggestedControls.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 p-2 bg-slate-50 rounded-md">
                        {suggestedControls.map(control => (
                            <button key={control} type="button" onClick={() => onControlClick('newControlMapping', control)} className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-1 rounded-full hover:bg-blue-200">
                                {control}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </FormCard>
    );
};

export const ResidualRiskAnalysisSection: React.FC<{ data: any; handleChange: any; isActive: boolean; aiHelpText: string; }> = ({ data, handleChange, isActive, aiHelpText }) => (
    <FormCard title="Residual Risk Analysis" icon={TrendingDown} isActive={isActive} subtitle="Assess the risk level after planned controls are implemented." aiHelpText={aiHelpText}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Revised Likelihood" required>
                <select name="revisedLikelihood" value={data.revisedLikelihood} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                    {Object.entries(LIKELIHOOD_SCALE).map(([value, label]) => <option key={value} value={value}>{value} - {label}</option>)}
                </select>
            </FormField>
            <FormField label="Revised Impact" required>
                <select name="revisedImpact" value={data.revisedImpact} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                    {Object.entries(IMPACT_SCALE).map(([value, label]) => <option key={value} value={value}>{value} - {label}</option>)}
                </select>
            </FormField>
        </div>
    </FormCard>
);

export const ReviewSection: React.FC<{ data: any; handleChange: any; isActive: boolean; aiHelpText: string; }> = ({ data, handleChange, isActive, aiHelpText }) => (
    <FormCard title="Monitoring & Review" icon={Clock} isActive={isActive} aiHelpText={aiHelpText}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Risk Owner" required>
                <select name="owner" value={data.owner} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                     <option value="">Select an owner...</option>
                    {MOCK_USERS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
            </FormField>
            <FormField label="Review Frequency">
                <select name="reviewFrequency" value={data.reviewFrequency} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                    {REVIEW_FREQUENCIES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </FormField>
        </div>
    </FormCard>
);

export const MetadataSection: React.FC<{
    data: any;
    handleChange: any;
    isActive: boolean;
    aiHelpText: string;
    controlsLibrary: { id: string; description: string }[];
    onQuickAddControl: () => void;
    onSuggestControls: () => void;
    suggestedControls: string[];
    onControlClick: (fieldName: 'newControlMapping' | 'isoMapping', control: string) => void;
    isSuggesting: boolean;
}> = ({ data, handleChange, isActive, aiHelpText, controlsLibrary, onQuickAddControl, onSuggestControls, suggestedControls, onControlClick, isSuggesting }) => (
    <FormCard title="Metadata & Tracking" icon={Settings} isActive={isActive} aiHelpText={aiHelpText}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Status" required>
                <select name="status" value={data.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md">
                    {RISK_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </FormField>
        </div>
         <FormField label="ISO 27001 Control Mapping (Existing)">
             <ControlSelector
                selectedControls={data.isoMapping}
                onControlChange={(newValue) => handleChange({ target: { name: 'isoMapping', value: newValue } })}
                controlsLibrary={controlsLibrary}
                onQuickAdd={onQuickAddControl}
            />
        </FormField>
        <div className="mt-2">
            <button type="button" onClick={onSuggestControls} disabled={isSuggesting} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-50">
                {isSuggesting ? <Loader2 className="animate-spin" size={16} /> : <Lightbulb size={16} />}
                {isSuggesting ? 'Analyzing...' : 'Suggest Controls'}
            </button>
            {suggestedControls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 p-2 bg-slate-50 rounded-md">
                    {suggestedControls.map(control => (
                        <button key={control} type="button" onClick={() => onControlClick('isoMapping', control)} className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-1 rounded-full hover:bg-blue-200">
                            {control}
                        </button>
                    ))}
                </div>
            )}
        </div>
        <FormField label="Remarks / Notes">
             <textarea name="remarks" value={data.remarks} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md" />
        </FormField>
    </FormCard>
);

export const RiskSummaryCard: React.FC<{
    inherentRisk: { score: number; level: string; color: string; };
    residualRisk: { score: number; level: string; color: string; };
}> = ({ inherentRisk, residualRisk }) => (
    <div className="sticky top-24 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Inherent Risk Rating</h3>
            <div className={`p-4 rounded-lg text-center ${inherentRisk.color}`}>
                <p className="text-4xl font-bold">{inherentRisk.score}</p>
                <p className="font-semibold mt-1">{inherentRisk.level}</p>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Risk level before applying controls.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Residual Risk Rating</h3>
            <div className={`p-4 rounded-lg text-center ${residualRisk.color}`}>
                <p className="text-4xl font-bold">{residualRisk.score}</p>
                <p className="font-semibold mt-1">{residualRisk.level}</p>
            </div>
             <p className="text-xs text-slate-500 mt-3 text-center">Risk level after planned controls.</p>
        </div>
    </div>
);

