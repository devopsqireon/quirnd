// src/components/integrations/integration-tabs.tsx
import { cn } from "@/lib/utils"
import { Cloud, MessageSquare, ListChecks, Shield, Code } from "lucide-react"

interface IntegrationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function IntegrationTabs({ activeTab, onTabChange }: IntegrationTabsProps) {
  const tabs = [
    {
      id: "cloud-providers",
      label: "Cloud Providers",
      icon: Cloud
    },
    {
      id: "collaboration-tools",
      label: "Collaboration Tools",
      icon: MessageSquare
    },
    {
      id: "itsm-tools",
      label: "ITSM / Project Tools",
      icon: ListChecks
    },
    {
      id: "siem-tools",
      label: "SIEM / Security Tools",
      icon: Shield
    },
    {
      id: "custom-integrations",
      label: "Custom Integrations",
      icon: Code
    }
  ]

  return (
    <section className="px-8 py-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center",
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              )}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}