'use client'

import React, { useState, useEffect } from 'react';
import { Plus, Upload, Link as LinkIcon, FileText, ArrowRight, X, AlertTriangle, Lightbulb, RotateCcw, Trash2 } from 'lucide-react';
import { Asset, CiaValue } from '@/types/asset';
import { ASSET_TYPES, CLASSIFICATIONS, CIA_RATINGS, CIA_RATING_LABELS, STATUSES, calculateAssetValue } from '@/constants/assets';

// --- PROPS INTERFACE FOR THE MAIN WRAPPER ---
interface AssetModalsProps {
    isAddModalOpen: boolean;
    closeAddModal: () => void;
    onSaveAsset: (asset: Asset) => void;
    isEditModalOpen: boolean;
    closeEditModal: () => void;
    onUpdateAsset: (asset: Asset) => void;
    assetToEdit: Asset | null;
    isAddOwnerModalOpen: boolean;
    closeAddOwnerModal: () => void;
    onSaveOwner: (owner: string) => void;
    isDeleteModalOpen: boolean;
    closeDeleteModal: () => void;
    onConfirmDelete: () => void;
    assetToDelete: Asset | null;
    isPermanentDelete: boolean;
    isImportModalOpen: boolean;
    closeImportModal: () => void;
    isSyncModalOpen: boolean;
    closeSyncModal: () => void;
    isOptionsModalOpen: boolean;
    closeOptionsModal: () => void;
    onAddManually: () => void;
    onImport: () => void;
    onSync: () => void;
    assetOwners: string[];
    onAddNewOwner: () => void;
}

// --- MAIN WRAPPER COMPONENT ---
export const AssetModals: React.FC<AssetModalsProps> = (props) => {
    return (
        <>
            <AddOptionsModal 
                isOpen={props.isOptionsModalOpen} 
                onClose={props.closeOptionsModal}
                onAddManually={props.onAddManually}
                onImport={props.onImport}
                onSync={props.onSync}
            />
            <EditAssetModal
                isOpen={props.isEditModalOpen}
                onClose={props.closeEditModal}
                onSave={props.onUpdateAsset}
                assetToEdit={props.assetToEdit}
                assetOwners={props.assetOwners}
                onAddNewOwner={props.onAddNewOwner}
            />
            <AddOwnerModal 
                isOpen={props.isAddOwnerModalOpen}
                onClose={props.closeAddOwnerModal}
                onSave={props.onSaveOwner}
            />
            <DeleteConfirmationModal
                isOpen={props.isDeleteModalOpen}
                onClose={props.closeDeleteModal}
                onConfirm={props.onConfirmDelete}
                assetName={props.assetToDelete?.name || ''}
                isPermanent={props.isPermanentDelete}
            />
            <ImportWizardModal 
                isOpen={props.isImportModalOpen}
                onClose={props.closeImportModal}
            />
            <SyncAppsModal 
                isOpen={props.isSyncModalOpen}
                onClose={props.closeSyncModal}
            />
        </>
    );
};


// --- INDIVIDUAL MODAL COMPONENTS (UNCHANGED) ---

const DeleteConfirmationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    assetName: string;
    isPermanent: boolean;
}> = ({ isOpen, onClose, onConfirm, assetName, isPermanent }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex items-start gap-4">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-0 text-left">
                        <h3 className="text-lg leading-6 font-semibold text-gray-900">
                            {isPermanent ? 'Permanently Delete Asset' : 'Delete Asset'}
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to {isPermanent ? 'permanently delete' : 'move'} the asset <strong className="text-slate-800">{assetName}</strong> {isPermanent ? '' : 'to the trash'}?
                                {isPermanent && <span className="font-bold block mt-2">This action cannot be undone.</span>}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

const AddOwnerModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (newOwner: string) => void;
}> = ({ isOpen, onClose, onSave }) => {
    const [ownerName, setOwnerName] = useState('');
    const handleSave = () => {
        if (ownerName.trim()) {
            onSave(ownerName.trim());
            setOwnerName('');
            onClose();
        } else {
            alert('Please enter a name for the owner.');
        }
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Add New Asset Owner</h2>
                <p className="text-sm text-slate-500 mb-4">This will add the person to the master list of owners.</p>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name*</label>
                    <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md" placeholder="e.g., Anjali Mehta" />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="text-sm font-semibold text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Save Owner</button>
                </div>
            </div>
        </div>
    );
};

const EditAssetModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedAsset: Asset) => void;
    assetToEdit: Asset | null;
    assetOwners: string[];
    onAddNewOwner: () => void;
}> = ({ isOpen, onClose, onSave, assetToEdit, assetOwners, onAddNewOwner }) => {
    const [editedAsset, setEditedAsset] = useState<Asset | null>(assetToEdit);
    
    useEffect(() => {
        setEditedAsset(assetToEdit);
    }, [assetToEdit]);

    const handleChange = (field: keyof Omit<Asset, 'id' | 'assetValue'>, value: string | number) => {
        if (editedAsset) {
            setEditedAsset({ ...editedAsset, [field]: value as CiaValue });
        }
    };

    const handleQ_senseiSuggest = () => {
        if (!editedAsset) return;
        const fullText = `${editedAsset.name} ${editedAsset.description}`.toLowerCase();
        let c: CiaValue = 3, i: CiaValue = 3, a: CiaValue = 3;
        if (fullText.includes('pii') || fullText.includes('confidential') || fullText.includes('financial') || fullText.includes('source code')) c = 5;
        if (fullText.includes('database') || fullText.includes('transactional') || fullText.includes('records')) i = 5;
        if (fullText.includes('production') || fullText.includes('server') || fullText.includes('firewall')) a = 5;
        setEditedAsset(prev => prev ? { ...prev, confidentiality: c, integrity: i, availability: a } : null);
    };

    const handleSave = () => {
        if (!editedAsset) return;
        if (!editedAsset.name || !editedAsset.assetType || !editedAsset.owner || editedAsset.confidentiality === 0 || editedAsset.integrity === 0 || editedAsset.availability === 0 || !editedAsset.status) {
            alert('Please fill in all required fields.');
            return;
        }
        const finalAsset: Asset = {
            ...editedAsset,
            assetValue: calculateAssetValue(editedAsset.confidentiality, editedAsset.integrity, editedAsset.availability)
        };
        onSave(finalAsset);
        onClose();
    };

    if (!isOpen || !editedAsset) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Edit Asset: {assetToEdit?.id}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Your full edit form content goes here */}
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="text-sm font-semibold text-slate-700 hover:bg-slate-200 px-4 py-2 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

const ImportWizardModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-slate-800">Import Assets from CSV/Excel</h2>
                    <button onClick={onClose}><X className="text-slate-500 hover:text-slate-800" /></button>
                </div>
                {step === 1 && (
                    <div>
                        <p className="text-slate-600 mb-4">Download our template to ensure your data is formatted correctly for a smooth import.</p>
                        <a href="#" className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 mb-6">
                            <FileText size={20} /> Download Template (.csv)
                        </a>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                            <Upload size={40} className="mx-auto text-slate-400 mb-2" />
                            <label htmlFor="file-upload" className="font-semibold text-blue-600 cursor-pointer hover:underline">{file ? file.name : 'Click to upload a file'}</label>
                            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".csv, .xlsx, .xls" />
                            <p className="text-xs text-slate-500 mt-1">XLSX or CSV up to 10MB</p>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button onClick={() => setStep(2)} disabled={!file} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-400">
                                Next <ArrowRight size={16} className="inline-block ml-1" />
                            </button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <p className="text-slate-600 mb-4">Map the columns from your file to the fields in Qireon.</p>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4 items-center"><span className="font-semibold text-slate-700">Your Column</span> <span/> <span className="font-semibold text-slate-700">Qireon Field</span></div>
                            <div className="grid grid-cols-3 gap-4 items-center p-2 bg-slate-50 rounded"><span>Device Name</span> <ArrowRight className="text-slate-400 mx-auto" /> <span>Asset Name</span></div>
                            <div className="grid grid-cols-3 gap-4 items-center p-2 bg-slate-50 rounded"><span>Assigned To</span> <ArrowRight className="text-slate-400 mx-auto" /> <span>Asset Owner</span></div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button onClick={() => setStep(1)} className="text-sm font-semibold text-slate-700">Back</button>
                            <button onClick={() => { alert('Import Confirmed!'); onClose(); }} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">Confirm Import</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
const SyncAppsModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    const apps = [{ name: 'Microsoft Intune', icon: '捗' }, { name: 'Jamf', icon: '刻' }, { name: 'AWS', icon: '笘ｸ' }, { name: 'Google Workspace', icon: '' }, { name: 'Azure', icon: '塙' }];
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">Sync Assets from Applications</h2>
                    <button onClick={onClose}><X className="text-slate-500 hover:text-slate-800" /></button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {apps.map(app => (
                        <div key={app.name} className="p-4 border border-slate-200 rounded-lg text-center hover:shadow-md hover:border-blue-500 transition-all">
                            <div className="text-4xl mb-2">{app.icon}</div>
                            <p className="font-semibold text-slate-700">{app.name}</p>
                            <button className="mt-3 bg-blue-50 text-blue-700 font-semibold px-4 py-1 rounded-full text-sm hover:bg-blue-100">Connect</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const AddOptionsModal: React.FC<{ isOpen: boolean; onClose: () => void; onAddManually: () => void; onImport: () => void; onSync: () => void; }> = ({ isOpen, onClose, onAddManually, onImport, onSync }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-slate-800">How would you like to add assets?</h2>
                    <button onClick={onClose}><X className="text-slate-500 hover:text-slate-800" /></button>
                </div>
                <div className="space-y-4">
                    <button onClick={onAddManually} className="w-full flex items-center gap-3 text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-500">
                        <Plus className="w-6 h-6 text-blue-600" />
                        <div><p className="font-semibold text-slate-800">Add Asset Manually</p><p className="text-sm text-slate-500">Add a single asset using a detailed form.</p></div>
                    </button>
                    <button onClick={onImport} className="w-full flex items-center gap-3 text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-500">
                        <Upload className="w-6 h-6 text-blue-600" />
                        <div><p className="font-semibold text-slate-800">Import from Excel/CSV</p><p className="text-sm text-slate-500">Bulk upload multiple assets.</p></div>
                    </button>
                    <button onClick={onSync} className="w-full flex items-center gap-3 text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-500">
                        <LinkIcon className="w-6 h-6 text-blue-600" />
                        <div><p className="font-semibold text-slate-800">Sync from Applications</p><p className="text-sm text-slate-500">Automatically discover assets.</p></div>
                    </button>
                </div>
            </div>
        </div>
    );
};