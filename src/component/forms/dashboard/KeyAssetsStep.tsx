import React from 'react';
import { X } from 'lucide-react';

// The main component file will define these types and components
type OrganizationData = any;
const FormSection: React.FC<any> = ({ children }) => <div>{children}</div>;

const AssetSection: React.FC<{
    field: 'informationAssets' | 'hardwareAssets' | 'softwareAssets';
    title: React.ReactNode;
    allAssets: string[];
    selectedAssets: string[];
    predefinedAssets: string[];
    newAssetInput: string;
    setNewAssetInput: (value: string) => void;
    addCustomAsset: () => void;
    removeCustomAsset: (asset: string) => void;
    handleMultiSelectChange: (field: keyof OrganizationData, value: string) => void;
}> = ({
    field, title, allAssets, selectedAssets, predefinedAssets,
    newAssetInput, setNewAssetInput, addCustomAsset, removeCustomAsset,
    handleMultiSelectChange
}) => {
    return (
        <div>
            <label className="flex items-center text-sm font-bold text-gray-700 mb-4">{title}</label>
            <div className="space-y-2">
                {allAssets.map(asset => {
                    const isCustom = !predefinedAssets.includes(asset);
                    return (
                        <div key={asset} className="flex items-center p-3 border bg-white border-gray-300 rounded-md">
                            <label className="flex items-center flex-grow cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={selectedAssets.includes(asset)}
                                    onChange={() => handleMultiSelectChange(field, asset)}
                                />
                                <span className="ml-3 text-sm text-gray-700">{asset}</span>
                            </label>
                            {isCustom && (
                                <button onClick={() => removeCustomAsset(asset)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full ml-2">
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
                    placeholder="Add a custom asset"
                    value={newAssetInput}
                    onChange={(e) => setNewAssetInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomAsset(); } }}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                    onClick={addCustomAsset}
                    className="px-4 py-2 bg-slate-500 text-white hover:bg-slate-900 rounded-md text-sm font-semibold transition-colors shrink-0"
                >
                    Add Asset
                </button>
            </div>
        </div>
    )
}


export const KeyAssetsStep: React.FC<{
    orgData: OrganizationData;
    handleMultiSelectChange: (field: keyof OrganizationData, value: string) => void;
    PREDEFINED_OPTIONS: any;
    QSenseiComponent: React.ElementType;
    HELP_CONTENT: any;
    allInformationAssets: string[];
    newInfoAssetInput: string;
    setNewInfoAssetInput: (value: string) => void;
    addCustomInfoAsset: () => void;
    removeCustomInfoAsset: (asset: string) => void;
    allHardwareAssets: string[];
    newHardwareAssetInput: string;
    setNewHardwareAssetInput: (value: string) => void;
    addCustomHardwareAsset: () => void;
    removeCustomHardwareAsset: (asset: string) => void;
    allSoftwareAssets: string[];
    newSoftwareAssetInput: string;
    setNewSoftwareAssetInput: (value: string) => void;
    addCustomSoftwareAsset: () => void;
    removeCustomSoftwareAsset: (asset: string) => void;
}> = ({
    orgData, handleMultiSelectChange, PREDEFINED_OPTIONS, QSenseiComponent, HELP_CONTENT,
    allInformationAssets, newInfoAssetInput, setNewInfoAssetInput, addCustomInfoAsset, removeCustomInfoAsset,
    allHardwareAssets, newHardwareAssetInput, setNewHardwareAssetInput, addCustomHardwareAsset, removeCustomHardwareAsset,
    allSoftwareAssets, newSoftwareAssetInput, setNewSoftwareAssetInput, addCustomSoftwareAsset, removeCustomSoftwareAsset
}) => (
    <FormSection>
       <div className='px-8 mb-8'>
            <AssetSection
                field="informationAssets"
                title={<>Information Assets* <QSenseiComponent title={HELP_CONTENT.infoAssets.title} content={HELP_CONTENT.infoAssets.content} /></>}
                allAssets={allInformationAssets}
                selectedAssets={orgData.informationAssets}
                predefinedAssets={PREDEFINED_OPTIONS.informationAssets}
                newAssetInput={newInfoAssetInput}
                setNewAssetInput={setNewInfoAssetInput}
                addCustomAsset={addCustomInfoAsset}
                removeCustomAsset={removeCustomInfoAsset}
                handleMultiSelectChange={handleMultiSelectChange}
            />
       </div>
        
       <div className='px-8 py-8 mb-8 border-t border-b border-gray-300 bg-blue-50'>
            <AssetSection
                field="hardwareAssets"
                title={<>Hardware Assets* <QSenseiComponent title={HELP_CONTENT.hardwareAssets.title} content={HELP_CONTENT.hardwareAssets.content} /></>}
                allAssets={allHardwareAssets}
                selectedAssets={orgData.hardwareAssets}
                predefinedAssets={PREDEFINED_OPTIONS.hardwareAssets}
                newAssetInput={newHardwareAssetInput}
                setNewAssetInput={setNewHardwareAssetInput}
                addCustomAsset={addCustomHardwareAsset}
                removeCustomAsset={removeCustomHardwareAsset}
                handleMultiSelectChange={handleMultiSelectChange}
            />
       </div>
        
       <div className='px-8 mb-8'>
            <AssetSection
                field="softwareAssets"
                title={<>Software Assets* <QSenseiComponent title={HELP_CONTENT.softwareAssets.title} content={HELP_CONTENT.softwareAssets.content} /></>}
                allAssets={allSoftwareAssets}
                selectedAssets={orgData.softwareAssets}
                predefinedAssets={PREDEFINED_OPTIONS.softwareAssets}
                newAssetInput={newSoftwareAssetInput}
                setNewAssetInput={setNewSoftwareAssetInput}
                addCustomAsset={addCustomSoftwareAsset}
                removeCustomAsset={removeCustomSoftwareAsset}
                handleMultiSelectChange={handleMultiSelectChange}
            />
       </div>
    </FormSection>
);

