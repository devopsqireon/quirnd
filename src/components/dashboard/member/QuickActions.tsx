// src/components/dashboard/member/QuickActions.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, GraduationCap, FileText, AlertTriangle } from 'lucide-react';

interface QuickActionsProps {
  onOpenReportModal: () => void;
}

const actionButtons = [
  {
    title: 'View All Tasks',
    description: 'Access your complete task list',
    icon: CheckSquare,
    bgGradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    hoverGradient: 'hover:from-blue-100 hover:to-blue-200',
    iconBg: 'bg-blue-500',
    iconColor: 'text-white'
  },
  {
    title: 'Start Training',
    description: 'Continue your learning path',
    icon: GraduationCap,
    bgGradient: 'bg-gradient-to-br from-green-50 to-green-100',
    borderColor: 'border-green-200',
    hoverGradient: 'hover:from-green-100 hover:to-green-200',
    iconBg: 'bg-green-500',
    iconColor: 'text-white'
  },
  {
    title: 'Review Policies',
    description: 'Check pending policy approvals',
    icon: FileText,
    bgGradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
    borderColor: 'border-orange-200',
    hoverGradient: 'hover:from-orange-100 hover:to-orange-200',
    iconBg: 'bg-orange-500',
    iconColor: 'text-white'
  },
  {
    title: 'Report Incident',
    description: 'Report security issues quickly',
    icon: AlertTriangle,
    bgGradient: 'bg-gradient-to-br from-red-50 to-red-100',
    borderColor: 'border-red-200',
    hoverGradient: 'hover:from-red-100 hover:to-red-200',
    iconBg: 'bg-red-500',
    iconColor: 'text-white',
    isReportButton: true
  }
];

export default function QuickActions({ onOpenReportModal }: QuickActionsProps) {
  return (
    <section id="quick-actions-section" className="mb-8">
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">Quick Actions</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Frequently used compliance actions</p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actionButtons.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`p-6 ${action.bgGradient} border ${action.borderColor} ${action.hoverGradient} transition-all duration-200 hover:shadow-md h-auto flex flex-col items-center text-center`}
                onClick={action.isReportButton ? onOpenReportModal : undefined}
              >
                <div className={`p-3 ${action.iconBg} rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <action.icon className={`${action.iconColor} h-6 w-6`} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}