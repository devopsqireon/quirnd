// /app/risk/treatment-plans/utils/helpers.ts
import { TreatmentPlan, FilterState } from '../types';

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'mitigate': return 'bg-blue-100 text-blue-800';
    case 'transfer': return 'bg-purple-100 text-purple-800';
    case 'avoid': return 'bg-red-100 text-red-800';
    case 'accept': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'approved': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'on-hold': return 'bg-orange-100 text-orange-800';
    case 'overdue': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString();
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const filterTreatmentPlans = (
  plans: TreatmentPlan[],
  filters: FilterState
): TreatmentPlan[] => {
  return plans.filter(plan => {
    const matchesSearch = !filters.search || 
      plan.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      plan.riskTitle.toLowerCase().includes(filters.search.toLowerCase()) ||
      plan.owner.toLowerCase().includes(filters.search.toLowerCase()) ||
      plan.controlDescription.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory = !filters.category || plan.category === filters.category;
    const matchesPriority = !filters.priority || plan.priority === filters.priority;
    const matchesStatus = !filters.status || plan.status === filters.status;
    const matchesOwner = !filters.owner || 
      plan.owner.toLowerCase().includes(filters.owner.toLowerCase());
    const matchesDepartment = !filters.department || 
      plan.department.toLowerCase().includes(filters.department.toLowerCase());

    return matchesSearch && matchesCategory && matchesPriority && 
           matchesStatus && matchesOwner && matchesDepartment;
  });
};

export const sortTreatmentPlans = (
  plans: TreatmentPlan[],
  sortKey: keyof TreatmentPlan,
  direction: 'asc' | 'desc'
): TreatmentPlan[] => {
  return [...plans].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};