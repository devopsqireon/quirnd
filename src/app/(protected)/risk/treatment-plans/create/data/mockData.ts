// /app/risk/treatment-plans/create/data/mockData.ts
import { Risk, TreatmentOption } from '../types';

export const mockRisks: Risk[] = [
  {
    id: 'R001',
    title: 'Data Breach via Phishing Attack',
    category: 'Cybersecurity',
    riskScore: 85,
    riskLevel: 'Critical',
    owner: 'Sarah Johnson',
    lastAssessment: '2024-09-01',
    status: 'Open',
    description: 'High risk of data breach through sophisticated phishing campaigns targeting employees'
  },
  {
    id: 'R002',
    title: 'Third-Party Vendor Security Gap',
    category: 'Vendor Management',
    riskScore: 72,
    riskLevel: 'High',
    owner: 'Mike Chen',
    lastAssessment: '2024-08-28',
    status: 'In Progress',
    description: 'Security vulnerabilities in third-party vendor systems could expose sensitive data'
  },
  {
    id: 'R003',
    title: 'Inadequate Access Control Management',
    category: 'Access Management',
    riskScore: 68,
    riskLevel: 'High',
    owner: 'Lisa Rodriguez',
    lastAssessment: '2024-08-25',
    status: 'Open',
    description: 'Lack of proper access controls may lead to unauthorized data access and privilege escalation'
  },
  {
    id: 'R004',
    title: 'Business Continuity Plan Outdated',
    category: 'Business Continuity',
    riskScore: 55,
    riskLevel: 'Medium',
    owner: 'David Kim',
    lastAssessment: '2024-08-20',
    status: 'Open',
    description: 'Current business continuity plans have not been updated to reflect recent organizational changes'
  },
  {
    id: 'R005',
    title: 'Cloud Configuration Drift',
    category: 'Cloud Security',
    riskScore: 61,
    riskLevel: 'Medium',
    owner: 'Emily Zhang',
    lastAssessment: '2024-08-15',
    status: 'In Progress',
    description: 'Cloud infrastructure configurations may drift from security baselines over time'
  }
];

export const treatmentOptions: TreatmentOption[] = [
  {
    id: 'TO001',
    name: 'Accept Risk',
    description: 'Accept the current risk level and monitor regularly without additional controls',
    estimatedCost: '$0 - $5,000',
    timeframe: 'Immediate',
    effectiveness: 20,
    feasibility: 100
  },
  {
    id: 'TO002',
    name: 'Mitigate Risk',
    description: 'Implement additional controls and safeguards to reduce risk likelihood or impact',
    estimatedCost: '$10,000 - $50,000',
    timeframe: '3-6 months',
    effectiveness: 80,
    feasibility: 75
  },
  {
    id: 'TO003',
    name: 'Transfer Risk',
    description: 'Transfer risk responsibility through insurance policies or third-party contracts',
    estimatedCost: '$5,000 - $25,000',
    timeframe: '1-3 months',
    effectiveness: 70,
    feasibility: 60
  },
  {
    id: 'TO004',
    name: 'Avoid Risk',
    description: 'Eliminate the risk entirely by discontinuing the risky activity or process',
    estimatedCost: '$0 - $100,000',
    timeframe: '6-12 months',
    effectiveness: 100,
    feasibility: 30
  }
];

export const mockOwners = [
  'Sarah Johnson',
  'Mike Chen',
  'Lisa Rodriguez',
  'David Kim',
  'Emily Zhang',
  'Alex Thompson',
  'Maria Garcia',
  'James Wilson'
];

export const mockDepartments = [
  'Information Security',
  'IT Operations',
  'Risk Management',
  'Compliance',
  'Legal',
  'Human Resources',
  'Finance',
  'Operations'
];