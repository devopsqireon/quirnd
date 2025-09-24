// src/app/(protected)/improvement-readiness/page.tsx
'use client';

import React, { useState } from 'react';
import { ImprovementReadinessLayout } from '@/components/improvement-readiness/ImprovementReadinessLayout';
import { StatisticsOverview } from '@/components/improvement-readiness/StatisticsOverview';
import { TabNavigation } from '@/components/improvement-readiness/TabNavigation';
import { CorrectiveActionsTab } from '@/components/improvement-readiness/tabs/CorrectiveActionsTab';
import { ImprovementLogTab } from '@/components/improvement-readiness/tabs/ImprovementLogTab';
import { ManagementReviewsTab } from '@/components/improvement-readiness/tabs/ManagementReviewsTab';
import { CertificationDashboardTab } from '@/components/improvement-readiness/tabs/CertificationDashboardTab';
import { QuickActionsSidebar } from '@/components/improvement-readiness/QuickActionsSidebar';
import { ModalsProvider } from '@/components/improvement-readiness/modals/ModalsProvider';
import { useImprovementReadinessData } from '@/hooks/useImprovementReadinessData';

export default function ImprovementReadinessPage() {
  const [activeTab, setActiveTab] = useState('corrective-actions');
  const [isQuickActionsSidebarOpen, setIsQuickActionsSidebarOpen] = useState(false);
  const { data, isLoading, error } = useImprovementReadinessData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'corrective-actions':
        return <CorrectiveActionsTab data={data.correctiveActions} />;
      case 'improvement-log':
        return <ImprovementLogTab data={data.improvementOpportunities} />;
      case 'management-reviews':
        return <ManagementReviewsTab data={data.managementReviews} />;
      case 'certification-dashboard':
        return <CertificationDashboardTab data={data.certificationData} />;
      default:
        return <CorrectiveActionsTab data={data.correctiveActions} />;
    }
  };

  return (
    <ModalsProvider>
      <ImprovementReadinessLayout>
        <StatisticsOverview statistics={data.statistics} />
        
        <main className="bg-gray-50 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <TabNavigation 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
              />
              {renderActiveTab()}
            </div>
          </div>
        </main>

        <QuickActionsSidebar 
          isOpen={isQuickActionsSidebarOpen}
          onClose={() => setIsQuickActionsSidebarOpen(false)}
        />
      </ImprovementReadinessLayout>
    </ModalsProvider>
  );
}