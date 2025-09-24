// File: /app/risk/asset-register/edit/[assetId]/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertTriangle, Eye, History, RotateCcw } from 'lucide-react';
import { Asset } from '../../view/types';
import { EditAssetFormData } from '../types';
import { mockAsset } from '../../view/data/mockAsset';
import { transformAssetToEditForm, transformEditFormToAsset } from '../utils/assetDataTransformer';
import { EditHeader } from '../components/EditHeader';
import { ChangesSummary } from '../components/ChangesSummary';
import { EditAssetWizard } from '../components/EditAssetWizard';

const EditAssetPage = () => {
    const params = useParams();
    const router = useRouter();
    const [asset, setAsset] = useState<Asset | null>(null);
    const [editFormData, setEditFormData] = useState<EditAssetFormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showChangesSummary, setShowChangesSummary] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        const fetchAsset = async () => {
            try {
                setLoading(true);
                // In a real app, this would be an API call
                // const response = await fetch(`/api/assets/${params.assetId}`);
                // const assetData = await response.json();
                
                if (params.assetId === mockAsset.assetId) {
                    setAsset(mockAsset);
                    const formData = transformAssetToEditForm(mockAsset);
                    setEditFormData(formData);
                } else {
                    setAsset(null);
                    setEditFormData(null);
                }
            } catch (error) {
                console.error('Error fetching asset:', error);
                setAsset(null);
                setEditFormData(null);
            } finally {
                setLoading(false);
            }
        };

        if (params.assetId) {
            fetchAsset();
        }
    }, [params.assetId]);

    const handleSave = async (formData: EditAssetFormData, hasChanges: boolean) => {
        if (!hasChanges) {
            router.push(`/risk/asset-register/view/${asset?.assetId}`);
            return;
        }

        try {
            setSaving(true);
            
            // Transform form data back to asset format
            const updatedAsset = transformEditFormToAsset(formData);
            
            // Add history entry
            const historyEntry = {
                date: new Date().toISOString(),
                user: 'Current User', // In real app, get from auth context
                action: 'Updated asset details via edit wizard'
            };
            
            updatedAsset.history = [...(asset?.history || []), historyEntry];
            
            // In a real app, this would be an API call
            // const response = await fetch(`/api/assets/${asset?.assetId}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(updatedAsset)
            // });
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Asset updated successfully!');
            router.push(`/risk/asset-register/view/${asset?.assetId}`);
            
        } catch (error) {
            console.error('Error saving asset:', error);
            alert('Error saving asset. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (hasUnsavedChanges) {
            if (confirm('You have unsaved changes. Are you sure you want to leave without saving?')) {
                router.push(`/risk/asset-register/view/${asset?.assetId}`);
            }
        } else {
            router.push(`/risk/asset-register/view/${asset?.assetId}`);
        }
    };

    const handleViewAsset = () => {
        if (hasUnsavedChanges) {
            if (confirm('You have unsaved changes. Are you sure you want to leave without saving?')) {
                router.push(`/risk/asset-register/view/${asset?.assetId}`);
            }
        } else {
            router.push(`/risk/asset-register/view/${asset?.assetId}`);
        }
    };

    const handleViewHistory = () => {
        router.push(`/risk/asset-register/view/${asset?.assetId}?tab=history`);
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all changes? This cannot be undone.')) {
            if (asset) {
                const resetFormData = transformAssetToEditForm(asset);
                setEditFormData(resetFormData);
                setHasUnsavedChanges(false);
                setShowChangesSummary(false);
            }
        }
    };

    const handleBack = () => {
        router.push('/risk/asset-register');
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-slate-600">Loading asset data...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (!asset || !editFormData) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Asset Not Found</h1>
                    <p className="text-slate-600 mb-4">
                        The asset with ID "{params.assetId}" could not be found or loaded for editing.
                    </p>
                    <button
                        onClick={handleBack}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Asset Register
                    </button>
                </div>
            </div>
        );
    }

    // Saving state overlay
    if (saving) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 shadow-xl">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-lg text-slate-600">Saving changes...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <EditHeader
                    assetName={asset.name}
                    assetId={asset.assetId}
                    hasChanges={hasUnsavedChanges}
                    onBack={handleBack}
                    onSave={() => handleSave(editFormData, hasUnsavedChanges)}
                    onReset={handleReset}
                    onViewAsset={handleViewAsset}
                    onViewHistory={handleViewHistory}
                />

                {/* Toggle Changes Summary */}
                {hasUnsavedChanges && (
                    <div className="mb-4">
                        <button
                            onClick={() => setShowChangesSummary(!showChangesSummary)}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
                        >
                            <Eye size={14} />
                            {showChangesSummary ? 'Hide' : 'Show'} Changes Summary
                        </button>
                    </div>
                )}

                <ChangesSummary
                    currentData={editFormData}
                    originalData={transformAssetToEditForm(asset)}
                    isVisible={showChangesSummary}
                />

                <EditAssetWizard
                    initialData={editFormData}
                    onSave={(data, hasChanges) => {
                        setEditFormData(data);
                        setHasUnsavedChanges(hasChanges);
                        handleSave(data, hasChanges);
                    }}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default EditAssetPage;