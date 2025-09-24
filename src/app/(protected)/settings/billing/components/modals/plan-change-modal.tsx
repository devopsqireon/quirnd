// src/app/(protected)/settings/billing/components/modals/plan-change-modal.tsx

"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Plan } from "../../types/billing";

interface PlanChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: Plan;
  newPlan: Plan;
  onConfirm: () => void;
}

export function PlanChangeModal({ 
  isOpen, 
  onClose, 
  currentPlan, 
  newPlan, 
  onConfirm 
}: PlanChangeModalProps) {
  const priceDifference = newPlan.price - currentPlan.price;
  const isUpgrade = priceDifference > 0;
  const proratedCredit = currentPlan.price / 2; // Mock calculation
  const proratedCharge = newPlan.price / 2; // Mock calculation
  const amountDue = proratedCharge - proratedCredit;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Confirm Plan Change</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Comparison */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900">Current Plan: {currentPlan.name}</span>
              <span className="text-slate-600">${currentPlan.price}/month</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900">New Plan: {newPlan.name}</span>
              <span className="text-slate-600">${newPlan.price}/month</span>
            </div>
          </div>

          {/* Prorated Billing Details */}
          <div className="border border-slate-200 rounded-lg p-4">
            <h4 className="font-medium text-slate-900 mb-3">Prorated Billing Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Unused time on current plan</span>
                <span className="text-slate-900">-${proratedCredit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{newPlan.name} plan (prorated)</span>
                <span className="text-slate-900">${proratedCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-slate-200">
                <span className="text-slate-900">Amount due today</span>
                <span className="text-slate-900">${amountDue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Feature Changes */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">What changes with your {isUpgrade ? 'upgrade' : 'downgrade'}:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <div>• Team members: {currentPlan.maxUsers} → {newPlan.maxUsers === 'unlimited' ? 'Unlimited' : newPlan.maxUsers}</div>
              <div>• Storage: {currentPlan.storage} → {newPlan.storage}</div>
              <div>• Analytics: {currentPlan.analytics} → {newPlan.analytics}</div>
              <div>• Support: {currentPlan.support} → {newPlan.support}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onConfirm} className="bg-slate-900 hover:bg-slate-800">
              Confirm {isUpgrade ? 'Upgrade' : 'Downgrade'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}