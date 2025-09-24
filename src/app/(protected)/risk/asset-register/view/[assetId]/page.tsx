// File: /app/risk/asset-register/view/[assetId]/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FileText, AlertTriangle, Shield, History } from 'lucide-react';
import { Asset } from '../types';
import { mockAsset } from '../data/mockAsset';
import { AssetHeader } from '../components/AssetHeader';
import { SummaryCards } from '../components/SummaryCards';
import { TabNavigation } from '../components/TabNavigation';
import { DetailsTab } from '../components/tabs/DetailsTab';
import { RiskSecurityTab } from '../components/tabs/RiskSecurityTab';
import { ComplianceTab } from '../components/tabs/ComplianceTab';
import { HistoryTab } from '../components/tabs/HistoryTab';

const AssetDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [asset, setAsset] = useState<Asset | null>(null);
    const [activeTab, setActiveTab] = useState('details');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to fetch asset data
        const fetchAsset = async () => {
            try {
                setLoading(true);
                // In a real app, this would be an API call
                // const response = await fetch(`/api/assets/${params.assetId}`);
                // const assetData = await response.json();
                
                // For demo purposes, using mock data
                if (params.assetId === mockAsset.assetId) {
                    setAsset(mockAsset);
                } else {
                    setAsset(null);
                }
            } catch (error) {
                console.error('Error fetching asset:', error);
                setAsset(null);
            } finally {
                setLoading(false);
            }
        };

        if (params.assetId) {
            fetchAsset();
        }
    }, [params.assetId]);

    const handleEdit = () => {
        router.push(`/risk/asset-register/add?edit=${asset?.assetId}`);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
            // In a real app, this would be an API call
            alert('Asset deleted successfully (demo)');
            router.push('/risk/asset-register');
        }
    };

    const handleBack = () => {
        router.push('/risk/asset-register');
    };

    // Tab configuration with counts
    const tabs = [
        { 
            id: 'details', 
            name: 'Details', 
            icon: FileText 
        },
        { 
            id: 'risk', 
            name: 'Risk & Security', 
            icon: AlertTriangle,
            count: asset?.associatedRisks?.length || 0
        },
        { 
            id: 'compliance', 
            name: 'Compliance', 
            icon: Shield,
            count: asset?.complianceItems?.filter(item => item.checked).length || 0
        },
        { 
            id: 'history', 
            name: 'History', 
            icon: History,
            count: asset?.history?.length || 0
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-slate-600">Loading asset details...</p>
                </div>
            </div>
        );
    }

    if (!asset) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-50">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Asset Not Found</h1>
                    <p className="text-slate-600 mb-4">
                        The asset with ID "{params.assetId}" could not be found.
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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'details':
                return <DetailsTab asset={asset} />;
            case 'risk':
                return <RiskSecurityTab asset={asset} />;
            case 'compliance':
                return <ComplianceTab asset={asset} />;
            case 'history':
                return <HistoryTab asset={asset} />;
            default:
                return <DetailsTab asset={asset} />;
        }
    };

    return (
        <div className="bg-slate-50 font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <AssetHeader 
                    asset={asset}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onBack={handleBack}
                />
                
                <SummaryCards asset={asset} />
                
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <TabNavigation 
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <div className="px-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetDetailPage;