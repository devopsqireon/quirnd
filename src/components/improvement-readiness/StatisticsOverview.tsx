// src/components/improvement-readiness/StatisticsOverview.tsx
import React from 'react';
import { AlertTriangle, Lightbulb, Calendar, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatisticsData {
  openCorrectiveActions: number;
  overdueActions: number;
  improvementOpportunities: number;
  inProgressImprovements: number;
  scheduledReviews: number;
  nextReviewDate: string;
  certificationProgress: number;
}

interface StatisticsOverviewProps {
  statistics: StatisticsData;
}

export function StatisticsOverview({ statistics }: StatisticsOverviewProps) {
  const stats = [
    {
      title: 'Open Corrective Actions',
      value: statistics.openCorrectiveActions,
      subtitle: `${statistics.overdueActions} overdue`,
      icon: AlertTriangle,
      bgColor: 'from-red-50 to-red-100',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-200',
      iconColor: 'text-red-600',
      textColor: 'text-red-600',
      valueColor: 'text-red-700',
      subtitleColor: 'text-red-600'
    },
    {
      title: 'Improvement Opportunities',
      value: statistics.improvementOpportunities,
      subtitle: `${statistics.inProgressImprovements} in progress`,
      icon: Lightbulb,
      bgColor: 'from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-200',
      iconBg: 'bg-yellow-200',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-600',
      valueColor: 'text-yellow-700',
      subtitleColor: 'text-yellow-600'
    },
    {
      title: 'Scheduled Reviews',
      value: statistics.scheduledReviews,
      subtitle: `Next: ${statistics.nextReviewDate}`,
      icon: Calendar,
      bgColor: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-200',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-600',
      valueColor: 'text-blue-700',
      subtitleColor: 'text-blue-600'
    },
    {
      title: 'Certification Progress',
      value: `${statistics.certificationProgress}%`,
      subtitle: 'On track',
      icon: Award,
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-200',
      iconColor: 'text-green-600',
      textColor: 'text-green-600',
      valueColor: 'text-green-700',
      subtitleColor: 'text-green-600'
    }
  ];

  return (
    <section className="bg-white px-6 py-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index}
                className={`bg-gradient-to-r ${stat.bgColor} p-6 border ${stat.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${stat.textColor} text-sm font-medium`}>
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${stat.valueColor} mt-2`}>
                      {stat.value}
                    </p>
                    <p className={`${stat.subtitleColor} text-sm mt-1`}>
                      {stat.subtitle}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}