    // src/components/integrations/tabs/itsm-tools-tab.tsx
import { IntegrationCard } from "@/components/integrations/integration-card"

export function ITSMToolsTab() {
  const itsmTools = [
    {
      name: "Jira",
      description: "Automatically create Jira tickets for compliance issues and track remediation progress through your existing workflows.",
      icon: "jira",
      status: "connected" as const,
      lastSync: "15 tickets created this month",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      name: "ServiceNow",
      description: "Integrate with ServiceNow ITSM to create incidents, change requests, and track compliance-related service requests.",
      icon: "servicenow",
      status: "error" as const,
      lastSync: "Authentication failed",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    }
  ]

  return (
    <section className="px-8 py-6 tab-content">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">ITSM / Project Tools</h3>
        <p className="text-sm text-gray-600">
          Connect project management and ITSM tools to track compliance tasks and incidents.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itsmTools.map((tool, index) => (
          <IntegrationCard key={index} {...tool} />
        ))}
      </div>
    </section>
  )
}