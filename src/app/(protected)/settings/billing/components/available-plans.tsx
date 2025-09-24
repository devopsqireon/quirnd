// src/app/(protected)/settings/billing/components/available-plans.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Plan } from "../types/billing";

interface AvailablePlansProps {
  plans: Plan[];
  currentPlanId: string;
  onSelectPlan: (planId: string) => void;
}

export function AvailablePlans({ plans, currentPlanId, onSelectPlan }: AvailablePlansProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const getPlanPrice = (plan: Plan, cycle: 'monthly' | 'annual') => {
    if (cycle === 'annual') {
      return Math.round(plan.price * 0.8); // 20% discount for annual
    }
    return plan.price;
  };

  const getButtonText = (plan: Plan) => {
    if (plan.id === currentPlanId) return "Current Plan";
    if (plan.price < plans.find(p => p.id === currentPlanId)?.price!) return "Downgrade";
    return "Upgrade";
  };

  const getButtonVariant = (plan: Plan) => {
    if (plan.id === currentPlanId) return "default";
    if (plan.price < plans.find(p => p.id === currentPlanId)?.price!) return "outline";
    return "default";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Available Plans</CardTitle>
        
        <div className="flex items-center space-x-1 mt-4 bg-slate-100 rounded-lg p-1 w-fit">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('monthly')}
            className="text-sm"
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'annual' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('annual')}
            className="text-sm"
          >
            Annual (Save 20%)
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = getPlanPrice(plan, billingCycle);
            const isCurrent = plan.id === currentPlanId;
            
            return (
              <div
                key={plan.id}
                className={`border rounded-lg p-6 relative ${
                  isCurrent
                    ? 'border-2 border-blue-500 bg-blue-50'
                    : plan.isRecommended
                    ? 'border border-slate-200'
                    : 'border border-slate-200'
                }`}
              >
                {/* Plan Badge */}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Current Plan</Badge>
                  </div>
                )}
                {plan.isRecommended && !isCurrent && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white">Recommended</Badge>
                  </div>
                )}

                {/* Plan Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <p className="text-slate-600 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900">${price}</span>
                  <span className="text-slate-600 text-sm">/month</span>
                  {billingCycle === 'annual' && (
                    <div className="text-xs text-green-600 font-medium">
                      Save ${(plan.price - price) * 12}/year
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Button
                  className="w-full"
                  variant={getButtonVariant(plan)}
                  onClick={() => !isCurrent && onSelectPlan(plan.id)}
                  disabled={isCurrent}
                >
                  {getButtonText(plan)}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}