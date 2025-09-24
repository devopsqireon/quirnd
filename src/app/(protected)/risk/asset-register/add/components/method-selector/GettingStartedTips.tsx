// File: /app/risk/asset-register/add/components/method-selector/GettingStartedTips.tsx
'use client'

import React from 'react';

export const GettingStartedTips: React.FC = () => {
    return (
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h4 className="font-medium text-amber-900 mb-3">💡 Getting Started Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-800">
                <div>
                    <strong>For Manual Entry:</strong>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                        <li>Start with critical assets first</li>
                        <li>Have vendor contact info ready</li>
                        <li>Know your asset owners and departments</li>
                    </ul>
                </div>
                <div>
                    <strong>For CSV Import:</strong>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                        <li>Download the template first</li>
                        <li>Use YYYY-MM-DD for dates</li>
                        <li>Include full vendor names</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};