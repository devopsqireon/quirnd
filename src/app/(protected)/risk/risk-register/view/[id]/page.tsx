// File: /app/risk/risk-register/view/[id]/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
    ArrowLeft, 
    Edit, 
    Share2, 
    MoreVertical, 
    Copy, 
    Archive,
    Bell,
    Flag
} from 'lucide-react';

// Import components
import { RiskViewHeader } from './components/RiskViewHeader';
import { RiskViewTabs } from './components/RiskViewTabs';
import { OverviewTab } from './components/tabs/OverviewTab';
import { ControlsTab } from './components/tabs/ControlsTab';
import { TimelineTab } from './components/tabs/TimelineTab';
import { DocumentsTab } from './components/tabs/DocumentsTab';

// Import types
import { Risk, RiskMetrics, RiskControl, TimelineEvent, RiskDocument } from './types';

// Sample risk data - Updated to match OverviewTab interface
const sampleRisk: Risk = {
    id: 'RSK-001',
    title: 'Data Breach in Customer Database',
    description: 'Potential unauthorized access to customer personal information stored in the main customer database. This risk has been identified following recent security assessments and threat intelligence reports indicating increased targeting of customer databases in our industry sector.',
    category: 'Cybersecurity',
    status: 'In Progress',
    priority: 'High',
    likelihood: 4,
    impact: 4,
    riskScore: 16,
    riskLevel: 'High',
    owner: 'IT Security Team',
    assignee: 'john.doe@company.com',
    businessUnit: 'Technology',
    department: 'IT Security',
    dateIdentified: '2024-01-15T10:30:00Z',
    dateCreated: '2024-01-15T10:30:00Z',
    dueDate: '2024-03-15T23:59:59Z',
    lastReviewed: '2024-02-01T14:20:00Z',
    nextReview: '2024-03-01T14:20:00Z',
    progress: 65,
    tags: ['cybersecurity', 'data-protection', 'compliance', 'high-priority'],
    
    // Controls - matching OverviewTab interface
    controls: [
        {
            id: 'CTL-001',
            name: 'Multi-Factor Authentication',
            type: 'Preventive',
            effectiveness: 'High',
            status: 'Active',
            owner: 'IT Security Team',
            testDate: '2024-02-01T00:00:00Z',
            nextTest: '2024-03-01T00:00:00Z'
        },
        {
            id: 'CTL-002',
            name: 'Database Encryption',
            type: 'Preventive',
            effectiveness: 'High',
            status: 'Active',
            owner: 'Database Administrator',
            testDate: '2024-02-05T00:00:00Z',
            nextTest: '2024-03-05T00:00:00Z'
        }
    ],
    
    // Assets - matching OverviewTab interface
    assets: [
        {
            id: 'AST-001',
            name: 'Customer Database Server',
            type: 'Database Server',
            criticality: 'Critical',
            owner: 'IT Security Team'
        },
        {
            id: 'AST-002',
            name: 'Payment Processing System',
            type: 'Application',
            criticality: 'High',
            owner: 'Finance Team'
        },
        {
            id: 'AST-003',
            name: 'Customer Portal Application',
            type: 'Web Application',
            criticality: 'Medium',
            owner: 'Development Team'
        }
    ],
    
    // Impact analysis - matching OverviewTab interface structure
    impact_analysis: {
        financial: {
            level: 'High',
            description: 'Potential regulatory fines and customer compensation could reach $500K-$2M. Loss of customer trust may impact revenue by 10-15% in the following quarter.',
            amount: '$500K - $2M'
        },
        operational: {
            level: 'High',
            description: 'Database downtime during incident response could impact customer services for 4-8 hours. Recovery efforts may require additional IT resources for 2-3 weeks.'
        },
        reputational: {
            level: 'Critical',
            description: 'Data breach could severely damage company reputation and customer trust. Media coverage and social media backlash expected. Long-term brand recovery required.'
        },
        regulatory: {
            level: 'High',
            description: 'GDPR and other data protection regulations require immediate notification and could result in significant fines. Regulatory scrutiny and compliance audits expected.'
        }
    },
    
    // Legacy properties for backward compatibility
    likelihoodScore: 4,
    impactScore: 4,
    inherentRisk: { probability: 4, impact: 5, score: 20 },
    residualRisk: { probability: 2, impact: 4, score: 8 },
    createdDate: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-02-12T14:20:00Z',
    
    // Legacy impact structure for other components
    impact: {
        financial: 85,
        operational: 70,
        reputational: 90
    },
    
    // Legacy asset structure for other components
    associatedAssets: [
        { id: 'AST-001', name: 'Customer Database Server' },
        { id: 'AST-002', name: 'Payment Processing System' },
        { id: 'AST-003', name: 'Customer Portal Application' }
    ],
    
    // Legacy control structure for other components
    riskControls: [
        {
            id: 'CTL-001',
            name: 'Multi-Factor Authentication',
            description: 'Implementation of MFA for all database access',
            type: 'Preventive',
            status: 'Effective',
            frequency: 'Continuous',
            owner: 'IT Security Team',
            effectiveness: 85,
            implementationDate: '2024-01-20T00:00:00Z',
            lastReview: '2024-02-01T00:00:00Z',
            nextReview: '2024-03-01T00:00:00Z',
            testingHistory: [
                { date: '2024-02-01T00:00:00Z', result: 'Effective' },
                { date: '2024-01-15T00:00:00Z', result: 'Effective' }
            ]
        },
        {
            id: 'CTL-002',
            name: 'Database Encryption',
            description: 'End-to-end encryption of customer data at rest and in transit',
            type: 'Preventive',
            status: 'Effective',
            frequency: 'Continuous',
            owner: 'Database Administrator',
            effectiveness: 90,
            implementationDate: '2024-01-18T00:00:00Z',
            lastReview: '2024-02-05T00:00:00Z',
            nextReview: '2024-03-05T00:00:00Z',
            testingHistory: [
                { date: '2024-02-05T00:00:00Z', result: 'Effective' }
            ]
        }
    ]
};

const sampleMetrics: RiskMetrics = {
    riskVelocity: 'Stable',
    timeToResolve: '45 days',
    controlEffectiveness: 87,
    previousRiskScore: 20,
    recentActivity: [
        {
            action: 'Control effectiveness updated',
            user: 'Sarah Johnson',
            date: '2024-02-12T14:20:00Z'
        },
        {
            action: 'Progress updated to 65%',
            user: 'John Doe',
            date: '2024-02-10T09:30:00Z'
        }
    ]
};

export default function RiskViewPage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [risk, setRisk] = useState<Risk>(sampleRisk);
    const [metrics, setMetrics] = useState<RiskMetrics>(sampleMetrics);
    const [loading, setLoading] = useState(false);
    const [showActionsMenu, setShowActionsMenu] = useState(false);

    useEffect(() => {
        // In a real app, fetch risk data based on params.id
        const riskId = params.id;
        console.log('Loading risk:', riskId);
        
        // Simulate loading
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [params.id]);

    const handleUpdateRisk = (updatedRisk: Partial<Risk>) => {
        setRisk(prev => ({ ...prev, ...updatedRisk }));
    };

    const handleUpdateControls = (controls: RiskControl[]) => {
        setRisk(prev => ({ ...prev, riskControls: controls }));
    };

    const handleAddTimelineEvent = (event: Omit<TimelineEvent, 'id'>) => {
        console.log('Adding timeline event:', event);
        // In real app, this would call an API
    };

    const handleUploadDocument = (document: Omit<RiskDocument, 'id'>) => {
        console.log('Uploading document:', document);
        // In real app, this would call an API
    };

    const handleDeleteDocument = (documentId: string) => {
        console.log('Deleting document:', documentId);
        // In real app, this would call an API
    };

    const handleEditRisk = () => {
        router.push(`/risk/risk-register/edit/${risk.id}`);
    };

    const handleDuplicateRisk = () => {
        console.log('Duplicating risk:', risk.id);
        // Implementation for duplicating risk
    };

    const handleArchiveRisk = () => {
        console.log('Archiving risk:', risk.id);
        // Implementation for archiving risk
    };

    const handleShareRisk = () => {
        console.log('Sharing risk:', risk.id);
        // Implementation for sharing risk
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab risk={risk} metrics={metrics} />;
            case 'controls':
                return <ControlsTab risk={risk} onUpdateControls={handleUpdateControls} />;
            case 'timeline':
                return <TimelineTab riskId={risk.id} />;
            case 'documents':
                return <DocumentsTab 
                    risk={risk} 
                    onUploadDocument={handleUploadDocument}
                    onDeleteDocument={handleDeleteDocument}
                />;
            default:
                return <OverviewTab risk={risk} metrics={metrics} />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-300 rounded"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 py-3 text-sm text-gray-600">
                        <button
                            onClick={() => router.push('/risk/risk-register')}
                            className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Risk Register
                        </button>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium">{risk.id}</span>
                    </div>
                </div>
            </div>

            {/* Risk Header */}
            <RiskViewHeader 
                risk={risk} 
                onEdit={handleEditRisk}
                onUpdateRisk={handleUpdateRisk}
            />

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <RiskViewTabs 
                            activeTab={activeTab} 
                            onTabChange={setActiveTab} 
                        />
                        
                        {/* Quick Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleEditRisk}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            
                            <button
                                onClick={handleShareRisk}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </button>

                            {/* More Actions Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowActionsMenu(!showActionsMenu)}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                                
                                {showActionsMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                        <div className="py-1">
                                            <button
                                                onClick={handleDuplicateRisk}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <Copy className="w-4 h-4" />
                                                Duplicate Risk
                                            </button>
                                            <button
                                                onClick={() => console.log('Subscribe to notifications')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <Bell className="w-4 h-4" />
                                                Subscribe to Updates
                                            </button>
                                            <button
                                                onClick={() => console.log('Flag for review')}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                            >
                                                <Flag className="w-4 h-4" />
                                                Flag for Review
                                            </button>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={handleArchiveRisk}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                            >
                                                <Archive className="w-4 h-4" />
                                                Archive Risk
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="pb-8">
                {renderTabContent()}
            </div>

            {/* Click outside to close dropdown */}
            {showActionsMenu && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowActionsMenu(false)}
                />
            )}
        </div>
    );
}