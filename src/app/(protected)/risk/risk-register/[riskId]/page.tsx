// Save as: /app/risk/risk-register/[riskId]/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Plus } from 'lucide-react';

import { RiskAssessmentStepper } from '../../asset-register/components/RiskAssessmentStepper';
import { initialAssets } from '@/constants/assets';
import { initialRisks } from '@/constants/risk'; 
import { Risk } from '@/types/risk';
import {
    BasicInfoView,
    AssetLinkView,
    RiskIdentificationView,
    RiskAnalysisView,
    TreatmentPlanView,
    ReviewView,
    MetadataView,
    RiskSummaryCard,
} from './components';
import { calculateRiskProfile } from '../add/components';

const ViewRiskPage = () => {
    const router = useRouter();
    const params = useParams();
    const [risk, setRisk] = useState<Risk | null>(null);

    useEffect(() => {
        if (params.riskId) {
            const foundRisk = initialRisks.find(r => r.id === params.riskId);
            // @ts-ignore
            setRisk(foundRisk || null);
        }
    }, [params.riskId]);

    const handleCreateTreatmentPlan = () => {
        if (risk) {
            router.push(`/risk/risk-treatment-plan/add?riskId=${risk.id}`);
        }
    };

    if (!risk) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Risk not found or loading...</p>
            </div>
        );
    }
    
    const inherentRisk = calculateRiskProfile(risk.likelihood, risk.impact);
    const residualRisk = calculateRiskProfile(risk.revisedLikelihood, risk.revisedImpact);
    const needsTreatment = risk.treatmentDecision !== 'Accept the risk';

    return (
        <div className="bg-slate-50 font-sans min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm mb-2">
                                <ArrowLeft size={16} /> Back to Risk Register
                            </button>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Risk Details: <span className="text-blue-600">{risk.id}</span>
                            </h1>
                            <p className="text-slate-600 mt-1">{risk.title}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => alert('Edit page not implemented yet.')} className="flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-100 font-semibold">
                                <Edit size={16}/> Edit Risk
                            </button>
                             {needsTreatment && (
                                <button onClick={handleCreateTreatmentPlan} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold">
                                    <Plus size={16}/> Create Treatment Plan
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <BasicInfoView risk={risk} />
                            <AssetLinkView risk={risk} assets={initialAssets} />
                            <RiskIdentificationView risk={risk} />
                            <RiskAnalysisView risk={risk} />
                            <TreatmentPlanView risk={risk} />
                            <ReviewView risk={risk} />
                            <MetadataView risk={risk} />
                        </div>

                        <div className="lg:col-span-1">
                            <RiskSummaryCard inherentRisk={inherentRisk} residualRisk={residualRisk} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRiskPage;

