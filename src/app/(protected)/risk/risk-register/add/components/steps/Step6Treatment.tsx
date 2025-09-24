// File: /app/risk/risk-register/add/components/steps/Step6Treatment.tsx

'use client'

import React, { useState } from 'react';
import { Target, Plus, X, Calendar, User, AlertTriangle } from 'lucide-react';
import { AddRiskFormData, ValidationError } from '../../types';

interface Step6TreatmentProps {
    formData: AddRiskFormData;
    onChange: (data: Partial<AddRiskFormData>) => void;
    errors: ValidationError[];
}

const treatmentStrategies = [
    {
        value: 'Avoid',
        name: 'Risk Avoidance',
        description: 'Eliminate the risk by avoiding the activity that creates it',
        example: 'Cancel a high-risk project or discontinue a vulnerable system'
    },
    {
        value: 'Mitigate',
        name: 'Risk Mitigation',
        description: 'Reduce the likelihood or impact through controls and measures',
        example: 'Implement security controls, training, or process improvements'
    },
    {
        value: 'Transfer',
        name: 'Risk Transfer',
        description: 'Transfer the risk to a third party through insurance or contracts',
        example: 'Purchase cyber insurance or outsource to a specialized provider'
    },
    {
        value: 'Accept',
        name: 'Risk Acceptance',
        description: 'Acknowledge and accept the risk without additional action',
        example: 'Accept low-impact risks that are cost-prohibitive to mitigate'
    }
];

const priorityLevels = [
    { value: 'High', color: 'bg-red-100 text-red-800', description: 'Immediate action required' },
    { value: 'Medium', color: 'bg-yellow-100 text-yellow-800', description: 'Action needed within weeks' },
    { value: 'Low', color: 'bg-green-100 text-green-800', description: 'Action can be scheduled' }
];

const actionStatuses = [
    { value: 'Planned', color: 'bg-blue-100 text-blue-800' },
    { value: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Completed', color: 'bg-green-100 text-green-800' }
];

export const Step6Treatment: React.FC<Step6TreatmentProps> = ({
    formData,
    onChange,
    errors
}) => {
    const [newAction, setNewAction] = useState({
        action: '',
        priority: 'Medium' as const,
        dueDate: '',
        assignee: '',
        status: 'Planned' as const
    });

    const addMitigationAction = () => {
        if (newAction.action.trim()) {
            const action = {
                id: Date.now().toString(),
                ...newAction
            };
            onChange({
                mitigationActions: [...formData.mitigationActions, action]
            });
            setNewAction({
                action: '',
                priority: 'Medium',
                dueDate: '',
                assignee: '',
                status: 'Planned'
            });
        }
    };

    const removeMitigationAction = (actionId: string) => {
        onChange({
            mitigationActions: formData.mitigationActions.filter(a => a.id !== actionId)
        });
    };

    const updateMitigationAction = (actionId: string, updates: any) => {
        onChange({
            mitigationActions: formData.mitigationActions.map(a =>
                a.id === actionId ? { ...a, ...updates } : a
            )
        });
    };

    const getFieldError = (fieldName: string) => {
        return errors.find(error => error.field === fieldName);
    };

    const getStrategyIcon = (strategy: string) => {
        switch (strategy) {
            case 'Avoid': return '🚫';
            case 'Mitigate': return '🛡️';
            case 'Transfer': return '🔄';
            case 'Accept': return '✅';
            default: return '📋';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                    <Target className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Risk Treatment Strategy</h2>
                <p className="text-slate-600">
                    Define how this risk will be treated and managed
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Strategy Selection */}
                <div className="space-y-6">
                    {/* Treatment Strategy */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-4">
                            Risk Treatment Strategy *
                        </label>
                        
                        <div className="space-y-3">
                            {treatmentStrategies.map((strategy) => (
                                <label
                                    key={strategy.value}
                                                                            className={`block p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-teal-300 ${
                                        formData.treatmentStrategy === strategy.value
                                            ? 'border-teal-500 bg-teal-50'
                                            : 'border-slate-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="treatmentStrategy"
                                        value={strategy.value}
                                        checked={formData.treatmentStrategy === strategy.value}
                                        onChange={(e) => onChange({ treatmentStrategy: e.target.value as any })}
                                        className="sr-only"
                                    />
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{getStrategyIcon(strategy.value)}</span>
                                        <div className="flex-1">
                                            <div className="font-medium text-slate-900 mb-1">{strategy.name}</div>
                                            <p className="text-sm text-slate-600 mb-2">{strategy.description}</p>
                                            <p className="text-xs text-slate-500 italic">Example: {strategy.example}</p>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        
                        {getFieldError('treatmentStrategy') && (
                            <p className="mt-2 text-sm text-red-600">{getFieldError('treatmentStrategy')?.message}</p>
                        )}
                    </div>

                    {/* Contingency Plan */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Contingency Plan
                        </label>
                        <textarea
                            value={formData.contingencyPlan}
                            onChange={(e) => onChange({ contingencyPlan: e.target.value })}
                            placeholder="Describe fallback plans if primary treatment fails..."
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            Optional backup plans for high-risk scenarios
                        </p>
                    </div>
                </div>

                {/* Right Column - Mitigation Actions */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900">Mitigation Actions</h3>
                            <span className="text-sm text-slate-500">
                                {formData.mitigationActions.length} actions planned
                            </span>
                        </div>

                        {/* Add New Action Form */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                            <h4 className="font-medium text-slate-900 mb-3">Add Mitigation Action</h4>
                            
                            <div className="space-y-3">
                                <textarea
                                    value={newAction.action}
                                    onChange={(e) => setNewAction({ ...newAction, action: e.target.value })}
                                    placeholder="Describe the mitigation action..."
                                    rows={2}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none text-sm"
                                />
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <select
                                        value={newAction.priority}
                                        onChange={(e) => setNewAction({ ...newAction, priority: e.target.value as any })}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                    >
                                        {priorityLevels.map(level => (
                                            <option key={level.value} value={level.value}>{level.value} Priority</option>
                                        ))}
                                    </select>
                                    
                                    <input
                                        type="date"
                                        value={newAction.dueDate}
                                        onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                    />
                                </div>
                                
                                <input
                                    type="text"
                                    value={newAction.assignee}
                                    onChange={(e) => setNewAction({ ...newAction, assignee: e.target.value })}
                                    placeholder="Assignee name or team"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                />
                                
                                <button
                                    type="button"
                                    onClick={addMitigationAction}
                                    disabled={!newAction.action.trim()}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Action
                                </button>
                            </div>
                        </div>

                        {/* Actions List */}
                        <div className="space-y-3">
                            {formData.mitigationActions.map((action) => (
                                <div key={action.id} className="bg-white border border-slate-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-900 mb-2">{action.action}</p>
                                            
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className={`px-2 py-1 rounded-full ${priorityLevels.find(p => p.value === action.priority)?.color}`}>
                                                    {action.priority}
                                                </span>
                                                
                                                {action.dueDate && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {action.dueDate}
                                                    </span>
                                                )}
                                                
                                                {action.assignee && (
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {action.assignee}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 ml-4">
                                            <select
                                                value={action.status}
                                                onChange={(e) => updateMitigationAction(action.id, { status: e.target.value })}
                                                className="text-xs px-2 py-1 border border-slate-300 rounded focus:ring-1 focus:ring-teal-500"
                                            >
                                                {actionStatuses.map(status => (
                                                    <option key={status.value} value={status.value}>{status.value}</option>
                                                ))}
                                            </select>
                                            
                                            <button
                                                onClick={() => removeMitigationAction(action.id)}
                                                className="p-1 text-slate-400 hover:text-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {formData.mitigationActions.length === 0 && (
                                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>No mitigation actions defined</p>
                                    <p className="text-sm">Add actions above to implement your treatment strategy</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Treatment Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    Treatment Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <span className="text-slate-600">Strategy:</span>
                        <div className="font-medium text-slate-900 mt-1">
                            {formData.treatmentStrategy ? (
                                <span className="flex items-center gap-2">
                                    {getStrategyIcon(formData.treatmentStrategy)}
                                    {treatmentStrategies.find(s => s.value === formData.treatmentStrategy)?.name || formData.treatmentStrategy}
                                </span>
                            ) : (
                                <span className="text-slate-400">Not selected</span>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <span className="text-slate-600">Total Actions:</span>
                        <div className="font-medium text-slate-900 mt-1">{formData.mitigationActions.length}</div>
                    </div>
                    
                    <div>
                        <span className="text-slate-600">High Priority Actions:</span>
                        <div className="font-medium text-slate-900 mt-1">
                            {formData.mitigationActions.filter(a => a.priority === 'High').length}
                        </div>
                    </div>
                </div>
                
                {formData.treatmentStrategy === 'Accept' && formData.mitigationActions.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            Note: You've selected "Risk Acceptance" but defined mitigation actions. Consider if the strategy should be "Risk Mitigation" instead.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};