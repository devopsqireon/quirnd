// src/constants/integrations.ts
export const INTEGRATION_CATEGORIES = {
    CLOUD_PROVIDERS: "cloud-providers",
    COLLABORATION_TOOLS: "collaboration-tools", 
    ITSM_TOOLS: "itsm-tools",
    SIEM_TOOLS: "siem-tools",
    CUSTOM_INTEGRATIONS: "custom-integrations"
  } as const
  
  export const INTEGRATION_STATUS = {
    CONNECTED: "connected",
    WARNING: "warning", 
    ERROR: "error",
    NOT_CONNECTED: "not-connected"
  } as const
  
  export const WEBHOOK_EVENT_TYPES = {
    COMPLIANCE_INCIDENT_CREATED: "compliance.incident.created",
    COMPLIANCE_INCIDENT_UPDATED: "compliance.incident.updated",
    EVIDENCE_UPLOADED: "evidence.uploaded",
    ASSET_DISCOVERED: "asset.discovered",
    INTEGRATION_CONNECTED: "integration.connected",
    INTEGRATION_DISCONNECTED: "integration.disconnected"
  } as const
  
  export const API_KEY_PERMISSIONS = {
    READ: "read",
    WRITE: "write", 
    ADMIN: "admin"
  } as const
  
  export const SYNC_FREQUENCIES = {
    REALTIME: "realtime",
    FIFTEEN_MINUTES: "15min",
    HOURLY: "hourly",
    DAILY: "daily"
  } as const