// src/components/incident-management/activity-overview.tsx
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  Flame, 
  Clock, 
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  change: string;
  changeType: 'increase' | 'decrease';
  changeLabel: string;
  icon: React.ReactNode;
  badgeText: string;
  badgeVariant: 'destructive' | 'default' | 'secondary';
}

function MetricCard({ 
  title, 
  value, 
  description, 
  change, 
  changeType, 
  changeLabel, 
  icon, 
  badgeText,
  badgeVariant 
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-red-100 p-2 rounded-lg">
            {icon}
          </div>
          <Badge variant={badgeVariant} className="text-sm font-medium">
            {badgeText}
          </Badge>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="mt-3 flex items-center text-sm">
          <span className={`${changeType === 'increase' ? 'text-red-600' : 'text-green-600'} flex items-center`}>
            {changeType === 'increase' ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {change}
          </span>
          <span className="text-gray-500 ml-1">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActivityOverview() {
  const metrics = [
    {
      title: "Open Incidents",
      value: "24",
      description: "Open Incidents",
      change: "12.5%",
      changeType: "increase" as const,
      changeLabel: "vs last week",
      icon: <AlertCircle className="text-red-600 h-5 w-5" />,
      badgeText: "+3 today",
      badgeVariant: "destructive" as const
    },
    {
      title: "Critical Incidents",
      value: "8",
      description: "Critical Incidents",
      change: "33.3%",
      changeType: "increase" as const,
      changeLabel: "vs last week",
      icon: <Flame className="text-orange-600 h-5 w-5" />,
      badgeText: "+1 today",
      badgeVariant: "default" as const
    },
    {
      title: "Avg. Time to Resolution",
      value: "18.5h",
      description: "Avg. Time to Resolution",
      change: "10.2%",
      changeType: "decrease" as const,
      changeLabel: "improvement",
      icon: <Clock className="text-green-600 h-5 w-5" />,
      badgeText: "-2h",
      badgeVariant: "secondary" as const
    },
    {
      title: "Incidents This Month",
      value: "47",
      description: "Incidents This Month",
      change: "8.5%",
      changeType: "increase" as const,
      changeLabel: "vs last month",
      icon: <Calendar className="text-blue-600 h-5 w-5" />,
      badgeText: "Dec 2024",
      badgeVariant: "default" as const
    }
  ];

  return (
    <section className="px-8 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Activity Overview</h2>
        <p className="text-gray-600">Real-time insights into your incident management metrics and KPIs.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </section>
  );
}