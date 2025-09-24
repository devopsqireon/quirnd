'use client'

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AddMethod } from './types';
import { EnhancedAssetWizard } from './enhanced-wizard-integration';
import { EnhancedCSVImportWizard } from './enhanced-csv-import';
import { AddMethodSelector } from './components/method-selector/AddMethodSelector';

const EnhancedAddAssetPage = () => {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState<AddMethod>(null);

    const handleAssetSaved = useCallback((data: any) => {
        console.log('Enhanced Asset saved:', data);
        alert('Asset created successfully with enhanced fields!');
        router.push('/risk/asset-register');
    }, [router]);

    const handleImportComplete = useCallback((assets: any[]) => {
        console.log('Assets imported:', assets);
        alert(`Successfully imported ${assets.length} assets!`);
        router.push('/risk/asset-register');
    }, [router]);

    const handleBack = useCallback(() => {
        if (selectedMethod) {
            setSelectedMethod(null);
        } else {
            router.push('/risk/asset-register');
        }
    }, [selectedMethod, router]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium mb-4"
                    >
                        <ArrowLeft size={16} />
                        {selectedMethod ? 'Back to Methods' : 'Back to Asset Register'}
                    </button>

                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <span>Risk Management</span>
                        <span>/</span>
                        <span>Asset Register</span>
                        <span>/</span>
                        <span className="text-slate-900 font-medium">
                            {selectedMethod === 'manual' ? 'Enhanced Manual Entry' :
                             selectedMethod === 'import' ? 'CSV Import' :
                             selectedMethod === 'integration' ? 'System Integration' :
                             'Add Assets'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {!selectedMethod && (
                    <AddMethodSelector onSelectMethod={setSelectedMethod} />
                )}

                {selectedMethod === 'manual' && (
                    <EnhancedAssetWizard
                        onSave={handleAssetSaved}
                        onCancel={() => setSelectedMethod(null)}
                    />
                )}

                {selectedMethod === 'import' && (
                    <EnhancedCSVImportWizard
                        onImportComplete={handleImportComplete}
                        onCancel={() => setSelectedMethod(null)}
                    />
                )}

                {selectedMethod === 'integration' && (
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">System Integration</h2>
                        <p className="text-slate-600 mb-6">Coming soon...</p>
                        <button
                            onClick={() => setSelectedMethod(null)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Choose Another Method
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedAddAssetPage;