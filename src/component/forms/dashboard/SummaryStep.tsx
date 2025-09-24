import React, { useState } from 'react';
import { ChevronDown, Pencil } from 'lucide-react';

type OrganizationData = any;

const AccordionSection: React.FC<{
    title: string;
    step: number;
    goToStep: (step: number) => void;
    children: React.ReactNode;
}> = ({ title, step, goToStep, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 cursor-pointer"
            >
                <h3 className="font-semibold text-slate-800">{title}</h3>
                <div className="flex items-center gap-4">
                     <div 
                        onClick={(e) => { e.stopPropagation(); goToStep(step); }} 
                        className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="w-3 h-3" />
                        Edit
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>
            {isOpen && (
                <div className="p-4 border-t border-gray-200 text-sm">
                    {children}
                </div>
            )}
        </div>
    );
};

const DataField: React.FC<{ label: string; value: string | string[] | React.ReactNode; }> = ({ label, value }) => (
    <div className="mb-3 grid grid-cols-1 md:grid-cols-3 gap-1">
        <p className="font-semibold text-slate-600">{label}:</p>
        <div className="md:col-span-2 text-slate-800">
            {Array.isArray(value) ? (
                value.length > 0 && value.some(item => item) ? (
                    <ul className="list-disc list-inside">
                        {value.map((item, index) => item && <li key={index}>{item}</li>)}
                    </ul>
                ) : <p className="text-slate-500">Not provided</p>
            ) : (value || <p className="text-slate-500">Not provided</p>)}
        </div>
    </div>
);

const PersonnelCard: React.FC<{ person: any }> = ({ person }) => (
    <div className="mb-4 p-3 border border-slate-200 rounded-md bg-slate-50/50">
        <p className="font-bold text-slate-800">{person.fullName || "Not provided"}</p>
        <p className="text-slate-600">{person.jobTitle || "Not provided"}</p>
        <hr className="my-2"/>
        <DataField label="Email" value={person.email} />
        <DataField label="ISMS Role(s)" value={person.ismsRoles.join(', ')} />
        <DataField label="Responsibilities" value={<p className="whitespace-pre-wrap">{person.responsibilities}</p>} />
    </div>
);

export const SummaryStep: React.FC<{
    orgData: OrganizationData;
    goToStep: (step: number) => void;
}> = ({ orgData, goToStep }) => (
    <div className="px-8">
        <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Confirm Your ISMS Environment</h2>
            <p className="text-sm text-slate-600 mt-1">Please review the information below. This will form the foundation of your ISMS in Qireon. You can edit any section before confirming.</p>
        </div>
        <div className="space-y-4">
            <AccordionSection title="Organizational Context" step={1} goToStep={goToStep}>
                <DataField label="Company Name" value={orgData.companyName} />
                <DataField label="Industry / Sector" value={orgData.industryType === 'other' ? orgData.otherIndustry : orgData.industryType} />
                <DataField label="Company Size" value={orgData.numberOfEmployees} />
                <DataField label="Primary Business Activities" value={<p className="whitespace-pre-wrap">{orgData.primaryBusinessActivities}</p>} />
                <DataField 
                    label="Interested Parties" 
                    value={orgData.partyRequirements.map(pr => (
                        <div key={pr.party} className="mb-2">
                            <strong>{pr.party}</strong>
                            <ul className="list-disc list-inside ml-4">
                                {pr.requirements.map((req, i) => req && <li key={i}>{req}</li>)}
                            </ul>
                        </div>
                    ))} 
                />
            </AccordionSection>
            
            <AccordionSection title="Key Personnel & Responsibilities" step={2} goToStep={goToStep}>
                 {orgData.keyPersonnel.length > 0 ? orgData.keyPersonnel.map(person => (
                    <PersonnelCard key={person.id} person={person} />
                 )) : <p className="text-slate-500">No personnel provided.</p>}
            </AccordionSection>

            <AccordionSection title="ISMS Scope Definition" step={3} goToStep={goToStep}>
                 <DataField label="Scope Statement" value={<p className="whitespace-pre-wrap">{orgData.scopeStatement}</p>} />
                 <DataField label="Organizational Units" value={orgData.organizationalUnits} />
                 <DataField label="Physical Locations" value={orgData.physicalLocations.filter(l => l)} />
                 <DataField label="Technologies & Infrastructure" value={orgData.technologies} />
                 <DataField label="Exclusions from Scope" value={orgData.exclusions.filter(e => e)} />
            </AccordionSection>

            <AccordionSection title="Key Assets" step={4} goToStep={goToStep}>
                <DataField label="Information Assets" value={orgData.informationAssets} />
                <DataField label="Hardware Assets" value={orgData.hardwareAssets} />
                <DataField label="Software Assets" value={orgData.softwareAssets} />
            </AccordionSection>
        </div>
    </div>
);

