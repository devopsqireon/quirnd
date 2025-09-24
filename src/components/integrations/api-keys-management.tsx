// src/components/integrations/api-keys-management.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Copy, Eye } from "lucide-react"
import { toast } from "sonner"

export function APIKeysManagement() {
  const apiKeys = [
    {
      name: "Production API",
      key: "qir_••••••••••••••••••••••••••••••••",
      createdBy: "John Smith",
      createdDate: "Jan 15, 2024",
      lastUsed: "2 hours ago",
      status: "Active"
    },
    {
      name: "Development API",
      key: "qir_••••••••••••••••••••••••••••••••",
      createdBy: "Sarah Johnson",
      createdDate: "Dec 20, 2023",
      lastUsed: "Never",
      status: "Inactive"
    }
  ]

  const handleCopyKey = (keyName: string) => {
    toast.success(`${keyName} copied to clipboard`)
  }

  const handleToggleVisibility = (keyName: string) => {
    toast.info(`Toggled visibility for ${keyName}`)
  }

  const handleEditKey = (keyName: string) => {
    toast.info(`Editing ${keyName}`)
  }

  const handleRevokeKey = (keyName: string) => {
    toast.warning(`Revoking ${keyName}`)
  }

  const handleGenerateKey = () => {
    toast.success("New API key generated successfully")
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>API Keys</CardTitle>
          <Button onClick={handleGenerateKey}>
            <Plus className="w-4 h-4 mr-2" />
            Generate New Key
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((apiKey, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{apiKey.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm text-gray-600">{apiKey.key}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyKey(apiKey.name)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleToggleVisibility(apiKey.name)}>
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{apiKey.createdBy}</TableCell>
                <TableCell>{apiKey.createdDate}</TableCell>
                <TableCell>{apiKey.lastUsed}</TableCell>
                <TableCell>
                  <Badge variant={apiKey.status === "Active" ? "default" : "secondary"}>
                    {apiKey.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditKey(apiKey.name)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleRevokeKey(apiKey.name)}>
                      Revoke
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