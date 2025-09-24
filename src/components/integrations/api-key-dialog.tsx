// src/components/integrations/api-key-dialog.tsx
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface ApiKeyDialogProps {
  children: React.ReactNode
  onSave: (keyData: { name: string; description: string; permissions: string[] }) => void
}

export function ApiKeyDialog({ children, onSave }: ApiKeyDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: "read"
  })

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a key name")
      return
    }

    const permissions = formData.permissions === "admin" 
      ? ["read", "write", "admin"] 
      : formData.permissions === "write" 
      ? ["read", "write"] 
      : ["read"]

    onSave({
      name: formData.name,
      description: formData.description,
      permissions
    })

    setOpen(false)
    setFormData({ name: "", description: "", permissions: "read" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate New API Key</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="keyName">Key Name</Label>
            <Input
              id="keyName"
              placeholder="e.g., Production API Key"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe what this API key will be used for"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="permissions">Permissions</Label>
            <Select 
              value={formData.permissions} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, permissions: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read Only</SelectItem>
                <SelectItem value="write">Read & Write</SelectItem>
                <SelectItem value="admin">Full Admin Access</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Security Notice:</strong> This API key will only be shown once. 
              Make sure to copy and store it securely.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Generate API Key
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