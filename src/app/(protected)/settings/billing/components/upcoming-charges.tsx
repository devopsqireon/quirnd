// src/app/(protected)/settings/billing/components/upcoming-charges.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpcomingCharge } from "../types/billing";

interface UpcomingChargesProps {
  charges: UpcomingCharge[];
  nextBillingDate: string;
  defaultPaymentMethod: string;
}

export function UpcomingCharges({ charges, nextBillingDate, defaultPaymentMethod }: UpcomingChargesProps) {
  const totalAmount = charges.reduce((sum, charge) => sum + charge.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Upcoming Charges</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Next Billing Info */}
        <div className="bg-slate-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Next billing date</span>
            <span className="text-sm font-medium text-slate-900">{nextBillingDate}</span>
          </div>
          <div className="text-xs text-slate-500">
            Your card ending in {defaultPaymentMethod} will be charged automatically
          </div>
        </div>

        {/* Charges Breakdown */}
        <div className="space-y-3">
          {charges.map((charge, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-slate-900">{charge.description}</div>
                {charge.details && (
                  <div className="text-sm text-slate-600">{charge.details}</div>
                )}
              </div>
              <div className="text-right">
                <div className="font-medium text-slate-900">${charge.amount.toFixed(2)}</div>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="border-t border-slate-200 pt-3">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-slate-900">Total</div>
              <div className="text-lg font-semibold text-slate-900">${totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}