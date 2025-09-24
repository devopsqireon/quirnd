'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { 
    ArrowLeft, Edit, Trash2, Shield, AlertTriangle, History, FileText, CheckCircle, Clock, 
    Users, MapPin, Link as LinkIcon, Tag, Settings, ChevronDown, ChevronUp, User, BarChart2 
} from 'lucide-react';

// --- MOCKED TYPES & CONSTANTS (Consistent with edit page) ---
type CiaValue = 0 | 1 | 2 | 3 | 4 | 5;
const CIA_RATING_LABELS: { [key in CiaValue]: string } = { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' };

// --- MOCK DATA FOR THE ASSET TO BE VIEWED ---
const mockAsset = {
    assetId: 'ASSET-B7A2',
    name: 'Production Database Server',
    assetType: 'Hardware',
    description: 'Main server hosting the production PostgreSQL database. Contains all customer PII and transactional data.',
    owner: 'Priya Singh',
    custodian: 'IT Infrastructure Team',
    department: 'Engineering',
    stakeholders: ['Security Team', 'Product Management', 'Legal'],
    classification: 'Confidential',
    confidentiality: 5 as CiaValue,
    integrity: 5 as CiaValue,
    availability: 5 as CiaValue,
    physicalLocation: 'AWS ap-south-1 (Mumbai)',
    hostingType: 'Cloud',
    vendor: 'Amazon Web Services',
    technicalReference: 'Instance ID: i-0123456789abcdef0',
    acquisitionDate: '2023-01-15',
    expectedLifetime: '5 years',
    status: 'Active',
    decommissioningPlan: 'Data to be archived to S3 Glacier, instance to be terminated.',
    linkedProcesses: 'Customer Order Processing, Billing Cycle',
    linkedSystems: 'API Gateway (API-001), Web Application Server (AS-003)',
    thirdPartyDependencies: 'Stripe API for payment processing',
    regulatoryRelevance: ['GDPR', 'PCI DSS', 'HIPAA'],
    knownVulnerabilities: [
      'Risk of hardware failure.',
      'Risk of unauthorized access to hardware.',
      'SQL Injection Vulnerability (CVE-2023-1234)'
    ],
    riskNotes: 'Regular patching schedule is in place. Access is restricted via IAM roles.',
    associatedRisks: [
      { riskId: 'RISK-004', title: 'Unauthorized Access to Production Database', status: 'Open' },
      { riskId: 'RISK-011', title: 'Data Loss due to Hardware Failure', status: 'Mitigated' },
      { riskId: 'RISK-023', title: 'SQL Injection Attack', status: 'Open' },
    ],
    complianceItems: [
      { id: 'confidentialData', label: 'Confidential Data Involved?', checked: true },
      { id: 'pii', label: 'PII Involved?', checked: true },
      { id: 'pci', label: 'PCI Data Involved?', checked: true },
    ],
    auditReference: 'AUDIT-2024-Q3-DB',
    approvalStatus: 'Approved',
    tags: ['database', 'production', 'customer-data', 'critical'],
    notes: 'Increased monitoring was enabled on 2024-08-20 due to recent high traffic.',
    history: [
          { date: '2024-09-07', user: 'Amit Sharma', action: 'Created asset' },
          { date: '2024-09-08', user: 'Priya Singh', action: 'Updated owner and CIA values' },
          { date: '2024-09-10', user: 'Amit Sharma', action: 'Added PCI DSS regulatory relevance' },
    ]
};

// --- REALISTIC MOCKED ROUTING HOOKS ---
const useParams = () => ({
    assetId: 'ASSET-B7A2', // In a real app, this would come from the URL, e.g., /assets/ASSET-B7A2
});

const useRouter = () => ({
    push: (path: string) => alert(`Navigating to: ${path}`),
});

// --- TYPE DEFINITIONS ---
type Tab = 'Details' | 'Risk & Security' | 'Compliance' | 'History';

// --- REUSABLE UI COMPONENTS ---
const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string }> = ({ label, value, className }) => (
    <div className={className}>
        <dt className="text-sm font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 text-sm text-slate-900 font-semibold">{value || '-'}</dd>
    </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full">
        {children}
    </span>
);

const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="border-b border-slate-200 last:border-b-0 py-6">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-slate-500" />
                    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                </div>
                {isOpen ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
            </button>
            {isOpen && <div className="pt-4 pl-9 space-y-4">{children}</div>}
        </div>
    );
};

// --- PAGE COMPONENTS ---

const AssetHeader: React.FC<{ asset: typeof mockAsset }> = ({ asset }) => {
    const router = useRouter();
    return (
        <div className="mb-6">
            <a href="#" onClick={() => router.push('/assets')} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline mb-4">
                <ArrowLeft size={16} /> Back to Asset Register
            </a>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <p className="text-sm font-semibold text-blue-600">{asset.assetId}</p>
                    <h1 className="text-3xl font-bold text-slate-900">{asset.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => router.push(`/assets/${asset.assetId}/edit`)} className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                        <Edit size={16} /> Edit
                    </button>
                    <button className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors">
                        <Trash2 size={16} /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const AssetSummaryCards: React.FC<{ asset: typeof mockAsset }> = ({ asset }) => {
    const overallCriticality = useMemo(() => asset.confidentiality + asset.integrity + asset.availability, [asset]);
    
    const getCriticalityColor = (value: number) => {
        if (value >= 12) return 'bg-red-100 text-red-800 border-red-200';
        if (value >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full"><User className="text-blue-600"/></div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Asset Owner</p>
                    <p className="text-lg font-semibold text-slate-800 mt-1">{asset.owner}</p>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                 <div className="bg-orange-100 p-3 rounded-full"><BarChart2 className="text-orange-600"/></div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Overall Criticality (C+I+A)</p>
                    <p className={`text-lg font-semibold text-slate-800 mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm ${getCriticalityColor(overallCriticality)}`}>
                        {overallCriticality} ({CIA_RATING_LABELS[asset.confidentiality]}+{CIA_RATING_LABELS[asset.integrity]}+{CIA_RATING_LABELS[asset.availability]})
                    </p>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full"><CheckCircle className="text-green-600"/></div>
                <div>
                    <p className="text-sm font-medium text-slate-500">Status</p>
                     <p className={`text-lg font-semibold mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm ${asset.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                        {asset.status}
                    </p>
                </div>
            </div>
        </div>
    );
};

const DetailsTabContent: React.FC<{ asset: typeof mockAsset }> = ({ asset }) => (
    <>
        <Section title="Basic Information" icon={Tag}>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <DetailItem label="Asset Type" value={asset.assetType} />
                <DetailItem label="Classification" value={asset.classification} />
                <DetailItem label="Description" value={<p className="font-normal text-slate-700">{asset.description}</p>} className="md:col-span-2" />
            </dl>
        </Section>
        <Section title="Ownership & Responsibility" icon={Users}>
             <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <DetailItem label="Custodian" value={asset.custodian} />
                <DetailItem label="Department" value={asset.department} />
                <DetailItem label="Stakeholders" value={<div>{asset.stakeholders.map(s => <Pill key={s}>{s}</Pill>)}</div>} className="md:col-span-2" />
            </dl>
        </Section>
        <Section title="Location & Technical Details" icon={MapPin}>
             <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <DetailItem label="Physical Location" value={asset.physicalLocation} />
                <DetailItem label="Hosting Type" value={asset.hostingType} />
                <DetailItem label="Vendor / Provider" value={asset.vendor} />
                <DetailItem label="Technical Reference" value={<code className="text-sm font-mono bg-slate-100 p-1 rounded">{asset.technicalReference}</code>} />
            </dl>
        </Section>
        <Section title="Lifecycle & Status" icon={Clock}>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <DetailItem label="Acquisition Date" value={asset.acquisitionDate} />
                <DetailItem label="Expected Lifetime" value={asset.expectedLifetime} />
                <DetailItem label="Approval Status" value={asset.approvalStatus} />
                <DetailItem label="Decommissioning Plan" value={<p className="font-normal text-slate-700">{asset.decommissioningPlan}</p>} className="md:col-span-2" />
            </dl>
        </Section>
        <Section title="Dependencies & Relationships" icon={LinkIcon}>
             <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <DetailItem label="Linked Processes" value={asset.linkedProcesses} />
                <DetailItem label="Linked Systems" value={asset.linkedSystems} />
                <DetailItem label="Third-Party Dependencies" value={asset.thirdPartyDependencies} className="md:col-span-2" />
                <DetailItem label="Regulatory Relevance" value={<div>{asset.regulatoryRelevance.map(r => <Pill key={r}>{r}</Pill>)}</div>} className="md:col-span-2" />
            </dl>
        </Section>
         <Section title="Optional Fields" icon={Settings}>
             <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <DetailItem label="Tags / Keywords" value={<div>{asset.tags.map(t => <Pill key={t}>{t}</Pill>)}</div>} className="md:col-span-2" />
                <DetailItem label="Notes / Comments" value={<p className="font-normal text-slate-700 whitespace-pre-wrap">{asset.notes}</p>} className="md:col-span-2" />
            </dl>
        </Section>
    </>
);

// --- MAIN PAGE ---
const AssetDetailPage = () => {
    const { assetId } = useParams();
    const [asset, setAsset] = useState<typeof mockAsset | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>('Details');

    useEffect(() => {
        // Simulate fetching data for the asset based on the URL parameter
        if (assetId === mockAsset.assetId) {
            setAsset(mockAsset);
        }
    }, [assetId]);

    const tabs: { name: Tab; icon: React.ElementType }[] = [
        { name: 'Details', icon: FileText },
        { name: 'Risk & Security', icon: AlertTriangle },
        { name: 'Compliance', icon: Shield },
        { name: 'History', icon: History },
    ];

    if (!asset) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-lg text-gray-600">Loading asset data...</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 font-sans p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <AssetHeader asset={asset} />
                <AssetSummaryCards asset={asset} />
                
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="border-b border-slate-200 px-6">
                        <nav className="-mb-px flex space-x-6">
                            {tabs.map(tab => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`flex items-center gap-2 py-3 px-1 border-b-2 font-semibold text-sm transition-colors ${activeTab === tab.name ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                                >
                                    <tab.icon size={16} />
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="px-6">
                        {activeTab === 'Details' && <DetailsTabContent asset={asset} />}
                        
                        {activeTab === 'Risk & Security' && (
                            <div className="py-6">
                                <h3 className="text-lg font-semibold text-slate-700 mb-4">Associated Risks</h3>
                                <div className="mb-6 border border-slate-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="p-3 text-left font-semibold text-slate-600">Risk ID</th>
                                                <th className="p-3 text-left font-semibold text-slate-600">Title</th>
                                                <th className="p-3 text-left font-semibold text-slate-600">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {asset.associatedRisks?.map((risk, index) => (
                                                <tr key={index} className="border-b border-slate-200 last:border-b-0">
                                                    <td className="p-3">
                                                        <a href="#" className="font-medium text-blue-600 hover:underline">{risk.riskId}</a>
                                                    </td>
                                                    <td className="p-3 text-slate-700">{risk.title}</td>
                                                    <td className="p-3">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            risk.status === 'Open' ? 'bg-red-100 text-red-800' : 
                                                            risk.status === 'Mitigated' ? 'bg-green-100 text-green-800' :
                                                            'bg-slate-100 text-slate-800'
                                                        }`}>
                                                            {risk.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <h3 className="text-lg font-semibold text-slate-700 mb-4">Known Vulnerabilities</h3>
                                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-md">
                                    {asset.knownVulnerabilities.map(vuln => <li key={vuln}>{vuln}</li>)}
                                </ul>
                                <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-4">Risk Notes</h3>
                                <div className="text-sm text-slate-800 bg-slate-50 p-4 rounded-md whitespace-pre-wrap">{asset.riskNotes}</div>
                            </div>
                        )}

                        {activeTab === 'Compliance' && (
                            <div className="py-6">
                                <h3 className="text-lg font-semibold text-slate-700 mb-4">Compliance Checks</h3>
                                <div className="space-y-3">
                                    {asset.complianceItems.map(item => (
                                        <div key={item.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-md">
                                            <CheckCircle className={`w-5 h-5 ${item.checked ? 'text-green-500' : 'text-slate-300'}`} />
                                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <DetailItem label="Audit Reference ID" value={<code className="text-sm font-mono bg-slate-100 p-1 rounded">{asset.auditReference}</code>} className="mt-6" />
                            </div>
                        )}

                        {activeTab === 'History' && (
                             <div className="py-6">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            {['Date', 'User', 'Action'].map(h => <th key={h} className="p-3 text-left font-semibold text-slate-600">{h}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {asset.history.map((item, index) => (
                                            <tr key={index} className="border-b border-slate-200 last:border-b-0">
                                                <td className="p-3 text-slate-500">{item.date}</td>
                                                <td className="p-3 font-medium text-slate-700">{item.user}</td>
                                                <td className="p-3 text-slate-600">{item.action}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetDetailPage;

