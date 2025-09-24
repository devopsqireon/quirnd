// src/app/(protected)/settings/billing/components/billing-information.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { BillingInfo } from "../types/billing";

interface BillingInformationProps {
  billingInfo: BillingInfo;
  onEdit: () => void;
}

export function BillingInformation({ billingInfo, onEdit }: BillingInformationProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Billing Information</CardTitle>
          <Button variant="outline" onClick={onEdit}>
            Edit Details
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-1 block">
                Company Name
              </Label>
              <div className="px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-900">
                {billingInfo.companyName}
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-1 block">
                Billing Email
              </Label>
              <div className="px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-900">
                {billingInfo.billingEmail}
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-1 block">
                VAT/GST Number
              </Label>
              <div className="px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-900">
                {billingInfo.vatNumber}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-1 block">
                Billing Address
              </Label>
              <div className="px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-900">
                <div>{billingInfo.address.street}</div>
                {billingInfo.address.suite && <div>{billingInfo.address.suite}</div>}
                <div>{billingInfo.address.city}, {billingInfo.address.country} {billingInfo.address.postalCode}</div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-1 block">
                Country
              </Label>
              <div className="px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-900">
                {billingInfo.address.country}
              </div>
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-600">
                Your billing information is used for invoices and tax calculations. Any changes will be reflected in your next billing cycle.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}