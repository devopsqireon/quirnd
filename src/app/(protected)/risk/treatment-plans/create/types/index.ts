// /app/risk/treatment-plans/create/types/index.ts

export interface Risk {
    id: string;
    title: string;
    category: string;
    riskScore: number;
    riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    owner: string;
    lastAssessment: string;
    status: 'Open' | 'In Progress' | 'Closed';
    description: string;
  }
  
  export interface TreatmentOption {
    id: string;
    name: string;
    description: string;
    estimatedCost: string;
    timeframe: string;
    effectiveness: number;
    feasibility: number;
  }
  
  export interface ActionItem {
    id: number;
    title: string;
    description: string;
    owner: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
  }
  
  export interface TreatmentPlanFormData {
    selectedRisks: string[];
    treatmentStrategy: string;
    justification: string;
    budget: string;
    timeline: string;
    actions: ActionItem[];
  }
  
  export interface TreatmentPlanStep {
    step: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isActive: boolean;
    validationFields?: string[];
  }
  
  export interface WizardStepProps {
    formData: TreatmentPlanFormData;
    setFormData: (data: TreatmentPlanFormData) => void;
    onNext: () => void;
    onBack: () => void;
  }
  
  export interface TreatmentPlan {
    id: string;
    title: string;
    description: string;
    status: 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Completed' | 'Cancelled';
    createdBy: string;
    createdDate: string;
    lastUpdated: string;
    risks: Risk[];
    strategy: TreatmentOption;
    implementation: {
      budget: string;
      timeline: string;
      actions: ActionItem[];
    };
    approvers?: string[];
    reviewComments?: string[];
  }