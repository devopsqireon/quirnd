'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation' // Import the router
import { usePageHeader } from '@/app/contexts/PageHeaderContext'
import { ChevronLeft, ChevronRight, Check, PlusCircle, X, Lightbulb } from 'lucide-react'
// Import Step Components

import { OrganizationalContextStep } from '../forms/dashboard/OrganizationalContextStep';
import { IsmsScopeStep } from '../forms/dashboard/IsmsScopeStep';
import { KeyAssetsStep } from '../forms/dashboard/KeyAssetsStep';
import { SummaryStep } from '../forms/dashboard/SummaryStep';
import { KeyPersonnelStep } from '../forms/dashboard/KeyPersonnelStep';

// --- INTERFACES ---
interface PartyRequirement {
    party: string;
    requirements: string[];
}

interface Personnel {
    id: string;
    fullName: string;
    jobTitle: string;
    email: string;
    ismsRoles: string[];
    responsibilities: string;
}

interface OrganizationData {
    companyName: string;
    industryType: string;
    otherIndustry?: string;
    numberOfEmployees: string;
    primaryBusinessActivities: string;
    interestedParties: string[];
    partyRequirements: PartyRequirement[];
    keyPersonnel: Personnel[];
    scopeStatement: string;
    organizationalUnits: string[];
    physicalLocations: string[];
    technologies: string[];
    exclusions: string[];
    informationAssets: string[];
    hardwareAssets: string[];
    softwareAssets: string[];
}

// --- SHARED UI COMPONENTS & CONSTANTS ---

const Tag: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
    <span className="flex items-center gap-1.5 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full">
        {label}
        <button onClick={onRemove} className="focus:outline-none">
            <X className="w-3.5 h-3.5 text-blue-600 hover:text-blue-800" />
        </button>
    </span>
);

const QSensei: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-flex" ref={popoverRef}>
            <div className="relative group">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-2 text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                    aria-label="QSensei"
                >
                    <Lightbulb className="w-5 h-5" />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    QSensei Suggestion
                    <svg className="absolute text-slate-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                </div>
            </div>
            {isOpen && (
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-slate-50 border border-slate-300 rounded-lg shadow-xl z-10">
                    <div className="p-4">
                         <div className="flex items-center mb-2">
                            <span className="text-blue-500"><Lightbulb className="w-5 h-5"/></span>
                            <h4 className="font-semibold text-sm text-slate-800 ml-2">{title}</h4>
                        </div>
                        <div className="text-xs text-slate-600 space-y-2">{content}</div>
                    </div>
                     <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-50 border-b border-r border-slate-300 transform rotate-45"></div>
                </div>
            )}
        </div>
    );
};

const HELP_CONTENT = {
    industry: {
        title: "Industry / Sector Selection",
        content: <p>Choosing the right industry helps us tailor compliance recommendations for identifying relevant regulations and common risks.</p>
    },
    businessActivities: {
        title: "Describing Business Activities",
        content: <p>Provide a concise summary of your core products or services. This context is vital for defining the scope of your compliance framework.</p>
    },
    interestedParties: {
        title: "Identifying Interested Parties",
        content: <p>An interested party is any person or organization that can affect, be affected by, or perceive themselves to be affected by your security activities.</p>
    },
    keyPersonnel: {
        title: "Key Personnel & Responsibilities",
        content: <p>Clearly assigning ISMS roles and responsibilities is a core requirement of ISO 27001. This demonstrates accountability to an auditor.</p>
    },
    orgUnits: {
        title: "Organizational Units in Scope",
        content: <p>Select all departments or teams whose activities are covered by the ISMS. This typically includes teams that handle sensitive data or manage critical infrastructure.</p>
    },
    locations: {
        title: "Physical Locations in Scope",
        content: <p>List all physical offices, data centers, or colocation facilities that are included in your ISMS. For cloud services, specify the provider and region (e.g., AWS ap-south-1).</p>
    },
    technologies: {
        title: "Technologies & Infrastructure",
        content: <p>List the key technologies, platforms, and infrastructure that support your in-scope services. This helps define the technical boundaries of your ISMS.</p>
    },
    exclusions: {
        title: "Exclusions from Scope",
        content: <p>Clearly state anything that is NOT covered by the ISMS. Be specific and provide justification. For example, "The corporate marketing website is excluded as it does not process customer data."</p>
    },
    infoAssets: {
        title: "Information Assets",
        content: <p>These are the valuable data and information you need to protect. Common examples include customer PII, financial records, and intellectual property.</p>
    },
    hardwareAssets: {
        title: "Hardware Assets",
        content: <p>These are the physical devices that store or process your information assets, like servers, employee laptops, and network equipment.</p>
    },
    softwareAssets: {
        title: "Software Assets",
        content: <p>These are the applications and platforms your business relies on, including cloud platforms (AWS, Azure), SaaS applications, databases, and custom software.</p>
    }
};

const ProgressSidebar: React.FC<{ setupSteps: { id: number; label: string; completed: boolean; active?: boolean }[] }> = ({ setupSteps }) => (
    <aside className="w-full bg-white border border-slate-200 shadow-sm rounded-lg p-6 hidden lg:block sticky top-6">
       <h3 className="font-semibold text-slate-800 mb-4">Onboarding Progress</h3>
       <div className="space-y-4">
           {setupSteps.map((step) => (
               <div key={step.id} className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                       step.completed ? 'bg-green-500 text-white' : step.active ? 'bg-blue-500 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-600'
                   }`}>
                       {step.completed ? <Check className="w-5 h-5" /> : step.id}
                   </div>
                   <span className={`text-sm font-medium ${
                       step.active ? 'text-blue-600' : step.completed ? 'text-slate-700' : 'text-slate-500'
                   }`}>
                       {step.label}
                   </span>
               </div>
           ))}
       </div>
   </aside>
);

const Stepper: React.FC<{ formSteps: { id: number; title: string }[]; currentStep: number }> = ({ formSteps, currentStep }) => (
    <div className="w-full px-4 sm:px-8 mb-10">
        <div className="flex items-center">
            {formSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                                currentStep > step.id ? 'bg-green-500 text-white' : 
                                currentStep === step.id ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-500'
                            }`}
                        >
                            {currentStep > step.id ? <Check className="w-6 h-6" /> : step.id}
                        </div>
                        <p className={`mt-2 text-center text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                            currentStep === step.id ? 'text-blue-600' : 'text-slate-600'
                        }`}>{step.title}</p>
                    </div>
                    {index < formSteps.length - 1 && (
                        <div className={`flex-1 h-1 transition-colors duration-500 mx-2 ${
                            currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'
                        }`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
);

const AIModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    prompt: string;
    setPrompt: (value: string) => void;
    onSubmit: () => void;
    title: string;
    description: string;
    placeholder: string;
}> = ({ isOpen, onClose, prompt, setPrompt, onSubmit, title, description, placeholder }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex items-center mb-4">
                    <Lightbulb className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-slate-800 ml-2">{title}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">{description}</p>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="text-sm font-semibold text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button onClick={onSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                        Generate
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const ComplianceConfiguration: React.FC = () => {
    const router = useRouter(); // Initialize the router
    const { setBreadcrumbs } = usePageHeader();

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Home', href: '/dashboard' },
            { label: 'Onboarding', href: '#' },
            { label: 'Compliance Environment Configuration' }
        ]);
        return () => setBreadcrumbs([]);
    }, [setBreadcrumbs]);

    // --- STATE MANAGEMENT ---
    const [orgData, setOrgData] = useState<OrganizationData>({
        companyName: '', industryType: '', otherIndustry: '', numberOfEmployees: '', primaryBusinessActivities: '',
        interestedParties: [], partyRequirements: [],
        keyPersonnel: [],
        scopeStatement: '', organizationalUnits: [],
        physicalLocations: [''], technologies: [], exclusions: [''],
        informationAssets: [], hardwareAssets: [], softwareAssets: [],
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiModalPrompt, setAiModalPrompt] = useState('');
    const [aiTargetField, setAiTargetField] = useState<'primaryBusinessActivities' | 'scopeStatement' | null>(null);
    
    const formSteps = [
        { id: 1, title: 'Organizational Context' },
        { id: 2, title: 'Key Personnel' },
        { id: 3, title: 'ISMS Scope' },
        { id: 4, title: 'Key Assets' },
        { id: 5, title: 'Review & Confirm' }
    ];

    const setupSteps = [
        { id: 1, label: 'Account Created', completed: true },
        { id: 2, label: 'Environment Setup', completed: false, active: true },
        { id: 3, label: 'Gap Analysis', completed: false },
        { id: 4, label: 'Dashboard', completed: false },
    ];
    
    const PREDEFINED_OPTIONS = {
        interestedParties: ['Customers', 'Employees', 'Regulators', 'Investors', 'Suppliers'],
        organizationalUnits: ['Engineering', 'IT & Infrastructure', 'Human Resources', 'Customer Support', 'Executive Management'],
        informationAssets: ['Personally Identifiable Information (PII)', 'Financial Data', 'Intellectual Property', 'Source Code', 'User Credentials'],
        hardwareAssets: ['Employee Laptops', 'Production Servers (Cloud)', 'Network Equipment', 'Mobile Devices'],
        softwareAssets: ['Cloud Platforms (AWS, Azure, GCP)', 'SaaS Apps (Office 365, Slack)', 'Databases', 'Custom Applications']
    };

    const [allInterestedParties, setAllInterestedParties] = useState(PREDEFINED_OPTIONS.interestedParties);
    const [newPartyInput, setNewPartyInput] = useState('');
    const [allOrganizationalUnits, setAllOrganizationalUnits] = useState(PREDEFINED_OPTIONS.organizationalUnits);
    const [newOrgUnitInput, setNewOrgUnitInput] = useState('');

    const [allInformationAssets, setAllInformationAssets] = useState(PREDEFINED_OPTIONS.informationAssets);
    const [newInfoAssetInput, setNewInfoAssetInput] = useState('');
    const [allHardwareAssets, setAllHardwareAssets] = useState(PREDEFINED_OPTIONS.hardwareAssets);
    const [newHardwareAssetInput, setNewHardwareAssetInput] = useState('');
    const [allSoftwareAssets, setAllSoftwareAssets] = useState(PREDEFINED_OPTIONS.softwareAssets);
    const [newSoftwareAssetInput, setNewSoftwareAssetInput] = useState('');


    // --- EVENT HANDLERS ---
    const handleInputChange = (field: keyof Omit<OrganizationData, 'interestedParties' | 'partyRequirements' | 'keyPersonnel' | 'organizationalUnits' | 'physicalLocations' | 'technologies' | 'informationAssets' | 'hardwareAssets' | 'softwareAssets' | 'exclusions'>, value: string) => {
        setOrgData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleMultiSelectChange = (field: keyof OrganizationData, value: string) => {
        setOrgData(prev => {
            const currentValues = prev[field] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];

            if (field === 'interestedParties') {
                const newPartyRequirements = newValues.map(party => {
                    const existing = prev.partyRequirements.find(p => p.party === party);
                    return existing || { party, requirements: [''] };
                }).filter(p => newValues.includes(p.party));
                return { ...prev, [field]: newValues, partyRequirements: newPartyRequirements };
            }
            
            return { ...prev, [field]: newValues };
        });
    };

    const handlePersonnelUpdate = (updatedPersonnel: Personnel[]) => {
        setOrgData(prev => ({ ...prev, keyPersonnel: updatedPersonnel }));
    };

    const handleTagInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const value = e.currentTarget.value.trim();
            if (value && !orgData.technologies.includes(value)) {
                setOrgData(prev => ({...prev, technologies: [...prev.technologies, value]}));
            }
            e.currentTarget.value = '';
        }
    };

    const removeTag = (tagToRemove: string) => {
        setOrgData(prev => ({...prev, technologies: prev.technologies.filter(tag => tag !== tagToRemove)}));
    };
    
    const handleLocationChange = (index: number, value: string) => {
        const newLocations = [...orgData.physicalLocations];
        newLocations[index] = value;
        setOrgData(prev => ({ ...prev, physicalLocations: newLocations }));
    };

    const addLocation = () => {
        setOrgData(prev => ({ ...prev, physicalLocations: [...prev.physicalLocations, ''] }));
    };

    const removeLocation = (indexToRemove: number) => {
        if (orgData.physicalLocations.length <= 1) {
            setOrgData(prev => ({ ...prev, physicalLocations: [''] }));
            return;
        }
        setOrgData(prev => ({
            ...prev,
            physicalLocations: prev.physicalLocations.filter((_, index) => index !== indexToRemove)
        }));
    };
    
    const handleRequirementChange = (partyName: string, reqIndex: number, value: string) => {
        setOrgData(prev => ({
            ...prev,
            partyRequirements: prev.partyRequirements.map(pr => 
                pr.party === partyName 
                ? { ...pr, requirements: pr.requirements.map((r, i) => i === reqIndex ? value : r) } 
                : pr
            )
        }));
    };

    const addRequirement = (partyName: string) => {
        setOrgData(prev => ({
            ...prev,
            partyRequirements: prev.partyRequirements.map(pr => 
                pr.party === partyName 
                ? { ...pr, requirements: [...pr.requirements, ''] } 
                : pr
            )
        }));
    };

    const deleteRequirement = (partyName: string, reqIndex: number) => {
        setOrgData(prev => ({
            ...prev,
            partyRequirements: prev.partyRequirements.map(pr => {
                if (pr.party !== partyName) return pr;
                const newReqs = pr.requirements.filter((_, i) => i !== reqIndex);
                return { ...pr, requirements: newReqs.length > 0 ? newReqs : [''] };
            })
        }));
    };

    const addCustomParty = () => {
        const partyToAdd = newPartyInput.trim();
        if (partyToAdd && !allInterestedParties.includes(partyToAdd)) {
            setAllInterestedParties(prev => [...prev, partyToAdd]);
            setOrgData(prev => ({
                ...prev,
                interestedParties: [...prev.interestedParties, partyToAdd],
                partyRequirements: [...prev.partyRequirements, { party: partyToAdd, requirements: [''] }]
            }));
            setNewPartyInput('');
        }
    };

    const removeCustomParty = (partyToRemove: string) => {
        if (PREDEFINED_OPTIONS.interestedParties.includes(partyToRemove)) return;
        setAllInterestedParties(prev => prev.filter(p => p !== partyToRemove));
        setOrgData(prev => ({
            ...prev,
            interestedParties: prev.interestedParties.filter(p => p !== partyToRemove),
            partyRequirements: prev.partyRequirements.filter(p => p.party !== partyToRemove)
        }));
    };

    const addCustomOrgUnit = () => {
        const unitToAdd = newOrgUnitInput.trim();
        if (unitToAdd && !allOrganizationalUnits.includes(unitToAdd)) {
            setAllOrganizationalUnits(prev => [...prev, unitToAdd]);
            setOrgData(prev => ({
                ...prev,
                organizationalUnits: [...prev.organizationalUnits, unitToAdd]
            }));
            setNewOrgUnitInput('');
        }
    };

    const removeCustomOrgUnit = (unitToRemove: string) => {
        if (PREDEFINED_OPTIONS.organizationalUnits.includes(unitToRemove)) return;
        setAllOrganizationalUnits(prev => prev.filter(u => u !== unitToRemove));
        setOrgData(prev => ({
            ...prev,
            organizationalUnits: prev.organizationalUnits.filter(u => u !== unitToRemove)
        }));
    };

    const handleExclusionChange = (index: number, value: string) => {
        const newExclusions = [...orgData.exclusions];
        newExclusions[index] = value;
        setOrgData(prev => ({ ...prev, exclusions: newExclusions }));
    };

    const addExclusion = () => {
        setOrgData(prev => ({ ...prev, exclusions: [...prev.exclusions, ''] }));
    };

    const removeExclusion = (indexToRemove: number) => {
        if (orgData.exclusions.length <= 1) {
            setOrgData(prev => ({ ...prev, exclusions: [''] }));
            return;
        }
        setOrgData(prev => ({
            ...prev,
            exclusions: prev.exclusions.filter((_, index) => index !== indexToRemove)
        }));
    };

    const addCustomAsset = (
        assetType: 'informationAssets' | 'hardwareAssets' | 'softwareAssets',
        newAsset: string,
        setAllAssets: React.Dispatch<React.SetStateAction<string[]>>,
        setNewAssetInput: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const assetToAdd = newAsset.trim();
        if (assetToAdd) {
            setAllAssets(prev => {
                if (!prev.includes(assetToAdd)) {
                    handleMultiSelectChange(assetType, assetToAdd);
                    return [...prev, assetToAdd];
                }
                return prev;
            });
            setNewAssetInput('');
        }
    };
    
    const removeCustomAsset = (
        assetType: 'informationAssets' | 'hardwareAssets' | 'softwareAssets',
        assetToRemove: string,
        predefinedAssets: string[],
        setAllAssets: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        if (predefinedAssets.includes(assetToRemove)) return;
        setAllAssets(prev => prev.filter(asset => asset !== assetToRemove));
        setOrgData(prev => ({
            ...prev,
            [assetType]: (prev[assetType] as string[]).filter(asset => asset !== assetToRemove)
        }));
    };
    
    const handleOpenAiModal = (target: 'primaryBusinessActivities' | 'scopeStatement') => {
        setAiTargetField(target);
        setIsAiModalOpen(true);
    };

    const handleGenerateAiContent = () => {
        if (!aiTargetField || !aiModalPrompt.trim()) return;
        
        let generatedText = '';
        if (aiTargetField === 'primaryBusinessActivities') {
            generatedText = `Based on our focus on '${aiModalPrompt}', our primary business activity is providing a comprehensive, cloud-based project management platform tailored for B2B clients. Our service is designed to streamline workflows, enhance collaboration, and manage sensitive information including user data, project files, and payment details securely and efficiently.`;
        } else if (aiTargetField === 'scopeStatement') {
            generatedText = `The Information Security Management System (ISMS) applies to all information, systems, and processes used to deliver our core services, focusing on '${aiModalPrompt}'. This includes all employees and contractors at our main locations, the cloud infrastructure, and the development and operational activities supporting our platform.`;
        }
        
        setOrgData(prev => ({ ...prev, [aiTargetField]: generatedText }));
        setIsAiModalOpen(false);
        setAiModalPrompt('');
        setAiTargetField(null);
    };

    const handleSubmitAndNavigate = () => {
        console.log("Submitting ISMS data:", orgData);
        // In a real app, you'd likely save the orgData to a state management solution (like Context or Redux)
        // or pass it via the router if it's not too large.
        router.push('/gap-analysis'); // Navigate to the new page
    };

    const goToStep = (step: number) => {
        if (step >= 1 && step <= formSteps.length) {
            setCurrentStep(step);
        }
    };

    const goToNextStep = () => currentStep < formSteps.length && setCurrentStep(prev => prev + 1);
    const goToPrevStep = () => currentStep > 1 && setCurrentStep(prev => prev - 1);
    
    const aiModalContent = {
        primaryBusinessActivities: {
            title: 'Draft Business Activities',
            description: 'Enter a few keywords, and QSensei will draft a professional summary for you.',
            placeholder: 'e.g., cloud-based project management, B2B clients, user data'
        },
        scopeStatement: {
            title: 'Draft Scope Statement',
            description: 'Describe the main focus of your ISMS, and QSensei will create a formal scope statement.',
            placeholder: 'e.g., our SaaS platform, customer data protection, production environment'
        }
    };
    
    return (
        <div className="bg-slate-50 font-sans">
             <AIModal 
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
                prompt={aiModalPrompt}
                setPrompt={setAiModalPrompt}
                onSubmit={handleGenerateAiContent}
                title={aiTargetField ? aiModalContent[aiTargetField].title : ''}
                description={aiTargetField ? aiModalContent[aiTargetField].description : ''}
                placeholder={aiTargetField ? aiModalContent[aiTargetField].placeholder : ''}
            />
            <div className="grid grid-cols-1 lg:grid-cols-[288px_1fr] gap-8 items-start">
                <ProgressSidebar setupSteps={setupSteps} />
                <main className="bg-white border border-slate-200 shadow-sm rounded-lg">
                    <div className="pt-8">
                        {currentStep < 5 && (
                            <>
                                <div className='border-b border-slate-200 pb-4 mb-8 px-8'>
                                    <h2 className="text-xl font-bold text-slate-800 mb-1">Set Up Your Compliance Environment</h2>
                                    <p className="text-sm text-slate-600">This information will create the foundation for your compliance journey.</p>
                                </div>
                                <Stepper formSteps={formSteps} currentStep={currentStep} />
                            </>
                        )}
                        <div className="space-y-10">
                            {currentStep === 1 && (
                                <OrganizationalContextStep 
                                    orgData={orgData}
                                    handleInputChange={handleInputChange}
                                    setIsAiModalOpen={() => handleOpenAiModal('primaryBusinessActivities')}
                                    allInterestedParties={allInterestedParties}
                                    handleMultiSelectChange={handleMultiSelectChange}
                                    removeCustomParty={removeCustomParty}
                                    handleRequirementChange={handleRequirementChange}
                                    addRequirement={addRequirement}
                                    deleteRequirement={deleteRequirement}
                                    newPartyInput={newPartyInput}
                                    setNewPartyInput={setNewPartyInput}
                                    addCustomParty={addCustomParty}
                                    PREDEFINED_OPTIONS={PREDEFINED_OPTIONS}
                                    HELP_CONTENT={HELP_CONTENT}
                                    QSenseiComponent={QSensei}
                                />
                            )}
                            {currentStep === 2 && (
                                <KeyPersonnelStep
                                    orgData={orgData}
                                    onPersonnelUpdate={handlePersonnelUpdate}
                                    QSenseiComponent={QSensei}
                                    HELP_CONTENT={HELP_CONTENT}
                                />
                            )}
                             {currentStep === 3 && (
                                <IsmsScopeStep 
                                    orgData={orgData}
                                    handleInputChange={handleInputChange}
                                    handleMultiSelectChange={handleMultiSelectChange}
                                    handleLocationChange={handleLocationChange}
                                    addLocation={addLocation}
                                    removeLocation={removeLocation}
                                    handleTagInputChange={handleTagInputChange}
                                    removeTag={removeTag}
                                    PREDEFINED_OPTIONS={PREDEFINED_OPTIONS}
                                    TagComponent={Tag}
                                    setIsAiModalOpen={() => handleOpenAiModal('scopeStatement')}
                                    allOrganizationalUnits={allOrganizationalUnits}
                                    newOrgUnitInput={newOrgUnitInput}
                                    setNewOrgUnitInput={setNewOrgUnitInput}
                                    addCustomOrgUnit={addCustomOrgUnit}
                                    removeCustomOrgUnit={removeCustomOrgUnit}
                                    handleExclusionChange={handleExclusionChange}
                                    addExclusion={addExclusion}
                                    removeExclusion={removeExclusion}
                                    QSenseiComponent={QSensei}
                                    HELP_CONTENT={HELP_CONTENT}
                                />
                            )}
                            {currentStep === 4 && (
                                <KeyAssetsStep 
                                    orgData={orgData}
                                    handleMultiSelectChange={handleMultiSelectChange}
                                    PREDEFINED_OPTIONS={PREDEFINED_OPTIONS}
                                    QSenseiComponent={QSensei}
                                    HELP_CONTENT={HELP_CONTENT}
                                    allInformationAssets={allInformationAssets}
                                    newInfoAssetInput={newInfoAssetInput}
                                    setNewInfoAssetInput={setNewInfoAssetInput}
                                    addCustomInfoAsset={() => addCustomAsset('informationAssets', newInfoAssetInput, setAllInformationAssets, setNewInfoAssetInput)}
                                    removeCustomInfoAsset={(asset) => removeCustomAsset('informationAssets', asset, PREDEFINED_OPTIONS.informationAssets, setAllInformationAssets)}
                                    allHardwareAssets={allHardwareAssets}
                                    newHardwareAssetInput={newHardwareAssetInput}
                                    setNewHardwareAssetInput={setNewHardwareAssetInput}
                                    addCustomHardwareAsset={() => addCustomAsset('hardwareAssets', newHardwareAssetInput, setAllHardwareAssets, setNewHardwareAssetInput)}
                                    removeCustomHardwareAsset={(asset) => removeCustomAsset('hardwareAssets', asset, PREDEFINED_OPTIONS.hardwareAssets, setAllHardwareAssets)}
                                    allSoftwareAssets={allSoftwareAssets}
                                    newSoftwareAssetInput={newSoftwareAssetInput}
                                    setNewSoftwareAssetInput={setNewSoftwareAssetInput}
                                    addCustomSoftwareAsset={() => addCustomAsset('softwareAssets', newSoftwareAssetInput, setAllSoftwareAssets, setNewSoftwareAssetInput)}
                                    removeCustomSoftwareAsset={(asset) => removeCustomAsset('softwareAssets', asset, PREDEFINED_OPTIONS.softwareAssets, setAllSoftwareAssets)}
                                />
                            )}
                             {currentStep === 5 && (
                                <SummaryStep
                                    orgData={orgData}
                                    goToStep={goToStep}
                                />
                            )}
                        </div>
                    </div>
                    
                    <div className="p-6 bg-slate-100 rounded-b-lg border-t border-slate-200">
                        <div className="flex justify-between items-center">
                            {currentStep > 1 ? (
                                <button onClick={goToPrevStep} className="text-sm font-semibold text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors">
                                    <ChevronLeft className="w-4 h-4 inline-block mr-1" /> Back
                                </button>
                            ) : ( <div></div> )}

                            {currentStep < formSteps.length ? (
                                <button onClick={goToNextStep} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-semibold">
                                    Next
                                    <ChevronRight className="w-4 h-4 inline-block ml-1" />
                                </button>
                            ) : (
                                <button onClick={handleSubmitAndNavigate} className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-green-500 font-semibold flex items-center gap-2">
                                    Confirm & Start Gap Analysis
                                    <ChevronRight className="w-4 h-4"/>
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ComplianceConfiguration;

