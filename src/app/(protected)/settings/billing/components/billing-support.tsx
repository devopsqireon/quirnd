// src/app/(protected)/settings/billing/components/billing-support.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, FileText, Calculator, ChevronDown } from "lucide-react";

interface BillingSupportProps {
  onContactSupport: () => void;
  onViewDocs: () => void;
  onOpenCalculator: () => void;
}

export function BillingSupport({ onContactSupport, onViewDocs, onOpenCalculator }: BillingSupportProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const supportOptions = [
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Contact Support",
      description: "Get help with billing questions or issues",
      action: "Start Chat",
      onClick: onContactSupport,
      color: "blue"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Documentation",
      description: "Learn about billing, plans, and features",
      action: "View Docs",
      onClick: onViewDocs,
      color: "green"
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Cost Calculator",
      description: "Estimate costs for different plan options",
      action: "Calculate",
      onClick: onOpenCalculator,
      color: "purple"
    }
  ];

  const faqs = [
    {
      id: "upgrades",
      question: "How do plan upgrades affect my billing?",
      answer: "Plan upgrades are prorated based on your current billing cycle. You'll be charged the difference immediately and your next billing date remains the same."
    },
    {
      id: "cancellation",
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period."
    },
    {
      id: "downgrade",
      question: "What happens to my data if I downgrade?",
      answer: "Your data is preserved when downgrading, but some features may become unavailable. We'll help you transition smoothly."
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-100',
          icon: 'text-blue-600',
          button: 'text-blue-600 border-blue-300 hover:bg-blue-50'
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          icon: 'text-green-600',
          button: 'text-green-600 border-green-300 hover:bg-green-50'
        };
      case 'purple':
        return {
          bg: 'bg-purple-100',
          icon: 'text-purple-600',
          button: 'text-purple-600 border-purple-300 hover:bg-purple-50'
        };
      default:
        return {
          bg: 'bg-slate-100',
          icon: 'text-slate-600',
          button: 'text-slate-600 border-slate-300 hover:bg-slate-50'
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Billing Support</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {supportOptions.map((option, index) => {
            const colors = getColorClasses(option.color);
            
            return (
              <div
                key={index}
                className="text-center p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
              >
                <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <div className={colors.icon}>
                    {option.icon}
                  </div>
                </div>
                <h3 className="font-medium text-slate-900 mb-2">{option.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{option.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={option.onClick}
                  className={colors.button}
                >
                  {option.action}
                </Button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="font-medium text-slate-900 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group"
                open={openFaq === faq.id}
                onToggle={(e) => {
                  const isOpen = (e.target as HTMLDetailsElement).open;
                  setOpenFaq(isOpen ? faq.id : null);
                }}
              >
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900 list-none">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 text-sm text-slate-600 pr-6">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}