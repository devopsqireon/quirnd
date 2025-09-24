// /app/risk/treatment-plans/types/treatment-plan.types.ts
export interface TreatmentAction {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed' | 'blocked';
    assignee: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
  }
  
  export interface TreatmentPlan {
    id: string;
    title: string;
    riskId: string;
    riskTitle: string;
    controlDescription: string;
    annexAControl: string;
    category: 'mitigate' | 'transfer' | 'avoid' | 'accept';
    priority: 'critical' | 'high' | 'medium' | 'low';
    status: 'draft' | 'approved' | 'in-progress' | 'completed' | 'on-hold' | 'overdue';
    owner: string;
    assignee: string;
    responsibility: string;
    department: string;
    targetDate: string;
    achievedDate: string | null;
    dueDate: string;
    completionRate: number;
    budget: number;
    actualCost: number;
    createdDate: string;
    lastUpdated: string;
    actions: TreatmentAction[];
  }
  
  export type TreatmentPlanStatus = TreatmentPlan['status'];
  export type TreatmentPlanCategory = TreatmentPlan['category'];
  export type TreatmentPlanPriority = TreatmentPlan['priority'];