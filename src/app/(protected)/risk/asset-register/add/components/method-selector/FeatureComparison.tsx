// File: /app/risk/asset-register/add/components/method-selector/FeatureComparison.tsx
'use client'

import React from 'react';

export const FeatureComparison: React.FC = () => {
    return (
        <div className="bg-slate-50 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">
                Quick Comparison
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="text-left py-3 text-slate-600 font-medium">Feature</th>
                            <th className="text-center py-3 text-blue-600 font-medium">Manual</th>
                            <th className="text-center py-3 text-green-600 font-medium">CSV Import</th>
                            <th className="text-center py-3 text-purple-600 font-medium">Integration</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600">
                        <tr className="border-b border-slate-200">
                            <td className="py-3">Setup Time</td>
                            <td className="text-center">Immediate</td>
                            <td className="text-center">5 minutes</td>
                            <td className="text-center">15-30 minutes</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                            <td className="py-3">Asset Volume</td>
                            <td className="text-center">1 at a time</td>
                            <td className="text-center">10-1000+</td>
                            <td className="text-center">Unlimited</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                            <td className="py-3">Vendor Management</td>
                            <td className="text-center">✓ Full</td>
                            <td className="text-center">✓ Import</td>
                            <td className="text-center">✓ Auto-detect</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                            <td className="py-3">Owner Management</td>
                            <td className="text-center">✓ Full</td>
                            <td className="text-center">✓ Import</td>
                            <td className="text-center">✓ AD Sync</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                            <td className="py-3">Date Handling</td>
                            <td className="text-center">Date Picker</td>
                            <td className="text-center">Auto Format</td>
                            <td className="text-center">System Data</td>
                        </tr>
                        <tr>
                            <td className="py-3">Ongoing Maintenance</td>
                            <td className="text-center">Manual</td>
                            <td className="text-center">Manual</td>
                            <td className="text-center">Automatic</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};