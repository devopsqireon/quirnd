// /app/risk/treatment-plans/components/layout/StatsDashboard.tsx
import React from 'react';
import { 
  FileText, 
  PlayCircle, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  Target
} from 'lucide-react';
import { TreatmentPlan } from '../../types';

interface StatsDashboardProps {
  plans: TreatmentPlan[];
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, bgColor, description }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`${bgColor} rounded-md p-3`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ plans }) => {
  const totalPlans = plans.length;
  const inProgress = plans.filter(p => p.status === 'in-progress').length;
  const completed = plans.filter(p => p.status === 'completed').length;
  const overdue = plans.filter(p => p.status === 'overdue').length;
  const onHold = plans.filter(p => p.status === 'on-hold').length;
  
  const totalBudget = plans.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = plans.reduce((sum, p) => sum + p.actualCost, 0);
  const avgCompletion = totalPlans > 0 ? Math.round(plans.reduce((sum, p) => sum + p.completionRate, 0) / totalPlans) : 0;

  const stats = [
    {
      title: 'Total Plans',
      value: totalPlans.toString(),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active treatment plans'
    },
    {
      title: 'In Progress',
      value: inProgress.toString(),
      icon: PlayCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Currently executing'
    },
    {
      title: 'Completed',
      value: completed.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Successfully finished'
    },
    {
      title: 'Overdue',
      value: overdue.toString(),
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Past target date'
    },
    {
      title: 'Budget Used',
      value: `${Math.round((totalSpent / totalBudget) * 100) || 0}%`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: `${totalSpent.toLocaleString()} of ${totalBudget.toLocaleString()}`
    },
    {
      title: 'Avg Progress',
      value: `${avgCompletion}%`,
      icon: Target,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Overall completion rate'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
          description={stat.description}
        />
      ))}
    </div>
  );
};