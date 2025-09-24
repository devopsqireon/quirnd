// Save as: /app/risk/risk-register/[riskId]/components.tsx
'use client'

import React from 'react';
import { Risk } from '@/types/risk';
import { Asset } from '@/types/asset';
import { calculateRiskProfile } from '../add/components'; // Re-using calculation logic
import { Info, Target, Zap, BarChart2, ShieldCheck, TrendingDown, Clock, Settings, Paperclip } from 'lucide-react';

// --- HELPER COMPONENTS ---

const ViewCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; }> = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const DetailItem: React.FC<{ label: string; value?: string | React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth = false }) => (
    <div className={fullWidth ? 'col-span-2' : ''}>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="text-base text-slate-800 mt-1">
            {value || <span className="text-slate-400 italic">Not provided</span>}
        </div>
    </div>
);

// --- VIEW SECTION COMPONENTS ---

export const BasicInfoView: React.FC<{ risk: Risk }> = ({ risk }) => (
    <ViewCard title="Basic Risk Information" icon={Info}>
        <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Risk ID" value={risk.id} />
            <DetailItem label="Risk Category" value={risk.category} />
            <DetailItem label="Risk Statement" value={risk.title} fullWidth />
        </div>
    </ViewCard>
);

export const AssetLinkView: React.FC<{ risk: Risk; assets: Asset[] }> = ({ risk, assets }) => {
    const linkedAssets = assets.filter(a => risk.relatedAssets?.includes(a.id));
    return (
        <ViewCard title="Linked Assets & Processes" icon={Target}>
            <DetailItem
                label="Related Asset(s)"
                value={
                    linkedAssets.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {linkedAssets.map(a => (
                                <span key={a.id} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full">
                                    {a.name}
                                </span>
                            ))}
                        </div>
                    ) : undefined
                }
            />
        </ViewCard>
    );
};

export const RiskIdentificationView: React.FC<{ risk: Risk }> = ({ risk }) => (
    <ViewCard title="Risk Identification" icon={Zap}>
        <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Threat Source" value={risk.threatSource} />
            <DetailItem label="Cause of Risk" value={risk.causeOfRisk} fullWidth />
            <DetailItem label="Vulnerability / Source of Risk" value={risk.vulnerabilityDescription} fullWidth />
            <DetailItem label="Potential Consequences" value={risk.potentialConsequences} fullWidth />
        </div>
    </ViewCard>
);

export const RiskAnalysisView: React.FC<{ risk: Risk }> = ({ risk }) => {
    const inherentRisk = calculateRiskProfile(risk.likelihood, risk.impact);
    const residualRisk = calculateRiskProfile(risk.revisedLikelihood, risk.revisedImpact);
    return (
        <ViewCard title="Risk Analysis" icon={BarChart2}>
             <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg">
                <div>
                    <h3 className="font-semibold text-slate-700">Inherent Risk</h3>
                    <div className="mt-2 space-y-2">
                        <DetailItem label="Likelihood" value={String(risk.likelihood)} />
                        <DetailItem label="Impact" value={String(risk.impact)} />
                        <DetailItem label="Score" value={<span className={`font-bold ${inherentRisk.color}`}>{inherentRisk.score} ({inherentRisk.level})</span>} />
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold text-slate-700">Residual Risk</h3>
                     <div className="mt-2 space-y-2">
                        <DetailItem label="Revised Likelihood" value={String(risk.revisedLikelihood)} />
                        <DetailItem label="Revised Impact" value={String(risk.revisedImpact)} />
                        <DetailItem label="Score" value={<span className={`font-bold ${residualRisk.color}`}>{residualRisk.score} ({residualRisk.level})</span>} />
                    </div>
                </div>
            </div>
        </ViewCard>
    );
};

export const TreatmentPlanView: React.FC<{ risk: Risk }> = ({ risk }) => (
    <ViewCard title="Controls & Treatment Plan" icon={ShieldCheck}>
        <div className="space-y-4">
            <DetailItem label="Existing Security Controls" value={risk.existingControls} />
            <DetailItem label="Control Effectiveness" value={risk.controlEffectiveness} />
            <hr />
            <DetailItem label="Risk Treatment Option" value={<span className="font-semibold text-blue-700">{risk.treatmentDecision}</span>} />
            <DetailItem label="Description of New Control" value={risk.plannedControls} />
            <DetailItem
                label="Mapped New Controls (Annex A)"
                value={
                     risk.newControlMapping?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {risk.newControlMapping.map(c => <span key={c} className="bg-slate-200 text-slate-800 text-sm font-medium px-2.5 py-1 rounded-full">{c}</span>)}
                        </div>
                    ) : undefined
                }
            />
        </div>
    </ViewCard>
);

export const ReviewView: React.FC<{ risk: Risk }> = ({ risk }) => (
     <ViewCard title="Monitoring & Review" icon={Clock}>
        <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Risk Owner" value={risk.owner} />
            <DetailItem label="Review Frequency" value={risk.reviewFrequency} />
        </div>
    </ViewCard>
);

export const MetadataView: React.FC<{ risk: Risk }> = ({ risk }) => (
    <ViewCard title="Metadata & Tracking" icon={Settings}>
        <div className="grid grid-cols-2 gap-4">
             <DetailItem label="Status" value={<span className="font-bold">{risk.status}</span>} />
        </div>
        <DetailItem
            label="Mapped Existing Controls (Annex A)"
            value={
                risk.isoMapping?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {risk.isoMapping.map(c => <span key={c} className="bg-slate-200 text-slate-800 text-sm font-medium px-2.5 py-1 rounded-full">{c}</span>)}
                    </div>
                ) : undefined
            }
        />
        <DetailItem label="Remarks / Notes" value={risk.remarks} />
    </ViewCard>
);

export const RiskSummaryCard: React.FC<{
    inherentRisk: { score: number; level: string; color: string; };
    residualRisk: { score: number; level: string; color: string; };
}> = ({ inherentRisk, residualRisk }) => (
    <div className="sticky top-24 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Inherent Risk Rating</h3>
            <div className={`p-4 rounded-lg text-center ${inherentRisk.color}`}>
                <p className="text-4xl font-bold">{inherentRisk.score}</p>
                <p className="font-semibold mt-1">{inherentRisk.level}</p>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Risk level before applying controls.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Residual Risk Rating</h3>
            <div className={`p-4 rounded-lg text-center ${residualRisk.color}`}>
                <p className="text-4xl font-bold">{residualRisk.score}</p>
                <p className="font-semibold mt-1">{residualRisk.level}</p>
            </div>
             <p className="text-xs text-slate-500 mt-3 text-center">Risk level after planned controls.</p>
        </div>
    </div>
);
