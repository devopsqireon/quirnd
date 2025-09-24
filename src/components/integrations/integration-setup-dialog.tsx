// src/components/integrations/integration-setup-dialog.tsx
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, AlertTriangle, XCircle, Info, Eye, EyeOff, Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface IntegrationSetupDialogProps {
  children: React.ReactNode
  integrationName: string
  integrationIcon: string
  integrationType: "aws" | "azure" | "gcp" | "slack" | "teams" | "jira" | "servicenow" | "splunk" | "sentinel"
  onSave: (config: any) => void
}

export function IntegrationSetupDialog({ 
  children, 
  integrationName, 
  integrationIcon, 
  integrationType,
  onSave 
}: IntegrationSetupDialogProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("connection")
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [showSecrets, setShowSecrets] = useState(false)
  const [config, setConfig] = useState(getDefaultConfig(integrationType))

  const handleTestConnection = async () => {
    setConnectionStatus("testing")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const isValid = validateConfig(config, integrationType)
    
    if (isValid) {
      setConnectionStatus("success")
      toast.success("Connection test successful!")
    } else {
      setConnectionStatus("error")
      toast.error("Connection test failed. Please check your credentials.")
    }
  }

  const handleSave = () => {
    if (connectionStatus !== "success") {
      toast.error("Please test the connection before saving")
      return
    }
    
    onSave(config)
    setOpen(false)
    toast.success(`${integrationName} integration configured successfully`)
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const getConnectionButton = () => {
    switch (connectionStatus) {
      case "testing":
        return (
          <Button disabled className="w-full">
            Testing Connection...
          </Button>
        )
      case "success":
        return (
          <Button className="w-full bg-green-100 text-green-700 hover:bg-green-200">
            <CheckCircle className="w-4 h-4 mr-2" />
            Connection Successful
          </Button>
        )
      case "error":
        return (
          <Button variant="destructive" className="w-full" onClick={handleTestConnection}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Test Failed - Retry
          </Button>
        )
      default:
        return (
          <Button 
            onClick={handleTestConnection} 
            className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            Test Connection
          </Button>
        )
    }
  }

  const renderConnectionForm = () => {
    switch (integrationType) {
      case "aws":
        return renderAWSForm()
      case "azure":
        return renderAzureForm()
      case "gcp":
        return renderGCPForm()
      case "slack":
        return renderSlackForm()
      case "teams":
        return renderTeamsForm()
      case "jira":
        return renderJiraForm()
      case "servicenow":
        return renderServiceNowForm()
      case "splunk":
        return renderSplunkForm()
      case "sentinel":
        return renderSentinelForm()
      default:
        return renderGenericForm()
    }
  }

  const renderAWSForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="accessKey">AWS Access Key ID</Label>
        <div className="relative">
          <Input
            id="accessKey"
            placeholder="AKIA..."
            type={showSecrets ? "text" : "password"}
            value={config.accessKey || ""}
            onChange={(e) => setConfig(prev => ({ ...prev, accessKey: e.target.value }))}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="secretKey">AWS Secret Access Key</Label>
        <div className="relative">
          <Input
            id="secretKey"
            type={showSecrets ? "text" : "password"}
            placeholder="Enter secret key"
            value={config.secretKey || ""}
            onChange={(e) => setConfig(prev => ({ ...prev, secretKey: e.target.value }))}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => handleCopyToClipboard(config.secretKey || "")}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="region">Region</Label>
        <Select 
          value={config.region || "us-east-1"} 
          onValueChange={(value) => setConfig(prev => ({ ...prev, region: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us-east-1">US East (N. Virginia) - us-east-1</SelectItem>
            <SelectItem value="us-west-2">US West (Oregon) - us-west-2</SelectItem>
            <SelectItem value="eu-west-1">Europe (Ireland) - eu-west-1</SelectItem>
            <SelectItem value="eu-central-1">Europe (Frankfurt) - eu-central-1</SelectItem>
            <SelectItem value="ap-southeast-1">Asia Pacific (Singapore) - ap-southeast-1</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="roleArn">IAM Role ARN (Optional)</Label>
        <Input
          id="roleArn"
          placeholder="arn:aws:iam::123456789012:role/QireonIntegrationRole"
          value={config.roleArn || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, roleArn: e.target.value }))}
        />
        <p className="text-xs text-gray-500 mt-1">
          If specified, Qireon will assume this role for resource access
        </p>
      </div>
    </div>
  )

  const renderAzureForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="tenantId">Tenant ID</Label>
        <Input
          id="tenantId"
          placeholder="00000000-0000-0000-0000-000000000000"
          value={config.tenantId || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, tenantId: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="clientId">Client ID</Label>
        <Input
          id="clientId"
          placeholder="Application (client) ID"
          value={config.clientId || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, clientId: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="clientSecret">Client Secret</Label>
        <div className="relative">
          <Input
            id="clientSecret"
            type={showSecrets ? "text" : "password"}
            placeholder="Enter client secret"
            value={config.clientSecret || ""}
            onChange={(e) => setConfig(prev => ({ ...prev, clientSecret: e.target.value }))}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="subscriptionId">Subscription ID</Label>
        <Input
          id="subscriptionId"
          placeholder="Azure subscription ID"
          value={config.subscriptionId || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, subscriptionId: e.target.value }))}
        />
      </div>
    </div>
  )

  const renderSlackForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="botToken">Bot User OAuth Token</Label>
        <div className="relative">
          <Input
            id="botToken"
            type={showSecrets ? "text" : "password"}
            placeholder="xoxb-..."
            value={config.botToken || ""}
            onChange={(e) => setConfig(prev => ({ ...prev, botToken: e.target.value }))}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="signingSecret">Signing Secret</Label>
        <Input
          id="signingSecret"
          type={showSecrets ? "text" : "password"}
          placeholder="Slack app signing secret"
          value={config.signingSecret || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, signingSecret: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="defaultChannel">Default Channel</Label>
        <Input
          id="defaultChannel"
          placeholder="#security-alerts"
          value={config.defaultChannel || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, defaultChannel: e.target.value }))}
        />
        <p className="text-xs text-gray-500 mt-1">
          Channel where notifications will be sent by default
        </p>
      </div>
    </div>
  )

  const renderJiraForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="baseUrl">Jira Base URL</Label>
        <Input
          id="baseUrl"
          placeholder="https://yourcompany.atlassian.net"
          value={config.baseUrl || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your-email@company.com"
          value={config.email || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="apiToken">API Token</Label>
        <div className="relative">
          <Input
            id="apiToken"
            type={showSecrets ? "text" : "password"}
            placeholder="Your Jira API token"
            value={config.apiToken || ""}
            onChange={(e) => setConfig(prev => ({ ...prev, apiToken: e.target.value }))}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        <div className="flex items-center mt-1">
          <ExternalLink className="w-3 h-3 mr-1" />
          <a 
            href="https://id.atlassian.com/manage-profile/security/api-tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Create API token
          </a>
        </div>
      </div>
      <div>
        <Label htmlFor="projectKey">Default Project Key</Label>
        <Input
          id="projectKey"
          placeholder="COMP"
          value={config.projectKey || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, projectKey: e.target.value }))}
        />
      </div>
    </div>
  )

  const renderGenericForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="endpoint">API Endpoint</Label>
        <Input
          id="endpoint"
          placeholder="https://api.example.com"
          value={config.endpoint || ""}
          onChange={(e) => setConfig(prev => ({ ...prev, endpoint: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="apiKey">API Key</Label>
        <div className="relative">
          <Input
            id="apiKey"
            type={showSecrets ? "text" : "password"}
            placeholder="Enter API key"
            value={config.apiKey || ""}
            onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderServiceNowForm = () => renderGenericForm()
  const renderSplunkForm = () => renderGenericForm()
  const renderSentinelForm = () => renderAzureForm()
  const renderGCPForm = () => renderGenericForm()
  const renderTeamsForm = () => renderGenericForm()

  const renderPermissionsTab = () => {
    const permissions = getPermissionsForType(integrationType)
    
    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-2">Resource Access</h4>
          <p className="text-sm text-gray-600 mb-4">
            Select which resources Qireon can access and monitor.
          </p>
          <div className="space-y-3">
            {permissions.map((permission) => (
              <div key={permission.key} className="flex items-start space-x-3">
                <Checkbox
                  id={permission.key}
                  checked={config.permissions?.[permission.key] || false}
                  onCheckedChange={(checked) => 
                    setConfig(prev => ({ 
                      ...prev, 
                      permissions: { 
                        ...prev.permissions, 
                        [permission.key]: checked as boolean 
                      } 
                    }))
                  }
                />
                <div className="flex-1">
                  <Label htmlFor={permission.key} className="text-sm font-medium">
                    {permission.label}
                  </Label>
                  <p className="text-xs text-gray-500">{permission.description}</p>
                  {permission.required && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Required
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-base font-medium text-gray-900 mb-4">Sync Settings</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="syncFrequency">Sync Frequency</Label>
            <Select 
              value={config.syncFrequency || "realtime"} 
              onValueChange={(value) => setConfig(prev => ({ ...prev, syncFrequency: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="15min">Every 15 minutes</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="retryAttempts">Retry Attempts</Label>
            <Select 
              value={config.retryAttempts?.toString() || "3"} 
              onValueChange={(value) => setConfig(prev => ({ ...prev, retryAttempts: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 attempt</SelectItem>
                <SelectItem value="3">3 attempts</SelectItem>
                <SelectItem value="5">5 attempts</SelectItem>
                <SelectItem value="10">10 attempts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="enableLogging"
              checked={config.enableLogging || false}
              onCheckedChange={(checked) => 
                setConfig(prev => ({ ...prev, enableLogging: checked as boolean }))
              }
            />
            <Label htmlFor="enableLogging">Enable detailed logging</Label>
          </div>
        </div>
      </div>

      {connectionStatus === "success" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last test:</span>
                <span className="text-gray-900">Just now</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Response time:</span>
                <span className="text-gray-900">247ms</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-5 h-5 bg-orange-600 rounded"></div>
            </div>
            {integrationName} Integration Setup
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="permissions" disabled={connectionStatus !== "success"}>
              Permissions
            </TabsTrigger>
            <TabsTrigger value="settings" disabled={connectionStatus !== "success"}>
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 max-h-[60vh] overflow-y-auto">
            <TabsContent value="connection" className="space-y-6">
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-4">Connection Details</h4>
                {renderConnectionForm()}
                <div className="mt-4">
                  {getConnectionButton()}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-6">
              {renderPermissionsTab()}
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {renderSettingsTab()}
            </TabsContent>
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {connectionStatus === "success" && (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">Ready to save</span>
                </>
              )}
              {connectionStatus === "error" && (
                <>
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-600">Connection required</span>
                </>
              )}
              {connectionStatus === "idle" && (
                <>
                  <Info className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Test connection first</span>
                </>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={connectionStatus !== "success"}
              >
                Save Integration
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Helper functions
function getDefaultConfig(type: string) {
  switch (type) {
    case "aws":
      return {
        accessKey: "",
        secretKey: "",
        region: "us-east-1",
        roleArn: "",
        permissions: {
          ec2: true,
          s3: true,
          rds: false,
          securityGroups: true
        },
        syncFrequency: "realtime",
        retryAttempts: 3,
        enableLogging: false
      }
    case "azure":
      return {
        tenantId: "",
        clientId: "",
        clientSecret: "",
        subscriptionId: "",
        permissions: {
          virtualMachines: true,
          storageAccounts: true,
          keyVaults: false,
          activeDirectory: true
        },
        syncFrequency: "realtime",
        retryAttempts: 3,
        enableLogging: false
      }
    case "slack":
      return {
        botToken: "",
        signingSecret: "",
        defaultChannel: "",
        permissions: {
          sendMessages: true,
          readChannels: true,
          manageChannels: false
        },
        syncFrequency: "realtime",
        retryAttempts: 3,
        enableLogging: false
      }
    default:
      return {
        endpoint: "",
        apiKey: "",
        permissions: {},
        syncFrequency: "realtime",
        retryAttempts: 3,
        enableLogging: false
      }
  }
}

function validateConfig(config: any, type: string): boolean {
  switch (type) {
    case "aws":
      return !!(config.accessKey && config.secretKey)
    case "azure":
      return !!(config.tenantId && config.clientId && config.clientSecret)
    case "slack":
      return !!(config.botToken && config.signingSecret)
    default:
      return !!(config.endpoint && config.apiKey)
  }
}

function getPermissionsForType(type: string) {
  switch (type) {
    case "aws":
      return [
        {
          key: "ec2",
          label: "EC2 Instances",
          description: "Read EC2 instance metadata and configuration",
          required: true
        },
        {
          key: "s3",
          label: "S3 Buckets",
          description: "List and analyze S3 bucket configurations",
          required: true
        },
        {
          key: "rds",
          label: "RDS Databases",
          description: "Monitor RDS database instances and configurations",
          required: false
        },
        {
          key: "securityGroups",
          label: "Security Groups",
          description: "Analyze security group rules and configurations",
          required: true
        }
      ]
    case "azure":
      return [
        {
          key: "virtualMachines",
          label: "Virtual Machines",
          description: "Read VM metadata and configuration",
          required: true
        },
        {
          key: "storageAccounts",
          label: "Storage Accounts",
          description: "Monitor storage account configurations",
          required: true
        },
        {
          key: "keyVaults",
          label: "Key Vaults",
          description: "Access Key Vault metadata and policies",
          required: false
        },
        {
          key: "activeDirectory",
          label: "Active Directory",
          description: "Read AD user and group information",
          required: true
        }
      ]
    case "slack":
      return [
        {
          key: "sendMessages",
          label: "Send Messages",
          description: "Send notifications and alerts to channels",
          required: true
        },
        {
          key: "readChannels",
          label: "Read Channels",
          description: "Read channel information and membership",
          required: true
        },
        {
          key: "manageChannels",
          label: "Manage Channels",
          description: "Create and manage dedicated compliance channels",
          required: false
        }
      ]
    default:
      return []
  }
}