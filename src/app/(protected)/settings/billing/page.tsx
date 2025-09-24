// src/app/(protected)/settings/billing/page.tsx

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { useBilling } from "./hooks/use-billing";

// Component imports
import { CurrentPlanSummary } from "./components/current-plan-summary";
import { AvailablePlans } from "./components/available-plans";
import { BillingInformation } from "./components/billing-information";
import { PaymentMethods } from "./components/payment-methods";
import { UpcomingCharges } from "./components/upcoming-charges";
import { InvoiceHistory } from "./components/invoice-history";
import { NotificationSettingsComponent } from "./components/notifications-settings";
import { UsageAnalytics } from "./components/usage-analytics";
import { AIRecommendations } from "./components/ai-recommendations";
import { BillingSupport } from "./components/billing-support";

// Modal imports
import { PlanChangeModal } from "./components/modals/plan-change-modal";
import { AddPaymentModal } from "./components/modals/add-payment-modal";

export default function BillingPage() {
  const { 
    billingData, 
    loading, 
    error, 
    updatePlan,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    updateNotificationSettings
  } = useBilling();

  // Modal states
  const [showPlanChangeModal, setShowPlanChangeModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !billingData) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Billing Data</h2>
          <p className="text-slate-600">{error || "Failed to load billing information"}</p>
        </div>
      </div>
    );
  }

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    setShowPlanChangeModal(true);
  };

  const handleConfirmPlanChange = async () => {
    if (selectedPlan) {
      try {
        await updatePlan(selectedPlan);
        setShowPlanChangeModal(false);
        setSelectedPlan(null);
        Toaster({
          title: "Plan Updated",
          description: "Your plan has been successfully updated.",
        });
      } catch (error) {
        Toaster({
          title: "Error",
          description: "Failed to update plan. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddPaymentMethod = async (paymentMethod: any) => {
    try {
      await addPaymentMethod(paymentMethod);
      setShowAddPaymentModal(false);
      Toaster({
        title: "Payment Method Added",
        description: "Your payment method has been successfully added.",
      });
    } catch (error) {
      Toaster({
        title: "Error",
        description: "Failed to add payment method. Please try again.",
        variant: "destructive",
      });
    }
  };

  const defaultPaymentMethod = billingData.paymentMethods.find(pm => pm.isDefault);
  const newPlan = selectedPlan ? billingData.availablePlans.find(p => p.id === selectedPlan) : null;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Subscription & Billing</h1>
        <p className="text-slate-600">Manage your organization's subscription, billing details, and payment methods</p>
      </div>

      {/* Current Plan Summary - Always visible */}
      <div className="mb-8">
        <CurrentPlanSummary
          currentPlan={billingData.currentPlan}
          usageMetrics={billingData.usageMetrics}
          nextBillingDate={billingData.nextBillingDate}
          onChangePlan={() => setShowPlanChangeModal(true)}
        />
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plans">Plans & Billing</TabsTrigger>
          <TabsTrigger value="payments">Payments & Invoices</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Insights</TabsTrigger>
          <TabsTrigger value="support">Settings & Support</TabsTrigger>
        </TabsList>

        {/* Plans & Billing Tab */}
        <TabsContent value="plans" className="space-y-8">
          <AvailablePlans
            plans={billingData.availablePlans}
            currentPlanId={billingData.currentPlan.id}
            onSelectPlan={handlePlanChange}
          />
          
          <UpcomingCharges
            charges={billingData.upcomingCharges}
            nextBillingDate={billingData.nextBillingDate}
            defaultPaymentMethod={defaultPaymentMethod?.last4 || "4242"}
          />

          <BillingInformation
            billingInfo={billingData.billingInfo}
            onEdit={() => Toaster({ title: "Edit Billing", description: "Edit billing modal would open here" })}
          />
        </TabsContent>

        {/* Payments & Invoices Tab */}
        <TabsContent value="payments" className="space-y-8">
          <PaymentMethods
            paymentMethods={billingData.paymentMethods}
            onAddPaymentMethod={() => setShowAddPaymentModal(true)}
            onEditPaymentMethod={(id) => Toaster({ title: "Edit Payment", description: `Edit payment method ${id}` })}
            onRemovePaymentMethod={removePaymentMethod}
            onSetDefault={setDefaultPaymentMethod}
          />

          <InvoiceHistory
            invoices={billingData.invoices}
            onDownloadInvoice={(id) => Toaster({ title: "Download", description: `Downloading invoice ${id}` })}
            onViewInvoice={(id) => Toaster({ title: "View Invoice", description: `Viewing invoice ${id}` })}
          />
        </TabsContent>

        {/* Analytics & Insights Tab */}
        <TabsContent value="analytics" className="space-y-8">
          <UsageAnalytics
            metrics={billingData.usageMetrics}
            onViewUpgradeOptions={() => handlePlanChange('enterprise')}
          />

          <AIRecommendations
            recommendations={billingData.recommendations}
            onTakeAction={(id, action) => {
              const recommendation = billingData.recommendations.find(r => r.id === id);
              if (recommendation) {
                Toaster({
                  title: `${action === 'primary' ? recommendation.primaryAction : recommendation.secondaryAction}`,
                  description: `Action taken for: ${recommendation.title}`
                });
              }
            }}
          />
        </TabsContent>

        {/* Settings & Support Tab */}
        <TabsContent value="support" className="space-y-8">
          <NotificationSettingsComponent
            settings={billingData.notificationSettings}
            notificationEmail={billingData.billingInfo.billingEmail}
            onUpdateSettings={updateNotificationSettings}
            onChangeEmail={() => Toaster({ title: "Change Email", description: "Email change modal would open here" })}
          />

          <BillingSupport
            onContactSupport={() => Toaster({ title: "Contact Support", description: "Support chat would open here" })}
            onViewDocs={() => Toaster({ title: "Documentation", description: "Opening documentation..." })}
            onOpenCalculator={() => Toaster({ title: "Calculator", description: "Cost calculator would open here" })}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showPlanChangeModal && newPlan && (
        <PlanChangeModal
          isOpen={showPlanChangeModal}
          onClose={() => {
            setShowPlanChangeModal(false);
            setSelectedPlan(null);
          }}
          currentPlan={billingData.currentPlan}
          newPlan={newPlan}
          onConfirm={handleConfirmPlanChange}
        />
      )}

      <AddPaymentModal
        isOpen={showAddPaymentModal}
        onClose={() => setShowAddPaymentModal(false)}
        onAddPayment={handleAddPaymentMethod}
      />
    </div>
  );
}