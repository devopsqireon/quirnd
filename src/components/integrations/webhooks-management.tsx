// src/components/integrations/webhooks-management.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { toast } from "sonner"

export function WebhooksManagement() {
  const webhooks = [
    {
   //  url: "https://api.example.com/webhooks/compliance",
      eventType: "compliance.incident.created",
      createdDate: "Jan 10, 2024",
      lastTriggered: "1 hour ago",
      status: "Active"
    },
    {
    //  url: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
      eventType: "evidence.uploaded",
      createdDate: "Dec 15, 2023",
      lastTriggered: "3 days ago",
      status: "Failed"
    }
  ]

  const handleTestWebhook = (url: string) => {
    toast.success(`Testing webhook: ${url.substring(0, 30)}...`)
  }

  const handleEditWebhook = (url: string) => {
    toast.info(`Editing webhook: ${url.substring(0, 30)}...`)
  }

  const handleDeleteWebhook = (url: string) => {
    toast.warning(`Deleting webhook: ${url.substring(0, 30)}...`)
  }

  const handleAddWebhook = () => {
    toast.success("New webhook added successfully")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Webhooks</CardTitle>
          <Button onClick={handleAddWebhook}>
            <Plus className="w-4 h-4 mr-2" />
            Add Webhook
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint URL</TableHead>
              <TableHead>Event Type</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Last Triggered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map((webhook, index) => (
              <TableRow key={index}>
                <TableCell className="max-w-xs truncate">{webhook.url}</TableCell>
                <TableCell>{webhook.eventType}</TableCell>
                <TableCell>{webhook.createdDate}</TableCell>
                <TableCell>{webhook.lastTriggered}</TableCell>
                <TableCell>
                  <Badge variant={webhook.status === "Active" ? "default" : "destructive"}>
                    {webhook.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleTestWebhook(webhook.url)}>
                      Test
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditWebhook(webhook.url)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteWebhook(webhook.url)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}