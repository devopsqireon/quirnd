// File: /app/policy-management/create/components/sections/AccessibilitySection.tsx

import React, { useState } from 'react';
import { AccessibilityCheck } from '../../types/policy-create.types';

const mockAccessibilityChecks: AccessibilityCheck[] = [
    {
        id: '1',
        name: 'Heading structure is properly organized',
        status: 'passed',
        message: 'Document follows proper heading hierarchy'
    },
    {
        id: '2',
        name: 'Some images missing alt text descriptions',
        status: 'warning',
        message: 'Found 2 images without alt text'
    },
    {
        id: '3',
        name: 'Color contrast meets WCAG standards',
        status: 'passed',
        message: 'All text meets AA contrast requirements'
    }
];

export const AccessibilitySection: React.FC = () => {
    const [checks, setChecks] = useState(mockAccessibilityChecks);
    const [isScanning, setIsScanning] = useState(false);

    const handleFullScan = async () => {
        setIsScanning(true);
        // Simulate scanning
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsScanning(false);
    };

    const getStatusIcon = (status: AccessibilityCheck['status']) => {
        switch (status) {
            case 'passed':
                return 'fa-solid fa-check-circle text-green-600';
            case 'warning':
                return 'fa-solid fa-exclamation-triangle text-yellow-600';
            case 'failed':
                return 'fa-solid fa-times-circle text-red-600';
            default:
                return 'fa-solid fa-circle text-gray-400';
        }
    };

    const getStatusText = (status: AccessibilityCheck['status']) => {
        switch (status) {
            case 'passed':
                return 'Passed';
            case 'warning':
                return 'Warning';
            case 'failed':
                return 'Failed';
            default:
                return 'Unknown';
        }
    };

    const getStatusColor = (status: AccessibilityCheck['status']) => {
        switch (status) {
            case 'passed':
                return 'text-green-600';
            case 'warning':
                return 'text-yellow-600';
            case 'failed':
                return 'text-red-600';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <section className="mb-8">
            <div className="border border-orange-300 rounded-xl p-6 bg-orange-50">
                <div className="flex items-center mb-4">
                    <i className="fa-solid fa-universal-access text-orange-600 mr-3 text-xl"></i>
                    <h2 className="text-xl font-semibold text-gray-900">Accessibility Compliance Check</h2>
                </div>
                
                <div className="space-y-3">
                    {checks.map((check) => (
                        <div key={check.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                            <div className="flex items-center">
                                <i className={`${getStatusIcon(check.status)} mr-3`}></i>
                                <span className="text-gray-900">{check.name}</span>
                            </div>
                            <span className={`font-medium ${getStatusColor(check.status)}`}>
                                {getStatusText(check.status)}
                            </span>
                        </div>
                    ))}
                </div>
                
                <button 
                    onClick={handleFullScan}
                    disabled={isScanning}
                    className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:bg-orange-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isScanning ? (
                        <>
                            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                            Scanning...
                        </>
                    ) : (
                        'Run Full Accessibility Scan'
                    )}
                </button>
            </div>
        </section>
    );
};