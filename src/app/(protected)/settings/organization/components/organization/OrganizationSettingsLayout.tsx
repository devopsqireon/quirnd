// src/app/(protected)/settings/components/organization/OrganizationSettingsLayout.tsx

'use client';

import { useOrganization } from '@/hooks/useOrganization';
import { SettingsSidebar } from './SettingsSidebar';
import { OrganizationHeader } from './OrganizationHeader';
import { OrganizationInfoSection } from './OrganizationInfoSection';
import { BrandingSection } from './BrandingSection';
import { ComplianceSection } from './ComplianceSection';
import { SecuritySection } from './SecuritySection';
import { NotificationSection } from './NotificationSection';
import { DataExportSection } from './DataExportSection';
import { ApiIntegrationSection } from './ApiIntegrationSection';
import { AdvancedSection } from './AdvancedSection';
import { ActionButtons } from './ActionButtons';

export function OrganizationSettingsLayout() {
  const organizationData = useOrganization();

  if (organizationData.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <SettingsSidebar />
        
        <div className="lg:col-span-3 space-y-8">
          <OrganizationHeader />
          
          <OrganizationInfoSection 
            organization={organizationData.organization}
            onUpdate={organizationData.updateOrganization}
          />
          
          <BrandingSection 
            organization={organizationData.organization}
            onUpdate={organizationData.updateOrganization}
          />
          
          <ComplianceSection 
            settings={organizationData.complianceSettings}
            onUpdate={organizationData.updateComplianceSettings}
          />
          
          <SecuritySection 
            settings={organizationData.securitySettings}
            onUpdate={organizationData.updateSecuritySettings}
          />
          
          <NotificationSection 
            settings={organizationData.notificationSettings}
            onUpdate={organizationData.updateNotificationSettings}
          />
          
          <DataExportSection 
            settings={organizationData.dataExportSettings}
            onUpdate={organizationData.updateDataExportSettings}
          />
          
          <ApiIntegrationSection />
          
          <AdvancedSection />
          
          <ActionButtons 
            saving={organizationData.saving}
            hasUnsavedChanges={organizationData.hasUnsavedChanges}
            onSave={organizationData.saveChanges}
            onReset={organizationData.resetChanges}
          />
        </div>
      </div>
    </main>
  );
}