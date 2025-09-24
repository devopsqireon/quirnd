// src/app/(protected)/settings/billing/components/payment-methods.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, CreditCard, Shield } from "lucide-react";
import { PaymentMethod } from "../types/billing";

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onAddPaymentMethod: () => void;
  onEditPaymentMethod: (id: string) => void;
  onRemovePaymentMethod: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export function PaymentMethods({
  paymentMethods,
  onAddPaymentMethod,
  onEditPaymentMethod,
  onRemovePaymentMethod,
  onSetDefault
}: PaymentMethodsProps) {
  const getCardIcon = (type: string) => {
    const iconClass = "w-6 h-6 text-white";
    switch (type) {
      case 'visa':
        return <CreditCard className={iconClass} />;
      case 'mastercard':
        return <CreditCard className={iconClass} />;
      case 'paypal':
        return <CreditCard className={iconClass} />;
      default:
        return <CreditCard className={iconClass} />;
    }
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case 'visa':
        return 'bg-blue-600';
      case 'mastercard':
        return 'bg-slate-800';
      case 'paypal':
        return 'bg-blue-500';
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Payment Methods</CardTitle>
          <Button onClick={onAddPaymentMethod} className="bg-slate-900 hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Card Icon */}
                  <div className={`w-12 h-8 ${getCardColor(method.type)} rounded flex items-center justify-center`}>
                    {getCardIcon(method.type)}
                  </div>
                  
                  {/* Card Details */}
                  <div>
                    <div className="font-medium text-slate-900">
                      {method.type === 'paypal' 
                        ? 'PayPal Account' 
                        : `•••• •••• •••• ${method.last4}`
                      }
                    </div>
                    <div className="text-sm text-slate-600">
                      {method.type === 'paypal' 
                        ? method.email 
                        : `Expires ${method.expiryDate}`
                      }
                    </div>
                  </div>
                  
                  {/* Default Badge */}
                  {method.isDefault && (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Default
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetDefault(method.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditPaymentMethod(method.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemovePaymentMethod(method.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">Security Information</h3>
              <p className="text-sm text-blue-800">
                All payment information is encrypted and securely stored. We never store your complete card details on our servers.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}