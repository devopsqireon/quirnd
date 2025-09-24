// src/app/(protected)/settings/help-support/components/HelpSupportLayout.tsx
'use client';
import React, { useState } from 'react';
import { HelpSupportHeader } from './HelpSupportHeader';
import { NavigationTabs } from './NavigationTabs';
import { QuickActions } from './QuickActions';
import { TicketSubmissionForm } from './TicketSubmissionForm';
import { TicketDashboard } from './TicketDashboard';
import { RecentActivity } from './RecentActivity';
import { SupportSidebar } from './SupportSidebar';
import { KnowledgeBase } from './KnowledgeBase';
import { SupportAnalytics } from './SupportAnalytics';
import { NotificationsUpdates } from './NotificationsUpdates';
import { ChatWidget } from './ChatWidget';

export function HelpSupportLayout() {
  const [activeTab, setActiveTab] = useState('submit-ticket');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'submit-ticket':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TicketSubmissionForm />
              <RecentActivity />
            </div>
            <div className="space-y-8">
              <SupportSidebar />
            </div>
          </div>
        );
      case 'my-tickets':
        return <TicketDashboard />;
      case 'knowledge-base':
        return <KnowledgeBase />;
      case 'analytics':
        return <SupportAnalytics />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TicketSubmissionForm />
              <RecentActivity />
            </div>
            <div className="space-y-8">
              <SupportSidebar />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HelpSupportHeader />
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <QuickActions />
        {renderTabContent()}
        <NotificationsUpdates />
      </main>
      
      <ChatWidget />
    </div>
  );
}