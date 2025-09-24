// src/types/integrations.ts
export interface Integration {
    id: string
    name: string
    description: string
    icon: string
    status: IntegrationStatus
    lastSync: string
    iconBg: string
    iconColor: string
    category: IntegrationCategory
    metadata?: Record<string, any>
  }
  
  export type IntegrationStatus = "connected" | "warning" | "error" | "not-connected"
  
  export type IntegrationCategory = 
    | "cloud-providers" 
    | "collaboration-tools" 
    | "itsm-tools" 
    | "siem-tools" 
    | "custom-integrations"
  
  export interface APIKey {
    id: string
    name: string
    key: string
    createdBy: string
    createdDate: string
    lastUsed: string
    status: "Active" | "Inactive"
  }
  
  export interface Webhook {
    id: string
    url: string
    eventType: string
    createdDate: string
    lastTriggered: string
    status: "Active" | "Failed" | "Paused"
    secret?: string
  }
  
  export interface ActivityLogEntry {
    id: string
    type: "success" | "warning" | "error" | "info"
    title: string
    description: string
    timestamp: Date
    integrationId?: string
    metadata?: Record<string, any>
  }
  
  export interface IntegrationStats {
    connected: number
    warning: number
    error: number
    lastSync: string
  }