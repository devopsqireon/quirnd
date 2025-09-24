// /app/awareness-training/components/reports/MetricsOverview.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, TrendingUp, BarChart3, AlertTriangle, Award } from 'lucide-react';
import { TrainingMetrics } from '../../types';
import { formatTimeSpent } from '../../utils/helpers';

interface MetricsOverviewProps {
  metrics: TrainingMetrics;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Total Programs',
      value: metrics.totalPrograms,
      icon: BookOpen,
      color: 'text-blue-600',
      change: '+2 from last month',
      changeColor: 'text-green-600'
    },
    {
      title: 'Active Assignments',
      value: metrics.activeAssignments,
      icon: Users,
      color: 'text-purple-600',
      change: '+12 this week',
      changeColor: 'text-blue-600'
    },
    {
      title: 'Completion Rate',
      value: `${metrics.completionRate}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      change: '+2.1% from last month',
      changeColor: 'text-green-600'
    },
    {
      title: 'Average Score',
      value: `${metrics.averageScore}%`,
      icon: BarChart3,
      color: 'text-orange-600',
      change: '+1.2% from last month',
      changeColor: 'text-green-600'
    },
    {
      title: 'Overdue Assignments',
      value: metrics.overdueAssignments,
      icon: AlertTriangle,
      color: 'text-red-600',
      change: '-3 from last week',
      changeColor: 'text-green-600'
    },
    {
      title: 'Certificates Issued',
      value: metrics.certificatesIssued,
      icon: Award,
      color: 'text-yellow-600',
      change: '+15 this month',
      changeColor: 'text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricCards.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <IconComponent className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.changeColor}`}>
                {metric.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsOverview;