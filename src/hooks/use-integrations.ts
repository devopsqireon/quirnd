// src/hooks/use-integrations.ts
import { useState, useEffect } from "react"
import { Integration, IntegrationStats, ActivityLogEntry, APIKey, Webhook } from "@/types/integrations"
import { toast } from "sonner"

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [stats, setStats] = useState<IntegrationStats>({
    connected: 0,
    warning: 0,
    error: 0,
    lastSync: ""
  })
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([])
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data loading
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Set mock data
      setStats({
        connected: 12,
        warning: 3,
        error: 2,
        lastSync: "2 minutes ago"
      })

      setApiKeys([
        {
          id: "1",
          name: "Production API",
          key: "qir_••••••••••••••••••••••••••••••••",
          createdBy: "John Smith",
          createdDate: "Jan 15, 2024",
          lastUsed: "2 hours ago",
          status: "Active"
        },
        {
          id: "2",
          name: "Development API",
          key: "qir_••••••••••••••••••••••••••••••••",
          createdBy: "Sarah Johnson",
          createdDate: "Dec 20, 2023",
          lastUsed: "Never",
          status: "Inactive"
        }
      ])

      setWebhooks([
        {
          id: "1",
          url: "https://api.example.com/webhooks/compliance",
          eventType: "compliance.incident.created",
          createdDate: "Jan 10, 2024",
          lastTriggered: "1 hour ago",
          status: "Active"
        },
        {
          id: "2",
      //    url: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
          eventType: "evidence.uploaded",
          createdDate: "Dec 15, 2023",
          lastTriggered: "3 days ago",
          status: "Failed"
        }
      ])

      setActivityLog([
        {
          id: "1",
          type: "success",
          title: "AWS integration sync completed",
          description: "Discovered 47 new EC2 instances and 12 S3 buckets",
          timestamp: new Date(Date.now() - 2 * 60 * 1000)
        },
        {
          id: "2",
          type: "info",
          title: "Slack notification sent",
          description: "Compliance alert sent to #security-team channel",
          timestamp: new Date(Date.now() - 15 * 60 * 1000)
        },
        {
          id: "3",
          type: "warning",
          title: "Azure API rate limit warning",
          description: "Approaching API quota limit, sync frequency reduced",
          timestamp: new Date(Date.now() - 60 * 60 * 1000)
        }
      ])

      setLoading(false)
    }

    loadData()
  }, [])

  const connectIntegration = async (integrationId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Integration connected successfully")
      
      // Update activity log
      const newActivity: ActivityLogEntry = {
        id: Date.now().toString(),
        type: "success",
        title: "Integration connected",
        description: `Successfully connected integration`,
        timestamp: new Date()
      }
      setActivityLog(prev => [newActivity, ...prev])
      
    } catch (error) {
      toast.error("Failed to connect integration")
    }
  }

  const disconnectIntegration = async (integrationId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Integration disconnected")
      
      const newActivity: ActivityLogEntry = {
        id: Date.now().toString(),
        type: "warning",
        title: "Integration disconnected",
        description: `Integration has been disconnected`,
        timestamp: new Date()
      }
      setActivityLog(prev => [newActivity, ...prev])
      
    } catch (error) {
      toast.error("Failed to disconnect integration")
    }
  }

  const testIntegration = async (integrationId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Integration test completed successfully")
    } catch (error) {
      toast.error("Integration test failed")
    }
  }

  const generateApiKey = async (name: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newKey: APIKey = {
        id: Date.now().toString(),
        name,
        key: "qir_" + Math.random().toString(36).substring(2, 32),
        createdBy: "Current User",
        createdDate: new Date().toLocaleDateString(),
        lastUsed: "Never",
        status: "Active"
      }
      
      setApiKeys(prev => [newKey, ...prev])
      toast.success("API key generated successfully")
      
    } catch (error) {
      toast.error("Failed to generate API key")
    }
  }

  const revokeApiKey = async (keyId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setApiKeys(prev => prev.filter(key => key.id !== keyId))
      toast.success("API key revoked successfully")
      
    } catch (error) {
      toast.error("Failed to revoke API key")
    }
  }

  const addWebhook = async (webhook: Omit<Webhook, "id">) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newWebhook: Webhook = {
        ...webhook,
        id: Date.now().toString()
      }
      
      setWebhooks(prev => [newWebhook, ...prev])
      toast.success("Webhook added successfully")
      
    } catch (error) {
      toast.error("Failed to add webhook")
    }
  }

  const deleteWebhook = async (webhookId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setWebhooks(prev => prev.filter(webhook => webhook.id !== webhookId))
      toast.success("Webhook deleted successfully")
      
    } catch (error) {
      toast.error("Failed to delete webhook")
    }
  }

  const testWebhook = async (webhookId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success("Webhook test completed successfully")
    } catch (error) {
      toast.error("Webhook test failed")
    }
  }

  return {
    integrations,
    stats,
    activityLog,
    apiKeys,
    webhooks,
    loading,
    connectIntegration,
    disconnectIntegration,
    testIntegration,
    generateApiKey,
    revokeApiKey,
    addWebhook,
    deleteWebhook,
    testWebhook
  }
}