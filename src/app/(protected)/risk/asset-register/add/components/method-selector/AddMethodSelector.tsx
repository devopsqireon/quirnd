// File: /app/risk/asset-register/add/components/method-selector/AddMethodSelector.tsx
'use client'

import React from 'react';
import { Plus, Upload, Calendar, Users, Building2, Sparkles } from 'lucide-react';
import { AddMethod } from '../../types';
import { MethodCard } from './MethodCard';
import { FeatureComparison } from './FeatureComparison';
import { GettingStartedTips } from './GettingStartedTips';

interface AddMethodSelectorProps {
    onSelectMethod: (method: AddMethod) => void;
}

export const AddMethodSelector: React.FC<AddMethodSelectorProps> = ({ onSelectMethod }) => {
    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Add Assets to Your Register</h1>
                <p className="text-xl text-slate-600 mb-6">
                    Choose the method that works best for your workflow
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
                    <Sparkles size={16} />
                    Enhanced with vendor/owner management and smart validation
                </div>
            </div>

            {/* Method Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <MethodCard
                    method="manual"
                    icon={<Plus className="w-8 h-8 text-blue-600 mx-auto mt-1" />}
                    title="Manual Entry"
                    description="Add individual assets with our smart, guided form that includes vendor and owner management"
                    features={[
                        { icon: <Users size={14} />, text: "Owner search & add" },
                        { icon: <Building2 size={14} />, text: "Vendor management" },
                        { icon: <Calendar size={14} />, text: "Date picker fields" }
                    ]}
                    bestFor="Best for: Individual assets with detailed info"
                    onClick={() => onSelectMethod('manual')}
                    colorClass="blue"
                />

                <MethodCard
                    method="import"
                    icon={<Upload className="w-8 h-8 text-green-600 mx-auto mt-1" />}
                    title="CSV Import"
                    description="Upload a spreadsheet with intelligent column mapping, vendor/owner validation, and date processing"
                    features={[
                        { icon: <span>•</span>, text: "Smart column mapping" },
                        { icon: <span>•</span>, text: "Vendor/owner validation" },
                        { icon: <span>•</span>, text: "Date format detection" },
                        { icon: <span>•</span>, text: "Data quality checks" }
                    ]}
                    bestFor="Best for: Bulk uploads (10-1000+ assets)"
                    onClick={() => onSelectMethod('import')}
                    colorClass="green"
                />

                <MethodCard
                    method="integration"
                    icon={<Building2 className="w-8 h-8 text-purple-600 mx-auto mt-1" />}
                    title="System Integration"
                    description="Connect with existing systems to automatically discover assets with vendor and ownership data"
                    features={[
                        { icon: <span>•</span>, text: "6+ integrations available" },
                        { icon: <span>•</span>, text: "Auto vendor detection" },
                        { icon: <span>•</span>, text: "Owner mapping from AD" },
                        { icon: <span>•</span>, text: "Real-time synchronization" }
                    ]}
                    bestFor="Coming Soon"
                    onClick={() => onSelectMethod('integration')}
                    colorClass="purple"
                />
            </div>

            {/* Enhanced Features Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">
                    New Enhanced Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                            <Users size={24} className="text-blue-600 mx-auto mt-1.5" />
                        </div>
                        <h4 className="font-medium text-slate-900 mb-2">Owner Management</h4>
                        <p className="text-sm text-slate-600">
                            Search, add, and edit asset owners on the fly with department and role tracking
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                            <Building2 size={24} className="text-green-600 mx-auto mt-1.5" />
                        </div>
                        <h4 className="font-medium text-slate-900 mb-2">Vendor Database</h4>
                        <p className="text-sm text-slate-600">
                            Maintain a comprehensive vendor directory with contact info and categories
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                            <Calendar size={24} className="text-purple-600 mx-auto mt-1.5" />
                        </div>
                        <h4 className="font-medium text-slate-900 mb-2">Date Management</h4>
                        <p className="text-sm text-slate-600">
                            Proper date fields for acquisition dates with calendar picker interface
                        </p>
                    </div>
                </div>
            </div>

            <FeatureComparison />
            <GettingStartedTips />
        </div>
    );
};