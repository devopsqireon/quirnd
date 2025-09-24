// File: /constants/risk-form-options.ts

export const RISK_CATEGORIES = ['Operational', 'Technical', 'Compliance', 'Legal', 'Financial', 'Human', 'Third-Party', 'Physical', 'Other'];
export const THREAT_SOURCES = ['Internal', 'External', 'Environmental', 'Accidental', 'Malicious'];
export const LIKELIHOOD_SCALE = { '1': 'Rare', '2': 'Unlikely', '3': 'Possible', '4': 'Likely', '5': 'Almost Certain' };
export const IMPACT_SCALE = { '1': 'Insignificant', '2': 'Minor', '3': 'Moderate', '4': 'Major', '5': 'Catastrophic' };
export const CONTROL_EFFECTIVENESS_SCALE = ['Strong', 'Adequate', 'Weak', 'N/A'];
export const TREATMENT_DECISIONS = ['Accept', 'Mitigate', 'Transfer', 'Avoid'];
export const REVIEW_FREQUENCIES = ['Monthly', 'Quarterly', 'Annually', 'On-Demand'];
export const ESCALATION_LEVELS = ['Management', 'Executive', 'Board'];
export const RISK_STATUSES = ['Open', 'Under Review', 'Treated', 'Closed', 'Accepted'];