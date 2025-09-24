// src/app/(protected)/settings/billing/components/current-plan-summary.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Users, HardDrive } from "lucide-react";
import { Plan, UsageMetrics } from "../types/billing";

interface CurrentPlanSummaryProps {
  currentPlan: Plan;
  usageMetrics: UsageMetrics;
  nextBillingDate: string;
  onChangePlan: () => void;
}

export function CurrentPlanSummary({
  currentPlan,
  usageMetrics,
  nextBillingDate,
  onChangePlan
}: CurrentPlanSummaryProps) {
  const userPercentage = (usageMetrics.currentUsers / usageMetrics.userLimit) * 100;
  const storagePercentage = (usageMetrics.storageUsed / usageMetrics.storageLimit) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Current Plan</CardTitle>
            <p className="text-slate-600 mt-1">
              {currentPlan.name} Plan - {currentPlan.billingCycle === 'annual' ? 'Annual' : 'Monthly'} Billing
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              Active
            </Badge>
            <Button variant="outline" onClick={onChangePlan}>
              Change Plan
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Pricing Info */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-slate-900 mb-1">
              ${currentPlan.price}
            </div>
            <div className="text-sm text-slate-600 mb-2">
              per month (billed {currentPlan.billingCycle === 'annual' ? 'annually' : 'monthly'})
            </div>
            <div className="text-xs text-slate-500">
              Renews on {nextBillingDate}
            </div>
          </div>

          {/* Team Members Usage */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Team Members
              </span>
              <span className="text-sm text-slate-600">
                {usageMetrics.currentUsers} / {usageMetrics.userLimit}
              </span>
            </div>
            <Progress value={userPercentage} className="mb-1" />
            <div className="text-xs text-slate-500">
              {usageMetrics.userLimit - usageMetrics.currentUsers} seats remaining
            </div>
          </div>

          {/* Storage Usage */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 flex items-center">
                <HardDrive className="w-4 h-4 mr-1" />
                Storage Used
              </span>
              <span className="text-sm text-slate-600">
                {(usageMetrics.storageUsed / 1000).toFixed(1)}TB / {(usageMetrics.storageLimit / 1000).toFixed(0)}TB
              </span>
            </div>
            <Progress 
              value={storagePercentage} 
              className="mb-1"
            />
            <div className="text-xs text-slate-500">
              {((usageMetrics.storageLimit - usageMetrics.storageUsed) / 1000).toFixed(0)}TB remaining
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">AI Recommendation</h3>
              <p className="text-sm text-blue-800 mb-2">
                Based on your team growth, consider upgrading to Enterprise plan to get unlimited seats and 5TB storage. You'll save 15% annually.
              </p>
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-700 p-0 h-auto text-sm font-medium"
              >
                Learn more →
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}