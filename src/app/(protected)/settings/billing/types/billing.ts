// src/app/(protected)/settings/billing/types/billing.ts

export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    billingCycle: 'monthly' | 'annual';
    features: string[];
    maxUsers: number | 'unlimited';
    storage: string;
    analytics: string;
    support: string;
    isRecommended?: boolean;
    isCurrent?: boolean;
  }
  
  export interface PaymentMethod {
    id: string;
    type: 'visa' | 'mastercard' | 'paypal' | 'amex';
    last4: string;
    expiryDate: string;
    isDefault: boolean;
    cardholderName?: string;
    email?: string;
  }
  
  export interface Invoice {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    description: string;
    downloadUrl?: string;
  }
  
  export interface UsageMetrics {
    activeUsers: number;
    storageUsed: number;
    storageLimit: number;
    userLimit: number;
    currentUsers: number;
  }
  
  export interface BillingInfo {
    companyName: string;
    billingEmail: string;
    vatNumber: string;
    address: {
      street: string;
      suite?: string;
      city: string;
      country: string;
      postalCode: string;
    };
  }
  
  export interface UpcomingCharge {
    description: string;
    amount: number;
    details?: string;
  }
  
  export interface NotificationSettings {
    billingReminders: boolean;
    paymentFailureAlerts: boolean;
    usageLimitWarnings: boolean;
    planChangeConfirmations: boolean;
    invoiceReceipts: boolean;
    renewalNotifications: boolean;
  }
  
  export interface AIRecommendation {
    id: string;
    type: 'plan-optimization' | 'billing-cycle' | 'usage-trend';
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction?: string;
    variant: 'blue' | 'green' | 'orange';
  }
  
  export interface BillingData {
    currentPlan: Plan;
    availablePlans: Plan[];
    paymentMethods: PaymentMethod[];
    billingInfo: BillingInfo;
    invoices: Invoice[];
    usageMetrics: UsageMetrics;
    upcomingCharges: UpcomingCharge[];
    nextBillingDate: string;
    notificationSettings: NotificationSettings;
    recommendations: AIRecommendation[];
  }