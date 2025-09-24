// src/components/integrations/webhook-dialog.tsx
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

interface WebhookDialogProps {
  children: React.ReactNode
  onSave: (webhookData: {
    url: string
    eventTypes: string[]
    secret?: string
  }) => void
}

export function WebhookDialog({ children, onSave }: WebhookDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    url: "",
    secret: "",
    eventTypes: {
      "compliance.incident.created": false,
      "compliance.incident.updated": false,
      "evidence.uploaded": false,
      "asset.discovered": false,
      "integration.connected": false,
      "integration.disconnected": false
    }
  })

  const handleEventTypeChange = (eventType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      eventTypes: {
        ...prev.eventTypes,
        [eventType]: checked
      }
    }))
  }

  const handleSave = () => {
    if (!formData.url.trim()) {
      toast.error("Please enter a webhook URL")
      return
    }

    const selectedEventTypes = Object.entries(formData.eventTypes)
      .filter(([, selected]) => selected)
      .map(([eventType]) => eventType)

    if (selectedEventTypes.length === 0) {
      toast.error("Please select at least one event type")
      return
    }

    onSave({
      url: formData.url,
      eventTypes: selectedEventTypes,
      secret: formData.secret || undefined
    })

    setOpen(false)
    setFormData({
      url: "",
      secret: "",
      eventTypes: {
        "compliance.incident.created": false,
        "compliance.incident.updated": false,
        "evidence.uploaded": false,
        "asset.discovered": false,
        "integration.connected": false,
        "integration.disconnected": false
      }
    })
  }

  const eventTypeLabels = {
    "compliance.incident.created": "Compliance Incident Created",
    "compliance.incident.updated": "Compliance Incident Updated", 
    "evidence.uploaded": "Evidence Uploaded",
    "asset.discovered": "Asset Discovered",
    "integration.connected": "Integration Connected",
    "integration.disconnected": "Integration Disconnected"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Webhook</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              type="url"
              placeholder="https://api.example.com/webhooks"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="secret">Secret (Optional)</Label>
            <Input
              id="secret"
              placeholder="Enter webhook secret for signature verification"
              value={formData.secret}
              onChange={(e) => setFormData(prev => ({ ...prev, secret: e.target.value }))}
            />
            <p className="text-xs text-gray-500 mt-1">
              Used to verify webhook authenticity via HMAC signature
            </p>
          </div>

          <div>
            <Label>Event Types</Label>
            <div className="space-y-2 mt-2">
              {Object.entries(eventTypeLabels).map(([eventType, label]) => (
                <div key={eventType} className="flex items-center space-x-2">
                  <Checkbox
                    id={eventType}
                    checked={formData.eventTypes[eventType as keyof typeof formData.eventTypes]}
                    onCheckedChange={(checked) => 
                      handleEventTypeChange(eventType, checked as boolean)
                    }
                  />
                  <Label htmlFor={eventType} className="text-sm font-normal">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Webhook Format:</strong> Payloads will be sent as JSON with event data 
              and metadata. Check our documentation for payload schemas.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Add Webhook
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}