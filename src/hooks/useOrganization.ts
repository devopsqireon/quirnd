// src/hooks/useOrganization.ts

import { useState, useEffect } from 'react';
import { Organization, ComplianceSettings, SecuritySettings, NotificationSettings, DataExportSettings } from '@/lib/types/organization';

export function useOrganization() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [complianceSettings, setComplianceSettings] = useState<ComplianceSettings | null>(null);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(null);
  const [dataExportSettings, setDataExportSettings] = useState<DataExportSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setOrganization({
        id: '1',
        name: 'Acme Corporation',
        contactEmail: 'admin@acmecorp.com',
        contactPhone: '(555) 123-4567',
        address: '123 Business Street\nSan Francisco, CA 94105\nUnited States',
        timezone: 'America/Los_Angeles',
        industry: 'financial-services',
        showLogoOnReports: true,
      });

      setComplianceSettings({
        industryClassification: 'financial-services',
        regulatoryFrameworks: ['sox', 'gdpr', 'pci-dss'],
        dataRetentionPeriod: 7,
        dataRetentionUnit: 'years',
      });

      setSecuritySettings({
        twoFactorRequired: true,
        sessionTimeout: 120,
        ipRestrictions: [
          { id: '1', ipRange: '192.168.1.0/24', label: 'Office Network' },
          { id: '2', ipRange: '10.0.0.0/8', label: 'VPN Access' },
        ],
      });

      setNotificationSettings({
        email: {
          complianceAlerts: true,
          auditReports: true,
          systemMaintenance: false,
          featureUpdates: false,
        },
        slack: {
          connected: false,
        },
      });

      setDataExportSettings({
        defaultFormat: 'pdf',
        passwordProtect: true,
        includeAuditTrail: true,
        watermarkSensitive: false,
      });

      setLoading(false);
    }, 1000);
  }, []);

  const updateOrganization = (updates: Partial<Organization>) => {
    if (organization) {
      setOrganization({ ...organization, ...updates });
      setHasUnsavedChanges(true);
    }
  };

  const updateComplianceSettings = (updates: Partial<ComplianceSettings>) => {
    if (complianceSettings) {
      setComplianceSettings({ ...complianceSettings, ...updates });
      setHasUnsavedChanges(true);
    }
  };

  const updateSecuritySettings = (updates: Partial<SecuritySettings>) => {
    if (securitySettings) {
      setSecuritySettings({ ...securitySettings, ...updates });
      setHasUnsavedChanges(true);
    }
  };

  const updateNotificationSettings = (updates: Partial<NotificationSettings>) => {
    if (notificationSettings) {
      setNotificationSettings({ ...notificationSettings, ...updates });
      setHasUnsavedChanges(true);
    }
  };

  const updateDataExportSettings = (updates: Partial<DataExportSettings>) => {
    if (dataExportSettings) {
      setDataExportSettings({ ...dataExportSettings, ...updates });
      setHasUnsavedChanges(true);
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    setHasUnsavedChanges(false);
  };

  const resetChanges = () => {
    // Reset to original values (would refetch from API)
    setHasUnsavedChanges(false);
  };

  return {
    organization,
    complianceSettings,
    securitySettings,
    notificationSettings,
    dataExportSettings,
    loading,
    saving,
    hasUnsavedChanges,
    updateOrganization,
    updateComplianceSettings,
    updateSecuritySettings,
    updateNotificationSettings,
    updateDataExportSettings,
    saveChanges,
    resetChanges,
  };
}