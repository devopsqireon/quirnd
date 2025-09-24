// src/components/integrations/tabs/cloud-providers-tab.tsx
import { IntegrationCard } from "@/components/integrations/integration-card"

export function CloudProvidersTab() {
  const cloudProviders = [
    {
      name: "Amazon Web Services",
      description: "Automatically sync AWS resources including EC2 instances, S3 buckets, RDS databases, and security groups into your Asset Register.",
      icon: "aws",
      status: "connected" as const,
      lastSync: "5 min ago",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      name: "Microsoft Azure",
      description: "Discover and monitor Azure resources including Virtual Machines, Storage Accounts, Key Vaults, and Azure Active Directory configurations.",
      icon: "microsoft",
      status: "warning" as const,
      lastSync: "API quota exceeded",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      name: "Google Cloud Platform",
      description: "Integrate with Google Cloud to inventory Compute Engine instances, Cloud Storage buckets, BigQuery datasets, and IAM policies.",
      icon: "google",
      status: "not-connected" as const,
      lastSync: "Ready to connect",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    }
  ]

  return (
    <section className="px-8 py-6 tab-content">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloud Providers</h3>
        <p className="text-sm text-gray-600">
          Connect to major cloud platforms to automatically discover and inventory cloud assets.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cloudProviders.map((provider, index) => (
          <IntegrationCard key={index} {...provider} />
        ))}
      </div>
    </section>
  )
}