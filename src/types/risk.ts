// Save as: /types/risk.ts

import { Asset } from './asset'; // Assuming asset types are available

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type RiskStatus = 'Open' | 'In Progress' | 'Closed' | 'Accepted';
export type TreatmentDecision = 'Mitigate' | 'Accept' | 'Transfer' | 'Avoid';
export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface Risk {
  id: string; // e.g., RISK-001
  title: string;
  description: string;
  affectedAssets: string[]; // Array of Asset IDs
  
  // Risk Analysis
  likelihood: RatingValue;
  impact: RatingValue;
  
  // Risk Evaluation
  riskScore: number; // Calculated: likelihood * impact
  riskLevel: RiskLevel;
  
  // Ownership & Treatment
  owner: string; // From the list of asset owners
  treatmentDecision: TreatmentDecision;
  status: RiskStatus;
  
  identifiedDate: string;
  lastReviewedDate: string;
}