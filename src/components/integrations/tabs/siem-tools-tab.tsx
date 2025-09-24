// src/components/integrations/tabs/siem-tools-tab.tsx
import { IntegrationCard } from "@/components/integrations/integration-card"

export function SIEMToolsTab() {
  const siemTools = [
    {
      name: "Splunk",
      description: "Collect security logs and events from Splunk to automatically generate evidence for security controls and incident response.",
      icon: "splunk",
      status: "connected" as const,
      lastSync: "2.3M events processed today",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      name: "Microsoft Sentinel",
      description: "Integrate with Microsoft Sentinel to collect security incidents, alerts, and threat intelligence for compliance reporting.",
      icon: "microsoft",
      status: "not-connected" as const,
      lastSync: "Ready to connect",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    }
  ]

  return (
    <section className="px-8 py-6 tab-content">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">SIEM / Security Tools</h3>
        <p className="text-sm text-gray-600">
          Connect security information and event management tools for automated threat detection and incident response.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siemTools.map((tool, index) => (
          <IntegrationCard key={index} {...tool} />
        ))}
      </div>
    </section>
  )
}