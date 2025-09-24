// File: /app/risk/asset-register/view/components/tabs/DetailsTab.tsx
'use client'

import React from 'react';
import { Tag, Users, MapPin, Clock, LinkIcon, Settings } from 'lucide-react';
import { Asset } from '../../types';
import { DetailSection } from '../DetailSection';
import { DetailItem } from '../DetailItem';

interface DetailsTabProps {
    asset: Asset;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ asset }) => {
    return (
        <>
            <DetailSection title="Basic Information" icon={Tag}>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <DetailItem label="Asset Type" value={asset.assetType} />
                    <DetailItem label="Asset ID" value={asset.assetId} type="code" />
                    <DetailItem label="Classification" value={asset.classification} />
                    <DetailItem label="Status" value={asset.status} />
                    <DetailItem 
                        label="Description" 
                        value={asset.description} 
                        type="multiline"
                        className="md:col-span-2" 
                    />
                </dl>
            </DetailSection>

            <DetailSection title="Ownership & Responsibility" icon={Users}>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <DetailItem label="Asset Owner" value={asset.owner} />
                    <DetailItem label="Custodian/Responsible Person" value={asset.custodian} />
                    <DetailItem label="Department" value={asset.department} />
                    <DetailItem label="Approval Status" value={asset.approvalStatus} />
                    <DetailItem 
                        label="Stakeholders" 
                        value={asset.stakeholders} 
                        type="list"
                        className="md:col-span-2" 
                    />
                </dl>
            </DetailSection>

            <DetailSection title="Classification & Security" icon={Tag}>
                <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                    <DetailItem 
                        label="Confidentiality" 
                        value={`${asset.confidentiality}/5 - ${getCiaLabel(asset.confidentiality)}`} 
                    />
                    <DetailItem 
                        label="Integrity" 
                        value={`${asset.integrity}/5 - ${getCiaLabel(asset.integrity)}`} 
                    />
                    <DetailItem 
                        label="Availability" 
                        value={`${asset.availability}/5 - ${getCiaLabel(asset.availability)}`} 
                    />
                </dl>
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Overall Risk Score:</span>
                        <span className={`px-3 py-1 text-sm font-bold rounded-full ${getRiskScoreColor(asset.confidentiality + asset.integrity + asset.availability)}`}>
                            {asset.confidentiality + asset.integrity + asset.availability}/15
                        </span>
                    </div>
                </div>
            </DetailSection>

            <DetailSection title="Location & Technical Details" icon={MapPin}>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <DetailItem 
                        label="Physical Location(s)" 
                        value={asset.physicalLocation ? asset.physicalLocation.split(',') : []} 
                        type="list"
                    />
                    <DetailItem label="Hosting Type" value={asset.hostingType} />
                    <DetailItem 
                        label="Vendor/Provider(s)" 
                        value={asset.vendor ? asset.vendor.split(',') : []} 
                        type="list"
                    />
                    <DetailItem label="Technical Reference" value={asset.technicalReference} type="code" />
                </dl>
            </DetailSection>

            <DetailSection title="Lifecycle & Status" icon={Clock}>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <DetailItem 
                        label="Acquisition Date" 
                        value={asset.acquisitionDate ? new Date(asset.acquisitionDate).toLocaleDateString() : 'Not specified'} 
                    />
                    <DetailItem label="Expected Lifetime" value={asset.expectedLifetime} />
                    <DetailItem label="Current Status" value={asset.status} />
                    <DetailItem 
                        label="Decommissioning Plan" 
                        value={asset.decommissioningPlan} 
                        type="multiline"
                        className="md:col-span-2" 
                    />
                </dl>
            </DetailSection>

            <DetailSection title="Dependencies & Relationships" icon={LinkIcon}>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <DetailItem label="Linked Processes" value={asset.linkedProcesses} />
                    <DetailItem label="Linked Systems" value={asset.linkedSystems} />
                    <DetailItem 
                        label="Third-Party Dependencies" 
                        value={asset.thirdPartyDependencies} 
                        className="md:col-span-2" 
                    />
                    <DetailItem 
                        label="Regulatory Relevance" 
                        value={asset.regulatoryRelevance} 
                        type="list"
                        className="md:col-span-2" 
                    />
                </dl>
            </DetailSection>

            <DetailSection title="Optional Fields" icon={Settings}>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <DetailItem 
                        label="Tags" 
                        value={asset.tags} 
                        type="list"
                        className="md:col-span-2" 
                    />
                    <DetailItem 
                        label="Audit Reference(s)" 
                        value={asset.auditReference ? asset.auditReference.split(',') : []} 
                        type="list"
                        className="md:col-span-2" 
                    />
                    <DetailItem 
                        label="Notes" 
                        value={asset.notes} 
                        type="multiline"
                        className="md:col-span-2" 
                    />
                </dl>
            </DetailSection>
        </>
    );
};

// Helper functions
const getCiaLabel = (value: number): string => {
    switch (value) {
        case 0: return 'Not Applicable';
        case 1: return 'Very Low';
        case 2: return 'Low';
        case 3: return 'Moderate';
        case 4: return 'High';
        case 5: return 'Very High';
        default: return 'Unknown';
    }
};

const getRiskScoreColor = (score: number): string => {
    if (score >= 12) return 'bg-red-100 text-red-800';
    if (score >= 9) return 'bg-orange-100 text-orange-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
};