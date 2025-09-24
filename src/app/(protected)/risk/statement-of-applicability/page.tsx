// Save as: /app/risk/statement-of-applicability/page.tsx
'use client'

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
    BarChart3, 
    FileSignature, 
    Bot, 
    Settings,
    RefreshCw,
    AlertTriangle,
    TrendingUp,
    Calendar
} from 'lucide-react';

import { RiskAssessmentStepper } from '../asset-register/components/RiskAssessmentStepper';
import { ANNEX_A_CONTROLS } from '@/constants/annex-a-controls';
import { initialRisks } from '@/constants/risk';
import { Risk } from '@/types/risk';

// Import our new components
import { SoAStatus, SoAFilters, BulkUpdateOptions } from './types';
import { SoASummary } from './components/SoASummary';
import { FilterSearch } from './components/FilterSearch';
import { SoATable } from './components/SoATable';
import { BulkActionsModal, QuickActions } from './components/BulkActions';
import { ExportModal, QuickExportDropdown } from './components/ExportComponents';

// Initialize SOA statuses with enhanced data
const initializeSoAStatuses = (risks: Risk[]): SoAStatus[] => {
    const controlToRiskMap = new Map<string, string[]>();

    // Map controls to risks
    risks.forEach(risk => {
        const existingControls = risk.isoMapping || [];
        const newControls = risk.newControlMapping || [];
        const allControls = [...new Set([...existingControls, ...newControls])];

        allControls.forEach(controlId => {
            if (!controlToRiskMap.has(controlId)) {
                controlToRiskMap.set(controlId, []);
            }
            controlToRiskMap.get(controlId)?.push(risk.id);
        });
    });
    
    return ANNEX_A_CONTROLS.map(control => {
        const linkedRisks = controlToRiskMap.get(control.id);
        const isLinkedToRisk = Boolean(linkedRisks && linkedRisks.length > 0);
        
        if (isLinkedToRisk) {
            // Controls linked to risks are typically applicable
            const implementationStatuses = ['Implemented', 'In Progress', 'Planned', 'Under Review'] as const;
            const priorities = ['Critical', 'High', 'Medium', 'Low'] as const;
            const owners = ['IT Security Team', 'IT Department', 'Compliance Officer', 'Legal Department', 'HR Department', 'Operations Team'];
            const efforts = ['Low', 'Medium', 'High'] as const;
            
            const randomStatus = implementationStatuses[Math.floor(Math.random() * implementationStatuses.length)];
            const isImplemented = randomStatus === 'Implemented';
            
            return {
                controlId: control.id,
                isApplicable: true,
                implementationStatus: randomStatus,
                justification: 'Control is applicable to mitigate identified organizational risks and protect critical assets.',
                evidence: linkedRisks.join(', '),
                responsibleOwner: owners[Math.floor(Math.random() * owners.length)],
                backupOwner: Math.random() > 0.7 ? owners[Math.floor(Math.random() * owners.length)] : undefined,
                lastReview: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                nextReview: new Date(Date.now() + (Math.random() * 365 + 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                linkedAssets: ['Active Directory', 'AWS Infrastructure', 'Employee Workstations', 'Email System', 'CRM Database', 'File Servers'].slice(0, Math.floor(Math.random() * 4) + 1),
                treatmentActions: [`RTP-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}: Automated monitoring`, `RTP-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}: Quarterly review process`].slice(0, Math.floor(Math.random() * 3)),
                implementationDate: isImplemented ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
                targetDate: !isImplemented ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
                priority: priorities[Math.floor(Math.random() * priorities.length)],
                effort: efforts[Math.floor(Math.random() * efforts.length)],
                cost: Math.random() > 0.6 ? Math.floor(Math.random() * 50000) + 1000 : undefined,
                statusHistory: [
                    {
                        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        status: `Updated to ${randomStatus}`,
                        user: ['J. Smith', 'A. Johnson', 'M. Davis', 'S. Wilson'][Math.floor(Math.random() * 4)],
                        comment: Math.random() > 0.5 ? 'Updated based on latest risk assessment' : undefined
                    }
                ],
                riskMitigated: linkedRisks,
                complianceNotes: Math.random() > 0.7 ? 'Aligned with industry best practices and regulatory requirements.' : undefined,
                reviewFrequency: ['Monthly', 'Quarterly', 'Annually'][Math.floor(Math.random() * 3)] as 'Monthly' | 'Quarterly' | 'Annually',
                tags: Math.random() > 0.5 ? ['Security', 'Compliance', 'Automation'].slice(0, Math.floor(Math.random() * 3) + 1) : []
            };
        }
        
        // Controls not linked to risks - some are not applicable
        const isNotApplicable = Math.random() > 0.7;
        return {
            controlId: control.id,
            isApplicable: isNotApplicable ? false : null,
            implementationStatus: null,
            justification: isNotApplicable ? 'Control is not applicable to current organizational scope and business operations.' : '',
            evidence: '',
            responsibleOwner: '',
            lastReview: '',
            linkedAssets: [],
            treatmentActions: [],
            priority: null,
            effort: null,
            statusHistory: [],
            reviewFrequency: 'Annually',
            tags: []
        };
    });
};

const StatementOfApplicabilityPage = () => {
    const router = useRouter();
    
    // State management
    const [soaStatuses, setSoaStatuses] = useState<SoAStatus[]>(() => initializeSoAStatuses(initialRisks));
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<SoAFilters>({
        category: '',
        implementationStatus: '',
        riskLevel: '',
        priority: '',
        owner: '',
        applicability: '',
        tags: []
    });
    
    // Modal states
    const [showExportModal, setShowExportModal] = useState(false);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [showAiHelper, setShowAiHelper] = useState(false);
    
    // Selection state
    const [selectedControls, setSelectedControls] = useState<string[]>([]);

    // Handlers
    const handleStatusChange = useCallback((controlId: string, field: keyof SoAStatus, value: any) => {
        setSoaStatuses(currentStatuses =>
            currentStatuses.map(status => {
                if (status.controlId === controlId) {
                    const updatedStatus = { ...status, [field]: value };
                    
                    // Auto-update related fields based on applicability
                    if (field === 'isApplicable' && value === false) {
                        updatedStatus.implementationStatus = null;
                        updatedStatus.justification = 'Control is not applicable to the current organizational scope.';
                        updatedStatus.evidence = '';
                        updatedStatus.priority = null;
                    }
                    
                    // Add to status history
                    if (field === 'implementationStatus' || field === 'isApplicable') {
                        const historyEntry = {
                            date: new Date().toISOString().split('T')[0],
                            status: `${field} changed to ${value}`,
                            user: 'Current User'
                        };
                        updatedStatus.statusHistory = [...(status.statusHistory || []), historyEntry];
                    }
                    
                    return updatedStatus;
                }
                return status;
            })
        );
    }, []);

    const handleBulkUpdate = useCallback((options: BulkUpdateOptions) => {
        setSoaStatuses(currentStatuses =>
            currentStatuses.map(status => {
                if (options.controlIds.includes(status.controlId)) {
                    const updatedStatus = { ...status, [options.field]: options.value };
                    
                    // Add to status history
                    const historyEntry = {
                        date: new Date().toISOString().split('T')[0],
                        status: `Bulk update: ${options.field} set to ${options.value}`,
                        user: 'Current User',
                        comment: options.comment
                    };
                    updatedStatus.statusHistory = [...(status.statusHistory || []), historyEntry];
                    
                    return updatedStatus;
                }
                return status;
            })
        );
        setSelectedControls([]);
    }, []);

    const handleQuickAction = useCallback((action: string, controlIds: string[]) => {
        switch (action) {
            case 'mark-implemented':
                handleBulkUpdate({ controlIds, field: 'implementationStatus', value: 'Implemented' });
                break;
            case 'mark-planned':
                handleBulkUpdate({ controlIds, field: 'implementationStatus', value: 'Planned' });
                break;
            case 'set-high-priority':
                handleBulkUpdate({ controlIds, field: 'priority', value: 'High' });
                break;
            case 'clear-selection':
                setSelectedControls([]);
                break;
        }
    }, [handleBulkUpdate]);

    const handleFilterChange = useCallback((newFilters: SoAFilters) => {
        setFilters(newFilters);
    }, []);

    const handleCardClick = useCallback((filterType: string, filterValue: string) => {
        const newFilters = { ...filters };
        
        switch (filterType) {
            case 'applicability':
                newFilters.applicability = filterValue;
                break;
            case 'status':
                newFilters.implementationStatus = filterValue;
                break;
            case 'priority':
                newFilters.priority = filterValue === 'high' ? 'High' : filterValue;
                break;
            case 'overdue':
                // Custom filter logic for overdue items
                break;
            case 'review':
                // Custom filter logic for review due items
                break;
        }
        
        setFilters(newFilters);
    }, [filters]);

    // Derived data
    const availableOwners = useMemo(() => {
        const owners = new Set<string>();
        soaStatuses.forEach(status => {
            if (status.responsibleOwner) {
                owners.add(status.responsibleOwner);
            }
        });
        return Array.from(owners).sort();
    }, [soaStatuses]);

    const availableTags = useMemo(() => {
        const tags = new Set<string>();
        soaStatuses.forEach(status => {
            status.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [soaStatuses]);

    // Additional handlers
    const handleGenerateReport = () => {
        alert("Generating comprehensive SOA compliance report...\n\nThis would typically:\n- Analyze implementation gaps\n- Generate compliance dashboard\n- Create risk heat maps\n- Provide remediation recommendations\n- Schedule stakeholder reviews");
    };

    const handleReviewSignoff = () => {
        alert("Initiating SOA review and sign-off workflow...\n\nThis would typically:\n- Send to designated reviewers\n- Track approval status\n- Generate audit trail\n- Lock SOA for changes\n- Schedule next review cycle");
    };

    const handleRefreshData = () => {
        // Simulate data refresh
        setSoaStatuses(initializeSoAStatuses(initialRisks));
        alert("SOA data refreshed with latest risk assessments and control mappings.");
    };

    return (
        <>
            <div className="bg-slate-50 font-sans min-h-screen print:bg-white">
                {/* Stepper Navigation */}
                <div className="print:hidden">
                    <RiskAssessmentStepper currentStep={4} />
                </div>
                
                <div className="p-4 sm:p-6 lg:p-8 print:p-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-4 print:mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 print:text-2xl">
                                    Statement of Applicability
                                </h1>
                                <p className="text-slate-600 mt-2 max-w-2xl print:text-sm">
                                    Comprehensive record of ISO 27001:2022 Annex A controls, their applicability determination, 
                                    implementation status, and integration with risk treatment plans.
                                </p>
                                <div className="mt-3 text-sm text-slate-500 print:block hidden">
                                    <div>Organization: Acme Corporation</div>
                                    <div>Generated: {new Date().toLocaleDateString()}</div>
                                    <div>Version: 1.3 | Next Review: {new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString()}</div>
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3 print:hidden">
                                <button 
                                    onClick={handleRefreshData}
                                    className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition flex items-center gap-2"
                                    title="Refresh data from latest risk assessments"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Refresh
                                </button>
                                
                                <button 
                                    onClick={handleGenerateReport}
                                    className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition flex items-center gap-2"
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    Generate Report
                                </button>
                                
                                <QuickExportDropdown
                                    controls={ANNEX_A_CONTROLS}
                                    soaStatuses={soaStatuses}
                                    selectedControls={selectedControls}
                                    onOpenModal={() => setShowExportModal(true)}
                                />
                                
                                <button 
                                    onClick={handleReviewSignoff}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 transition flex items-center gap-2"
                                >
                                    <FileSignature className="w-4 h-4" />
                                    Review/Sign-off
                                </button>
                            </div>
                        </div>
                        
                        {/* Summary Dashboard */}
                        <div className="print:break-inside-avoid">
                            <SoASummary 
                                soaStatuses={soaStatuses}
                                onCardClick={handleCardClick}
                            />
                        </div>
                        
                        {/* Quick Actions for Selected Items */}
                        <QuickActions
                            selectedControls={selectedControls}
                            onQuickAction={handleQuickAction}
                            onShowBulkModal={() => setShowBulkModal(true)}
                        />
                        
                        {/* Filter and Search */}
                        <FilterSearch
                            filters={filters}
                            onFiltersChange={handleFilterChange}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            availableOwners={availableOwners}
                            availableTags={availableTags}
                            showAdvancedFilters={false}
                        />
                        
                        {/* Main Data Table */}
                        <div className="print:break-inside-avoid">
                            <SoATable
                                controls={ANNEX_A_CONTROLS}
                                soaStatuses={soaStatuses}
                                onStatusChange={handleStatusChange}
                                searchTerm={searchTerm}
                                filters={filters}
                                onBulkAction={handleBulkUpdate}
                                showBulkActions={true}
                            />
                        </div>
                    </div>
                </div>
                
                {/* AI Assistant Helper */}
                <div className="fixed bottom-8 right-8 print:hidden">
                    <button 
                        onClick={() => setShowAiHelper(!showAiHelper)}
                        className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-110"
                    >
                        <Bot className="w-8 h-8" />
                    </button>
                    
                    {showAiHelper && (
                        <div className="absolute bottom-full right-0 mb-4 w-80 p-4 bg-white rounded-lg shadow-xl border border-slate-200">
                            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Bot className="w-5 h-5" />
                                ISO 27001 SOA Assistant
                            </h4>
                            <p className="text-sm text-slate-600 mb-3">
                                Get help with control applicability, implementation guidance, and compliance requirements.
                            </p>
                            <div className="space-y-2 mb-3">
                                <button 
                                    onClick={() => alert("Explaining applicability determination process for Annex A controls...")}
                                    className="w-full text-left p-2 text-xs bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                                >
                                    💡 How to determine control applicability
                                </button>
                                <button 
                                    onClick={() => alert("Generating implementation timeline based on priority and dependencies...")}
                                    className="w-full text-left p-2 text-xs bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                                >
                                    📋 Create implementation roadmap
                                </button>
                                <button 
                                    onClick={() => alert("Analyzing gaps and suggesting remediation actions...")}
                                    className="w-full text-left p-2 text-xs bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                                >
                                    🔍 Gap analysis & recommendations
                                </button>
                                <button 
                                    onClick={() => alert("Checking compliance status against ISO 27001 requirements...")}
                                    className="w-full text-left p-2 text-xs bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                                >
                                    ✅ Compliance status check
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Ask about any control..."
                                    className="flex-1 p-2 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition">
                                    Ask
                                </button>
                            </div>
                            <button 
                                onClick={() => setShowAiHelper(false)}
                                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <ExportModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                controls={ANNEX_A_CONTROLS}
                soaStatuses={soaStatuses}
                selectedControls={selectedControls}
            />
            
            <BulkActionsModal
                isOpen={showBulkModal}
                onClose={() => setShowBulkModal(false)}
                selectedControls={selectedControls}
                onBulkUpdate={handleBulkUpdate}
                availableOwners={availableOwners}
            />

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body { 
                        font-size: 12px;
                        line-height: 1.4;
                    }
                    .print\\:hidden { display: none !important; }
                    .print\\:block { display: block !important; }
                    .print\\:break-inside-avoid { break-inside: avoid; }
                    .print\\:text-sm { font-size: 11px; }
                    .print\\:text-2xl { font-size: 18px; }
                    .print\\:p-4 { padding: 16px; }
                    .print\\:mb-6 { margin-bottom: 24px; }
                    .print\\:bg-white { background-color: white !important; }
                }
            `}</style>
        </>
    );
};

export default StatementOfApplicabilityPage;