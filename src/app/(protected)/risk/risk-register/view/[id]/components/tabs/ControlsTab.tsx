// File: /app/risk/risk-register/view/[id]/components/tabs/ControlsTab.tsx

'use client'

import React, { useState } from 'react';
import { 
    Shield, 
    Plus, 
    Edit, 
    Trash2, 
    CheckCircle, 
    AlertCircle, 
    Clock,
    User,
    Calendar,
    Target,
    TrendingUp,
    FileText
} from 'lucide-react';
import { Risk, RiskControl } from '../../types';

interface ControlsTabProps {
    risk: Risk;
    onUpdateControls: (controls: RiskControl[]) => void;
}

export const ControlsTab: React.FC<ControlsTabProps> = ({ risk, onUpdateControls }) => {
    const [selectedControl, setSelectedControl] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const getControlStatusColor = (status: string) => {
        switch (status) {
            case 'Effective': return 'text-green-600 bg-green-50 border-green-200';
            case 'Partially Effective': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Ineffective': return 'text-red-600 bg-red-50 border-red-200';
            case 'Not Tested': return 'text-gray-600 bg-gray-50 border-gray-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getControlStatusIcon = (status: string) => {
        switch (status) {
            case 'Effective': return <CheckCircle className="w-4 h-4" />;
            case 'Partially Effective': return <AlertCircle className="w-4 h-4" />;
            case 'Ineffective': return <AlertCircle className="w-4 h-4" />;
            case 'Not Tested': return <Clock className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const calculateOverallEffectiveness = () => {
        if (!risk.riskControls || risk.riskControls.length === 0) return 0;
        
        const effectiveControls = risk.riskControls.filter(control => 
            control.status === 'Effective'
        ).length;
        
        return Math.round((effectiveControls / risk.riskControls.length) * 100);
    };

    return (
        <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Controls Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Risk Controls</h2>
                            <p className="text-slate-600">Manage and track controls that mitigate this risk</p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Control
                        </button>
                    </div>

                    {/* Controls Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {risk.riskControls && risk.riskControls.length > 0 ? (
                            risk.riskControls.map((control) => (
                                <div 
                                    key={control.id} 
                                    className={`bg-white rounded-lg border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        selectedControl === control.id 
                                            ? 'border-blue-300 shadow-md' 
                                            : 'border-slate-200'
                                    }`}
                                    onClick={() => setSelectedControl(
                                        selectedControl === control.id ? null : control.id
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="w-5 h-5 text-blue-600" />
                                                    <h3 className="text-lg font-semibold text-slate-900">
                                                        {control.name}
                                                    </h3>
                                                </div>
                                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getControlStatusColor(control.status)}`}>
                                                    {getControlStatusIcon(control.status)}
                                                    {control.status}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 mb-4">{control.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wide">Type</div>
                                            <div className="font-medium text-slate-900">{control.type}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wide">Frequency</div>
                                            <div className="font-medium text-slate-900">{control.frequency}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wide">Owner</div>
                                            <div className="font-medium text-slate-900">{control.owner}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wide">Effectiveness</div>
                                            <div className="font-medium text-slate-900">{control.effectiveness}%</div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {selectedControl === control.id && (
                                        <div className="mt-6 pt-6 border-t border-slate-200">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-3">Control Details</h4>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="text-xs text-slate-500 uppercase tracking-wide">Implementation Date</div>
                                                            <div className="font-medium text-slate-900">
                                                                {formatDate(control.implementationDate)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-slate-500 uppercase tracking-wide">Last Review</div>
                                                            <div className="font-medium text-slate-900">
                                                                {formatDate(control.lastReview)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-slate-500 uppercase tracking-wide">Next Review</div>
                                                            <div className="font-medium text-slate-900">
                                                                {formatDate(control.nextReview)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-3">Testing History</h4>
                                                    {control.testingHistory && control.testingHistory.length > 0 ? (
                                                        <div className="space-y-2">
                                                            {control.testingHistory.slice(0, 3).map((test, index) => (
                                                                <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                                                                    <div>
                                                                        <div className="text-sm font-medium text-slate-900">
                                                                            {test.result}
                                                                        </div>
                                                                        <div className="text-xs text-slate-500">
                                                                            {formatDate(test.date)}
                                                                        </div>
                                                                    </div>
                                                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getControlStatusColor(test.result)}`}>
                                                                        {getControlStatusIcon(test.result)}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm text-slate-500">No testing history available</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                                <Shield className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No Controls Defined</h3>
                                <p className="text-slate-600 mb-6">
                                    Start by adding controls to mitigate this risk
                                </p>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add First Control
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Controls Summary */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Controls Summary
                        </h3>
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {risk.riskControls?.length || 0}
                                </div>
                                <div className="text-sm text-slate-600">Total Controls</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {calculateOverallEffectiveness()}%
                                </div>
                                <div className="text-sm text-slate-600">Overall Effectiveness</div>
                            </div>
                        </div>
                    </div>

                    {/* Control Types */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">Control Types</h3>
                        <div className="space-y-2">
                            {['Preventive', 'Detective', 'Corrective'].map(type => {
                                const count = risk.riskControls?.filter(c => c.type === type).length || 0;
                                return (
                                    <div key={type} className="flex justify-between items-center">
                                        <span className="text-sm text-slate-600">{type}</span>
                                        <span className="text-sm font-medium text-slate-900">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Upcoming Reviews */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Upcoming Reviews
                        </h3>
                        {risk.riskControls && risk.riskControls.length > 0 ? (
                            <div className="space-y-2">
                                {risk.riskControls
                                    .filter(control => new Date(control.nextReview) > new Date())
                                    .sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime())
                                    .slice(0, 3)
                                    .map(control => (
                                        <div key={control.id} className="text-sm">
                                            <div className="font-medium text-slate-900">{control.name}</div>
                                            <div className="text-slate-500">{formatDate(control.nextReview)}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="text-sm text-slate-500">No upcoming reviews</div>
                        )}
                    </div>

                    {/* Control Performance */}
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Performance Trends
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-slate-600">Effectiveness Trend</span>
                                    <span className="text-sm font-medium text-green-600">+5%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-slate-600">Review Compliance</span>
                                    <span className="text-sm font-medium text-blue-600">85%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};