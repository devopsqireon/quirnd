import React from 'react';
import { Lightbulb, PlusCircle, X } from 'lucide-react';

// The main component file will define these types and components
type OrganizationData = any;
const FormSection: React.FC<any> = ({ children }) => <div>{children}</div>;
const Tag: React.FC<any> = () => null;

export const IsmsScopeStep: React.FC<{
    orgData: OrganizationData;
    handleInputChange: (field: keyof OrganizationData, value: string) => void;
    handleMultiSelectChange: (field: keyof OrganizationData, value: string) => void;
    handleLocationChange: (index: number, value: string) => void;
    addLocation: () => void;
    removeLocation: (index: number) => void;
    handleTagInputChange: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    removeTag: (tag: string) => void;
    PREDEFINED_OPTIONS: any;
    TagComponent: React.ElementType;
    setIsAiModalOpen: () => void;
    allOrganizationalUnits: string[];
    newOrgUnitInput: string;
    setNewOrgUnitInput: (value: string) => void;
    addCustomOrgUnit: () => void;
    removeCustomOrgUnit: (unit: string) => void;
    handleExclusionChange: (index: number, value: string) => void;
    addExclusion: () => void;
    removeExclusion: (index: number) => void;
    QSenseiComponent: React.ElementType;
    HELP_CONTENT: any;
}> = ({
    orgData, handleInputChange, handleMultiSelectChange, handleLocationChange,
    addLocation, removeLocation, handleTagInputChange, removeTag, PREDEFINED_OPTIONS, TagComponent,
    setIsAiModalOpen, allOrganizationalUnits, newOrgUnitInput, setNewOrgUnitInput,
    addCustomOrgUnit, removeCustomOrgUnit, handleExclusionChange, addExclusion, removeExclusion,
    QSenseiComponent, HELP_CONTENT
}) => (
    <FormSection>
        <div className='mb-8 px-8'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scope Statement*</label>
            <textarea rows={4} placeholder="Describe the boundaries of your ISMS. Our AI can help draft this." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={orgData.scopeStatement} onChange={(e) => handleInputChange('scopeStatement', e.target.value)} />
            <button onClick={setIsAiModalOpen} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2">
               <Lightbulb className="w-5 h-5" />
                Draft with QSensei
            </button>
        </div>
        
        <div className='mb-8 bg-blue-50 border-t border-b border-gray-300 p-8'>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-4">
                Organizational Units in Scope*
                <QSenseiComponent title={HELP_CONTENT.orgUnits.title} content={HELP_CONTENT.orgUnits.content} />
            </label>
            <div className="space-y-2">
                {allOrganizationalUnits.map(unit => {
                    const isCustom = !PREDEFINED_OPTIONS.organizationalUnits.includes(unit);
                    return (
                        <div key={unit} className="flex items-center p-3 border bg-white border-gray-300 rounded-md">
                             <label className="flex items-center flex-grow cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={orgData.organizationalUnits.includes(unit)}
                                    onChange={() => handleMultiSelectChange('organizationalUnits', unit)}
                                />
                                <span className="ml-3 text-sm text-gray-700">{unit}</span>
                            </label>
                            {isCustom && (
                                <button onClick={() => removeCustomOrgUnit(unit)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full ml-2">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
             <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Add a custom unit (e.g., Marketing)"
                    value={newOrgUnitInput}
                    onChange={(e) => setNewOrgUnitInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomOrgUnit(); } }}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                    onClick={addCustomOrgUnit}
                    className="px-4 py-2 bg-slate-500 text-white hover:bg-slate-900 rounded-md text-sm font-semibold transition-colors shrink-0"
                >
                    Add Unit
                </button>
            </div>
        </div>
        
        <div className='mb-8 px-8'>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                Physical Locations in Scope*
                <QSenseiComponent title={HELP_CONTENT.locations.title} content={HELP_CONTENT.locations.content} />
            </label>
            <div className="space-y-2 mt-2">
                {orgData.physicalLocations.map((location, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="e.g., Noida Head Office or AWS Data Center (ap-south-1)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={location}
                            onChange={(e) => handleLocationChange(index, e.target.value)}
                        />
                        {orgData.physicalLocations.length > 1 && (
                             <button onClick={() => removeLocation(index)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full shrink-0">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={addLocation} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-3">
                <PlusCircle className="w-4 h-4" />
                Add another location
            </button>
        </div>

        <div className='px-8 mb-8 border-t border-gray-300 pt-6'>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                Technologies & Infrastructure in Scope*
                <QSenseiComponent title={HELP_CONTENT.technologies.title} content={HELP_CONTENT.technologies.content} />
            </label>
            <p className="text-xs text-slate-500 mb-2">Type a technology and press Enter or Comma to add it as a tag.</p>
            <div className="p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                <div className="flex flex-wrap gap-2 items-center">
                    {orgData.technologies.map(tag => <TagComponent key={tag} label={tag} onRemove={() => removeTag(tag)} />)}
                    <input
                        type="text"
                        placeholder="e.g., AWS, Kubernetes, Slack..."
                        onKeyDown={handleTagInputChange}
                        className="flex-grow p-1 focus:outline-none bg-transparent min-w-[150px]"
                    />
                </div>
            </div>
        </div>
        
        <div className='px-8 mb-8 border-t border-gray-300 pt-6'>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-1">
                Exclusions from Scope (Optional)
                <QSenseiComponent title={HELP_CONTENT.exclusions.title} content={HELP_CONTENT.exclusions.content} />
            </label>
            <p className="text-xs text-slate-500 mb-2">Clearly define any systems, locations, or processes that are explicitly out of scope.</p>
             <div className="space-y-2">
                {orgData.exclusions.map((exclusion, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="e.g., The marketing website is excluded"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={exclusion}
                            onChange={(e) => handleExclusionChange(index, e.target.value)}
                        />
                         {(orgData.exclusions.length > 1 || (orgData.exclusions.length === 1 && orgData.exclusions[0] !== '')) && (
                            <button onClick={() => removeExclusion(index)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full shrink-0">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={addExclusion} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-3">
                <PlusCircle className="w-4 h-4" />
                Add another exclusion
            </button>
        </div>
    </FormSection>
);

