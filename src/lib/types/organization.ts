// src/lib/types/organization.ts

export interface Organization {
    id: string;
    name: string;
    contactEmail: string;
    contactPhone?: string;
    address?: string;
    timezone: string;
    industry?: string;
    logoUrl?: string;
    showLogoOnReports: boolean;
  }
  
  export interface ComplianceSettings {
    industryClassification: string;
    regulatoryFrameworks: string[];
    dataRetentionPeriod: number;
    dataRetentionUnit: 'days' | 'months' | 'years';
  }
  
  export interface SecuritySettings {
    twoFactorRequired: boolean;
    sessionTimeout: number;
    ipRestrictions: IpRestriction[];
  }
  
  export interface IpRestriction {
    id: string;
    ipRange: string;
    label: string;
  }
  
  export interface NotificationSettings {
    email: {
      complianceAlerts: boolean;
      auditReports: boolean;
      systemMaintenance: boolean;
      featureUpdates: boolean;
    };
    slack?: {
      connected: boolean;
      webhookUrl?: string;
    };
  }
  
  export interface DataExportSettings {
    defaultFormat: 'pdf' | 'excel' | 'csv' | 'json';
    passwordProtect: boolean;
    includeAuditTrail: boolean;
    watermarkSensitive: boolean;
  }
  
  export interface ApiKey {
    id: string;
    name: string;
    createdAt: string;
    lastUsed?: string;
    status: 'active' | 'limited' | 'disabled';
  }
  
  export interface WebhookEndpoint {
    id: string;
    url: string;
    events: string[];
    status: 'healthy' | 'error';
  }
  
  export interface ConnectedApp {
    id: string;
    name: string;
    provider: string;
    status: 'connected' | 'disconnected';
    iconClass: string;
  }