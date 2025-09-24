// File: /app/risk/risk-register/add/components/steps/Step5Controls.tsx

'use client'

import React, { useState } from 'react';
import { Shield, Search, Plus, X, AlertTriangle, CheckCircle, Minus } from 'lucide-react';
import { AddRiskFormData, ValidationError, ControlTemplate } from '../../types';

interface Step5ControlsProps {
    formData: AddRiskFormData;
    onChange: (data: Partial<AddRiskFormData>) => void;
    errors: ValidationError[];
}

const iso27001Controls: ControlTemplate[] = [
    {
        id: 'A.5.1',
        name: 'Information Security Policies',
        category: 'Information Security Policies',
        description: 'Management direction and support for information security',
        implementationGuidance: 'Establish, implement and maintain information security policies',
        commonRisks: ['Policy violations', 'Lack of security awareness', 'Non-compliance']
    },
    {
        id: 'A.6.1',
        name: 'Information Security Roles and Responsibilities',
        category: 'Organization of Information Security',
        description: 'Define and allocate information security responsibilities',
        implementationGuidance: 'Assign security roles and responsibilities to appropriate personnel',
        commonRisks: ['Unclear accountability', 'Role conflicts', 'Responsibility gaps']
    },
    {
        id: 'A.7.2',
        name: 'Information Security Awareness, Education and Training',
        category: 'Human Resource Security',
        description: 'Ensure personnel receive appropriate awareness and training',
        implementationGuidance: 'Provide regular security awareness training to all personnel',
        commonRisks: ['Human error', 'Social engineering', 'Phishing attacks']
    },
    {
        id: 'A.8.1',
        name: 'Inventory of Assets',
        category: 'Asset Management',
        description: 'Maintain an accurate inventory of assets',
        implementationGuidance: 'Identify and document all assets and their owners',
        commonRisks: ['Unknown assets', 'Unmanaged systems', 'Shadow IT']
    },
    {
        id: 'A.8.2',
        name: 'Information Classification',
        category: 'Asset Management',
        description: 'Classify information according to its importance',
        implementationGuidance: 'Implement a classification scheme and handling procedures',
        commonRisks: ['Data leakage', 'Inappropriate access', 'Mishandling']
    },
    {
        id: 'A.9.1',
        name: 'Access Control Policy',
        category: 'Access Control',
        description: 'Establish access control policy and procedures',
        implementationGuidance: 'Define and implement access control requirements',
        commonRisks: ['Unauthorized access', 'Privilege escalation', 'Account misuse']
    },
    {
        id: 'A.9.2',
        name: 'User Access Management',
        category: 'Access Control',
        description: 'Ensure authorized user access and prevent unauthorized access',
        implementationGuidance: 'Implement user registration and de-registration procedures',
        commonRisks: ['Orphaned accounts', 'Excessive privileges', 'Account sharing']
    },
    {
        id: 'A.12.1',
        name: 'Operational Procedures and Responsibilities',
        category: 'Operations Security',
        description: 'Document and implement operational procedures',
        implementationGuidance: 'Establish operating procedures for IT systems and networks',
        commonRisks: ['Operational failures', 'System outages', 'Data corruption']
    },
    {
        id: 'A.12.3',
        name: 'Information Backup',
        category: 'Operations Security',
        description: 'Protect backup information and test restoration procedures',
        implementationGuidance: 'Implement regular backup and recovery testing',
        commonRisks: ['Data loss', 'Backup failures', 'Recovery failures']
    },
    {
        id: 'A.13.1',
        name: 'Network Security Management',
        category: 'Communications Security',
        description: 'Ensure protection of information in networks',
        implementationGuidance: 'Implement network controls and monitoring',
        commonRisks: ['Network intrusions', 'Data interception', 'Network outages']
    },
    {
        id: 'A.15.1',
        name: 'Information Security in Supplier Relationships',
        category: 'Supplier Relationships',
        description: 'Ensure protection of information in supplier relationships',
        implementationGuidance: 'Include security requirements in supplier agreements',
        commonRisks: ['Supplier breaches', 'Third-party vulnerabilities', 'Supply chain attacks']
    },
    {
        id: 'A.16.1',
        name: 'Management of Information Security Incidents',
        category: 'Information Security Incident Management',
        description: 'Ensure consistent and effective approach to incident management',
        implementationGuidance: 'Establish incident response procedures and team',
        commonRisks: ['Undetected incidents', 'Poor incident response', 'Evidence loss']
    },
    {
        id: 'A.17.1',
        name: 'Information Security Continuity',
        category: 'Business Continuity Management',
        description: 'Plan and implement information security continuity',
        implementationGuidance: 'Include security in business continuity planning',
        commonRisks: ['Business disruption', 'Recovery failures', 'Continuity gaps']
    },
    {
        id: 'A.18.1',
        name: 'Compliance with Legal and Contractual Requirements',
        category: 'Compliance',
        description: 'Avoid breaches of legal or contractual obligations',
        implementationGuidance: 'Identify applicable requirements and ensure compliance',
        commonRisks: ['Legal violations', 'Regulatory penalties', 'Contract breaches']
    }
];

export const Step5Controls: React.FC<Step5ControlsProps> = ({
    formData,
    onChange,
    errors
}) => {
    const [controlSearch, setControlSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expandedControl, setExpandedControl] = useState<string | null>(null);

    const categories = [...new Set(iso27001Controls.map(control => control.category))];
    
    const filteredControls = iso27001Controls.filter(control => {
        const matchesSearch = !controlSearch || 
            control.name.toLowerCase().includes(controlSearch.toLowerCase()) ||
            control.id.toLowerCase().includes(controlSearch.toLowerCase()) ||
            control.description.toLowerCase().includes(controlSearch.toLowerCase());
        
        const matchesCategory = !selectedCategory || control.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    const toggleControl = (control: ControlTemplate, applicability: 'Applicable' | 'Not Applicable' | 'Partially Applicable') => {
        const existingControl = formData.annexAControls.find(c => c.id === control.id);
        
        if (existingControl) {
            if (existingControl.applicability === applicability) {
                // Remove control if same applicability is selected
                onChange({
                    annexAControls: formData.annexAControls.filter(c => c.id !== control.id)
                });
            } else {
                // Update applicability
                onChange({
                    annexAControls: formData.annexAControls.map(c =>
                        c.id === control.id ? { ...c, applicability } : c
                    )
                });
            }
        } else {
            // Add new control
            onChange({
                annexAControls: [...formData.annexAControls, {
                    id: control.id,
                    name: control.name,
                    category: control.category,
                    applicability,
                    notes: ''
                }]
            });
        }
    };

    const updateControlNotes = (controlId: string, notes: string) => {
        onChange({
            annexAControls: formData.annexAControls.map(c =>
                c.id === controlId ? { ...c, notes } : c
            )
        });
    };

    const addControlGap = (gap: string) => {
        if (gap.trim() && !formData.controlGaps.includes(gap.trim())) {
            onChange({
                controlGaps: [...formData.controlGaps, gap.trim()]
            });
        }
    };

    const removeControlGap = (gap: string) => {
        onChange({
            controlGaps: formData.controlGaps.filter(g => g !== gap)
        });
    };

    const getControlStatus = (controlId: string) => {
        return formData.annexAControls.find(c => c.id === controlId);
    };

    const getApplicabilityColor = (applicability: string) => {
        switch (applicability) {
            case 'Applicable': return 'bg-green-100 text-green-800 border-green-200';
            case 'Partially Applicable': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Not Applicable': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-4">
                    <Shield className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">ISO 27001 Controls</h2>
                <p className="text-slate-600">
                    Map this risk to relevant Annex A controls and identify any gaps
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Control Selection */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Search and Filter */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search controls by ID, name, or description..."
                                    value={controlSearch}
                                    onChange={(e) => setControlSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="text-sm text-slate-500">
                            Showing {filteredControls.length} of {iso27001Controls.length} controls
                        </div>
                    </div>

                    {/* Controls List */}
                    <div className="space-y-3">
                        {filteredControls.map((control) => {
                            const status = getControlStatus(control.id);
                            const isExpanded = expandedControl === control.id;
                            
                            return (
                                <div key={control.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                                                    {control.id}
                                                </span>
                                                <h4 className="font-medium text-slate-900">{control.name}</h4>
                                            </div>
                                            <button
                                                onClick={() => setExpandedControl(isExpanded ? null : control.id)}
                                                className="text-slate-400 hover:text-slate-600"
                                            >
                                                {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <p className="text-sm text-slate-600 mb-3">{control.description}</p>

                                        {/* Applicability Buttons */}
                                        <div className="flex gap-2 mb-3">
                                            {['Applicable', 'Partially Applicable', 'Not Applicable'].map((applicability) => (
                                                <button
                                                    key={applicability}
                                                    onClick={() => toggleControl(control, applicability as any)}
                                                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${
                                                        status?.applicability === applicability
                                                            ? getApplicabilityColor(applicability)
                                                            : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                                                    }`}
                                                >
                                                    {status?.applicability === applicability && (
                                                        <CheckCircle className="w-3 h-3 inline mr-1" />
                                                    )}
                                                    {applicability}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Status Display */}
                                        {status && (
                                            <div className={`p-3 rounded-lg border ${getApplicabilityColor(status.applicability)}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="font-medium">Selected as {status.applicability}</span>
                                                </div>
                                                <textarea
                                                    placeholder="Add implementation notes or justification..."
                                                    value={status.notes || ''}
                                                    onChange={(e) => updateControlNotes(control.id, e.target.value)}
                                                    className="w-full mt-2 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                                                    rows={2}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="px-4 pb-4 border-t border-slate-200 bg-slate-50">
                                            <div className="pt-4 space-y-3">
                                                <div>
                                                    <h5 className="font-medium text-slate-900 mb-1">Implementation Guidance</h5>
                                                    <p className="text-sm text-slate-600">{control.implementationGuidance}</p>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-slate-900 mb-1">Common Related Risks</h5>
                                                    <div className="flex flex-wrap gap-1">
                                                        {control.commonRisks.map((risk, index) => (
                                                            <span key={index} className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded">
                                                                {risk}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column - Summary and Gaps */}
                <div className="space-y-6">
                    {/* Selected Controls Summary */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">Selected Controls</h3>
                        
                        {formData.annexAControls.length > 0 ? (
                            <div className="space-y-2">
                                {formData.annexAControls.map((control) => (
                                    <div key={control.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                                        <div>
                                            <span className="text-sm font-medium text-slate-900">{control.id}</span>
                                            <div className={`inline-block ml-2 px-2 py-0.5 text-xs rounded-full ${getApplicabilityColor(control.applicability)}`}>
                                                {control.applicability === 'Applicable' ? 'A' : 
                                                 control.applicability === 'Partially Applicable' ? 'PA' : 'NA'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No controls selected</p>
                            </div>
                        )}
                    </div>

                    {/* Control Gaps */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4">
                        <h3 className="font-semibold text-slate-900 mb-4">Identified Control Gaps</h3>
                        
                        <div className="space-y-3">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Describe a control gap..."
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            addControlGap(e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                                <p className="text-xs text-slate-500 mt-1">Press Enter to add</p>
                            </div>

                            <div className="space-y-2">
                                {formData.controlGaps.map((gap, index) => (
                                    <div key={index} className="flex items-start justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-red-800">{gap}</span>
                                        </div>
                                        <button
                                            onClick={() => removeControlGap(gap)}
                                            className="text-red-400 hover:text-red-600 ml-2"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {formData.controlGaps.length === 0 && (
                                <div className="text-center py-4 text-slate-500 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                                    <AlertTriangle className="w-6 h-6 mx-auto mb-1 opacity-50" />
                                    <p className="text-sm">No control gaps identified</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Guidance */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-2">Control Mapping Guidance</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Map controls that directly address this risk</li>
                            <li>• Mark as "Applicable" if fully implemented</li>
                            <li>• Use "Partially Applicable" if partially implemented</li>
                            <li>• Document gaps where controls don't exist</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};