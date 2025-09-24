import React from 'react';
import { Lightbulb, PlusCircle, X } from 'lucide-react';

// The main component file will define these types and components
// and pass them down as props. This avoids re-importing everywhere.
type OrganizationData = any;
const QSensei: React.FC<any> = () => null; 
const FormSection: React.FC<any> = ({ children }) => <div>{children}</div>;

export const OrganizationalContextStep: React.FC<{
    orgData: OrganizationData;
    handleInputChange: (field: keyof OrganizationData, value: string) => void;
    setIsAiModalOpen: (isOpen: boolean) => void;
    allInterestedParties: string[];
    handleMultiSelectChange: (field: keyof OrganizationData, value: string) => void;
    removeCustomParty: (party: string) => void;
    handleRequirementChange: (party: string, index: number, value: string) => void;
    addRequirement: (party: string) => void;
    deleteRequirement: (party: string, index: number) => void;
    newPartyInput: string;
    setNewPartyInput: (value: string) => void;
    addCustomParty: () => void;
    PREDEFINED_OPTIONS: any;
    HELP_CONTENT: any;
    QSenseiComponent: React.ElementType; // Pass the component itself
}> = ({
    orgData, handleInputChange, setIsAiModalOpen, allInterestedParties,
    handleMultiSelectChange, removeCustomParty, handleRequirementChange,
    addRequirement, deleteRequirement, newPartyInput, setNewPartyInput,
    addCustomParty, PREDEFINED_OPTIONS, HELP_CONTENT, QSenseiComponent
}) => (
    <FormSection>
        {/* --- Organization Details --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 px-8">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name*</label>
                <input type="text" placeholder="Enter company name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={orgData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} />
            </div>
            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    Industry / Sector*
                    <QSenseiComponent title={HELP_CONTENT.industry.title} content={HELP_CONTENT.industry.content} />
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={orgData.industryType} onChange={(e) => handleInputChange('industryType', e.target.value)}>
                    <option value="">Select industry</option>
                    <option value="saas">Software as a Service (SaaS)</option>
                    <option value="fintech">FinTech</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other...</option>
                </select>
                {orgData.industryType === 'other' && (
                    <input
                        type="text"
                        placeholder="Please specify your industry"
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={orgData.otherIndustry}
                        onChange={(e) => handleInputChange('otherIndustry', e.target.value)}
                    />
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Size*</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={orgData.numberOfEmployees} onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}>
                    <option value="">Select range</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-250">51-250 employees</option>
                    <option value="251-1000">251-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                </select>
            </div>
            <div className="md:col-span-2 mb-8">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    Primary Business Activities*
                    <QSenseiComponent title={HELP_CONTENT.businessActivities.title} content={HELP_CONTENT.businessActivities.content} />
                </label>
                <textarea rows={3} placeholder="e.g., We provide a cloud-based project management platform for B2B clients..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={orgData.primaryBusinessActivities} onChange={(e) => handleInputChange('primaryBusinessActivities', e.target.value)} />
                <button onClick={() => setIsAiModalOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2">
                    <Lightbulb className="w-4 h-4" />
                    Draft with QSensei
                </button>
            </div>
        </div>

        {/* --- IMPROVED Interested Parties Section --- */}
        <div className='pt-4 border-t border-gray-300 px-8 mb-8'>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                Interested Parties & Their Requirements*
                <QSenseiComponent title={HELP_CONTENT.interestedParties.title} content={HELP_CONTENT.interestedParties.content} />
            </label>
            <p className="text-xs text-slate-500 mb-3">Select the groups relevant to your ISMS and define their key security requirements.</p>
            <div className="space-y-3">
                {allInterestedParties.map((party) => {
                    const isSelected = orgData.interestedParties.includes(party);
                    const partyData = orgData.partyRequirements.find(p => p.party === party);
                    const isCustom = !PREDEFINED_OPTIONS.interestedParties.includes(party);

                    return (
                        <div key={party} className={`border rounded-lg transition-all duration-300 ${isSelected ? 'border-blue-300 bg-blue-50/50' : 'border-slate-200'}`}>
                            <div className="flex items-center p-4">
                                <label className="flex items-center flex-grow cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked={isSelected}
                                        onChange={() => handleMultiSelectChange('interestedParties', party)}
                                    />
                                    <span className="ml-3 text-sm font-semibold text-slate-800">{party}</span>
                                </label>
                                {isCustom && (
                                    <button onClick={() => removeCustomParty(party)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full ml-2">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            {isSelected && partyData && (
                                <div className="px-4 pb-4 border-t border-blue-200">
                                    <div className="space-y-2 mt-3">
                                        {partyData.requirements.map((req, rIndex) => (
                                            <div key={rIndex} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    placeholder={`e.g., Protection of PII for Customers`}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                    value={req}
                                                    onChange={(e) => handleRequirementChange(party, rIndex, e.target.value)}
                                                />
                                                {partyData.requirements.length > 1 && (
                                                     <button onClick={() => deleteRequirement(party, rIndex)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => addRequirement(party)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-3">
                                        <PlusCircle className="w-3.5 h-3.5" /> Add requirement
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Add a custom party (e.g., Auditors)"
                    value={newPartyInput}
                    onChange={(e) => setNewPartyInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomParty(); } }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                    onClick={addCustomParty}
                    className="px-4 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-md text-sm font-semibold transition-colors shrink-0"
                >
                    Add Party
                </button>
            </div>
        </div>
    </FormSection>
);