// Save as: /constants/risk.ts

import { Risk, RatingValue, RiskLevel, RiskStatus, TreatmentDecision } from '@/types/risk';

// --- RATING SCALES AND LABELS ---
export const RATING_VALUES: RatingValue[] = [1, 2, 3, 4, 5];
export const LIKELIHOOD_LABELS: Record<RatingValue, string> = {
    1: '1 - Rare',
    2: '2 - Unlikely',
    3: '3 - Possible',
    4: '4 - Likely',
    5: '5 - Almost Certain'
};
export const IMPACT_LABELS: Record<RatingValue, string> = {
    1: '1 - Insignificant',
    2: '2 - Minor',
    3: '3 - Moderate',
    4: '4 - Major',
    5: '5 - Catastrophic'
};

// --- ENUMERATED VALUES ---
export const RISK_STATUSES: RiskStatus[] = ['Open', 'In Progress', 'Closed', 'Accepted'];
export const TREATMENT_DECISIONS: TreatmentDecision[] = ['Mitigate', 'Accept', 'Transfer', 'Avoid'];

// --- HELPER FUNCTIONS ---
export const calculateRiskScore = (likelihood: RatingValue, impact: RatingValue): number => {
    return likelihood * impact;
};

export const determineRiskLevel = (score: number): RiskLevel => {
    if (score >= 15) return 'Critical';
    if (score >= 10) return 'High';
    if (score >= 5) return 'Medium';
    return 'Low';
};

// --- MOCK DATA ---
export const initialRisks: Risk[] = [
    {
        id: 'RISK-001',
        title: 'Unauthorized access to customer database',
        description: 'A malicious actor could exploit an unpatched vulnerability in the web application server to gain access to the production customer database, leading to a major data breach.',
        affectedAssets: ['ASSET-9812', 'ASSET-3452'],
        likelihood: 4,
        impact: 5,
        riskScore: 20,
        riskLevel: 'Critical',
        owner: 'Priya Sharma',
        treatmentDecision: 'Mitigate',
        status: 'Open',
        identifiedDate: '2025-09-01',
        lastReviewedDate: '2025-09-10',
    },
    {
        id: 'RISK-002',
        title: 'Ransomware attack on employee laptops',
        description: 'Employees may fall victim to phishing emails, resulting in ransomware encrypting their laptops and potentially spreading to network drives.',
        affectedAssets: ['ASSET-7890'],
        likelihood: 3,
        impact: 4,
        riskScore: 12,
        riskLevel: 'High',
        owner: 'Amit Singh',
        treatmentDecision: 'Mitigate',
        status: 'In Progress',
        identifiedDate: '2025-08-15',
        lastReviewedDate: '2025-09-05',
    },
    {
        id: 'RISK-003',
        title: 'Accidental data deletion by administrator',
        description: 'A database administrator could accidentally run a delete script on the production environment instead of staging, leading to data loss and service unavailability.',
        affectedAssets: ['ASSET-9812'],
        likelihood: 2,
        impact: 4,
        riskScore: 8,
        riskLevel: 'Medium',
        owner: 'Priya Sharma',
        treatmentDecision: 'Accept',
        status: 'Accepted',
        identifiedDate: '2025-08-20',
        lastReviewedDate: '2025-09-01',
    }
];