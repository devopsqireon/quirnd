// src/components/integrations/tabs/custom-integrations-tab.tsx
import { APIKeysManagement } from "@/components/integrations/api-keys-management"
import { WebhooksManagement } from "@/components/integrations/webhooks-management"

export function CustomIntegrationsTab() {
  return (
    <section className="px-8 py-6 tab-content">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Integrations</h3>
        <p className="text-sm text-gray-600">
          Manage API keys and webhooks for custom integrations with your existing tools and systems.
        </p>
      </div>

      <APIKeysManagement />
      <WebhooksManagement />
    </section>
  )
}