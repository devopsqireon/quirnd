// src/app/(protected)/settings/billing/hooks/use-billing.ts

"use client";

import { useState, useEffect } from 'react';
import { BillingData, Plan, PaymentMethod, NotificationSettings } from '../types/billing';

export const useBilling = () => {
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const mockBillingData: BillingData = {
    currentPlan: {
      id: 'professional',
      name: 'Professional',
      description: 'Best for growing teams',
      price: 149,
      billingCycle: 'monthly',
      features: [
        'Up to 50 team members',
        '2TB storage',
        'Advanced analytics',
        'Priority support'
      ],
      maxUsers: 50,
      storage: '2TB',
      analytics: 'Advanced analytics',
      support: 'Priority support',
      isCurrent: true
    },
    availablePlans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small teams',
        price: 49,
        billingCycle: 'monthly',
        features: [
          'Up to 10 team members',
          '100GB storage',
          'Basic analytics',
          'Email support'
        ],
        maxUsers: 10,
        storage: '100GB',
        analytics: 'Basic analytics',
        support: 'Email support'
      },
      {
        id: 'professional',
        name: 'Professional',
        description: 'Best for growing teams',
        price: 149,
        billingCycle: 'monthly',
        features: [
          'Up to 50 team members',
          '2TB storage',
          'Advanced analytics',
          'Priority support'
        ],
        maxUsers: 50,
        storage: '2TB',
        analytics: 'Advanced analytics',
        support: 'Priority support',
        isCurrent: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large organizations',
        price: 299,
        billingCycle: 'monthly',
        features: [
          'Unlimited team members',
          '5TB storage',
          'Custom analytics',
          '24/7 phone support'
        ],
        maxUsers: 'unlimited',
        storage: '5TB',
        analytics: 'Custom analytics',
        support: '24/7 phone support',
        isRecommended: true
      }
    ],
    paymentMethods: [
      {
        id: 'pm_1',
        type: 'visa',
        last4: '4242',
        expiryDate: '12/2027',
        isDefault: true,
        cardholderName: 'John Doe'
      },
      {
        id: 'pm_2',
        type: 'mastercard',
        last4: '8888',
        expiryDate: '08/2026',
        isDefault: false,
        cardholderName: 'John Doe'
      },
      {
        id: 'pm_3',
        type: 'paypal',
        last4: '',
        expiryDate: '',
        isDefault: false,
        email: 'billing@acmecorp.com'
      }
    ],
    billingInfo: {
      companyName: 'Acme Corporation Ltd.',
      billingEmail: 'billing@acmecorp.com',
      vatNumber: 'GB123456789',
      address: {
        street: '123 Business Street',
        suite: 'Suite 456',
        city: 'London',
        country: 'United Kingdom',
        postalCode: 'SW1A 1AA'
      }
    },
    invoices: [
      {
        id: 'INV-2024-001',
        date: 'Mar 15, 2024',
        amount: 4118.40,
        status: 'paid',
        description: 'Professional Plan'
      },
      {
        id: 'INV-2023-012',
        date: 'Mar 15, 2023',
        amount: 3588.00,
        status: 'paid',
        description: 'Professional Plan'
      },
      {
        id: 'INV-2023-011',
        date: 'Feb 28, 2023',
        amount: 299.00,
        status: 'paid',
        description: 'Setup Fee'
      },
      {
        id: 'INV-2023-010',
        date: 'Feb 15, 2023',
        amount: 588.00,
        status: 'paid',
        description: 'Starter Plan'
      },
      {
        id: 'INV-2023-009',
        date: 'Jan 15, 2023',
        amount: 49.00,
        status: 'pending',
        description: 'Starter Plan'
      }
    ],
    usageMetrics: {
      activeUsers: 42,
      storageUsed: 1200,
      storageLimit: 2000,
      userLimit: 50,
      currentUsers: 47
    },
    upcomingCharges: [
      {
        description: 'Professional Plan (Annual)',
        amount: 3384.00,
        details: '47 seats × $72/year'
      },
      {
        description: 'Additional Storage',
        amount: 48.00,
        details: '200GB × $2/month × 12 months'
      },
      {
        description: 'VAT (20%)',
        amount: 686.40,
        details: 'Applied to UK billing address'
      }
    ],
    nextBillingDate: 'March 15, 2025',
    notificationSettings: {
      billingReminders: true,
      paymentFailureAlerts: true,
      usageLimitWarnings: true,
      planChangeConfirmations: false,
      invoiceReceipts: true,
      renewalNotifications: true
    },
    recommendations: [
      {
        id: 'rec_1',
        type: 'plan-optimization',
        title: 'Plan Optimization',
        description: 'Based on your usage patterns, switching to Enterprise plan would save you $420 annually while providing unlimited seats and 3TB extra storage.',
        primaryAction: 'View Details',
        secondaryAction: 'Dismiss',
        variant: 'blue'
      },
      {
        id: 'rec_2',
        type: 'billing-cycle',
        title: 'Billing Cycle Optimization',
        description: 'Your renewal is coming up in 45 days. Switching to annual billing now would save you 20% on your next payment.',
        primaryAction: 'Switch to Annual',
        secondaryAction: 'Not now',
        variant: 'green'
      },
      {
        id: 'rec_3',
        type: 'usage-trend',
        title: 'Usage Trend Alert',
        description: "Your team is growing fast! You've added 8 new users in the last 30 days. Consider upgrading before hitting your limit.",
        primaryAction: 'Add More Seats',
        secondaryAction: 'Remind me later',
        variant: 'orange'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchBillingData = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBillingData(mockBillingData);
      } catch (err) {
        setError('Failed to fetch billing data');
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, []);

  const updatePlan = async (planId: string) => {
    try {
      setLoading(true);
      // API call to update plan
      console.log('Updating plan to:', planId);
      // Update local state
      if (billingData) {
        const updatedPlan = billingData.availablePlans.find(p => p.id === planId);
        if (updatedPlan) {
          setBillingData({
            ...billingData,
            currentPlan: { ...updatedPlan, isCurrent: true },
            availablePlans: billingData.availablePlans.map(p => ({
              ...p,
              isCurrent: p.id === planId
            }))
          });
        }
      }
    } catch (err) {
      setError('Failed to update plan');
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async (paymentMethod: Omit<PaymentMethod, 'id'>) => {
    try {
      setLoading(true);
      // API call to add payment method
      const newPaymentMethod = {
        ...paymentMethod,
        id: `pm_${Date.now()}`
      };
      
      if (billingData) {
        setBillingData({
          ...billingData,
          paymentMethods: [...billingData.paymentMethods, newPaymentMethod]
        });
      }
    } catch (err) {
      setError('Failed to add payment method');
    } finally {
      setLoading(false);
    }
  };

  const removePaymentMethod = async (paymentMethodId: string) => {
    try {
      setLoading(true);
      // API call to remove payment method
      if (billingData) {
        setBillingData({
          ...billingData,
          paymentMethods: billingData.paymentMethods.filter(pm => pm.id !== paymentMethodId)
        });
      }
    } catch (err) {
      setError('Failed to remove payment method');
    } finally {
      setLoading(false);
    }
  };

  const setDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      setLoading(true);
      // API call to set default payment method
      if (billingData) {
        setBillingData({
          ...billingData,
          paymentMethods: billingData.paymentMethods.map(pm => ({
            ...pm,
            isDefault: pm.id === paymentMethodId
          }))
        });
      }
    } catch (err) {
      setError('Failed to set default payment method');
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationSettings = async (settings: NotificationSettings) => {
    try {
      setLoading(true);
      // API call to update notification settings
      if (billingData) {
        setBillingData({
          ...billingData,
          notificationSettings: settings
        });
      }
    } catch (err) {
      setError('Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  };

  return {
    billingData,
    loading,
    error,
    updatePlan,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    updateNotificationSettings
  };
};