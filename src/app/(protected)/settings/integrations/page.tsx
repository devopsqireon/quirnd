// src/app/(protected)/settings/integrations/page.tsx
"use client"

import { useState } from "react"
import { IntegrationHeader } from "@/components/integrations/integration-header"
import { IntegrationStatusOverview } from "@/components/integrations/integration-status-overview"
import { IntegrationTabs } from "@/components/integrations/integration-tabs"
import { CloudProvidersTab } from "@/components/integrations/tabs/cloud-providers-tab"
import { CollaborationToolsTab } from "@/components/integrations/tabs/collaboration-tools-tab"
import { ITSMToolsTab } from "@/components/integrations/tabs/itsm-tools-tab"
import { SIEMToolsTab } from "@/components/integrations/tabs/siem-tools-tab"
import { CustomIntegrationsTab } from "@/components/integrations/tabs/custom-integrations-tab"
import { IntegrationActivityLog } from "@/components/integrations/integration-activity-log"
import { IntegrationHealthDashboard } from "@/components/integrations/integration-health-dashboard"
import { Toaster } from "@/components/ui/sonner"

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("custom-integrations")

  const renderTabContent = () => {
    switch (activeTab) {
      case "cloud-providers":
        return <CloudProvidersTab />
      case "collaboration-tools":
        return <CollaborationToolsTab />
      case "itsm-tools":
        return <ITSMToolsTab />
      case "siem-tools":
        return <SIEMToolsTab />
      case "custom-integrations":
        return <CustomIntegrationsTab />
      default:
        return <CustomIntegrationsTab />
    }
  }

  return (
    <div>
      <IntegrationHeader />
      <IntegrationStatusOverview />
      <IntegrationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
      <IntegrationActivityLog />
      <IntegrationHealthDashboard />
      <Toaster />
    </div>
  )
}