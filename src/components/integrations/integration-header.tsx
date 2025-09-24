// src/components/integrations/integration-header.tsx
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"
import { toast } from "sonner"

export function IntegrationHeader() {
  const handleExportConfig = () => {
    toast.success("Configuration exported successfully")
  }

  const handleAddIntegration = () => {
    toast.info("Add integration modal would open here")
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
            <p className="mt-1 text-sm text-gray-600">
              Connect Qireon with external systems to automate asset discovery, incident reporting, and evidence collection.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="inline-flex items-center" onClick={handleExportConfig}>
              <Download className="w-4 h-4 mr-2" />
              Export Config
            </Button>
            <Button className="inline-flex items-center" onClick={handleAddIntegration}>
              <Plus className="w-4 h-4 mr-2" />
              Add Integration
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}