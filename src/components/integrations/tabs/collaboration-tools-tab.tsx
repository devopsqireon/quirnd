// src/components/integrations/tabs/collaboration-tools-tab.tsx
import { IntegrationCard } from "@/components/integrations/integration-card"

export function CollaborationToolsTab() {
  const collaborationTools = [
    {
      name: "Slack",
      description: "Send compliance alerts, incident notifications, and collect evidence directly through Slack channels and DMs.",
      icon: "slack",
      status: "connected" as const,
      lastSync: "3 channels configured",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      name: "Microsoft Teams",
      description: "Integrate with Microsoft Teams to send compliance notifications and automate evidence collection workflows.",
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaboration Tools</h3>
        <p className="text-sm text-gray-600">
          Connect team communication platforms to automate incident notifications and evidence collection.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborationTools.map((tool, index) => (
          <IntegrationCard key={index} {...tool} />
        ))}
      </div>
    </section>
  )
}